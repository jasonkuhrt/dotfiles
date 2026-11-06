#!/bin/bash
set -euo pipefail

source "$DOTFILES_ROOT/scripts/lib/helpers.sh"

header "Amp CLI"

# The Brewfile's amp-app cask owns the app; the CLI is a separate binary that
# only Amp's own installer ships. It puts the binary in ~/.amp/bin, verifies its
# checksum, and links it from the first PATH directory it finds; `amp update`
# keeps it current after that. With ~/.local/bin first on PATH it takes that
# link and never appends to a shell profile, which the dotfiles own.
binary="$HOME/.amp/bin/amp"
link="$HOME/.local/bin/amp"

if [ -x "$binary" ] && [ "$link" -ef "$binary" ]; then
    skip "Amp CLI"
    exit 0
fi

# The installer replaces whatever sits at the link, so leave a real file alone.
if [ -e "$link" ] && [ ! -L "$link" ]; then
    warn "Existing amp is not Amp's installation: $link"
    exit 1
fi

mkdir -p "$HOME/.local/bin"
curl -fsSL https://ampcode.com/install.sh | PATH="$HOME/.local/bin:$PATH" bash

if [ ! "$link" -ef "$binary" ]; then
    warn "Amp's installer did not link $link to $binary"
    exit 1
fi

task "Amp CLI installed to $binary"
info "Sign in once with: amp login"
