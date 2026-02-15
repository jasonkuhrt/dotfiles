# Zed Zen Mode Status

Research on Zed's zen mode / distraction-free editing capabilities.

## Current State (Feb 2026)

Zed has **partial** zen mode support via profiles, but true distraction-free mode is blocked by title bar issues.

## What's Available Now (v0.199+)

Via profiles, you can hide:
- Tab bar, breadcrumbs, quick actions
- Line numbers, folds, indent guides
- Scrollbar elements (git diff, diagnostics)
- Dock panels, sidebars
- Centered layout with configurable padding

## What's Still Missing

1. **Title bar hiding** - PR #37428 was merged then **reverted** (Sep 2025) due to macOS rendering issues:
   - Native tabs disappeared when title bar hidden
   - Window control buttons overlapped with tabs
   - Team planning UI redesign that requires title bar

2. **Status bar hiding** - Still requested, no implementation

3. **Single toggle command** - No unified "zen mode" keybinding that toggles everything at once

## Key Issues to Watch

| Issue | Status | Reactions | Description |
|-------|--------|-----------|-------------|
| [#4382](https://github.com/zed-industries/zed/issues/4382) | Closed | - | Original zen mode request |
| [#5120](https://github.com/zed-industries/zed/issues/5120) | Open | 333+ | Hide title/status bar (main blocker) |
| [#36882](https://github.com/zed-industries/zed/discussions/36882) | Active | - | Profile-based zen mode workaround |
| [#37230](https://github.com/zed-industries/zed/discussions/37230) | Closed | - | "Full Zen" request, redirected to #36882 |

## Workaround: Focus Profile

Create a profile in `settings.json` that hides available elements:

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

Then toggle with `workspace::ActivateProfile` command.

## Comparison with nvim

nvim's zen-mode.nvim (folke) provides superior zen mode:
- Dims surrounding code (via twilight.nvim)
- Hides all UI chrome
- Centers content with configurable width
- Single toggle command

## Conclusion

For serious distraction-free writing/coding, nvim with zen-mode.nvim is currently better than Zed. Watch issue #5120 for title bar hiding progress.
