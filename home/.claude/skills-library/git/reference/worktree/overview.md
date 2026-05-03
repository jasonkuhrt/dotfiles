# Git Worktree

Worktree management is handled by [worktrunk](https://worktrunk.dev) (`wt`). It automates the full lifecycle: creation, path naming, hook execution, build cache sharing, and cleanup.

## Quick Reference

```bash
wt switch --create <branch>            # Create worktree + branch
wt switch --create <branch> --base @   # Branch from current HEAD
wt switch <branch>                     # Switch to existing worktree
wt switch -                            # Switch to previous worktree
wt switch pr:123                       # Checkout a GitHub PR
wt list                                # Status across all worktrees
wt list --full                         # Include CI status + summaries
wt merge                               # Squash + rebase + merge + cleanup
wt remove                              # Remove current worktree
wt step copy-ignored                   # Copy build caches to current worktree
```

## Session Integration

When creating worktrees through the session system:

```bash
session thread create my-feature --worktree              # Uses worktrunk under the hood
session thread create my-feature --worktree --base develop
session thread done my-feature --rm-worktree             # Removal via worktrunk
```

Session calls `wt switch --create` and then runs `session sync` in the new worktree. Worktrunk handles path naming, dependency installation, and build cache copying via its hook system.

## Project Configuration

Place project-specific hooks in `.config/wt.toml` (committed):

```toml
[pre-start]
install = "npm ci"

[post-start]
server = "npm run dev -- --port {{ branch | hash_port }}"

[pre-merge]
test = "npm test"

[list]
url = "http://localhost:{{ branch | hash_port }}"
```

User-level config lives at `~/.config/worktrunk/config.toml`:

```toml
# Worktree path template
worktree-path = "{{ repo_path }}/../{{ repo }}.{{ branch | sanitize }}"

# LLM commit message generation
[commit.generation]
command = "CLAUDECODE= MAX_THINKING_TOKENS=0 claude -p --no-session-persistence --model=haiku --tools='' --disable-slash-commands --setting-sources='' --system-prompt=''"
```

## Build Cache Sharing

Worktrunk's `wt step copy-ignored` copies gitignored files (node_modules, target/, .env) between worktrees. Use `.worktreeinclude` to restrict which files are copied:

```
node_modules/
.env
.env.local
target/
```

Wire it as a hook:

```toml
[post-start]
cache = "wt step copy-ignored"
```

## Port Isolation

The `hash_port` filter generates deterministic ports (10000-19999) from branch names. Same branch always gets the same port.

```toml
[post-start]
server = "npm run dev -- --port {{ branch | hash_port }}"

[pre-remove]
server = "lsof -ti :{{ branch | hash_port }} -sTCP:LISTEN | xargs kill 2>/dev/null || true"
```

## Parallel Agents

```bash
wt switch -x claude -c feature-a -- 'Add user authentication'
wt switch -x claude -c feature-b -- 'Fix the pagination bug'
wt switch -x claude -c feature-c -- 'Write tests for the API'
```

## Legacy Scripts

The following scripts predate worktrunk adoption and are superseded:

- `scripts/worktree-resolve-paths` — replaced by worktrunk's `worktree-path` template
- `scripts/worktree-copy-env` — replaced by `wt step copy-ignored` + `.worktreeinclude`
- `scripts/worktree-pre-trust` — still used for Claude Code directory trust (not covered by worktrunk)
