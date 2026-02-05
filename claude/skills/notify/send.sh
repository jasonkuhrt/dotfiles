#!/bin/bash
#
# send.sh - Send macOS notifications via yo
#
# Usage:
#   send.sh "Title" "Subtitle"
#   send.sh --title "Title" --subtitle "Sub" --icon claude
#
# See ~/.claude/skills/notify/notify.md for full documentation
#

set -euo pipefail

YO_BIN="$HOME/Applications/yo.app/Contents/MacOS/yo"

# Icon shortcuts
resolve_icon() {
  local icon="$1"
  case "$icon" in
    claude)
      echo "/Applications/Claude.app/Contents/Resources/electron.icns"
      ;;
    ghostty)
      echo "/Applications/Ghostty.app/Contents/Resources/AppIcon.icns"
      ;;
    zed)
      echo "/Applications/Zed.app/Contents/Resources/AppIcon.icns"
      ;;
    warning|alert)
      echo "/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/AlertNoteIcon.icns"
      ;;
    error|stop)
      echo "/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/AlertStopIcon.icns"
      ;;
    info)
      echo "/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/ToolbarInfo.icns"
      ;;
    success|check)
      echo "/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/ToolbarFavoritesIcon.icns"
      ;;
    *)
      # Assume it's a path
      echo "$icon"
      ;;
  esac
}

# Default values
TITLE=""
SUBTITLE=""
INFO=""
ICON=""
BUTTON=""
BUTTON_ACTION=""
BUTTON_SCRIPT=""
CANCEL_LABEL=""
SOUND=""
BYPASS_FOCUS=false
CONTENT_IMAGE=""

# Parse arguments
while [[ $# -gt 0 ]]; do
  case "$1" in
    -t|--title)
      TITLE="$2"
      shift 2
      ;;
    -s|--subtitle)
      SUBTITLE="$2"
      shift 2
      ;;
    -n|--info)
      INFO="$2"
      shift 2
      ;;
    -i|--icon)
      ICON="$2"
      shift 2
      ;;
    -b|--button)
      BUTTON="$2"
      shift 2
      ;;
    -a|--button-action)
      BUTTON_ACTION="$2"
      shift 2
      ;;
    -B|--button-script)
      BUTTON_SCRIPT="$2"
      shift 2
      ;;
    -o|--cancel-label)
      CANCEL_LABEL="$2"
      shift 2
      ;;
    -z|--sound)
      SOUND="$2"
      shift 2
      ;;
    -d|--bypass-focus)
      BYPASS_FOCUS=true
      shift
      ;;
    -c|--content-image)
      CONTENT_IMAGE="$2"
      shift 2
      ;;
    -*)
      echo "Unknown option: $1" >&2
      exit 1
      ;;
    *)
      # Positional args: first is title, second is subtitle
      if [[ -z "$TITLE" ]]; then
        TITLE="$1"
      elif [[ -z "$SUBTITLE" ]]; then
        SUBTITLE="$1"
      else
        INFO="$1"
      fi
      shift
      ;;
  esac
done

# Validate required args
if [[ -z "$TITLE" ]]; then
  echo "Error: --title is required" >&2
  echo "Usage: send.sh --title \"Title\" [--subtitle \"Sub\"] [--icon claude]" >&2
  exit 1
fi

# Check yo is installed
if [[ ! -x "$YO_BIN" ]]; then
  echo "Error: yo not installed at $YO_BIN" >&2
  echo "Run dotfiles sync to install: ~/projects/jasonkuhrt/dotfiles/sync" >&2
  exit 1
fi

# Build yo command
YO_ARGS=(-t "$TITLE")

[[ -n "$SUBTITLE" ]] && YO_ARGS+=(-s "$SUBTITLE")
[[ -n "$INFO" ]] && YO_ARGS+=(-n "$INFO")

if [[ -n "$ICON" ]]; then
  RESOLVED_ICON=$(resolve_icon "$ICON")
  [[ -f "$RESOLVED_ICON" ]] && YO_ARGS+=(-i "$RESOLVED_ICON")
fi

[[ -n "$BUTTON" ]] && YO_ARGS+=(-b "$BUTTON")
[[ -n "$BUTTON_ACTION" ]] && YO_ARGS+=(-a "$BUTTON_ACTION")
[[ -n "$BUTTON_SCRIPT" ]] && YO_ARGS+=(-B "$BUTTON_SCRIPT")
[[ -n "$CANCEL_LABEL" ]] && YO_ARGS+=(-o "$CANCEL_LABEL")
[[ -n "$SOUND" ]] && YO_ARGS+=(-z "$SOUND")
[[ -n "$CONTENT_IMAGE" ]] && YO_ARGS+=(-c "$CONTENT_IMAGE")
$BYPASS_FOCUS && YO_ARGS+=(-d)

# Send notification (in background so script doesn't block)
"$YO_BIN" "${YO_ARGS[@]}" &

exit 0
