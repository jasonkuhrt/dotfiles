#!/bin/bash
set -e

source "$DOTFILES_ROOT/scripts/lib/helpers.sh"

if [[ "$OSTYPE" != darwin* ]]; then
    exit 0
fi

header "imsg (Messages CLI)"

IMSG_BIN="/usr/local/bin/imsg"
IMSG_VERSION="v0.5.0"

if [ -f "$IMSG_BIN" ]; then
    skip "imsg (Messages CLI)"
else
    info "Installing imsg $IMSG_VERSION..."

    IMSG_TMP="/tmp/imsg-install-$$"
    mkdir -p "$IMSG_TMP"

    if curl -sL "https://github.com/steipete/imsg/releases/download/$IMSG_VERSION/imsg-macos-$IMSG_VERSION.zip" -o "$IMSG_TMP/imsg.zip"; then
        unzip -q "$IMSG_TMP/imsg.zip" -d "$IMSG_TMP"
        chmod +x "$IMSG_TMP/imsg"
        sudo cp "$IMSG_TMP/imsg" "$IMSG_BIN"
        rm -rf "$IMSG_TMP"

        task "imsg $IMSG_VERSION installed to $IMSG_BIN"
    else
        warn "Failed to download imsg"
        rm -rf "$IMSG_TMP"
    fi
fi
