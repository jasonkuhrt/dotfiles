# tmux-fzf-url

Open URLs from terminal scrollback via fzf.

## Keybinding

`prefix + u` → Opens fzf with URLs from current pane + scrollback

## How It Works

1. Scans visible pane + scrollback history for URLs
2. Presents them in fzf for selection
3. Opens selected URL with system browser (`open` on macOS)

## Configuration

In `.tmux.conf`:

```bash
set -g @plugin 'wfxr/tmux-fzf-url'
set -g @fzf-url-history-limit '2000'  # include scrollback
```

| Option | Purpose | Example |
|--------|---------|---------|
| `@fzf-url-bind` | Custom keybinding | `'x'` |
| `@fzf-url-history-limit` | Lines of scrollback to scan | `'2000'` |
| `@fzf-url-fzf-options` | fzf flags | `'-w 50% -h 50% --multi'` |
| `@fzf-url-open` | Custom opener | `"firefox"` |
| `@fzf-url-extra-filter` | Additional patterns | `'grep -oE "\\b[a-zA-Z]+\\.txt\\b"'` |

## Requirements

- fzf
- bash

## Source

https://github.com/wfxr/tmux-fzf-url
