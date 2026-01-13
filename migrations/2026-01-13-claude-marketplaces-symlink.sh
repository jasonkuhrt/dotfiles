#!/bin/bash
# Migration: Remove old known_marketplaces.json symlink
# The marketplace config is now managed via `claude plugin marketplace` CLI
# instead of tracking the JSON file in dotfiles.

SYMLINK="$HOME/.claude/plugins/known_marketplaces.json"

if [ -L "$SYMLINK" ]; then
    echo "Removing old symlink: $SYMLINK"
    rm "$SYMLINK"
    echo "Run ./sync to re-add marketplaces via CLI"
fi
