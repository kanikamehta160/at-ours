# At Ours

At Ours helps small groups make fair plans that actually happen. It will
eventually collect individual constraints privately, identify shared taste and
turn it into a small number of actionable plans.

## Development status

Vertical Slice 01 implements local plan-request capture, deterministic
validation and a structured confirmation. Development proceeds one vertical
slice at a time.

The current vertical slice is **plan-request capture and validation only**:
[Vertical Slice 01 — Create a Plan Request](docs/vertical-slice-01.md).
That document defines the slice acceptance criteria. The form collects group
name and size, date and times, starting area, GBP budget, mood and optional hard
no. A non-empty hard no appears in the confirmation; otherwise its row is omitted.
The summary offers Edit request, returning to the populated form. Refreshing
clears the request. The form is at `/plan/new`; the root page introduces At Ours
and links to it.

Submission runs entirely in the browser, without a network request, persistence
or logging of submitted values. The form remains disabled until JavaScript has
hydrated so a native submission cannot expose values in the URL.

The project currently contains no production AI, persistence, authentication
or booking integration.

## Technology stack

- Next.js 16.4.1 with the App Router in `src/app/`
- React and React DOM 19.3.0
- TypeScript 5.9.3 with strict mode enabled in `tsconfig.json`
- Tailwind CSS 4, imported in `src/app/globals.css`
- ESLint 9 with Next.js and TypeScript rules in `eslint.config.mjs`
- Zod 4 for React-independent domain validation
- Vitest 4 for domain tests and Playwright for Chromium browser tests
- npm with `package-lock.json`; `@/*` resolves to `src/*`

## Local setup

Use Node.js and npm. The scaffold was verified with Node.js 25.9.0 and npm
11.12.1; this records the verified environment rather than a pinned requirement.
From the repository root:

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). The entry page is
`src/app/page.tsx`, and the root layout is `src/app/layout.tsx`.
Dependency installation requires npm registry access. The interface uses system
fonts and does not require an external font download.

## Available commands

These are the scripts currently defined in `package.json`:

| Command | Script | Purpose |
| --- | --- | --- |
| `npm run dev` | `next dev` | Start the development server |
| `npm run build` | `next build` | Build using default Turbopack |
| `npm start` | `next start` | Serve an existing production build |
| `npm run lint` | `eslint` | Run ESLint |
| `npm run typecheck` | `next typegen && tsc --noEmit` | Generate route types and check strict TypeScript |
| `npm test` | `vitest run` | Run domain-schema unit tests |
| `npm run test:e2e` | `playwright test` | Run Chromium browser journeys against an existing production build |

`npm run build -- --webpack` forwards the supported Webpack flag to the build
script. This production build and lint passed during scaffold verification.
Webpack was used because the current execution sandbox denied Turbopack's
worker process/local port operation; no application defect was identified.
The default build script remains unchanged. The generated scaffold configured
Tailwind only through a Turbopack loader; `postcss.config.mjs` and the matching
`@tailwindcss/postcss` development dependency also compile utilities for Webpack.
This corrects a CSS-processing gap exposed by the responsive browser test.
`next.config.ts` is unchanged.

## Slice verification

Install the browser once after `npm ci`:

```sh
npx playwright install chromium
```

Run these checks from the repository root:

```sh
npm run lint
npm run typecheck
npm test
npm run build -- --webpack
npm run test:e2e
git diff --check
```

Playwright runs `npm start -- --hostname 127.0.0.1 --port 3100` to serve the
production build on a dedicated loopback port. Run `npm run build -- --webpack`
before `npm run test:e2e`; the E2E command assumes a fresh build already exists.
It does not build automatically, reuse an existing server or fall back to
development mode. There is one Chromium project; the successful request journey
and dedicated responsive test use a 375px viewport without doubling the suite.
Browser downloads and local server/browser execution may require permissions in
a restricted environment. Failure traces and screenshots are written to `test-results/`, which is ignored
by Git, as is `playwright-report/`. Successful test traces are discarded and video
is disabled. Use fictional test data only. Open a retained trace with
`npx playwright show-trace <path-to-trace.zip>`. No formatter is configured; preserve existing code style.
Vitest uses `vitest.config.mts` to load its configuration as ESM without changing
the package module type.

Vertical Slice 01 verification covers lint, type checking, the active planning
domain unit suite, Chromium journeys and the Webpack production build. Whitespace
checks also passed. The browser runner emits a harmless environment warning
about `NO_COLOR` and `FORCE_COLOR`; no global environment settings were changed.

Domain tests cover boundaries, calendar validity, time ordering and normalization.
Form number strings accept unsigned base-10 integers or complete decimals, with
optional surrounding whitespace. Signs, commas, currency symbols, hexadecimal,
exponent notation, incomplete decimals, NaN and Infinity are rejected. Dates may
be in the past; times must finish later on the same day. Budget input is not
restricted to two decimal places; the summary uses standard GBP rounding.

Browser tests cover success, omitted hard no, accessible rejection and correction,
keyboard submission and editing, 375px usability with reduced motion, refresh
clearing, the root-page link and offline submission without requests or browser
storage. Without JavaScript, submission stays disabled with an explanatory message.

The scaffold audit reported no production vulnerabilities and five high-severity
development dependency findings along the chain
`eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces`
(stack-exhaustion denial of service). npm's proposed remediation was a breaking
change; no dependency remediation has been attempted.

## Roadmap

These areas are future work, not implemented capabilities:

- Private participant constraints and group preferences
- Fair plan selection and actionable suggestions
- Venue discovery and optional AI assistance
- Accounts, persistence, invitations and booking integrations

Each later area requires an explicitly scoped phase. Deployment is outside the
current slice.
