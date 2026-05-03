# Worktrunk Deep Dive

**Date:** 2026-04-04
**Repo:** https://github.com/max-sixty/worktrunk
**Docs:** https://worktrunk.dev
**Stars:** 4,141 | **Language:** Rust | **License:** MIT OR Apache-2.0

Worktrunk is a CLI for git worktree management, designed for running AI agents in parallel. Released early 2026, it is now the most popular git worktree manager. Author: max-sixty.

---

## 1. Complete Feature Inventory

### Core Commands

| Command | Purpose |
|---------|---------|
| `wt switch` | Switch to worktree by branch name; create if `--create` |
| `wt list` | List all worktrees with status, divergence, CI, summaries |
| `wt merge` | Squash + rebase + fast-forward merge + cleanup in one command |
| `wt remove` | Remove worktree and optionally delete branch |
| `wt step` | Building-block subcommands (commit, squash, diff, etc.) |
| `wt hook` | Run/show/manage hooks manually |
| `wt config` | Configuration, shell integration, state management |

### `wt switch` Flags

| Flag | Purpose |
|------|---------|
| `-c, --create` | Create new branch + worktree |
| `-b, --base <BASE>` | Base branch for creation (default: default branch) |
| `-x, --execute <CMD>` | Run command after switch (replaces wt process) |
| `--no-cd` | Skip directory change |
| `--clobber` | Remove stale paths at target |
| `--branches` | Include branches without worktrees in picker |
| `--remotes` | Include remote branches in picker |
| `-y, --yes` | Skip approvals |
| `--no-verify` | Skip hooks |
| `-` | Switch to previous worktree |

**Shortcuts:** `^` = default branch, `@` = current, `-` = previous, `pr:N` = GitHub PR, `mr:N` = GitLab MR.

### `wt merge` Flags

| Flag | Purpose |
|------|---------|
| `--no-squash` | Preserve individual commits |
| `--no-commit` | Skip commit/squash steps |
| `--no-rebase` | Skip rebase (fail if not rebased) |
| `--no-remove` | Keep worktree after merge |
| `--no-ff` | Create merge commit (semi-linear) |
| `--stage <all\|tracked\|none>` | What to stage before commit |
| `-y, --yes` | Skip approvals |
| `--no-verify` | Skip hooks |

**Merge pipeline (8 steps):** commit -> squash -> rebase -> pre-merge hooks -> merge (ff) -> pre-remove hooks -> cleanup -> post-remove + post-merge hooks.

### `wt step` Subcommands

| Subcommand | Purpose |
|------------|---------|
| `commit` | Stage + commit with LLM message |
| `squash` | Squash all branch commits into one |
| `diff` | Show all changes since branching |
| `copy-ignored` | Copy gitignored files between worktrees |
| `eval` | Evaluate template expression |
| `for-each` | Run command in each worktree |
| `promote` | Swap branch into main worktree |
| `prune` | Remove worktrees merged into default |
| `relocate` | Move worktrees to match path template |

### `wt list` Output Modes

- **Table** (default): Progressive rendering, compact symbols
- **JSON** (`--format=json`): Full structured data with all fields
- **Full** (`--full`): Adds CI status, line diffs, LLM summaries
- **Statusline** (`wt list statusline --format=claude-code`): Single-line for editor status bars

### `wt remove` Flags

| Flag | Purpose |
|------|---------|
| `--no-delete-branch` | Keep branch after worktree removal |
| `-D, --force-delete` | Delete unmerged branches |
| `-f, --force` | Remove even with untracked files |
| `--foreground` | Block until complete (default: background) |

**Branch safety checks (6-step cascade):** same commit -> ancestor -> no added changes -> trees match -> merge adds nothing -> patch-id match. Branches passing any check show as safe to delete.

### `wt hook` Subcommands

