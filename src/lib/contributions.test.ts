import { describe, expect, it } from "vitest"
import { formatTotal, toLevel, tooltipText } from "./contributions"

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
