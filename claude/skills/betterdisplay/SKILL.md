---
name: betterdisplay
description: Use when user says /betterdisplay or wants to change display resolution settings and sync to dotfiles
---

# BetterDisplay Workflow

Sync BetterDisplay settings with dotfiles.

## Helpers

### quit-app
```bash
osascript -e 'quit app "BetterDisplay"' 2>/dev/null || true
sleep 1
```

### import-from-dotfiles
Requires app to be quit first.
```bash
defaults import pro.betterdisplay.BetterDisplay ~/projects/jasonkuhrt/dotfiles/betterdisplay/settings.plist
```

### export-to-dotfiles
Requires app to be quit first.
```bash
defaults export pro.betterdisplay.BetterDisplay ~/projects/jasonkuhrt/dotfiles/betterdisplay/settings.plist
```

### launch-app
```bash
pgrep -x "BetterDisplay" || open -a "BetterDisplay"
```

## Flow

### 1. Show welcome

Display this:

```
/betterdisplay - Sync display settings with dotfiles

┌─────────────────────────────────────────────────┐
│  [sync if needed] → [configure] → [export]      │
│                                                 │
│  1. Import from dotfiles (if changed elsewhere) │
│  2. Open app for you to configure               │
│  3. Export your changes back to dotfiles        │
└─────────────────────────────────────────────────┘
```

### 2. Check sync status
```bash
DOTFILES_PLIST=~/projects/jasonkuhrt/dotfiles/betterdisplay/settings.plist
if [ ! -f "$DOTFILES_PLIST" ]; then
    echo "first-time"
else
    defaults export pro.betterdisplay.BetterDisplay /tmp/bd-current.plist 2>/dev/null || true
    if diff -q "$DOTFILES_PLIST" /tmp/bd-current.plist >/dev/null 2>&1; then
        echo "in-sync"
    else
        echo "needs-import"
    fi
fi
```
- `first-time` → tell user "First-time setup", skip to step 4
- `in-sync` → tell user "Settings in sync", skip to step 4
- `needs-import` → tell user "Importing changes from dotfiles...", continue

### 3. Import from dotfiles
- quit-app
- import-from-dotfiles

### 4. launch-app

### 5. Show config instructions

```
BetterDisplay is open. Configure it:

First-time only:
  Settings → Displays → "Default display identification method" → "Match vendor, model"

Add resolution favorites:
  Menu bar → Studio Display → resolution dropdown → right-click → "Add to Favorites"
  Suggested: 2880×1620, 3200×1800, 3840×2160
```

### 6. Prompt user (AskUserQuestion: "Done" / "Cancel")
- Cancel → exit

### 7. Export to dotfiles
- quit-app
- export-to-dotfiles

### 8. Prompt: commit? (AskUserQuestion: "Yes" / "No")
- Yes → `git -C ~/projects/jasonkuhrt/dotfiles add betterdisplay/settings.plist && git -C ~/projects/jasonkuhrt/dotfiles commit -m "feat(betterdisplay): update settings"`

## Paths

- **Dotfiles:** `~/projects/jasonkuhrt/dotfiles/betterdisplay/settings.plist`
- **macOS prefs:** `~/Library/Preferences/pro.betterdisplay.BetterDisplay.plist`
