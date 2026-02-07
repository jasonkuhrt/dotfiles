---
name: review:polish
description: Run polish-tier review checks — late-stage edge cases, permission guards, security, index coverage. Use for final review before shipping.
argument-hint: "[pr | dirty | here] [@<group>]"
---

# Code Review — Polish Tier

Late-stage checks. Edge cases, security, permission guards, completeness.

## Defaults

- **Tier**: polish
- **Scope**: here (infer from conversation context; fallback to dirty)
- **Groups**: inferred from which files are in scope

## Execution

Set context, then follow CORE:

- TIER = `polish`
- SCOPE = `here`
- GROUP = (inferred)

Now follow `~/.claude/skills/review_/CORE.md` for execution.
