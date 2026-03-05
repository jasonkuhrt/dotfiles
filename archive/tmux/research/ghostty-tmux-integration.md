# Ghostty + tmux Integration

Ghostty opens shell directly by default—no automatic tmux integration. This doc covers keybinding strategies and passthrough patterns.

## The Challenge

Ghostty keybindings are **static**—no conditional logic based on running program. You can't say "if in tmux, do X; else do Y" at the Ghostty level.

**Solutions:**
1. **Ghostty passthrough** → Send raw sequences, let tmux/shell interpret
2. **Shell-level detection** → Fish checks `$TMUX` and acts accordingly
3. **Future: Control Mode** → Native integration (in development, see [#1935](https://github.com/ghostty-org/ghostty/issues/1935))

## Ghostty Keybind Actions

| Action | Purpose | Example |
|--------|---------|---------|
| `text:` | Send raw bytes (Zig string syntax) | `text:\x02` = Ctrl-B (tmux prefix) |
| `csi:` | Send CSI escape sequence | `csi:49;9u` = Cmd-1 in kitty protocol |
| `esc:` | Send ESC sequence | `esc:` |
| `unbind` | Remove default binding | Required before rebinding Cmd-T, Cmd-W |

## Approach A: Tmux-Centric (Always in tmux)

All Cmd-keys send tmux sequences. Best if you're **always in tmux**.

### Ghostty Config

```ini
# Option key as Alt (for tmux bindings)
macos-option-as-alt = left

# Cmd-K → tmux prefix + Ctrl-K (clear pane binding)
keybind = cmd+k=text:\x02\x0b

# Cmd-T → tmux new window
keybind = cmd+t=unbind
keybind = cmd+t=text:\x02c

# Cmd-W → tmux close pane
keybind = cmd+w=unbind
keybind = cmd+w=text:\x02x

# Cmd-1..9 → tmux windows (CSI passthrough for Ghostty v1.2+)
# This bypasses Ghostty's default tab-switching
keybind = cmd+one=csi:49;9u
keybind = cmd+two=csi:50;9u
keybind = cmd+three=csi:51;9u
keybind = cmd+four=csi:52;9u
keybind = cmd+five=csi:53;9u
keybind = cmd+six=csi:54;9u
keybind = cmd+seven=csi:55;9u
keybind = cmd+eight=csi:56;9u
keybind = cmd+nine=csi:57;9u
```

### tmux Config

```bash
# Bind CSI sequences (Cmd-number passthrough) to window switching
bind -n M-1 select-window -t 1
bind -n M-2 select-window -t 2
bind -n M-3 select-window -t 3
bind -n M-4 select-window -t 4
bind -n M-5 select-window -t 5
bind -n M-6 select-window -t 6
bind -n M-7 select-window -t 7
bind -n M-8 select-window -t 8
bind -n M-9 select-window -t 9

# Ctrl-K clears pane (if using prefix + Ctrl-K)
bind C-k send-keys -R \; clear-history
```

## Approach B: Context-Aware via Shell (Inside & outside tmux)

Ghostty sends raw keys, shell decides what to do. Best if you **sometimes use Ghostty without tmux**.

### Ghostty Config

```ini
# Send Ctrl-K to terminal (shell handles context)
keybind = cmd+k=text:\x0b
```

### Fish Config

```fish
# Cmd-K (received as Ctrl-K): context-aware clear
function __fish_clear_screen_smart
    if set -q TMUX
        # Inside tmux: clear pane scrollback + screen
        tmux clear-history
        clear
    else
        # Outside tmux: regular clear
        clear
    end
    commandline -f repaint
end

bind \ck __fish_clear_screen_smart
```

## Hybrid Approach (Recommended)

Mix both strategies based on the key's typical use:

| Key | Strategy | Rationale |
|-----|----------|-----------|
| Cmd-K | Shell context-aware | Useful both in and out of tmux |
| Cmd-1..9 | CSI passthrough to tmux | Only meaningful in tmux anyway |
| Cmd-T/W | Keep as Ghostty | Useful outside tmux for native tabs |

## Copy/Paste Integration

For consistent clipboard behavior across tmux and Ghostty:

### Ghostty Config

```ini
# Don't auto-copy on select (let tmux handle it)
copy-on-select = false

# Remap Cmd-C to Ctrl-Shift-C (passthrough to tmux)
keybind = super+c=csi:99;6u
```

### tmux Config

```bash
# Use system clipboard
set -g set-clipboard on

# Vi copy mode with system clipboard
bind -T copy-mode-vi y send-keys -X copy-pipe-and-cancel "pbcopy"
bind -T copy-mode-vi MouseDragEnd1Pane send-keys -X copy-pipe-and-cancel "pbcopy"
```

Source: [Mike Olson - Ghostty + tmux uniform copy/paste](https://mwolson.org/blog/2025-11-12-ghostty-tmux-uniform-copy-paste/)

## Common Issues

### Cmd-number doesn't work (Ghostty v1.2+)

Ghostty v1.2 added default `cmd+1..9` → `goto_tab`. Use CSI passthrough:

```ini
keybind = cmd+one=csi:49;9u
```

Source: [Ghostty Discussion #8756](https://github.com/ghostty-org/ghostty/discussions/8756)

### Option/Alt keys not reaching tmux

Enable Option-as-Alt:

```ini
macos-option-as-alt = left   # or "right" or "true" for both
```

### Keys work outside tmux but not inside

tmux may be intercepting or transforming sequences. Check:
1. `tmux show-options -g` for conflicting bindings
2. Ensure `set -g extended-keys on` in tmux.conf

## Future: tmux Control Mode

Ghostty is implementing native tmux integration ([#1935](https://github.com/ghostty-org/ghostty/issues/1935)) similar to iTerm2's `-CC` mode. This will allow Ghostty to natively manage tmux panes as Ghostty splits.

**Status (as of Jan 2026):** In progress—DCS parser merged, reconciliation loop in development.

---

## References

### Official Docs
- [Ghostty Keybind Reference](https://ghostty.org/docs/config/keybind/reference)
- [Ghostty Config Reference](https://ghostty.org/docs/config/reference)

### Discussions & Issues
- [#1935 - tmux Control Mode](https://github.com/ghostty-org/ghostty/issues/1935) - Native integration (in progress)
- [#8756 - cmd+number workaround](https://github.com/ghostty-org/ghostty/discussions/8756) - CSI passthrough solution
- [#3309 - Binding keys to tmux sequences](https://github.com/ghostty-org/ghostty/discussions/3309) - `text:` syntax
- [#5525 - Cmd keys not working in tmux](https://github.com/ghostty-org/ghostty/discussions/5525)

### Community Configs & Articles
- [Gunpy/ghostty_tmux](https://github.com/Gunpy/ghostty_tmux) - Full Option-key tmux setup
- [Mike Olson - Copy/paste integration](https://mwolson.org/blog/2025-11-12-ghostty-tmux-uniform-copy-paste/)
- [Mansoor Barri - tmux & Ghostty](https://mansoorbarri.com/tmux-ghostty/) - Auto-attach pattern
- [Samuel Lawrentz - Minimal Ghostty Config](https://samuellawrentz.com/blog/minimal-ghostty-config/)
- [tmux-like keybinds gist](https://gist.github.com/jamesbarnett/48e94226b7e03a3bc1cd62d851f5fdfa)
