# tmux

## Concepts

### Architecture

```
Server (1 per machine, background daemon)
  └─ Session (named workspace, e.g. "dotfiles")
       └─ Window (tab within session)
            └─ Pane (split within window)
```

### Config Model

The config file contains tmux commands (without the `tmux` prefix):

```sh
# config file          # equivalent CLI
set -g mouse on        # tmux set -g mouse on
bind r source-file …   # tmux bind r source-file …
```

- Runs __once__ on server start (first `tmux` or `tmux new`)
- __Not__ re-read on new sessions/windows/panes
- Changes require explicit reload

### Persistence

Config file ≠ persistent database. It's just "commands to run on startup" (like `.bashrc`).

CLI commands modify __in-memory state only__:

```sh
tmux set -g mouse off   # running server changes, file untouched
# server restart → back to whatever config says
```

__Option scopes:__

| Flag   | Scope                      | Persists until... |
| ------ | -------------------------- | ----------------- |
| `-s`   | Server                     | Server dies       |
| `-g`   | Global (default for all)   | Server dies       |
| (none) | Current session            | Session closes    |
| `-w`   | Current window             | Window closes     |

### Three Core Ideas

1. __Commands__ - `set`, `bind`, `run`, etc. → [man-pages/1-concepts/](./man-pages/1-concepts/)
2. __Key tables__ - Context for when bindings activate → [man-pages/2-config/keybindings.txt](./man-pages/2-config/keybindings.txt)
3. __Format strings__ - `#{...}` for dynamic values → [man-pages/4-syntax/formats.txt](./man-pages/4-syntax/formats.txt)

## Workflow

### Reloading Config

```sh
prefix r                                    # if bound
tmux source-file ~/.config/tmux/tmux.conf   # direct
```

| Type                 | Hot reload? | Notes                              |
| -------------------- | ----------- | ---------------------------------- |
| Options (`set`)      | ✓           | Applied immediately                |
| Bindings (`bind`)    | ✓           | Override existing                  |
| Styles               | ✓           | Status bar, colors                 |
| Plugins              | ✗           | Need `prefix I` (tpm) or restart   |
| `terminal-overrides` | ✗           | Only affects __new__ windows/panes |

### Full Restart

```sh
tmux kill-server    # destroys all sessions
```

### Live Testing

```sh
tmux set -g status-style 'bg=red'    # prototype without editing config
```

### Discovery

| Command                         | Purpose                             |
| ------------------------------- | ----------------------------------- |
| `prefix ?`                      | Show all key bindings (interactive) |
| `tmux list-keys`                | Show all key bindings (cli)         |
| `tmux list-commands`            | Show all available commands         |
| `tmux show-options -g`          | Show global options & values        |
| `tmux show-options -w`          | Show window options & values        |
| `tmux display-message "#{...}"` | Test format strings                 |

__Example:__ "How do I zoom a pane?"

```sh
tmux list-commands | grep -i zoom    # → resize-pane ... -Z
tmux list-keys | grep -i zoom        # → prefix z → resize-pane -Z
```

## Reference

- [Official docs](https://man.openbsd.org/tmux)
- [tmux skill](../claude/skills/tmux/SKILL.md) - Usage patterns, local man-pages database, plugins, integrations
