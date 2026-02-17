# CI Watching

## Use `--watch --fail-fast` in Background

```bash
# Correct — background, exits on first failure
Bash({ command: 'gh pr checks <PR> --watch --fail-fast', run_in_background: true })
```

## React to Background Notifications Immediately

When you receive a "Background bash has new output" notification for a CI watcher:

1. **Read the output file immediately** — don't wait for the user to ask
2. **Report the result** — tell the user what passed/failed
3. **If failed**: fetch logs with `gh api repos/OWNER/REPO/actions/jobs/<JOB_ID>/logs | tail -60`
4. **If still pending**: tell the user and offer to check again

## Exit Codes

- `0` — all checks passed
- `1` — one or more checks failed
- `8` — checks still pending (only without `--watch`)

## Getting Failed Job Logs

```bash
# If the run is complete:
gh run view <RUN_ID> --log-failed

# If the run is still in progress (--log-failed won't work):
gh api repos/OWNER/REPO/actions/jobs/<JOB_ID>/logs 2>&1 | tail -60
```

## Anti-Patterns

- **Never ignore background task notifications** — the whole point of background is async notification
- **Never use `sleep N && gh pr checks`** — wastes time and still requires manual re-check
- **Never use `--watch` in foreground** — blocks the entire conversation
