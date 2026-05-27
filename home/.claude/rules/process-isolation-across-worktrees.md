# Process isolation across worktrees

**Never kill, signal, or mutate a process you do not own.** "Own" means: the agent in *this* conversation started the process *in this worktree*, from a known PID. Any other process belongs to the user or another agent and is off-limits.

## The footgun

`pgrep -f <pattern>` and `pkill -f <pattern>` match by command-line substring. Substrings like `tools/scripts/dev-stack`, `vite`, `concurrently`, `webpack`, `npm run`, `tsx` exist in EVERY worktree's process tree — sibling worktrees of the same monorepo, the user's main checkout, a teammate's parallel session, all of it. A single `pkill -f vite` will SIGKILL every vite running on the box, regardless of who started it or what state they were mid-way through.

## The rules

1. **Track PIDs you own.** When you launch a long-running process, record its PID immediately (e.g. write to `.tmp/<feature>/.supervisor.pid`). Only signal that exact PID and its known descendants.
2. **Before any `kill` / `pkill` / `process.kill` call, verify the target is yours.** Acceptable verification methods:
   - The PID came from a file you wrote when you launched the process.
   - `lsof -p $PID | awk '$4=="cwd"'` matches the worktree you're working in.
   - The process's command line includes the worktree's absolute path.
3. **`pgrep -f <pattern> | xargs kill` is banned for cleanup.** It matches across worktrees, sessions, and processes the user owns. If you find yourself reaching for it, you have lost track of what you launched — stop and find your own PIDs.
4. **`docker ps` / `docker compose down` are filter-or-die.** Use `--filter "name=<this-worktree's-project>"` (the per-worktree compose project name) every time. `docker compose down` with no project filter targets every project on the host.
5. **If you see a process from another worktree, leave it alone.** Even if it looks "stale" or "orphaned." It is not yours to triage. Surface the observation to the user; do not act on it.
6. **Cleanup is per-worktree.** The supervisor + finalizer chain you wrote tears down what *it* launched. Don't reach outside that boundary to "help."

## Why this exists

A live agent ran `for PID in $(pgrep -f "tools/scripts/dev-stack"); do kill -TERM $PID; done` to clean up its own stale supervisor. The pattern also matched a supervisor running in another worktree (the user's, mid-work). The user's whole dev stack — docker containers, vite, webpack, api — tore down without warning. The agent's supervision contract worked correctly; it ran the wrong contract on the wrong process.

Killing someone else's process loses their unsaved state, breaks their mid-flight requests, surprises their other agents, and erases trust. There is no "I'll just restart it for them" recovery — the cost is paid the moment the signal fires.

## When you must reach across worktrees

Don't. Ask the user. Worktree-spanning cleanup is a user decision, not an agent one.
