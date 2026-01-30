---
name: flo:review
description: >
  Use when asked to review, audit, or QA an epic's implementation. Triggers on
  "review the issue", "run QA", "audit quality", or /flo:review.
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

Tiered QA review for epic implementations. Three-level criteria merge (lib + project + issue), structured findings output, bead proposals for remediation.

## Quick Reference

| Tier | Groups | Cost |
|------|--------|------|
| **gate** | mechanical, hygiene | Low — scripts, grep |
| **quality** | consistency, architecture, product | Medium — diff scan + judgment |
| **polish** | security, edge-cases, production, human | High — deep review + user action |

| Criteria level | Location | Merge |
|----------------|----------|-------|
| lib | [references/criteria-lib.md](references/criteria-lib.md) | Always runs |
| project | `.claude/review-criteria.md` | Additive |
| issue | `.issues/<key>/4-qa/CRITERIA.md` | Additive |

See [references/criteria-format.md](references/criteria-format.md) for the criteria file format and findings output format.

## Requirements

- `bd` CLI (beads plugin active)
- Git repo on a feature branch with issue key (e.g. `feature/hea-3849-*`)
- Epic with `--external-ref` pointing to the issue key
- Issue directory with spec (`1-spec/SPEC.md`) and design docs (`2-design/`)

## Steps

### 1. Resolve issue context

Resolve the epic from the branch (same as `flo:next`). Read the epic's `design` field to find the issue directory. Read the spec and terminology doc — these feed judgment-based checks.

### 2. Discover and merge criteria

1. Load built-in criteria from [references/criteria-lib.md](references/criteria-lib.md)
2. Check for `.claude/review-criteria.md` — if present, merge
3. Check for `.issues/<key>/4-qa/CRITERIA.md` — if present, merge
4. Apply tier toggles from all levels

Report which sources were found and which tiers are enabled.

### 3. Determine tier

Check `$ARGUMENTS` for a tier name (`/flo:review quality`) or `all`.

- One tier enabled → skip prompt, run it
- Valid argument → use it
- Otherwise → AskUserQuestion with each enabled tier + `all` (multiSelect)

Each tier runs independently. `all` runs every enabled tier.

### 4. Execute and write findings

1. Run each group's checks against the codebase. Gate checks run commands; judgment checks read code.
2. Only review the diff — never flag pre-existing code.
3. Only record findings where something is wrong or noteworthy.
4. Write to `.issues/<key>/4-qa/FINDINGS.{N}.md` (N increments from existing files). Create the directory if needed.
5. Summarize: criteria checked, findings count, groups with most findings, gate blockers.

### 5. Propose beads

Group related findings into logical work units. Present proposed `bd create` commands for user approval before creating.

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Flagging pre-existing code outside the diff | Only review changed files |
| Flagging patterns consistent with the existing codebase | The review is not a refactor mandate — flag deviations from established patterns, not "I'd do it differently" |
| Flagging type-level circular references in TS | Normal in TypeScript — not a smell |
| Running quality/polish before gate passes | Gate is binary — if it fails, nothing else matters |
| Skipping the spec coverage walk | Line-by-line requirement walk is the highest-value product check — don't summarize, walk each bullet |
| Executing human-tier checks autonomously | Present human checks as a checklist — the agent cannot do manual E2E QA |
| Overwriting previous findings files | Findings are append-only — always increment the file number |
