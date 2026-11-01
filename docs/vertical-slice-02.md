# Vertical Slice 02 — Silent Budget

Status: authoritative specification draft for human review; not implemented.
Branch: `feature/silent-budget`.

This specification governs the next implementation phase. It is based on the
binding revised Silent Budget brief supplied for this task. No earlier Silent
Budget plan artifact was found in the repository or available conversation;
its contents have not been presumed or described as reviewed. If that artifact
is supplied later, reconcile it against these binding decisions before coding.

## 1. Purpose and user problem

An organiser's suggested budget is useful for planning, but group members may
feel uncomfortable publicly disagreeing with it. Silent Budget lets people
enter their own comfortable maximum, one at a time on a shared device, then
reveal a ceiling the group can use without displaying individual entries.

User story: As a group member, including the organiser, I want to contribute my
comfortable spending limit without the normal interface displaying my individual
entry to the group, so the plan can use a ceiling that respects every response.

This is a local, same-device prototype attached to the validated plan summary
at `/plan/new`. It does not organise remote participation or establish identity.

## 2. Terminology

| Term | Meaning |
| --- | --- |
| Suggested budget per person | The organiser's public suggested planning ceiling; the existing `PlanRequest.budgetPerPerson` field |
| Private limit | One person's own comfortable maximum per person in GBP |
| Expected count | The validated plan's group size, including the organiser |
| Sealed count | Number of accepted responses in the current session |
| Running minimum | Lowest sealed private limit so far; not displayed during collection |
| Sealed response | An entry accepted into the aggregate; its input is then cleared and removed |
| Handoff | A neutral screen between people, containing no entry field or amount |
| Ready to reveal | A shared pause after exactly the expected number of responses, before showing the result |
| Group-safe budget | `min(suggested budget, lowest private limit)` |
| Discard | Reset application-owned session state and remove the current input; not a claim about memory recovery or browser internals |

## Visual direction and prototype reference

This section adopts product language and visual principles from the approved
external exploration, not its source code, data model or integration behaviour.
Silent Budget remains a local pass-the-device flow within `/plan/new`. No new
route, home-page fork, persistence or remote-participant workflow is authorised.

### Adopt now

- Warm cream backgrounds, restrained rust/clay primary accents and dark-ink
  charcoal/brown text. Reuse the repository's existing colours and CSS variables
  rather than introducing another palette or design system.
- Editorial serif display headings using system-available fonts such as the
  existing Georgia stack; clean system sans-serif body text and controls.
- The existing At Ours wordmark and asterisk-style detail. Reuse that detail;
  it is a brand accent, not a privacy or security indicator.
- Generous whitespace, clear typographic hierarchy and quiet bordered surfaces.
  Keep the calm editorial character rather than conventional SaaS presentation.
- One primary decision per screen. Use each phase's existing primary action;
  keep Stop, Not now, Edit and restart actions visually secondary. Do not add
  extra actions merely to fill a card or imply unfinished functionality.
- Human, conversational microcopy that explains the next step without pressure
  or encouragement to match another person's budget.
- Strong visible keyboard focus, readable contrast, associated labels and
  textual error messages. Quiet borders must not replace the focus outline.
- Responsive behaviour at 375px: readable labels, wrapping copy, reachable
  actions and no horizontal overflow. Preserve desktop usability and logical
  reading/focus order when the layout changes.
- No new visual dependency or external font requirement. No external imagery,
  sound or animation is required or introduced for this slice. Do not depend on
  colour, movement, sound, gradients or glass effects to communicate progress.

### Approved language and placement

Use or adapt the following lines where they belong; do not put all five on the
same screen or repeat them throughout a collection session.

| Approved line | Natural placement for this slice |
| --- | --- |
| Good company. Less organising. | Existing root-page eyebrow; retain it there rather than repeating it in budget-entry screens |
| Plans that feel like us. | Existing root-page display heading; do not turn it into an extra heading on each session screen |
| A little less back-and-forth. | Existing plan-creation introduction/eyebrow; punctuation may follow the existing presentation |
| Make us a plan. | Existing `/plan/new` public form heading, adapted without the full stop if appropriate for a heading |
| Everyone gets a say. | A single explainer eyebrow introducing equal participation, including the organiser; not a promise of inference-proof privacy |

This is placement guidance, not an instruction to redesign the completed root
page. During handoff, private entry and reveal, use the phase's clear functional
heading rather than stacking public-form introductory copy and brand slogans.
The wordmark may remain as the existing, reset-aware home navigation control.

### Silent Budget visual behaviour

- The explainer should feel calm and protective rather than like a financial
  dashboard. Explain the privacy boundary in plain language, with the existing
  two-person warning kept readable rather than hidden in a tooltip or small print.
- Private entry shows only what the current participant needs: the question,
  labelled input, GBP help, truthful concealment statement, any generic error,
  Seal action and Stop action. Do not repeat the suggested amount or public plan
  summary as an anchor. Do not show names, earlier entries or a running result.
- Sealing must visually remove the entry field and amount. Clear and unmount
  the input as specified in sections 6–11; blurring, masking or merely hiding
  a populated field is insufficient. Do not add a receipt showing the last amount.
- The pass-the-device screen is neutral and safe to expose in the normal
  interface: only readiness instructions, sealed count and relevant controls.
  It must contain no private amount or amount-bearing accessible description.
- Ready to reveal is a collective pause. The explicit reveal works immediately
  without animation, countdown, confetti or sound. Preserve transition-based
  focus and non-sensitive announcements; reduced motion must not reduce access.
