---
name: skills:doctor
description: >-
  Run automated health checks on skill outfit. Use when user says "check skills",
  "diagnose skills", "skill problems", "doctor", "fix skills".
allowed-tools:
  - Bash(bun:*)
---

# /skills:doctor — Skill Health Checks

Run aspect-based diagnostics on the skill outfit via the shan CLI.

## Commands

### Detect + auto-fix (default)

```bash
bun x @jasonkuhrt/shan skills doctor
```

### Report only (no changes)

```bash
bun x @jasonkuhrt/shan skills doctor --no-fix
```

## 14 Diagnostic Aspects

agent-mirror, broken-symlink (with git rename detection), state-drift, new-leaf, stale-router, orphaned-router, orphaned-scope, stale-gitignore, frontmatter-mismatch, name-conflict, duplicate-name, shadow, stale-shadow, cross-scope-install.
