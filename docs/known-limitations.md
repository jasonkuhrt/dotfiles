# Known Limitations

Bugs, workarounds, and things to investigate.

## Starship: Redundant Prompt in Git Worktrees

When using git worktrees where the directory name matches the branch name, the prompt shows both redundantly:

```
feat-HEA-3173-unreads-filter-dms feat/HEA-3173-unreads-filter-dms ❯
```

Starship cannot conditionally hide the `directory` module based on worktree detection. The `when` clause only works on custom modules, not built-ins.

**Workarounds (all have tradeoffs):**

* `repo_root_format = ''` — hides directory at all repo roots (loses repo name everywhere)
* `substitutions` — fragile pattern matching
* Multiple config files with `STARSHIP_CONFIG` env var per session

**Tracking:** [starship/starship#7219](https://github.com/starship/starship/issues/7219)

**Related issues:**

* [#5533](https://github.com/starship/starship/issues/5533) — Conditionally disable modules via env
* [#6604](https://github.com/starship/starship/issues/6604) — `truncate_to_repo` with worktrees
* [#4439](https://github.com/starship/starship/pull/4439) — PR for env-based config overrides (open since 2022)

## Claude Code: settings.json Can't Be Symlinked

Claude Code has multiple bugs that prevent symlinked `settings.json` from working properly:

* Permissions not recognized from symlinked files
* Atomic writes replace symlinks with regular files
* Performance degradation with symlinked settings

**Workaround:** `settings.json` is not synced. CC owns `~/.claude/settings.json` at runtime. The sync script creates a local convenience symlink (gitignored) from `./claude/settings.json → ~/.claude/settings.json` for easy editing from the dotfiles workspace.

See [claude/README.md](../claude/README.md) for details.

**Tracking:**

* [anthropics/claude-code#3575](https://github.com/anthropics/claude-code/issues/3575) — Symlinked settings.json permission failures
* [anthropics/claude-code#764](https://github.com/anthropics/claude-code/issues/764) — Stow-symlinked ~/.claude dir not detected
* [anthropics/claude-code#18160](https://github.com/anthropics/claude-code/issues/18160) — Symlinked settings.json permissions ignored

## Beads: export-state/ Not in Default .gitignore

The `export-state/` directory created by beads hooks contains machine-specific paths and timestamps but isn't included in the default `.gitignore` template from `bd init`.

**Workaround:** Manually added `export-state/` to `.beads/.gitignore`.

**Tracking:** [steveyegge/beads#1319](https://github.com/steveyegge/beads/issues/1319)

---

# TODO

## CleanShot X Preferences Sync

Explore syncing CleanShot settings across machines. Known locations:

* `~/Library/Preferences/pl.maketheweb.cleanshotx.plist` (defaults)
* `~/Library/Application Support/CleanShot X/` (possibly)

Options to investigate:

1. Export plist and restore via `defaults import` in sync script
2. Symlink the plist (may cause issues if app is running)

## Tools to Evaluate

| Tool       | What                                               | Link                                                 |
| ---------- | -------------------------------------------------- | ---------------------------------------------------- |
| mpv        | Minimalist video player (scriptable, CLI-friendly) | [mpv.io](https://mpv.io/)                            |
| circumflex | Hacker News TUI                                    | [github](https://github.com/bensadeh/circumflex)     |
| libcaca    | ASCII art graphics library                         | [github](https://github.com/cacalabs/libcaca)        |
| chafa      | Terminal image viewer (sixel, kitty, iterm2)       | [hpjansson.org](https://hpjansson.org/chafa/)        |
| browsh     | Text-based browser (renders real web pages)        | [brow.sh](https://www.brow.sh/)                      |
| newsboat   | RSS/Atom feed reader for terminal                  | [newsboat.org](https://newsboat.org/)                |
| kew        | Terminal music player                              | [github](https://github.com/ravachol/kew)            |
| fastfetch  | Faster neofetch alternative                        | [github](https://github.com/fastfetch-cli/fastfetch) |
| btop       | Resource monitor (prettier than btm?)              | [github](https://github.com/aristocratos/btop)       |
| helix      | Modal editor (consider vs nvim)                    | [github](https://github.com/helix-editor/helix)      |
| yazi       | Terminal file manager (blazing fast)               | [github](https://github.com/sxyazi/yazi)             |

https://www.morphllm.com
