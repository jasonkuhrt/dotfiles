#!/bin/bash
# Migration: Claude Code from npm to Homebrew
# The Brewfile now includes claude-code cask, so sync installs it.
# This migration removes the old npm installations.

set -e

echo "Migrating Claude Code from npm to Homebrew..."

# Remove npm global installation
if npm list -g @anthropic-ai/claude-code &>/dev/null; then
    echo "Removing npm global @anthropic-ai/claude-code..."
    npm uninstall -g @anthropic-ai/claude-code
fi

# Remove local npm installation
if [ -d ~/.claude/local ]; then
    echo "Removing ~/.claude/local..."
    rm -rf ~/.claude/local
fi

# Remove stale symlink if it points to npm
if [ -L /opt/homebrew/bin/claude ]; then
    target=$(readlink /opt/homebrew/bin/claude)
    if [[ "$target" == *"node_modules"* ]]; then
        echo "Removing stale npm symlink..."
        rm /opt/homebrew/bin/claude
    fi
fi

echo "Done. Claude Code should now be installed via Homebrew."
