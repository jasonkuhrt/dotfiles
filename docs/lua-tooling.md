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

Machine-managed installs live in [home/Brewfile](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/Brewfile). Neovim-managed installs are ensured through [lua.lua](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/symlink-roots/config/nvim/lua/plugins/lua.lua).

## Files

| File | Purpose |
|------|---------|
| [lua.lua](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/symlink-roots/config/nvim/lua/plugins/lua.lua) | Lua-specific Neovim tooling glue |
| [.luarc.json](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/.luarc.json) | Repo-owned LuaLS policy for Neovim, Claude/Serena, and shell checks |
| [selene.toml](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/selene.toml) | Selene lint policy |
| [selene.nvim.yml](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/selene.nvim.yml) | Selene stdlib/global definitions for Neovim-style Lua |
| [home/dot_config/nvim/stylua.toml](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/dot_config/nvim/stylua.toml) | StyLua formatting rules |
| [home/dot_config/nvim/dot_neoconf.json](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/dot_config/nvim/dot_neoconf.json) | Enables Lua library support for Neovim config work |
| [.mcp.json](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/.mcp.json) | Project-local Serena MCP entry for Claude Code |
| [.serena/project.yml](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/.serena/project.yml) | Serena language-server configuration, now including Lua via LSP backend |

## What `selene.nvim.yml` Is

`selene.nvim.yml` is a Selene standard library definition, not a Neovim config file.

Selene is a linter. By default it does not know that globals like `vim`, `Snacks`, or `LazyVim` are legitimate in this repo. [selene.nvim.yml](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/selene.nvim.yml) declares those globals so Neovim plugin/config code is linted accurately instead of being drowned in false positives.

Without it, Neovim Lua code would look much noisier to the linter than it actually is.

The old `vim.yml` and `nvim.yml` names were technically valid but still too ambiguous for humans. `selene.nvim.yml` makes the tool ownership explicit.

## What `lua/plugins/lua.lua` Does

[lua.lua](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/symlink-roots/config/nvim/lua/plugins/lua.lua) is a small Lua-tooling overlay on top of LazyVim defaults.

This is the idiomatic extension point here. The installed LazyVim tree already ships core `lazydev.nvim` and `lua_ls` defaults, but it does not ship an `extras/lang/lua.lua` extra. So the repo-level `plugins/lua.lua` file is extending the existing Lua stack, not replacing some missing standard plugin.

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
- Lua files have a repo-owned LuaLS policy in [.luarc.json](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/.luarc.json).
- LuaLS is active in Neovim.
- Claude Code can start a project-local Serena server for this repo, and Serena is configured to start Lua via the LSP backend.
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

Those relaxations were re-tested after the cleanup pass that introduced this guide. Turning them back on immediately produced a large amount of low-signal churn across normal Lazy.nvim spec tables and callback literals, so they remain intentionally relaxed for now.

The stricter move that did land is not "more Selene noise". It is a repo-owned LuaLS config plus a native LuaLS check workflow.

## Agent Workflow

Agents should not rely on Neovim UI state to judge Lua quality. They should run the actual tools.

Primary commands:

```sh
just lua-check
just lua-check-staged
just lua-fmt
just hooks-install
```

Expected workflow:

1. Run `just lua-check`.
2. If formatting drift is the only failure, run `just lua-fmt`.
3. Patch code to resolve Selene or LuaLS findings.
4. Re-run `just lua-check` until clean.

`just lua-check` currently runs:

- `selene`
- `lua-language-server --check . --configpath .luarc.json --checklevel=Warning`
- `stylua --check`

For local commits, `just hooks-install` installs a staged-only pre-commit hook. That hook checks only staged Lua blobs from:

- `symlink-roots/config/nvim/lua`
- `home/dot_config/nvim/local-plugins/cmd-ux/lua`

This keeps existing unrelated repo issues from blocking a commit.

For editor-state debugging, a headless Neovim check can confirm runtime wiring:

```sh
nvim --headless '+lua local lint=require("lint"); print(vim.inspect(lint.linters_by_ft.lua))' +qa
```

## LSP Coverage

### Neovim

Yes. Neovim has Lua LSP support on.

- [home/dot_config/nvim/dot_neoconf.json](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/dot_config/nvim/dot_neoconf.json) enables LuaLS-related Neovim config support.
- LazyVim already provides good `lua_ls` defaults.
- [lua.lua](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/symlink-roots/config/nvim/lua/plugins/lua.lua) adds the missing Lua-specific glue.

### Codex

Codex still does not have a repo-local, first-class LuaLS toggle surfaced in this project the way Claude Code does. What it does have is:

- repo instructions in [AGENTS.md](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/AGENTS.md) and [codex/AGENTS.md](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/codex/AGENTS.md)
- a repo-owned LuaLS config in [.luarc.json](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/.luarc.json)
- global Serena MCP configured in [~/.codex/config.toml](/Users/jasonkuhrt/.codex/config.toml)

For Lua quality, Codex should assume:

- `just lua-check` is the canonical Lua gate
- `just lua-fmt` is the canonical Lua formatter
- MCP/Serena plus direct CLI checks are the practical agent path unless Codex exposes a stronger project-local LSP hook in a future release

### Claude Code

Claude Code is now configured for this repo to use a project-local Serena server:

- [.mcp.json](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/.mcp.json) defines the `serena` MCP server
- [.claude/settings.json](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/.claude/settings.json) enables project MCP servers
- [.serena/project.yml](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/.serena/project.yml) now includes `lua` and pins the backend to `LSP`
- [.luarc.json](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/.luarc.json) gives LuaLS a repo-owned policy to read

So for Claude Code in this repo, Lua is no longer just "Neovim has LuaLS". There is now a project-local Serena + LuaLS path plus the shell-based `just lua-check` fallback.

## Rules of Thumb

- For Neovim Lua, treat `lua_ls + lazydev + selene + stylua` as the real stack.
- For agent workflows, treat `just lua-check` as the required Lua gate.
- Prefer explicit annotations over clever table-shape inference.
- Keep lint output actionable; avoid enabling rules that produce constant stylistic spam.
- Run repo-owned CLI checks before declaring Lua work done.
- If a tool produces noise, either configure it properly or remove it. Half-working Lua tooling is worse than no tooling.
