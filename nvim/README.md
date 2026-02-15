# Neovim (LazyVim)

## Architecture

```
nvim (binary, installed via Homebrew)
 └── lazy.nvim (plugin manager, self-bootstraps on first launch)
      └── LazyVim (curated plugin distribution, ~50 plugins)
           └── lua/plugins/*.lua (our overrides)
```

LazyVim is not a separate binary. It's a Lua plugin that configures Neovim as a full IDE. Everything runs inside the same `nvim` you already have.

## File Layout

```
nvim/
├── init.lua                    # Entry point, just loads config.lazy
├── lazy-lock.json              # Pinned plugin versions (committed, reproducible)
├── lua/
│   ├── config/
│   │   ├── lazy.lua            # Plugin manager setup + LazyVim extras
│   │   ├── options.lua         # Editor settings (clipboard, UI, search)
│   │   ├── keymaps.lua         # Custom keybindings (overrides LazyVim defaults)
│   │   └── autocmds.lua        # Auto-save on focus lost
│   └── plugins/
│       ├── colorscheme.lua     # tokyonight-night
│       ├── zen-mode.lua        # Zen mode + twilight
│       ├── lang.lua            # Deno LSP, extra treesitter parsers, mason tools
│       └── editor.lua          # Telescope layout, statusline (mini.statusline)
├── .neoconf.json               # LSP settings for editing this config
└── stylua.toml                 # Lua formatter config
```

### Where things go

| Change | File |
|---|---|
| Editor options (line numbers, clipboard, etc) | `lua/config/options.lua` |
| Keybindings | `lua/config/keymaps.lua` |
| Autocommands | `lua/config/autocmds.lua` |
| New plugin | New file in `lua/plugins/` (auto-loaded) |
| Override a LazyVim plugin | Same plugin name in any `lua/plugins/` file |
| Enable a LazyVim extra | `{ import = "lazyvim.plugins.extras.<cat>.<name>" }` in `lua/config/lazy.lua` |
| Disable a plugin | `{ "author/plugin", enabled = false }` in any `lua/plugins/` file |
| Language support | LSP/treesitter/formatter config in `lua/plugins/lang.lua` |

## Data Locations

| Path | What | Synced? |
|---|---|---|
| `~/.config/nvim` | Config (symlink → dotfiles/nvim) | Yes |
| `~/.local/share/nvim/lazy/` | Downloaded plugins | No, regenerated |
| `~/.local/share/nvim/mason/` | LSP servers, formatters, linters | No, regenerated |
| `~/.local/state/nvim/` | Undo history, shada, logs | No |
| `~/.cache/nvim/` | Treesitter compiled parsers | No |

Only `~/.config/nvim` is synced. Everything else regenerates from `lazy-lock.json` and plugin config.

## Custom Keybindings

These override LazyVim defaults to preserve muscle memory:

| Key | Action | What it replaced |
|---|---|---|
| `H` / `L` | Line start / end | LazyVim buffer nav (use `[b`/`]b` instead) |
| `J` / `K` | Half-page down / up | Join lines (use `gJ`), hover docs (use `gh`) |
| `w` | Bracket match (`%`) | Word motion (use `e`, `b`, `W`) |
| `U` | Redo | — |
| `kj` | Escape (insert/cmd mode) | — |
| `!` | External command | — |
| `<space>` | Leader | — |
| `,` | Local leader (filetype bindings) | — |

## Language Support

Configured via LazyVim extras in `lua/config/lazy.lua`:

- **TypeScript** — vtsls + prettier + eslint
- **Deno** — denols (activates only when `deno.json` exists, no conflict with TypeScript)
- **Go** — gopls + gofumpt + goimports + delve
- **Rust** — rust-analyzer + codelldb
- **Markdown** — markdownlint + markdown-toc + preview
- **JSON/YAML/TOML** — schema-aware LSP + treesitter

## Statusline (mini.statusline)

LazyVim's default lualine is disabled. We use [mini.statusline](https://github.com/nvim-mini/mini.statusline) — flat, minimal, fast.

```
 MODE │ git branch  +1 ~2 -0  E1 W0 │ filename │ filetype  line│total│col
```

- **Colors** — tokyonight sets `MiniStatuslineMode*` highlight groups automatically
- **Git/diff** — from gitsigns (included by LazyVim)
- **Icons** — from nvim-web-devicons (included by LazyVim)
- **Responsive** — sections auto-hide when the window narrows

