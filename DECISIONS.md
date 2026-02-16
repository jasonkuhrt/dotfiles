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

## Decision 3: chezmoi for Dotfiles Management

**Context:**
Previously used a custom 1,200-line bash sync script with a helper library. This worked but lacked diff-before-apply, encrypted secrets, state tracking, and drift detection.

**Decision:**
Use [chezmoi](https://www.chezmoi.io/) for all dotfiles management. Source state lives in `home/` with chezmoi naming conventions. `.chezmoiroot` redirects chezmoi to use `home/` as its source directory.

**What chezmoi handles:**
- File deployment with symlink→file replacement
- Permissions (private_, executable_ prefixes)
- Encrypted secrets (age, built-in)
- Lifecycle scripts (run_once_, run_onchange_ — replaces sync script sections)
- External repos (.chezmoiexternal.toml — replaces manual git clone)
- Drift detection (chezmoi verify, chezmoi re-add)
- Content-hash triggers for script re-execution

**Properties:**
- Declarative: filename conventions encode intent
- Diff-before-apply: `chezmoi diff` previews all changes
- Idempotent: both file management and scripts check current state

Source: `home/.chezmoi.toml.tmpl`, `home/.chezmoiscripts/`

---

## Decision 4: chezmoi Source State Naming Conventions

**Decision:**
Use chezmoi's filename prefix conventions to declaratively encode deployment behavior. No custom linking logic.

**Implementation:**
```
dot_config/fish/config.fish     → ~/.config/fish/config.fish
exact_skills/                   → ~/.claude/skills/ (removes unmanaged files)
private_dot_ssh/config          → ~/.ssh/config (mode 0700)
encrypted_config.secrets.fish   → age-decrypted on deploy
executable_toggle-chore-files.sh → chmod +x on deploy
```

**Rationale:**
- Intent is visible from the filename — no need to read a script to understand what happens
- `exact_` directories clean up stale files (replaces manual symlink cleanup)
- Directories without `exact_` allow runtime state from external tools (Fisher, LazyVim, etc.)
- `private_` ensures sensitive files get correct permissions automatically

Source: `home/` directory structure

---

## Decision 5: fish_plugins as Regular File with re-add

**Context:**
Fisher both reads and writes `fish_plugins`. The dotfiles source must be authoritative, but Fisher's changes need to be capturable.

**Decision:**
Manage `fish_plugins` as a regular file (not symlinked). Use `chezmoi re-add` to capture Fisher's changes back to source state.

**Workflow:**
```bash
# Fisher modifies ~/.config/fish/fish_plugins at runtime
# Capture changes back to source:
chezmoi re-add ~/.config/fish/fish_plugins
# Or: just re-add ~/.config/fish/fish_plugins

# Same pattern for lazy-lock.json (Lazy.nvim)
chezmoi re-add ~/.config/nvim/lazy-lock.json
```

**Rationale:**
- chezmoi deploys real files, not symlinks — Fisher writes don't touch the repo
- `chezmoi verify` detects drift automatically
- `chezmoi re-add` is the explicit capture step — intentional, not accidental

Source: `home/dot_config/fish/fish_plugins`

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
Claude Code skills are the source of truth. chezmoi deploys skills to `~/.claude/skills/`, then a lifecycle script mirrors them to `~/.agents/skills/` and `~/.codex/skills/` via relative symlinks.

**Implementation:**
- chezmoi `exact_skills/` deploys skill directories to `~/.claude/skills/`
- `run_onchange_after_12-skills-sync.sh.tmpl` creates relative symlinks in agents/codex pointing back to `~/.claude/skills/<name>`
- `.system` directory (Codex system skills) is preserved and excluded from sync

**Properties:**
- Single source of truth for skill content (chezmoi source state)
- `exact_` prefix ensures stale skills are removed from `~/.claude/skills/`
- Adding a skill to `home/dot_claude/exact_skills/` propagates to all tools on next apply

Source: `home/.chezmoiscripts/run_onchange_after_12-skills-sync.sh.tmpl`

---

## Decision 12: Flat Skills in chezmoi (replaces library architecture)

**Context:**
The skills-library symlink architecture (shan-managed, library → symlink → skill) created fragile chains. When any link broke, all skills backed by the library became dead symlinks (66 of them broke simultaneously).

**Decision:**
Flatten all skills into `home/dot_claude/exact_skills/<name>/`. No library indirection. No symlinks. chezmoi IS the state manager.

**Properties:**
- Skills are regular directories, directly editable
- `exact_` prefix ensures stale skills are removed on apply
- No intermediate symlink chains to break
- Version-controlled directly in git (no separate library)
- Skills can still be enabled/disabled by adding/removing from source state

**Migration:**
- 12 working local skills migrated directly
- 66 dead library-backed skills require recovery from Time Machine or rebuilding

Source: `home/dot_claude/exact_skills/`

---

## Decision 13: chezmoi run_once Scripts Replace Migrations

**Context:**
Previously used timestamp-based migration scripts in `migrations/` with a manual marker file and `--migrate` flag.

**Decision:**
Use chezmoi's built-in `run_once_` scripts. chezmoi tracks which scripts have been executed and only runs them once per machine.

**Properties:**
- No marker file needed — chezmoi tracks execution state internally
- No opt-in flag — `run_once_` scripts run automatically on first `chezmoi apply`
- Scripts are content-addressed — renaming or changing content triggers re-execution
- Ordered by filename (numeric prefix: 00, 01, 02...)

**Example:**
```
run_once_before_00-migrate-symlinks.sh.tmpl  # cleanup old infra on first apply
run_once_after_14-neovim-plugins.sh.tmpl     # install plugins on first apply
```

Source: `home/.chezmoiscripts/`

---

## Decision 14: CC settings.json Excluded from chezmoi

**Context:**
Both chezmoi and Claude Code use atomic writes (temp file + `os.Rename()`). Managing `settings.json` via chezmoi would create a race condition where either tool's write could be overwritten.

**Decision:**
Exclude `~/.claude/settings.json` from chezmoi via `.chezmoiignore`. CC owns this file at runtime.

**Rationale:**
- No race condition between chezmoi and CC
- CC's settings are runtime-specific and frequently modified by the tool itself
- `chezmoi edit` is not needed — CC's own settings management is sufficient

**Tracking:** [anthropics/claude-code#3575](https://github.com/anthropics/claude-code/issues/3575), [#764](https://github.com/anthropics/claude-code/issues/764), [#18160](https://github.com/anthropics/claude-code/issues/18160)

Source: `home/.chezmoiignore`

---

## Decision 15: Age Encryption for Secrets

**Context:**
Previously, secrets used `.example` template files. Users copied the template and filled in real values. The real files were gitignored. This meant secrets were never version-controlled and had to be manually recreated on new machines.

**Decision:**
Use age encryption (built into chezmoi) for secrets at rest. Encrypted files are committed to git with the `encrypted_` prefix.

**Implementation:**
```bash
# Encrypt a secret file
chezmoi add --encrypt ~/.config/fish/config.secrets.fish

# Edit an encrypted file (decrypts → edit → re-encrypts)
chezmoi edit ~/.config/fish/config.secrets.fish

# Key stored in password manager, pasted on new machine
~/.config/chezmoi/key.txt
```

**Properties:**
- Secrets are version-controlled (encrypted) — available on `chezmoi apply` on any machine
- age key is the single secret to transfer between machines (via password manager)
- No `.example` files or manual copy steps
- `chezmoi edit --encrypt` handles the decrypt→edit→re-encrypt lifecycle seamlessly

Source: `home/.chezmoi.toml.tmpl` (age config)

---

## Decision 16: Data Files in Source State with chezmoiignore

**Context:**
chezmoi scripts need access to data files (Brewfile, dock/apps.txt, npm/global-packages.txt) for content-hash triggers and installation logic. But these files should NOT be deployed to `$HOME`.

**Decision:**
Place data files inside `home/` (the chezmoi source directory) and list them in `.chezmoiignore` to prevent deployment.

**Implementation:**
```
# In .chezmoiignore:
Brewfile
dock
dock/**
npm
npm/**
```

```bash
# In scripts, use chezmoi's built-in include:
# Brewfile hash: {{ "{{" }} include "Brewfile" | sha256sum {{ "}}" }}
```

**Rationale:**
- `include` only works for files within the source directory — this is the only way to use chezmoi's built-in hash function
- No external process (`shasum`) needed — `sha256sum` is a built-in sprig template function
- Data files are version-controlled alongside the scripts that use them

Source: `home/.chezmoiignore`, `home/Brewfile`
