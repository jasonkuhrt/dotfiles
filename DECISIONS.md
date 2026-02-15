# Architecture Decision Records

This document captures the "why" behind major architectural choices in this dotfiles system.

---

## Decision 1: Abbreviations Over Aliases for Command Renames

**Context:**
Shell aliases hide the actual command from history and from other people reading your terminal. When you type `g st` and it runs `git status`, your history shows `g st` — useless for copy-pasting or sharing.

**Decision:**
Use Fish abbreviations (`abbr`) for simple command renames. Reserve aliases for commands with baked-in flags/args.

**Implementation:**
```fish
# abbr: expands in-place, history shows real command
abbr -a g git        # type "g st" → expands to "git status" → history: "git status"
abbr -a ls lsd
abbr -a cat bat

# alias: for commands with flags (no equivalent as abbr)
alias px="pnpm --silent"
alias cal='cal -3'
```

**Rationale:**
- History is searchable and shareable
- Muscle memory still works (type short form)
- Visible expansion teaches the full command
- Aliases reserved for cases where abbreviation expansion would be wrong (`px test` should NOT expand to `pnpm --silent test` visually — the `--silent` is implementation detail)

Source: `config.fish:82-90`

---

## Decision 2: Modern Unix Replacements via Abbreviations

**Decision:**
Map classic commands to modern replacements using abbreviations, only in interactive mode.

**Implementation:**
```fish
abbr -a ls lsd       # ls with icons, git integration
abbr -a cat bat      # syntax highlighting, paging
abbr -a grep rg      # ripgrep (fast, .gitignore-aware)
abbr -a find 'fd --hyperlink auto'
abbr -a top btm      # bottom (graphical resource monitor)
abbr -a du dust      # disk usage with visual bars
abbr -a df duf       # disk free with color
abbr -a ps procs     # process viewer with tree
abbr -a sed sd       # simpler regex syntax
abbr -a dig dog      # DNS with color
abbr -a ping gping   # graphical ping
abbr -a diff difft   # structural diff (understands syntax)
abbr -a vim nvim
```

**Rationale:**
- Abbreviations only expand in interactive shells — scripts calling `ls` or `grep` are unaffected
- Visible expansion teaches you what's actually running

**Trade-offs:**
- Must install all replacement tools (handled by Brewfile)
- Occasional behavior differences from classic tools (e.g., `fd` excludes gitignored files by default)

Source: `config.fish:127-141`

---

## Decision 3: Custom Sync Script Over Dotfiles Managers

**Decision:**
Use a custom `sync` script (bash) with a `sync-lib.sh` library of shared utilities.

**What the sync script handles beyond symlinking:**
- Homebrew packages (formulae, casks, MAS apps — each installed separately)
- Fisher plugins (copy, not symlink — see Decision 5)
- macOS defaults (keyboard, Finder, Dock, trackpad, screenshots, etc.)
- SSH known_hosts seeding
- Dock app layout (via dockutil)
- App-specific plist manipulation (CleanShot X save path)
- Node.js toolchain (pnpm → node → npm globals → corepack)
- Migrations (one-time cleanup scripts for existing machines)

**Properties:**
- Idempotent: every operation checks current state before acting
- Safe: warns on existing real files with content instead of silently overwriting
- No external dependency beyond bash

Source: `sync`, `sync-lib.sh`

---

## Decision 4: Selective File Linking Over Whole-Directory Linking

**Decision:**
Symlink individual files. For subdirectories that should be fully synced, use `link_subdir` which symlinks the directory itself.

**Implementation:**
```bash
# Individual files (Fish config, gitconfig, etc.)
link_file "$HERE/fish/config.fish" "$HOME/.config/fish/config.fish"

# Whole subdirectories (Claude commands, rules, skills)
link_subdir "$HERE/claude/commands" "$HOME/.claude/commands"
```

**Rationale:**
- Runtime-generated files (e.g., `fish_variables`, Fisher-managed files) don't pollute the dotfiles repo
- `.gitignore` stays clean — no need to exclude generated content
- Explicit about what's managed vs. what's local
- `link_subdir` used where the whole directory IS the config (Claude commands, rules, skills)

Source: `sync`, `sync-lib.sh`

---

## Decision 5: fish_plugins as Copy, Not Symlink

