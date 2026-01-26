# Shell Vim Modes Comparison

Comparison of vim/vi editing modes across terminal shells. Goal: find the best vim-in-shell experience.

## Summary

**Zsh + zsh-vi-mode plugin** is the gold standard for vim editing in a shell. Fish's built-in vim mode is decent but missing text objects. Newer shells (Nushell, Elvish) prioritize other features over vim completeness.

## Comparison Matrix

| Shell | Vim Mode | Text Objects | Visual Mode | Surround | Registers | Verdict |
|-------|----------|--------------|-------------|----------|-----------|---------|
| **Zsh + zsh-vi-mode** | Plugin | ✅ Full | ✅ Full | ✅ Yes | ✅ + clipboard | **Best** |
| **Zsh (default)** | Built-in | ✅ Since 5.0.8 | ✅ Since 5.2 | ❌ | Basic | Good |
| **Fish** | Built-in | ❌ | ✅ Basic | ❌ | ❌ | Decent |
| **Bash** | readline | ❌ | ❌ | ❌ | ❌ | Minimal |
| **Nushell** | reedline | Partial | ❌ | ❌ | ❌ | WIP |
| **Elvish** | Built-in | ❌ | ❌ | ❌ | ❌ | Basic |

## Zsh + zsh-vi-mode (Recommended)

