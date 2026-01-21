# Bookmarks Sync

Cross-browser bookmark management from dotfiles with bidirectional sync.

## Quick Start

```bash
# See current status
./sync-bookmarks.py status

# Push YAML → browsers (preview first)
./sync-bookmarks.py push --dry-run
./sync-bookmarks.py push

# Pull browser → YAML (preview first)
./sync-bookmarks.py pull --dry-run
./sync-bookmarks.py pull

# Manual backup
./sync-bookmarks.py backup
```

## Files

```
bookmarks/
├── README.md               # This file
├── bookmarks.schema.json   # JSON Schema for validation
├── bookmarks.yaml          # Source of truth
├── sync-bookmarks.py       # Bidirectional sync script
├── backup-raw-import.yaml  # Original browser backup
├── backup-raw-import.json  # Full metadata backup
└── backups/                # Timestamped backups
```

## Problem

- Two machines, each with Safari + Chrome
- Chrome has work/personal profiles
- iOS (Safari via iCloud)
- Want single text-based source of truth
- Want identical favorites bar by default with optional per-browser/profile divergence

## Key Insight: Existing Sync Handles Cross-Machine

- **Safari**: iCloud sync handles cross-machine + iOS automatically
- **Chrome**: Google account sync handles cross-machine per-profile

**The only gap**: Safari ↔ Chrome sync on the same machine, driven from text.

## Architecture

```
bookmarks.yaml (source of truth)
       │
       ▼
  sync-bookmarks.sh
       │
       ├──► Safari plist (~/Library/Safari/Bookmarks.plist)
       │         └──► iCloud ──► iOS Safari
       │
       └──► Chrome JSON (per profile)
                 └──► Google Sync ──► Other machines
```

## Schema Overview

```yaml
targets:        # Browser/profile paths
  safari:
    path: ~/Library/Safari/Bookmarks.plist
  chrome:
    personal:
      path: ~/Library/Application Support/Google/Chrome/Default
    work:
      path: ~/Library/Application Support/Google/Chrome/Profile 1
      enabled: false

base:           # Default bookmarks for all targets
  favorites_bar: [...]
  other: [...]

overrides:      # Per-target modifications
  chrome/work:
    favorites_bar:
      "+": [...]   # Add items
      "-": [...]   # Remove items (by name)
```

See `bookmarks.schema.json` for full validation schema.

## Current Setup

| Target | Profile Dir | Status |
|--------|-------------|--------|
| Safari | `~/Library/Safari/Bookmarks.plist` | Ready |
| Chrome personal | `Default` ("Your Chrome") | Ready |
| Chrome work | `Profile 1` | Create when needed |

To create Chrome work profile: Chrome > Profile icon (top right) > Add

## Browser File Formats

### Chrome Bookmarks (JSON)

Location: `{profile}/Bookmarks`

```json
{
  "checksum": "...",
  "roots": {
    "bookmark_bar": {
      "children": [...],
      "name": "Bookmarks bar",
      "type": "folder"
    },
    "other": {
      "children": [...],
      "name": "Other bookmarks",
      "type": "folder"
    }
  },
  "version": 1
}
```

- `date_added`: microseconds since January 1, 1601 (Windows epoch)
- `id`: sequential numeric strings

### Safari Bookmarks (plist)

Location: `~/Library/Safari/Bookmarks.plist`

Binary plist. Convert with:
```bash
# Binary → XML (readable)
plutil -convert xml1 -o Bookmarks.xml ~/Library/Safari/Bookmarks.plist

# XML → Binary (for Safari to read)
plutil -convert binary1 -o ~/Library/Safari/Bookmarks.plist Bookmarks.xml
```

## Sync Workflow

### Push (YAML → Browsers)

1. Reads `bookmarks.yaml`
2. Applies overrides per target
3. Generates Safari plist and Chrome JSON
4. Creates timestamped backups before writing
5. Saves sync state for change detection

### Pull (Browsers → YAML)

1. Compares current browser state with last sync
2. Detects additions, deletions, and conflicts
3. Merges browser additions into YAML
4. Reports conflicts for manual resolution

### Conflict Resolution

Conflicts occur when the same URL has different names in YAML vs browser.
The script reports these but doesn't auto-resolve - edit `bookmarks.yaml` to fix.

## Tools Evaluated

| Tool | Safari Support | Notes |
|------|----------------|-------|
| [Floccus](https://floccus.org/) | No | Best open-source, but no Safari |
| [xBrowserSync](https://www.xbrowsersync.org/) | No | Developer explicitly refused Safari |
| [Raindrop.io](https://raindrop.io/) | Yes (extension) | GUI-centric, not CC-friendly |
| [buku](https://github.com/jarun/buku) | Import only | CLI, no native Safari write |
| [BookMacster](https://www.brycewray.com/posts/2023/08/cross-browser-bookmarks-sync-bookmacster/) | Yes | Paid Mac app, not text-driven |
| Custom script | Yes | Our approach |

## Future: Tab Groups

No cross-browser tab group sync exists. Safari Tab Groups and Chrome Tab Groups are siloed.

Potential workarounds:
- [Tab Session Manager](https://github.com/nicman23/tab-session-manager-mod) - Chrome/Edge/Firefox only
- Use bookmark folders as "open all" pseudo-groups

Captured for later exploration.

## References

- [Chrome bookmarks format](http://fileformats.archiveteam.org/wiki/Chrome_bookmarks)
- [Safari plist location](https://discussions.apple.com/thread/7728443)
- [bookmarksync (GitHub-based)](https://github.com/frederikb/bookmarksync) - inspiration for JSON structure
