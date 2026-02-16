# Skill Scripts: Correct Interpreter

**TypeScript (`.ts`) scripts** under `~/.claude/skills/` must use `bun`:

```bash
# Correct
bun ~/.claude/skills/<skill>/scripts/<name>.ts [args]

# Wrong - will fail
tsx ~/.claude/skills/<skill>/scripts/<name>.ts
npx tsx ~/.claude/skills/<skill>/scripts/<name>.ts
node ~/.claude/skills/<skill>/scripts/<name>.ts
```

**Bash (`.sh`) scripts** under `~/.claude/skills/` must use `bash`:

```bash
# Correct
bash ~/.claude/skills/<skill>/scripts/<name>.sh [args]

# Wrong - bun cannot parse bash syntax
bun ~/.claude/skills/<skill>/scripts/<name>.sh [args]
```

PreToolUse hooks enforce both rules at runtime.