| Subcommand | Purpose |
|------------|---------|
| `show` | Show configured hooks |
| `pre-switch` | Run pre-switch hooks |
| `post-switch` | Run post-switch hooks |
| `pre-start` | Run pre-start hooks |
| `post-start` | Run post-start hooks |
| `pre-commit` | Run pre-commit hooks |
| `post-commit` | Run post-commit hooks |
| `pre-merge` | Run pre-merge hooks |
| `post-merge` | Run post-merge hooks |
| `pre-remove` | Run pre-remove hooks |
| `post-remove` | Run post-remove hooks |
| `approvals` | Manage command approvals |

Hooks can be targeted: `wt hook pre-merge user:test` or `wt hook pre-merge project:`.

### `wt config` Subcommands

| Subcommand | Purpose |
|------------|---------|
| `show` | Display config files and diagnostics |
| `create` | Scaffold config files |
| `update` | Migrate deprecated settings |
| `shell install` | Install shell integration |
| `shell uninstall` | Remove shell integration |
| `state default-branch` | Get/set/clear default branch cache |
| `state ci-status` | Get/clear CI status cache |
| `state marker` | Get/set/clear branch markers |
| `state vars` | Get/set/list/clear per-branch variables |
| `state logs` | List/clear operation logs |
| `plugins` | Plugin management |

---

## 2. Claude Code Integration

### Plugin Installation

```bash
claude plugin marketplace add max-sixty/worktrunk
claude plugin install worktrunk@worktrunk
```

This installs a Claude Code plugin that provides:
1. **Configuration skill** -- documentation Claude can read for setup guidance
2. **Activity tracking** -- status markers in `wt list` output
3. **Statusline integration** -- real-time worktree status in Claude Code's status bar

### Activity Tracking

The plugin sets status markers automatically:
- `🤖` = Claude actively working
- `💬` = Claude waiting for user input

These appear in the `wt list` Status column. Manual override:
```bash
wt config state marker set "🚧"                    # Current branch
wt config state marker set "✅" --branch feature    # Specific branch
```

### Statusline

```json
{
  "statusLine": {
    "type": "command",
    "command": "wt list statusline --format=claude-code"
  }
}
```

Output format: `~/w/myproject.feature-auth !🤖 @+42 -8 ↑3 ⇡1 ● | Opus 🌔 65%`

- Fetches CI status from network when cache is stale (~1-2s)
- Moon phase gauge (🌕->🌑) shows context window usage when Claude provides it via stdin JSON
- Designed for async statuslines, not synchronous shell prompts

### Parallel Agent Workflow

The canonical pattern for launching parallel Claude instances:

```bash
wt switch -x claude -c feature-a -- 'Add user authentication'
wt switch -x claude -c feature-b -- 'Fix the pagination bug'
wt switch -x claude -c feature-c -- 'Write tests for the API'
```

With tmux:
```bash
tmux new-session -d -s fix-auth "wt switch --create fix-auth -x claude -- \
  'Find the session timeout and extend to 24 hours.'"
```

With Zellij:
```bash
zellij run -- wt switch --create fix-auth -x claude -- \
  'Find the session timeout and extend to 24 hours.'
```

### Alias for Quick Spawn

```bash
alias wsc='wt switch --create --execute=claude'
wsc new-feature                       # Creates worktree, runs hooks, launches Claude
wsc feature -- 'Fix GH #322'         # Passes prompt to claude
```

---

## 3. LLM Commit Generation

### How It Works

Worktrunk pipes a rendered prompt (containing the diff, branch name, recent commits, etc.) to an external CLI command via stdin. The command's stdout becomes the commit message.

### Configuration

```toml
[commit.generation]
command = "CLAUDECODE= MAX_THINKING_TOKENS=0 claude -p --no-session-persistence --model=haiku --tools='' --disable-slash-commands --setting-sources='' --system-prompt=''"
```

**Flags explained:**
- `CLAUDECODE=` -- unsets nesting guard (allows claude-inside-claude)
- `--no-session-persistence` -- prevents commit pollution of `claude --continue`
- `--tools=''` -- disables all tools
- `--disable-slash-commands` -- removes slash commands
- `--setting-sources=''` -- disables settings
- `--system-prompt=''` -- removes system prompt

### Alternative LLM Backends

