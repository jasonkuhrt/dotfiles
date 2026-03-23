# Plan Mode

## Do Not Auto-Exit

After writing a plan file, NEVER call `ExitPlanMode` in the same turn. End your turn with a text message indicating the plan is ready for review. The user reviews plans in Plannotator and needs a chance to annotate before approval.

## Why

`defaultMode: "bypassPermissions"` auto-approves all tool calls including `ExitPlanMode`. Calling it immediately skips the user's review loop. The `PermissionRequest` hook cannot intercept this because it only fires when a permission dialog would be shown — bypass mode suppresses all dialogs.
