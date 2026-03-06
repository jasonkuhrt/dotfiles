---
paths:
  - "**/*.{ts,tsx}"
---

# TypeScript

Code conventions are defined as checks in `~/.claude/checks/typescript.quality.md`. Run `/check @checks` to evaluate.

## Script Execution

- Always use tsx to execute TypeScript files
- Always use `tsconfig.json` when running tsc to ensure correct configuration

## Other

- Never use child process exec to execute a script when you could ESM import it instead
- Never use ESM dynamic import when you could ESM statically import it instead
- Prefer zx package for scripts over bash
