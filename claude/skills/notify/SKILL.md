---
name: notify
description: Use when sending macOS notifications, alerting the user about completed tasks, or when other skills need to notify about events. Triggers on "send notification", "notify me", "alert when done".
---

# macOS Notifications

Send persistent macOS notifications via yo. Notifications stay visible until clicked.

## Quick Reference

```bash
scripts/send.sh --title "Title" --subtitle "Message" --icon claude --bypass-focus
```

| Flag              | Short | Description           |
| ----------------- | ----- | --------------------- |
| `--title`         | `-t`  | Main title (required) |
| `--subtitle`      | `-s`  | Secondary text        |
| `--info`          | `-n`  | Third line (smaller)  |
| `--icon`          | `-i`  | Icon shortcut or path |
| `--button`        | `-b`  | Action button label   |
| `--button-action` | `-a`  | App to open on click  |
| `--button-script` | `-B`  | Bash command on click |
| `--sound`         | `-z`  | Sound name or "None"  |
| `--bypass-focus`  | `-d`  | Cut through DND       |

## Icons

Shortcuts: `claude`, `ghostty`, `zed`, `warning`, `error`, `info`, `success`

Or absolute path to `.icns`/`.png` file.

## Sounds

`Basso`, `Blow`, `Bottle`, `Frog`, `Funk`, `Glass`, `Hero`, `Morse`, `Ping`, `Pop`, `Purr`, `Sosumi`, `Submarine`, `Tink`, `None`

## Examples

```bash
# Simple
scripts/send.sh "Build Complete" "All tests passed"

# With action button
scripts/send.sh --title "PR Ready" --subtitle "Feature branch" --button "Open" --button-action "/Applications/Safari.app"

# Urgent alert
scripts/send.sh --title "Server Down" --icon error --bypass-focus --sound Basso
```

## Requirements

* yo installed at `~/Applications/yo.app` (via dotfiles sync)
* For Focus Mode bypass: System Settings → Focus → Allowed Apps → Add "yo"
