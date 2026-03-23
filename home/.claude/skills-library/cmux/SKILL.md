---
name: cmux
description: >-
  Reference for cmux, the terminal app built on libghostty. Use whenever the user
  mentions cmux, terminal tabs, surfaces, workspaces, splits, pane navigation, the
  cmux CLI, cmux-mode, or terminal multiplexer operations. Critical: always consult
  this skill before running any cmux command that creates windows or workspaces —
  `new-window` (OS window) and `new-workspace` (sidebar tab) are different commands
  and confusing them is the most common mistake. Also use when working with Ghostty
  config (cmux reads it), Karabiner cmux drive mode, or Fish/Neovim keybindings for
  terminal navigation. Even if the user just says "open a window", "new tab", or
  "switch tabs" in a terminal context, this skill applies.
---

# cmux Reference

cmux is a terminal application built on **libghostty** (not a Ghostty wrapper — it's its own app).

- Bundle ID: `com.cmuxterm.app`
- CLI: `/usr/local/bin/cmux` (Unix socket at `/tmp/cmux.sock`)
- Version: check with `cmux version`

## Object Model

```
Window          macOS window
└── Workspace   sidebar entry (like a tmux session)
    └── Pane    split region within a workspace
        └── Surface   individual terminal or browser instance
                       ↑ THIS is what users call a "tab"
```

- **Window**: top-level macOS window, contains workspaces.
- **Workspace**: shown in the sidebar. Has its own pane layout. Closest tmux analogy: session.
- **Pane**: a split region. Contains surfaces displayed as a tab bar.
- **Surface**: a single terminal (or browser). **Surfaces = tabs.** The tab bar at the top of a pane shows these.
- **Tab**: an alias for surface in some commands. `tab:<n>` refs work interchangeably with `surface:<n>`.

### Referencing Objects

Commands accept short refs (`surface:14`), UUIDs, or zero-based indexes.

```bash
cmux identify              # caller's full context (window, workspace, pane, surface, tab)
cmux --json identify       # structured output with caller + focused surface info
```

### Environment Variables (auto-set in cmux terminals)

| Variable            | Purpose                                          |
| ------------------- | ------------------------------------------------ |
| `CMUX_WORKSPACE_ID` | Default for `--workspace` in all commands        |
| `CMUX_SURFACE_ID`   | Default for `--surface`                          |
| `CMUX_TAB_ID`       | Default for `--tab` in `tab-action`/`rename-tab` |
| `CMUX_SOCKET_PATH`  | Override socket path (default `/tmp/cmux.sock`)  |

## Creating Windows vs Workspaces

These are **different commands** — confusing them is the most common mistake.

| User says                              | Command                           | What it does                                        |
| -------------------------------------- | --------------------------------- | --------------------------------------------------- |
| "open a new window", "new cmux window" | `cmux new-window`                 | Opens a new **OS-level window**                     |
| "new workspace", "new tab" (sidebar)   | `cmux new-workspace --cwd <path>` | Opens a new **workspace tab** in the current window |

```bash
cmux new-window                        # new OS window
cmux new-workspace --cwd /some/path    # new sidebar workspace in current window
```

`--cwd` sets the starting directory for `new-workspace`. `new-window` does NOT accept `--cwd`.

To open a new window at a specific directory, create the window then cd in its terminal:

```bash
WIN_ID=$(cmux new-window | awk '{print $2}')
sleep 0.3
WS_ID=$(cmux --json list-windows | python3 -c "import json,sys; ws=[w for w in json.load(sys.stdin) if w['id']=='$WIN_ID']; print(ws[0]['selected_workspace_id'] if ws else '')")
cmux send --workspace "$WS_ID" "cd /target/dir"
cmux send-key --workspace "$WS_ID" Enter
```

## Tab (Surface) Switching

**There is no `next-tab` or `focus-surface` CLI command.** The `surface.focus` API method exists in capabilities but is not exposed as a CLI command (as of v0.61).

### Approach 1: cmux CLI (native, no osascript)

Focus a surface at its current index to avoid reordering:

```bash
cmux move-surface --surface surface:13 --index 2 --focus true
```

To cycle tabs programmatically: list surfaces, find selected, compute next/prev, then move-surface at same index with `--focus true`.

Use `list-pane-surfaces` or `list-panels` (richer, includes `focused` and `selected_in_pane` fields) to get the surface list:

```bash
cmux --json list-pane-surfaces    # surfaces in current pane
cmux --json list-panels           # all surfaces with focused/selected_in_pane/index_in_pane
```

### Approach 2: Simulate keypress

cmux inherits Ghostty's default `cmd+shift+[`/`]` for tab cycling:

```bash
osascript -e 'tell application "System Events" to keystroke "[" using {command down, shift down}'
```

### Gotcha: next-window/previous-window cycle WORKSPACES, not tabs

The tmux-compat commands `next-window` and `previous-window` switch **workspaces** (sidebar entries), not surfaces (tabs within a pane). This is a naming trap from tmux compatibility.

## Essential Commands

Full CLI help: `cmux --help`. Add `--json` to most commands for structured output.

### Window Management

```bash
cmux new-window                       # new OS-level window
cmux list-windows
cmux focus-window --window <ref>
cmux close-window --window <ref>
```

### Workspace Navigation

```bash
cmux new-workspace --cwd <path>       # new workspace in current window
cmux list-workspaces
cmux select-workspace --workspace <ref>
cmux rename-workspace <title>
cmux close-workspace --workspace <ref>
cmux next-window              # next workspace (tmux compat name)
cmux previous-window          # prev workspace (tmux compat name)
```

### Pane (Split) Navigation

```bash
cmux list-panes
cmux focus-pane --pane <ref>
cmux last-pane
cmux new-split <left|right|up|down>
```

### Surface (Tab) Management

```bash
cmux new-surface                                    # new terminal tab
cmux new-surface --type browser --url <url>         # new browser tab
cmux close-surface --surface <ref>
cmux move-surface --surface <ref> --workspace <ref> # move tab to workspace
cmux reorder-surface --surface <ref> --index <n>
cmux tab-action --action <rename|pin|close-left|close-right|close-others|...>
cmux rename-tab <title>
```

### Terminal I/O

```bash
cmux read-screen                           # visible terminal text
cmux read-screen --scrollback --lines 100  # include scrollback
cmux send "text"                           # type text into surface
cmux send-key <key>                        # send keypress
```

### Metadata & Status

```bash
cmux set-status <key> <value> --icon <name> --color <#hex>
cmux clear-status <key>
cmux set-progress 0.5 --label "Building..."
cmux notify --title "Done" --body "Build complete"
cmux log "message" --level info --source my-tool
```

## Integration Architecture

See `references/integration.md` for detailed architecture of how Karabiner, Ghostty config, cmux-mode, and Fish/Neovim keybindings connect.

**Quick summary:**

- **Ghostty config** (`~/.config/ghostty/config`): read by cmux. Hyper-key bindings route to split actions.
- **Karabiner cmux drive mode**: sticky Ctrl+0 sets `cmux_mode=1`. Bare keys dispatch via `~/.local/libexec/cmux/cmux-mode`.
- **cmux-mode script**: bridges Karabiner actions to cmux by sending Hyper-key combos via osascript or calling cmux CLI directly.
- **Fish vi mode**: can bind keys in normal mode (`bind -M default`) to call cmux CLI.

## Opening Files

```bash
# Open a markdown file in the formatted viewer (split panel, live reload)
cmux markdown open path/to/file.md

# Open a directory as a new workspace
cmux path/to/dir
```

**Important**: `cmux open` is NOT a command. For `.md` files use `cmux markdown open <path>`. For directories just pass the path directly as the first argument.

## Common Patterns

```bash
# Who am I? Full context.
cmux --json identify

# All tabs with their focused/selected state
cmux --json list-panels

# Scripting: always use --json for parseable output
cmux --json list-pane-surfaces | python3 -c "..."
```
