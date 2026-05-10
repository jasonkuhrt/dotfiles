#!/usr/bin/env bash
set -euo pipefail

service="${1:?usage: credential-cache-save-selected-passwords-entry.sh <service>}"
keychain_service="agent-credential:${service}"

cleanup() {
  printf '' | pbcopy
}
trap cleanup EXIT

copy_menu_item() {
  local item="$1"
  osascript <<OSA
tell application "Passwords" to activate
delay 0.2
tell application "System Events"
  tell process "Passwords"
    set frontmost to true
    click menu item "$item" of menu "Edit" of menu bar 1
  end tell
end tell
return "STATUS:copied"
OSA
}

copy_menu_item "Copy User Name"
sleep 0.2
username="$(pbpaste)"

if [[ -z "$username" ]]; then
  printf 'STATUS:error\n'
  printf 'MESSAGE:Passwords.app did not copy a username for the selected entry.\n'
  exit 1
fi

copy_menu_item "Copy Password"
sleep 0.2
password="$(pbpaste)"

if [[ -z "$password" ]]; then
  printf 'STATUS:error\n'
  printf 'MESSAGE:Passwords.app did not copy a password for the selected entry.\n'
  exit 1
fi

security add-generic-password \
  -s "$keychain_service" \
  -a "$username" \
  -w "$password" \
  -T /usr/bin/security \
  -U \
  -l "Agent credential cache: ${service}" >/dev/null

printf 'STATUS:saved\n'
printf 'SERVICE:%s\n' "$keychain_service"
printf 'USERNAME:%s\n' "$username"
