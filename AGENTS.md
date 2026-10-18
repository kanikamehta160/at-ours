# Product purpose

At Ours helps small groups make fair plans that actually happen. The product
will eventually collect individual constraints privately, find the group's
shared taste and turn it into a small number of actionable plans.

# Current phase

The repository is implementing one vertical slice at a time. The current phase
is plan-request capture and validation only. The local form, confirmation and
Edit request flow are implemented at `/plan/new`. See `docs/vertical-slice-01.md`.

# Engineering rules

- Use strict TypeScript.
- Do not use `any` or suppress TypeScript, ESLint or test errors without an
  explicit documented reason.
- Keep domain rules independent of React and Next.js where practical.
- Hard constraints must be enforced deterministically, not delegated to an LLM.
- Prefer the smallest implementation that satisfies current acceptance criteria.
- Do not introduce abstractions for hypothetical future requirements.
- Explain the need for each new production dependency before adding it.
- Add or update tests for changed behaviour.
- Preserve accessibility: semantic HTML, associated labels, keyboard support,
  visible focus and understandable errors.
- Do not log form contents or potentially sensitive participant information.
- Never commit secrets or real participant data.
- Use fictional test data.
- Do not introduce authentication, persistence, external APIs, AI integration,
  analytics, booking or payments unless a later phase explicitly requests it.
- Run relevant formatting, linting, type checking, tests and build verification
  after changes.
- Fix failures caused by the requested work.
- Do not commit, push, deploy or perform external writes unless explicitly
  requested.
- Stop after completing the requested phase.

# Definition of done

A requested phase is complete only when its acceptance criteria are met,
relevant automated checks pass and the final report lists commands, results,
assumptions and remaining risks.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
