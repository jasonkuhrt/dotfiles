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

## Decision 8: Starship Prompt with zmx Session Context

**Context:**
The shell now uses zmx for session persistence. Session identity should be visible in prompt without maintaining multiple Starship configs.

**Decision:**
Use one Starship config and render `ZMX_SESSION` in the prompt when present.

**Implementation:**
```toml
format = """
${env_var.ZMX_SESSION}\
$directory\
$git_branch\
$git_status\
$character"""

[env_var.ZMX_SESSION]
symbol = " "
format = "[$symbol$env_value]($style) "
style = "bold #7dcfff"
```

Source: `starship.toml`

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
