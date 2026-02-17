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

CORE_TYPES="/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources"

# Icon shortcuts
resolve_icon() {
  local icon="$1"
  case "$icon" in
    # Apps
    claude)      echo "/Applications/Claude.app/Contents/Resources/electron.icns" ;;
    ghostty)     echo "/Applications/Ghostty.app/Contents/Resources/AppIcon.icns" ;;
    zed)         echo "/Applications/Zed.app/Contents/Resources/AppIcon.icns" ;;
    terminal)    echo "/System/Applications/Utilities/Terminal.app/Contents/Resources/Terminal.icns" ;;
    finder)      echo "$CORE_TYPES/FinderIcon.icns" ;;
    # Status
    warning|alert)   echo "$CORE_TYPES/AlertNoteIcon.icns" ;;
    error|stop)      echo "$CORE_TYPES/AlertStopIcon.icns" ;;
    caution)         echo "$CORE_TYPES/AlertCautionBadgeIcon.icns" ;;
    info)            echo "$CORE_TYPES/ToolbarInfo.icns" ;;
    success|check)   echo "$CORE_TYPES/ToolbarFavoritesIcon.icns" ;;
    # Actions
    sync)        echo "$CORE_TYPES/Sync.icns" ;;
    trash)       echo "$CORE_TYPES/FullTrashIcon.icns" ;;
    clock)       echo "$CORE_TYPES/Clock.icns" ;;
    gear)        echo "$CORE_TYPES/ToolbarAdvanced.icns" ;;
    network)     echo "$CORE_TYPES/GenericNetworkIcon.icns" ;;
    folder)      echo "$CORE_TYPES/GenericFolderIcon.icns" ;;
    file)        echo "$CORE_TYPES/GenericDocumentIcon.icns" ;;
    lock)        echo "$CORE_TYPES/LockedIcon.icns" ;;
    unlock)      echo "$CORE_TYPES/UnlockedIcon.icns" ;;
    user)        echo "$CORE_TYPES/UserIcon.icns" ;;
    group)       echo "$CORE_TYPES/GroupIcon.icns" ;;
    *)
      # Assume it's a path
      echo "$icon"
      ;;
  esac
}

list_icons() {
  cat <<'EOF'
Apps:     claude, ghostty, zed, terminal, finder
Status:   warning, error, caution, info, success
Actions:  sync, trash, clock, gear, network, folder, file, lock, unlock, user, group
Custom:   /path/to/icon.icns or /path/to/icon.png
EOF
}

# Default values
TITLE=""
SUBTITLE=""
INFO=""
ICON="claude"  # Default to Claude icon
BUTTON=""
BUTTON_ACTION=""
BUTTON_SCRIPT=""
CANCEL_LABEL=""
SOUND=""
BYPASS_FOCUS=false
CONTENT_IMAGE=""
SOUND_ONLY=false

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
    -S|--sound-only)
      SOUND_ONLY=true
      shift
      ;;
    --list-icons)
      list_icons
      exit 0
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

# ── Sound-only mode: play a chime, no visual notification ──
if $SOUND_ONLY; then
  SOUND_NAME="${SOUND:-Glass}"
  SOUND_FILE="/System/Library/Sounds/${SOUND_NAME}.aiff"
  if [[ ! -f "$SOUND_FILE" ]]; then
    echo "Error: sound '$SOUND_NAME' not found at $SOUND_FILE" >&2
    exit 1
  fi
  afplay "$SOUND_FILE" &
  exit 0
fi

# ── Visual notification mode (yo) ──

# Validate required args
if [[ -z "$TITLE" ]]; then
  echo "Error: --title is required (or use --sound-only)" >&2
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

# Use content-image (-c) for custom icon - appears on right side of notification
# The -i flag only sets a secondary icon that yo displays, not the main visual
if [[ -n "$ICON" ]]; then
  RESOLVED_ICON=$(resolve_icon "$ICON")
  [[ -f "$RESOLVED_ICON" ]] && YO_ARGS+=(-c "$RESOLVED_ICON")
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
