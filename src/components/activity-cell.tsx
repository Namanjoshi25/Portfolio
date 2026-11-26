"use client"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { LEVEL_CLASSES, tooltipText, type ContributionDay } from "@/lib/contributions"
import { cn } from "@/lib/utils"

// Replaces TooltipContent's `bg-primary` (cn/tailwind-merge drops it): the newspaper theme
// uppercases and shadows exactly `.bg-primary`, which would change the R11 tooltip text.
export const CELL_TOOLTIP_CLASS = "bg-[hsl(var(--primary))]"

export function ActivityCell({
  day,
  week,
  tabbable,
}: {
  day: ContributionDay
  week: number
  tabbable: boolean
}) {
  const text = tooltipText(day)
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={text}
          data-cell={`${week}-${day.weekday}`}
          tabIndex={tabbable ? 0 : -1}
          className={cn(
            "block aspect-square w-full rounded-[2px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring",
            LEVEL_CLASSES[day.level]
          )}
        />
      </TooltipTrigger>
      <TooltipContent className={CELL_TOOLTIP_CLASS}>{text}</TooltipContent>
    </Tooltip>
  )
}