| Tool | Command |
|------|---------|
| Codex | `codex exec -m gpt-5.1-codex-mini -c model_reasoning_effort='low' ...` |
| opencode | `opencode run -m anthropic/claude-haiku-4.5 --variant fast` |
| llm | `llm -m claude-haiku-4.5` |
| aichat | `aichat -m claude:claude-haiku-4.5` |

### Template System (Minijinja)

Default template variables:

| Variable | Purpose |
|----------|---------|
| `{{ git_diff }}` | Diff content |
| `{{ git_diff_stat }}` | File/insertion/deletion stats |
| `{{ branch }}` | Current branch |
| `{{ repo }}` | Repository name |
| `{{ recent_commits }}` | Prior commit subjects |
| `{{ commits }}` | Commits being squashed (squash template only) |
| `{{ target_branch }}` | Merge destination (squash template only) |

Custom templates via `template` and `squash-template` config keys.

### Where LLM Messages Are Used

1. **`wt step commit`** -- stages and commits with generated message
2. **`wt step squash`** -- squashes branch commits into one with generated message
3. **`wt merge`** -- calls squash internally (step 2 of pipeline)
4. **`wt list --full`** -- generates branch summaries (when `list.summary = true`)
5. **`wt switch` picker** -- shows summary in tab 5

### Fallback Without LLM

Without `commit.generation` configured, worktrunk generates deterministic messages from changed filenames: "Changes to auth.rs & config.rs".

### Manual Commit Messages

Route through `$EDITOR` instead of LLM:
```toml
[commit.generation]
command = '''f=$(mktemp); printf '\n\n' > "$f"; sed 's/^/# /' >> "$f"; ${EDITOR:-vi} "$f" < /dev/tty > /dev/tty; grep -v '^#' "$f"'''
```

---

## 4. Worktree Lifecycle

### Creation

```bash
wt switch --create feature-auth           # From default branch
wt switch --create hotfix --base=@        # From current HEAD
wt switch --create feature-part2 --base=@ # Stacked on current branch
wt switch pr:123                          # Checkout a PR
```

**Creation sequence:**
1. Run pre-switch hooks (blocking)
2. Create worktree at configured path
3. Switch to new directory
4. Run pre-start hooks (blocking) -- e.g., `npm ci`
5. Spawn post-start + post-switch hooks in background -- e.g., dev servers

### Path Template (Configurable)

Default: `{{ repo_path }}/../{{ repo }}.{{ branch | sanitize }}`

Result: `myproject.feature-auth/` sibling to `myproject/`

Other layouts:
```toml
# Inside repository
worktree-path = "{{ repo_path }}/.worktrees/{{ branch | sanitize }}"

# Centralized
worktree-path = "~/worktrees/{{ repo }}/{{ branch | sanitize }}"

# Bare repo
worktree-path = "{{ repo_path }}/../{{ branch | sanitize }}"
```

### Switching

```bash
wt switch feature-auth    # By name
wt switch -               # Previous worktree
wt switch ^               # Default branch
wt switch                 # Interactive picker (Unix only)
```

Interactive picker has 5 preview tabs: HEAD diffs, log, main diff, remote divergence, LLM summary.

### Merging (Full Pipeline)

```bash
wt merge           # Merge to default branch
wt merge develop   # Merge to specific target
```

8-step pipeline: commit -> squash -> rebase -> pre-merge hooks -> fast-forward merge -> pre-remove hooks -> worktree+branch cleanup -> post-hooks. Backup ref saved to `refs/wt-backup/<branch>`.

### Removal

```bash
wt remove          # Current worktree
wt remove feature  # By name
```

Background by default. 6-level safety cascade determines if branch is safe to delete. Use `--no-delete-branch` to keep the branch, `-D` to force-delete unmerged.

### Pruning

```bash
wt step prune              # Remove all merged worktrees
wt step prune --dry-run    # Preview
wt step prune --min-age 2h # Skip recent ones
```

---

## 5. Port Hashing

The `hash_port` template filter generates deterministic ports (10000-19999) from branch names.

