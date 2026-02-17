---
name: apple-shortcuts
description: Use when working with Apple Shortcuts on macOS/iOS - discovering actions, extension apps, running shortcuts from CLI, or integrating with automation workflows.
---

# Apple Shortcuts

Automation platform for macOS and iOS. Shortcuts can be created via GUI, Cherri (code), or imported.

## Running Shortcuts from CLI

```bash
# List all shortcuts
shortcuts list

# Run a shortcut by name
shortcuts run "My Shortcut"

# Run with text input
shortcuts run "My Shortcut" <<< "input text"

# Via URL scheme (works from any app)
open "shortcuts://run-shortcut?name=My%20Shortcut&input=text&text=Hello"
```

URL scheme parameters:
- `name`: Shortcut name (URL encoded)
- `input`: `text` or `clipboard`
- `text`: Actual input string

## Discovering Available Actions

macOS stores all Shortcuts actions in a ToolKit database:

```
~/Library/Shortcuts/ToolKit/Tools-prod.*.sqlite
```

Use the dotfiles script to explore:

```bash
cd ~/projects/jasonkuhrt/dotfiles/shortcuts

./analyze-shortcuts-actions.fish stats      # Action counts
./analyze-shortcuts-actions.fish vendors    # Third-party apps
./analyze-shortcuts-actions.fish actions raycast  # Actions for an app
./analyze-shortcuts-actions.fish search clipboard # Search by keyword
./analyze-shortcuts-actions.fish doc        # Generate reference doc
```

## Shortcuts Storage

```
~/Library/Shortcuts/Shortcuts.sqlite     # Shortcut definitions
~/Library/Shortcuts/ToolKit/             # Action database
```

Shortcuts are stored in SQLite with actions as binary plist blobs. Not meant for direct editing -- use Cherri for code-based shortcuts.

## Persistent Config

Use JSON in iCloud Drive instead of extension apps for config storage:

**Location:** `~/Library/Mobile Documents/com~apple~CloudDocs/dotfiles/shortcuts/config.json`

```bash
# CLI (fish)
shortcuts-config get                    # View all
shortcuts-config set currentProject foo # Set key
shortcuts-config get currentProject     # Get key
```

**In Shortcuts:** Use "Get File" / "Save File" pointing to `/dotfiles/shortcuts/config.json`

Prefer JSON over Data Jar -- gives CLI access (`jq`, `shortcuts-config`), version control, and no app dependency. See [DESIGN.md](./DESIGN.md) for full rationale.

## Extension Apps

See [reference/extension-apps.md](./reference/extension-apps.md) for the full table, installation instructions, and post-install steps.

## macOS Signing Requirement

**macOS will not import unsigned shortcuts.**

```bash
# Unsigned - syntax check only, won't import on macOS
cherri myshortcut.cherri --skip-sign

# Signed via macOS/AppleID (default)
cherri myshortcut.cherri

# Signed via RoutineHub service (if macOS signing fails)
cherri myshortcut.cherri --hubsign
```

Signed shortcuts contain `AppleIDValidationRecord` and `SigningPublicKey` in an AEA1 archive format (different from code signing - `codesign -dv` won't recognize them).

## Wrapped iOS Apps on Mac

See [reference/wrapped-ios-apps.md](./reference/wrapped-ios-apps.md) for details on iOS compatibility mode on Apple Silicon.

## Shortcuts Database Schema

See [reference/database-schema.md](./reference/database-schema.md) for advanced SQL queries against the ToolKit database.

## Integration with Cherri

REQUIRED SUB-SKILL: cherri -- for writing shortcuts as code, raw action syntax, and extension app patterns.

## Resources

- [Cherri](https://cherrilang.org) - Shortcuts programming language
- [Toolbox Pro](https://toolboxpro.app) - Global variables, menus, device info
- [Actions](https://sindresorhus.com/actions) - 180+ extra actions (free)
