# Neovim Setup Guide

Personal reference for nvim configuration decisions, LazyExtras strategy, and plugin architecture.

## Distribution

**LazyVim** — Folke's opinionated Neovim distribution. Extras are toggled via `:LazyExtras` and persisted in `lazyvim.json`.

Config source: `symlink-roots/config/nvim/`, exposed live at `~/.config/nvim/` through one directory symlink.

## Architecture Decisions

### AI Stack

Two layers, each serving a different purpose:

| Layer | Plugin | What it does |
|-------|--------|-------------|
| **Inline completions** | `ai.copilot-native` | Ghost text as you type + NES (Next Edit Suggestions) — predicts your next edit anywhere in the file. Requires nvim >= 0.12. |
| **Editor ↔ Agent bridge** | `ai.claudecode` | Sends nvim selections/context to a running Claude Code session. Not autocomplete — it's a collaboration bridge. |

**Why not the others:**
- `ai.supermaven` — Cursor acquired Supermaven (Nov 2024). nvim plugin is free but unmaintained (last commit Oct 2024, 70+ open issues). Faster than Copilot but a dead-end.
- `ai.codeium` — Inferior completion quality. Rebranded to Windsurf, focus shifted away from nvim.
- `ai.avante` — Chat panel inside nvim. CC already covers this better from the terminal.
- `ai.tabnine` — Outdated approach, no NES equivalent.
- `ai.copilot` / `ai.copilot-chat` — Legacy Copilot integration. `copilot-native` supersedes both (uses LSP directly instead of copilot.vim shim).

**Note:** `ai.copilot` (legacy) and `ai.copilot-native` are separate extras. Do NOT enable both — `copilot-native` is the replacement. If you see `copilot.lua` loading unexpectedly, check that only `copilot-native` is in `lazyvim.json`.

**Future:** When Copilot improves or alternatives emerge, the decision axis is: context window size × latency × NES quality. Supermaven's 1M token context was its killer feature — watch for Copilot to close that gap.

### File Navigation

Two-tool setup: sidebar for orientation, buffer-editor for manipulation.

| Tool | Role | Binding |
|------|------|---------|
| **snacks.explorer** (default) | Tree sidebar — "where am I?" | `<Space>e` / `<Space>E` |
| **mini.files** (`editor.mini-files`) | Miller-columns buffer editor — "let me do stuff" | (see keymaps) |

**Why not the others:**
- `editor.neo-tree` — More powerful than snacks.explorer (git staging, buffer mgmt from tree) but heavier. Switch to this if snacks.explorer feels too limited.
- oil.nvim — Strongest community enthusiasm for buffer-as-filesystem, but no LazyVim extra. mini.files covers the same niche with first-class LazyVim support.
- yazi.nvim — Great if you want a full TUI file manager (image previews, Yazi plugin ecosystem). Requires external `yazi` binary (installed via Brewfile). Consider adding if mini.files feels insufficient.

### Completion

**blink.cmp** — LazyVim's default completion engine (replaced nvim-cmp). Already configured.

Cmdline note: `<CR>` in cmdline should `select_and_accept` + `fallback` so pressing Enter auto-completes the first match instead of submitting literal text. See `plugins/blink-cmp.lua`.

## Enabled LazyExtras

Reference for what's on and why. Update this when toggling extras.

### Core (always on)
- `test.core` — test runner integration
- `util.dot` — syntax for dotfile-oriented formats

### AI
- `ai.copilot-native` — inline completions + NES (requires nvim >= 0.12)
- `ai.claudecode` — CC ↔ nvim bridge
- `ai.sidekick` — Folke's NES viewer with rich diffs + AI terminal