**Context:**
Fisher (the Fish plugin manager) both reads and writes `fish_plugins`. If symlinked to the dotfiles repo, Fisher's write operations modify the repo directly, creating unwanted git changes.

**Decision:**
Copy `fish_plugins` from dotfiles to the runtime location. Detect and warn on drift.

**Implementation:**
```bash
# Copy dotfiles version (authoritative source)
cp "$FISH_PLUGINS_SRC" "$FISH_PLUGINS_DST"

# Warn if local copy has diverged (user added plugins outside dotfiles)
if ! diff -q "$FISH_PLUGINS_SRC" "$FISH_PLUGINS_DST" >/dev/null 2>&1; then
    warn "Local fish_plugins differs from dotfiles"
fi
```

**Rationale:**
- Fisher can freely write to its own copy without affecting the repo
- Dotfiles version is the source of truth
- Drift detection catches plugins added locally that should be committed

Source: `sync:469-496`, comment: "copy, not symlink - protects dotfiles from fisher corruption"

---

## Decision 6: pnpm for Node Version Management

**Decision:**
Use pnpm as both package manager and Node version manager. npm for global CLI tools. Corepack for per-project pnpm/yarn versions.

**Implementation:**
```
Bootstrap: Homebrew → pnpm → node LTS → npm globals → corepack
Runtime:   npm globals (1st) → pnpm node (2nd) → Homebrew (3rd, unused)
```

**Rationale (documented in [docs/node-setup.md](docs/node-setup.md)):**
- pnpm already manages packages; `pnpm env use --global lts` replaces a dedicated version manager
- npm globals install to `~/.npm-global` independent of node version — upgrading node doesn't break global tools
- npx checks npm's global dir, so using npm (not pnpm) for globals preserves npx fallback
- Corepack handles per-project pnpm/yarn versions automatically

**Trade-offs:**
- Three-tool dance (pnpm + npm + corepack) is more complex than a single tool
- Can't use `pnpm self-update` (conflicts with Homebrew's version tracking)
- `brew install corepack` conflicts with `brew install pnpm` — must use npm global instead

