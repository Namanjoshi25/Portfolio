# PRD: GitHub Activity Graph

**Status:** approved
**Approved:** 2026-11-23
**Created:** 2026-11-23

## Problem / Goal
The portfolio lists experience and projects but gives no evidence of how often
Naman ships code. Most of that work is in private repos, so it doesn't show up on
public GitHub either. An "Activity" section with a GitHub-style contribution
heatmap (private contributions are now enabled, so it shows 734 contributions and 183 active days in the last year)
shows a recruiter at a glance that he codes regularly, right before they look at what he built.

## Users
- **Recruiters / hiring managers** skimming the homepage on desktop or phone,
  deciding whether to read further or reach out.
- **Freelance clients** checking that Naman is active before contacting him.

## Requirements
1. A new `<section id="activity">` renders on the homepage **directly above**
   `<section id="projects">`, using `SECTION_DIVIDER_CLASS` and an `h2` with
   `text-xl font-bold` reading "Activity".
2. Data is fetched **server-side** from the GitHub GraphQL API
   (`user(login: "Namanjoshi25") { contributionsCollection { contributionCalendar } }`)
   with `Authorization: bearer $GITHUB_TOKEN`. No request to GitHub is made from the browser.
3. The fetch uses Next.js ISR with `revalidate: 86400` (24h); the homepage stays
   statically generated (`○` in `next build` output, not `ƒ`).
4. If `GITHUB_TOKEN` is unset, the request fails, returns non-2xx, or returns a
   GraphQL `errors` array, the fetch function returns `null` and the **entire
   section is omitted** (no heading, no card). The rest of the page renders normally.
5. The heatmap is a grid of weeks (columns) × 7 days (rows, Sun→Sat) covering
   the full calendar GitHub returns (~53 weeks), inside a card styled like the
   hero card: `rounded-2xl border border-border/50 bg-card/20`.
6. Each day cell has one of 5 intensity levels (0–4), mapped from the API's
   `contributionLevel` (`NONE`, `FIRST_QUARTILE`, `SECOND_QUARTILE`,
   `THIRD_QUARTILE`, `FOURTH_QUARTILE`).
7. Cell colors come only from theme CSS tokens. Level 0 is `--muted` and
   levels 1–4 are `--primary` at increasing opacity. The graph must be readable in
   light, dark and newspaper themes without theme-specific classes.
8. A stats line above the grid reads `"<total> contributions in the last year"`,
   using `totalContributions` formatted with thousands separators (e.g. `1,234`).
9. Month labels (`Jan`…`Dec`) appear above the first week column in which that
   month starts. A label is skipped if it would sit within 2 columns of the previous label.
10. A legend reads `Less` → 5 sample cells (levels 0–4) → `More`.
11. Hovering or keyboard-focusing a cell shows a tooltip via
    `src/components/ui/tooltip` with text:
    `"No contributions on Nov 12, 2026"` / `"1 contribution on Nov 12, 2026"` /
    `"5 contributions on Nov 12, 2026"`.
12. Below the `sm` breakpoint (640px), only the **most recent 26 weeks** are
    visible. Done with CSS (no JS width detection), so server and client HTML match.
13. The card contains a `View on GitHub ↗` link to `https://github.com/Namanjoshi25`
    (`target="_blank" rel="noreferrer"`).
14. Vitest is added to the repo with an `npm test` script, and unit tests cover
    the pure logic: level mapping (R6), total formatting (R8), month-label
    placement (R9), tooltip text (R11), mobile week visibility (R12), and the
    fetch fallback returning `null` for each failure case in R4 (with `fetch` mocked).

## Acceptance Criteria
- [x] `npm test` passes, and its tests cover every item listed in R14.
- [x] `npm run build` succeeds and lists `/` as `○ (Static)`.
- [x] With a valid `GITHUB_TOKEN` in `.env.local`, `npm run dev` shows the Activity section
      above Projects, with a total matching the user's GitHub profile.
- [x] With `GITHUB_TOKEN` unset, the homepage renders with no Activity section
      and no errors in the server or browser console.
- [x] The graph is visually checked in light, dark and newspaper themes: level-0 and
      level-4 cells are clearly distinguishable in each.
- [ ] At 375px viewport width, 26 week columns are visible and there is no horizontal page scroll.
- [x] Hovering a cell shows the correct tooltip text, and Tab-focusing a cell shows it too.
- [x] The `View on GitHub ↗` link opens the profile in a new tab.

## Out of Scope
- Current streak, longest streak, most-active-day or any stats beyond the total.
- BlurFade / entrance animation on the section.
- Per-repo breakdowns, commit lists or language stats.
- Year switcher or a date range other than GitHub's default last year.
- Counting commits from local git history, or from emails not linked to the GitHub account.
- Playwright / browser e2e tests.
- Changes to any other homepage section.

## Technical Notes
- **Files:** `src/app/page.tsx` (insert the section before `#projects`); new
  `src/lib/github.ts` (fetch + pure helpers); new `src/components/activity-graph.tsx`
  (server component that renders the grid; a client wrapper is needed only for the tooltips).
- **Env:** `GITHUB_TOKEN` is a fine-grained or classic PAT. Reading the public
  contribution calendar needs no scopes; private contributions already show as
  anonymized counts because the profile setting is on. Set it in Vercel (Production + Preview)
  and in `.env.local` locally (already gitignored via `.env*.local`).
- **Tooltip:** Radix tooltips need a `TooltipProvider`. Check whether one already wraps the app (`layout.tsx` /
  dock); if not, wrap the graph in one. Cells must be focusable (`button` or `tabIndex={0}`) for R11.
- **Newspaper theme gotcha:** `globals.css` restyles `.newspaper .rounded-md`,
  `.rounded-lg` and `[class*="rounded-2xl"][class*="border"]`. Use `rounded-[2px]`
  (or similar) on cells so the theme's overrides don't hit them. The card should
  inherit the rounded-2xl override on purpose, to match the hero.
- **Colors:** e.g. `bg-muted` for level 0 and `bg-primary/25`, `/50`, `/75`, `bg-primary`
  for levels 1–4. In the newspaper theme `--primary` is sepia, so the graph reads like printed ink.
- **Mobile slicing (R12):** give week columns with index `< weeks.length - 26`
  the classes `hidden sm:flex`. Expose this as a pure helper so it can be tested.
- **Stack:** Next.js 14.2.4 app router, React 18, Tailwind 3, next-themes
  (`light` / `dark` / `newspaper`). Local Node is 26; the Vercel engine is 22.x.
- **Data size:** ~371 days. Render as plain divs; no charting library.
