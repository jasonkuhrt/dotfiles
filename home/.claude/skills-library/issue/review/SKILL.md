---
name: issue:review
description: Run QA criteria against the current issue's codebase and produce structured findings. Use when asked to review, audit, or QA the current issue. Triggers on /issue:review.
---

# Issue Review

Run the QA criteria for the current issue against the codebase. Produces a findings file that mirrors the criteria structure with results nested inline.

## Tiers

Groups are tagged by tier. Select one or more tiers to run — each runs independently (not cumulative).

| Tier        | When to use                                  |
| ----------- | -------------------------------------------- |
| **gate**    | Every pass. Fast, automated, binary.         |
| **quality** | Structural + product quality. Adds judgment. |
| **polish**  | Late-stage. Edge cases, manual QA.           |

To run: `/issue:review gate`, `/issue:review quality`, `/issue:review all`. No argument prompts for selection.

## Requirements

- `bd` CLI (beads plugin active)
- Git repo on a feature branch with issue key (e.g. `feature/hea-3849-*`)
- Epic with `--external-ref` pointing to the issue key
- Issue directory with numbered phase subdirectories (the README chain)
- A QA phase directory (CRITERIA.md will be scaffolded if missing)

## Steps

### 1. Resolve Issue Context via Epic

Follow the flo chain to discover the issue directory and QA phase:

1. Resolve the epic from the current branch (same as `flo:next` — parse branch for issue key, find epic with matching `--external-ref`)
2. Read the epic's `design` field — it points to the issue directory
3. Read the issue directory's `README.md` — it lists the numbered phase directories (1-spec, 2-design, 3-plan, 4-qa, etc.)
4. Follow the chain to the QA phase directory
5. Read the QA `README.md` to understand the process and file layout
6. Read the spec (`1-spec/SPEC.md`) and terminology (`2-design/terminology.md`) — these are referenced by the criteria and needed for judgment-based checks

### 2. Read or Bootstrap Criteria

Check if the QA directory has a `CRITERIA.md` file.

**If CRITERIA.md exists:** Read it. Parse the tier sections and group structure. Identify:

- Available tiers and which groups each includes
- The criteria items within each group (the nested list structure)

**If CRITERIA.md does not exist:** Bootstrap it from the template asset at `.claude/skills/issue_review/CRITERIA.template.md`. Copy the template into the QA directory as `CRITERIA.md`. Then tell the user:

> Scaffolded `CRITERIA.md` from template. Fill in criteria under each tier section (Gate, Quality, Polish) before running a review. See HTML comments in each section for guidance.

Stop here — do not proceed to tier selection or execution until the user has populated the criteria.

### 3. Determine Tier

Check `$ARGUMENTS` for a tier name (e.g. `/issue:review quality`) or `all`. Valid values are the individual tier names from the criteria file (e.g. `gate`, `quality`, `polish`) plus `all`.

Each tier runs independently — picking `quality` runs only quality checks, not gate + quality. `all` runs every tier.

- If a valid tier or `all` is provided as argument → use it, skip prompting
- If no argument or invalid argument → use AskUserQuestion to ask which tier(s) to run. Options: each tier from the criteria file + `all`. Enable multiSelect so the user can pick multiple.

### 4. Determine Findings File Number

Look for existing `FINDINGS.*.md` files in the QA directory. The new file is `FINDINGS.{N+1}.md` where N is the highest existing number. If none exist, start at `FINDINGS.1.md`.

### 5. Execute Criteria Checks

For each group within the selected tier ceiling, execute the criteria checks against the codebase.

**How to check:** Read relevant source files, use Serena for symbol navigation, grep for patterns, run commands (lint, typecheck) as appropriate. Each criterion is a judgment call — evaluate it and record what you find.

**Important:**

- Record every criterion's outcome — both passes and failures. Passes go under `## PASSING`, failures under `## FAILING`.
- For gate-tier mechanical checks, actually run the commands (`npm run check:types`, etc.) and report pass/fail.
- For judgment-based criteria, read the relevant code and apply the criterion.
- Exclude `.claude/`, `.beads/`, `.issues/` from source scans (per criteria instructions).

