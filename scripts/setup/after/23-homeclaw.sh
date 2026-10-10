#!/bin/bash
set -euo pipefail

source "$DOTFILES_ROOT/scripts/lib/helpers.sh"

[[ "$OSTYPE" == darwin* ]] || exit 0

header "HomeClaw (HomeKit CLI)"

# The Brewfile's Mac App Store entry owns the app. Its CLI ships inside the
# bundle, so put it on PATH without copying a binary that the App Store updates.
app_cli="/Applications/HomeClaw.app/Contents/MacOS/homeclaw-cli"
link="$HOME/.local/bin/homeclaw-cli"

if [ ! -x "$app_cli" ]; then
    warn "Install HomeClaw from the Brewfile first."
    exit 1
fi

mkdir -p "$HOME/.local/bin"
if [ ! -e "$link" ] && [ ! -L "$link" ]; then
    ln -s "$app_cli" "$link"
    task "homeclaw-cli linked into ~/.local/bin"
elif [ "$link" -ef "$app_cli" ]; then
    skip "homeclaw-cli"
else
    warn "Existing homeclaw-cli is not this installation: $link"
    exit 1
fi

# HomeKit access is granted through a prompt that macOS only shows to a
# foreground app. A background first launch is recorded as a refusal, and
# `just homeclaw-permission-reset` recovers from that.
if ! pgrep -x HomeClaw >/dev/null; then
    info "Open HomeClaw once in the foreground and allow HomeKit access."
fi