**Prior art:** fnm was tried but abandoned — "the official suggestion doesn't work in Fish for some reason" (commented-out code in `config.fish:49-56`, links to [fnm#356](https://github.com/Schniz/fnm/issues/356#issuecomment-1010816655)).

---

## Decision 7: Beads for Task Tracking

**Decision:**
Use beads (`bd`) as the canonical task tracker. Prohibit TodoWrite, TaskCreate, and markdown files for task tracking.

**Properties:**
- Git-backed: tasks persist across sessions and machines
- Dependencies: tasks can block/be-blocked-by other tasks
- Labels: categorical organization (see `.beads/labels.yml`)
- Sync: `bd sync` pushes state to remote
- CLI interface works from any AI coding tool

Source: `AGENTS.md`, system prompt configuration

---

## Decision 8: Starship Prompt with tmux-Aware Config

**Context:**
When running inside tmux, gitmux already shows branch, status, and ahead/behind in the status bar.

**Decision:**
Use a minimal Starship config inside tmux sessions, full config outside.

**Implementation:**
```fish
# Use minimal config in tmux (git info is in status bar via gitmux)
if set -q TMUX
    set -gx STARSHIP_CONFIG ~/.config/starship-tmux.toml
end
starship init fish | source
```

Source: `config.fish:9-13`

---

## Decision 9: Direnv Lazy-Loading

**Context:**
Direnv's Fish hook (`direnv hook fish | source`) adds ~130ms to shell startup even when no `.envrc` exists.

**Decision:**
Lazy-load direnv: only activate if `.envrc` exists in the starting directory. Provide `direnv-init` function for manual activation.

**Implementation:**
```fish
# Direnv: lazy-load only when needed (saves ~130ms startup)
set -gx DIRENV_LOG_FORMAT ""  # Silence "loading" messages
function direnv-init --description "Enable direnv for this shell session"
    direnv hook fish | source
    direnv reload 2>/dev/null
end
if test -f .envrc
    direnv-init
end
```

**Trade-off:**
- If you `cd` into a direnv project after shell startup, you must run `direnv-init` manually

Source: `config.fish:38-47`

---

## Decision 10: Claude Code Hooks for Rule Enforcement

**Context:**
Rules in `CLAUDE.md` and `claude/rules/` are advisory. Critical constraints need enforcement that doesn't depend on context window content.

**Decision:**
Use PreToolUse hooks (shell scripts) to enforce critical rules at runtime, blocking tool calls that violate them.

**Implementation:**
- `git-worktree-guard.sh` — blocks `git checkout/switch/stash` in shared worktrees
- Skill script interpreter enforcement — blocks `tsx`/`node` on `.ts` files, blocks `bun` on `.sh` files

**Properties:**
- Hooks run before the tool executes — violations are prevented, not just detected
- Exit code 2 blocks the action with a message; the agent can adjust
- Hooks are loaded from filesystem, not context
- Debugging pattern: external counter files verify hook execution (see `claude/rules/debugging-hooks.md`)

Source: `claude/rules/no-branch-switching-in-shared-worktrees.md`, `claude/rules/skill-scripts-bun-only.md`, `claude/rules/debugging-hooks.md`

---

## Decision 11: Shared Skills Across AI Tools (Claude/Codex/Agents)

**Decision:**
Claude Code skills are the source of truth. Sync them to other tools via symlinks.

**Implementation:**
```bash
# Claude skills are authoritative
link_subdir "$HERE/claude/skills" "$HOME/.claude/skills"

# Mirror to agents (shared neutral tree), excluding .system
sync_symlink_children_diff "$HERE/claude/skills" "$HERE/agents/skills" "../../claude/skills" ".system"

# Agents tree is then linked to both ~/.agents and ~/.codex
link_subdir "$HERE/agents/skills" "$HOME/.agents/skills"
link_subdir "$HERE/agents/skills" "$HOME/.codex/skills"
```

**Properties:**
- Single source of truth for skill content
- `.system` directory excluded from sync (Codex-specific system skills preserved)
- Adding a skill to Claude automatically propagates to other tools on next sync

Source: `sync:86-104`

---

## Decision 12: Skills Library-Backed Symlink Architecture (shan)

**Context:**
Claude Code's autocomplete doesn't discover symlinks to subdirectories of already-symlinked parents.

**Decision:**
Use a skills library (`claude/skills-library/`) as the backing store. Active skills are symlinks from `claude/skills/` pointing into the library. Managed by the `shan` tool.

**Properties:**
- Skills can be enabled/disabled without deletion (`shan skills on/off`)
- Sub-skills use direct stub directories with one-line redirects (workaround for symlink discovery bug)

**Trade-offs:**
- Extra indirection (skill → symlink → library)
- `shan` tool required for management operations

Source: git history (`c60657a`), MEMORY.md notes on symlink bugs

---

## Decision 13: Migrations for One-Time Cleanup on Existing Machines

**Context:**
The sync script is idempotent — it converges to the desired state. But some changes require destructive one-time actions on existing machines that shouldn't run on fresh installs.

**Decision:**
Timestamp-based migration scripts in `migrations/` with a marker file tracking what's been run.

**Implementation:**
```bash
# Marker tracks last run date
LAST_RUN=$(cat "$MARKER_FILE" 2>/dev/null || echo "0000-00-00")
# Scripts with timestamps after LAST_RUN are pending
```

**Properties:**
- Migrations are opt-in (`./sync --migrate`)
- Each migration is a self-contained script
- Marker file prevents re-running completed migrations

Source: `sync:726-773`

---

## Decision 14: Convenience Symlinks (Reverse Direction) for CC Settings

**Context:**
Claude Code's `settings.json` can't be symlinked due to bugs (atomic writes replace symlinks, permissions not recognized).

**Decision:**
Don't sync `settings.json`. Create a reverse convenience symlink: `dotfiles/claude/settings.json → ~/.claude/settings.json`. Gitignored.

**Rationale:**
- CC owns its settings file at runtime (no symlink bugs)
- Can still edit settings from the dotfiles workspace
- Convenience symlink is gitignored — no accidental commits

**Tracking:** [anthropics/claude-code#3575](https://github.com/anthropics/claude-code/issues/3575), [#764](https://github.com/anthropics/claude-code/issues/764), [#18160](https://github.com/anthropics/claude-code/issues/18160)

Source: `sync:59-67`, [docs/known-limitations.md](docs/known-limitations.md)
