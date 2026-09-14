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

Source: `config.fish`, "Abbreviations & Aliases"

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
abbr -a dig doggo    # DNS with color
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

Source: `config.fish`, "Modern Unix replacements"

---

## Decision 6: pnpm for Node Version Management

**Decision:**
Use pnpm as both package manager and Node version manager. npm for global CLI tools.

**Implementation:**
```
Bootstrap: Homebrew -> pnpm -> node LTS -> npm globals
Runtime:   ~/.local/bin -> npm globals -> pnpm node -> Homebrew
```

**Rationale (documented in [docs/node-setup.md](docs/node-setup.md)):**
- pnpm already manages packages; `pnpm env use --global lts` replaces a dedicated version manager
- npm globals install to `~/.npm-global` independent of node version — upgrading node doesn't break global tools
- npx checks npm's global dir, so using npm (not pnpm) for globals preserves npx fallback

**Trade-offs:**
- No `pnpm self-update`: pnpm comes from Homebrew, so `brew upgrade pnpm` is the update path

**Corepack removed (2026-09-13):**
Corepack was installed as an npm global to resolve per-project `packageManager` pins. It also owned
the `pnpm`, `pnpx`, `yarn` and `yarnpkg` shims in `~/.npm-global/bin`, which sits ahead of Homebrew
on PATH — so the pnpm actually in use (12.4.1) came from corepack, while the Homebrew formula this
repo declares sat at 11.8.0, unused and invisible. Two owners, and the wrong one was winning.
Uninstalling corepack removed the shims and exposed the gap; `brew upgrade pnpm` closed it.
Homebrew is now the only source of pnpm.

**Prior art:** fnm was tried but abandoned — "the official suggestion doesn't work in Fish for some
reason" ([fnm#356](https://github.com/Schniz/fnm/issues/356#issuecomment-1010816655)). The
commented-out fish block it refers to was deleted in the 2026-09-13 cleanup.

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
