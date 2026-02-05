---
name: review:help
description: Show review system status — discovered checks, config, and how to add checks.
---

# Review System Help

## Execution

### 1. Run Scripts

```bash
bun ~/.claude/skills/review/scripts/discover.ts
bun ~/.claude/skills/review/scripts/config.ts
```

### 2. Output Format

Keep it compact. Example:

```
# Review System Status

## Checks (2)

playwright:
  - selector-priority (quality)
  - no-hardcoded-waits (quality)

## Config

playwright → claude/skills/playwright/**
tier ceiling → all

## Disabled

None

---

## How to Add Checks

1. Create `CHECKS.md` or `CHECKS.{gate|quality|polish}.md` in a skill dir
2. Add H2 sections — each is a check:

   ## my-check-name

   What this check verifies.

   ### Correct
   ```typescript
   // good
   ```

   ### Incorrect
   ```typescript
   // bad
   ```

3. Configure paths in CLAUDE.md frontmatter:

   ---
   checks:
     skillname:
       paths: ["src/**"]
   ---

Use /review:checks:add for guided creation.
```

**Don't use tables.** Use simple lists and indentation.

Show the check body/description only if user asks — default is just ID + tier.
