# Bookmarks Sync v1 — Design

Cross-browser bookmark management from dotfiles with bidirectional sync, profile support, and patch-based conflict resolution.

## Problem

- Two machines, each with Safari + Chrome, each with multiple browser profiles
- Browser-native sync (iCloud for Safari, Google for Chrome) handles cross-machine per-profile
- **The gap**: Safari ↔ Chrome sync on the same machine, driven from a text-based source of truth
- Bookmarks are curated from two directions: YAML edits in editor AND ⌘D/hotkey additions in-browser — both are first-class intentional actions

## Architecture

```
bookmarks.yaml (source of truth)
       │
       ▼
  bookmarks sync (Bun/TS CLI)
       │
       ├──► Safari plist (per profile)
       │         └──► iCloud ──► iOS Safari
       │
       └──► Chrome JSON (per profile)
                 └──► Google Sync ──► Other machines
```

## Package Structure

New Bun/TypeScript package at packages/bookmarks/ following shan's pattern:

```
packages/bookmarks/
├── package.json          # @jasonkuhrt/bookmarks
├── tsconfig.json
└── src/
    ├── bin/
    │   └── bookmarks.ts  # CLI entrypoint
    └── lib/
        ├── schema.ts     # YAML schema validation (Effect Schema)
        ├── yaml.ts       # Load/save bookmarks.yaml
        ├── safari.ts     # Read/write Safari plist
        ├── chrome.ts     # Read/write Chrome JSON
        ├── patch.ts      # Domain-specific patch types + generation
        ├── sync.ts       # Core sync engine (diff, resolve, apply)
        ├── graveyard.ts  # Graveyard management + GC
        ├── state.ts      # Sync state persistence (.sync-state.json)
        ├── daemon.ts     # Launchd plist generation + lifecycle
        └── permissions.ts # Full Disk Access check
```

## CLI

```bash
bookmarks push [--dry-run]           # YAML → browsers
bookmarks pull [--dry-run]           # browsers → YAML
bookmarks sync [--dry-run]           # bidirectional (pull then push)
bookmarks status                     # show current state
bookmarks backup                     # timestamped backups
bookmarks gc [--max-age=90d]         # clean graveyard
bookmarks daemon start|stop|status   # launchd lifecycle
bookmarks validate                   # schema check only
```

## YAML Schema

```yaml
targets:
  safari:
    default:
      path: ~/Library/Safari/Bookmarks.plist
    work:
      path: ~/Library/Safari/Profiles/Work/Bookmarks.plist
  chrome:
    personal:
      path: ~/Library/Application Support/Google/Chrome/Default
    work:
      path: ~/Library/Application Support/Google/Chrome/Profile 1
      enabled: false

# Every profile gets these — recursive folder nesting supported
base:
  favorites_bar:
    - name: AI
      children:
        - name: Claude Blog
          url: https://claude.com/blog
        - name: Tools
          children:
            - name: Effect Playground
              url: https://effect.kitlangton.com/
  other:
    - name: Board Games
      children: [...]
    - name: _graveyard        # managed by sync engine
      children: [...]

# Profile-specific additions (merged on top of base)
profiles:
  chrome/work:
    favorites_bar:
      - name: Heartbeat
        children: [...]
```

**Merge rule**: `resolved(profile) = base + profiles[profile_key]`. Profile-specific items are appended after base items in each section. No removal syntax in v1 — if something shouldn't be global, move it from base into the relevant profile entry.

**Sections**: favorites_bar, other, reading_list, mobile — all treated identically by the sync engine.

## Sync Engine — Patch-Based Architecture

The sync engine produces domain-specific patches as an intermediate representation, then applies them. This separates "what changed" from "apply the change."

### Patch Types

```typescript
type BookmarkPatch =
  | { op: 'add';    url: string; name: string; path: string; date: string }
  | { op: 'remove'; url: string; path: string }
  | { op: 'rename'; url: string; oldName: string; newName: string }
  | { op: 'move';   url: string; fromPath: string; toPath: string }
```

### Pipeline

```
1. Diff(last_sync, yaml_resolved)  → BookmarkPatch[]   // what changed in YAML
2. Diff(last_sync, browser_current) → BookmarkPatch[]   // what changed in browser
3. Detect conflicts                  → patches touching same URL from both sides
4. Resolve conflicts                 → newest-wins by timestamp, emit graveyard patches
5. Apply yaml_patches → browser tree
   Apply browser_patches → yaml tree
6. Save new sync state
```

### Sync Engine API

```typescript
generatePatches(lastSync, current, source): BookmarkPatch[]
resolveConflicts(yamlPatches, browserPatches): { apply: BookmarkPatch[], graveyard: BookmarkPatch[] }
applyPatches(tree: BookmarkTree, patches: BookmarkPatch[]): BookmarkTree
sync(dryRun?: boolean): { applied: BookmarkPatch[], graveyarded: BookmarkPatch[] }
```

### Identity Model

