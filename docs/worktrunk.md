# Worktrunk

[Worktrunk](https://worktrunk.dev) (`wt`) manages git worktrees for parallel AI agent workflows. It replaces manual `git worktree add/remove` with a lifecycle-aware CLI that handles path naming, hooks, build cache sharing, and status aggregation.

## Command Outline

```
wt
├── switch          # Navigate/create worktrees by branch name
│   ├── --create    #   Create new branch + worktree
│   ├── --base      #   Base branch for creation
│   ├── --execute   #   Run command after switch (e.g. -x claude)
│   ├── pr:N / mr:N #   Checkout GitHub PR / GitLab MR
│   └── (no args)   #   Interactive fuzzy picker with live diffs
│
├── list            # Status dashboard across all worktrees
│   ├── --full      #   CI status, line diffs, LLM summaries
│   ├── --branches  #   Include branches without worktrees
│   ├── --format    #   table (default) or json
│   └── statusline  #   Single-line for editor status bars
│
├── merge           # One-command merge pipeline (8 steps)
│   │               #   commit → squash → rebase → pre-merge hooks
│   │               #   → ff merge → pre-remove hooks → cleanup → post-hooks
│   ├── --no-squash #   Preserve individual commits
│   ├── --no-ff     #   Create merge commit (semi-linear)
│   └── --no-remove #   Keep worktree after merge
│
├── remove          # Remove worktree + optionally branch
│   ├── --no-delete-branch   # Keep the branch
│   ├── -D          #   Force-delete unmerged branches
│   └── --force     #   Remove even with untracked files
│
├── step            # Building blocks + utilities
│   ├── commit      #   Stage + commit with LLM message
│   ├── squash      #   Squash branch into one commit
│   ├── push        #   Fast-forward target to current
│   ├── rebase      #   Rebase onto target
│   ├── diff        #   All changes since branching
│   ├── copy-ignored #  Copy gitignored files between worktrees
│   ├── eval        #   Evaluate template expression
│   ├── for-each    #   Run command in every worktree
│   ├── promote     #   Swap branch into main worktree
│   ├── prune       #   Remove merged worktrees
│   ├── relocate    #   Move worktrees to match path template
│   └── <alias>     #   User-defined command templates
│
├── hook            # Run/inspect lifecycle hooks
│   ├── show        #   Display configured hooks
│   ├── pre-start / post-start
│   ├── pre-switch / post-switch
│   ├── pre-commit / post-commit
│   ├── pre-merge  / post-merge
│   ├── pre-remove / post-remove
│   └── approvals  #   Manage project hook approvals
│
└── config          # Configuration + state
    ├── show        #   Display config + diagnostics
    ├── create      #   Scaffold config files
    ├── update      #   Migrate deprecated settings
    ├── shell       #   install / uninstall shell integration
    ├── plugins     #   Claude Code plugin management
    └── state       #   Per-branch runtime state
        ├── default-branch  # Get/set/clear
        ├── ci-status       # CI cache
        ├── marker          # Branch status emoji
        ├── vars            # Per-branch key-value store
        └── logs            # Hook execution logs
```

## Config Files

| File | Purpose | Committed |
|------|---------|-----------|
| `~/.config/worktrunk/config.toml` | User preferences, LLM config, user hooks | No |
| `.config/wt.toml` | Project hooks, URLs, forge overrides | Yes |
| `~/.config/worktrunk/approvals.toml` | Approved project hook commands | No |

## Template Engine

Minijinja syntax everywhere -- hooks, paths, aliases, LLM prompts.

| Filter | Example | Output |
|--------|---------|--------|
| `sanitize` | `{{ branch \| sanitize }}` | `feature/auth` → `feature-auth` |
| `hash_port` | `{{ branch \| hash_port }}` | Deterministic port 10000-19999 |
| `sanitize_db` | `{{ branch \| sanitize_db }}` | `feature_auth_x7k` (63 char max) |

Key variables: `branch`, `worktree_path`, `repo`, `repo_path`, `base`, `target`, `commit`, `vars.<key>`.

## Session Integration

The session system delegates worktree creation to worktrunk:

```bash
session thread create my-feature --worktree              # calls wt switch --create
session thread create my-feature --worktree --base develop
session thread done my-feature --rm-worktree             # calls wt remove
```

Session keeps ownership of base branch resolution (from `.sessions/.config.yml`) and session wiring (`session sync`). Worktrunk owns everything else: path naming, dependency installation, build cache copying, cleanup safety checks.

## Parallel Agents

```bash
# Launch 3 Claude instances in isolated worktrees
wt switch -x claude -c feature-a -- 'Add user authentication'
wt switch -x claude -c feature-b -- 'Fix the pagination bug'
wt switch -x claude -c feature-c -- 'Write tests for the API'
```

## Project Config Example

`.config/wt.toml` (committed to repo):

```toml
[pre-start]
install = "npm ci"

[post-start]
server = "npm run dev -- --port {{ branch | hash_port }}"
cache = "wt step copy-ignored"

[pre-merge]
test = "npm test"

[pre-remove]
server = "lsof -ti :{{ branch | hash_port }} -sTCP:LISTEN | xargs kill 2>/dev/null || true"

[list]
url = "http://localhost:{{ branch | hash_port }}"
```

## Further Reference

- [Full research doc](../research/2026-04-04-worktrunk-deep-dive.md) -- complete feature inventory
- [worktrunk.dev](https://worktrunk.dev) -- official docs
- [Hook reference](https://worktrunk.dev/hook/) -- all 10 hook types, template variables, approval system
- [LLM commits](https://worktrunk.dev/llm-commits/) -- commit message generation setup
- [Tips & patterns](https://worktrunk.dev/tips-patterns/) -- recipes for databases, tmux, Caddy, stacked branches
