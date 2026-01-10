---
name: sync-migrations
description: Use when creating dotfiles migrations for one-time cleanup on existing machines (removing old tools, uninstalling replaced packages, cleaning deprecated files)
---

# Sync Migrations

One-time scripts that run on existing machines when dotfiles changes require cleanup.

## When to Use

**Create migration for:**
- Removing/uninstalling replaced tools (npm → brew)
- Deleting deprecated files/directories
- Cleaning stale symlinks

**Don't create for:**
- Adding new configs (sync handles this)
- Updating existing configs (symlinks auto-update)

## Quick Reference

| Item | Value |
|------|-------|
| Location | `migrations/YYYY-MM-DD-description.sh` |
| Marker | `~/.dotfiles-migration-marker` |
| Run | `./sync --migrate` or `./sync --migrate-only` |

## Creating a Migration

```bash
#!/bin/bash
set -e

# Always check before acting (idempotent)
if [ -d ~/.old-thing ]; then
    rm -rf ~/.old-thing
fi

if command -v old-tool &>/dev/null; then
    brew uninstall old-tool
fi
```

**Requirements:**
- Timestamped filename: `YYYY-MM-DD-description.sh`
- `set -e` for fail-fast
- Idempotent checks before each action
- Make executable: `chmod +x`

## How It Works

1. Marker file stores last-run date
2. Migrations with timestamp > marker are pending
3. User confirms before running
4. Marker updates after each success

**New machines:** No marker = all pending. User decides to run or skip (fresh setup doesn't need cleanup).
