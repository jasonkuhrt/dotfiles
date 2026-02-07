# Review CORE — Shared Execution Logic

This file is referenced by all review subcommands. Do not invoke directly.

The calling skill sets context variables before handing off here:

- **TIER**: `gate` | `quality` | `polish` | `all` (which tiers to run)
- **SCOPE**: `here` | `dirty` | `pr` (how to determine files)
- **GROUP**: optional `@<name>` filter (check file prefix)

## Argument Parsing

Parse `$ARGUMENTS` for optional overrides:

| Position | Format        | Meaning                             |
| -------- | ------------- | ----------------------------------- |
| 1        | `pr`/`dirty`/`here` | Override scope                |
| any      | `@<name>`     | Filter to checks from this group   |

If a positional scope is provided, it overrides the caller's default. If `@group` is provided, it overrides any inferred groups.

## Execution Flow

### 1. RESOLVE SCOPE

Determine which files to review based on SCOPE:

**`here` (conversation context)**
Infer from conversation context — which files have been discussed, edited, or created this session. If no files can be inferred, fall back to `dirty`.

**`dirty` (uncommitted changes)**
```bash
git diff HEAD --name-only
```
If no dirty files, tell the user and stop.

**`pr` (full branch diff)**
```bash
git diff $(git merge-base HEAD main)..HEAD --name-only
```
If no branch diff, try `develop` as trunk:
```bash
git diff $(git merge-base HEAD develop)..HEAD --name-only
```

The result is a **file list** used to intersect with check paths later.

### 2. DISCOVER

Run the discovery script to get all available checks:

```bash
bun ~/.claude/skills/review/scripts/discover.ts
```

Returns JSON with all checks from:

- `~/.claude/skills/*/CHECKS*.md` (user skill checks)
- `~/.claude/checks/*.md` (user standalone checks)
- `.claude/skills/*/CHECKS*.md` (project skill checks)
- `.claude/checks/*.md` (project standalone checks)

### 3. CONFIGURE

Run the config script to get project configuration:

```bash
bun ~/.claude/skills/review/scripts/config.ts
```

Returns per-skill path configuration, disable settings, and tier ceiling from CLAUDE.md frontmatter.

### 4. MERGE & FILTER

Apply configuration and context to discovered checks:

1. **Filter by group** — if `@group` specified, keep only checks whose source file prefix matches (e.g., `@stripe` keeps checks from `stripe.quality.md`, `stripe.gate.md`)
2. **Infer groups** — if no `@group` specified, infer relevant groups from the scoped files (e.g., `.tsx` files suggest react checks, files importing stripe suggest stripe checks). Include non-group-specific checks (generic `quality.md`, `gate.md`) always.
3. **Apply disable** — remove checks where `config.skills[skill].disable === true` or `config.skills[skill].disable[slug] === true`
4. **Resolve paths** — for each check, use `config.skills[skill].paths` if configured, else assume all project files
5. **Apply tier ceiling** — if TIER is a specific tier (`gate`, `quality`, `polish`), keep only checks at that tier. If TIER is `all`, keep gate + quality + polish in order.
6. **Apply scope** — intersect resolved paths with the scoped file list from step 1

### 5. GROUP BY TIER

Order checks for execution:

1. **gate** — fast, mechanical, binary (types pass, lint pass)
2. **quality** — structural, judgment-based (pattern consistency)
3. **polish** — late-stage, edge cases

### 6. EXECUTE

For each check in tier order:

1. **Glob paths** — get files matching the check's configured paths (already intersected with scope)
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

For mechanical checks (types pass, lint pass), run the actual command and check exit code.

For pattern checks (selector priority, no direct seeding), scan code for the anti-pattern.

For judgment checks (fixture naming, test organization), apply the principle from the check body.

### 7. WRITE OUTPUT

Determine the next available number N in `.claude/reviews/`:

```bash
ls .claude/reviews/FINDINGS.*.md 2>/dev/null | wc -l
```

Write to `.claude/reviews/FINDINGS.{N+1}.md`:

```markdown
# Review Findings — Run {N}

Date: {YYYY-MM-DD}. Tier: {tier}. Scope: {scope description}.

---

## FAILING

### Gate

- **{check-id}**
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

### 8. REPORT

Output summary to conversation:

```
Review complete. Tier: {tier}. Scope: {scope}.

FAILING: {count} checks
- {check-id}: {finding-count} findings

PASSING: {count} checks

Output: .claude/reviews/FINDINGS.{N}.md
```