- **URL is the identity key.** Two entries with the same URL but different names/folders are the same bookmark with a conflict.
- Two entries with different URLs are always distinct, regardless of name.

### Conflict Resolution — Newest Wins

Both YAML edits and browser hotkey additions are intentional. Neither source is "more authoritative." Whichever side has the more recent timestamp wins. The loser goes to the graveyard with full audit context.

### First Run (No Prior State)

Everything in YAML is treated as "yaml additions," everything in browser not in YAML as "browser additions." Both merge cleanly — no conflicts possible since there's no baseline to disagree about.

### Why Not Git Merge or RFC 6902 JSON Patch

- **git merge-file** operates on text lines, but bookmark identity is URL-based, not position-based. Folder moves look like delete+add. We'd need more glue code than the actual merge logic.
- **RFC 6902 JSON Patch** uses position-based JSON Pointer paths (`/favorites_bar/0/children/2`). Array indices don't transfer between YAML and browser representations. URLs need escaping in JSON Pointer segments.
- **Domain-specific patches** give the same benefits (auditable, serializable, testable, composable) without fighting the format mismatch. The core diff is ~30 lines of logic.

## Graveyard

A real bookmark folder that syncs to browsers — browsable in Chrome/Safari's bookmark manager, but buried in "Other Bookmarks" where it doesn't clutter the favorites bar.

### Structure — Self-Describing Names

```
_graveyard/
  2026-02-01_safari_conflict/
    favorites_bar/               # original path preserved
      AI/
        Tools/
          Effect Playground      → https://effect.kitlangton.com/
  2026-01-28_chrome-personal_replaced/
    other/
      Research/
        Old Flatfile             → https://flatfile.com/old
```

**Folder name pattern**: `YYYY-MM-DD_{source}_{reason}/`
- Sources: safari, safari-work, chrome-personal, chrome-work, yaml
- Reasons: conflict (both sides changed), deleted (removed from one side), reorganized (folder move)

**Inside the event folder**: the original bookmark tree path is recreated as nested directories, preserving exactly where the bookmark lived.

### In YAML

The graveyard is just another folder under `other` — no special meta fields:

```yaml
other:
  - name: _graveyard
    children:
      - name: "2026-02-01_safari_conflict"
        children:
          - name: favorites_bar
            children:
              - name: AI
                children:
                  - name: Tools
                    children:
                      - name: Effect Playground
                        url: https://effect.kitlangton.com/
```

### GC Policy

Age-based, 90 days default. Parses the date from folder names and removes expired entries. Runs automatically at the end of every `sync`, or manually via `bookmarks gc --max-age=90d`.

## Sync State

Stored at bookmarks/.sync-state.json (gitignored):

```jsonc
{
  "version": 1,
  "last_sync": "2026-02-01T14:30:00Z",
  "profiles": {
    "safari/default": {
      "yaml_hash": "abc123",
      "browser_hash": "def456",
      "bookmarks": {
        "https://claude.com/blog": {
          "name": "Claude Blog",
          "path": "favorites_bar/AI",
          "date_modified": "2026-01-15T..."
        }
      }
    },
    "chrome/personal": { "..." : "..." }
  }
}
```

The `bookmarks` map is the "last known agreed state" — what both sides looked like after the last successful sync. This is the base for three-way diff.

## Daemon

A macOS launchd plist managed entirely through the CLI:

```bash
bookmarks daemon start    # generate + install + load plist
bookmarks daemon stop     # unload plist
bookmarks daemon status   # running? last run? next run?
```

No hand-editing plist files. The script owns the lifecycle.

## Permissions

Safari plist requires Full Disk Access. The CLI checks for this at startup and provides a helpful error message with instructions if missing.

## Out of Scope (v1)

- **Tab group sync** — different storage format, different browser APIs, different problem
- **Removal syntax in profiles** — v1 only supports additive profile extensions
- **Auto-conflict resolution UI** — newest-wins is automatic, no interactive prompts

## Migration

The existing Python script (bookmarks/sync-bookmarks.py) is replaced entirely. The existing bookmarks.yaml structure is compatible — the new schema adds `profiles` and formalizes `_graveyard`, but the existing `base` + `targets` structure carries over. The backup files (backup-raw-import.*) are preserved as archive.

## Fan-Out Design Tasks

These are cleanly separable and can be designed independently:

1. **Safari plist adapter** — read/write Safari bookmarks per profile, timestamp conversion (Core Data epoch), plist binary ↔ XML handling
2. **Chrome JSON adapter** — read/write Chrome bookmarks per profile, timestamp conversion (Windows epoch), checksum recalculation
3. **Daemon implementation** — launchd plist template, install/unload paths, logging, schedule interval
4. **Permissions & error handling** — Full Disk Access detection, browser-is-running guards, graceful degradation
5. **Patch engine deep dive** — exact TypeScript types, move detection vs remove+add, duplicate URL handling, edge cases
6. **Migration plan** — transition from Python script, YAML schema migration, one-time data reconciliation
