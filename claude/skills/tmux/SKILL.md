---
name: tmux
description: Use when managing terminal processes - starting dev servers, reading logs from other panes, sending commands to panes, or deciding between tmux pane vs CC background process. Triggers on "start server", "check logs", "run in background", "new pane", "dev server".
---

# tmux

Terminal multiplexer - persistent sessions with splits and windows.

> **Local docs:** This skill maintains a searchable copy of `man tmux` at `./man-pages/`. Ref MCP doesn't index man pages, so grep these files when you need tmux syntax (options, commands, formats, styles, hooks). See [reference/man-pages.md](./reference/man-pages.md).
>
> **Releases:** Track tmux updates at https://github.com/tmux/tmux/releases

## Mental Model

### Architecture

```
tmux server (background daemon)
├── Session: project-a
│   ├── Window 0 (tab)
│   │   ├── Pane 0 → shell process (own cwd, env, history)
│   │   └── Pane 1 → shell process (own cwd, env, history)
│   └── Window 1 (tab)
│       └── Pane 0 → shell process
└── Session: project-b
    └── Window 0
        └── Pane 0 → shell process
```

- **Pane** = isolated shell process (like a separate terminal window)
- **Window** = container for panes (like a tab with splits)
- **Session** = container for windows (like a workspace)

Each pane is a fully independent shell with its own working directory, environment variables, and running processes. Switching panes/windows just changes which shell you're viewing.

### Creating vs Attaching

**Creating a session** (`tmux new-session`):
- Spawns shell as child of tmux server
- Initial pane inherits cwd from where you ran the command
- Environment inherited, then shell init (config.fish) runs

**Attaching to a session** (`tmux attach`):
- Connects your terminal to existing shells
- The cwd/env where you run `tmux attach` is **completely irrelevant**
- You're "teleporting" to shells that already exist with their own state

This is why you can `tt` from anywhere and land in the same session state - attaching is just connecting a display to existing processes.

## When to Use tmux Pane vs CC Background Process

| User Need | Use |
|-----------|-----|
| Real-time visibility of logs (dev server, build output) | tmux pane |
| Might interact with process | tmux pane |
| Just need to know when done / final result | CC background process |

**Default:** Dev servers and processes that emit logs user is developing against → **tmux pane**.

## Reading Pane Output

1. Discover pane layout: `tmux list-panes`
2. Capture with appropriate depth:
   ```bash
   tmux capture-pane -t :.1 -p -S -50  # last 50 lines from pane 1
   ```

Target format: `-t session:window.pane`
* `:.1` = current session, current window, pane 1
* `:.2` = pane 2, etc.

## Starting Processes in New Panes

See [sending-commands reference](./reference/sending-commands.md) for:
* Creating new panes and sending commands
* Starting dev servers
* send-keys patterns

## Directory-Based Sessions

Use `tt` (tmux toggle) to attach/create session named after current directory:

```bash
cd ~/projects/myapp && tt   # → Session: myapp
cd ~/projects/dotfiles && tt # → Session: dotfiles
```

- Outside tmux: creates session if none exists, attaches if it does
- Inside tmux: detaches from current session

The `t` abbreviation expands to `tmux` for direct commands: `t list-sessions`, `t list-panes`, etc.

## Quick Reference

| Task              | Command                               |
| ----------------- | ------------------------------------- |
| Toggle session    | `tt`                                  |
| List sessions     | `t list-sessions`                     |
| List panes        | `t list-panes`                        |
| Capture pane      | `t capture-pane -t :.N -p -S -100`    |
| Split vertical    | `t split-window -h`                   |
| Send command      | `t send-keys -t :.N "cmd" Enter`      |
| New session       | `t new -s name`                       |
| Kill session      | `t kill-session -t name`              |
| **Reload config** | `t source-file ~/.config/tmux/tmux.conf` |

> **Reload caveat:** `terminal-overrides` changes only affect **new** panes/windows. If testing terminal settings, create a new pane after reload.

## Maintenance

Sessions accumulate. Periodically clean up:

```bash
t list-sessions              # see all sessions
t kill-session -t old-proj   # kill one
t kill-server                # nuclear option
```

## References

* [Config](./reference/config.md) - locations, tpm-redux, dotfiles setup
* [Sending Commands](./reference/sending-commands.md) - send-keys, new panes, starting servers
* [Landscape](./reference/landscape.md) - plugins, ecosystem, setup recommendations
* [Man Pages](./reference/man-pages.md) - local searchable copy of `man tmux`

**Plugins (in use):**
* [Resurrect](./reference/plugin-resurrect.md) - manual save/restore sessions
* [Continuum](./reference/plugin-continuum.md) - auto save/restore (extends resurrect)
* [Sessionx](./reference/plugin-sessionx.md) - fuzzy session picker, worktree workflows
* [tmux-fzf](./reference/plugin-tmux-fzf.md) - fzf for sessions/windows/panes/commands (`prefix + f`)
* [fzf-url](./reference/plugin-fzf-url.md) - open URLs from scrollback (`prefix + u`)
* [gitmux](./reference/plugin-gitmux.md) - git status in status bar

See [landscape.md](./reference/landscape.md) for plugins to revisit.

**Integrations:**
* [Zed](./reference/integration-zed.md) - auto-attach to project sessions
* [Ghostty](./reference/integration-ghostty.md) - manual attach workflows
