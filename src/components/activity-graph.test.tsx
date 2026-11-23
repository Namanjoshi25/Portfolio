import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"
import { ActivitySection } from "@/components/activity-graph"
import { TooltipProvider } from "@/components/ui/tooltip"
import type { ContributionCalendar, ContributionDay } from "@/lib/contributions"

function makeCalendar(weekCount: number, total = 1234): ContributionCalendar {
  const start = Date.UTC(2025, 10, 23) // a Sunday
  const weeks = Array.from({ length: weekCount }, (_, w) =>
    Array.from({ length: 7 }, (_, d): ContributionDay => {
      const date = new Date(start + (w * 7 + d) * 86400000).toISOString().slice(0, 10)
      return { date, count: (w + d) % 5, level: (((w + d) % 5) as 0 | 1 | 2 | 3 | 4), weekday: d }
    })
  )
  return { total, weeks }
}

const render = (data: ContributionCalendar | null) =>
  renderToStaticMarkup(
    <TooltipProvider>
      <ActivitySection data={data} />
    </TooltipProvider>
  )

describe("ActivitySection", () => {
  it("renders nothing when data is null", () => {
    expect(render(null)).toBe("")
  })

  it("renders the section id and heading", () => {
    const html = render(makeCalendar(53))
    expect(html).toContain('id="activity"')
    expect(html).toMatch(/<h2 class="text-xl font-bold">Activity<\/h2>/)
  })

  it("formats the total with thousands separators", () => {
    expect(render(makeCalendar(53, 1234))).toContain("1,234 contributions in the last year")
  })

  it("renders one focusable button per day with its tooltip text as label", () => {
    const cal = makeCalendar(53)
    const html = render(cal)
    expect(html.match(/<button type="button"/g)).toHaveLength(cal.weeks.flat().length)
    expect(html).toContain('aria-label="No contributions on Nov 23, 2025"')
    expect(html).toContain('aria-label="1 contribution on Nov 24, 2025"')
    expect(html).toContain('aria-label="2 contributions on Nov 25, 2025"')
  })

  it("never uses the bg-primary class on cells", () => {
    expect(render(makeCalendar(53))).not.toMatch(/bg-primary(?![\w/-])/)
  })

  it("keeps partial weeks aligned by weekday", () => {
    const cal = makeCalendar(2)
    cal.weeks[0] = cal.weeks[0].filter((d) => d.weekday >= 3) // partial first week
    const html = render(cal)
    expect(html.match(/<button type="button"/g)).toHaveLength(4 + 7)
    // 3 empty slots fill the missing Sun-Tue rows
    expect(html.match(/<div class="aspect-square w-full"><\/div>/g)).toHaveLength(3)
  })

  it("renders a 5-swatch legend between Less and More", () => {
    const html = render(makeCalendar(53))
    expect(html.match(/data-legend-swatch/g)).toHaveLength(5)
    expect(html.indexOf("Less")).toBeLessThan(html.indexOf("data-legend-swatch"))
    expect(html.lastIndexOf("data-legend-swatch")).toBeLessThan(html.indexOf("More"))
  })

  it("links to the GitHub profile in a new tab", () => {
    const html = render(makeCalendar(53))
    expect(html).toMatch(
      /<a href="https:\/\/github\.com\/Namanjoshi25" target="_blank" rel="noreferrer"[^>]*>View on GitHub ↗<\/a>/
    )
  })

  it("hides all but the most recent 26 of 53 weeks below sm", () => {
    const html = render(makeCalendar(53))
    expect(html.match(/hidden sm:flex/g)).toHaveLength(27)
    expect(html.match(/class="min-w-0 flex-1 flex-col gap-\[3px\] flex"/g)).toHaveLength(26)
  })
})
