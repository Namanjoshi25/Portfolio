import { describe, expect, it } from "vitest"
import { formatTotal, isDesktopOnlyWeek, monthLabels, toLevel, tooltipText } from "./contributions"

describe("toLevel", () => {
  it.each([
    ["NONE", 0],
    ["FIRST_QUARTILE", 1],
    ["SECOND_QUARTILE", 2],
    ["THIRD_QUARTILE", 3],
    ["FOURTH_QUARTILE", 4],
    ["SOMETHING_ELSE", 0],
    ["", 0],
  ])("%s -> %i", (api, level) => {
    expect(toLevel(api)).toBe(level)
  })
})

describe("formatTotal", () => {
  it.each([
    [0, "0"],
    [1, "1"],
    [5, "5"],
    [1234, "1,234"],
  ])("%i -> %s", (n, out) => {
    expect(formatTotal(n)).toBe(out)
  })
})

describe("tooltipText", () => {
  it("handles 0, 1 and many", () => {
    expect(tooltipText({ date: "2026-11-12", count: 0 })).toBe("No contributions on Nov 12, 2026")
    expect(tooltipText({ date: "2026-11-12", count: 1 })).toBe("1 contribution on Nov 12, 2026")
    expect(tooltipText({ date: "2026-11-12", count: 5 })).toBe("5 contributions on Nov 12, 2026")
  })

  it("does not shift the day near midnight in non-UTC timezones", () => {
    const prev = process.env.TZ
    process.env.TZ = "America/Los_Angeles"
    try {
      expect(tooltipText({ date: "2026-01-01", count: 2 })).toBe("2 contributions on Jan 1, 2026")
    } finally {
      if (prev === undefined) delete process.env.TZ
      else process.env.TZ = prev
    }
  })
})

const wk = (...dates: string[]) => dates.map((date) => ({ date, count: 0, level: 0 as const, weekday: 0 }))

describe("monthLabels", () => {
  it("labels a week containing the 1st mid-week", () => {
    const weeks = [wk("2026-01-28", "2026-01-29"), wk("2026-01-30", "2026-01-31", "2026-02-01"), wk("2026-02-04")]
    expect(monthLabels(weeks)).toEqual([null, "Feb", null])
  })
  it("labels the partial first week if it holds a 1st", () => {
    expect(monthLabels([wk("2026-03-01", "2026-03-02"), wk("2026-03-08")])).toEqual(["Mar", null])
  })
  it("skips a label within 2 columns of the previous one", () => {
    const weeks = [wk("2026-01-01"), wk("2026-01-08"), wk("2026-02-01"), wk("2026-02-08"), wk("2026-03-01")]
    expect(monthLabels(weeks)).toEqual(["Jan", null, null, null, "Mar"])
  })
  it("keeps labels 3 columns apart", () => {
    const weeks = [wk("2026-01-01"), wk("2026-01-08"), wk("2026-01-15"), wk("2026-02-01")]
    expect(monthLabels(weeks)).toEqual(["Jan", null, null, "Feb"])
  })
})

describe("isDesktopOnlyWeek", () => {
  it("hides the first 27 of 53 weeks on mobile", () => {
    expect(isDesktopOnlyWeek(26, 53)).toBe(true)
    expect(isDesktopOnlyWeek(27, 53)).toBe(false)
  })
  it("hides nothing when total <= 26", () => {
    expect(isDesktopOnlyWeek(0, 26)).toBe(false)
    expect(isDesktopOnlyWeek(0, 10)).toBe(false)
  })
})
