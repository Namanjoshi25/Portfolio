export type ContributionLevel = 0 | 1 | 2 | 3 | 4

export type ContributionDay = {
  date: string
  count: number
  level: ContributionLevel
  weekday: number
}

export type ContributionWeek = ContributionDay[]

export type ContributionCalendar = {
  total: number
  weeks: ContributionWeek[]
}

const LEVELS: Record<string, ContributionLevel> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

export function toLevel(apiLevel: string): ContributionLevel {
  return LEVELS[apiLevel] ?? 0
}

export function formatTotal(n: number): string {
  return n.toLocaleString("en-US")
}

export function tooltipText(day: Pick<ContributionDay, "date" | "count">): string {
  const date = new Date(day.date + "T00:00:00Z").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })
  const what =
    day.count === 0
      ? "No contributions"
      : day.count === 1
        ? "1 contribution"
        : `${formatTotal(day.count)} contributions`
  return `${what} on ${date}`
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export function monthLabels(weeks: ContributionWeek[]): (string | null)[] {
  let prev = -Infinity
  return weeks.map((week, i) => {
    const first = week.find((d) => d.date.endsWith("-01"))
    if (!first || i - prev <= 2) return null
    prev = i
    return MONTHS[Number(first.date.slice(5, 7)) - 1]
  })
}

export function isDesktopOnlyWeek(i: number, total: number): boolean {
  return i < total - 26
}

// Level 0 -> muted; 1-4 -> primary at rising opacity. Avoid the `bg-primary` class: the
// newspaper theme adds a box-shadow and uppercase styling to exactly `.bg-primary`.
export const LEVEL_CLASSES: Record<ContributionLevel, string> = {
  0: "bg-muted",
  1: "bg-[hsl(var(--primary)/0.25)]",
  2: "bg-[hsl(var(--primary)/0.5)]",
  3: "bg-[hsl(var(--primary)/0.75)]",
  4: "bg-[hsl(var(--primary))]",
}

export type CellPos = { week: number; row: number }

const ARROW_STEPS: Record<string, [number, number]> = {
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
}

// Roving-focus target for an arrow key: steps from `from` until `exists(week, row)` is true
// (skipping missing days of partial weeks and columns hidden below sm). Null at the edge or
// for a non-arrow key.
export function nextCell(
  from: CellPos,
  key: string,
  weekCount: number,
  exists: (week: number, row: number) => boolean
): CellPos | null {
  const step = ARROW_STEPS[key]
  if (!step) return null
  let { week, row } = from
  for (;;) {
    week += step[0]
    row += step[1]
    if (week < 0 || week >= weekCount || row < 0 || row > 6) return null
    if (exists(week, row)) return { week, row }
  }
}
