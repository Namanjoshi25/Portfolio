import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { fetchContributionCalendar } from "@/lib/github"

const apiBody = {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: 3,
          weeks: [
            {
              contributionDays: [
                { date: "2026-01-03", contributionCount: 0, contributionLevel: "NONE", weekday: 6 },
              ],
            },
            {
              contributionDays: [
                { date: "2026-01-04", contributionCount: 1, contributionLevel: "FIRST_QUARTILE", weekday: 0 },
                { date: "2026-01-05", contributionCount: 2, contributionLevel: "FOURTH_QUARTILE", weekday: 1 },
              ],
            },
          ],
        },
      },
    },
  },
}

function okResponse(body: unknown) {
  return { ok: true, json: async () => body }
}

describe("fetchContributionCalendar", () => {
  let fetchMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    vi.stubEnv("GITHUB_TOKEN", "test-token")
    fetchMock = vi.fn()
    vi.stubGlobal("fetch", fetchMock)
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  it("returns null without calling fetch when there is no token", async () => {
    vi.stubEnv("GITHUB_TOKEN", "")
    expect(await fetchContributionCalendar()).toBeNull()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it("returns null when fetch throws", async () => {
    fetchMock.mockRejectedValue(new Error("network down"))
    expect(await fetchContributionCalendar()).toBeNull()
  })

  it("returns null when the response is not ok", async () => {
    fetchMock.mockResolvedValue({ ok: false, json: async () => apiBody })
    expect(await fetchContributionCalendar()).toBeNull()
  })

  it("returns null when the response has errors", async () => {
    fetchMock.mockResolvedValue(okResponse({ errors: [{ message: "bad" }] }))
    expect(await fetchContributionCalendar()).toBeNull()
  })

  it("returns null when data.user is missing", async () => {
    fetchMock.mockResolvedValue(okResponse({ data: { user: null } }))
    expect(await fetchContributionCalendar()).toBeNull()
  })

  it("maps the API shape into a ContributionCalendar", async () => {
    fetchMock.mockResolvedValue(okResponse(apiBody))
    expect(await fetchContributionCalendar()).toEqual({
      total: 3,
      weeks: [
        [{ date: "2026-01-03", count: 0, level: 0, weekday: 6 }],
        [
          { date: "2026-01-04", count: 1, level: 1, weekday: 0 },
          { date: "2026-01-05", count: 2, level: 4, weekday: 1 },
        ],
      ],
    })
  })

  it("sends the bearer header and revalidate: 86400", async () => {
    fetchMock.mockResolvedValue(okResponse(apiBody))
    await fetchContributionCalendar()
    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe("https://api.github.com/graphql")
    expect(init.method).toBe("POST")
    expect(init.headers.Authorization).toBe("bearer test-token")
    expect(init.next.revalidate).toBe(86400)
    expect(JSON.parse(init.body).query).toContain("Namanjoshi25")
  })
})
