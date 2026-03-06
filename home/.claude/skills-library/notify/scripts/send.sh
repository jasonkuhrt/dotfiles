#!/bin/bash
# @describe Send macOS notifications via yo

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

# @cmd Send a notification
# @meta default-subcommand
# @option -t --title! <TEXT> Notification title
# @option -s --subtitle <TEXT> Subtitle text
# @option -n --info <TEXT> Informational text
# @option -i --icon=claude Icon name or path
# @option -b --button <TEXT> Button label
# @option -a --button-action <URL> Button action URL
# @option -B --button-script <CMD> Button script command
# @option -o --cancel-label <TEXT> Cancel button label
# @option -z --sound <NAME> Sound name
# @flag -d --bypass-focus Bypass focus mode
# @option -c --content-image <PATH> Content image path
send() {
  # Validate yo is installed
  if [[ ! -x "$YO_BIN" ]]; then
    echo "Error: yo not installed at $YO_BIN" >&2
    echo "Run dotfiles sync to install: ~/projects/jasonkuhrt/dotfiles/sync" >&2
    exit 1
  fi

  # Build yo command
  YO_ARGS=(-t "$argc_title")

  [[ -n "${argc_subtitle:-}" ]] && YO_ARGS+=(-s "$argc_subtitle")
  [[ -n "${argc_info:-}" ]] && YO_ARGS+=(-n "$argc_info")

  if [[ -n "${argc_icon:-}" ]]; then
    RESOLVED_ICON=$(resolve_icon "$argc_icon")
    [[ -f "$RESOLVED_ICON" ]] && YO_ARGS+=(-c "$RESOLVED_ICON")
  fi

  [[ -n "${argc_button:-}" ]] && YO_ARGS+=(-b "$argc_button")
  [[ -n "${argc_button_action:-}" ]] && YO_ARGS+=(-a "$argc_button_action")
  [[ -n "${argc_button_script:-}" ]] && YO_ARGS+=(-B "$argc_button_script")
  [[ -n "${argc_cancel_label:-}" ]] && YO_ARGS+=(-o "$argc_cancel_label")
  [[ -n "${argc_sound:-}" ]] && YO_ARGS+=(-z "$argc_sound")
  [[ -n "${argc_content_image:-}" ]] && YO_ARGS+=(-c "$argc_content_image")
  [[ -n "${argc_bypass_focus:-}" ]] && YO_ARGS+=(-d)

  # Send notification (in background so script doesn't block)
  "$YO_BIN" "${YO_ARGS[@]}" &
  exit 0
}

# @cmd Play a sound without visual notification
# @option -z --sound=Glass Sound name
sound() {
  local SOUND_FILE="/System/Library/Sounds/${argc_sound}.aiff"
  if [[ ! -f "$SOUND_FILE" ]]; then
    echo "Error: sound '${argc_sound}' not found at $SOUND_FILE" >&2
    exit 1
  fi
  afplay "$SOUND_FILE" &
  exit 0
}

# @cmd List available icon shortcuts
list_icons() {
  cat <<'EOF'
Apps:     claude, ghostty, zed, terminal, finder
Status:   warning, error, caution, info, success
Actions:  sync, trash, clock, gear, network, folder, file, lock, unlock, user, group
Custom:   /path/to/icon.icns or /path/to/icon.png
EOF
}

eval "$(argc --argc-eval "$0" "$@")"
