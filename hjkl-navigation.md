# hjkl Navigation Strategy

> Full cross-tool keymap (code nav, git, editing, search, panels): see `keymap.yml`

## Philosophy

hjkl stays the universal navigation primitive *inside* an app. The terminal host is
cmux, and cmux is driven by its own native shortcuts rather than a repo-owned mode:

- `Ctrl+hjkl` = window focus inside Neovim and Zed
- `Cmd+Opt+arrows` = pane focus in cmux
- `Cmd+Shift+[`/`]` = previous / next tab, `Cmd+Ctrl+[`/`]` = previous / next workspace

`kj` remains the universal escape chord for insert-like contexts.

## Complete Keymap

| Layer | h/Left | j/Down | k/Up | l/Right |
|-------|--------|--------|------|---------|
| bare | char left | line down | line up | char right |
| Shift | prev buffer | half-page down | half-page up | next buffer |
| Ctrl | window left | window down / menu next | window up / menu prev | window right |

`Ctrl+hjkl` moves between windows *within* Neovim or Zed. It no longer crosses into
cmux panes: use `Cmd+Opt+arrows` for that.

## cmux Native Shortcuts

cmux ships these defaults. Override them under `shortcuts.bindings` in
`~/.config/cmux/cmux.json`, which lists every binding as a commented block.

| Action | Keys |
|--------|------|
| Focus pane left/down/up/right | `Cmd+Opt+←/↓/↑/→` |
| Split right / down | `Cmd+D` / `Cmd+Shift+D` |
| Toggle split zoom | `Cmd+Shift+Enter` |
| Previous / next tab | `Cmd+Shift+[` / `Cmd+Shift+]` |
| Select tab by position | `Ctrl+<n>` |
| New tab / new window | `Cmd+T` / `Cmd+Shift+N` |
| Close tab / close workspace | `Cmd+W` / `Cmd+Shift+W` |
| Previous / next workspace | `Cmd+Ctrl+[` / `Cmd+Ctrl+]` |
| Select workspace by position | `Cmd+<n>` |
| Go to workspace | `Cmd+P` |
| Rename tab / workspace | `Cmd+R` / `Cmd+Shift+R` |
| Toggle sidebar | `Cmd+B` |
| Command palette | `Cmd+Shift+P` |
| Reload configuration | `Cmd+Shift+,` |

Two gaps are deliberate, because cmux has no binding for either: **pane resize** and
**split left / split up**.

## Per-Tool Implementation

### Nvim

Files: `nvim/lua/config/keymaps.lua`, `nvim/lua/plugins/blink-cmp.lua`

| Layer | Keys | Mechanism |
|-------|------|-----------|
| bare hjkl | native vim | built-in |
| Shift J/K | half-page centered | `<C-d>zz` / `<C-u>zz` in `keymaps.lua` |
| Shift H/L | buffer prev/next | LazyVim default |
| Ctrl+hjkl | window nav | LazyVim default (`<C-w>h` and friends) |
| Terminal Ctrl+hjkl | exit + navigate | `<C-\\><C-n>` then normal-mode mapping |
| Completion Ctrl+j/k | next/prev item | blink-cmp override |
| Snacks picker Ctrl+j/k | list down/up | built-in default |

### cmux

File: `cmux/cmux.json` (bindings) and `ghostty/config` (terminal behavior cmux reads)

| Layer | Keys | Mechanism |
|-------|------|-----------|
| Pane / tab / workspace | see the table above | cmux native shortcuts |
| Ctrl+' | clear screen | Ghostty `clear_screen` binding read by cmux |
| Shift+Enter | literal newline | Ghostty `text:\\n` binding read by cmux |

### Fish

File: `fish/config.fish`

| Layer | Keys | Mechanism |
|-------|------|-----------|
| bare hjkl | command line nav | `fish_vi_key_bindings insert` |
| kj | exit insert -> normal | `bind -M insert -m default k,j cancel repaint-mode` |

Prompts start in insert mode so that programmatic input, including cmux's agent
session restore, is not eaten by normal-mode motions.

### Zed

File: `zed/keymap.json`

| Layer | Keys | Mechanism |
|-------|------|-----------|
| Ctrl+hjkl | pane nav | `workspace::ActivatePane{Left,Down,Up,Right}` |
| Ctrl+Cmd+hjkl | create split | `pane::Split{Left,Down,Up,Right}` |
| Ctrl+j/k in menus | next/prev | `menu::SelectNext` / `SelectPrevious` |
| Cmd+hjkl | dock toggles | `workspace::Toggle{Left,Bottom,Right}Dock` |

## Limitations

- cmux has no pane-resize shortcut, and splits open right or down only.
- Neovim `Ctrl+hjkl` stops at the Neovim window boundary.
- Neovim terminal mode still relies on the escape-to-normal step before window navigation.
- `J/K` in visual mode remain half-page scroll, not move-selection.
- `gh` remains hover docs and `gJ` remains join lines.

## Files Reference

| File | Owns |
|------|------|
| `nvim/lua/config/keymaps.lua` | Shift J/K, kj escape, terminal mode |
| `cmux/cmux.json` | cmux shortcut overrides (defaults are listed there, commented) |
| `ghostty/config` | terminal bindings cmux reads |
| `karabiner/karabiner.json` | fn handling and Raycast list navigation |
| `fish/config.fish` | vi mode, kj escape, cursor shapes |
| `zed/keymap.json` | Ctrl+hjkl panes, Ctrl+Cmd splits, Cmd docks |
