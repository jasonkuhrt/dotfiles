# Kitty vs Wezterm: Terminal Emulator Comparison

Research conducted Feb 2026 for smart-splits.nvim integration.

## Decision

**Kitty** selected as primary terminal for this dotfiles setup.

Rationale: faster, lower RAM, native macOS feel, active maintenance (v0.45.0 Dec 2025, nightly builds daily), smart-splits.nvim IPC support via `kitty @`. Wezterm's killer features (Lua config, SSH domains) don't match workflow needs (AI agents do 99% of editing, no SSH-heavy workflows).

## Community Discussion Places

### GitHub Discussions
- [Should I switch to Wezterm instead of kitty?](https://github.com/wezterm/wezterm/discussions/6159)
- [What makes wezterm bad?](https://github.com/wezterm/wezterm/discussions/2999) (locked by maintainer)
- [Can we talk about "xterm-kitty"?](https://github.com/kovidgoyal/kitty/discussions/3873)

### Hacker News
- [Recently switched to WezTerm and I'm very happy](https://news.ycombinator.com/item?id=41224245)
- [What's your reason to migrate from kitty to wezterm?](https://news.ycombinator.com/item?id=37814312)

### Blogs
- [Trying Wezterm From Kitty](https://evantravers.com/articles/2023/04/03/trying-wezterm-from-kitty/)
- [Choosing a Terminal on macOS 2025](https://medium.com/@dynamicy/choosing-a-terminal-on-macos-2025-iterm2-vs-ghostty-vs-wezterm-vs-kitty-vs-alacritty-d6a5e42fd8b3)

## The Case For Each

### Kitty
- **Performance**: Fastest throughput (2x next best), GPU-accelerated, SIMD vector instructions
- **Graphics Protocol**: Industry-leading, adopted by Ghostty and others
- **Built-in multiplexing**: Native splits without tmux
- **Resource usage**: CPU peaks 8.7%, memory 1.0% during heavy scrolling
- **Active maintenance**: Kovid Goyal, also maintains Calibre, consistent release cadence

### Wezterm
- **Lua configuration**: Full scripting, live reload, same language as nvim
- **SSH + multiplexing**: Native SSH client with auto-reconnect, no terminfo hassles
- **Cross-platform**: True Windows/macOS/Linux consistency
- **Friendly maintainer**: Wez Furlong praised as responsive and welcoming

## The Case Against Each

### Against Kitty
- **Maintainer personality**: Most-cited reason for switching away (terse, dismissive, anti-tmux stance)
- **Terminfo on remote**: `xterm-kitty` not standard, must copy to every SSH target
- **macOS bugs**: M2 crashes with ctrl+d, system freeze on hibernation wake
- **Not programmable**: Declarative config only (no scripting)

### Against Wezterm
- **Memory**: 170-320MB vs Kitty's lower footprint
- **Maintenance uncertainty**: Single maintainer, moved countries, reduced velocity (Dec 2025 response to abandonment concerns in [#7451](https://github.com/wezterm/wezterm/issues/7451))
- **macOS non-native**: Font rendering, keyboard shortcuts, drag-and-drop feel foreign
- **Config complexity**: Lua config can crash terminal if misconfigured

## smart-splits.nvim Integration

### Kitty
- Uses `kitty @` IPC for pane detection
- Requires `allow_remote_control yes` + `listen_on unix:/tmp/mykitty`
- Navigation via Kitty's built-in `neighboring_window` + `--when-focus-on var:IS_NVIM` conditional unmapping
- Resize via `relative_resize.py` kitten (installed by plugin's build hook)
- Limitation: `at_edge = 'wrap'` not supported
- Build hook: `./kitty/install-kittens.bash` copies kittens to `~/.config/kitty/`

### Wezterm
- Uses `wezterm cli` (must be on $PATH)
- No special setup needed
- Pane resizing requires nightly build
- No known functional limitations

## Maintenance Status (Feb 2026)

### Kitty
- v0.45.0 released Dec 25, 2025
- Nightly builds generated daily (latest Feb 14, 2026)
- Active macOS-specific bug fixes
- Sole maintainer (Kovid Goyal) — long-term FOSS track record

### Wezterm
- Reduced velocity since 2024
- Maintainer (Wez Furlong) addressed concerns Dec 27, 2025: moved countries, financial constraints
- Plans for broader maintainer base in 2026
- Project alive but slower releases expected

## Switcher Patterns

**Kitty -> Wezterm** (more common): Driven by maintainer personality, SSH friction, Lua config appeal.

**Wezterm -> Kitty** (less common): Driven by RAM usage, speed, stability.
