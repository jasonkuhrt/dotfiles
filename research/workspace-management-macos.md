# Workspace Management on macOS

Research into project-level context switching: apps, windows, terminals, browser tabs.

## Goal

"Switch to project X" should:
- Open Zed with the project
- Open Ghostty with tmux session attached
- Position windows (Zed left, Ghostty right)
- Open relevant browser tabs
- All driven by dotfiles, not GUI config

## Tool Comparison

| Tool | Dotfile-friendly? | Multi-machine? | Full context? | Notes |
|------|-------------------|----------------|---------------|-------|
| **yabai + skhd** | ✅ Text config | ✅ Symlink | ✅ Scriptable | Most powerful. Requires SIP partial disable. |
| **Aerospace** | ✅ TOML config | ✅ Symlink | ⚠️ Less mature | No SIP disable. Inspired by i3. Modern. |
| **Bunch** | ✅ Text files | ✅ Symlink | ✅ Apps + URLs | No window positioning. Simple. |
| **Hammerspoon** | ✅ Lua config | ✅ Symlink | ✅ Full control | Swiss army knife. Window mgmt + hotkeys + automation. |
| **Rectangle** | ⚠️ JSON config | ✅ Sync | ❌ Manual only | Just window snapping. No automation. |
| **Keyboard Maestro** | ❌ GUI | ❌ License/machine | ✅ Powerful | Not dotfile-friendly. |
| **Raycast** | ⚠️ Extensions are code | ⚠️ Cloud sync | ✅ Capable | Awkward to version control. |
| **macOS Shortcuts** | ❌ SQLite + iCloud | ⚠️ iCloud | ✅ Native | Can't version control. See separate research. |

## Links

- **yabai:** https://github.com/koekeishiya/yabai
- **skhd:** https://github.com/koekeishiya/skhd
- **Aerospace:** https://github.com/nikitabobko/AeroSpace
- **Bunch:** https://bunchapp.co
- **Hammerspoon:** https://www.hammerspoon.org
- **Rectangle:** https://rectangleapp.com

## Recommendations by Use Case

### Simple: Just launch apps
**Use Bunch.** Text files define what to open. Example:

```bunch
# ~/bunches/dotfiles.bunch
Zed ~/projects/jasonkuhrt/dotfiles
Ghostty
* https://github.com/jasonkuhrt/dotfiles
```

### Medium: Apps + window positioning
**Use Aerospace or yabai.** Tiling WM handles layout. Fish functions launch apps.

### Full control: Everything scriptable
**Use Hammerspoon.** Single Lua config for:
- Window management
- Hotkeys
- App launching
- Custom automation

## Fish Function Pattern

Regardless of WM choice, Fish orchestrates:

```fish
function project --description "Switch to project context"
    set -l name $argv[1]

    switch $name
        case dotfiles
            open -a "Zed" ~/projects/jasonkuhrt/dotfiles
            open -a "Ghostty"
            cd ~/projects/jasonkuhrt/dotfiles
            open "https://github.com/jasonkuhrt/dotfiles"
    end
end
```

## Tmux Integration

Current setup auto-attaches tmux on `cd` into git repos:

```fish
# In config.fish
set -q TMUX_AUTO_ON_GIT_CD; or set -gx TMUX_AUTO_ON_GIT_CD 1

function __auto_tmux_on_cd --on-variable PWD
    test "$TMUX_AUTO_ON_GIT_CD" = 1; or return
    if not set -q TMUX; and test -d .git
        tt  # attach/create session named after directory
    end
end
```

## Tmux Tips

### Layout cycling
- `prefix + space` cycles built-in layouts
- `prefix + z` zooms current pane (toggle)

### Session templates
Fish functions that create pane layouts:

```fish
function tdev
    set -l name (basename $PWD)
    tmux new-session -d -s $name -c $PWD
    tmux split-window -v -t $name -p 30 -c $PWD
    tmux split-window -h -t $name -p 50 -c $PWD
    tmux select-pane -t $name:1.0
    tmux attach -t $name
end
```

### Multi-monitor (linked sessions)
Two terminals showing different windows of same session:

```bash
# Terminal 1
tmux new-session -s work

# Terminal 2 - linked but independent window focus
tmux new-session -t work -s work-monitor2
```

## Next Steps

1. Try Aerospace (simple, no SIP) or Bunch (simplest)
2. Create Fish `project` function for common projects
3. Consider Hammerspoon if needs grow
