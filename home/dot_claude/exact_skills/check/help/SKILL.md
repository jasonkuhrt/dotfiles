---
name: check:help
description: Show available checks, config, and how to add checks.
---

# Checks System Help

## Execution

### 1. Run Scripts

```bash
bun ~/.claude/skills/check/scripts/discover.ts
bun ~/.claude/skills/check/scripts/config.ts
```

### 2. Output Format

Keep it compact. Show usage first, then discovered checks, then config.

```
# Checks System Status

## Usage

/check                              Quality tier, conversation context
/check the prisma schema            Prisma checks only
/check everything on this branch    All tiers, full branch diff
/check just types and lint          Gate tier only
/check effect code thoroughly       Polish tier, Effect checks
/check my uncommitted changes       Quality tier, dirty scope

Shorthand tokens still work:
/check gate                         Gate tier only
/check quality dirty @effect        Quality, uncommitted, Effect only
/check pr @prisma                   Branch diff, Prisma only

Shortcuts:
/check:gate   Gate tier shortcut
/check:polish Polish tier shortcut
/check:ask    Interactive — choose everything via prompts

## Checks ({total})

{skill} ({count})
  - {slug} ({tier})
  - {slug} ({tier})

{skill} ({count})
  - {slug} ({tier})

## Config

{skill} → {paths}
tier ceiling → {tier or "none"}

## Disabled

{skill}#{slug} or "None"

---

## How to Add Checks

**In a skill dir:** create `CHECKS.md` or `CHECKS.{gate|quality|polish}.md`
**In `checks/` dir:** create any `.md` file (like `rules/` — every `.md` is a check)

1. Add H2 sections — each is a check:

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

2. Configure paths in CLAUDE.md frontmatter:

   ---
   checks:
     skillname:
       paths: ["src/**"]
   ---

Use /check:add for guided creation.
```

**Don't use tables.** Use simple lists and indentation.

Show the check body/description only if user asks — default is just ID + tier.
