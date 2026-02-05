---
name: review:help
description: Show review system status — discovered checks, applied config, and how to add new checks. Use when asked about review setup, what checks exist, or how to add checks.
---

# Review System Help

Show the current state of the pluggable review system.

## Execution

### 1. Run Discovery

```bash
bun ~/.claude/skills/review/scripts/discover.ts
```

### 2. Run Config

```bash
bun ~/.claude/skills/review/scripts/config.ts
```

### 3. Display Status

Output in this format:

```
# Review System Status

## Discovered Checks

Found {N} checks across {M} skills:

### {skill} ({count} checks)
| ID | Tier | Source |
|----|------|--------|
| {skill}#{slug} | {tier} | {source file} |

### {skill} ({count} checks)
...

## Configuration

From: {source file(s) that had checks: block, or "No configuration found"}

### Paths
| Skill | Paths |
|-------|-------|
| {skill} | {paths or "all files"} |

### Disabled
| Check | Reason |
|-------|--------|
| {check-id or skill} | {disabled entirely / specific check} |

### Tier Ceiling
{tier or "all (no ceiling)"}

## Effective Checks

After applying config, {N} checks will run:

### Gate
- {check-id}

### Quality
- {check-id}

### Polish
- {check-id}

### Disabled/Skipped
- {check-id} — {reason: no paths configured / explicitly disabled / above tier ceiling}
```

### 4. Show How to Add Checks

Always include this section:

```
---

## Adding New Checks

### Quick Start

Create `CHECKS.md` (or `CHECKS.{tier}.md`) in any skill directory:

```markdown
## check-slug-here

Description of what this check verifies.

### Correct

\`\`\`typescript
// Good example
\`\`\`

### Incorrect

\`\`\`typescript
// Bad example
\`\`\`
```

### Locations

| Location | Namespace | Use For |
|----------|-----------|---------|
| `~/.claude/skills/{skill}/CHECKS.*.md` | `{skill}` | User-wide skill checks |
| `~/.claude/checks/*.md` | `checks` | User-wide standalone checks |
| `.claude/skills/{skill}/CHECKS.*.md` | `{skill}` | Project skill checks |
| `.claude/checks/*.md` | `checks` | Project standalone checks |

### Configuration

Add to CLAUDE.md frontmatter:

```yaml
---
checks:
  playwright:
    paths:
      - "apps/e2e/**"
    disable:
      flaky-check: true

  tier: quality  # optional ceiling
---
```

### Tiers

- `CHECKS.gate.md` — fast, mechanical (types pass, lint pass)
- `CHECKS.quality.md` — structural, judgment-based (patterns)
- `CHECKS.polish.md` — late-stage, edge cases
- `CHECKS.md` — applies to all tiers

Use `/review:checks:add` for guided check creation.
```
