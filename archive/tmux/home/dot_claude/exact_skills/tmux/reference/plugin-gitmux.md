# gitmux

Git status in tmux status bar.

## Installation

```bash
brew install gitmux
```

Note: gitmux is a binary, not a TPM plugin.

## Configuration

In `.tmux.conf`:

```bash
set -g status-right '#(gitmux -cfg ~/.config/gitmux/gitmux.conf "#{pane_current_path}")'
set -g status-right-length 60
```

## Config File

Generate default config:

```bash
gitmux -printcfg > ~/.config/gitmux/gitmux.conf
```

### Minimal Config (current setup)

```yaml
tmux:
    symbols:
        branch: ""
        ahead: "↑"
        behind: "↓"
        staged: "+"
        modified: "~"
        untracked: "?"
        clean: ""

    styles:
        branch: "#[fg=cyan,bold]"
        divergence: "#[fg=yellow]"
        staged: "#[fg=green]"
        modified: "#[fg=yellow]"
        untracked: "#[fg=magenta]"

    layout: [branch, divergence, " ", flags]

    options:
        branch_max_len: 20
        hide_clean: true
        flags_without_count: true
```

## Layout Components

| Component | Example |
|-----------|---------|
| `branch` | `main` or `:345e7a0` (detached) |
| `remote-branch` | `origin/main` |
| `divergence` | `↓2↑1` |
| `flags` | `+~?` (staged, modified, untracked) |
| `stats` | `Σ56 Δ21` (insertions/deletions) |

## Source

https://github.com/arl/gitmux
