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
Use pnpm as both package manager and Node version manager, installed the way pnpm documents. npm for
global CLI tools.

**Implementation:**
```
Bootstrap: pnpm standalone installer -> pnpm runtime set node lts -g -> npm globals
Runtime:   ~/.local/bin -> npm globals -> ~/Library/pnpm/bin (pnpm, node) -> Homebrew
```

**Rationale (documented in [docs/node-setup.md](docs/node-setup.md)):**
- pnpm already manages packages; `pnpm runtime set node lts -g` replaces a dedicated version manager
- pnpm 12 is a native executable that needs no Node.js, so installing it has no bootstrap dependency
- npm globals install to `~/.npm-global` independent of node version — changing node doesn't break global tools
- npx checks npm's global dir, so using npm (not pnpm) for globals preserves npx fallback

**Trade-offs:**
- pnpm's node runtimes ship without npm (since pnpm 11), so a fresh machine takes its first npm from
  Homebrew's node, which is why `brew "node"` stays

**History:**
- 2026-09-13 — corepack removed. It owned the `pnpm`, `pnpx`, `yarn` and `yarnpkg` shims in
  `~/.npm-global/bin`, ahead of Homebrew on PATH, so the pnpm in use (12.4.1) came from corepack while
  the Homebrew formula this repo declared sat unused at 11.8.0.
- 2026-09-14 — pnpm moved off Homebrew to its standalone installer; pnpm's installation docs do not
  describe Homebrew at all. `pnpm env use`, deprecated in pnpm 12, became `pnpm runtime set`. The old
  layout had left a `node` symlink at the top of `~/Library/pnpm`, and with that directory on PATH it
  shadowed the runtime shim in `~/Library/pnpm/bin` — invoked through it, `node --version` printed
  pnpm's version. Only `~/Library/pnpm/bin` is on PATH now.
- Earlier, fnm was tried and abandoned — "the official suggestion doesn't work in Fish for some reason"
  ([fnm#356](https://github.com/Schniz/fnm/issues/356#issuecomment-1010816655)).

---

## Decision 9: Native Terminal and Agent Features Over Repo-Owned Glue

**Context:**
A year of accreted helpers duplicated features cmux, Claude Code and Codex now ship themselves. The
glue cost more than it bought: it had to be maintained, it hid upstream behavior, and one piece of it
(the cmux/zmx bridge) actively disabled cmux's own shell integration.

**Decision:**
Use what the tools ship. Write glue only for a capability they genuinely lack, and record the gap here
so it can be dropped when upstream fills it.

**Implementation:**
- Terminal persistence: cmux restores workspaces and resumes agent sessions. The `cmux-zmx-enter`
  bridge, zmx and zsm are gone.
- Navigation: cmux's own shortcuts. The sticky Ctrl+0 Karabiner drive mode, `cmux-mode`, the `cmux-nav`
  Neovim plugin and `cmuxx` are gone.
- Agent fan-out: Claude Code agent teams, enabled with `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS`. The
  `dispatch-claude` skill is gone.
- Browser: cmux intercepts a terminal's `open`. The `plannotator-browser` wrapper and Neovim's
  cmux-specific branch are gone.
- Documentation: the official `cmux*` skills, pinned at the installed version, plus a short `cmux-local`
  note for machine specifics.

**Trade-offs (the gaps that remain):**
- cmux has no pane-resize shortcut, and splits open right or down only.
- Teammates no longer each get a cmux sidebar workspace.
- cmux resumes an agent by typing into the new shell, so prompts must start in insert mode
  ([cmux#12772](https://github.com/manaflow-ai/cmux/issues/12772)).

**History:**
- 2026-09-16 — cutover executed. Ten agent sessions were migrated into native tabs, then a cmux restart
  restored them unattended.

