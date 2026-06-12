#!/usr/bin/env bash
set -euo pipefail

cleanup() {
  printf '' | pbcopy
}
trap cleanup EXIT

open -a Passwords
sleep 0.5

state="$(
  osascript <<'OSA'
tell application "Passwords" to activate
delay 0.2
tell application "System Events"
  tell process "Passwords"
    try
      set _unlockField to text field 1 of group 1 of window 1
      return "locked"
    on error
      return "unlocked"
    end try
  end tell
end tell
OSA
)"

if [[ "$state" == "unlocked" ]]; then
  printf 'STATUS:already_unlocked\n'
  exit 0
fi

security find-generic-password -s "mac-login-password" -a "$USER" -w | pbcopy

osascript <<'OSA'
tell application "Passwords" to activate
delay 0.2
tell application "System Events"
  tell process "Passwords"
    set frontmost to true
    set unlockField to text field 1 of group 1 of window 1
    set focused of unlockField to true
  end tell
  delay 0.2
  key code 0 using command down
  delay 0.1
  key code 51
  delay 0.1
  keystroke (the clipboard)
  delay 1.0
  key code 36
end tell
OSA

sleep 0.5

osascript <<'OSA'
tell application "System Events"
  tell process "Passwords"
    try
      set _unlockField to text field 1 of group 1 of window 1
      return "STATUS:locked"
    on error
      return "STATUS:unlocked"
    end try
  end tell
end tell
OSA
