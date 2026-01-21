# BetterDisplay Integration

## Goal

Integrate BetterDisplay into dotfiles for portable display resolution management.

## Resolution Modes

| Mode | Effective Resolution | Use Case |
|------|---------------------|----------|
| **Balanced** (default) | 2880×1620 | Daily work - good space, sharp text |
| **Max-sanctioned** | 3200×1800 | More space, still HiDPI, Apple-approved |
| **Force-boost** | 3840×2160 | Maximum space, slightly softer text |

Switching: Menu bar click (BetterDisplay's built-in UI).

## Portability

Use BetterDisplay's "model name" identification method instead of UUID. This makes the config portable - any machine with a "Studio Display" gets the presets automatically.

## Implementation

### 1. Add to Brewfile

```
cask "betterdisplay"
```

### 2. Create dotfiles directory

```
betterdisplay/
├── settings.plist          # Exported config
└── README.md               # Setup notes (first-time manual steps)
```

### 3. Update sync script

Add to sync script after Homebrew section:

```bash
header "BetterDisplay"

# Import settings only if app exists and is not running
if [ -d "/Applications/BetterDisplay.app" ]; then
    if ! pgrep -x "BetterDisplay" > /dev/null; then
        if [ -f "$HERE/betterdisplay/settings.plist" ]; then
            defaults import pro.betterdisplay.BetterDisplay "$HERE/betterdisplay/settings.plist"
            task "BetterDisplay settings imported"
        fi
    else
        skip "BetterDisplay (app running, can't import)"
    fi
else
    skip "BetterDisplay (not installed)"
fi
```

### 4. Initial setup (manual, once)

After first install:
1. Open BetterDisplay
2. Settings → Display Identification → "By model name"
3. Create resolution presets for each mode
4. Export: `defaults export pro.betterdisplay.BetterDisplay ~/projects/jasonkuhrt/dotfiles/betterdisplay/settings.plist`
5. Commit to dotfiles

### 5. On new machines

Sync script imports settings automatically. Presets work immediately for any "Studio Display".

## Files Changed

- `Brewfile` - add cask
- `sync` - add import section
- `betterdisplay/settings.plist` - new (exported config)
- `betterdisplay/README.md` - new (setup notes)
