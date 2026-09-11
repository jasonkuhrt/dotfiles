---
description: Toggle the Hunk flush watcher on or off for this worktree
---

# Hunk flush watcher — toggle

Turns the sentinel watcher on or off. It is off unless explicitly turned on;
it never survives the session.

## What it does

The `claude-flush-signal` Hunk extension binds `F` to writing a sentinel file
keyed by a hash of the repo root, under the system temp dir. This watcher polls
for that file. When it appears, the watcher deletes it and reports how many
open notes the live Hunk session holds, which reaches the session even while it
is idle — the case a Stop hook structurally cannot cover.

## Toggle

Check your running tasks for a monitor whose description is
`hunk flush signal (<repo basename>)`.

**If one is running for this worktree:** stop it with `TaskStop` and say it is
off. Do not arm a second one.

**If none is running:** arm it. Derive the sentinel path from the current repo
root, then start a `Monitor` with `persistent: false` and a
`timeout_ms` of 3600000, described as
`hunk flush signal (<repo basename>)`:

```bash
S="$(python3 -c "
import hashlib, os, tempfile
r = os.getcwd()
print(os.path.join(tempfile.gettempdir(), 'claude-hunk-flush-' + hashlib.sha1(r.encode()).hexdigest()[:12]))
")"
while true; do
  if [ -f "$S" ]; then
    rm -f "$S"
    echo "hunk flush requested — pull the open notes"
  fi
  sleep 2
done
```

Say it is on, and that it lapses after an hour unless re-armed.

## When it fires

Pull and answer in place — do not just report the count:

```bash
hunk session comment list --repo . --type all --json
hunk session comment add --repo . --reply-to <noteId> --summary '<what you did>'
```

A user note is open when no non-user note carries its `noteId` as `parentId`;
that is the only place answered-ness is visible, and `--type user` never shows
it.

Read notes as a concurrent process, not as a reply to your last message. They
may predate what you just found or restate something already fixed. If one
contradicts what you just established, or the turn ended on a pivot or an open
question, record it and say how it lands against the new state rather than
acting on it as the latest word.
