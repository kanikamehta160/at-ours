# Vertical Slice 01 — Create a Plan Request

Status: implemented. This document describes the accepted local-only slice.
The root page introduces At Ours and links to the form at `/plan/new`.

## User story

As an organiser, I want to describe the basic shape of a group plan so that
At Ours has structured information from which future planning can begin.

## Fields

- Group name
- Group size between 2 and 6
- Date
- Start time
- End time
- Starting area
- Budget per person in GBP
- Mood
- Optional hard no

## Validation

All fields except hard no are required. Apply validation deterministically.

- Group name is trimmed and contains between 2 and 60 characters.
- Group size is an integer between 2 and 6.
- Date is a valid ISO calendar date (`YYYY-MM-DD`), including calendar validity.
- Start and end times use `HH:mm` format with valid 24-hour clock values.
- End time is later than start time on the selected date; overnight plans are
  outside this slice.
- Starting area is trimmed and contains between 2 and 80 characters.
- Budget is a finite number between £1 and £1,000, inclusive.
- Mood is one of: `relaxed`, `social`, `adventurous` or `surprise-me`.
- Hard no is optional, trimmed and no longer than 200 characters.

No future-date restriction is specified for this slice.

## Successful behaviour

- Valid input produces a structured confirmation summary of the request.
- The summary formats the budget in GBP using `Intl.NumberFormat` with `en-GB`.
- The summary displays readable field and mood labels.
- Hard no is shown only when a non-empty trimmed value was provided.
- Edit request returns to the form with all entered values restored.
- No data is persisted.
- No network request is needed to submit, validate or display the request.
- Refreshing the page clears the request.

Request state stays in memory. Submission prevents browser navigation and uses
the framework-independent planning schema. Invalid input preserves entered
values, shows associated field errors and focuses an announced error summary.
Submitted values are not logged. The interface uses system fonts with no external
font dependency. Submission remains disabled until JavaScript has hydrated.

## Accessibility

- Every field has a visible label.
- Validation messages are programmatically associated with fields.
- Errors are understandable without colour alone.
- Submission and summary are keyboard accessible, with visible focus.
- The page remains usable on a 375px-wide viewport.

## Testing expectations

- Domain-schema unit tests cover valid input and important boundaries:
  trimmed string lengths, integer group sizes, real calendar dates, valid time
  ranges and ordering, finite budget limits, allowed moods and optional hard no.
- A browser test covers the complete successful journey, including the
  structured confirmation, GBP budget formatting and populated editing at 375px.
- A browser test covers at least one rejected submission and its associated
  validation messages, route retention and preservation of valid values.
- Lint, type checking, unit tests, browser tests and production build pass.

Vitest runs the feature-scoped planning domain unit tests. Playwright runs
independent Chromium journeys against a freshly built production application
using `npm start` on a dedicated loopback port, without server reuse. Build with
`npm run build -- --webpack` before running `npm run test:e2e`; the browser suite
does not build automatically or fall back to a development server.
Failure-only traces and screenshots are ignored by Git. Use fictional data
throughout. See README.md for verification commands and environment limitations.

Numeric form strings accept unsigned base-10 integers or complete decimals with
optional surrounding whitespace. Signs, commas, currency symbols, hexadecimal,
exponent notation, incomplete decimals, NaN and Infinity are rejected. Budget
input may have more than two decimal places; GBP display uses standard currency
rounding. Date and time comparison does not depend on the machine timezone.

## Explicit non-goals

- Accounts
- Authentication
- Database persistence
- Invitations
- Participant responses
- Venue recommendations
- AI
- Maps
- Booking
- Payments
- Analytics
- Deployment