```toml
[post-start]
server = "npm run dev -- --port {{ branch | hash_port }}"

[list]
url = "http://localhost:{{ branch | hash_port }}"

[pre-remove]
server = "lsof -ti :{{ branch | hash_port }} -sTCP:LISTEN | xargs kill 2>/dev/null || true"
```

**Properties:**
- Deterministic: same branch always gets same port
- Stable across worktree recreations
- Can hash arbitrary strings: `{{ ('db-' ~ branch) | hash_port }}` for related but distinct ports
- Range 10000-19999 avoids well-known ports

**Subdomain routing with Caddy:**
```toml
[post-start]
proxy = """
  curl -sf --max-time 0.5 http://localhost:2019/config/ || caddy start
  # ... registers route: feature-auth.myproject.localhost:8080 -> localhost:{hash_port}
"""
```

---

## 6. Build Cache

### `wt step copy-ignored`

Copies gitignored files (build caches, `node_modules/`, `.env`, `target/`) from one worktree to another, eliminating cold starts.

```bash
wt step copy-ignored                      # Copy from main to current
wt step copy-ignored --from feature-a     # From specific branch
wt step copy-ignored --dry-run            # Preview
wt step copy-ignored --force              # Overwrite existing
```

### Hook Integration

```toml
[post-start]
copy = "wt step copy-ignored"

# Or pre-start if subsequent hooks need the files immediately
[pre-start]
copy = "wt step copy-ignored"
```

### `.worktreeinclude` File

Restrict which gitignored files are copied using gitignore-style patterns:

```
# Only copy these
node_modules/
.env
target/
```

Without `.worktreeinclude`, ALL gitignored files are copied.

### Built-in Excludes

Always excluded: `.bzr/`, `.hg/`, `.jj/`, `.pijul/`, `.sl/`, `.svn/`, `.conductor/`, `.entire/`, `.pi/`, `.worktrees/`.

Additional excludes via config:
```toml
[step.copy-ignored]
exclude = [".cache/", ".turbo/"]
```

---

## 7. Hook System

### 10 Hook Types Across 5 Lifecycle Events

| Event | Pre (blocking) | Post (background) |
|-------|---------------|-------------------|
| switch | `pre-switch` | `post-switch` |
| start | `pre-start` | `post-start` |
| commit | `pre-commit` | `post-commit` |
| merge | `pre-merge` | `post-merge` |
| remove | `pre-remove` | `post-remove` |

**Execution model:** Pre-hooks run serially and block -- failure aborts the operation. Post-hooks run in background with output logged.

### Configuration Syntax

```toml
# Single command
pre-start = "npm ci"

# Named concurrent commands
[pre-merge]
test = "cargo test"
lint = "cargo clippy"

# Pipeline: sequential stages with concurrent commands within each stage
post-start = [
    { install = "npm ci" },
    { build = "npm run build", server = "npm run dev" }
]
```

### Two Scopes

1. **User hooks** (`~/.config/worktrunk/config.toml`) -- no approval required
2. **Project hooks** (`.config/wt.toml`) -- require approval on first run

User hooks execute first, then project hooks.

### Approval System

Project hooks trigger an approval prompt:
```
▲ repo needs approval to execute 3 commands:
○ pre-start install: npm ci
○ pre-start build: cargo build --release
❯ Allow and remember? [y/N]
```

Approvals saved to `~/.config/worktrunk/approvals.toml`. Re-approval required when command template changes. Bypass with `--yes`, skip all hooks with `--no-verify`.

### Template Variables (27+)

Core: `branch`, `worktree_path`, `worktree_name`, `commit`, `short_commit`, `upstream`, `base`, `base_worktree_path`, `target`, `target_worktree_path`, `cwd`, `repo`, `repo_path`, `primary_worktree_path`, `default_branch`, `remote`, `remote_url`, `hook_type`, `hook_name`, `vars.<key>`.

### Template Filters

