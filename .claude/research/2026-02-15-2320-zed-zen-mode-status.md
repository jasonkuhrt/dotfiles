# Zed Zen Mode Status

Research on Zed's zen mode / distraction-free editing capabilities.

**Last verified**: 2026-02-15

## Issue Status (Verified via `gh` CLI)

| Issue/PR | State | Title |
|----------|-------|-------|
| [#4382](https://github.com/zed-industries/zed/issues/4382) | CLOSED | Zen mode |
| [#5120](https://github.com/zed-industries/zed/issues/5120) | **OPEN** | Add options to hide title and status bar |
| [PR #37428](https://github.com/zed-industries/zed/pull/37428) | MERGED | Add setting to show/hide title bar |
| [PR #38756](https://github.com/zed-industries/zed/pull/38756) | MERGED | Revert "Add setting to show/hide title bar" |

## Current State (Feb 2026)

Zed has **partial** zen mode support via profiles, but true distraction-free mode is blocked by title bar issues.

### Title Bar Hiding: Added Then Reverted

- PR #37428 added title bar hiding
- PR #38756 **reverted** it due to macOS rendering issues:
  - Native tabs disappeared when title bar hidden
  - Window control buttons overlapped with tabs
  - Team planning UI redesign that requires title bar

**Result**: Title bar cannot currently be hidden.

## What's Available Now

Via settings profiles, you can hide:
- Tab bar, breadcrumbs, quick actions
- Line numbers, folds, indent guides
- Scrollbar elements (git diff, diagnostics)
- Dock panels, sidebars
- Centered layout with configurable padding

## What's Still Missing

1. **Title bar hiding** - Reverted, no current solution
2. **Status bar hiding** - Still requested in #5120
3. **Single toggle command** - No unified "zen mode" keybinding

## Workaround: Focus Profile

Create a profile in `settings.json`:

```json
{
  "profiles": {
    "focus": {
      "tab_bar": { "show": false },
      "toolbar": { "breadcrumbs": false, "quick_actions": false },
      "gutter": { "line_numbers": false, "folds": false },
      "indent_guides": { "enabled": false },
      "current_line_highlight": "none",
      "scrollbar": { "show": "never" },
      "centered_layout": { "left_padding": 0.25, "right_padding": 0.25 }
    }
  }
}
```

Toggle with `settings_profile_selector::Toggle` action.

**Limitation**: Title bar and status bar remain visible.

## Comparison with nvim

nvim's zen-mode.nvim (folke) provides superior zen mode:
- Dims surrounding code (via twilight.nvim)
- Hides all UI chrome
- Centers content with configurable width
- Single toggle command

## Community Solution (from #4382)

The community uses **profiles** as the zen mode workaround. @gldtn's config:

```json
"profiles": {
  "Focus": {
    "ui_font_size": 16,
    "buffer_font_size": 18,
    "buffer_line_height": { "custom": 2.0 },
    "tab_bar": { "show": false, "show_nav_history_buttons": false },
    "toolbar": { "breadcrumbs": false, "quick_actions": false },
    "gutter": { "line_numbers": false, "folds": false, "breakpoints": false, "runnables": false, "min_line_number_digits": 0 },
    "indent_guides": { "enabled": false },
    "current_line_highlight": "none",
    "scrollbar": { "show": "never", "cursors": false, "git_diff": false, "diagnostics": "none", "search_results": false, "selected_symbol": false }
  }
}
```

**No single-keybind solution exists.** People accept using the profile picker (`settings_profile_selector::Toggle`).

## Conclusion

For true distraction-free editing, nvim with zen-mode.nvim is currently better than Zed.

**Watch**: [#5120](https://github.com/zed-industries/zed/issues/5120) (OPEN) for title/status bar hiding progress.
