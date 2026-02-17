# tmux Ecosystem Landscape

Decision guide for evaluating and extending tmux setup.

## Evaluating User Context

Before recommending plugins, understand the user's situation:

| Context                             | Likely Needs                                 |
| ----------------------------------- | -------------------------------------------- |
| Full-stack app (server, db, builds) | Session persistence, process restoration     |
| Monorepo with worktrees             | Fast session switching, session-per-worktree |
| Static files / journaling           | Minimal - basics likely sufficient           |
| Multiple active projects            | Session management, fuzzy switching          |

__Questions to clarify:__

* How many projects do you actively switch between?
* Do you use git worktrees?
* Do you run dev servers / databases locally?
* Do you reboot often? Care about restoring state?

## Plugin Manager

| Tool                                               | Status                          | Recommendation       |
| -------------------------------------------------- | ------------------------------- | -------------------- |
| [tpm](https://github.com/tmux-plugins/tpm)         | Abandoned (last merge Feb 2023) | Avoid                |
| [tpm-redux](https://github.com/RyanMacG/tpm-redux) | Maintained fork                 | __Use this__         |
| Manual management                                  | Works                           | Fine for few plugins |

## Plugin Categories

### Session Persistence

| Plugin         | When to Use                        | Reference                                    |
| -------------- | ---------------------------------- | -------------------------------------------- |
| tmux-resurrect | Want manual save/restore           | [plugin-resurrect.md](./plugin-resurrect.md) |
| tmux-continuum | Want "just works" auto-persistence | [plugin-continuum.md](./plugin-continuum.md) |

### Session Management

| Plugin                  | When to Use                                   | Reference                                  |
| ----------------------- | --------------------------------------------- | ------------------------------------------ |
| tmux-sessionx           | Multiple projects, worktrees, fuzzy switching | [plugin-sessionx.md](./plugin-sessionx.md) |
| tmux-fzf-session-switch | Lighter alternative to sessionx               | —                                          |

### fzf Integration

| Plugin       | When to Use                                  | Reference                                |
| ------------ | -------------------------------------------- | ---------------------------------------- |
| tmux-fzf     | Fuzzy management of sessions/windows/panes   | [plugin-tmux-fzf.md](./plugin-tmux-fzf.md) |
| tmux-fzf-url | Open URLs from scrollback with fzf           | [plugin-fzf-url.md](./plugin-fzf-url.md)  |

### Status Bar

| Plugin | When to Use                    | Reference                              |
| ------ | ------------------------------ | -------------------------------------- |
| gitmux | Git branch/status in status bar | [plugin-gitmux.md](./plugin-gitmux.md) |

## Recommended Setups

### Minimal (new to tmux)

No plugins. Learn basics first, add when pain emerges.

### Terminal-centric dev (full-stack)

* tpm-redux (manager)
* resurrect + continuum (persistence)
* sessionx (switching)

### Worktree-heavy workflow

* tpm-redux (manager)
* sessionx (fast switching)
* Consider: resurrect + continuum if reboots frequent

## Plugins to Revisit

Tracked for potential future adoption.

| Plugin                                                             | What it does                          |
| ------------------------------------------------------------------ | ------------------------------------- |
| [tmux-lazygit](https://github.com/Nybkox/tmux-lazygit)             | Lazygit popup integration             |
| [tmux-thumbs](https://github.com/fcsonline/tmux-thumbs)            | Vimium-style text selection           |
| [extrakto](https://github.com/laktak/extrakto)                     | Fuzzy find/copy from scrollback       |
| [tmux-smooth-scroll](https://github.com/azorng/tmux-smooth-scroll) | Animated scrolling (revisit mid-2026) |

## Sources

* [awesome-tmux](https://github.com/rothgar/awesome-tmux) - Curated list of tools, themes, plugins
* [tmux-plugins/list](https://github.com/tmux-plugins/list) - Plugin list (less maintained)
* [tpm-redux](https://github.com/RyanMacG/tpm-redux) - Maintained plugin manager
