# Built-In Criteria

Generic checks that always run (unless overridden by `mode: replace`). Not tied to any specific project, framework, or language.

## Gate

Fast, automated, binary. If these fail, stop — nothing else matters.

### mechanical

- Lint/format passes (project lint command)
- Type checks pass (project type check command)
- Build succeeds (project build command)
- Tests pass (project test suite)
- CI checks green (`gh pr checks`)

### hygiene

- **No debug artifacts** — grep diff for `console.log`, `debugger`, `.only`, `.skip`
  - `console.log` in dedicated logging/error-reporting modules is intentional — only flag in component/service/handler code
- **No untracked TODOs** — grep diff for `TODO`, `FIXME`, `HACK`. Every instance must either:
  - Reference a tracked issue (beads ID, Linear ID), or
  - Be flagged as untracked and filed
- **All PR comments addressed** — scan for unresolved review threads

## Quality

Structural + product quality. Adds judgment. Scan only files touched by the PR diff.

### consistency

- **Terminology** — if a spec terminology table exists, it is the authority. Audit every new symbol, filename, UI string, and variable in the diff against it.
  - Only flag symbols, type names, filenames, UI strings — not comments or commit messages
  - Only flag within the diff, not pre-existing mismatches outside changed files
- **DRY** — scan diff for duplicate logic across files
  - No type definitions repeated — same shape defined in multiple files instead of shared
  - No business logic repeated — same validation rule, transformation, or filter predicate in multiple places
  - No UI patterns repeated — same component structure (e.g. collapsible group, status badge) inlined in multiple files instead of extracted
  - No inline constants repeated — same literal value with domain meaning appearing in multiple files instead of a shared constant
  - No redefinitions of existing codebase abstractions — new helper, util, type, or component that duplicates or near-duplicates something already available elsewhere in the codebase
- **Pattern consistency** — new code follows established codebase conventions
  - Structural patterns (components follow same layout: header, content, action buttons)
  - Styling approach is uniform (e.g. Tailwind everywhere, no inline `style={{}}` objects)
  - Error handling: every mutation surfaces failures to the user (onError callback, callout, or toast)
  - Loading states: every mutation shows loading indicator and disables the trigger
  - Only flag deviations from patterns **established in the codebase** — not subjective preferences about how you'd do it differently

### architecture

The tech lead pass. Deep review, high judgment.

- **Type safety**
  - Functions have typed inputs and return types, no implicit `any` leaking through
  - Type casts (`as unknown as`, `as any`) — investigate if schema/types can be tightened to eliminate them
  - Type-level circular references are normal in TypeScript — do not flag
- **Abstraction quality**
  - Are interfaces and types the right shape? Over-abstracted? Under-abstracted?
  - Are generics adding clarity, or adding complexity with no consumer benefit?
  - Are union types discriminated where they should be?
  - Do not flag patterns that are consistent with the existing codebase, even if imperfect — the review is not a refactor mandate
- **Service / module boundaries**
  - Is code in the right file and directory? Clear separation of concerns?
  - Consistent property grouping pattern within services (namespaced vs flat — whichever the codebase uses)
  - Feature code stays inside the feature boundary — no feature logic leaking into shared libs or unrelated routes
- **Error handling design**
  - Not just "does each function handle errors" but "is the error strategy coherent across the feature"
  - Backend: every service method has a clear error contract (throws typed errors, not generic `Error`)
  - Frontend: every mutation has an onError path that surfaces to the user
  - External service failures (third-party APIs, SDKs) handled with user-visible feedback, not silent swallowing
- **Code smells**
  - Stubbed integrations — if a service call logs to console instead of calling a real service, it must have a FIXME with expected integration point
  - Dead code — unused variables, unreachable branches, commented-out blocks
  - Long functions — if a function body exceeds ~100 lines, consider whether extracting helpers would improve clarity (judgment call, not a hard rule)

### product

Spec + behavior review. Highest judgment.

- **Spec coverage audit** — for every requirement in the spec:
  - Walk each section's requirements list, line by line
  - Verify every bullet is implemented or explicitly documented as deferred
  - Check UI copy against spec's exact language where specified
  - Check all NOTE callouts in spec are addressed
- **Nothing extra** — no features beyond what was requested (YAGNI)
  - Flag features, configuration options, or abstractions not called for in the spec
- **Deferred features verified absent** — for every item in spec's deferred/out-of-scope section:
  - Confirm it is NOT implemented (no half-baked code paths)
  - Confirm no dead code or unused schemas left behind for deferred items
  - If partially scaffolded, verify it's gated and documented with a tracked issue

## Polish

Late-stage. Edge cases, hardening, manual QA.

### security

- Permission checks on every entry point
- Direct URL navigation to protected routes is permission-checked (not just UI entry points)
- Feature flag gates visibility, permission gates access — both layers present where applicable
- No sensitive data exposed in client-side state (API keys, internal IDs, secrets)

### edge-cases

- Concurrent access — what happens if two users/processes mutate the same state?
- Partial failure semantics — clear definition of what happens when some operations succeed and others fail
- Retry behavior — defined per state; retrying a succeeded record vs a failed record vs a record never attempted
- Duplicate/idempotency handling — what happens if the same operation runs twice?

### production

- Env configs complete — no empty strings, placeholder values, or TODOs in production config
- External service error handling — what if a third-party dependency (API, SDK, webhook) is down or errors?
- Monitoring/analytics events — every event listed in spec fires at the correct moment with correct properties
- Database indexes — verify indexes exist on columns used in query WHERE clauses and sort expressions

### human

Cannot be executed by the agent. Present as a checklist for the user.

- **Manual E2E QA** — if a gherkin suite or test plan exists in the issue directory, present it as an interactive checklist. Otherwise, prompt the user for a QA plan or offer to walk the happy path description from the spec.
- **Final sign-off** — user confirms ready to merge/ship
