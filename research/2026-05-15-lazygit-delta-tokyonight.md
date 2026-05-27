# lazygit + delta + Tokyo Night — setup and a long debugging detour

_2026-05-15_

## Goal

Get syntax-highlighted diffs in lazygit, themed to match the existing
Tokyo Night lazygit UI.

## What landed

- `git-delta` confirmed installed; removed a **duplicate** `brew "git-delta"`
  entry from `scripts/data/Brewfile` (it was listed twice).
- delta wired as the lazygit pager — `git.pagers` list in
  `~/.config/lazygit/config.yml`: `pager: delta --paging=never`.
- **side-by-side made a per-pager opt-in**: `side-by-side` removed from the
  main `[delta]` section in `~/.gitconfig` and moved onto `core.pager`
  (`pager = delta --side-by-side`). Terminal `git diff` keeps two columns;
  lazygit renders unified/one-column. A value in the main `[delta]` section
  overrides features and cannot be turned off per-pager, so it had to leave
  that section entirely.
- **Tokyo Night theme**: `[delta "tokyonight"]` feature in `~/.gitconfig`
  (official `night`-variant colors from `folke/tokyonight.nvim`
  `extras/delta`), activated via `features = tokyonight`. Syntax theme:
  `tokyonight_night.tmTheme` installed to `~/.config/bat/themes/` and
  registered with `bat cache --build` — delta shares bat's theme cache.

## Facts worth keeping

- **lazygit config schema migrated `git.paging` (object) → `git.pagers`
  (list).** This is upstream lazygit (`TestPagerMigration`), not a fork
  quirk. lazygit auto-migrates the old key and **rewrites config.yml on
  startup**. Verify the current schema with `lazygit --config`. An unknown
  key is silently ignored — a wrong key disables the pager with no error.
- **delta only wraps lines in side-by-side mode.** `wrap_line` is called
  exclusively from `src/features/side_by_side.rs`. In unified mode delta
  emits full-length lines; `--width`, `wrap-max-lines`, and `max-line-length`
  (at default) do not shorten them.
- **lazygit's main diff view is hardcoded to wrap.** `pkg/gui/views.go`:
  `gui.Views.Main` is set `Wrap = true` in a loop with no config override.
  `wrapLinesInStagingView` applies only to the *staging* views, never
  `Main`. So long unified lines from delta get wrapped by lazygit itself,
  and no delta/gitconfig setting can stop it.
- Net consequence: turning off side-by-side (to kill the two-column view)
  also turned off delta's own wrapping, which shifted the wrapping job to
  lazygit's `Main` view. Living with that wrap for now. The only real fixes
  are a fork patch (`Main.Wrap = false`) or swapping the lazygit pager to
  `dunk pager --no-wrap` (dunk truncates long lines itself).
- delta does not wrap when its output is piped (non-TTY) — it only wraps
  to a real terminal. Testing wrap behaviour requires a PTY.
- `dunk` is `dunkdiff` (`github.com/amix/dunk`), a separate diff-review
  TUI. It is installed but **not** wired into lazygit's diff rendering —
  the `• N:` boxes and `Δ`/`N ⋮ N` chrome in lazygit are all **delta**
  (its hunk-header and file-header styling), not dunk.

## Process note

Too much of this session was spent guessing instead of reading source.
The decisive moves were all source/CLI checks: `lazygit --config` for the
schema, `git diff | delta` vs `dunk` to identify the renderer, and the
delta + lazygit Go source for the wrap behaviour. Check the tool's own
config dump / source before asserting how it behaves.
