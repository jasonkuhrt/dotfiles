---
name: configuring-dprint
description: dprint formatter config resolution. Use when working with dprint configuration, discussing where dprint looks for config, or setting up global dprint config.
---

# dprint Config Resolution

## Common Misconception

CC often incorrectly states that dprint is "project-local only" with no global config support. **This is wrong.**

## Actual Behavior

dprint has robust config discovery:

### 1. Ancestor Directory Lookup (Default)

dprint walks UP the directory tree looking for `dprint.json` or `.dprint.json`:

```
~/projects/foo/src/bar/  <- you run dprint here
~/projects/foo/src/      <- checks here
~/projects/foo/          <- checks here (finds dprint.json, uses it)
~/projects/              <- would check here if not found above
~/                       <- would check here if not found above
```

### 2. Global Config Support

**Environment variable:**
```bash
DPRINT_CONFIG_DIR    # Global config directory for dprint.json
                     # Defaults to system config dir (e.g., ~/.config/dprint/)
```

**CLI flag:**
```bash
dprint fmt --config-discovery=global  # Use ONLY global config
```

### 3. Config Discovery Modes

```bash
--config-discovery=true              # Default: ancestor lookup
--config-discovery=false             # Disable all discovery, require -c
--config-discovery=ignore-descendants # Don't look in child dirs
--config-discovery=global            # Only use global config
```

### 4. Explicit Config Path

```bash
dprint fmt -c /path/to/dprint.json   # Use specific config
dprint fmt -c ~/dotfiles/dprint.json # Common dotfiles pattern
```

## Dotfiles Setup

To have a global dprint config that works everywhere:

```bash
# Option A: Set DPRINT_CONFIG_DIR (in shell config)
export DPRINT_CONFIG_DIR="$HOME/dotfiles/dprint"

# Option B: Symlink to default location
ln -s ~/dotfiles/dprint/dprint.json ~/.config/dprint/dprint.json
```

## Reference

```bash
dprint help          # Shows all options including config discovery
dprint config help   # Config-specific help
```
