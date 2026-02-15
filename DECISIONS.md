# Architecture Decision Records

This document captures the "why" behind major architectural choices in this dotfiles system.

---

## Decision 1: Fish Over Zsh

**Context:**
Zsh is the macOS default and has the largest plugin ecosystem (oh-my-zsh, prezto). Fish has a smaller community but ships with features that zsh requires plugins for.

**Decision:**
Use Fish as the primary shell.

**Rationale:**
- Autosuggestions, syntax highlighting, and completions work out of the box — no plugins needed
- Saner scripting syntax (`test` over `[[ ]]`, no `$()` quoting traps)
- Abbreviations (see Decision 2) are a native feature with no equivalent in zsh
- Web-based configuration (`fish_config`) for colors and bindings
- Trade-off accepted: some scripts assume bash/zsh syntax and need adaptation

**Alternatives Considered:**
1. Zsh + oh-my-zsh — Heavy, slow startup, plugin maintenance overhead
2. Zsh + minimal plugins — Still requires sourcing autosuggestions, highlighting, completions manually
3. Nushell — Too immature for daily driving at time of adoption

---

## Decision 2: Abbreviations Over Aliases for Command Renames

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

---

## Decision 3: Modern Unix Replacements via Abbreviations

**Context:**
Tools like `ls`, `cat`, `grep`, `find` are decades old. Modern replacements are faster, prettier, and more useful — but changing muscle memory is expensive.

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
- Zero relearning cost: type the command you know, get the better version
- Visible expansion teaches you what's actually running

**Trade-offs:**
- Must install all replacement tools (handled by Brewfile)
- Occasional behavior differences from classic tools (e.g., `fd` excludes gitignored files by default)

---

## Decision 4: Custom Sync Script Over Stow/Chezmoi/YADM

**Context:**
Many dotfiles managers exist: GNU Stow (symlink farms), Chezmoi (templating, encryption), YADM (git-based with encryption). All add a layer of abstraction over what is fundamentally "put symlinks in the right places."

**Decision:**
Use a custom `sync` script (bash) with a `sync-lib.sh` library of shared utilities.

**Rationale:**
- The sync script is the documentation — reading it shows exactly what happens
- Can handle non-symlink tasks: Homebrew packages, Fisher plugins, macOS defaults, SSH keys, Dock layout, app-specific plist manipulation (CleanShot X)
- Idempotent by design: every operation checks current state before acting
- Safety: warns on existing real files with content instead of silently overwriting
- Supports migrations (timestamp-based one-time scripts) for existing machines
- No external dependency beyond bash

**Trade-offs:**
- More code to maintain than a declarative tool
- No templating or secrets encryption (secrets handled via `.example` files + gitignore)
- No multi-machine profiles (single-machine setup; new machines get the same config)

**Alternatives Considered:**
1. GNU Stow — Symlinks only; can't handle Homebrew, defaults, or Fisher
2. Chezmoi — Powerful but heavy; templating adds complexity for a single-user setup
3. YADM — Git-based but doesn't handle package installation

---

## Decision 5: Selective File Linking Over Whole-Directory Linking

**Context:**
Some dotfiles systems symlink entire directories (e.g., `~/.config/fish → dotfiles/fish/`). This means every file in the target directory is controlled by the dotfiles repo, including runtime-generated files.

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

---

## Decision 6: fish_plugins as Copy, Not Symlink

**Context:**
Fisher (the Fish plugin manager) both reads and writes `fish_plugins`. If symlinked to the dotfiles repo, Fisher's write operations modify the repo directly, potentially corrupting the file or creating unwanted git changes.

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

---

## Decision 7: pnpm for Node Version Management Over nvm/fnm/asdf

**Context:**
Node version managers are numerous: nvm (slow, bash-centric), fnm (fast, Fish support flaky), asdf (universal but plugin overhead), Volta (fast, no Fish completions), mise (new, promising).

**Decision:**
Use pnpm as both package manager and Node version manager. npm for global CLI tools. Corepack for per-project pnpm/yarn versions.

**Implementation:**
```
Bootstrap: Homebrew → pnpm → node LTS → npm globals → corepack
Runtime:   npm globals (1st) → pnpm node (2nd) → Homebrew (3rd, unused)
```

**Rationale:**
- One fewer tool: pnpm already manages packages, adding `pnpm env use --global lts` replaces a dedicated version manager
- npm globals install to `~/.npm-global` independent of node version — upgrading node doesn't break global tools
- npx checks npm's global dir, so using npm (not pnpm) for globals preserves npx fallback
- Corepack handles per-project pnpm/yarn versions automatically

**Trade-offs:**
- Three-tool dance (pnpm + npm + corepack) is more complex than a single tool
- Can't use `pnpm self-update` (conflicts with Homebrew's version tracking)
- `brew install corepack` conflicts with `brew install pnpm` — must use npm global instead

**Alternatives Considered:**
1. fnm — Fish support broken (see commented-out code in config.fish)
2. nvm — Slow, poor Fish support
3. asdf/mise — Extra abstraction layer for a single language
4. Volta — No Fish completions at time of evaluation

