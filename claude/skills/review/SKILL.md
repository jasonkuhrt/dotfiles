---
name: review
description: Run pluggable code review checks. Discovers CHECKS files from skills, evaluates code against them, outputs findings. Use when asked to review code, run checks, or audit quality.
---

# Pluggable Code Review

Run code review checks from CHECKS files discovered across skills.

## Arguments

- `--tier=gate|quality|polish|all` — tier ceiling (default: all or from config)
- `--beads` — output as importable bead files instead of FINDINGS.N.md
- `--skill=NAME` — run checks only from this skill
- `--check=ID` — run only this specific check (e.g., `playwright#selector-priority`)
- `--dry-run` — list checks that would run without executing

## Execution Flow

### 1. DISCOVER

Run the discovery script to get all available checks:

```bash
bun ~/.claude/skills/review/scripts/discover.ts
```

This returns JSON with all checks from:
- `~/.claude/skills/*/CHECKS.*.md` (user skill checks)
- `~/.claude/checks/*.md` (user standalone checks)
- `.claude/skills/*/CHECKS.*.md` (project skill checks)
- `.claude/checks/*.md` (project standalone checks)

### 2. CONFIGURE

Run the config script to get project configuration:

```bash
bun ~/.claude/skills/review/scripts/config.ts
```

This reads `checks:` block from CLAUDE.md frontmatter and returns:
- Per-skill path configuration
- Disable settings
- Tier ceiling

### 3. MERGE & FILTER

Apply configuration to discovered checks:

1. **Filter by skill** — if `--skill` flag, keep only matching skill
2. **Filter by check** — if `--check` flag, keep only matching ID
3. **Apply disable** — remove checks where `config.skills[skill].disable === true` or `config.skills[skill].disable[slug] === true`
4. **Resolve paths** — for each check, use `config.skills[skill].paths` if configured, else assume all project files
5. **Apply tier ceiling** — keep only checks at or below the tier ceiling

### 4. GROUP BY TIER

Order checks for execution:
1. **gate** — fast, mechanical, binary (types pass, lint pass)
2. **quality** — structural, judgment-based (pattern consistency)
3. **polish** — late-stage, edge cases

### 5. EXECUTE

For each check in tier order:

1. **Glob paths** — get files matching the check's configured paths
2. **Read files** — load file contents (batch for efficiency)
3. **Evaluate** — apply the check's criteria to each file:
   - Read the check body, correct example, incorrect example
   - Look for patterns that match the "incorrect" example
   - Look for missing patterns from the "correct" example
   - Use judgment to determine pass/fail
4. **Record findings** — for failures, note file:line and specific issue

**Evaluation guidelines:**
- A check PASSES if no violations found in any examined file
- A check FAILS if violations found — record each as a FINDING
- Include file path and line number for each finding
- Quote the problematic code snippet

### 6. WRITE OUTPUT

#### Standard Mode (FINDINGS.N.md)

Determine the next available number N in `.claude/reviews/`:

```bash
ls .claude/reviews/FINDINGS.*.md 2>/dev/null | wc -l
```

Write to `.claude/reviews/FINDINGS.{N+1}.md`:

```markdown
# Review Findings — Run {N}

Date: {YYYY-MM-DD}. Tier: {ceiling}.

---

## FAILING

### Gate

- **{check-id}**
  - FINDING: `{file}:{line}` — {description}
  - FINDING: `{file}:{line}` — {description}

### Quality

- **{check-id}**
  - FINDING: `{file}:{line}` — {description}

---

## PASSING

### Gate

- **{check-id}** — Pass.

### Quality

- **{check-id}** — Pass.
```

#### Beads Mode (--beads)

Create directory `.claude/reviews/FINDINGS/{N}/`

For each failing check, create a bead file:

```markdown
---
title: "Fix {check-id} violation"
type: task
priority: 2
labels: [{skill}, review]
---

## Context

Check `{check-id}` failed.

## Finding

{check body}

## Files

- `{file}:{line}` — {description}
- `{file}:{line}` — {description}

## Fix

{suggestion based on check's "correct" example}
```

Multiple findings for the same check go in one bead. Different checks get separate beads.

### 7. REPORT

Output summary to conversation:

```
Review complete. Tier: {ceiling}

FAILING: {count} checks
- {check-id}: {finding-count} findings
- {check-id}: {finding-count} findings

PASSING: {count} checks

Output: .claude/reviews/FINDINGS.{N}.md
```

## Dry Run

With `--dry-run`, skip execution and output:

```
Would run {count} checks:

Gate:
- {check-id} → {paths}

Quality:
- {check-id} → {paths}

Polish:
- {check-id} → {paths}
```

## Example Session

```
User: /review --tier=quality

Agent:
1. Runs discover.ts → gets 12 checks
2. Runs config.ts → gets paths for playwright, e2e skills
3. Filters to gate + quality (8 checks)
4. Groups: 2 gate, 6 quality
5. Executes gate checks first
6. Executes quality checks
7. Writes .claude/reviews/FINDINGS.1.md
8. Reports summary
```

## Check Evaluation Guidance

When evaluating a check:

1. **Read the check body** — understand what pattern it's looking for
2. **Study the examples** — the "correct" and "incorrect" sections show concrete patterns
3. **Scan relevant files** — use the configured paths
4. **Apply judgment** — not all checks are mechanical; some require understanding intent
5. **Be specific** — findings should have exact file:line references
6. **Be actionable** — describe what's wrong and hint at the fix

For mechanical checks (types pass, lint pass), run the actual command and check exit code.

For pattern checks (selector priority, no direct seeding), scan code for the anti-pattern.

For judgment checks (fixture naming, test organization), apply the principle from the check body.
