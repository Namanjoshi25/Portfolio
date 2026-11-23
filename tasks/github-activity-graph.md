# Tasks: GitHub Activity Graph

Source spec: specs/github-activity-graph.md

## Commands
Test:      `npm test` (→ `vitest run`; added in task 1)
Typecheck: `npx tsc --noEmit`
Lint:      none configured. Don't run `npm run lint`: with no ESLint config, `next lint` stops to ask interactive setup questions.
Format:    none configured (no Prettier). Skip.
Build:     `npm run build` (also typechecks, including test files)

## Technical Approach
- `src/lib/contributions.ts`: **pure, client-safe** types and helpers. No env access, no fetch.
  - `type ContributionDay = { date: string; count: number; level: 0|1|2|3|4; weekday: number }`
  - `type ContributionWeek = ContributionDay[]` and `type ContributionCalendar = { total: number; weeks: ContributionWeek[] }`
  - `toLevel(apiLevel)`, `formatTotal(n)`, `tooltipText(day)`, `monthLabels(weeks)`, `isDesktopOnlyWeek(i, total)`
- `src/lib/github.ts`: **server-only** `fetchContributionCalendar(): Promise<ContributionCalendar | null>`.
  - POSTs to `https://api.github.com/graphql` with `next: { revalidate: 86400 }` and maps the raw API shape into `ContributionCalendar`.
  - Returns `null` on every failure. It never throws.
  - Only `page.tsx` imports it, so the token can't end up in a client bundle.
- `src/components/activity-graph.tsx`: `ActivitySection({ data })`.
  - Returns `null` if `data` is null. Otherwise renders the `<section id="activity">`, heading, stats line, card, grid, legend and GitHub link.
  - Server component.
- `src/components/activity-cell.tsx` (`"use client"`): one cell wrapped in `Tooltip`/`TooltipTrigger`/`TooltipContent`.
  - `TooltipProvider` already wraps the app in `src/app/layout.tsx:83`, so there's no need to add one.
- `src/app/page.tsx`: becomes `async`, adds `export const revalidate = 86400`, does `const activity = await fetchContributionCalendar()`, and renders `<ActivitySection data={activity} />` just before `<section id="projects">`.
  - `ActivitySection` owns the `<section>` tag itself, so a null result leaves no empty wrapper.
- Tests: Vitest (node environment) plus `vitest.config.ts`, which aliases `@` → `./src` and sets `esbuild: { jsx: "automatic" }`.
  - Component tests use `renderToStaticMarkup` from `react-dom/server`, so no jsdom or testing-library is needed.
  - Test files sit next to their source as `*.test.ts(x)`.
- Colors: level 0 → `bg-muted`; levels 1–4 → `bg-[hsl(var(--primary)/0.25)]`, `/0.5`, `/0.75`, `bg-[hsl(var(--primary))]`.
  - Don't use the `bg-primary` class: the newspaper theme gives exactly `.bg-primary` a box-shadow and uppercase styling (`globals.css:208`).
  - Cells use `rounded-[2px]`, because the theme also overrides `.rounded-md` and `.rounded-lg`.

**Tests affected:** none found. The repo has no existing tests or e2e specs.

## Tasks
- [x] 1. Add Vitest (`npm i -D vitest`, `"test": "vitest run"`, `vitest.config.ts`) and create `src/lib/contributions.ts` with the types, `toLevel`, `formatTotal` and `tooltipText`, plus `src/lib/contributions.test.ts` — _covers: R6, R8, R11, R14_ — run: `sonnet/medium`
  approach: `toLevel` maps NONE/FIRST_QUARTILE/…/FOURTH_QUARTILE → 0–4, with unknown values → 0. `formatTotal` uses `toLocaleString("en-US")`. `tooltipText` handles the 0 / 1 / many wording and formats the date in UTC (`new Date(date+"T00:00:00Z")`, `timeZone:"UTC"`). Counts of 1000+ in tooltips go through `formatTotal`. Tests cover every level, 0/1/5/1234, and `2026-01-01` with `process.env.TZ` set to America/Los_Angeles.
  verify: `npx vitest run src/lib/contributions.test.ts`
