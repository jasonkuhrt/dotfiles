# Pluggable Review System Design

## Background

We reorganized the e2e\_\* skills and realized the review patterns are more general. Inspired by [Amp's code review system](https://ampcode.com/news/liberating-code-review) which uses `.agents/checks/` directories with directory-scoped checks as separate agent instances.

**Existing assets:**

- `.claude/skills/issue_review/` — Issue-specific QA with CRITERIA.md per issue, produces FINDINGS.N.md, has tiers (gate/quality/polish)
- `.claude/skills/docs/reference/e2e/conventions.md` — Heartbeat E2E conventions (essentially a checklist in prose form)
- `~/.claude/skills/playwright/SKILL.md` — Generic Playwright reference

**Key insight:** The e2e conventions doc has ~15 rules. Each rule is a check. Skills already contain checklists — they just aren't structured for machine consumption.

## Goal

Build a pluggable review system where:

- Skills contribute checks via CHECKS files (auto-discovered)
- Checks are organized by tier (gate/quality/polish)
- Projects configure which checks run and what paths they examine
- Findings are written to `.claude/reviews/FINDINGS.N.md`
- `issue_review` becomes a consumer of this general system

---

## Check File Format

### Filename Convention

Tier is encoded in the filename:

```
CHECKS.gate.md       # gate-tier checks
CHECKS.quality.md    # quality-tier checks
CHECKS.polish.md     # polish-tier checks
CHECKS.md            # applies to all tiers (or default tier)
```

Case-insensitive discovery, but CAPS is the style convention.

### File Structure

Each file contains checks as H2 sections. No multi-frontmatter weirdness — standard markdown.

**For local checks (project or user `checks/` directory):**

````markdown
---
paths:
  - 'apps/e2e/**'
  - '!apps/e2e/node_modules/**'
---

## fixture-worker-scope

Data fixtures use `{ scope: 'worker' }` to share expensive setup across tests.

### Correct

```typescript
dataCommunity: [
  async ({ scope }, use) => { /* ... */ },
  { scope: 'worker' },
],
```
````

### Incorrect

```typescript
dataCommunity: [
  async ({ scope }, use) => { /* ... */ },
  // Missing { scope: 'worker' }
],
```

## no-direct-seeding

Tests never call `sb()` or `Testing.X.ensure()` directly. All seeding via fixtures.

### Correct

```typescript
test('admin sees offers', async ({ admin, dataOffers }) => {
  await admin.goto('/offers');
});
```

### Incorrect

```typescript
test('admin sees offers', async ({ admin, scope }) => {
  const offers = await Testing.Offer.ensure({ scope });
  await admin.goto('/offers');
});
```

````

**For skill checks (marketplace/shared):**

No frontmatter. Skills are pure content — paths configured in project's CLAUDE.md.

```markdown
## selector-priority

Use semantic selectors in priority order: getByRole > getByLabel > getByPlaceholder > getByText > getByTestId > locator.

### Correct

```typescript
await page.getByRole('button', { name: 'Submit' }).click();
````

### Incorrect

```typescript
await page.locator('.submit-btn').click();
```

```

### Check Anatomy

Each H2 section is one check:
- **H2 text** → check slug (kebab-cased for ID)
- **Body** → description of what the check verifies
- **### Correct** → (optional) example of compliant code
- **### Incorrect** → (optional) example of non-compliant code

The agent reads the check and evaluates code against it. Mechanical checks (run a command) vs judgment checks (evaluate patterns) are inferred from the prose — no explicit field needed.

---

## Check IDs

Check IDs follow the format `{skill}#{slug}`:

| Source | Example ID |
|--------|------------|
| Skill check | `playwright#selector-priority` |
| Skill check | `e2e#fixture-worker-scope` |
| Standalone check | `checks#no-secrets` |

The skill name comes from the directory. The slug comes from the H2 heading (kebab-cased).

### Potential Collision

A check slug could theoretically appear in both `CHECKS.gate.md` and `CHECKS.quality.md` within the same skill. This would cause an ID collision. For now, we assume authors don't do this. If it becomes a problem, we can namespace by tier (`skill#tier#slug`).

---

## Paths (File Matching)

`paths` specifies which files a check examines. This is a simple file matcher — when running the check, glob these paths and evaluate each file.

Consistent with rules frontmatter convention (`.claude/rules/*.md` uses `paths:`).

**Local checks** (`.claude/checks/`, `~/.claude/checks/`): Can have frontmatter with `paths:` since they know their context.

**Skill checks** (`~/.claude/skills/*/CHECKS.*.md`): No frontmatter. Paths configured in project's CLAUDE.md — skills are portable and don't know project structure.

---

## Discovery

Four scan locations, merged into one registry:

```

# User level

~/.claude/skills/_/CHECKS._.md # User skill checks
~/.claude/checks/\*.md # User standalone checks

# Project level

.claude/skills/_/CHECKS._.md # Project skill checks
.claude/checks/\*.md # Project standalone checks

````

Discovery is case-insensitive (`CHECKS.quality.md` and `checks.quality.md` both discovered), but CAPS is the style convention.

### Namespace Resolution

| Location | Namespace | Example ID |
|----------|-----------|------------|
| `~/.claude/skills/playwright/CHECKS.quality.md` | `playwright` | `playwright#selector-priority` |
| `.claude/skills/e2e/CHECKS.quality.md` | `e2e` | `e2e#fixture-worker-scope` |
| `~/.claude/checks/security.gate.md` | `checks` | `checks#no-hardcoded-secrets` |
| `.claude/checks/api.quality.md` | `checks` | `checks#validate-inputs` |

Standalone checks (from `checks/` directories) share the `checks` namespace.

---

## Configuration

All configuration lives in CLAUDE.md frontmatter. This extends the existing frontmatter pattern — unknown keys are ignored by other tools.

### Schema

```yaml
---
checks:
  # Per-skill configuration
  playwright:
    paths:
      - "apps/e2e/**"
    disable:
      some-flaky-check: true
      another-check: true

  e2e:
    paths:
      - "apps/e2e/**"

  prisma:
    paths:
      - "prisma/schema.prisma"
    disable: true                    # disable entire skill

  effect:
    paths:
      - "libs/**/*.ts"
      - "apps/**/*.ts"

  # Global tier ceiling (optional, default: all)
  tier: quality
---
````

### TypeScript Schema

```typescript
type ChecksConfig = {
  // Per-skill configuration
  [skillName: string]: {
    paths?: string[];
    disable?: true | Record<string, true>;
  };

  // Global settings
  tier?: 'gate' | 'quality' | 'polish' | 'all';
};
```

### Behavior

| Config                      | Effect                                  |
| --------------------------- | --------------------------------------- |
| `skill.paths: [...]`        | Files the skill's checks examine        |
| `skill.disable: true`       | Disable all checks from skill           |
| `skill.disable.check: true` | Disable specific check                  |
| `tier: quality`             | Only run gate + quality tiers (ceiling) |

**Defaults:**

- Skill with no `paths` entry → examines all files (or skipped with warning?)
- Unknown skill in config → warning, ignored
- No `tier` → run all tiers

### User-Level Configuration

`~/.claude/CLAUDE.md` can also have a `checks:` block for user-wide configuration. Project config overrides user config.

---

## Output

Findings are written to `.claude/reviews/`:

```
.claude/reviews/
  FINDINGS.1.md
  FINDINGS.2.md
  FINDINGS.3.md
```

Numbered files (append-only per run) match the `issue_review` convention of `FINDINGS.N.md`.

### Findings Format

Same format as `issue_review` produces — FAILING section first, PASSING section second:

```markdown
# Review Findings — Run 3

Date: 2026-02-05. Tier: quality.

---

## FAILING

### Quality

- **playwright#selector-priority**
  - FINDING: `apps/e2e/src/specs/auth/login.spec.ts:45` uses `locator('.submit-btn')` instead of `getByRole('button', { name: 'Submit' })`
  - FINDING: `apps/e2e/src/specs/settings/update-community.spec.ts:23` uses `locator('#save-button')`

- **e2e#fixture-worker-scope**
  - FINDING: `apps/e2e/src/fixtures/base.fixture.ts:67` — `dataOffers` fixture missing `{ scope: 'worker' }`

---

## PASSING

### Gate

- **e2e#types-pass** — Pass. No errors.
- **e2e#lint-pass** — Pass. CI lint check green.

### Quality

- **e2e#no-direct-seeding** — Pass.
- **playwright#no-hardcoded-data** — Pass.
```

---

## Tiers

Tiers control execution order and provide a ceiling mechanism.

| Tier        | Purpose                              | Examples                                     |
| ----------- | ------------------------------------ | -------------------------------------------- |
| **gate**    | Fast, mechanical, binary. Run first. | Types pass, lint pass, build succeeds        |
| **quality** | Structural, judgment-based.          | Pattern consistency, convention adherence    |
| **polish**  | Late-stage, edge cases, manual.      | Manual flow walkthrough, accessibility audit |

**Execution order:** gate → quality → polish

**Tier ceiling:** `/review --tier=quality` runs gate + quality, skips polish. Config `tier: quality` sets default ceiling.

---

## Review Flow

1. **DISCOVER**
   - Scan all four locations for CHECKS files
   - Parse each file: extract tier from filename, checks from H2 sections
   - Build registry of all checks with IDs

2. **CONFIGURE**
   - Read CLAUDE.md `checks:` config
   - Apply `disable` settings
   - Resolve `paths` for each skill

3. **GROUP BY TIER**
   - gate checks first
   - quality checks second
   - polish checks third
   - Apply tier ceiling if configured

4. **EXECUTE**
   - For each check, glob its `paths`
   - Read matched files
   - Evaluate check criteria against code
   - Record pass/fail with findings

5. **WRITE FINDINGS**
   - Determine next FINDINGS.N.md number
   - Write structured output to `.claude/reviews/FINDINGS.N.md`

6. **REPORT**
   - Summary: X checks run, Y findings
   - Breakdown by tier
   - Highlight gate failures (blockers)

---

## Integration with issue_review

`issue_review` becomes a consumer of this general review system:

- Issue-specific criteria still live in `{issue}/4-qa/CRITERIA.md`
- `issue_review` can reference skill checks by ID
- General checks supplement issue-specific criteria
- Output still goes to `{issue}/4-qa/FINDINGS.N.md` (issue_review overrides default location)

The general review system handles discovery, configuration, and execution. `issue_review` provides the issue context and output location.

---

## Skill Migration Example

Converting `e2e/conventions.md` to checks format:

**Before:** Prose document with patterns

**After:** `.claude/skills/e2e/CHECKS.quality.md`

````markdown
## fixture-worker-scope

Data fixtures use `{ scope: 'worker' }` to share expensive setup across tests.

### Correct

```typescript
dataCommunity: [
  async ({ scope }, use) => { /* ... */ },
  { scope: 'worker' },
],
```
````

### Incorrect

```typescript
dataCommunity: [
  async ({ scope }, use) => { /* ... */ },
  // Missing { scope: 'worker' }
],
```

## fixture-single-responsibility

One resource type per data fixture. Compose via dependencies.

## no-direct-seeding

Tests never call `sb()` or `Testing.X.ensure()` directly. All seeding via fixtures.

## no-wrapping-describe

Don't wrap all tests in a single `describe`. Filename provides context.

## one-seed-per-file

Each spec file has one `test.use()` with one scenario config.

## use-persona-interface

Use `admin.jump.*`, `admin.at.*`, `admin.with.*` — not raw `page.goto()` or `page.getByRole()`.

```

Six checks extracted. Same patterns, now machine-discoverable and individually referenceable.

---

## Beads Mode

Instead of a single findings report, beads mode emits one file per finding — structured as ready-to-import beads.

**Enable:** `/review --beads` or config `checks.beads: true`

### Output Structure

```

.claude/reviews/FINDINGS/1/
playwright#selector-priority.md
e2e#fixture-worker-scope.md
e2e#fixture-worker-scope-2.md # multiple findings for same check

````

### Bead File Format

```markdown
---
title: "Fix selector priority violation"
type: task
priority: 2
labels: [e2e, review]
---

## Context

Check `playwright#selector-priority` failed.

## Finding

Multiple files use CSS selectors instead of semantic role selectors.

## Files

- `apps/e2e/src/specs/auth/login.spec.ts:45`
- `apps/e2e/src/specs/auth/login.spec.ts:78`
- `apps/e2e/src/specs/settings/update-community.spec.ts:23`

## Fix

Replace CSS selectors with semantic role selectors.
````

Each bead includes:

- **Frontmatter:** title, type, priority, labels (for `bd import`)
- **Context:** Which check failed
- **Finding:** What was observed
- **Files:** All implicated `file:line` refs
- **Fix:** Suggested remediation

### Workflow

1. Run `/review --beads`
2. Review generated beads in `.claude/reviews/FINDINGS/N/`
3. Import selected beads: `bd import .claude/reviews/FINDINGS/1/*.md`
4. Or cherry-pick: `bd import .claude/reviews/FINDINGS/1/e2e#fixture-worker-scope.md`

---

## Open for Future

- **Tier collision:** If same slug appears in multiple tier files within a skill, we have a collision. Solve if it becomes a problem.
- **Check dependencies:** A check that depends on another check passing first. Not needed yet.
- **Auto-fix:** Checks that can automatically fix issues they find. Would need `fix:` section in check definition.
- **PR comment integration:** Post findings as PR comments via `gh pr comment`.

---

## File Summary

| Path                             | Purpose                                                |
| -------------------------------- | ------------------------------------------------------ |
| `~/.claude/skills/*/CHECKS.*.md` | User-level skill checks (no frontmatter)               |
| `~/.claude/checks/*.md`          | User-level standalone checks (can have frontmatter)    |
| `.claude/skills/*/CHECKS.*.md`   | Project-level skill checks (can have frontmatter)      |
| `.claude/checks/*.md`            | Project-level standalone checks (can have frontmatter) |
| `CLAUDE.md` frontmatter          | `checks:` config block                                 |
| `.claude/reviews/FINDINGS.N.md`  | Review output                                          |

```

```
