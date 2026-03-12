# cmux Integration Architecture

## Layer Stack

Keypresses flow through these layers in order:

```
Karabiner (OS level)  →  intercepts keys, dispatches cmux-mode
    ↓ (passthrough)
cmux / Ghostty (terminal level)  →  keybind config, native tab/split actions
    ↓ (passthrough)
Fish shell (shell level)  →  vi mode bindings, runs commands
```

Each layer can consume a keypress or let it pass through. Understanding which layer handles what is critical for avoiding conflicts.

## Karabiner: cmux Drive Mode

Sticky Ctrl+0 toggles cmux drive mode (Karabiner variable `cmux_mode=1`).

While active, bare keys are intercepted by Karabiner before reaching the terminal:

| Key | Action | Mechanism |
|-----|--------|-----------|
| h/j/k/l | Focus split left/down/up/right | osascript → Hyper+key → Ghostty keybind |
| u/i/o/p (via prefix) | Resize split | osascript → Hyper+key → Ghostty keybind |
| n/m/,/. (via prefix) | New split | osascript → Hyper+key → Ghostty keybind |
| z | Toggle zoom | osascript → Hyper+z → Ghostty keybind |
| x | Close surface | osascript → Hyper+x → Ghostty keybind |
| j/k (workspace prefix) | Workspace next/prev | cmux-mode → cmux CLI |
| Escape / Ctrl+0 | Exit drive mode | Clears `cmux_mode` variable |

Condition: only active when frontmost app is `com.cmuxterm.app`.

### cmux-mode Script

Location: `~/.local/libexec/cmux/cmux-mode`

```bash
cmux-mode enter              # set status indicator
cmux-mode exit               # clear status indicator
cmux-mode workspace-next     # cycle workspace via cmux CLI
cmux-mode workspace-prev     # cycle workspace via cmux CLI
cmux-mode action <name>      # dispatch split action via osascript → Hyper key
```

The `dispatch_action` function sends Hyper-key combos via osascript:
```bash
osascript -e 'tell application "System Events" to keystroke "h" using {command down, control down, option down, shift down}'
```

These Hyper combos are caught by Ghostty keybindings in `~/.config/ghostty/config`.

## Ghostty Config

cmux reads `~/.config/ghostty/config`. The keybind entries there define the **internal action surface** — they're implementation details, not the user-facing keymap:

```
# Split navigation (Hyper+hjkl)
keybind = shift+ctrl+alt+cmd+h=goto_split:left
keybind = shift+ctrl+alt+cmd+j=goto_split:down
keybind = shift+ctrl+alt+cmd+k=goto_split:up
keybind = shift+ctrl+alt+cmd+l=goto_split:right

# Split resize (Hyper+uiop)
keybind = shift+ctrl+alt+cmd+u=resize_split:left,3
...

# Split creation (Hyper+nm,.)
keybind = shift+ctrl+alt+cmd+n=new_split:left
...

# Surface management (Hyper+z/x)
keybind = shift+ctrl+alt+cmd+z=toggle_split_zoom
keybind = shift+ctrl+alt+cmd+x=close_surface
```

Tab switching (`cmd+shift+[`/`]`) uses Ghostty/cmux defaults — not explicitly in the config.

## Fish Shell Integration

Fish vi mode bindings operate at the shell level. They can call cmux CLI commands directly.

Example: binding `[`/`]` in vi normal mode for tab cycling:

```fish
# These override the default history-token-search-backward/forward bindings.
# Alternatives for history search: alt-up/down, ctrl+r (fzf).
bind -M default \[ 'cmux-tab-cycle prev'
bind -M default \] 'cmux-tab-cycle next'
```

Key placement rule: custom bindings must go AFTER `fish_vi_key_bindings` and `fzf_configure_bindings` calls, which replace all bindings.

### Important: Layer Conflicts

When Karabiner cmux drive mode is active (`cmux_mode=1`), Karabiner intercepts keys **before** they reach Fish. So Fish bindings only fire when cmux drive mode is **inactive** (normal typing state). This means Fish vi normal-mode bindings and Karabiner cmux drive mode don't conflict — they operate in mutually exclusive states.

## Neovim Integration

The cmux-nav Neovim plugin bridges Neovim splits ↔ cmux splits. It sends Hyper-key combos (same ones Ghostty keybinds listen for) to navigate seamlessly between Neovim and cmux panes.

Location: `~/.config/nvim/local-plugins/cmux-nav/`
