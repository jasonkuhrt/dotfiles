---
name: flo:review
description: >
  Use when reviewing an epic's implementation against its spec. Run after all
  beads are closed, or anytime a quality audit is needed. Triggers on /flo:review.
allowed-tools:
  - Read
  - Bash(bd:*)
  - Bash(bash:*)
  - Bash(git:*)
  - Bash(gh:*)
  - Bash(npm:*)
  - Bash(grep:*)
---

# flo:review

Tiered QA review for epic implementations. Runs built-in generic criteria, merges with project-level and issue-level criteria files, writes structured findings, and proposes beads for remediation.

## When to Use

- After all beads in an epic are closed (suggested by `flo:next`)
- When a quality audit is needed at any point during epic work
- When asked to "review", "audit", or "QA" the current issue

## Requirements

- `bd` CLI (beads plugin active)
- Git repo on a feature branch with issue key (e.g. `feature/hea-3849-*`)
- Epic with `--external-ref` pointing to the issue key
- Issue directory with spec (`1-spec/SPEC.md`) and design docs (`2-design/`)

## Three-Level Criteria Model

Criteria come from three sources, merged additively:

| Level | Location | Purpose |
|-------|----------|---------|
| **lib** | Built into this skill (below) | Generic criteria. Always runs. |
| **project** | `.claude/review-criteria.md` | Project-wide conventions |
| **issue** | `.issues/<key>/4-qa/CRITERIA.md` | Issue-specific checks |

**Merge order:** lib + project + issue. Each layer adds checks to matching groups. New groups append to matching tiers. New tiers are added.

### Criteria File Format

Project and issue criteria files use markdown with YAML frontmatter:

```markdown
---
mode: extend        # extend (default) | replace (rare — overrides all lower levels)
tiers:
  gate: true        # enabled by default
  quality: true     # enabled by default
  polish: false     # disabled at this level
---

## quality

### consistency

- **Terminology** — spec terminology table has project-specific naming rules
  - Every step component filename follows `Step{N}{RouterKey}`
  - Prisma model names match terminology doc

### architecture

- All tRPC procedures use adminProcedure guard
- Service architecture uses namespaced property grouping
```

**Frontmatter fields:**

| Field | Type | Default | Purpose |
|-------|------|---------|---------|
| `mode` | `extend` \| `replace` | `extend` | How this file merges with lower levels |
| `tiers` | map of tier → boolean | all `true` | Enable/disable entire tiers |

**`mode: extend`** (default): Checks from this file add to the matching group/tier from lower levels. New groups and tiers are appended.

**`mode: replace`**: Entire criteria from lower levels is discarded. This file becomes the sole criteria source. Rarely appropriate — only when the generic criteria doesn't apply at all.

**Tier toggles**: If a level disables a tier (`polish: false`), that tier is off in the merged result regardless of what lower levels say.

<!-- FUTURE IDEAS (parked for later implementation):
  - `include` field: constrain source scans to specific directories (e.g. use tsconfig rootDir)
  - `exclude` field: skip specific paths during scans
  - `pre` field: commands to run before specific mechanical checks (e.g. prisma-gen before types)
  - `disable` field: disable specific built-in checks by ID for granular control
  - Smart source root detection from tsconfig.json
  - Gitignore integration for exclude defaults
-->

## Steps

### 1. Resolve Issue Context via Epic

Follow the flo chain to discover the issue directory:

1. Resolve the epic from the current branch (same as `flo:next` — parse branch for issue key, find epic with matching `--external-ref`)
2. Read the epic's `design` field — it points to the issue directory
3. Read the issue directory's `README.md` — it lists the numbered phase directories
4. Read the spec (`1-spec/SPEC.md`) and terminology (`2-design/terminology.md`) — these are referenced by criteria checks

### 2. Discover and Merge Criteria

1. Start with the built-in criteria (the **Built-In Criteria** section below)
2. Check for `.claude/review-criteria.md` in the project root — if present, merge its checks
3. Check for `.issues/<key>/4-qa/CRITERIA.md` — if present, merge its checks
4. Apply tier toggles — if any level disables a tier, it's off in the merged result

Report to the user which criteria sources were found and which tiers are enabled.

### 3. Determine Tier

Check `$ARGUMENTS` for a tier name (e.g. `/flo:review quality`) or `all`. Valid values are the enabled tier names plus `all`.

- If only one tier is enabled → skip prompt, run it
- If a valid tier or `all` is provided as argument → use it
- If no argument or invalid argument → use AskUserQuestion to ask which tier(s) to run. Options: each enabled tier + `all`. Enable multiSelect so the user can pick multiple.

Each tier runs independently — picking `quality` runs only quality checks, not gate + quality. `all` runs every enabled tier.

### 4. Determine Findings File Number

Look for existing `FINDINGS.*.md` files in the QA directory (`.issues/<key>/4-qa/`). Create the directory if it doesn't exist. The new file is `FINDINGS.{N+1}.md` where N is the highest existing number. If none exist, start at `FINDINGS.1.md`.

