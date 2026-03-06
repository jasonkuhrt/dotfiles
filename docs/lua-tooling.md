# Lua Tooling Guide

Personal reference for the Lua toolchain in this repo: what is installed, how Neovim uses it, how strict the current checks are, and how agents should work with Lua code.

## Stack

| Tool | Role | Why it exists |
|------|------|---------------|
| `lua` | Reference runtime | Run plain Lua scripts outside Neovim |
| `luajit` | JIT runtime | Matches Neovim's embedded Lua runtime more closely |
| `luarocks` | Package manager | Install Lua libraries outside plugin managers if needed |
| `lua-language-server` | LSP server (`lua_ls`) | Completions, type inference, diagnostics, go-to-definition |
| `lazydev.nvim` | Neovim Lua library glue | Teaches LuaLS about Neovim, LazyVim, Snacks, and local plugin code |
| `selene` | Linter | Repo-owned static analysis for Lua |
| `stylua` | Formatter | Canonical formatting for Lua |

Machine-managed installs live in [home/Brewfile](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/Brewfile). Neovim-managed installs are ensured through [home/dot_config/nvim/lua/plugins/lua.lua](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/dot_config/nvim/lua/plugins/lua.lua).

## Files

| File | Purpose |
|------|---------|
| [home/dot_config/nvim/lua/plugins/lua.lua](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/dot_config/nvim/lua/plugins/lua.lua) | Lua-specific Neovim tooling glue |
| [selene.toml](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/selene.toml) | Selene lint policy |
| [vim.yml](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/vim.yml) | Selene stdlib/global definitions for Neovim-style Lua |
| [home/dot_config/nvim/stylua.toml](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/dot_config/nvim/stylua.toml) | StyLua formatting rules |
| [home/dot_config/nvim/dot_neoconf.json](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/dot_config/nvim/dot_neoconf.json) | Enables Lua library support for Neovim config work |

## What `vim.yml` Is

`vim.yml` is a Selene standard library definition, not a Neovim config file.

Selene is a linter. By default it does not know that globals like `vim`, `Snacks`, or `LazyVim` are legitimate in this repo. [vim.yml](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/vim.yml) declares those globals so Neovim plugin/config code is linted accurately instead of being drowned in false positives.

Without it, Neovim Lua code would look much noisier to the linter than it actually is.

## What `lua/plugins/lua.lua` Does

[home/dot_config/nvim/lua/plugins/lua.lua](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/dot_config/nvim/lua/plugins/lua.lua) is a small Lua-tooling overlay on top of LazyVim defaults.

It does three things:

1. Extends `lazydev.nvim` so local plugin code under `local-plugins/cmd-ux` is part of Lua editor intelligence.
2. Wires `selene` into `nvim-lint` for `lua` buffers when a `selene.toml` exists in the project.
3. Ensures `lua-language-server`, `selene`, and `stylua` are installed through Mason for Neovim use.

This file exists because the generic `lang.lua` and `lsp.lua` files are the wrong place for Lua-specific toolchain wiring.

## Current Strictness

This setup is strong, but not maximal.

What is strict now:

- Lua files have a real formatter.
- Lua files have a real linter.
- LuaLS is active in Neovim.
- `lazydev.nvim` improves library/type resolution for Neovim plugin code.
- Agents can run the exact same formatter and linter in the shell.

What is intentionally relaxed right now in [selene.toml](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/selene.toml):

- `mixed_table = "allow"`
- `multiple_statements = "allow"`

Why:

- `mixed_table` is common enough in Neovim/plugin-style Lua that banning it immediately would create low-signal churn.
- `multiple_statements` was noisy for normal callback-heavy Neovim code.

Important distinction: Lua does not become truly type-safe here. The closest equivalent is:

- disciplined EmmyLua annotations
- good LuaLS settings
- repo-owned linting
- keeping the warning surface at zero

If the goal is "as strict as practical", the next step is not toggling random lint flags. It is:

1. Fix all current Selene warnings.
2. Keep the tree warning-clean.
3. Add more `---@class`, `---@param`, `---@return`, and `---@type` annotations to domain-heavy modules.
4. Revisit whether the relaxed Selene rules should be tightened after the codebase is clean.

## Current Backlog

There is already a follow-up bead for existing Lua warnings and formatting drift:

- `dotfiles-2goi` — clean up current Selene warnings and StyLua drift

As of the tooling pass that created this guide, Selene reported warnings but no errors.

## Agent Workflow

Agents should not rely on Neovim UI state to judge Lua quality. They should run the actual tools.

Primary commands:

```sh
selene home/dot_config/nvim/lua home/dot_config/nvim/local-plugins/cmd-ux/lua
stylua --check home/dot_config/nvim/lua home/dot_config/nvim/local-plugins/cmd-ux/lua
stylua home/dot_config/nvim/lua home/dot_config/nvim/local-plugins/cmd-ux/lua
```

Expected workflow:

1. Run `selene` to see real warnings/errors.
2. Run `stylua --check` to detect formatting drift.
3. Run `stylua` if formatting should be normalized.
4. Patch code to resolve the lint findings.
5. Re-run both checks until clean.

For editor-state debugging, a headless Neovim check can confirm runtime wiring:

```sh
nvim --headless '+lua local lint=require("lint"); print(vim.inspect(lint.linters_by_ft.lua))' +qa
```

## LSP Coverage

### Neovim

Yes. Neovim has Lua LSP support on.

- [home/dot_config/nvim/dot_neoconf.json](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/dot_config/nvim/dot_neoconf.json) enables LuaLS-related Neovim config support.
- LazyVim already provides good `lua_ls` defaults.
- [home/dot_config/nvim/lua/plugins/lua.lua](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/dot_config/nvim/lua/plugins/lua.lua) adds the missing Lua-specific glue.

### Codex

Not as "Codex directly speaks to LuaLS". The Codex CLI itself does not expose a Lua LSP mode. What Codex does have is Serena configured as MCP in [~/.codex/config.toml](/Users/jasonkuhrt/.codex/config.toml), which gives code-intelligence/navigation tools independent of Neovim.

For Lua quality, Codex should assume:

- shell tools: `selene`, `stylua`, `lua-language-server` are available
- editor-specific LSP state belongs to Neovim
- agent-side code intelligence comes primarily from MCP tools plus direct CLI checks

### Claude Code

Same story. Claude Code is not using your Neovim LuaLS session directly. It does have Serena MCP enabled in [~/.claude/settings.json](/Users/jasonkuhrt/.claude/settings.json), and that is the relevant code-intelligence layer for agent work. It also has a TypeScript LSP plugin enabled, but that is unrelated to Lua.

## Rules of Thumb

- For Neovim Lua, treat `lua_ls + lazydev + selene + stylua` as the real stack.
- Prefer explicit annotations over clever table-shape inference.
- Keep lint output actionable; avoid enabling rules that produce constant stylistic spam.
- Run CLI checks before declaring Lua work done.
- If a tool produces noise, either configure it properly or remove it. Half-working Lua tooling is worse than no tooling.
