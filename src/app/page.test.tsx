import { renderToStaticMarkup } from "react-dom/server"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { TooltipProvider } from "@/components/ui/tooltip"
import type { ContributionCalendar } from "@/lib/contributions"

import Page, { revalidate } from "@/app/page"

// vi.mock is hoisted above the imports, so the mock fn must be created with vi.hoisted.
const { fetchContributionCalendar } = vi.hoisted(() => ({
  fetchContributionCalendar: vi.fn<() => Promise<ContributionCalendar | null>>(),
}))
vi.mock("@/lib/github", () => ({ fetchContributionCalendar }))

const calendar: ContributionCalendar = {
  total: 734,
  weeks: [[{ date: "2026-11-22", count: 3, level: 2, weekday: 0 }]],
}

async function renderPage() {
  const tree = await Page()
  return renderToStaticMarkup(<TooltipProvider>{tree}</TooltipProvider>)
}

describe("home page", () => {
  beforeEach(() => fetchContributionCalendar.mockReset())

  it("revalidates daily", () => {
    expect(revalidate).toBe(86400)
  })

  it("renders the Activity section, with the section divider, directly before Projects", async () => {
    fetchContributionCalendar.mockResolvedValue(calendar)
    const html = await renderPage()
    const activity = html.indexOf('<section id="activity" class="border-t border-border/40 pt-8">')
    const projects = html.indexOf('<section id="projects"')
    expect(activity).toBeGreaterThan(-1)
    expect(projects).toBeGreaterThan(activity)
    expect(html.slice(activity, projects)).toContain("734 contributions in the last year")
    expect(html.slice(activity, projects).match(/<section/g)).toHaveLength(1)
  })

  it("omits the section entirely when the fetch returns null", async () => {
    fetchContributionCalendar.mockResolvedValue(null)
    const html = await renderPage()
    expect(html).not.toContain('id="activity"')
    expect(html).toContain('<section id="projects"')
  })
})
