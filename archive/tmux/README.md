# tmux Archive

## Why tmux was removed

tmux was removed to simplify terminal workflow around native terminal features and a single session-persistence layer. The active stack now uses `zmx` for persistent sessions and `zsm` for interactive session management.

## Migration date

2026-03-05

## Original locations moved into this archive

- `home/dot_config/tmux/`
- `home/dot_config/gitmux/`
- `home/dot_config/starship-tmux.toml`
- `home/.chezmoiexternal.toml` (TPM source)
- `home/.chezmoiscripts/run_once_after_15-tmux-plugins.sh.tmpl`
- `home/dot_claude/exact_skills/tmux/`
- `home/dot_claude/exact_skills-library/tmux/`
- `research/ghostty-tmux-integration.md`

The archive preserves original directory structure under `archive/tmux/` to keep provenance clear.

## Replacement stack

- `zmx` — terminal session persistence
- `zsm` — TUI session manager for `zmx`

## Quick rollback

If tmux is needed again:

1. Restore archived files back to their original paths.
2. Re-add `tmux` (and any related packages) to `home/Brewfile`.
3. Reintroduce tmux shell/config/docs wiring in active dotfiles.
4. Run `chezmoi apply` and verify with `command -v tmux`.
