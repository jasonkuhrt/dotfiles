#!/bin/bash
set -euo pipefail

source "$DOTFILES_ROOT/scripts/lib/helpers.sh"

[[ "$OSTYPE" == darwin* ]] || exit 0

header "Wi-Fi auto-rejoin"

# A LaunchAgent that keeps home/.local/bin/wifi-autorejoin running, so
# Wi-Fi comes back on its own after the driver's reset bursts.
label="com.jasonkuhrt.wifi-autorejoin"
script="$DOTFILES_ROOT/home/.local/bin/wifi-autorejoin"
link="$HOME/.local/bin/wifi-autorejoin"
plist="$HOME/Library/LaunchAgents/$label.plist"
logs="$HOME/Library/Logs/wifi-autorejoin"

mkdir -p "$HOME/.local/bin" "$HOME/Library/LaunchAgents" "$logs"
if [ ! -e "$link" ] && [ ! -L "$link" ]; then
    ln -s "$script" "$link"
    task "wifi-autorejoin linked into ~/.local/bin"
elif [ "$link" -ef "$script" ]; then
    skip "wifi-autorejoin link"
else
    warn "Existing wifi-autorejoin is not this script: $link"
    exit 1
fi

desired=$(cat <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>$label</string>
    <key>ProgramArguments</key>
    <array>
        <string>/bin/bash</string>
        <string>$link</string>
    </array>
    <key>KeepAlive</key>
    <true/>
    <key>RunAtLoad</key>
    <true/>
    <key>ProcessType</key>
    <string>Background</string>
    <key>StandardOutPath</key>
    <string>$logs/wifi-autorejoin.log</string>
    <key>StandardErrorPath</key>
    <string>$logs/wifi-autorejoin.error.log</string>
</dict>
</plist>
PLIST
)

domain="gui/$(id -u)"
if [ -f "$plist" ] && [ "$(cat "$plist")" = "$desired" ] && launchctl print "$domain/$label" >/dev/null 2>&1; then
    skip "$label"
    exit 0
fi

printf '%s\n' "$desired" > "$plist"
launchctl bootout "$domain/$label" >/dev/null 2>&1 || true
launchctl bootstrap "$domain" "$plist"
task "$label loaded (log: $logs/wifi-autorejoin.log)"
