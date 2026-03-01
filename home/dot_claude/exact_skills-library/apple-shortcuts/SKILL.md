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
```

All commands support `--json` for machine-readable output.

## Development Commands

`scut dev` groups all authoring, testing, and knowledge capture commands.

```bash
# Code generation
scut dev gen snippet <action>               # Generate rawAction() Cherri snippet
scut dev gen ref [output-file]              # Generate full action reference doc

# Compile + test
scut dev build <file.cherri>                # Compile (routes to cherri)
scut dev run <file.cherri>                  # Compile and run
scut dev try <identifier> --param k=v       # Quick-test an action

# Shortcut transfer
scut dev export <shortcut-name>             # Export installed shortcut as plist
scut dev import <file.shortcut>             # Import a .shortcut file

# Knowledge overlay
scut dev learnings status                   # Coverage report: verified vs uncurated
scut dev learnings mark-verified <action>   # Mark action as verified
scut dev learnings add-note <action> "text" # Add a gotcha note
scut dev learnings add-example <action>     # Add example from successful test
```

## Automations (Triggers)

`scut auto` manages automation triggers — the schedules that run shortcuts automatically.

```bash
scut auto list                      # List all automations
scut auto list --json               # Machine-readable output
scut auto show "Name"               # Full decoded trigger details
scut auto enable "Name"             # Enable trigger(s) for shortcut
scut auto disable "Name"            # Disable trigger(s)
scut auto delete "Name"             # Delete trigger(s) (with confirmation)

# Create time-of-day trigger
scut auto create "Name" --time 08:30                    # Daily at 8:30
scut auto create "Name" --time 09:00 --days weekdays    # Weekdays only
scut auto create "Name" --time 22:00 --days mon,fri     # Specific days
scut auto create "Name" --time 10:00 --prompt           # Ask before running
```

**Day options**: `daily` (default), `weekdays`, `weekends`, or comma-separated: `mon,tue,wed,thu,fri,sat,sun`

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
