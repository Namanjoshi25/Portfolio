"use client"

import type { FocusEvent, KeyboardEvent, ReactNode } from "react"
import { nextCell } from "@/lib/contributions"

// Roving tabindex: the grid is one Tab stop (the cell with tabIndex 0) and arrow keys move
// between days, so keyboard users don't have to Tab through ~371 cells.
export function ActivityGrid({ weekCount, children }: { weekCount: number; children: ReactNode }) {
  const cellAt = (grid: HTMLElement, week: number, row: number) =>
    grid.querySelector<HTMLElement>(`[data-cell="${week}-${row}"]`)

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const from = (e.target as HTMLElement).closest<HTMLElement>("[data-cell]")
    if (!from) return
    const grid = e.currentTarget
    const [week, row] = from.dataset.cell!.split("-").map(Number)
    const to = nextCell({ week, row }, e.key, weekCount, (w, r) => {
      const el = cellAt(grid, w, r)
      return el !== null && el.offsetParent !== null // offsetParent is null inside hidden columns
    })
    if (!to) return
    e.preventDefault()
    cellAt(grid, to.week, to.row)?.focus()
  }

  const onFocus = (e: FocusEvent<HTMLDivElement>) => {
    const cell = (e.target as HTMLElement).closest<HTMLElement>("[data-cell]")
    if (!cell) return
    e.currentTarget.querySelectorAll<HTMLElement>('[data-cell][tabindex="0"]').forEach((el) => {
      if (el !== cell) el.tabIndex = -1
    })
    cell.tabIndex = 0
  }

  return (
    <div
      role="group"
      aria-label="Contribution calendar. Use arrow keys to move between days."
      className="flex gap-[3px]"
      onKeyDown={onKeyDown}
      onFocus={onFocus}
    >
      {children}
    </div>
  )
}