See [docs/node-setup.md](docs/node-setup.md) for the full architecture diagram.

---

## Decision 8: Beads for Task Tracking Over Markdown/TodoWrite

**Context:**
AI coding agents need persistent task tracking that survives context window compaction and session boundaries. Markdown TODO files get lost. Built-in task tools (TodoWrite, TaskCreate) are session-scoped.

**Decision:**
Use beads (`bd`) as the canonical task tracker. Prohibit TodoWrite, TaskCreate, and markdown files for task tracking.

**Rationale:**
- Git-backed: tasks survive compaction, session boundaries, and machine changes
- Dependencies: tasks can block/be-blocked-by other tasks
- Labels: categorical organization (see `.beads/labels.yml`)
- Sync: `bd sync` pushes state to remote
- Agent-friendly: CLI interface works from any AI coding tool

**Trade-offs:**
- External dependency (beads CLI)
- Learning curve for agents (mitigated by AGENTS.md and system prompt instructions)
- More ceremony than a quick TODO comment

---

## Decision 9: Ghostty as Terminal Emulator

**Context:**
Terminal emulator choices on macOS: iTerm2 (feature-rich, Electron-heavy), Alacritty (GPU-accelerated, minimal), Kitty (GPU, scriptable), Warp (AI-native, closed source), Ghostty (GPU, native macOS, open source).

**Decision:**
Use Ghostty as the primary terminal emulator.

**Rationale:**
- Native macOS rendering (not Electron) — fast, low memory
- GPU-accelerated
- Simple config file (no JSON/YAML, just key-value)
- Active development by Mitchell Hashimoto
- Supports font ligatures, true color, undercurl
- Open source

---

## Decision 10: Starship Prompt with tmux-Aware Config

**Context:**
When running inside tmux, the git status bar (via gitmux) already shows branch, status, and ahead/behind. Starship's default prompt duplicates this information.

**Decision:**
Use a minimal Starship config inside tmux sessions, full config outside.

**Implementation:**
```fish
if set -q TMUX
    set -gx STARSHIP_CONFIG ~/.config/starship-tmux.toml
end
starship init fish | source
```

**Rationale:**
- Avoids redundant git info when tmux status bar already shows it
- Keeps the prompt shorter inside tmux (horizontal space is premium with splits)
- Full prompt outside tmux where there's no status bar

---

## Decision 11: Direnv Lazy-Loading

**Context:**
Direnv's Fish hook (`direnv hook fish | source`) runs on every prompt, adding ~130ms to shell startup even when no `.envrc` exists.

**Decision:**
Lazy-load direnv: only activate if `.envrc` exists in the starting directory. Provide `direnv-init` function for manual activation.

**Implementation:**
```fish
function direnv-init --description "Enable direnv for this shell session"
    direnv hook fish | source
    direnv reload 2>/dev/null
end
if test -f .envrc
    direnv-init
end
```

**Rationale:**
- ~130ms saved on every shell startup in directories without `.envrc`
- Manual `direnv-init` available when needed
- Auto-activates if you open a shell in a direnv-managed project

**Trade-off:**
- If you `cd` into a direnv project after shell startup, you must run `direnv-init` manually (or fish `--on-variable PWD` hook could automate this)

---

## Decision 12: Claude Code Hooks for Rule Enforcement

**Context:**
Rules in `CLAUDE.md` and `claude/rules/` are advisory — the AI can ignore or forget them, especially after context compaction. Critical constraints (no branch switching, bun-only for scripts, no builds for QA) need enforcement.

**Decision:**
Use PreToolUse hooks (shell scripts) to enforce critical rules at runtime, blocking tool calls that violate them.

**Implementation:**
- `git-worktree-guard.sh` — blocks `git checkout/switch/stash` in shared worktrees
- Skill script interpreter enforcement — blocks `tsx`/`node` on `.ts` files, blocks `bun` on `.sh` files
- Various other hooks for label taxonomy, close discipline, etc.

**Rationale:**
- Hooks run before the tool executes — violations are prevented, not just detected
- Exit code 2 blocks the action with a message; the agent can adjust
- Rules survive compaction (hooks are loaded from filesystem, not context)
- Debugging pattern: external counter files verify hook execution (see `claude/rules/debugging-hooks.md`)

**Trade-offs:**
- Hooks add latency to every tool call (~5-10ms per hook)
- Debugging hooks is harder than debugging prompt rules (subprocess, no visible stdout)
- Over-reliance on hooks can make the system brittle

---

## Decision 13: Shared Skills Across AI Tools (Claude/Codex/Agents)

**Context:**
Multiple AI coding tools (Claude Code, OpenAI Codex, generic agents) each have their own skills/plugins directory. Maintaining separate copies is error-prone.

**Decision:**
Claude Code skills are the source of truth. Sync them to other tools via symlinks.