| Filter | Output |
|--------|--------|
| `sanitize` | Replace `/` `\` with `-` |
| `sanitize_db` | `[a-z0-9_]`, max 63 chars, 3-char hash suffix |
| `hash_port` | Port 10000-19999 from string hash |

### Template Functions

| Function | Purpose |
|----------|---------|
| `worktree_path_of_branch(name)` | Get filesystem path for a branch |

### JSON Context on Stdin

Hooks receive all template variables as JSON on stdin for complex logic:
```python
import json, sys
ctx = json.load(sys.stdin)
if ctx['branch'].startswith('feature/'):
    subprocess.run(['make', 'seed-db'])
```

### Conditional Templates

```toml
sync = "{% if upstream %}git fetch && git rebase {{ upstream }}{% endif %}"
missing_var = "{{ vars.env | default('development') }}"
```

### Logging

All hook executions logged to `.git/wt/logs/commands.jsonl` (rotates at 1MB). Monitor specific hooks:
```bash
tail -f "$(wt config state logs get --hook=user:post-start:server)"
```

---

## 8. Configuration

### File Locations

| File | Purpose | Committed |
|------|---------|-----------|
| `~/.config/worktrunk/config.toml` | User preferences, LLM config, user hooks | No |
| `.config/wt.toml` | Project hooks, URLs, forge overrides | Yes |
| `~/.config/worktrunk/approvals.toml` | Approved project commands | No |

### Key Configuration Sections

**`[list]`**
```toml
summary = false          # LLM branch summaries
full = false             # CI + diffs + summaries
branches = false         # Include worktree-less branches
remotes = false          # Include remote-only branches
task-timeout-ms = 0      # Per-git-command timeout
timeout-ms = 0           # Total collect phase timeout
```

**`[commit]`**
```toml
stage = "all"            # all | tracked | none
```

**`[merge]`**
```toml
squash = true            # Squash commits
commit = true            # Commit uncommitted first
rebase = true            # Rebase onto target
remove = true            # Remove worktree after merge
verify = true            # Run hooks
ff = true                # Fast-forward (no merge commit)
```

**`[switch]`**
```toml
cd = true                # Auto-cd after switch
[switch.picker]
pager = "delta --paging=never"
timeout-ms = 500
```

**`[step.copy-ignored]`**
```toml
exclude = [".cache/", ".turbo/"]
```

### Per-Project Overrides (in user config)

```toml
[projects."github.com/user/repo"]
worktree-path = ".worktrees/{{ branch | sanitize }}"
list.full = true
merge.squash = false
pre-start.env = "cp .env.example .env"
```

### Environment Variables

Kebab-case keys convert to `WORKTRUNK_SCREAMING__SNAKE__CASE`:

| Config Key | Environment Variable |
|------------|----------------------|
| `worktree-path` | `WORKTRUNK_WORKTREE_PATH` |
| `commit.generation.command` | `WORKTRUNK_COMMIT__GENERATION__COMMAND` |

Other env vars: `WORKTRUNK_BIN`, `WORKTRUNK_CONFIG_PATH`, `WORKTRUNK_MAX_CONCURRENT_COMMANDS`, `NO_COLOR`.

### State Management

Per-branch state stored in `.git/config` under `worktrunk.*`:
- **Default branch cache** -- `wt config state default-branch`
- **CI status cache** -- 30-60s TTL, requires `gh`/`glab`
- **Branch markers** -- emoji/text status per branch
- **Custom variables** -- `wt config state vars set key=value`, accessible as `{{ vars.key }}` in templates
- **Operation logs** -- `.git/wt/logs/`

### Files Worktrunk Creates

1. **Worktree directories** -- at configured path template
2. **Config files** -- user config, approvals, project config
3. **Shell integration** -- lines added to shell rc files
4. **Git metadata** -- `.git/config` keys, `.git/wt/cache/`, `.git/wt/logs/`

**What it does NOT create:** No global git hooks, no `~/.gitconfig` modifications, no background daemons.

---

## 9. Tips and Patterns

### Database Isolation Per Worktree

```toml
post-start = [
  """
  wt config state vars set \
    container='{{ repo }}-{{ branch | sanitize }}-postgres' \
    port='{{ ('db-' ~ branch) | hash_port }}' \
    db_url='postgres://postgres:dev@localhost:{{ ('db-' ~ branch) | hash_port }}/{{ branch | sanitize_db }}'
  """,
  { db = "docker run -d --rm --name {{ vars.container }} -p {{ vars.port }}:5432 ..." },
]

