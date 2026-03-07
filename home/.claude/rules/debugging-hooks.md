# Debugging Hooks

Use an external counter file to verify hook execution — never guess.

```bash
COUNT_FILE=/tmp/claude-hook-<name>.count
count=$(($(cat "$COUNT_FILE" 2>/dev/null || echo 0) + 1))
echo "$count" > "$COUNT_FILE"
echo "v<N> #$count <context>" >> /tmp/claude-hook-<name>.log
```

Read count/log to confirm. The `hook success` reminder only confirms exit 0. Clean up after iteration.
