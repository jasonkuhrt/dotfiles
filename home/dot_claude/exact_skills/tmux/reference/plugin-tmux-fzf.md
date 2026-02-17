# tmux-fzf

Fuzzy finder integration for managing tmux sessions, windows, panes, commands, and keybindings.

## Keybinding

`prefix + f` → Opens fzf popup for tmux management

## Features

| Action | What it does |
|--------|--------------|
| Session | Switch, create, rename, kill sessions |
| Window | Switch, create, rename, kill, swap, link windows |
| Pane | Switch, kill, swap, break, join panes |
| Command | Execute any tmux command |
| Keybinding | Search and execute keybindings |
| Clipboard | Browse clipboard history (requires CopyQ) |
| Process | Kill processes by name |

Multi-select with `TAB` / `Shift+TAB`.

## Configuration

In `.tmux.conf`:

```bash
set -g @plugin 'sainnhe/tmux-fzf'
TMUX_FZF_LAUNCH_KEY="f"
TMUX_FZF_OPTIONS="-p -w 62% -h 38% -m"  # popup mode (tmux ≥3.2)
```

| Variable | Purpose |
|----------|---------|
| `TMUX_FZF_LAUNCH_KEY` | Key after prefix (default: `F`) |
| `TMUX_FZF_OPTIONS` | fzf-tmux flags (`-p` for popup) |
| `TMUX_FZF_ORDER` | Menu order: `"session\|window\|pane\|..."` |
| `TMUX_FZF_PREVIEW` | Set `0` to disable preview |

## Custom Menus

```bash
TMUX_FZF_MENU="reload config\ntmux source ~/.config/tmux/tmux.conf\nclear history\ntmux clear-history"
```

## Source

https://github.com/sainnhe/tmux-fzf
