# LuaLS Annotation First Slice

## Goal

Tighten LuaLS coverage in the remaining untyped Neovim entrypoints without duplicating the deeper `cmd-ux` contract work already tracked elsewhere.

This is the first practical slice of "use LuaLS annotations aggressively." Most of `cmd-ux` already has substantial type coverage, so the highest-value remaining work is the small set of untyped entrypoints and helper modules that still rely on inference alone.

## Related Beads

- `dotfiles-cxjs` already tracks deeper `cmd-ux` adapter/public API contracts. Do not broaden this slice into repo-wide provider typing.
- `dotfiles-2goi` tracks pre-existing Selene/Stylua cleanup. Keep this slice compatible with that work, but it is not a hard blocker.

## Scope

Primary files:

- `home/.config/nvim/local-plugins/cmd-ux/lua/cmd_ux/adapters/ex.lua`
- `home/.config/nvim/lua/config/image_open.lua`
- `home/.config/nvim/lua/config/link_open.lua`
- `home/.config/nvim/lua/plugins/cmd-ux.lua`
- `home/.config/nvim/lua/plugins/link-open.lua`

Optional stretch if the core files land cleanly:

- `home/.config/nvim/lua/plugins/colorscheme.lua`

## Exact Symbols

`cmd_ux/adapters/ex.lua`

- `feed`
- `apply_action`
- `handle`
- `M.handle_enter`
- `M.handle_tab`
- `M.handle_space`
- `M.handoff_to_picker`
- `M.open_cmdline`

`config/image_open.lua`

- `get_terminal_viewer`
- `open_in_cmux`
- `open_in_nvim_terminal`
- `open_in_preview`
- `M.open_image`
- `M.setup`

`config/link_open.lua`

- `parse_markdown_target`
- `extract_markdown_link`
- `extract_angle_uri`
- `extract_jsdoc_link`
- `extract_raw_uri`
- `resolve_local_target`
- `open_in_cmux_browser`
- `open_external`
- `M.extract_at`
- `M.open_under_cursor`
- `M.open_under_cursor_or_jump_older`

`plugins/cmd-ux.lua`, `plugins/link-open.lua`, `plugins/colorscheme.lua`

- annotate the returned Lazy plugin spec tables and callback shapes

## Approach

Use narrow local aliases and classes instead of generic `table` when the shape is known.

Preferred patterns:

- add `---@param` / `---@return` on local helpers where inference is weak
- add small local `---@class` blocks for ad-hoc tables returned from helpers
- add `---@alias` for small unions like intent strings or open-target kinds
- annotate module exports with `---@class` when the module shape is stable
- annotate returned Lazy plugin spec arrays with a local alias or `---@type` near the return site

Avoid:

- inventing a huge fake Lazy.nvim schema just to satisfy one file
- duplicating the large `cmd_ux.types` domain unless a local file truly needs a named imported shape
- replacing concrete shapes with `any` unless LuaLS cannot express the boundary cleanly

Useful existing pattern:

- `home/.config/nvim/lua/config/lazy.lua` already uses a small, local `---@type` annotation for `require("lazy")`

## Suggested Order

1. `cmd_ux/adapters/ex.lua`
2. `config/image_open.lua`
3. `config/link_open.lua`
4. `plugins/cmd-ux.lua`
5. `plugins/link-open.lua`
6. `plugins/colorscheme.lua` if still in budget

This order keeps the work on the highest-signal modules first: one remaining untyped `cmd-ux` adapter, then two utility modules with many helper functions, then small plugin-spec wrappers.

## Acceptance

- the scoped files above gain explicit LuaLS annotations where inference is currently weak
- `just lua-check` passes
- `just cmd-ux-test` passes
- no new Selene noise is introduced just to satisfy LuaLS
- the work stays within this slice and does not absorb the broader `dotfiles-cxjs` contract expansion

## Follow-on Work

If this slice exposes larger gaps, spawn follow-up beads instead of widening scope:

- broader plugin-spec typing across `home/.config/nvim/lua/plugins/*.lua`
- deeper provider/adapter contract work in `cmd-ux`
- repo guidance in `docs/lua-tooling.md` for annotation conventions