### Languages
- `lang.typescript` — vtsls LSP, inlay hints, organize imports, go-to-source-definition
- `lang.json` — SchemaStore validation for package.json, tsconfig.json, etc.
- `lang.yaml` — Schema validation for GH Actions, docker-compose, etc.
- `lang.markdown` — Treesitter, concealing, render-markdown.nvim
- `lang.docker` — Dockerfile + docker-compose LSP
- `lang.git` — Treesitter for gitcommit, gitrebase, gitignore
- `lang.toml` — Taplo LSP for starship.toml, Cargo.toml, etc.
- `lang.sql` — SQL highlighting + completion (PlanetScale/Prisma workflow)
- `lang.prisma` — Prisma schema LSP (if actively writing .prisma files)

### Coding
- `coding.yanky` — Yank history ring, better paste cycling
- `coding.mini-surround` — `sa`/`sd`/`sr` for surrounding chars (JSX/HTML)

### Editor
- `editor.dial` — Increment/decrement dates, booleans, semver with `<C-a>`/`<C-x>`
- `editor.inc-rename` — Inline rename preview (live reference updates)
- `editor.mini-files` — Miller-columns file browser

### Linting & Formatting

Uses **oxlint** + **oxfmt** (not ESLint/Prettier). Configured outside LazyExtras.

### UI
- `ui.indent-blankline` — Visual indent guides with scope highlighting
- `ui.treesitter-context` — Sticky function/class header at top of screen

### Utilities
- `util.mini-hipatterns` — Inline color swatches for hex codes, TODO/FIXME highlights

## Skip List

Extras explicitly evaluated and rejected. Don't re-evaluate unless the landscape changes.

| Extra | Reason | Revisit when |
|-------|--------|-------------|
| `ai.supermaven` | Unmaintained (Cursor acquisition) | Never — project is dead |
| `ai.codeium` | Inferior quality, Windsurf rebrand | Never |
| `ai.avante` | CC is a better chat interface | If CC stops being primary tool |
| `ai.tabnine` | Outdated | Never |
| `ai.copilot` | Superseded by copilot-native | Never |
| `ai.copilot-chat` | Superseded by copilot-native | Never |
| `coding.blink` | Already default in LazyVim | N/A |
| `coding.nvim-cmp` | Replaced by blink.cmp | Never |
| `editor.neo-tree` | snacks.explorer + mini.files covers this | If snacks.explorer feels too limited |
| `editor.telescope` | snacks.picker is default | Never |
| `linting.eslint` | Using oxlint instead | If switching back to ESLint |
| `formatting.prettier` | Using oxfmt instead | If switching back to Prettier |
| `formatting.biome` | Using oxlint/oxfmt | If migrating to Biome |
| `formatting.black` | Python formatter — not a Python dev | Never |
| `ui.mini-animate` | Distracting animations | Never |
| `ui.smear-cursor` | Gimmicky cursor trail | Never |

## Neovim Version

Running **nvim 0.12 nightly** (HEAD) via `brew install --HEAD neovim`.

When 0.12 stable releases (~March 14, 2026):
```sh
brew uninstall neovim && brew install neovim
```

The stable 0.11.6 is still installed but unlinked. To revert:
```sh
brew unlink neovim  # unlink HEAD
brew link neovim    # re-link 0.11.6
```

## Plugin Config Files

Custom overrides live in `symlink-roots/config/nvim/lua/plugins/`:
- `blink-cmp.lua` — Completion keymaps, cmdline blocklist, cmdline CR behavior
- `colorscheme.lua` — Theme
- `editor.lua` — Telescope layout, mini.statusline (replaced lualine)
- `lang.lua` — Language-specific overrides
- `lua.lua` — Lua tooling glue (`lazydev`, `selene`, Mason ensure list)
- `lsp.lua` — LSP config overrides
- `cmux-nav.lua` — Pane navigation and resize (hjkl across cmux boundaries)
- `snacks.lua` — Dashboard, picker, project config
- `unnest.lua` — Unnest plugin
- `zen-mode.lua` — Zen mode

See also: [docs/lua-tooling.md](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/docs/lua-tooling.md) for the dedicated Lua toolchain guide.
