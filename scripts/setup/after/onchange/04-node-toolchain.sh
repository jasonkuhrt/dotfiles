#!/bin/bash
set -e

source "$DOTFILES_ROOT/scripts/lib/helpers.sh"

header "Node.js Toolchain"

# Ensure Homebrew is in PATH (Apple Silicon)
if [ -f "/opt/homebrew/bin/brew" ]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
fi

# pnpm 12 is a native executable that needs no Node.js. Its standalone installer is the install
# path pnpm documents for macOS, and it puts pnpm (and later the node runtime shim) in $PNPM_HOME/bin.
export PNPM_HOME="$HOME/Library/pnpm"
export PATH="$PNPM_HOME/bin:$PATH"

if has_cmd pnpm; then
    skip "pnpm $(pnpm --version)"
else
    info "Installing pnpm via its standalone installer..."
    # The installer runs `pnpm setup`, which appends PATH lines to $SHELL's rc file. config.fish
    # already manages PATH and is a symlink into this repo, so point that edit at a throwaway file.
    rc_sink=$(mktemp)
    if curl -fsSL https://get.pnpm.io/install.sh | env PNPM_HOME="$PNPM_HOME" SHELL=/bin/sh ENV="$rc_sink" sh -; then
        rm -f "$rc_sink"
        task "pnpm installed"
    else
        rm -f "$rc_sink"
        warn "pnpm install failed, skipping Node.js setup"
        exit 0
    fi
fi

# Declarative: resolves the current LTS and makes it the global node. Replaces `pnpm env use`,
# which pnpm 12 deprecates.
if pnpm runtime set node lts -g; then
    task "Node.js LTS via pnpm runtime"
else
    warn "pnpm runtime set node lts -g failed"
fi
