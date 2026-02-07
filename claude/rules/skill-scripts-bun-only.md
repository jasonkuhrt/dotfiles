# Skill Scripts Use Bun

**Always use `bun` to run TypeScript scripts under `~/.claude/skills/`.**

```bash
# Correct
bun ~/.claude/skills/<skill>/scripts/<name>.ts [args]

# Wrong - will fail
tsx ~/.claude/skills/<skill>/scripts/<name>.ts
npx tsx ~/.claude/skills/<skill>/scripts/<name>.ts
node ~/.claude/skills/<skill>/scripts/<name>.ts
```

A PreToolUse hook enforces this at runtime.
