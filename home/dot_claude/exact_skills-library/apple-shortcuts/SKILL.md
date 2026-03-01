---
name: apple-shortcuts
description: Use when working with Apple Shortcuts on macOS/iOS - discovering actions, extension apps, running shortcuts from CLI, or integrating with automation workflows.
---

# Apple Shortcuts

Use `scut` for all Shortcuts development. Run `scut --help` for the full command list.

## Quick Reference

```bash
scut apps                           # List apps with action counts
scut actions [app]                  # List actions (filter by app)
scut search <term>                  # Full-text search actions
scut params <action>                # Show parameters + knowledge
scut identifier <display-name>     # Display name → action ID
scut cherri <action>                # Generate rawAction() snippet
scut scan                           # Coverage report: verified vs uncurated
scut community                      # Dev community resources + references
```

All commands support `--json` for machine-readable output.

## Development Commands

`scut dev` groups all authoring/debugging commands for building shortcuts from code.

```bash
scut dev build <file.cherri>            # Compile (routes to cherri)
scut dev run <file.cherri>              # Compile and run
scut dev try <identifier> --param k=v   # Quick-test an action
scut dev dump <shortcut-name>           # Export installed shortcut as plist
scut dev import <file.shortcut>         # Import a .shortcut file
```

## Running Shortcuts from CLI

```bash
shortcuts list                      # List all shortcuts
shortcuts run "My Shortcut"         # Run by name
shortcuts run "My Shortcut" <<< "input"  # Run with input
```

## Shortcuts Storage

```
~/Library/Shortcuts/Shortcuts.sqlite     # Shortcut definitions
~/Library/Shortcuts/ToolKit/             # Action database (queried by scut)
```

Requires **Full Disk Access** for your terminal app.

## macOS Signing Requirement

macOS will not import unsigned shortcuts. Use `scut dev build` (default signs via macOS/AppleID).

## Integration with Cherri

REQUIRED SUB-SKILL: cherri — for writing shortcuts as code.

## Database Schema Reference

See [reference/database-schema.md](./reference/database-schema.md) for advanced SQL queries.

## Wrapped iOS Apps on Mac

See [reference/wrapped-ios-apps.md](./reference/wrapped-ios-apps.md) for iOS compatibility mode on Apple Silicon.