**Implementation:**
```bash
# Claude skills are authoritative
link_subdir "$HERE/claude/skills" "$HOME/.claude/skills"

# Mirror to agents (shared neutral tree)
sync_symlink_children_diff "$HERE/claude/skills" "$HERE/agents/skills" "../../claude/skills" ".system"

# Agents tree is then linked to both ~/.agents and ~/.codex
link_subdir "$HERE/agents/skills" "$HOME/.agents/skills"
link_subdir "$HERE/agents/skills" "$HOME/.codex/skills"
```

**Rationale:**
- Single source of truth for skill content
- `.system` directory excluded from sync (Codex-specific system skills preserved)
- Adding a skill to Claude automatically propagates to other tools on next sync

---

## Decision 14: Skills Library-Backed Symlink Architecture (shan)

**Context:**
Skills grew from a handful to 40+. Managing them as direct directories under `~/.claude/skills/` became unwieldy. Some skills are grouped (e.g., `review:gate`, `review:quality`), but Claude Code's autocomplete doesn't discover symlinks to subdirectories of already-symlinked parents.

**Decision:**
Use a skills library (`claude/skills-library/`) as the backing store. Active skills are symlinks from `claude/skills/` pointing into the library. Managed by the `shan` tool.

**Rationale:**
- Skills can be enabled/disabled without deletion (`shan skills on/off`)
- Library provides organization by group without affecting the flat namespace Claude Code expects
- Sub-skills use direct stub directories with one-line redirects (workaround for symlink discovery bug)
- Doctor command validates symlink integrity

**Trade-offs:**
- Extra indirection (skill → symlink → library)
- `shan` tool required for management operations
- Symlink bugs in Claude Code required workarounds (see MEMORY.md)

---

## Decision 15: Migrations for One-Time Cleanup on Existing Machines

**Context:**
The sync script is idempotent — it converges to the desired state. But some changes require destructive one-time actions on existing machines (remove old files, rename directories, fix permissions) that shouldn't run on fresh installs.

**Decision:**
Timestamp-based migration scripts in `migrations/` with a marker file tracking what's been run.

**Implementation:**
```bash
# migrations/2026-01-15-remove-old-fisher-symlink.sh
# Run once, then never again

# Marker tracks last run date
LAST_RUN=$(cat "$MARKER_FILE" 2>/dev/null || echo "0000-00-00")
# Scripts with timestamps after LAST_RUN are pending
```

**Rationale:**
- Sync script stays clean (no one-time conditionals accumulating)
- Migrations are opt-in (`./sync --migrate`)
- Each migration is a self-contained script
- Marker file prevents re-running completed migrations

---

## Decision 16: Effect Library for Bookmarks Package

**Context:**
The bookmarks sync engine needs to handle: YAML parsing, browser plist/JSON reading, three-way diff, error handling, and daemon lifecycle. This is complex enough to benefit from structured error handling and data modeling.

**Decision:**
Use the Effect library (TypeScript) for the bookmarks package.

**Rationale:**
- `Schema` for YAML validation with automatic type inference
- `Data.TaggedEnum` for discriminated unions (patch types)
- Structured errors with `Effect.fail` — no thrown exceptions
- `Duration`-based GC for graveyard management
- Composable pipelines for sync operations

**Trade-offs:**
- Steep learning curve
- Larger dependency footprint than vanilla TypeScript
- Requires dedicated review rules (`effect_review` checks) to maintain quality

---

## Decision 17: Convenience Symlinks (Reverse Direction) for CC Settings

**Context:**
Claude Code's `settings.json` can't be symlinked due to bugs (atomic writes replace symlinks, permissions not recognized). But editing `~/.claude/settings.json` directly is inconvenient when working in the dotfiles repo.

**Decision:**
Don't sync `settings.json`. Create a reverse convenience symlink: `dotfiles/claude/settings.json → ~/.claude/settings.json`. Gitignored.

**Rationale:**
- CC owns its settings file at runtime (no symlink bugs)
- Developers can still edit settings from the dotfiles workspace
- Convenience symlink is gitignored — no accidental commits
- Documented in [docs/known-limitations.md](docs/known-limitations.md)

**Tracking:** [anthropics/claude-code#3575](https://github.com/anthropics/claude-code/issues/3575), [#764](https://github.com/anthropics/claude-code/issues/764), [#18160](https://github.com/anthropics/claude-code/issues/18160)

---

## Decision 18: Serena MCP for Code Exploration

**Context:**
When AI agents explore codebases, they typically use grep/glob to find symbols. This is fragile — it misses indirect references, confuses identically-named symbols across files, and can't distinguish definitions from usage.

**Decision:**
Prefer Serena MCP tools (LSP-backed) for all code exploration. Grep/glob reserved for non-code files or when symbol names are unknown.

**Rationale:**
- `find_symbol` uses LSP — accurate definitions, not text matches
- `find_referencing_symbols` finds actual references, not string occurrences
- `get_symbols_overview` provides file structure without reading entire files
- Token-efficient: read symbol bodies on demand instead of whole files

**Trade-offs:**
- Requires Serena MCP server running
- Not all languages have equal LSP support
- Slower than raw grep for simple text searches