- On the public summary, keep **Group-safe budget per person** as the section
  heading and emphasise **Plan up to {amount} per person** as the result line.
  This is a planning ceiling, not a payment request or spending commitment.
  Format the amount as ordinary GBP; retain the lowered/unchanged explanation.
- Explain concealment and inference limits through words, not icons or colour
  alone. Do not use padlock imagery or imply encryption or anonymity. The
  approved promise and browser/DevTools threat boundary in section 9 still apply.

### Scope boundary

The prototype home page distinguishes **I have a plan** and **Let’s decide
together**. That distinction informs the future product; Slice 02 extends only
the existing validated-plan journey. Do not add a second unfinished home-page
pathway or copy its buttons as non-functional calls to action.

Explicitly defer the prototype's broader capabilities:

- Shareable invitation links and persistence
- Remote participants and named preference responses
- Organiser links and response polling
- Event finalisation and attendance confirmation
- Accounts
- Decompression or immersive media experiences

These are exclusions, not prerequisites or hidden acceptance criteria. They
supplement the explicit non-goals in section 17, including authentication,
external APIs, AI, recommendations, booking, payments, analytics and deployment.
Do not adopt the prototype's link-visible response policy for private limits.

Explicitly reject for Silent Budget:

- Publicly displaying individual private limits or associating them with names
- Repeating the full plan form for every participant
- Making sensitive constraints visible to everyone with a link
- Adding unfinished pathways or non-functional calls to action

### Long-term product insight — recorded, not implemented

Public/shareable preferences may eventually include availability, area, mood
and ideas. Protected constraints may include budget, accessibility, dietary
needs, sobriety preferences and private vetoes. Future group planning should
combine both without unnecessarily attributing protected constraints to
individuals. This distinction does not authorise new preference fields, sharing,
storage, participant identities or a generic permissions architecture in Slice 02.
It does not change Slice 01's historical hard-no field or make its contents
shareable; no current plan/request values are made public through a link.

### Prototype provenance

