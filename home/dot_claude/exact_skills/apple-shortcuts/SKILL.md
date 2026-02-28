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
scut dump <shortcut-name>           # Export installed shortcut as plist
scut scan                           # Coverage report: verified vs uncurated
scut community                      # Dev community resources + references
scut build <file.cherri>            # Compile (routes to cherri)
scut try <identifier> --param k=v   # Quick-test an action
```

All commands support `--json` for machine-readable output.

## Managing Installed Shortcuts

`scut manage` provides full lifecycle management. Uses AppleScript for folder/create operations (correctly manages Apple's CRDT sync blob) and SQLite for everything else.

```bash
# List & inspect
scut manage list                    # List installed shortcuts
scut manage list --folders          # List folders
scut manage list -f "My Folder"    # Filter by folder
scut manage list --json             # Machine-readable output
scut manage history                 # Show run history

# Create & modify
scut manage create "Name"           # Create empty shortcut (AppleScript)
scut manage rename "Old" "New"      # Rename (SQLite)
scut manage icon "Name" --color blue --glyph 59790  # Change icon
scut manage phrase "Name" "Hey Siri, do X"  # Set Siri phrase
scut manage phrase "Name"           # Clear Siri phrase
scut manage inject "Name" actions.plist     # Inject actions from plist

# Organize
scut manage move "Name" "Folder"    # Move to folder (AppleScript)
scut manage folder create "Name"    # Create folder (AppleScript)
scut manage folder delete "Name"    # Delete folder (AppleScript)
scut manage folder list             # List folders

# Delete & cleanup
scut manage delete "Name"           # Tombstone a shortcut
scut manage delete-matching "Test%" # Batch delete by pattern (SQL LIKE)
scut manage cleanup                 # Purge tombstoned + orphaned rows
```

### Running installed shortcuts

```bash
shortcuts run "My Shortcut"             # Run by name (macOS built-in)
shortcuts run "My Shortcut" <<< "input" # Run with stdin input
```

Note: `scut run` compiles `.cherri` files — use the macOS `shortcuts` command for running installed shortcuts by name.

## Shortcuts Storage

```
~/Library/Shortcuts/Shortcuts.sqlite     # Shortcut definitions
~/Library/Shortcuts/ToolKit/             # Action database (queried by scut)
```

Requires **Full Disk Access** for your terminal app.

## macOS Signing Requirement

macOS will not import unsigned shortcuts. Use `scut build` (default signs via macOS/AppleID).

## Integration with Cherri

REQUIRED SUB-SKILL: cherri — for writing shortcuts as code.

## Database Schema Reference

See [reference/database-schema.md](./reference/database-schema.md) for advanced SQL queries.

## Wrapped iOS Apps on Mac

See [reference/wrapped-ios-apps.md](./reference/wrapped-ios-apps.md) for iOS compatibility mode on Apple Silicon.
