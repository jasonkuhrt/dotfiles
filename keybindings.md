# Universal Keybindings

Symmetric bindings across apps for muscle-memory consistency.

## Split Navigation

Navigate between splits/panes with `ctrl+hjkl`.

| Key | Direction |
|-----|-----------|
| `ctrl+h` | Left |
| `ctrl+j` | Down |
| `ctrl+k` | Up |
| `ctrl+l` | Right |

| App | Config |
|-----|--------|
| Ghostty | `goto_split:{direction}` |
| Zed | `workspace::ActivatePane{Direction}` |

## Split Creation

Create new splits with `ctrl+cmd+hjkl`.

| Key | Direction |
|-----|-----------|
| `ctrl+cmd+h` | Left |
| `ctrl+cmd+j` | Down |
| `ctrl+cmd+k` | Up |
| `ctrl+cmd+l` | Right |

| App | Config |
|-----|--------|
| Ghostty | `new_split:{direction}` |
| Zed | `pane::Split{Direction}` |

## Split Management

| Key | Action | Ghostty | Zed |
|-----|--------|---------|-----|
| `ctrl+cmd+z` | Zoom toggle | `toggle_split_zoom` | `space z` |
| `ctrl+cmd+0` | Equalize | `equalize_splits` | — |

## Terminal Input

| Key | Action | Ghostty | Zed Terminal |
|-----|--------|---------|--------------|
| `shift+enter` | Newline | `text:\n` | `terminal::SendText` |
| `ctrl+'` | Clear screen | `clear_screen` | — |

## App-Specific Configs

- Ghostty: [`ghostty/config`](ghostty/config)
- Zed: [`zed/keymap.json`](zed/keymap.json)