Config is in `lua/plugins/editor.lua`. See [Customizing the statusline](#customizing-the-statusline) below.

---

## Plugin Management

All plugin management happens through lazy.nvim's UI. Open it with `:Lazy` or `<leader>l` from the dashboard.

### Day-to-day commands

| Command | What it does |
|---|---|
| `:Lazy` | Open the plugin manager UI |
| `:Lazy sync` | Update all plugins to latest + regenerate lock file |
| `:Lazy check` | Check for available updates (no install) |
| `:Lazy clean` | Remove plugins that are no longer in config |
| `:Lazy health` | Check lazy.nvim health |
| `:Lazy profile` | Startup profiling (which plugins are slow) |
| `:Lazy restore` | Restore plugins to versions in `lazy-lock.json` |

### Update workflow

```
:Lazy sync         → updates all plugins, writes lazy-lock.json
                   → test that everything works
                   → commit lazy-lock.json to dotfiles
```

On another machine: `git pull` then `:Lazy restore` pins to the exact same versions.

### Add a plugin

Create or edit a file in `lua/plugins/`. Example — adding vim-surround:

```lua
-- lua/plugins/surround.lua
return {
  {
    "kylechui/nvim-surround",
    event = "VeryLazy",
    opts = {},
  },
}
```

Every `.lua` file in `lua/plugins/` is auto-loaded. One plugin per file or group related ones — your call.

### Plugin spec patterns

```lua
-- Basic: just install it
{ "author/plugin" }

-- With config
{ "author/plugin", opts = { some_option = true } }

-- Lazy-load on event (faster startup)
{ "author/plugin", event = "VeryLazy" }
{ "author/plugin", event = { "BufReadPost", "BufNewFile" } }

-- Lazy-load on keymap
{ "author/plugin", keys = { { "<leader>t", "<cmd>DoThing<cr>", desc = "Do thing" } } }

-- Lazy-load on command
{ "author/plugin", cmd = "SomeCommand" }

-- Lazy-load on filetype
{ "author/plugin", ft = { "go", "rust" } }

-- Override a LazyVim plugin's options
{ "existing/plugin", opts = { new_option = true } }

-- Override with a function (when you need access to existing opts)
{ "existing/plugin", opts = function(_, opts)
    opts.some_list = vim.list_extend(opts.some_list, { "new_item" })
  end,
}

-- Disable a LazyVim plugin
{ "unwanted/plugin", enabled = false }

-- Pin to a specific version
{ "author/plugin", version = "^2.0" }
```

### Remove a plugin

Delete its spec from `lua/plugins/`. Then `:Lazy clean` removes it from disk.

To disable a LazyVim built-in without deleting LazyVim's code:

```lua
{ "author/plugin", enabled = false }
```

## LSP & Mason

Mason auto-installs LSP servers, formatters, and linters. You rarely interact with it directly.

| Command | What |
|---|---|
| `:Mason` | Open Mason UI — see installed tools, install new ones |
| `:MasonUpdate` | Update all installed Mason packages |
| `:LspInfo` | Show LSP servers attached to current buffer |
| `:LspLog` | LSP debug log (for troubleshooting) |

### Add a new language

1. Check if LazyVim has an extra: `:LazyExtras` lists all available
2. If yes — add `{ import = "lazyvim.plugins.extras.lang.<name>" }` to `lua/config/lazy.lua`
3. If no — add LSP/formatter/linter config to `lua/plugins/lang.lua`:

```lua
-- Example: adding Python support manually
{
  "neovim/nvim-lspconfig",
  opts = {
    servers = {
      pyright = {},
    },
  },
},
```

Mason auto-installs the server on first use. You can also install manually via `:Mason`.

### LazyVim extras

Extras are pre-configured bundles (LSP + treesitter + formatter + linter for a language). Browse available ones:

```
:LazyExtras
```

Currently enabled (in `lua/config/lazy.lua`):

- `lang.typescript`, `lang.go`, `lang.rust`, `lang.json`, `lang.yaml`, `lang.toml`, `lang.markdown`
- `dap.core` (debugger), `formatting.prettier`, `linting.eslint`, `ai.copilot`

## Treesitter

Treesitter handles syntax highlighting and text objects. Parsers install automatically when you open a file of that type.

| Command | What |
|---|---|
| `:TSInstall <lang>` | Manually install a parser |
| `:TSUpdate` | Update all installed parsers |
| `:TSInstallInfo` | List all parsers and their status |
| `:InspectTree` | Show the syntax tree for current buffer |

Extra parsers are configured in `lua/plugins/lang.lua` via `ensure_installed`.

## Telescope (Fuzzy Finder)

| Key | What |
|---|---|
| `<leader>ff` | Find files |
| `<leader>fg` | Live grep (search content) |
| `<leader>fb` | Buffers |
| `<leader>fr` | Recent files |
| `<leader>fs` | LSP symbols (current file) |
| `<leader>fS` | LSP symbols (workspace) |
| `<leader>fc` | Find in config files |
| `<leader>f"` | Registers |
| `<leader>sa` | Auto commands |
| `<leader>sk` | Keymaps |
| `<leader>sh` | Help tags |

Inside telescope: `<C-j>`/`<C-k>` to navigate, `<CR>` to select, `<Esc>` to close.

## Debugging (DAP)

| Key | What |
|---|---|
| `<leader>db` | Toggle breakpoint |
| `<leader>dB` | Breakpoint with condition |
| `<leader>dc` | Continue / start |
| `<leader>dC` | Run to cursor |
| `<leader>di` | Step into |
| `<leader>do` | Step over |
| `<leader>dO` | Step out |
| `<leader>dt` | Terminate |
| `<leader>du` | Toggle DAP UI |

Debug adapters are installed via Mason. Go (delve) and Rust (codelldb) are pre-configured by their LazyVim extras.

## Git

| Key | What |
|---|---|
| `<leader>gg` | Open lazygit |
| `<leader>gf` | File history |
| `<leader>gl` | Git log |
| `<leader>gb` | Blame line |
| `]h` / `[h` | Next / prev hunk |
| `<leader>ghs` | Stage hunk |
| `<leader>ghr` | Reset hunk |
| `<leader>ghp` | Preview hunk |

## Customizing the Statusline

The default content works well. To customize, override `content.active` in `lua/plugins/editor.lua`:

```lua
require("mini.statusline").setup({
  content = {
    active = function()
      local mode, mode_hl = MiniStatusline.section_mode({ trunc_width = 120 })
      local git = MiniStatusline.section_git({ trunc_width = 40 })
      local diagnostics = MiniStatusline.section_diagnostics({ trunc_width = 75 })
      local filename = MiniStatusline.section_filename({ trunc_width = 140 })
      local fileinfo = MiniStatusline.section_fileinfo({ trunc_width = 120 })
      local location = MiniStatusline.section_location({ trunc_width = 75 })

      return MiniStatusline.combine_groups({
        { hl = mode_hl, strings = { mode } },
        { hl = "MiniStatuslineDevinfo", strings = { git, diagnostics } },
        "%<", -- truncation point
        { hl = "MiniStatuslineFilename", strings = { filename } },
        "%=", -- right-align boundary
        { hl = "MiniStatuslineFileinfo", strings = { fileinfo } },
        { hl = mode_hl, strings = { location } },
      })
    end,
  },
})
```

Available sections: `section_mode`, `section_git`, `section_diff`, `section_diagnostics`, `section_lsp`, `section_filename`, `section_fileinfo`, `section_location`, `section_searchcount`. Each takes `{ trunc_width = N }` — the window width below which the section hides or shortens.

Colors come from highlight groups set by tokyonight: `MiniStatuslineModeNormal`, `ModeInsert`, `ModeVisual`, `ModeReplace`, `ModeCommand`, `Devinfo`, `Filename`, `Fileinfo`, `Inactive`. Override in a `ColorScheme` autocmd if needed.

## Diagnostics & Troubleshooting

| Command | What |
|---|---|
| `:checkhealth` | Full health check (LSP, treesitter, plugins) |
| `:messages` | Recent nvim messages (errors, warnings) |
| `:Lazy health` | Plugin manager health |
| `:LspInfo` | LSP servers for current buffer |
| `:LspLog` | LSP debug log |
| `:Mason` | Mason tool status |

### Reset everything

```bash
rm -rf ~/.local/share/nvim ~/.local/state/nvim ~/.cache/nvim
nvim  # rebuilds from lazy-lock.json
```

### Startup profiling

```
:Lazy profile
```

Shows load time per plugin. Target: under 100ms total.

## New Machine Setup

```bash
git clone <dotfiles-repo>
./sync              # symlinks nvim/ → ~/.config/nvim
nvim                # first launch: installs plugins (~60s), then ready
```

`lazy-lock.json` ensures identical plugin versions. Mason tools auto-install on first open of a relevant file type.
