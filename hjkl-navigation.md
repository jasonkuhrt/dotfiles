# hjkl Navigation Strategy

> Full cross-tool keymap (code nav, git, editing, search, panels): see `keymap.yml`

## Philosophy

hjkl is the universal navigation primitive across all tools. Modifiers scale scope consistently:

| Modifier | Scope | Example |
|----------|-------|---------|
| **bare** | smallest unit | char, line, list item |
| **Shift** | medium unit | half-page scroll, buffer switch |
| **Ctrl** | cross-boundary | panes, splits, menu items |
| **Alt** | structural change | resize pane borders |
| **Ctrl+Cmd** | create | new pane/split |

`kj` is the universal escape chord (nvim insert, nvim command, nvim terminal, Fish insert).

No exceptions: every navigable context uses j/k or Ctrl+j/k for vertical navigation.

## Complete Keymap

| Modifier | h/Left | j/Down | k/Up | l/Right |
|----------|--------|--------|------|---------|
| bare | char left | line down | line up | char right |
| Shift | prev buffer | half-page down | half-page up | next buffer |
| Ctrl | pane left | pane down / menu next | pane up / menu prev | pane right |
| Alt | resize left | resize down | resize up | resize right |
| Ctrl+Cmd | split left | split down | split up | split right |

### Special Keys

| Key | Action |
|-----|--------|
| `kj` | escape (nvim insert/command/terminal, Fish insert) |
| `Ctrl+Cmd+Z` | zoom pane (Kitty) |
| `Cmd+W` | close pane, then window (Kitty) |
| `U` | redo |
| `gJ` | join lines (displaced J default) |
| `gh` | hover docs (displaced K default) |

## Per-Tool Implementation

### Nvim

Files: `nvim/lua/config/keymaps.lua`, `nvim/lua/plugins/smart-splits.lua`, `nvim/lua/plugins/blink-cmp.lua`

| Layer | Keys | Mechanism |
|-------|------|-----------|
| bare hjkl | native vim | built-in |
| Shift J/K | half-page centered | `<C-d>zz` / `<C-u>zz` in keymaps.lua |
| Shift H/L | buffer prev/next | LazyVim default |
| Ctrl+hjkl | pane/split nav | smart-splits.nvim (crosses nvim↔Kitty via IS_NVIM user var) |
| Alt+hjkl | resize | smart-splits.nvim |
| Terminal Ctrl+hjkl | exit + navigate | `<C-\><C-n><C-h>` etc. in keymaps.lua |
| Completion Ctrl+j/k | next/prev item | blink-cmp.lua override |
| Snacks picker Ctrl+j/k | list down/up | built-in default |
| which-key, Neo-tree | bare j/k | native buffer navigation |

Additional plugins:
- **unnest.nvim** — prevents nested nvim in terminal buffers (redirects file opens to parent)

### Kitty

File: `kitty/kitty.conf`

| Layer | Keys | Mechanism |
|-------|------|-----------|
| Ctrl+hjkl | pane nav | `neighboring_window` (passthrough when nvim focused via `--when-focus-on var:IS_NVIM`) |
| Alt+hjkl | resize | `kitten relative_resize.py` (same IS_NVIM passthrough) |
| Ctrl+Cmd+hjkl | create pane | `launch --location=vsplit/hsplit --cwd=current` |
| Ctrl+Cmd+Z | zoom | `toggle_layout stack` |
| Cmd+W | close pane/window | `close_window` |

### Fish

File: `fish/config.fish`

| Layer | Keys | Mechanism |
|-------|------|-----------|
| bare hjkl | command line nav | `fish_vi_key_bindings insert` (vi normal mode after Escape) |
| kj | exit insert → normal | `bind -M insert -m default k,j cancel repaint-mode` |

Cursor shapes: line (insert), block (normal), underscore (replace).

Disabled in Zed terminal (`TERM_PROGRAM != zed` guard).

### Zed

File: `zed/keymap.json`

| Layer | Keys | Mechanism |
|-------|------|-----------|
| Ctrl+hjkl | pane nav | `workspace::ActivatePane{Left,Down,Up,Right}` |
| Ctrl+Cmd+hjkl | create split | `pane::Split{Left,Down,Up,Right}` |
| Ctrl+j/k in menus | next/prev | `menu::SelectNext` / `SelectPrevious` |
| Cmd+hjkl | dock toggles | `workspace::Toggle{Left,Bottom,Right}Dock` |

## Limitations

- **nvim terminal mode**: Ctrl+hjkl works directly (chains exit+navigate). `kj` only needed to enter normal mode for scrollback/search.
- **nvim crash**: terminal sessions and scrollback lost. Fish command history persists (written to disk). Fundamental nvim limitation.
- **Fish vi mode in Zed**: disabled — Zed terminal captures conflicting keys.
- **K in non-LSP files**: falls back to `man`. Use `gh` for hover docs explicitly.
- **Kitty edge wrap**: `at_edge = 'wrap'` not supported by smart-splits + Kitty. Navigation stops at edges.
- **J/K in visual mode**: half-page scroll, not move-selection. Use `:m '>+1` for moving lines.
- **Displaced defaults**: J (join lines) → `gJ`, K (hover/man) → `gh`.

## Files Reference

| File | Owns |
|------|------|
| `nvim/lua/config/keymaps.lua` | Shift J/K, kj escape, terminal mode, displaced defaults |
| `nvim/lua/plugins/smart-splits.lua` | Ctrl+hjkl nav, Alt+hjkl resize |
| `nvim/lua/plugins/unnest.lua` | prevent nested nvim in terminal |
| `nvim/lua/plugins/blink-cmp.lua` | Ctrl+j/k in completion popup |
| `nvim/lua/config/autocmds.lua` | terminal auto-insert on focus |
| `kitty/kitty.conf` | Ctrl+hjkl (non-nvim), Alt+hjkl (non-nvim), Ctrl+Cmd create, zoom, Cmd+W |
| `fish/config.fish` | vi mode, kj escape, cursor shapes |
| `zed/keymap.json` | Ctrl+hjkl panes, Ctrl+Cmd splits, Cmd docks, menu nav |