### 6. Write Findings File

Write `4-qa/FINDINGS.{N}.md` using the **inline findings format** described below.

#### Findings File Format

The findings file splits results into two top-level sections: **FAILING** (findings that need attention) and **PASSING** (criteria that passed). Within each section, tiers provide the next level of grouping, preserving the full criteria tree structure underneath.

FAILING comes first — failures are always the first thing a reader sees.

```markdown
# QA Findings — Pass {N}

Branch: `{branch}`. Date: {date}. Tier: `{tier}`.

---

## FAILING

### {Tier Name}

- **{GROUP NAME}**
  - **{Sub-group}** — {original criterion text}
    - {criterion item that had a finding}
      - FINDING: {what was observed, with file:line references}
      - FINDING: {another observation if multiple}
    - {another criterion item with a finding}
      - FINDING: {observation}

---

## PASSING

### {Tier Name}

- **{GROUP NAME}**
  - {criterion that passed} — Pass.
  - {another criterion that passed} — Pass.
```

**Rules:**

- Preserve the original criteria text exactly — the criterion line is verbatim from CRITERIA.md
- Findings are always prefixed with `FINDING:` and indented one level below the criterion
- Include `file:line` references wherever possible
- Within each status section, omit any criterion, sub-group, group, or tier that has zero entries
- Omit the `## FAILING` section entirely if everything passed
- Omit the `## PASSING` section entirely if everything failed
- Passing criteria get a brief `— Pass.` suffix (or a short note if context is useful, e.g. `— Pass. No errors.`)

**Example:**

```markdown
## FAILING

### Quality

- **CONSISTENCY**
  - **DRY**
    - No business logic repeated — same validation rule, transformation, or filter predicate in multiple places
      - FINDING: `nonExcluded` filtering (`plan.records.filter(r => r.exclusionType === null)`) appears in wizardService.ts:142, :287, :341, :403, :512. Extract to helper.
      - FINDING: `formatCurrency()` identical in Step3Validation.tsx:23, Step6Review.tsx:45, Step7Apply.tsx:67.
  - **Pattern consistency**
    - Error handling: every mutation surfaces failures to the user (onError callback, callout, or toast)
      - FINDING: Steps 1, 3, 4, 6 have no `onError` callback on their mutations. Steps 2, 5, 7 do.

---

## PASSING

### Gate

- **MECHANICAL**
  - Lints pass (project lint command) — Pass. CI lint check green.
  - Types pass (`npm run check:types`) — Pass. No errors.
  - Build succeeds (project build command) — Pass. Built in 19.41s.
  - CI checks green (`gh pr checks`) — Pass. All 8 checks green.

### Quality

- **CONSISTENCY**
  - **Terminology** — the terminology doc is the authority
    - Every step component filename follows `Step{N}{RouterKey}` — Pass.
    - Prisma model names match terminology doc — Pass.
```

### 7. Report Results to User

Summarize:

- How many criteria were checked
- How many findings were produced
- Which groups had the most findings
- Any critical/blocking findings (e.g. gate failures)

### 8. Propose Beads

Analyze the findings and propose beads to create. Group findings into logical work units:

- Batch related findings into single beads (e.g. all DRY violations into one "Extract shared utilities" bead)
- Identify which findings are blockers vs improvements
- State which epic they'd be assigned to (the current issue)
- Present the proposed beads to the user for approval before creating

Use `bd create` syntax in the proposal so the user can see exactly what would be created.

## Notes

- Context discovery follows the same epic → issue directory → README chain as `flo:next`. This skill does not hardcode paths — it discovers the QA phase by reading the issue structure.
- The findings file is append-only per pass — never overwrite a previous pass's file
- Gate failures should be called out prominently — if mechanical checks fail, note that nothing else matters until they're fixed
- HUMAN-IN-THE-LOOP items (in polish tier) cannot be executed by the agent — present them as a checklist for the user instead of attempting to evaluate them