[pre-remove]
db-stop = "docker stop {{ vars.container }} 2>/dev/null || true"
```

### Quality Gates

```toml
[pre-commit]
lint = "npm run lint"
typecheck = "npm run typecheck"

[pre-merge]
test = "npm test"
build = "npm run build"
```

### Tmux Session Per Worktree

```toml
[pre-start]
tmux = """
S={{ branch | sanitize }}; W={{ worktree_path }}
tmux new-session -d -s "$S" -c "$W" -n dev
tmux split-window -h -t "$S:dev" -c "$W"
# ... layout setup
"""

[pre-remove]
tmux = "tmux kill-session -t {{ branch | sanitize }} 2>/dev/null || true"
```

### Bare Repository Layout

```bash
git clone --bare <url> myproject/.git
cd myproject
```

```toml
worktree-path = "{{ repo_path }}/../{{ branch | sanitize }}"
```

All branches become equal peer directories.

### Stacked Development

```bash
wt switch --create feature-part2 --base=@  # Branch from current HEAD, not default
```

### `wt step for-each`

```bash
wt step for-each -- git status --short    # Run in every worktree
```

### `wt step promote`

Swap a feature branch into the main worktree position.

### JSON Automation

```bash
# Current worktree path
wt list --format=json | jq -r '.[] | select(.is_current) | .path'

# Branches safe to remove
wt list --format=json | jq '.[] | select(.main_state == "integrated") | .branch'

# Stale CI
wt list --format=json --full | jq '.[] | select(.ci.stale) | .branch'
```

---

## 10. Composition with Our Stack

Worktrunk replaces the worktree layer -- the part of our stack that currently does `git worktree add`, names paths, copies build artifacts, and cleans up. Everything above that layer (session metadata, dispatch, terminal layout) is untouched.

### What Worktrunk Replaces

| Current manual step | Worktrunk equivalent |
|---------------------|----------------------|
| `git worktree add -b feat ../repo.feat && cd ../repo.feat` | `wt switch --create feat` |
| Hardcoded sibling path convention | Configurable `worktree-path` template |
| Manual `npm ci` / dep install after creation | `pre-start` hook |
| Manual `git worktree remove` + `git branch -d` | `wt remove` (with 6-level safety cascade) |
| No build cache sharing | `wt step copy-ignored` |
| No per-worktree dev server ports | `hash_port` filter |
| No cross-branch status view | `wt list` / `wt list --full` |
| Manual squash + rebase + merge + cleanup | `wt merge` (8-step pipeline) |

### What Worktrunk Doesn't Touch

- Session metadata (threads, plans, claims, debriefs)
- Agent dispatch and orchestration
- Terminal workspace layout (cmux)
- Process persistence (zmx)
- Conflict detection between branches (clash)

### Integration Surface

Worktrunk's hook system is the main integration surface. Anything our stack needs to do on worktree create/remove can be wired as hooks:

```toml
# Example: wire into whatever needs to know about worktree lifecycle
[post-start]
notify = "some-cli worktree-created --branch {{ branch }} --path {{ worktree_path }}"

