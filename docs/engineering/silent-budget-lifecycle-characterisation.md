# Silent Budget lifecycle characterisation

Date: 1 November 2026.
Tested stack: Next.js 16.4.1, React 19.3.0 and Chromium.
Status: lifecycle gate approved; Silent Budget is not implemented.

## Why this was required

The repository enables Cache Components. Next.js Activity can hide routes while
preserving their React state and DOM, so unmount assumptions cannot establish
the reset contract in [Vertical Slice 02](../vertical-slice-02.md).
The spike used only fictional, non-sensitive markers and a temporary input.

Without mitigation, Activity retained route-local state and DOM input values;
Back/Forward could reactivate that retained state. Clearing the DOM and queuing
an ordinary state update in `Link.onNavigate` failed the ordering check: the
input was empty, but the rendered progress marker had not reset before the
callback returned control to the link.

## Evidence-supported mechanism

- Use `Link.onNavigate` with event-handler-only `flushSync` to commit a controlled
  reset before navigation proceeds. The synchronous checkpoint observed the
  original pathname, idle state, an empty detached input and no mounted input.
- Layout-effect cleanup handles the tested browser-driven Activity hiding and
  reactivation paths. Clear the live current input ref when cleanup executes;
  do not capture only the input node present at the owner's initial mount.
  Never call `flushSync` from effect cleanup.
- Keep the private raw string only in the current DOM control and transient
  parsing locals. Do not copy it into React state, reducer state, another ref,
  storage, history or a URL. A ref may point to the current DOM input element.
- Keep reset idempotent. Preserve semantic link and keyboard behaviour;
  modified-click navigation to another tab does not abandon the original tab.

## Dynamic-input and Strict Mode evidence

The owner initially mounted with no input. Starting a fictional session mounted
a fresh empty node. Controlled and browser-driven departures cleared the current
node; tests inspected retained node handles, including hidden or detached DOM,
rather than relying only on visible content. Completion cleared and detached the
input. Back/Forward restored idle state without an input, progress or result.
Subsequent sessions received distinct empty nodes, and delayed cleanup did not
erase newly started sessions.

Development Strict Mode initial replay and repeated hide/reactivation cycles
were exercised separately from production Playwright. The diagnostic verified
the corrected version marker, absence of an initial input, and a browser-loaded
development bundle containing the revised clearing function before accepting
the results. Fresh-node, current-node clearing, completion removal and
new-session-survival checks passed, with no console or page errors.

## Verification and limitations

During the spike, `npm run build -- --webpack` and production-mode Chromium
characterisation tests passed. Playwright used the fresh build through
`npm start` on a dedicated loopback port without server reuse. Slice 01 browser
regressions remained passing. Full browser refresh cleared the public plan and
probe state; `router.refresh()` preserved client state and was not a reset.

This evidence is specific to the installed framework version and Chromium.
With BFCache permitted, a full-document departure and return restored the
fictional state with `pageshow.persisted=true`. This differs from same-document
Activity reactivation. There is no universal browser-clearing or secure-erasure
guarantee.

The temporary probe UI and probe-only application/tests are removed when closing
this spike. The real Silent Budget flow must replace the probe and reproduce the
critical regressions before delivery; this note does not certify that flow.

## Decision

Use the smallest route-local mechanism in the real flow. Do not introduce global
state, persistence, providers or framework-configuration changes. Re-evaluate
the mechanism if the real conditional input behaves differently, preserving the
approved reset requirements rather than assuming the probe proves every future
component lifecycle.
