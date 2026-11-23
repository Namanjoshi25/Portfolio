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
