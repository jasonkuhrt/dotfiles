---
name: dprint
description: dprint formatter config resolution. Use when working with dprint configuration, discussing where dprint looks for config, or setting up global dprint config.
---

# dprint Config Resolution

## Overview

CC often claims dprint is "project-local only" with no global config. **Wrong.** dprint supports ancestor lookup AND global config fallback.

## Config Discovery Order

### 1. Ancestor Directory Lookup (Default)

dprint walks UP the directory tree looking for `dprint.json` or `.dprint.json`:

```
~/projects/foo/src/bar/  <- run dprint here
~/projects/foo/          <- finds dprint.json, uses it
~/                       <- would check here if not found above
```

### 2. Global Config Fallback

If no config in ancestors, checks global location:

- **Default:** `~/.config/dprint/dprint.json` (macOS/Linux)
- **Override:** `DPRINT_CONFIG_DIR="$HOME/dotfiles/dprint"`

### 3. Explicit Path

```bash
dprint fmt -c /path/to/dprint.json
```

## When No Config Found

dprint errors - won't run without config.

## Quick Reference

| Mode | Behavior |
|------|----------|
| `--config-discovery=true` | Default: ancestor lookup + global fallback |
| `--config-discovery=global` | Skip ancestors, use only global |
| `--config-discovery=false` | Disable discovery, require `-c` |
| `-c <path>` | Use specific config file |

## Dotfiles Setup

```bash
# Option A: Environment variable
export DPRINT_CONFIG_DIR="$HOME/dotfiles/dprint"

# Option B: Symlink to default location
ln -s ~/dotfiles/dprint/dprint.json ~/.config/dprint/dprint.json
```
