#!/bin/bash
# Migration: Move Serena config to dotfiles management
#
# Before this migration, ~/.serena/serena_config.yml was a regular file
# managed directly by Serena. After this migration, the sync script will
# symlink it from dotfiles.

SERENA_CONFIG="$HOME/.serena/serena_config.yml"

if [ -f "$SERENA_CONFIG" ] && [ ! -L "$SERENA_CONFIG" ]; then
    echo "Backing up existing Serena config..."
    cp "$SERENA_CONFIG" "${SERENA_CONFIG}.backup-$(date +%Y%m%d)"
    rm "$SERENA_CONFIG"
    echo "Removed $SERENA_CONFIG (backed up). Run sync to create symlink."
else
    echo "Nothing to migrate (file missing or already a symlink)."
fi
