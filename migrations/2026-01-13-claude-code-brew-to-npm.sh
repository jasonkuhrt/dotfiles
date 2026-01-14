#!/bin/bash
# Migration: Claude Code from Homebrew back to npm
# npm gets updates faster than brew cask.
# This migration removes the Homebrew cask installation.

set -e

echo "Migrating Claude Code from Homebrew to npm..."

# Remove Homebrew cask installation
if brew list --cask claude-code &>/dev/null; then
    echo "Removing Homebrew cask claude-code..."
    brew uninstall --cask claude-code
fi

echo "Done. Claude Code should now be installed via npm global."