[pre-remove]
notify = "some-cli worktree-removing --branch {{ branch }}"
```

`wt list --format=json` provides structured worktree state for any tooling that needs to enumerate active worktrees programmatically.

### Migration Path

1. `brew install worktrunk && wt config shell install`
2. Set `worktree-path` template to match current naming convention
3. Replace raw `git worktree add` calls with `wt switch --create`
4. Move dep installation into `pre-start` hooks
5. Replace raw `git worktree remove` + `git branch -d` with `wt remove`
6. Adopt `wt merge` for local merge workflows
7. Configure LLM commit generation
8. Add `copy-ignored` and `hash_port` as projects need them

---

## 11. Comparison with workz and agent-worktree

### workz

**What workz does:** Thin shell wrapper around `git worktree` with basic lifecycle management.

**Where worktrunk is better:**
- Full hook system (10 hook types vs. none)
- LLM commit message generation
- Interactive picker with live previews
- CI status aggregation across branches
- JSON output for automation
- Build cache copying (`copy-ignored`)
- Port hashing for dev server isolation
- Per-branch state (markers, vars)
- Template engine (minijinja) for all config
- Approval system for project commands
- PR/MR checkout integration
- Branch safety cascade for deletion
- `wt merge` one-command workflow

**What workz has that worktrunk lacks:** Nothing material. worktrunk is a strict superset.

### agent-worktree (Claude Code's built-in)

**What agent-worktree does:** Claude Code's `--worktree` flag creates isolated worktrees for subagent tasks.

**Where worktrunk is better:**
- User-controlled lifecycle (not tied to Claude Code's agent model)
- Persistent worktrees (agent-worktree cleans up when the agent exits)
- Full hook system for environment setup
- `wt list` visibility across all worktrees
- Build cache sharing between worktrees
- LLM commit generation
- CI status aggregation
- Works with any agent (Codex, Claude, etc.), not just Claude Code subagents

**Where agent-worktree is better:**
- Zero-config for simple parallel tasks within a single Claude Code session
- Automatic cleanup on agent completion
- Tighter integration with Claude Code's task system

**When to use which:**
- agent-worktree: ephemeral subagent tasks that don't need persistent state
- worktrunk: persistent parallel workstreams, multi-agent coordination, anything that needs hooks/ports/caches

---

## 12. Installation and Getting Started

### Install

```bash
# macOS / Linux (recommended)
brew install worktrunk && wt config shell install

# Cargo
cargo install worktrunk && wt config shell install

# Arch Linux
sudo pacman -S worktrunk && wt config shell install

# Windows
winget install max-sixty.worktrunk
# Note: `wt` conflicts with Windows Terminal; use `git-wt` or disable the alias
```

`wt config shell install` adds shell integration for directory switching (cd on `wt switch`).

**Shell support:** bash, zsh, fish, nushell, PowerShell.

### First Run

```bash
# Create user config
wt config create

# Create project config (optional)
wt config create --project

# Verify setup
wt config show --full

# Try it
wt switch --create test-branch
wt list
wt remove
```

### Claude Code Plugin

```bash
claude plugin marketplace add max-sixty/worktrunk
claude plugin install worktrunk@worktrunk
```

### Configure LLM Commits

Add to `~/.config/worktrunk/config.toml`:
```toml
[commit.generation]
command = "CLAUDECODE= MAX_THINKING_TOKENS=0 claude -p --no-session-persistence --model=haiku --tools='' --disable-slash-commands --setting-sources='' --system-prompt=''"
```

### Minimal Project Config (`.config/wt.toml`)

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

### Fish Shell Note

Fish creates function and completion files rather than sourcing a line. Run `wt config shell install` and restart the shell.

### Compilation Issues

If `cargo install` fails with C compilation errors (tree-sitter related):
```bash
cargo install worktrunk --no-default-features
```

This disables bash syntax highlighting but keeps all core functionality.

---

## Appendix: Architecture Notes

### No Background Daemons

Worktrunk is stateless between invocations. State lives in git config (`worktrunk.*` keys) and filesystem (`.git/wt/`). No background processes, no socket files, no PID files.

### No Git Config Modifications

Worktrunk never modifies `~/.gitconfig`. All its state lives under `worktrunk.*` keys in the repo's `.git/config`.

### Audit Trail

All hook executions and LLM commands are recorded in `.git/wt/logs/commands.jsonl` -- one JSON object per line with timestamp, command, exit code, and duration. Rotates at ~1MB.

### Platform Support

Full support on macOS, Linux, Windows (Git Bash + PowerShell). Interactive picker (skim-based) is Unix-only.
