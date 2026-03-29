# Zed Editor Symlink Issues: Research Report

## Executive Summary

Zed has a **well-documented, persistent problem with symlinked directories**: files edited outside Zed inside symlinked directories do not appear or update in the file tree or project search. Root cause: macOS FSEvents resolves all paths to canonical form internally. When Zed watches `/project/symlink-dir/`, FSEvents resolves it to `/real/target/dir/`. Events from the canonical path don't match Zed's expected watched path prefix, so Zed **drops them**: `"ignoring event {abs_path} outside of root path {root_canonical_path}"`.

**Open and unresolved on macOS** as of March 2026. No built-in "refresh file tree" command. `workspace::Reload` restarts the entire Zed process (all windows across all macOS Spaces) — unusable for multi-window layouts.

---

## Exhaustive Solution Search (10 Angles)

| # | Angle | Viability | Notes |
|---|-------|-----------|-------|
| 1 | Zed Extensions | DEAD | Extension API has no worktree/rescan surface. `Worktree` struct exposes only `id()`, `root_path()`, `read_text_file()`, `which()`, `shell_env()`. |
| 2 | Hidden Internal Actions | DEAD | No `Rescan`, `RefreshProject`, `InvalidateWorktree` action exists. `restart_background_scanners()` is internal-only, triggered by settings changes. |
| 3 | CLI Per-Window Reload | DEAD | `workspace::Reload` restarts the entire process ([#20849](https://github.com/zed-industries/zed/issues/20849)). No `--reload` or `--rescan` flag. No per-window targeting. |
| 4 | fswatch + touch relay | **VIABLE** | Watch real target, touch files via symlink path to generate events Zed can see. Hacky — modifies mtime, can dirty git. |
| 5 | FSEvents / notify crate config | DEAD | macOS FSEvents has no `FollowSymlinks` flag. `notify` crate's `follow_symlinks` config only applies to inotify/kqueue, not FSEvents. |
| 6 | Bind mount (bindfs/macFUSE) | MAYBE | Requires macFUSE kernel extension + SIP concerns. `fseventsd` has documented issues with FUSE. Fragile. |
| 7 | Directory hard links | DEAD | APFS does not support directory hard links (only Time Machine on HFS+ had this). |
| 8 | Nightly / Preview fix | NOT YET | [PR #46338](https://github.com/zed-industries/zed/pull/46338) open 2.5 months, zero reviews. Correct fix (watch both symlink and canonical path). |
| 9 | Zed IPC / JSONRPC | DEAD | No general-purpose IPC. ACP (Agent Client Protocol) has no rescan capability. No socket/pipe/HTTP API. |
| 10 | Multi-Root Workspace | **VIABLE** | Add symlink target as second project root. Zed watches the real path natively. |

---

## Viable Workarounds

### Option A: Multi-Root Workspace (Best)

Add the symlink's **real target directory** as a second root in the Zed workspace. Zed watches it directly — no symlink resolution issues.

```bash
# Open project, then add real target
zed /project
zed -a /real/target/dir
```

Or: Cmd+Shift+P > `project: Add Folder to Project`

**Trade-offs:**
- Project panel shows two roots instead of a unified tree
- LSP, search, and tasks work across both roots
- Zed restores multi-root workspaces across restarts
- If symlink is needed for build tooling / relative paths, keep it alongside the additional root

### Option B: fswatch Relay Daemon (Fallback)

Watch the real target for changes, then touch each changed file via the symlink path:

```bash
fswatch -r /real/target/dir | while read changed_file; do
  relative="${changed_file#/real/target/dir/}"
  touch "/project/symlink-dir/$relative" 2>/dev/null
done
```

**Caveats:**
- Requires `brew install fswatch`
- Modifies mtime — can dirty git, trigger build tool re-runs
- New files created in the target won't have a corresponding symlink-path file to touch (touch parent dir instead)
- Must run as a background daemon

---

## Long-Term Fix

[PR #46338](https://github.com/zed-industries/zed/pull/46338) — "Fix symlinked directories not being watched" — is the correct fix. It watches BOTH the symlink path and the canonical path, and remaps events from canonical paths back to symlink-relative paths. Open since 2026-01-08, zero reviews as of 2026-03-26.

Complementary PRs:
- [#51382](https://github.com/zed-industries/zed/pull/51382) — Make expanded symlinks indexed by default (removes "external/ignored" treatment)
- [#50746](https://github.com/zed-industries/zed/pull/50746) — Fix settings in symlinked directories

---

## Known Bug Issues

### Primary

| Issue | Title | Status | Platform |
|-------|-------|--------|----------|
| [#45954](https://github.com/zed-industries/zed/issues/45954) | Symlinked directory does not update with changes made outside the editor | **Open** | macOS |
| [#35173](https://github.com/zed-industries/zed/issues/35173) | File explorer fails to refresh when files are added to symlinked directories | **Open** | macOS |
| [#27263](https://github.com/zed-industries/zed/issues/27263) | Failure to detect file system changes with symlinks | **Open** | Linux |
| [#48729](https://github.com/zed-industries/zed/issues/48729) | Config in symlinked directory not applied when changed | **Open** | macOS |
| [#41887](https://github.com/zed-industries/zed/issues/41887) | Project search ignores files inside symlinked directories | **Open** | Linux |

### Related

| Issue | Title | Status |
|-------|-------|--------|
| [#445](https://github.com/zed-industries/zed/issues/445) | Follow Symlinks (original tracking) | Closed, still broken |
| [#20849](https://github.com/zed-industries/zed/issues/20849) | Make workspace:reload per-window | **Open** |
| [#12712](https://github.com/zed-industries/zed/issues/12712) | Go to File (Cmd+P) ignores symlinks | Open |
| [#46469](https://github.com/zed-industries/zed/issues/46469) | Duplicate results from symlinked directories | Open |
| [#25181](https://github.com/zed-industries/zed/issues/25181) | Broken symlinks not shown in file tree | Open |

---

## Technical Details

### Root Cause
- Zed uses the Rust `notify` crate → macOS FSEvents backend
- FSEvents resolves all watched paths to canonical form internally
- Events arrive with canonical paths that don't match Zed's symlink-based path prefix
- Zed drops events with log: `"ignoring event outside of root path"`
- The `notify` crate's `Config::follow_symlinks` only works for inotify/kqueue, not FSEvents

### No Rescan Surface
- No `project_panel::Refresh` or `worktree::Rescan` action exists
- `restart_background_scanners()` is internal, triggered only by settings changes
- Collapsing/expanding folders does NOT trigger a rescan
- No extension API, IPC, or CLI flag can trigger a rescan

---

## Sources
- [#45954](https://github.com/zed-industries/zed/issues/45954), [#35173](https://github.com/zed-industries/zed/issues/35173), [#27263](https://github.com/zed-industries/zed/issues/27263), [#48729](https://github.com/zed-industries/zed/issues/48729), [#41887](https://github.com/zed-industries/zed/issues/41887)
- [#445](https://github.com/zed-industries/zed/issues/445), [#20849](https://github.com/zed-industries/zed/issues/20849), [#13589](https://github.com/zed-industries/zed/issues/13589)
- [PR #46338](https://github.com/zed-industries/zed/pull/46338), [PR #51382](https://github.com/zed-industries/zed/pull/51382), [PR #50746](https://github.com/zed-industries/zed/pull/50746)
- [PR #21039](https://github.com/zed-industries/zed/pull/21039), [PR #17609](https://github.com/zed-industries/zed/pull/17609)
- [Zed Extension API v0.7.0](https://docs.rs/zed_extension_api)
- [Zed All Actions](https://zed.dev/docs/all-actions), [Zed Key Bindings](https://zed.dev/docs/key-bindings)
