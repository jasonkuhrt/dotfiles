---
name: notify
description: Use when sending macOS notifications, alerting the user about completed tasks, or when other skills need to notify about events. Triggers on "send notification", "notify me", "alert when done".
---

# macOS Notifications

Send macOS notifications — either persistent visual alerts (yo) or sound-only chimes (afplay).

## Quick Reference

```bash
# Sound-only (no visual, auto-dismisses)
scripts/send.sh --sound-only
scripts/send.sh --sound-only --sound Hero

# Visual notification (persistent until clicked)
scripts/send.sh --title "Title" --subtitle "Message" --icon claude --bypass-focus
```

| Flag              | Short | Description                        |
| ----------------- | ----- | ---------------------------------- |
| `--sound-only`    | `-S`  | Chime only, no visual notification |
| `--title`         | `-t`  | Main title (required for visual)   |
| `--subtitle`      | `-s`  | Secondary text                     |
| `--info`          | `-n`  | Third line (smaller)               |
| `--icon`          | `-i`  | Icon shortcut or path              |
| `--button`        | `-b`  | Action button label                |
| `--button-action` | `-a`  | App to open on click               |
| `--button-script` | `-B`  | Bash command on click              |
| `--sound`         | `-z`  | Sound name or "None"               |
| `--bypass-focus`  | `-d`  | Cut through DND                    |

## Modes

**Sound-only** (`--sound-only`): Plays a system sound via `afplay`. No visual residue, no Notification Center entry. Defaults to `Glass` sound; override with `--sound <name>`.

**Visual** (default): Persistent notification via yo. Stays in Notification Center until clicked.

## Icons

Shortcuts: `claude`, `ghostty`, `zed`, `warning`, `error`, `info`, `success`

Or absolute path to `.icns`/`.png` file.

## Sounds

`Basso`, `Blow`, `Bottle`, `Frog`, `Funk`, `Glass`, `Hero`, `Morse`, `Ping`, `Pop`, `Purr`, `Sosumi`, `Submarine`, `Tink`, `None`

## Examples

```bash
# Sound-only chime (default Glass sound)
scripts/send.sh --sound-only

# Sound-only with custom sound
scripts/send.sh --sound-only --sound Hero

# Simple visual
scripts/send.sh "Build Complete" "All tests passed"

# With action button
scripts/send.sh --title "PR Ready" --subtitle "Feature branch" --button "Open" --button-action "/Applications/Safari.app"

# Urgent visual alert
scripts/send.sh --title "Server Down" --icon error --bypass-focus --sound Basso
```

## Requirements

* yo installed at `~/Applications/yo.app` (via dotfiles sync) — for visual mode only
* For Focus Mode bypass: System Settings → Focus → Allowed Apps → Add "yo"
