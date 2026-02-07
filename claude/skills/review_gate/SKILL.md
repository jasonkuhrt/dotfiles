---
name: review:gate
description: Run gate-tier review checks only — fast, mechanical, binary pass/fail (types, lint, CI status). Use for quick pre-commit or pre-push validation.
argument-hint: "[pr | dirty | here] [@<group>]"
---

# Code Review — Gate Tier

Mechanical checks only. Binary pass/fail — run commands, check exit codes.

## Defaults

- **Tier**: gate
- **Scope**: here (infer from conversation context; fallback to dirty)
- **Groups**: inferred from which files are in scope

## Execution

Set context, then follow CORE:

- TIER = `gate`
- SCOPE = `here`
- GROUP = (inferred)

Now follow `~/.claude/skills/review_/CORE.md` for execution.
