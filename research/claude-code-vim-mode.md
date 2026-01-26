# Claude Code Vim Mode

Claude Code has a built-in vim mode for modal editing in the TUI. Currently **no customization** is available—keybindings are fixed.

## Current State

| Capability | Status |
|------------|--------|
| Enable/disable vim mode | ✅ `/vim` or `/config` |
| Persist setting across sessions | ✅ via `/config` |
| Customize keybindings | ❌ Not supported |
| vimrc-style configuration | ❌ Not supported |
| Add custom key sequences | ❌ Not supported |

## Supported Keybindings

### Mode Switching
- `Esc` → NORMAL mode
- `i`/`I`/`a`/`A`/`o`/`O` → INSERT mode at various positions

### Navigation (NORMAL)
- `h`/`j`/`k`/`l` — directional movement
- `w`/`e`/`b` — word navigation
- `0`/`$`/`^` — line positions
- `gg`/`G` — beginning/end of input
- `f`/`F`/`t`/`T` + char — jump to character
- `;`/`,` — repeat character jump

### Editing (NORMAL)
- `x` — delete char
- `dd`/`D` — delete line/to EOL
- `dw`/`de`/`db` — delete word variants
- `cc`/`C` — change line/to EOL
- `cw`/`ce`/`cb` — change word variants
- `yy`/`Y`/`yw`/`ye`/`yb` — yank operations
- `p`/`P` — paste after/before
- `>>`/`<<` — indent/dedent
- `J` — join lines
- `.` — repeat last change

### Text Objects
With operators `d`, `c`, `y`:
- `iw`/`aw` — inner/around word
- `iW`/`aW` — inner/around WORD
- `i"`/`a"`, `i'`/`a'` — quotes
- `i(`/`a(`, `i[`/`a[`, `i{`/`a{` — brackets

### Not Supported
- Visual mode (`v`, `V`, `Ctrl-V`)
- Macros (`q`, `@`)
- Named registers (`"a`, `"b`)
- Marks (`m`, `'`)
- `s`/`S` (substitute) — see issue #20766
- Search (`/`, `?`, `n`, `N`)

## Tracking Issues

### Customization (Primary Interest)

| Issue | Title | Status |
|-------|-------|--------|
| [#20152](https://github.com/anthropics/claude-code/issues/20152) | **Add customizable escape sequence for vim mode, ideally a vimrc** | Open |
| [#16717](https://github.com/anthropics/claude-code/issues/16717) | Expand vim mode keybinding support for yank, paste, undo, redo | Open |
| [#16547](https://github.com/anthropics/claude-code/issues/16547) | Customizable keyboard shortcuts for @ file picker navigation | Open |

### Missing Keys/Features

| Issue | Title | Status |
|-------|-------|--------|
| [#20766](https://github.com/anthropics/claude-code/issues/20766) | Add support for `s` and `S` | Open |
| [#16788](https://github.com/anthropics/claude-code/issues/16788) | Expose vim mode state in statusline JSON | Open |
| [#14084](https://github.com/anthropics/claude-code/issues/14084) | Persist editor mode (vim) across sessions | Open |
| [#20834](https://github.com/anthropics/claude-code/issues/20834) | Vim keybindings in AskUserQuestion flow | Open |
| [#10621](https://github.com/anthropics/claude-code/issues/10621) | Require double ESC in Plan Mode Q&A | Open |

### Bugs

| Issue | Title | Status |
|-------|-------|--------|
| [#17150](https://github.com/anthropics/claude-code/issues/17150) | Slash autocomplete broken mid-text with vim mode | Open |
| [#15452](https://github.com/anthropics/claude-code/issues/15452) | Alt+Delete behavior incorrect | Open |
| [#1467](https://github.com/anthropics/claude-code/issues/1467) | Cursor visible across multiple terminal instances | Open |
| [#2588](https://github.com/anthropics/claude-code/issues/2588) | Incorrect Enter behavior in INSERT mode | Open (dup) |
| [#19306](https://github.com/anthropics/claude-code/issues/19306) | Ctrl+G then ZZ causes text loss | Open |

## Workarounds

### For Missing Customization

1. **Compose externally** — Write prompts in actual vim/nvim, paste into Claude Code
2. **`--print` mode** — `echo "prompt" | claude --print` bypasses interactive input
3. **IDE integration** — VS Code/JetBrains extensions use your editor's vim plugin

### For Specific Missing Keys

| Missing | Workaround |
|---------|------------|
| `s` (substitute) | Use `xi` or `cli` |
| `S` (substitute line) | Use `cc` |
| Visual mode | Use text objects with operators |
| Search | Use system clipboard to paste search term |

## Architecture Notes

Claude Code uses [Ink](https://github.com/vadimdemedes/ink) (React for CLI) for its TUI. The vim mode is implemented as a state machine in the input handler—not a full vim emulator. This explains:

- Fixed keybinding set (hardcoded in source)
- No plugin/extensibility architecture
- Subset of vim features (practical editing, not file operations)

## Related Research

- [Shell Vim Modes Comparison](./shell-vim-modes.md) — Comparison of vim modes across Fish, Zsh, Bash, Nushell, Elvish

## References

- [Claude Code Terminal Config Docs](https://docs.anthropic.com/en/docs/claude-code/terminal-config)
- [Claude Code Interactive Mode Docs](https://docs.anthropic.com/en/docs/claude-code/interactive-mode)
- [Ink (React for CLI)](https://github.com/vadimdemedes/ink)

---

Last updated: 2026-01-25
