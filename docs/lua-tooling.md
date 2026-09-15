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

Machine-managed installs live in [scripts/data/Brewfile](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/scripts/data/Brewfile). Neovim-managed installs are ensured through [lua.lua](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/.config/nvim/lua/plugins/lua.lua).

## Files

| File | Purpose |
|------|---------|
| [lua.lua](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/.config/nvim/lua/plugins/lua.lua) | Lua-specific Neovim tooling glue |
| [.luarc.json](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/.luarc.json) | Repo-owned LuaLS policy for Neovim and shell checks |
| [selene.toml](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/selene.toml) | Selene lint policy |
| [selene.nvim.yml](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/selene.nvim.yml) | Selene stdlib/global definitions for Neovim-style Lua |
| [stylua.toml](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/.config/nvim/stylua.toml) | StyLua formatting rules |

## What `selene.nvim.yml` Is

`selene.nvim.yml` is a Selene standard library definition, not a Neovim config file.

Selene is a linter. By default it does not know that globals like `vim`, `Snacks`, or `LazyVim` are legitimate in this repo. [selene.nvim.yml](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/selene.nvim.yml) declares those globals so Neovim plugin/config code is linted accurately instead of being drowned in false positives.

Without it, Neovim Lua code would look much noisier to the linter than it actually is.

The old `vim.yml` and `nvim.yml` names were technically valid but still too ambiguous for humans. `selene.nvim.yml` makes the tool ownership explicit.

## What `lua/plugins/lua.lua` Does

[lua.lua](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/.config/nvim/lua/plugins/lua.lua) is a small Lua-tooling overlay on top of LazyVim defaults.

This is the idiomatic extension point here. The installed LazyVim tree already ships core `lazydev.nvim` and `lua_ls` defaults, but it does not ship an `extras/lang/lua.lua` extra. So the repo-level `plugins/lua.lua` file is extending the existing Lua stack, not replacing some missing standard plugin.

It does three things:

1. Extends `lazydev.nvim` so the local `cmux-nav` plugin and the `cmdux` checkout are part of Lua editor intelligence.
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
- `lazydev.nvim` improves library/type resolution for Neovim plugin code.
- Agents can run the exact same formatter and linter in the shell.

What is intentionally relaxed right now in [selene.toml](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/selene.toml):

- `mixed_table = "allow"`

Why:

- `mixed_table` is common enough in Neovim/plugin-style Lua that banning it immediately would create low-signal churn.

Important distinction: Lua does not become truly type-safe here. The closest equivalent is:

- disciplined EmmyLua annotations
- good LuaLS settings
- repo-owned linting
- keeping the warning surface at zero

Those relaxations were re-tested again on March 6, 2026 after the Lua QA/typing pass:

- Re-enabling `multiple_statements` produced 0 Selene findings, so that relaxation was removed.
- Re-enabling `mixed_table` still produced 34 warnings across normal Lazy.nvim plugin specs and keymap-style tables, including files like `plugins/editor.lua`, `plugins/lang.lua`, and `plugins/cmux-nav.lua`.

So the current posture is intentional, not stale:

- `multiple_statements` is back on
- `mixed_table` stays relaxed because the current signal is still poor for this codebase shape

The stricter move that did land is not "more Selene noise". It is a repo-owned LuaLS config plus a native LuaLS check workflow.

## Annotation Standard

Use LuaLS annotations to make real shapes explicit, not to wallpaper over unclear code.

- Reuse shared contracts when they already exist instead of inventing duplicate local schemas.
- Add local `---@class` and `---@alias` blocks for file-local boundary shapes and string unions.
- Add `---@param` and `---@return` on helpers when LuaLS inference is weak or the function boundary is non-obvious.
- Prefer narrow concrete shapes over `table` and avoid `any` unless the boundary is truly dynamic and cannot be modeled cleanly.
- In plugin-spec files, keep annotations lightweight and local. Annotate the returned table or callback shape; do not invent a fake repo-local schema for all of Lazy.nvim just to satisfy one file.

## Agent Workflow

Agents should not rely on Neovim UI state to judge Lua quality. They should run the actual tools.

Primary commands:

```sh
just lua-ci
just lua-check
just lua-check-staged
just lua-fmt
just file-ops-test
just hooks-install
```

Expected workflow:

1. Run `just lua-ci` when working from a branch or CI-style diff and you want automatic skipping for non-Lua work.
2. Run `just lua-check` when you want the full Lua gate regardless of diff detection.
3. If formatting drift is the only failure, run `just lua-fmt`.
4. Patch code to resolve Selene or LuaLS findings.
5. Re-run the relevant Lua gate until clean.

`just lua-check` currently runs:

- `selene`
- `lua-language-server --check . --configpath .luarc.json --checklevel=Warning`
- `stylua --check`

`just lua-ci` is the path-aware wrapper:

- It exits cleanly when the current change set has no Lua or Lua-tooling changes.
- It runs `just lua-check` for Lua-relevant changes.
- It runs a local plugin's tests (`just cmux-nav-test`, `just file-ops-test`) only when the change set touches that plugin.

For local commits, `just hooks-install` installs a staged-only pre-commit hook. That hook checks only staged Lua blobs from:

- `home/.config/nvim/lua`
- `home/.config/nvim/local-plugins/file-ops`

This keeps existing unrelated repo issues from blocking a commit.

For editor-state debugging, a headless Neovim check can confirm runtime wiring:

```sh
nvim --headless '+lua local lint=require("lint"); print(vim.inspect(lint.linters_by_ft.lua))' +qa
```

## LSP Coverage

### Neovim

Yes. Neovim has Lua LSP support on.

- LazyVim already provides good `lua_ls` defaults.
- [lua.lua](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/.config/nvim/lua/plugins/lua.lua) adds the missing Lua-specific glue.

### Codex and Claude Code

Neither agent has a Lua language server configured for this repo. Both rely on:

- repo instructions in [AGENTS.md](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/AGENTS.md), [codex/AGENTS.md](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/codex/AGENTS.md) and [.claude/CLAUDE.md](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/.claude/CLAUDE.md)
- the repo-owned LuaLS policy in [.luarc.json](/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/.luarc.json)
- `just lua-check` as the canonical Lua gate and `just lua-fmt` as the canonical formatter

## Rules of Thumb

- For Neovim Lua, treat `lua_ls + lazydev + selene + stylua` as the real stack.
- For agent workflows, treat `just lua-check` as the required Lua gate.
- Prefer explicit annotations over clever table-shape inference.
- Keep lint output actionable; avoid enabling rules that produce constant stylistic spam.
- Run repo-owned CLI checks before declaring Lua work done.
- If a tool produces noise, either configure it properly or remove it. Half-working Lua tooling is worse than no tooling.
