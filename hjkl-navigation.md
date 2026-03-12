# hjkl Navigation Strategy

> Full cross-tool keymap (code nav, git, editing, search, panels): see `keymap.yml`

## Philosophy

hjkl stays the universal navigation primitive. The terminal host is now cmux, not
Kitty, and the cross-boundary contract is explicit:

- `Ctrl+hjkl` = pane focus
- `Alt+hjkl` = pane resize
- `Ctrl+0` = enter sticky cmux drive mode

`kj` remains the universal escape chord for insert-like contexts.

## Complete Keymap

| Layer | h/Left | j/Down | k/Up | l/Right |
|-------|--------|--------|------|---------|
| bare | char left | line down | line up | char right |
| Shift | prev buffer | half-page down | half-page up | next buffer |
| Ctrl | pane left | pane down / menu next | pane up / menu prev | pane right |
| Alt | resize left | resize down | resize up | resize right |
| Ctrl+0 | enter sticky cmux mode | | | |

### Cmux Drive Mode

While sticky cmux mode is active, keys are owned by the cmux host layer and do
not target the focused pane directly.

| Keys | Action |
|------|--------|
| `h/j/k/l` | Focus pane left/down/up/right |
| `r` then `h/j/k/l` | Resize pane left/down/up/right |
| `s` then `h/j/k/l` | Create split left/down/up/right |
| `w` then `j/k` | Next / previous workspace |
| `z` | Toggle zoom |
| `x` | Close surface (host confirmation required) |
| `Esc` / `Enter` / `Ctrl+0` | Exit sticky cmux mode |

## Per-Tool Implementation

### Nvim

Files: `nvim/lua/config/keymaps.lua`, `nvim/lua/plugins/cmux-nav.lua`, `nvim/lua/plugins/blink-cmp.lua`

| Layer | Keys | Mechanism |
|-------|------|-----------|
| bare hjkl | native vim | built-in |
| Shift J/K | half-page centered | `<C-d>zz` / `<C-u>zz` in `keymaps.lua` |
| Shift H/L | buffer prev/next | LazyVim default |
| Ctrl+hjkl | pane/split nav | repo-owned `cmux-nav` (local split first, then cmux host action) |
| Alt+hjkl | resize | repo-owned `cmux-nav` |
| Terminal Ctrl+hjkl | exit + navigate | `<C-\\><C-n>` then normal-mode mapping |
| Completion Ctrl+j/k | next/prev item | blink-cmp override |
| Snacks picker Ctrl+j/k | list down/up | built-in default |

### cmux

Files: `ghostty/config`, `karabiner/karabiner.json`, `~/.local/libexec/cmux/cmux-mode`

| Layer | Keys | Mechanism |
|-------|------|-----------|
| Ctrl+0 | sticky mode toggle | Karabiner variable-gated hard-grab mode |
| hjkl inside mode | focus pane | hidden Ghostty/cmux Hyper bindings |
| r + hjkl | resize pane | hidden Ghostty/cmux Hyper bindings |
| s + hjkl | create split | hidden Ghostty/cmux Hyper bindings |
| w + j/k | cycle workspaces | `cmux-mode` helper + cmux CLI |
| z | zoom | hidden Ghostty/cmux Hyper binding |
| x | close surface (confirmation pinned on) | hidden Ghostty/cmux Hyper binding |
| Ctrl+' | clear screen | Ghostty `clear_screen` binding read by cmux |
| Shift+Enter | literal newline | Ghostty `text:\\n` binding read by cmux |

### Fish

File: `fish/config.fish`

| Layer | Keys | Mechanism |
|-------|------|-----------|
| bare hjkl | command line nav | `fish_vi_key_bindings insert` |
| kj | exit insert -> normal | `bind -M insert -m default k,j cancel repaint-mode` |

### Zed

File: `zed/keymap.json`

| Layer | Keys | Mechanism |
|-------|------|-----------|
| Ctrl+hjkl | pane nav | `workspace::ActivatePane{Left,Down,Up,Right}` |
| Ctrl+Cmd+hjkl | create split | `pane::Split{Left,Down,Up,Right}` |
| Ctrl+j/k in menus | next/prev | `menu::SelectNext` / `SelectPrevious` |
| Cmd+hjkl | dock toggles | `workspace::Toggle{Left,Bottom,Right}Dock` |

## Limitations

- `Ctrl+0` mode is frontmost-cmux only.
- The mode is explicit and sticky. There is no inferred Neovim or shell mode sync.
- Neovim terminal mode still relies on the existing escape-to-normal step before split navigation.
- `J/K` in visual mode remain half-page scroll, not move-selection.
- `gh` remains hover docs and `gJ` remains join lines.

## Files Reference

| File | Owns |
|------|------|
| `nvim/lua/config/keymaps.lua` | Shift J/K, kj escape, terminal mode |
| `nvim/lua/plugins/cmux-nav.lua` | Ctrl+hjkl nav, Alt+hjkl resize |
| `nvim/local-plugins/cmux-nav/*` | cmux boundary bridge implementation + tests |
| `ghostty/config` | hidden cmux action bindings + terminal bindings |
| `karabiner/karabiner.json` | sticky `Ctrl+0` hard-grab mode |
| `~/.local/libexec/cmux/cmux-mode` | workspace cycling + mode status + Neovim host action dispatch |
| `fish/config.fish` | vi mode, kj escape, cursor shapes |
| `zed/keymap.json` | Ctrl+hjkl panes, Ctrl+Cmd splits, Cmd docks |
