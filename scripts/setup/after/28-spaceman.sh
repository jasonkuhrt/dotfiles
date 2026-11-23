#!/bin/bash
set -euo pipefail

source "$DOTFILES_ROOT/scripts/lib/helpers.sh"

[[ "$OSTYPE" == darwin* ]] || exit 0
[[ "$(uname -m)" == arm64 ]] || exit 0

header "Spaceman (tiling window manager)"

# Not in the Brewfile: Homebrew's `spaceman` cask is a different app (a Spaces
# menu bar viewer). Anomaly ships this one as a notarized zip, and the app
# updates itself from Settings afterwards, so this script only does the first
# install and never replaces an existing bundle.
app="/Applications/Spaceman.app"
app_cli="$app/Contents/MacOS/spaceman"
link="$HOME/.local/bin/spaceman"
team="5NZ4Q7NXJ4"

if [ ! -d "$app" ]; then
    tmp="$(mktemp -d)"
    trap 'rm -rf "$tmp"' EXIT
    curl -fsSL "https://anoma.ly/spaceman/download/macos-arm64" -o "$tmp/Spaceman.zip"
    curl -fsSL "https://anoma.ly/spaceman/download/macos-arm64.sha256" -o "$tmp/Spaceman.zip.sha256"
    (cd "$tmp" && shasum -a 256 -c Spaceman.zip.sha256 >/dev/null)
    ditto -x -k "$tmp/Spaceman.zip" "$tmp/app"
    codesign --verify --deep --strict "$tmp/app/Spaceman.app"
    if ! codesign -dv "$tmp/app/Spaceman.app" 2>&1 | grep -q "^TeamIdentifier=$team$"; then
        warn "Spaceman download is not signed by Anomaly ($team)"
        exit 1
    fi
    spctl -a -t exec "$tmp/app/Spaceman.app"
    mv "$tmp/app/Spaceman.app" "$app"
    task "Spaceman installed to $app"
else
    skip "Spaceman app"
fi

mkdir -p "$HOME/.local/bin"
if [ ! -e "$link" ] && [ ! -L "$link" ]; then
    ln -s "$app_cli" "$link"
    task "spaceman CLI linked into ~/.local/bin"
elif [ "$link" -ef "$app_cli" ]; then
    skip "spaceman CLI"
else
    warn "Existing spaceman is not this installation: $link"
    exit 1
fi

# Accessibility access is granted by hand in the app's setup tour; tiling stays
# paused until then.
if ! pgrep -x spaceman-agent >/dev/null; then
    info "Open Spaceman once and finish its setup tour: open $app"
fi
