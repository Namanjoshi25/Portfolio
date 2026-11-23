import { ActivityCell } from "@/components/activity-cell"
import {
  LEVEL_CLASSES,
  formatTotal,
  isDesktopOnlyWeek,
  monthLabels,
  type ContributionCalendar,
  type ContributionLevel,
} from "@/lib/contributions"
import { cn } from "@/lib/utils"

const ROWS = [0, 1, 2, 3, 4, 5, 6]
const LEVELS: ContributionLevel[] = [0, 1, 2, 3, 4]

export function ActivitySection({ data }: { data: ContributionCalendar | null }) {
  if (!data) return null

  const labels = monthLabels(data.weeks)

  return (
    <section id="activity" className="border-t border-border/40 pt-8">
      <div className="flex min-h-0 flex-col gap-y-3">
        <div className="space-y-1">
          <h2 className="text-xl font-bold">Activity</h2>
          <p className="text-sm text-muted-foreground">
            {formatTotal(data.total)} contributions in the last year
          </p>
        </div>
        <div className="rounded-2xl border border-border/50 bg-card/20 p-5">
          <div className="flex gap-[3px]">
            {data.weeks.map((week, i) => (
              <div
                key={i}
                className={cn(
                  "min-w-0 flex-1 flex-col gap-[3px]",
                  isDesktopOnlyWeek(i, data.weeks.length) ? "hidden sm:flex" : "flex"
                )}
              >
                <div className="h-4 text-[10px] leading-4 text-muted-foreground">
                  <span className="whitespace-nowrap">{labels[i]}</span>
                </div>
                {ROWS.map((weekday) => {
                  const day = week.find((d) => d.weekday === weekday)
                  return day ? (
                    <ActivityCell key={weekday} day={day} />
                  ) : (
                    <div key={weekday} className="aspect-square w-full" />
                  )
                })}
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
            <a
              href="https://github.com/Namanjoshi25"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              View on GitHub ↗
            </a>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              {LEVELS.map((level) => (
                <div
                  key={level}
                  data-legend-swatch
                  className={cn("size-[10px] rounded-[2px]", LEVEL_CLASSES[level])}
                />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
