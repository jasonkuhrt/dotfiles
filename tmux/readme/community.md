# Community Tools

Essential ecosystem tools. Install via [tpm](https://github.com/tmux-plugins/tpm) (tmux plugin manager).

## Plugin Manager

| Tool                                       | What                                           |
| ------------------------------------------ | ---------------------------------------------- |
| [tpm](https://github.com/tmux-plugins/tpm) | Plugin manager for tmux (like Fisher for fish) |

Note: tpm is [effectively abandoned](https://github.com/tmux-plugins/tpm/issues/318) (last merge Feb 2023, 100+ open issues). Still works, but alternatives exist:

* [tpm-redux](https://github.com/RyanMacG/tpm-redux) - maintained fork, drop-in replacement
* Manual plugin management (clone to `~/.tmux/plugins/`, source in config)

## Session Persistence

| Tool                                                             | What                                          |
| ---------------------------------------------------------------- | --------------------------------------------- |
| [tmux-resurrect](https://github.com/tmux-plugins/tmux-resurrect) | Save/restore sessions across system restarts  |
| [tmux-continuum](https://github.com/tmux-plugins/tmux-continuum) | Auto-save every 15 min (works with resurrect) |

Without these, a reboot kills all sessions. With them, you restore exactly where you were - windows, panes, even vim sessions.

## Session Management

| Tool                                                                           | What                                   |
| ------------------------------------------------------------------------------ | -------------------------------------- |
| [tmux-sessionx](https://github.com/omerxx/tmux-sessionx)                       | Fuzzy session picker with fzf + zoxide |
| [tmux-fzf-session-switch](https://github.com/thuanOwa/tmux-fzf-session-switch) | Simpler fzf session switcher           |

## Clipboard

| Tool                                                   | What                               |
| ------------------------------------------------------ | ---------------------------------- |
| [tmux-yank](https://github.com/tmux-plugins/tmux-yank) | Copy from tmux to system clipboard |

## More

Full plugin list: [tmux-plugins/list](https://github.com/tmux-plugins/list)