- Reference: [At Ours live prototype](https://at-ours-plans.earlyauk6.chatgpt.site).
- Created as an external design/product exploration for At Ours.
- Reviewed on **2026-11-01**. The public home page loaded successfully in
  Chromium and was inspected visually and through its rendered visible text.
  No personal data was entered, no form was submitted and no additional plan
  was created. Only the public home page was inspected; other flows were not
  exercised. The supplied binding observations inform the broader scope boundary,
  not an assertion that unseen functionality was independently verified.
- The repository specification remains authoritative. The live prototype is
  not a runtime dependency and may change or disappear; no asset, font, script,
  source-code import, embedded page or network call to it is needed by this slice.
- Its implementation does not automatically define the production architecture.
  Retain the local reducer, running-minimum invariant, existing production-mode
  verification and navigation-reset contract specified here.

## 3. Exact interface copy

Use the existing warm, restrained visual language. Do not add decorative effects,
new fonts or animation. Interpolate only public information and counts where
shown below. `{amount}` uses ordinary `en-GB` GBP currency formatting.

### Public form and plan summary

- Rename the existing budget field's visible label to **Suggested budget per person**.
- Rename that row in the plan summary to **Suggested budget per person**.
- Keep the domain property `budgetPerPerson`; no contract rename is needed.
- Below the public form label: "Your suggested planning ceiling, in GBP."
- Summary action: **Start Silent Budget**.
- Keep the existing **Edit request** action.

### Explainer

- Eyebrow: **Everyone gets a say.**
- Heading: **Find a budget that fits**.
- "Everyone, including the organiser, enters what they would personally feel comfortable spending."
- "We need {expectedCount} responses."
- "Suggested budget per person: {amount}." Show this once in the explainer;
  do not render the public summary alongside it or repeat it during entry.
- "At Ours won’t display individual entries. When everyone is finished, we’ll show one group-safe budget: the lower of the suggestion and the lowest private limit."
- "Private doesn’t mean anonymous. In a small group, people may still be able to infer something from the final result."
- "This session stays only in this tab. Refreshing or stopping clears it."
- "A sealed entry cannot be edited individually. If anyone needs to change an entry, stop and restart the session."
- For exactly two people, additionally: "There are two of you. Knowing your own limit and the group result may make the other person’s limit easier to infer."
- Primary action: **Begin Silent Budget**.
- Secondary action: **Not now**.

### Handoff, including before the first entry

- Heading: **Pass the device**.
- "{sealedCount} of {expectedCount} responses sealed."
- "Pass the device to someone who has not entered a limit yet. The organiser takes a turn too."
- Primary action: **I’m ready to enter my limit**.
- Secondary action: **Stop Silent Budget**.

### Private entry

- Heading: **What feels comfortable for you?**
- Visible input label: **Your comfortable maximum per person**.
- Help: "Enter your own maximum in GBP, from £1 to £1,000, with up to two decimal places."
- "At Ours won’t display your individual entry to the group."
- "Seal your entry before passing the device."
- Primary action: **Seal my limit**.
- Secondary action: **Stop Silent Budget**.
- Generic error, for every rejected value: "Enter an amount from £1 to £1,000 using digits and up to two decimal places."

Do not show the suggestion, previous entry, participant names, participant-specific
encouragement or an intermediate group result on this screen.
Do not echo rejected input in an error or status message.

### Shared reveal

- Heading: **Ready to reveal**.
- "All {expectedCount} responses are sealed. Bring everyone together before revealing the group-safe budget."
- Repeat the two-person inference warning here for a two-person group.
- Primary action: **Reveal group-safe budget**.
- Secondary action: **Stop Silent Budget**.

### Completed result on the plan summary

- Result heading: **Group-safe budget per person**.
- Prominent result line: **Plan up to {amount} per person**; format `{amount}` as GBP.
- If lower than the suggestion: "The suggestion has been lowered to fit the group’s limits."
- Otherwise: "The suggested budget fits within everyone’s submitted limit."
- "Individual entries are not displayed."
- To replace a completed session, use the explicit action: **Start Silent Budget again**.
  This discards the old result before opening a new explainer.
- Keep **Edit request**. Editing clears the result immediately, even if the
  organiser later resubmits unchanged values.

After **Stop Silent Budget** or **Not now**, return to the existing plan summary
with **Start Silent Budget**, no result and the status "Silent Budget stopped. No group-safe result is kept."
This status contains no amount and is not session aggregation state.

The explainer gives the concise user-facing promise and inference warning. Keep
technical implementation and threat-boundary details in section 9, not in the
primary interface copy. Do not strengthen the promise or encourage matching the
suggested amount.

## 4. Resolved product decisions

- Every validated group size from 2 through 6 is supported. Every member,
  including the organiser, contributes exactly once in the intended journey.
- Expected responses equal group size, not group size minus one. The organiser
  does not get an additional special response or nudge.
- The app enforces the exact response count, not the identities of respondents.
- Private limits may exceed the suggestion, but the group-safe result may not.
- No result is shown automatically when the last response is sealed. Retain
  the shared ready-to-reveal phase and require its explicit reveal action.
- There is no individual response editing, undo, review or per-person history.
  Stop and start again if any sealed response needs to change.
- The completed result remains with the in-memory plan summary while staying
  on that page. It is cleared on editing, starting again or navigation reset.
- Resubmitting the plan always begins with no group-safe result. Recompute only
  after a completely new Silent Budget session.
- Collection replaces the public summary in the normal interface. Do not merely
  leave the summary and suggested figure visible beside each private input.

## 5. User journey

1. Complete the existing plan form using the newly labelled suggested budget.
2. Review the validated public summary and choose Start Silent Budget.
3. Read the explainer, including the two-person warning when applicable.
4. Begin, then hand the device to any member, including the organiser.
5. That person chooses the readiness action, enters a limit and seals it.
6. A valid seal removes the private input before showing the neutral handoff.
   Repeat until exactly the expected count has been accepted.
7. After the last seal, show Ready to reveal with no amount. Gather the group.
8. Reveal. Return to the plan summary with the public suggestion and completed
   group-safe result; never display the raw running minimum separately.
9. Edit request clears the result and restores only the public plan-form draft.
   Stop/restart, refresh and navigation follow the contracts below.

## 6. State machine

Use one pure domain reducer and an explicit `initialSilentBudgetState()` returning
`{ phase: 'idle' }`. Do not use a module singleton, global store or saved reducer
history. The validated public plan is owned separately by the route-local flow.

State variants:

- `idle`: phase only; no session or result.
- `explaining`: phase and `expectedCount` only.
- `handoff`, `entry`: phase, `expectedCount`, `sealedCount`, `runningMinimum`.
  Initial minimum is `null` when sealed count is zero.
- `ready`: the same four fields, with count equal to expected count and a finite
  running minimum. It is still collection state, with no visible amount.
- `completed`: phase, `groupSafeBudget`, `wasLowered` only. Drop counts and the
  running minimum. The validated plan still supplies public summary data.

| Current phase | Action and precondition | Next phase and effect |
| --- | --- | --- |
| idle | START with integer expected count 2–6 from validated plan | explaining; store expected count |
| completed | START with valid expected count, via Start Silent Budget again | explaining; discard prior result, store expected count |
| explaining | BEGIN | handoff; count 0, minimum null |
| handoff | ENTER, count less than expected | entry; preserve count and minimum; mount a fresh empty input |
| entry | SEAL with a value of the type inferred from the validated private-limit schema, count less than expected | Increment count once; minimum becomes amount if null, otherwise `min(previousMinimum, amount)`; remove current input; handoff if more responses needed, otherwise ready |
| entry | Rejected input | Stay in entry with aggregation unchanged; UI shows only the generic error |
| ready | REVEAL with valid current suggested budget from validated plan | completed; result `min(suggestion, runningMinimum)` and `wasLowered = result < suggestion`; retain no running minimum |
| explaining, handoff, entry, ready | STOP, including Not now | idle; discard count, minimum, current input and generic error |
| any | RESET, triggered by edit or route departure | idle; discard session/result and input |
| idle | STOP | idle; no-op |

All other action/phase combinations are no-ops returning the existing state:
BEGIN before START, ENTER outside handoff, SEAL outside entry, REVEAL before
ready, STOP on completed, and START during collection. Invalid START counts,
invalid SEAL amounts and invalid REVEAL suggestions are also no-ops. Invalid
runtime payloads include wrong value types, non-finite amounts and amounts
outside the GBP range. Textual grammar is checked before an action is created,
not reconstructed inside the reducer.
The UI must not silently repair invalid values or expose them through errors.

Actions may transiently carry one schema-validated amount into SEAL; never
retain action history. Its payload type is inferred from the private-limit schema
as specified in section 8; it must not accept an unvalidated generic `number`
at the TypeScript call site. REVEAL reads the public suggestion from the validated plan, not from a
second organiser input. Capture it as part of that action rather than adding it
to collection state. Edits reset the session before changing the public plan.
Double-clicks or repeated dispatches after a phase transition cannot count an
extra response. Return the same state for an invalid transition; do not throw
or log sensitive action payloads.

## 7. Domain rules and invariants

> No state retains the collection of submitted private limits. During
> collection, only the response count and running minimum needed for aggregation
> are retained.

The collection state also contains the phase and validated expected count, as
specified above. This invariant does not claim there is no private value in
state: the running minimum can equal a participant's limit.

- Do not retain an array, list, map, per-person object, previous states or action
  log containing submitted limits. Do not put them in refs, URLs or form drafts.
- A person’s current unsealed input necessarily exists transiently in its DOM
  control and parsing locals. Keep that separate from aggregate state. Clear
  and unmount it on valid seal, stop, edit and controlled navigation departure.
- `0 <= sealedCount <= expectedCount`; expected count stays fixed for a session.
- Minimum is null iff count is zero; otherwise it is a valid GBP amount and can
  never increase as responses are sealed.
- A failed validation never increments count or changes the minimum.
- Aggregation is order-independent. Exactly N successful seals are required
  for a group of N, including N = 2 and N = 6.
- A valid group-safe result is no greater than the suggestion or any submitted
  private limit. Never reveal a mean, maximum, distribution or individual entry.
- Completed state and the presentational result component contain only the
  result and information needed to say whether the suggestion was lowered.
  The result component must never receive individual limits or running minimum.
- No raw private draft is copied into the existing public plan draft. No
  participant identifier, name or identity verification is introduced.

## 8. Currency parsing rules

Apply one genuine shared GBP form-value rule to the public suggested budget and
every private limit. Existing Zod is sufficient; require no new dependency.

The processing boundary is explicit and ordered:

1. Receive the raw form string; reject non-string form values.
2. Trim surrounding whitespace.
3. Match the complete trimmed string against the two-decimal grammar
   `^[0-9]+(?:\.[0-9]{1,2})?$`. Do not accept a prefix or coerce first.
4. Convert only a matching value to a number.
5. Validate finiteness and the £1–£1,000 inclusive range.
6. Return only the successful schema output for domain use.

- Accept unsigned base-10 integers or complete decimals with one or two
  fractional digits. Examples: `1`, `1.0`, `1.01`, `25.50`, `1000.00`,
  ` 25.50 ` and `001.50`.
- Reject blanks, `0.99`, `1000.01`, `£25`, `1,000`, `+25`, `-25`, `2e1`,
  `0x19`, `.50`, `25.`, `NaN`, `Infinity`, `25.001` and `1.234`.
- Establish fractional-digit grammar from that raw string. Do not convert first
  and try to recover the original decimal precision from `String(number)`,
  multiplication, numeric equality or display formatting. Numeric `1.10` and
  `1.1` are the same JavaScript value; raw strings `"1.10"` and `"1.1"` are
  distinct permitted spellings, and raw `"1.100"` must be rejected before conversion.
- The shared `gbp.ts` module exports the form-value schema and the private-limit
  schema, reusing the same parsing pipeline. Infer the reducer payload as
  `PrivateLimit = z.output<typeof privateLimitSchema>`. Use a small Zod brand on
  that output (or equivalent Zod-inferred validated type) so a generic `number`
  cannot accidentally satisfy SEAL's payload type. A plain inferred `number`
  alone would not provide that protection. Do not add a money library or wrapper
  framework; the runtime value can remain a number.
- The public plan schema consumes the raw-string GBP pipeline and produces its
  validated numeric budget output. Its form parsing boundary must not bypass
  the grammar through a generic numeric-input alternative. Update old unit
  fixtures that supplied numeric budgets at that raw-input boundary to supply
  strings; already validated numeric output remains the domain representation.
  This does not change `groupSize` parsing or require reparsing domain output.
- Numeric guards may defend reducer runtime boundaries against malformed actions,
  wrong types, non-finite amounts and out-of-range amounts. They do not establish
  the user's original fractional-digit grammar or prove that a runtime number
  passed through the form schema. A compile-time brand is not a security boundary
  against a caller controlling JavaScript. Do not retain the raw string in state
  or attach it to the validated output as a workaround.
- Use `type="text"` with `inputMode="decimal"` for both GBP fields so raw text is
  validated consistently instead of native number controls normalizing invalid
  grammar before parsing. The private field additionally follows section 11's
  autofill, naming and DOM-clearing requirements. Keep visible labels and GBP
  help; prevent native submission and do not duplicate parsing in components.
- Private validation uses the exact generic error in section 3 for every failure;
  do not render a Zod issue or submitted text directly. The public suggested
  budget may reuse that generic error with its own field association.
- Format accepted output using `Intl.NumberFormat('en-GB', { style: 'currency',
  currency: 'GBP' })`. Do not correct invalid precision through display-only
  flooring, `roundingMode: 'floor'`, silent truncation or silent rounding.

This intentionally tightens Slice 01's arbitrary-decimal budget grammar in the
future implementation. Replace its acceptance of raw `"1.234"` with regressions
that reject fractional pennies before conversion in both public and private
fields. Preserve all other Slice 01 rules and public form behaviour. Its historical
specification must not be rewritten to describe this new rule.

Plain numeric output is acceptable for these bounded comparisons. Do not migrate
to integer pence in this slice. Payment or money arithmetic later requires
deliberate minor-unit money modelling rather than a speculative change now.

## 9. Privacy promise and threat boundary

Promise only: "At Ours won’t display your individual entry to the group."
The normal interface conceals sealed entries, does not retain a collection of
individual limits, and shows only the final bounded aggregate after shared reveal.

A running minimum or the final result may equal an individual's entry. The
organiser's public suggestion can also determine the result. People who know
other limits may infer information, particularly in a two-person group. Do not
claim protection from inference. The two-person warning is mandatory.

This is not a security boundary against someone who can observe the screen,
control the device, inspect DevTools or instrument the JavaScript runtime.
Sealing and reset do not guarantee forensic removal from memory, browser tooling,
OS snapshots or input-method history. Browser autocomplete and suggestions are
not fully controllable; the input mitigations reduce accidental redisplay rather
than guaranteeing secrecy or forensic erasure. Do not connect reducer actions to logging,
state-history tools or analytics.

No URL/query/hash/history-state serialization, cookies, local/session storage,
IndexedDB, API request, server action, submitted-value logging, telemetry
integration or persistent storage of submitted private values is permitted.
The in-memory running minimum is permitted only as specified above. The ordinary app asset/navigation
requests are separate from submission; no request carries a private amount.
Failure traces/screenshots may record fictional test inputs, so they must stay
Git-ignored and must never use real participant data.

## 10. Navigation contract and installed-framework evidence

The current `next.config.ts` enables `cacheComponents` and `partialPrefetching`.
The installed Next.js 16.4.1 guidance was read at:

- `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/cacheComponents.md`, section Navigation with Activity.
- `node_modules/next/dist/docs/01-app/02-guides/preserving-ui-state.md`, especially Forms, inputs, and state; Effect and media cleanup; and Testing.
- `node_modules/next/dist/docs/01-app/02-guides/migrating-to-cache-components.md`, section UI state preservation.
- `node_modules/next/dist/docs/01-app/01-getting-started/04-linking-and-navigating.md`.
- `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/use-router.md`, including refresh and bfcacheId.
- `node_modules/next/dist/docs/01-app/03-api-reference/02-components/link.md`, section onNavigate.

These docs say Activity hides prior routes while preserving state and DOM;
effect cleanup runs when a route is hidden and effects restart when shown.
Unmount-only cleanup is insufficient. `router.refresh()` preserves unaffected
client state and is not a full browser reload. Keying on `router.bfcacheId` also
preserves state on back/forward, so it is not the required privacy reset.

### Binding navigation outcomes

The outcome is binding; the reset mechanism is provisional until demonstrated.

- Every application-owned same-tab exit resets the active session and completed
  result before navigation. Clear the current private input's DOM value and
  remove it as part of that controlled reset path before leaving entry.
- The At Ours wordmark/home action in `/plan/new` uses that same controlled path
  to `/`. Keep semantic link and keyboard behaviour; the exact callback or
  navigation technique is selected by the characterisation below, not mandated
  here. Do not introduce new exit routes just to test this.
- Edit request resets the session/result before showing the populated public
  form. Resubmitting, even unchanged, cannot restore the previous result.
- Full browser refresh clears the public plan, session and completed result.
  Test with `page.reload()`, not `router.refresh()`, in entry with a draft, after
  a seal, at ready and after completion. Starting again requires a validated plan.
- Tested Next.js Activity hide/return paths must not restore a private draft,
  collection progress or completed result. Test wordmark departure from partial,
  ready and completed sessions, then Back and a fresh root-to-plan navigation.
  Also test browser Back away and Forward to return within the same Next.js
  document. Inspect visible UI and any retained input DOM needed to check clearing.
- Stop/Not now are local resets, not navigation. Opening a home link in another
  tab through a modified click does not abandon the original document.
- Universal restoration after full-document departures through browser BFCache
  remains outside the guarantee, as described below. Do not conflate this with
  the binding same-document Activity-return behaviour.

### Required first implementation step: framework characterisation

Before selecting a lifecycle mechanism or building the Silent Budget flow:

1. Re-read the relevant installed Next.js guidance above, including Activity
   preservation, client navigation and `router.refresh()` behaviour.
2. Create a minimal focused production-mode Playwright characterisation in the
   planned `tests/e2e/silent-budget.spec.ts`. Use the planned route-local owner
   and non-sensitive fictional state/draft markers as a minimal probe, not a new
   route, global store or navigation framework. Build freshly and run via the
   existing production `npm start` server configuration.
3. Observe explicit exit ordering, Activity hide/return and state reinitialization.
   Evaluate candidate transition callbacks, effects, `flushSync` or other small
   local techniques. None, including `useLayoutEffect` cleanup, is mandated until
   the evidence proves the required outcomes. Unmount cleanup alone is not proof.
4. Demonstrate that the chosen approach works in production, resets before an
   app-owned exit, safely handles React Strict Mode, and does not erase a newly
   started session during mount, cleanup, reactivation or a subsequent navigation.
   Production execution alone does not demonstrate development Strict Mode
   effect replay; characterise that safety separately as necessary using the
   existing tooling. Keep the delivered E2E suite in production mode.
5. Record the observations and selected mechanism during implementation, replace
   temporary probe assertions with regression coverage of the real flow, and
   remove temporary probe UI before the slice is delivered. No global state,
   framework-configuration changes, new dependency or shared-layout session state
   is allowed as a workaround.

If Activity return cannot be reset reliably without disproportionate architecture
expansion, stop implementation and report the observed lifecycle, failing test
and evidence. Do not silently weaken the requirement or add a global navigation
framework. The subsequent flow implementation is gated on this characterisation;
the acceptance criteria do not presume that any proposed cleanup already works.

### Browser back-forward cache limitation

A full-document departure, tab closure, browser session restore or browser-managed
back-forward cache is outside the deterministic application-owned navigation
contract. The browser may snapshot and restore a document/heap or form state.
The prototype cannot promise universal clearing or secure removal for these
platform behaviours, including restoration after a full-document departure.
Do not claim that every conceivable Back/Forward operation clears state. Record
observations if tested, but do not depend on universal BFCache eviction, pagehide
callbacks or unmount cleanup to make a stronger promise. Stop an unfinished
session before leaving the app or returning the device to unrelated users;
ordinary participant handoffs follow section 5 and do not stop collection.

## 11. Accessibility requirements

- Visible associated labels; the private field is explicitly labelled with its
  comfortable-maximum wording. No placeholder-only label or hidden-only field.
- Generic private errors are linked using `aria-describedby`; mark invalid input
  with `aria-invalid`. Announce errors without repeating submitted values.
- Move focus on phase transitions: explainer heading after START; handoff heading
  after BEGIN/non-final SEAL; private input after ENTER; ready heading after final
  SEAL; result heading after REVEAL; plan summary after STOP; public form after Edit.
- Use stable refs and effects keyed to phase/entry transitions. Do not use inline
  ref callbacks that focus on every render or steal focus during keystrokes.
  A private validation failure leaves focus in the current interaction and uses
  its generic announcement; it does not trigger a phase-focus effect.
- The private input must use `type="text"`, `inputMode="decimal"` and
  `autoComplete="off"`. Do not give it a participant-identifying or stable
  semantic name. Associate a visible label using an id that can be scoped to
  the current turn; a label association does not require a submitted field name.
- Read the raw value locally through the current input's ref/DOM control,
  rather than serializing it through native form submission. Prevent native
  navigation and keep submission disabled until hydration, as with Slice 01.
- Create a fresh keyed input for every participant turn. Clear its DOM value
  before leaving entry on seal, stop, edit or controlled navigation; remove and
  unmount it before rendering handoff. Do not merely hide the populated field
  with CSS or Activity. Confirm the next participant receives an empty input.
- Browser autocomplete, input-method history and browser suggestions are not
  fully controllable. These mitigations reduce accidental redisplay; they are
  not a secrecy or forensic-erasure guarantee. Stop/restart must not restore
  a draft from application-owned state.
- Status announcements contain only non-sensitive phases/counts, such as
  "{sealedCount} of {expectedCount} responses sealed." Do not announce amounts
  while collecting or derive focus keys from the private amount.
- All actions support keyboard operation with visible focus and logical order.
  Sealing/validation must not trigger native browser navigation before hydration.
- Concealment and errors never depend on colour alone. Do not render private
  amounts in titles, accessible descriptions, live regions or hidden summaries.
- At 375px, labels, controls, handoff, errors and result wrap without horizontal
  overflow. Preserve desktop usability, contrast and reduced-motion behaviour.
- The existing form/summary focus handlers must be made transition-based where
  their reuse would otherwise refocus on routine renders or route reactivation.

## 12. Exact implementation file plan

All paths below are proposed for the future implementation, not changes made
by this documentation task. Prefer direct props and local state. No generic
form engine, repository/service/adapter layer or global state abstraction.

### Create

| File | Responsibility |
| --- | --- |
| `src/features/planning/domain/gbp.ts` | Shared raw-string GBP parsing pipeline and Zod-inferred/branded private-limit output; runtime numeric guards do not reconstruct textual precision |
| `src/features/planning/domain/gbp.test.ts` | Focused raw-string grammar, precision and boundary cases |
| `src/features/planning/domain/silent-budget.ts` | Discriminated state/action types, explicit initializer, pure reducer and deterministic bounded result calculation |
| `src/features/planning/domain/silent-budget.test.ts` | Transition, count, minimum, ceiling and reset invariants |
| `src/features/planning/components/plan-request-flow.tsx` | Route-local owner of public draft/validated plan and Silent Budget reducer; controlled navigation reset and Activity-return outcomes using the mechanism proved by the initial framework characterisation; no global provider |
| `src/features/planning/components/silent-budget-session.tsx` | Explainer, handoff and ready screens, transition focus and non-sensitive announcements; orchestrates private entry |
| `src/features/planning/components/private-budget-entry.tsx` | Fresh keyed text/decimal/autocomplete-off input with no stable semantic name; local raw-string parsing, generic errors, DOM clearing on every exit and no entry history |
| `src/features/planning/components/silent-budget-result.tsx` | Pure presentation of only group-safe result and lowered flag |
| `tests/e2e/silent-budget.spec.ts` | Initial minimal production framework characterisation, then independent real-flow Chromium regressions using fictional values and role/label selectors |

### Modify

| File | Responsibility of change |
| --- | --- |
| `src/features/planning/domain/plan-request.ts` | Reuse the shared GBP rule for `budgetPerPerson`; preserve other fields and group-size parsing |
| `src/features/planning/domain/plan-request.test.ts` | Replace arbitrary-precision acceptance with new GBP regressions; retain meaningful Slice 01 coverage |
| `src/components/plan-request-form.tsx` | Public suggested label/help and text/decimal input; preserve validation and draft behaviour while exposing validated plan/draft through explicit callbacks to the local owner |
| `src/components/plan-request-summary.tsx` | Suggested label, session entry action and optional result presentation; transition-safe focus; no private values passed in |
| `src/app/plan/new/page.tsx` | Keep route/main/metadata; delegate the wordmark, public form/summary and local session flow to the new client owner |
| `src/app/globals.css` | Only styles needed for usable session controls, errors and focus within the existing visual language |
| `tests/e2e/plan-request.spec.ts` | Update budget labels and grammar regressions; preserve existing plan creation, editing, refresh and privacy checks |
| `AGENTS.md` | During implementation only, describe the current Silent Budget phase and its privacy/lifecycle invariants without weakening existing engineering rules |
| `README.md` | During implementation only, describe the new local journey, public/private semantics, two-decimal rule, reset boundaries, limitations and actual verification results without hard-coded counts |

No changes are needed to package dependencies, package scripts, Vitest discovery,
Playwright production-server configuration, root-page routing or Next.js flags.
The existing Vitest pattern discovers new feature-domain tests. Existing
Playwright discovers the new E2E file and already uses `npm start` on
`127.0.0.1:3100` with server reuse disabled. No new route or API is needed.

Implementation order: focused installed-framework characterisation and minimal
production Playwright proof of the lifecycle/reset mechanism first; then shared
raw-string GBP schema/tests and plan regressions; reducer/tests; private entry
and phase screens; result; route-local integration using the proved reset path;
production regressions; implementation-status documentation; full verification.

## 13. Focused test expectations

Prefer table-driven boundaries and representative journeys rather than chasing
a total count. Use fictional values only, including diagnostic artifacts.

### Unit coverage

- Grammar/fractional-digit tests operate on raw strings: section 8's accepted
  and rejected spellings, whitespace, full-string matching, both endpoints,
  fractional pennies and finite/range enforcement after conversion. Reject
  non-string values at the form parser boundary.
- Public plan regression: raw `"1.234"` is rejected; `"1.23"`, `"1.10"`, `"1.1"`
  and both bounds are accepted; `"1.100"` is rejected. Do not test numeric `1.10`
  versus numeric `1.1` as though their original textual precision still existed.
  Group name/size/date/time/area/mood/hard-no behaviour is otherwise unchanged.
- Reducer tests obtain valid SEAL payloads through a test helper that calls
  `privateLimitSchema.parse(rawString)`, not arbitrary numeric literals or casts
  used as valid inputs. Assert that a generic `number` is not assignable to SEAL's
  payload type. Separately exercise invalid runtime action shapes, wrong value
  types, NaN, Infinity and out-of-range values without weakening production types
  or adding `any`/error suppressions; a narrowly scoped, explicitly documented
  test-only `unknown` cast may simulate a JavaScript caller at that boundary.
  Invalid generic runtime payloads must not advance collection.
- Initializer and every valid transition; wrong-phase actions and invalid values
  leave state unchanged. Invalid START count, early reveal, extra seal and
  repeated final seal cannot advance state or expose an intermediate result.
- Exact expected response count, including two and six people; organiser counts.
- Order-independent minimum, equal limits, and suggestion below/equal/above the
  lowest private limit. Example: suggestion £30, limits £40/£25/£35 gives £25;
  suggestion £20 with the same limits gives £20, not £25.
- State shape contains only specified fields. Snapshots/assertions through a
  sequence must show no individual-value collection, input draft, action history
  or completed running minimum. A test fixture may contain a fictional array
  to feed actions; production state may not retain that array.
- STOP and RESET remove aggregate/result; restart begins at zero with null
  minimum. Tests must not assert that no private number ever exists in state.

### Browser coverage

- Complete plan -> explainer -> N fresh entries including organiser -> shared
  ready -> explicit reveal -> group-safe result retained on the public summary.
- Suggestion appears once in the explainer and not on handoff/entry/ready screens;
  the full public summary is not rendered during collection. Count/status and
  previous input values do not expose amounts through text or accessibility names.
- Two-person group remains supported and sees the mandatory inference warning.
- Rejected private input leaves count/minimum unchanged; the linked generic
  error never echoes submitted text. Correct input can then be sealed.
- Assert private text input, decimal keyboard hint, autocomplete-off mitigation
  and absence of a participant-identifying/stable semantic name. Verify local
  reading does not cause native submission or serialize the private value.
- After seal, the old input is unmounted before handoff; after stop, edit or
  controlled departure its DOM value is cleared before leaving entry. The next
  participant gets a fresh empty input. No application-owned draft returns on
  restart. Browser-managed suggestions remain an acknowledged limitation.
- Stop from partial collection and ready; starting again requires every response.
  No individual edit/review controls. Repeated seal/reveal does not advance twice.
- Result never exceeds suggestion and says correctly whether it was lowered.
  Edit clears it immediately; unchanged resubmission does not restore it.
- Run the minimal production lifecycle characterisation before committing to a
  reset mechanism. Later real-flow tests cover full refresh and explicit
  navigation/cache-return outcomes from section 10, including unfinished and
  completed sessions. Verify restart after cleanup/reactivation is not erased;
  characterise Strict Mode safety separately where production cannot expose it.
  Record additional full-document BFCache observations as limited observations,
  not guarantees. If reliable local reset cannot be proved within scope, stop
  and report evidence instead of expanding architecture or weakening criteria.
- Listen for submission requests, console messages and server-log markers using
  distinctive fictional inputs. Verify no submitted amount is serialized into
  URL/query/hash/history state or browser storage, logged or sent on submission.
  Asset/navigation requests are not budget submission requests.
- Keyboard journey, phase-based focus, stable typing focus after multiple
  keystrokes, non-sensitive announcements, understandable errors and visible focus.
- Dedicated 375px test for entry/error/handoff/ready/result; keep one Chromium
  project rather than duplicating the entire suite for each viewport.
- Preserve Slice 01 E2E behaviour apart from the deliberate budget label/grammar
  changes. Do not use arbitrary sleeps, external services or brittle selectors.

Run in this order after implementation:

```sh
npm run lint
npm run typecheck
npm test
npm run build -- --webpack
npm run test:e2e
git diff --check
git status --short --branch
```

Playwright must exercise the just-built production application via `npm start`.
Do not reuse a development server or silently fall back to one. Ask for required
execution permission for the test server/browser; report actual environment
failures separately. Do not change the default Next.js build script. No formatter
is currently configured; preserve repository formatting and check whitespace.

## 14. Dependency assessment

No new dependency is required. Reuse strict TypeScript, Zod, React/React DOM,
Next.js, Tailwind, Vitest and Playwright already installed. A small shared GBP
module is justified by the identical current rule in two real form fields;
additional currency frameworks, form libraries and state machines are not.
Do not upgrade dependencies or run automatic audit remediation in this slice.

## 15. Acceptance criteria

1. The validated public plan labels its existing budget as Suggested budget per
   person; both GBP fields validate the complete raw-string two-decimal grammar
   before conversion, then finite inclusive bounds. Only validated output enters
   domain use; SEAL's inferred validated type prevents accidental generic numbers.
2. Silent Budget starts only from a validated plan. Expected responses equal its
   group size, including the organiser; groups of 2–6 work.
3. The intended journey accepts exactly one response per person, with a neutral
   handoff and fresh entry for each; the interface enforces count, not identity.
4. Generic private validation never echoes input and never advances collection.
5. Sealing clears the private DOM value and unmounts the input before handoff;
   the next keyed input is empty and uses the specified autofill mitigations.
   Production state retains no individual-limit collection; collection retains
   only phase, expected count, sealed count and running minimum. Concise copy
   explains concealment and inference before collection, including the mandatory
   two-person warning repeated before reveal. The full engineering threat
   boundary remains documented without being forced into primary interface copy.
6. Exactly N responses produce Ready to reveal, not an automatic amount. Only
   explicit shared reveal produces `min(suggestion, runningMinimum)`.
7. The plan summary displays the final GBP result and whether suggestion was
   lowered; the result component receives no individual limits/running minimum.
8. Stop/restart discards unfinished aggregation. Editing clears a completed
   result before the public form appears; resubmitting does not restore it.
9. Every app-owned same-tab exit, including the wordmark, resets before navigation;
   Edit resets before the public form; full refresh clears plan/session/result.
   Tested Next.js Activity hide/return paths restore no private draft, progress
   or result. The implementation first proves a local mechanism in production,
   checks Strict Mode and new-session safety, and stops with evidence if these
   outcomes cannot be met within scope. No mechanism is mandated in advance and
   no universal full-document BFCache or memory-erasure promise is made.
10. Keyboard access, associated labels/errors, non-sensitive announcements,
    transition-only focus and 375px usability meet section 11.
11. No budget submission request, URL serialization, browser storage, submitted
    value logging or out-of-scope integration is introduced.
12. Focused domain tests, Slice 01 regressions, production browser journeys, lint,
    type checking, build and whitespace checks pass. Report commands, results,
    assumptions and remaining risks. Do not claim any implementation checks
    passed merely because this specification was reviewed.

## 16. Risks and limitations

- Two-person/small-group inference is inherent; minimum-only aggregation does
  not prevent it. Knowing enough other inputs can reveal information.
- Shared devices, shoulder-surfing, screen readers announcing while typing,
  browser inspection and instrumented runtimes are outside the secrecy promise.
- There is no identity verification: one person could submit multiple turns.
- A minimum protects the ceiling only according to the values actually entered;
  it is not consent, a spending commitment or proof everyone can afford a plan.
- Fractional-penny form input accepted in Slice 01 will be rejected before
  conversion in Slice 02. Document the raw-string boundary change and prove
  public form regressions; numeric output cannot recover original text precision.
- Running minimum is sensitive even without a collection. Discard is logical
  state reset, not secure erasure; tools and browser snapshots may retain copies.
- Activity lifecycle and arbitrary browser BFCache restoration are different.
  The reset mechanism is unresolved until the initial characterisation proves
  the binding outcomes. Tests cover installed-framework/Chromium behaviour,
  not every browser runtime; lifecycle uncertainty is a stop/report gate rather
  than permission for a global navigation architecture or weaker guarantees.
- Plain-number comparison is bounded; payments/arithmetic require a separate
  deliberate money representation later.
- Existing Turbopack execution restrictions justify the supported Webpack build
  verification path. Local browser/server permissions may still be necessary.
  Previously reported development dependency advisories are not remediated here.

## 17. Explicit non-goals and documentation boundaries

- Persistence, databases, cookies or saved budget sessions
- Accounts and authentication
- Remote participants, invitations or invitation links
- Participant names, identities, per-person response editing or response history
- Individual-limit disclosure, auditing or inference-proof guarantees
- AI, external APIs and venue recommendations
- Maps, booking, payments or money arithmetic
- Analytics, session replay and production participant-data collection
- Deployment, publishing, new remotes, commits or pushes without separate request

`docs/vertical-slice-01.md` remains the historical specification of Slice 01.
Participant responses remain its non-goal: this later slice introduces only the
local Silent Budget responses described here, not a general participant-response
system. Do not rewrite completed Slice 01 criteria to fit Slice 02. A forward
link could be added later but is not required now. AGENTS.md and README.md must
remain unchanged during this documentation-only task; section 12 records their
required implementation-phase updates. Do not implement this file plan until
human review authorizes the implementation phase.
