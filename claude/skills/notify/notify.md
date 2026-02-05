---
name: notify
description: Send macOS notifications with custom icons, action buttons, and Focus Mode bypass. Use when skills need to alert the user, when the user asks to "send notification", "notify me", or when composing notification-aware workflows.
---

# macOS Notifications via yo

Send persistent macOS notifications from Claude Code. Notifications stay visible until clicked.

## Quick Usage

```bash
# Basic notification
~/.claude/skills/notify/send.sh "Title" "Message"

# With all options
~/.claude/skills/notify/send.sh \
  --title "Build Complete" \
  --subtitle "All tests passed" \
  --info "Duration: 2m 34s" \
  --icon claude \
  --button "Open" \
  --button-action "/Applications/Ghostty.app" \
  --sound "Glass" \
  --bypass-focus
```

## Parameters

| Parameter     | Flag                    | Description                         | Required |
| ------------- | ----------------------- | ----------------------------------- | -------- |
| Title         | `--title`, `-t`         | Main notification title             | Yes      |
| Subtitle      | `--subtitle`, `-s`      | Secondary text below title          | No       |
| Info          | `--info`, `-n`          | Third line of text (smaller)        | No       |
| Icon          | `--icon`, `-i`          | Icon name or path (see Icons below) | No       |
| Action Button | `--button`, `-b`        | Add button with this label          | No       |
| Button Action | `--button-action`, `-a` | App path to open on button click    | No       |
| Button Script | `--button-script`, `-B` | Bash command to run on button click | No       |
| Cancel Label  | `--cancel-label`, `-o`  | Custom cancel button text           | No       |
| Sound         | `--sound`, `-z`         | Sound name or "None"                | No       |
| Bypass Focus  | `--bypass-focus`, `-d`  | Show even in Do Not Disturb         | No       |
| Content Image | `--content-image`, `-c` | Large image in notification body    | No       |

## Icons

The `--icon` parameter accepts:

| Value                | Description                            |
| -------------------- | -------------------------------------- |
| `claude`             | Claude app icon (default if installed) |
| `ghostty`            | Ghostty terminal icon                  |
| `zed`                | Zed editor icon                        |
| `/path/to/icon.icns` | Custom icon file (icns or png)         |

**System icons** in `/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/`:

- `AlertNoteIcon.icns` - Yellow warning
- `AlertStopIcon.icns` - Red stop sign
- `ToolbarInfo.icns` - Blue info
- `GenericApplicationIcon.icns` - Generic app

## Sounds

Available sounds in `/System/Library/Sounds/`:

- `Basso`, `Blow`, `Bottle`, `Frog`, `Funk`
- `Glass`, `Hero`, `Morse`, `Ping`, `Pop`
- `Purr`, `Sosumi`, `Submarine`, `Tink`
- `None` - No sound

## Examples

### Simple alert

```bash
~/.claude/skills/notify/send.sh "Task Complete" "Your build finished successfully"
```

### With action button that opens an app

```bash
~/.claude/skills/notify/send.sh \
  --title "PR Ready for Review" \
  --subtitle "Feature: Add user authentication" \
  --button "Open GitHub" \
  --button-action "/Applications/Safari.app"
```

### With action button that runs a script

```bash
~/.claude/skills/notify/send.sh \
  --title "Deploy Ready" \
  --subtitle "Staging environment" \
  --button "Deploy Now" \
  --button-script "cd /app && ./deploy.sh"
```

### Bypass Focus Mode with custom icon

```bash
~/.claude/skills/notify/send.sh \
  --title "Urgent: Server Down" \
  --subtitle "Production API not responding" \
  --icon "/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/AlertStopIcon.icns" \
  --bypass-focus \
  --sound "Basso"
```

## For Skill Authors

To send notifications from your skill:

```bash
# Source the notification helper
source ~/.claude/skills/notify/send.sh

# Or call directly
~/.claude/skills/notify/send.sh --title "Your Title" --subtitle "Your message"
```

### Claude Code Hook Integration

The `Notification` hook in `~/.claude/settings.json` automatically uses this system:

```json
{
  "hooks": {
    "Notification": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/scripts/notify-ghostty.sh"
          }
        ]
      }
    ]
  }
}
```

Hook input JSON fields available:

- `title` - Notification title (e.g., "Permission needed")
- `message` - Main message text
- `notification_type` - Type: `permission_prompt`, `idle_prompt`, `auth_success`, `elicitation_dialog`
- `session_id` - Current session ID
- `cwd` - Working directory

## Technical Details

**Backend**: [yo](https://github.com/sheagcraig/yo) - macOS notification tool
**Location**: `~/Applications/yo.app`
**Installed via**: dotfiles sync script

**Limitations**:

- yo's icon shows alongside custom icon (macOS limitation)
- Banner mode (`-m`) does not work (yo bug)
- Action buttons only work if notification is clicked (not on auto-dismiss)

## Troubleshooting

**Notifications not showing?**

1. Check yo is installed: `ls ~/Applications/yo.app`
2. Allow yo through Focus Mode: System Settings → Focus → Allowed Apps → Add "yo"
3. Restart Notification Center: `killall NotificationCenter`

**Custom icon not showing?**

- Icon must be `.icns` or `.png` format
- Path must be absolute
- yo's own icon still appears small alongside your icon (macOS limitation)