### 5. Execute Criteria Checks

For each group within the selected tiers, execute the criteria checks against the codebase.

**How to check:** Read relevant source files, use Serena for symbol navigation, grep for patterns, run commands (lint, typecheck) as appropriate. Each criterion is a judgment call — evaluate it and record what you find.

**Important:**

- Only record findings where something is wrong or noteworthy. Criteria that pass cleanly are omitted from output.
- For gate-tier mechanical checks, actually run the commands and report pass/fail.
- For judgment-based criteria, read the relevant code and apply the criterion.
- Only review the diff — never flag pre-existing code outside the PR's changes.

### 6. Write Findings File

Write `.issues/<key>/4-qa/FINDINGS.{N}.md` using the inline findings format:

```markdown
# QA Findings — Pass {N}

Branch: `{branch}`. Date: {date}. Tier: `{tier}`.
Sources: lib + project + issue (or whichever were found).

---

## {Tier Name}

- **{GROUP NAME}**
  - **{Sub-group}** — {original criterion text}
    - {criterion item that had a finding}
      - FINDING: {what was observed, with file:line references}
      - FINDING: {another observation if multiple}
```

**Rules:**

- Preserve the original criteria text exactly — the criterion line is verbatim
- Findings are always prefixed with `FINDING:` and indented one level below the criterion
- Include `file:line` references wherever possible
- Omit any criterion, sub-group, or group that has zero findings
- Omit any tier section that has zero findings

### 7. Report Results to User

Summarize:

- How many criteria were checked
- How many findings were produced
- Which groups had the most findings
- Any critical/blocking findings (gate failures)

### 8. Propose Beads

Analyze findings and propose beads. Group related findings into logical work units:

- Batch related findings into single beads (e.g. all DRY violations into one "Extract shared utilities" bead)
- Identify which findings are blockers vs improvements
- State which epic they'd be assigned to
- Present proposed beads to the user for approval before creating

Use `bd create` syntax in the proposal so the user can see exactly what would be created.

---

## Built-In Criteria

These checks always run (unless the project or issue criteria uses `mode: replace`). They are generic — not tied to any specific project, framework, or language.

### Gate

Every pass. Fast, automated, binary. If these fail, stop — nothing else matters.

#### mechanical

- Lint/format passes (project lint command)
- Type checks pass (project type check command)
- Build succeeds (project build command)
- Tests pass (project test suite)
- CI checks green (`gh pr checks`)

#### hygiene

- **No debug artifacts** — grep diff for `console.log`, `debugger`, `.only`, `.skip`
  - `console.log` in dedicated logging/error-reporting modules is intentional — only flag in component/service/handler code
- **No untracked TODOs** — grep diff for `TODO`, `FIXME`, `HACK`. Every instance must either:
  - Reference a tracked issue (beads ID, Linear ID), or
  - Be flagged as untracked and filed
- **All PR comments addressed** — scan for unresolved review threads

### Quality

Structural + product quality. Adds judgment. Scan only files touched by the PR diff.

#### consistency

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

#### architecture

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

#### product

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

### Polish

Late-stage. Edge cases, hardening, manual QA.

#### security

- Permission checks on every entry point
- Direct URL navigation to protected routes is permission-checked (not just UI entry points)
- Feature flag gates visibility, permission gates access — both layers present where applicable
- No sensitive data exposed in client-side state (API keys, internal IDs, secrets)

#### edge-cases

- Concurrent access — what happens if two users/processes mutate the same state?
- Partial failure semantics — clear definition of what happens when some operations succeed and others fail
- Retry behavior — defined per state; retrying a succeeded record vs a failed record vs a record never attempted
- Duplicate/idempotency handling — what happens if the same operation runs twice?

#### production

- Env configs complete — no empty strings, placeholder values, or TODOs in production config
- External service error handling — what if a third-party dependency (API, SDK, webhook) is down or errors?
- Monitoring/analytics events — every event listed in spec fires at the correct moment with correct properties
- Database indexes — verify indexes exist on columns used in query WHERE clauses and sort expressions

#### human

These cannot be executed by the agent. Present them as a checklist for the user.

- **Manual E2E QA** — if a gherkin suite or test plan exists in the issue directory, present it as an interactive checklist. Otherwise, prompt the user for a QA plan or offer to walk the happy path description from the spec.
- **Final sign-off** — user confirms ready to merge/ship

## Notes

- Context discovery follows the same epic → issue directory → README chain as `flo:next`. This skill does not hardcode paths — it discovers the QA phase by reading the issue structure.
- The findings file is append-only per pass — never overwrite a previous pass's file.
- Gate failures should be called out prominently — if mechanical checks fail, nothing else matters until they're fixed.
- HUMAN-IN-THE-LOOP items (in polish tier) cannot be executed by the agent — present them as a checklist for the user instead of attempting to evaluate them.
- This skill consolidates and replaces project-level `issue:review` skills. If a project has an existing `issue:review` skill, migrate its criteria content into `.issues/<key>/4-qa/CRITERIA.md` or `.claude/review-criteria.md`.