- [x] 2. Add `monthLabels(weeks)` and `isDesktopOnlyWeek(i, total)` to `src/lib/contributions.ts`, with tests in the same test file — _covers: R9, R12_ — run: `sonnet/medium`
  approach: `monthLabels` returns `(string|null)[]`, one entry per week. A week gets `"Jan"`… if one of its days has a date ending in `-01`, and the label is null if it falls ≤2 columns after the previous *emitted* label (skipped labels don't reset the distance). `isDesktopOnlyWeek(i,total)` = `i < total - 26`. Tests cover a month starting mid-week, two months starting 2 columns apart (the second is skipped), a partial first week, and total = 53 (i = 26 → true, i = 27 → false) or ≤ 26 (nothing hidden).
  verify: `npx vitest run src/lib/contributions.test.ts`
- [x] 3. Create `src/lib/github.ts` `fetchContributionCalendar()` and `src/lib/github.test.ts` — _covers: R2, R3, R4, R14_ — run: `sonnet/high`
  approach: the GraphQL query requests `user(login:"Namanjoshi25"){contributionsCollection{contributionCalendar{totalContributions weeks{contributionDays{date contributionCount contributionLevel weekday}}}}}` with header `Authorization: bearer ${process.env.GITHUB_TOKEN}`. Wrap everything in try/catch and return null when there's no token (without calling fetch), when fetch throws, when `!res.ok`, when `json.errors` is present, or when `data.user` is missing. The POST also sends `Content-Type: application/json` and a JSON body `{query}`. Tests use `vi.stubEnv` + `vi.stubGlobal("fetch")` (with `unstubAllEnvs/Globals` in afterEach) and cover all 5 null cases (no token is `stubEnv("GITHUB_TOKEN", "")`), the success mapping, and that the call carries `next.revalidate === 86400` and the bearer header.
  verify: `npx vitest run src/lib/github.test.ts`
- [ ] 4. Create `src/components/activity-graph.tsx` (`ActivitySection`) and `src/components/activity-cell.tsx`, with `src/components/activity-graph.test.tsx` — _covers: R1, R4, R5, R7, R8, R9, R10, R11, R12, R13_ — run: `sonnet/high`
  approach:
  - Layout: `h2.text-xl.font-bold` "Activity" with the stats line under it, then the card (`rounded-2xl border border-border/50 bg-card/20 p-5`) holding a flex row of week columns. Each column is a label slot plus 7 row slots placed by `weekday`, so partial weeks keep alignment, and gets `hidden sm:flex` when `isDesktopOnlyWeek`. Then the legend and the `View on GitHub ↗` link.
  - Cells are `<button type="button" aria-label={tooltipText(day)}>` so they can be focused.
  - Tests (renderToStaticMarkup, wrapped in `TooltipProvider`): null → `""`, the heading and `id="activity"` are present, the total is formatted, the cell count equals the number of days, the legend has 5 swatches, the link has href/target/rel, and the first 27 of 53 weeks carry `hidden sm:flex`.
  verify: `npx vitest run src/components/activity-graph.test.tsx`
- [ ] 5. Wire into `src/app/page.tsx`: make it async, add `export const revalidate = 86400`, fetch, and render `<ActivitySection>` directly before `#projects` — _covers: R1, R3, R4_ — run: `sonnet/medium`
  approach: insert above `<section id="projects"` (around line 258) and change nothing else on the page. Run the build with no token (`env -u GITHUB_TOKEN`) and check that `/` is still `○` and the build passes.
  verify: `env -u GITHUB_TOKEN npm run build 2>&1 | grep -E '^[├┌└] ○ /\s'`
- [ ] 6. Run /code-review on the full feature diff (fresh context) and fix any
  confirmed findings. Run only the tests of the files you change; the full suite
  runs in task 7. — run: `opus/high`
  eval: skip
- [ ] 7. Verify every acceptance criterion in the spec: run the command /
  demonstrate the behavior for each one, and check them off in the spec file.
  Report any that fail instead of checking them. Visual checks: dev server plus Playwright in light, dark and newspaper themes and at 375px; needs `GITHUB_TOKEN` in `.env.local`, so report BLOCKED on those if it's missing. — run: `sonnet/medium`
  verify: `npm test && npx tsc --noEmit && npm run build`

## Notes
- Installed `vitest@^3` (not latest): vitest 5 peer-requires `@types/node` ^22/>=24, which conflicts with the repo's `@types/node@^20` (ERESOLVE).
- `tsconfig.json` includes `**/*.ts(x)`, so `next build` and `tsc` typecheck test files too. Import `describe/it/expect/vi` from `"vitest"` explicitly (no globals).
- Don't use the `server-only` package: it throws when imported under Vitest. Keeping the token server-side relies on only `page.tsx` importing `github.ts`.
- GitHub returns dates as `YYYY-MM-DD`. Parsing them as local time shifts the day in negative-offset timezones, so always use UTC.
- The first and last weeks from GitHub can have fewer than 7 days. Position each day by its `weekday` (0 = Sun), not by its array index.
- The newspaper theme's `.newspaper .bg-primary` rule adds a box-shadow. That's why cells use arbitrary `hsl(var(--primary)/x)` colors (see Technical Approach). A test in task 4 should assert that no cell has the `bg-primary` class.
- With no token, the fetch is skipped entirely. `export const revalidate` on the page keeps ISR on in production either way.
- Never log the token or put it in error messages.
