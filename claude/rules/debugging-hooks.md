# Debugging Hooks

When developing or debugging Claude Code hooks, **always use an external counter file** to verify execution — never guess whether a hook fired.

## Pattern

```bash
# In the hook script
COUNT_FILE=/tmp/claude-hook-<name>.count
count=$(($(cat "$COUNT_FILE" 2>/dev/null || echo 0) + 1))
echo "$count" > "$COUNT_FILE"
echo "v<N> #$count <context>" >> /tmp/claude-hook-<name>.log
```

Then read the count/log file to confirm:

- The hook actually fired (count incremented)
- Which version of the script ran (version tag)
- What input it received (logged context)

## Why

- Hooks run in subprocesses — no visible stdout/stderr
- The `hook success` system reminder only confirms the hook _exited 0_, not that your logic ran
- Built-in slash commands (e.g. `/rename`) may bypass hooks entirely — the counter is the only way to know
- Hot-reload means you can iterate without restarting, but you need proof each iteration actually executed

## Cleanup

Remove debug files after iteration — they may contain prompts or sensitive env data.