[jeffreytse/zsh-vi-mode](https://github.com/jeffreytse/zsh-vi-mode) is a dedicated plugin that provides near-native vim experience.

### Features

- **Text objects**: `ci"`, `da(`, `yiw`, `vi{` — the full set
- **Surround**: `cs"'` (change surrounding), `ds(` (delete surrounding), `ys$"` (add surrounding)
- **Visual mode**: `v`, `V` with proper highlighting
- **Increment/decrement**: `Ctrl-A`/`Ctrl-X` on numbers, booleans, weekdays, months
- **System clipboard**: `"+y`, `"+p` integration (configurable)
- **External editor**: `vv` opens current line in `$EDITOR`
- **Low latency**: Lazy-loads bindings for fast startup
- **Mode indicator**: Shows NORMAL, INSERT, VISUAL, REPLACE

### Installation

```zsh
# zinit
zinit light jeffreytse/zsh-vi-mode

# oh-my-zsh
plugins=(... zsh-vi-mode)

# antigen
antigen bundle jeffreytse/zsh-vi-mode
```

### Why It's Better Than Default

Default Zsh vi mode has:
- Quirky cursor behavior
- No surround operations
- Limited visual mode feedback
- Conflicts with other plugins

zsh-vi-mode fixes all of these.

## Fish Vim Mode

Fish has built-in vim mode via `fish_vi_key_bindings`.

### What Works

- Mode switching: `Esc`, `i`, `a`, `A`, `I`, `o`, `O`
- Motions: `h`/`j`/`k`/`l`, `w`/`b`/`e`, `0`/`$`/`^`, `gg`/`G`
- Operators: `d`, `c`, `y` with motions
- Character search: `f`/`F`/`t`/`T` with `;`/`,` repeat
- Basic visual mode
- Undo: `u`

### What's Missing

- **Text objects** — [#1842](https://github.com/fish-shell/fish-shell/issues/1842) open since 2014
- **Redo** — [#8319](https://github.com/fish-shell/fish-shell/issues/8319)
- **Clipboard integration** — [#4028](https://github.com/fish-shell/fish-shell/issues/4028)
- Surround operations
- Named registers
- Macros

### Open Issues (as of Jan 2026)

| Issue | Title |
|-------|-------|
| [#1842](https://github.com/fish-shell/fish-shell/issues/1842) | Vim text objects (10 years open) |
| [#8319](https://github.com/fish-shell/fish-shell/issues/8319) | Vi mode: support redo |
| [#4028](https://github.com/fish-shell/fish-shell/issues/4028) | Integrate vi mode with clipboard |
| [#6046](https://github.com/fish-shell/fish-shell/issues/6046) | Set default vi mode |

### Fixed Issues (Good News)

These common complaints have been resolved:
- Escape delay in tmux (#5894) — fixed 2019
- Mode switching re-executes prompt (#5783) — fixed 2019
- Block cursor in insert mode (#8635) — fixed 2023
- Inner word motion (#11109) — fixed Jan 2025
- C-f autocomplete (#8619) — fixed 2022

### Workaround: External Editor

Fish supports `Alt-E` or `Alt-V` to edit the current command line in `$EDITOR`:

```fish
# This is built-in, just press Alt-E
# Or bind to a custom key:
bind \ce edit_command_buffer
```

## Nushell

Nushell uses [reedline](https://github.com/nushell/reedline) for line editing.

### Current State

- Basic vi motions work
- Visual mode not supported
- Text objects partial
- Active development

### Open Issues

| Issue | Title |
|-------|-------|
| [#15096](https://github.com/nushell/nushell/issues/15096) | Keybindings conflict with vi mode state machine |
| [#17286](https://github.com/nushell/nushell/issues/17286) | Dot character word boundary issue |
| [#11507](https://github.com/nushell/nushell/issues/11507) | Emacs bindings missing in Vi Insert mode |

### Verdict

Nushell is focused on structured data pipelines, not vim editing. Vi mode is functional but not a priority.

## Elvish

Modern shell written in Go with unique features.

### Vi Mode

- Basic motions only
- No text objects
- No visual mode
- No surround

### Notable Limitation

No background process support (`Ctrl-Z`, `fg`, `bg`). This is a dealbreaker for many vim users who background vim frequently.

Source: [Elvish 2025 Review](https://nevkontakte.com/2025/elvish.html)

## Bash

Uses readline for input, which has basic vi mode.

```bash
set -o vi
```

### Features

- Mode switching
- Basic motions
- Basic operators

### Missing

- Text objects
- Visual mode
- Surround
- Everything modern

Bash vi mode hasn't evolved significantly. Use zsh if you want vim in shell.

## Decision Framework

| If you want... | Choose |
|----------------|--------|
| Best vim editing in shell | Zsh + zsh-vi-mode |
| Best overall shell UX | Fish (accept vim limitations) |
| Structured data pipelines | Nushell (vim secondary) |
| POSIX compatibility | Bash or Oils |
| Modern + vim | Zsh + zsh-vi-mode + plugins |

## Hybrid Approach

If staying with Fish but wanting vim for complex edits:

1. **Built-in**: Press `Alt-E` to edit current command in nvim
2. **Custom function**:
   ```fish
   function ve --description "Edit command in vim, execute result"
       set -l tmp (mktemp)
       commandline > $tmp
       nvim $tmp
       commandline (cat $tmp)
       rm $tmp
   end
   bind \ev ve  # Alt-V opens in nvim
   ```

## Trade-offs: Fish vs Zsh

| Feature | Fish | Zsh + Plugins |
|---------|------|---------------|
| Vim mode | Decent | Excellent (zsh-vi-mode) |
| Autosuggestions | Built-in | Plugin (zsh-autosuggestions) |
| Syntax highlighting | Built-in | Plugin (zsh-syntax-highlighting) |
| Completions | Excellent built-in | Good with plugins |
| Configuration | Simple | Complex (.zshrc ecosystem) |
| Startup time | Fast | Depends on plugins |
| POSIX compatible | No | Mostly |

Fish wins on UX out-of-the-box. Zsh wins on vim mode with plugins.

---

## References

### Plugins & Tools
- [zsh-vi-mode](https://github.com/jeffreytse/zsh-vi-mode) — Best zsh vim plugin
- [zsh-vim-mode](https://github.com/softmoth/zsh-vim-mode) — Alternative with surround
- [oh-my-zsh vi-mode](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/vi-mode) — Basic plugin

### Comparisons
- [Slant: Best UNIX Shells 2025](https://www.slant.co/topics/513/~best-unix-shells)
- [Shell Comparison Gist](https://gist.github.com/pmarreck/b7bd1c270cb77005205bf91f80c4e130)
- [Lobsters: Bash vs Fish vs Zsh vs Nushell](https://lobste.rs/s/qoccbl/bash_vs_fish_vs_zsh_vs_nushell)

### Shell Docs
- [Fish vi key bindings](https://fishshell.com/docs/current/cmds/fish_vi_key_bindings.html)
- [Fish interactive use](https://fishshell.com/docs/current/interactive.html)
- [Zsh Line Editor](https://zsh.sourceforge.io/Doc/Release/Zsh-Line-Editor.html)

---

Last updated: 2026-01-25
