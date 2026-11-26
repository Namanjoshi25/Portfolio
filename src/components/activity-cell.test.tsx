import type { ReactNode } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it, vi } from "vitest"
import { ActivityCell, CELL_TOOLTIP_CLASS } from "@/components/activity-cell"
import { cn } from "@/lib/utils"

// Hoisted above the imports. Renders the (normally closed) tooltip content inline so its className can be inspected.
vi.mock("@/components/ui/tooltip", () => ({
  Tooltip: ({ children }: { children: ReactNode }) => <>{children}</>,
  TooltipTrigger: ({ children }: { children: ReactNode }) => <>{children}</>,
  TooltipContent: ({ children, className }: { children: ReactNode; className?: string }) => (
    <div data-tooltip={className}>{children}</div>
  ),
}))

describe("ActivityCell tooltip", () => {
  it("shows the R11 text in a tooltip that overrides bg-primary", () => {
    const html = renderToStaticMarkup(
      <ActivityCell day={{ date: "2026-11-12", count: 5, level: 2, weekday: 4 }} week={3} tabbable={false} />
    )
    expect(html).toContain(`data-tooltip="${CELL_TOOLTIP_CLASS}">5 contributions on Nov 12, 2026</div>`)
    // TooltipContent merges its base `bg-primary` with this class via cn; the newspaper
    // theme's `.bg-primary` rule (uppercase + shadow) must no longer match.
    expect(cn("rounded-md bg-primary px-3", CELL_TOOLTIP_CLASS).split(" ")).not.toContain("bg-primary")
  })
})
