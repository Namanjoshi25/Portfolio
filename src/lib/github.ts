import { toLevel } from "@/lib/contributions"
import type { ContributionCalendar } from "@/lib/contributions"

const QUERY = `query {
  user(login: "Namanjoshi25") {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            contributionLevel
            weekday
          }
        }
      }
    }
  }
}`

type ApiDay = {
  date: string
  contributionCount: number
  contributionLevel: string
  weekday: number
}

type ApiResponse = {
  errors?: unknown
  data?: {
    user?: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number
          weeks: { contributionDays: ApiDay[] }[]
        }
      }
    } | null
  }
}

// Server-only: only page.tsx may import this, so the token never reaches a client bundle.
// Returns null on every failure; never throws and never logs the token.
export async function fetchContributionCalendar(): Promise<ContributionCalendar | null> {
  const token = process.env.GITHUB_TOKEN
  if (!token) return null

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: QUERY }),
      next: { revalidate: 86400 },
    })
    if (!res.ok) return null

    const json = (await res.json()) as ApiResponse
    if (json.errors) return null
    const calendar = json.data?.user?.contributionsCollection.contributionCalendar
    if (!calendar) return null

    return {
      total: calendar.totalContributions,
      weeks: calendar.weeks.map((w) =>
        w.contributionDays.map((d) => ({
          date: d.date,
          count: d.contributionCount,
          level: toLevel(d.contributionLevel),
          weekday: d.weekday,
        })),
      ),
    }
  } catch {
    return null
  }
}
