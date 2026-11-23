"use client"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { LEVEL_CLASSES, tooltipText, type ContributionDay } from "@/lib/contributions"
import { cn } from "@/lib/utils"

export function ActivityCell({ day }: { day: ContributionDay }) {
  const text = tooltipText(day)
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={text}
          className={cn(
            "block aspect-square w-full rounded-[2px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring",
            LEVEL_CLASSES[day.level]
          )}
        />
      </TooltipTrigger>
      <TooltipContent>{text}</TooltipContent>
    </Tooltip>
  )
}
