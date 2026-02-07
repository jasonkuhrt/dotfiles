---
name: review:quality
description: Run quality-tier review checks — structural, judgment-based pattern consistency. Use for code review of conventions and architecture.
argument-hint: "[pr | dirty | here] [@<group>]"
---

# Code Review — Quality Tier

Judgment-based checks. Pattern consistency, conventions, architecture.

## Defaults

- **Tier**: quality
- **Scope**: here (infer from conversation context; fallback to dirty)
- **Groups**: inferred from which files are in scope

## Execution

Set context, then follow CORE:

- TIER = `quality`
- SCOPE = `here`
- GROUP = (inferred)

Now follow `~/.claude/skills/review_/CORE.md` for execution.
