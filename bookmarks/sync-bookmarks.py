#!/usr/bin/env python3
"""
Bidirectional bookmark sync between YAML config and browsers.

Syncs bookmarks.yaml <-> Safari plist <-> Chrome JSON
Handles additions, deletions, and conflicts with date-based resolution.
"""

import argparse
import json
import os
import plistlib
import shutil
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, TypedDict

# Constants
SCRIPT_DIR = Path(__file__).parent
YAML_PATH = SCRIPT_DIR / "bookmarks.yaml"
STATE_PATH = SCRIPT_DIR / ".sync-state.json"
BACKUP_DIR = SCRIPT_DIR / "backups"

# Browser paths (expanded at runtime)
SAFARI_PLIST = Path.home() / "Library/Safari/Bookmarks.plist"
CHROME_DEFAULT = Path.home() / "Library/Application Support/Google/Chrome/Default/Bookmarks"


class SyncState(TypedDict):
    last_sync: str
    yaml_hash: str
    safari_hash: str
    chrome_hashes: dict[str, str]


def load_yaml(path: Path) -> dict[str, Any]:
    """Load YAML file using Python's json after yq conversion."""
    result = subprocess.run(
        ["yq", "-o=json", str(path)],
        capture_output=True,
        text=True,
        check=True,
    )
    return json.loads(result.stdout)


def save_yaml(path: Path, data: dict[str, Any]) -> None:
    """Save data to YAML file using yq."""
    json_str = json.dumps(data, indent=2)
    result = subprocess.run(
        ["yq", "-P", "-o=yaml"],
        input=json_str,
        capture_output=True,
        text=True,
        check=True,
    )
    path.write_text(result.stdout)


def load_safari_bookmarks() -> dict[str, Any]:
    """Load Safari bookmarks from plist."""
    if not SAFARI_PLIST.exists():
        return {}
    with open(SAFARI_PLIST, "rb") as f:
        return plistlib.load(f)


def save_safari_bookmarks(data: dict[str, Any]) -> None:
    """Save Safari bookmarks to plist."""
    # Create backup first
    backup_safari()
    with open(SAFARI_PLIST, "wb") as f:
        plistlib.dump(data, f)


def load_chrome_bookmarks(profile_path: Path) -> dict[str, Any]:
    """Load Chrome bookmarks from JSON."""
    bookmarks_path = profile_path / "Bookmarks" if profile_path.is_dir() else profile_path
    if not bookmarks_path.exists():
        return {}
    return json.loads(bookmarks_path.read_text())


def save_chrome_bookmarks(profile_path: Path, data: dict[str, Any]) -> None:
    """Save Chrome bookmarks to JSON."""
    bookmarks_path = profile_path / "Bookmarks" if profile_path.is_dir() else profile_path
    # Create backup first
    backup_chrome(profile_path)
    bookmarks_path.write_text(json.dumps(data, indent=3))


def backup_safari() -> None:
    """Create timestamped backup of Safari bookmarks."""
    BACKUP_DIR.mkdir(exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_path = BACKUP_DIR / f"safari_{timestamp}.plist"
    shutil.copy2(SAFARI_PLIST, backup_path)
    print(f"Backed up Safari bookmarks to {backup_path}")


def backup_chrome(profile_path: Path) -> None:
    """Create timestamped backup of Chrome bookmarks."""
    BACKUP_DIR.mkdir(exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    profile_name = profile_path.name if profile_path.is_dir() else "default"
    backup_path = BACKUP_DIR / f"chrome_{profile_name}_{timestamp}.json"
    bookmarks_path = profile_path / "Bookmarks" if profile_path.is_dir() else profile_path
    shutil.copy2(bookmarks_path, backup_path)
    print(f"Backed up Chrome bookmarks to {backup_path}")


def parse_safari_date(date_val: Any) -> datetime | None:
    """Parse Safari date (already datetime in plist)."""
    if isinstance(date_val, datetime):
        return date_val
    return None


def parse_chrome_date(timestamp_str: str) -> datetime | None:
    """Parse Chrome WebKit timestamp (microseconds since 1601-01-01)."""
    try:
        # Chrome uses WebKit timestamp: microseconds since 1601-01-01
        webkit_epoch = datetime(1601, 1, 1, tzinfo=timezone.utc)
        microseconds = int(timestamp_str)
        return webkit_epoch + __import__("datetime").timedelta(microseconds=microseconds)
    except (ValueError, TypeError):
        return None


def to_chrome_timestamp(dt: datetime) -> str:
    """Convert datetime to Chrome WebKit timestamp."""
    webkit_epoch = datetime(1601, 1, 1, tzinfo=timezone.utc)
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    delta = dt - webkit_epoch
    microseconds = int(delta.total_seconds() * 1_000_000)
    return str(microseconds)


def to_iso_date(dt: datetime | None) -> str | None:
    """Convert datetime to ISO format string."""
    if dt is None:
        return None
    return dt.isoformat()


def load_sync_state() -> SyncState | None:
    """Load previous sync state."""
    if not STATE_PATH.exists():
        return None
    return json.loads(STATE_PATH.read_text())


def save_sync_state(state: SyncState) -> None:
    """Save sync state."""
    STATE_PATH.write_text(json.dumps(state, indent=2))


def hash_content(data: Any) -> str:
    """Create hash of content for change detection."""
    import hashlib

    def json_serializable(obj):
        """Convert non-serializable types."""
        if isinstance(obj, bytes):
            return obj.hex()
        if isinstance(obj, datetime):
            return obj.isoformat()
        raise TypeError(f"Object of type {type(obj).__name__} is not JSON serializable")

    content = json.dumps(data, sort_keys=True, default=json_serializable)
    return hashlib.sha256(content.encode()).hexdigest()[:16]


def flatten_bookmarks(items: list[dict], path: str = "") -> dict[str, dict]:
    """Flatten bookmark tree into dict keyed by URL."""
    result = {}
    for item in items:
        if "url" in item:
            result[item["url"]] = {
                "name": item.get("name", ""),
                "url": item["url"],
                "date_added": item.get("date_added"),
                "path": path,
            }
        elif "children" in item:
            child_path = f"{path}/{item['name']}" if path else item["name"]
            result.update(flatten_bookmarks(item.get("children", []), child_path))
    return result


def extract_safari_bookmarks(plist_data: dict) -> dict[str, list]:
    """Extract bookmarks from Safari plist structure."""
    sections = {
        "favorites_bar": [],
        "other": [],
        "reading_list": [],
    }

    def process_children(children: list) -> list:
        result = []
        for child in children:
            if child.get("WebBookmarkType") == "WebBookmarkTypeLeaf":
                bookmark = {
                    "name": child.get("URIDictionary", {}).get("title", ""),
                    "url": child.get("URLString", ""),
                    "uuid": child.get("WebBookmarkUUID", ""),
                }
                date_added = parse_safari_date(child.get("DateAdded"))
                if date_added:
                    bookmark["date_added"] = to_iso_date(date_added)
                result.append(bookmark)
            elif child.get("WebBookmarkType") == "WebBookmarkTypeList":
                folder = {
                    "name": child.get("Title", ""),
                    "uuid": child.get("WebBookmarkUUID", ""),
                    "children": process_children(child.get("Children", [])),
                }
                result.append(folder)
        return result

    for item in plist_data.get("Children", []):
        title = item.get("Title", "")
        if title == "BookmarksBar":
            sections["favorites_bar"] = process_children(item.get("Children", []))
        elif title == "BookmarksMenu":
            sections["other"] = process_children(item.get("Children", []))
        elif title == "com.apple.ReadingList":
            sections["reading_list"] = process_children(item.get("Children", []))

    return sections


def extract_chrome_bookmarks(chrome_data: dict) -> dict[str, list]:
    """Extract bookmarks from Chrome JSON structure."""
    sections = {
        "favorites_bar": [],
        "other": [],
        "mobile": [],
    }

    def process_node(node: dict) -> dict | None:
        if node.get("type") == "url":
            bookmark = {
                "name": node.get("name", ""),
                "url": node.get("url", ""),
                "guid": node.get("guid", ""),
            }
            date_added = parse_chrome_date(node.get("date_added", ""))
            if date_added:
                bookmark["date_added"] = to_iso_date(date_added)
            return bookmark
        elif node.get("type") == "folder":
            return {
                "name": node.get("name", ""),
                "guid": node.get("guid", ""),
                "children": [
                    processed
                    for child in node.get("children", [])
                    if (processed := process_node(child)) is not None
                ],
            }
        return None

    roots = chrome_data.get("roots", {})

    if "bookmark_bar" in roots:
        for child in roots["bookmark_bar"].get("children", []):
            if (processed := process_node(child)):
                sections["favorites_bar"].append(processed)

    if "other" in roots:
        for child in roots["other"].get("children", []):
            if (processed := process_node(child)):
                sections["other"].append(processed)

    if "synced" in roots:
        for child in roots["synced"].get("children", []):
            if (processed := process_node(child)):
                sections["mobile"].append(processed)

    return sections


def build_safari_plist(yaml_data: dict, existing_plist: dict) -> dict:
    """Build Safari plist structure from YAML data."""
    base = yaml_data.get("base", {})

    def build_children(items: list, existing_map: dict) -> list:
        result = []
        for item in items:
            if "url" in item:
                # Bookmark
                existing = existing_map.get(item["url"], {})
                node = {
                    "WebBookmarkType": "WebBookmarkTypeLeaf",
                    "WebBookmarkUUID": item.get("uuid") or existing.get("WebBookmarkUUID") or str(__import__("uuid").uuid4()).upper(),
                    "URLString": item["url"],
                    "URIDictionary": {"title": item["name"]},
                }
                if item.get("date_added"):
                    node["DateAdded"] = datetime.fromisoformat(item["date_added"].replace("Z", "+00:00"))
                result.append(node)
            elif "children" in item or "name" in item:
                # Folder
                node = {
                    "WebBookmarkType": "WebBookmarkTypeList",
                    "WebBookmarkUUID": item.get("uuid") or str(__import__("uuid").uuid4()).upper(),
                    "Title": item["name"],
                    "Children": build_children(item.get("children", []), existing_map),
                }
                result.append(node)
        return result

    # Build URL -> existing node map for preserving UUIDs
    existing_map = {}
    def collect_existing(children):
        for child in children:
            if child.get("WebBookmarkType") == "WebBookmarkTypeLeaf":
                existing_map[child.get("URLString", "")] = child
            elif "Children" in child:
                collect_existing(child["Children"])

    for item in existing_plist.get("Children", []):
        collect_existing(item.get("Children", []))

    # Find or create the main sections
    new_children = []
    for item in existing_plist.get("Children", []):
        title = item.get("Title", "")
        if title == "BookmarksBar":
            item = dict(item)
            item["Children"] = build_children(base.get("favorites_bar", []), existing_map)
        elif title == "BookmarksMenu":
            item = dict(item)
            item["Children"] = build_children(base.get("other", []), existing_map)
        elif title == "com.apple.ReadingList":
            item = dict(item)
            item["Children"] = build_children(base.get("reading_list", []), existing_map)
        new_children.append(item)

    result = dict(existing_plist)
    result["Children"] = new_children
    return result


def build_chrome_json(yaml_data: dict, existing_json: dict, profile_key: str = "personal") -> dict:
    """Build Chrome JSON structure from YAML data."""
    base = yaml_data.get("base", {})
    overrides = yaml_data.get("overrides", {}).get(f"chrome/{profile_key}", {})

    # Apply overrides
    def apply_overrides(section_name: str, items: list) -> list:
        section_overrides = overrides.get(section_name, {})
        adds = section_overrides.get("+", [])
        removes = set(section_overrides.get("-", []))

        # Filter out removed items
        result = [item for item in items if item.get("name") not in removes and item.get("url") not in removes]
        # Add new items
        result.extend(adds)
        return result

    def build_node(item: dict, existing_map: dict) -> dict:
        if "url" in item:
            existing = existing_map.get(item["url"], {})
            node = {
                "type": "url",
                "name": item["name"],
                "url": item["url"],
                "guid": item.get("guid") or existing.get("guid") or str(__import__("uuid").uuid4()),
                "date_added": existing.get("date_added") or to_chrome_timestamp(datetime.now(timezone.utc)),
            }
            if item.get("date_added"):
                node["date_added"] = to_chrome_timestamp(datetime.fromisoformat(item["date_added"].replace("Z", "+00:00")))
            return node
        else:
            return {
                "type": "folder",
                "name": item["name"],
                "guid": item.get("guid") or str(__import__("uuid").uuid4()),
                "date_added": to_chrome_timestamp(datetime.now(timezone.utc)),
                "date_modified": to_chrome_timestamp(datetime.now(timezone.utc)),
                "children": [build_node(child, existing_map) for child in item.get("children", [])],
            }

    # Build URL -> existing node map
    existing_map = {}
    def collect_existing(node):
        if node.get("type") == "url":
            existing_map[node.get("url", "")] = node
        for child in node.get("children", []):
            collect_existing(child)

    roots = existing_json.get("roots", {})
    for root in roots.values():
        if isinstance(root, dict):
            collect_existing(root)

    # Build new structure
    result = dict(existing_json)
    if "roots" not in result:
        result["roots"] = {}

    favorites = apply_overrides("favorites_bar", base.get("favorites_bar", []))
    other = apply_overrides("other", base.get("other", []))
    mobile = apply_overrides("mobile", base.get("mobile", []))

    result["roots"]["bookmark_bar"] = {
        "type": "folder",
        "name": "Bookmarks Bar",
        "guid": roots.get("bookmark_bar", {}).get("guid", str(__import__("uuid").uuid4())),
        "date_added": roots.get("bookmark_bar", {}).get("date_added", to_chrome_timestamp(datetime.now(timezone.utc))),
        "date_modified": to_chrome_timestamp(datetime.now(timezone.utc)),
        "children": [build_node(item, existing_map) for item in favorites],
    }

    result["roots"]["other"] = {
        "type": "folder",
        "name": "Other Bookmarks",
        "guid": roots.get("other", {}).get("guid", str(__import__("uuid").uuid4())),
        "date_added": roots.get("other", {}).get("date_added", to_chrome_timestamp(datetime.now(timezone.utc))),
        "date_modified": to_chrome_timestamp(datetime.now(timezone.utc)),
        "children": [build_node(item, existing_map) for item in other],
    }

    result["roots"]["synced"] = {
        "type": "folder",
        "name": "Mobile Bookmarks",
        "guid": roots.get("synced", {}).get("guid", str(__import__("uuid").uuid4())),
        "date_added": roots.get("synced", {}).get("date_added", to_chrome_timestamp(datetime.now(timezone.utc))),
        "date_modified": to_chrome_timestamp(datetime.now(timezone.utc)),
        "children": [build_node(item, existing_map) for item in mobile],
    }

    result["version"] = 1

    return result


def detect_changes(
    yaml_bookmarks: dict[str, dict],
    browser_bookmarks: dict[str, dict],
    last_sync_bookmarks: dict[str, dict] | None,
) -> tuple[list[dict], list[dict], list[dict]]:
    """
    Detect changes between YAML and browser bookmarks.

    Returns:
        - additions: bookmarks added (in YAML or browser but not in last sync)
        - deletions: bookmarks to delete (in last sync but not in YAML/browser)
        - conflicts: bookmarks that differ and need resolution
    """
    additions = []
    deletions = []
    conflicts = []

    yaml_urls = set(yaml_bookmarks.keys())
    browser_urls = set(browser_bookmarks.keys())
    last_sync_urls = set(last_sync_bookmarks.keys()) if last_sync_bookmarks else set()

    # New in YAML (not in browser, not in last sync) -> add to browser
    for url in yaml_urls - browser_urls:
        if url not in last_sync_urls:
            additions.append({"source": "yaml", "bookmark": yaml_bookmarks[url]})

    # New in browser (not in YAML, not in last sync) -> add to YAML
    for url in browser_urls - yaml_urls:
        if url not in last_sync_urls:
            additions.append({"source": "browser", "bookmark": browser_bookmarks[url]})

    # Deleted from YAML (in last sync, in browser, not in YAML) -> delete from browser
    for url in last_sync_urls & browser_urls - yaml_urls:
        deletions.append({"target": "browser", "bookmark": browser_bookmarks[url]})

    # Deleted from browser (in last sync, in YAML, not in browser) -> delete from YAML
    for url in last_sync_urls & yaml_urls - browser_urls:
        deletions.append({"target": "yaml", "bookmark": yaml_bookmarks[url]})

    # Check for conflicts (same URL, different data)
    for url in yaml_urls & browser_urls:
        yaml_bm = yaml_bookmarks[url]
        browser_bm = browser_bookmarks[url]
        if yaml_bm.get("name") != browser_bm.get("name"):
            conflicts.append({
                "url": url,
                "yaml": yaml_bm,
                "browser": browser_bm,
            })

    return additions, deletions, conflicts


def merge_to_yaml(yaml_data: dict, additions: list[dict]) -> dict:
    """Merge browser additions into YAML data."""
    for add in additions:
        if add["source"] != "browser":
            continue
        bookmark = add["bookmark"]
        path = bookmark.get("path", "")

        # Add to appropriate section based on path
        section = "favorites_bar" if "bar" in path.lower() else "other"
        if section not in yaml_data.get("base", {}):
            yaml_data.setdefault("base", {})[section] = []

        yaml_data["base"][section].append({
            "name": bookmark["name"],
            "url": bookmark["url"],
            "date_added": bookmark.get("date_added"),
        })

    return yaml_data


def sync_push(dry_run: bool = False) -> None:
    """Push YAML changes to browsers."""
    print("Loading YAML config...")
    yaml_data = load_yaml(YAML_PATH)
    targets = yaml_data.get("targets", {})

    # Sync to Safari
    if targets.get("safari", {}).get("enabled", True):
        print("\nSyncing to Safari...")
        existing_plist = load_safari_bookmarks()
        if existing_plist:
            new_plist = build_safari_plist(yaml_data, existing_plist)
            if dry_run:
                print("  [DRY RUN] Would update Safari bookmarks")
            else:
                save_safari_bookmarks(new_plist)
                print("  Updated Safari bookmarks")
        else:
            print("  Safari bookmarks not found, skipping")

    # Sync to Chrome profiles
    chrome_targets = targets.get("chrome", {})
    for profile_key, profile_config in chrome_targets.items():
        if not profile_config.get("enabled", True):
            print(f"\nSkipping Chrome/{profile_key} (disabled)")
            continue

        profile_path = Path(os.path.expanduser(profile_config.get("path", "")))
        print(f"\nSyncing to Chrome/{profile_key}...")

        existing_json = load_chrome_bookmarks(profile_path)
        if existing_json:
            new_json = build_chrome_json(yaml_data, existing_json, profile_key)
            if dry_run:
                print(f"  [DRY RUN] Would update Chrome/{profile_key} bookmarks")
            else:
                save_chrome_bookmarks(profile_path, new_json)
                print(f"  Updated Chrome/{profile_key} bookmarks")
        else:
            print(f"  Chrome/{profile_key} bookmarks not found, skipping")

    # Save sync state
    if not dry_run:
        state: SyncState = {
            "last_sync": datetime.now(timezone.utc).isoformat(),
            "yaml_hash": hash_content(yaml_data),
            "safari_hash": hash_content(load_safari_bookmarks()) if SAFARI_PLIST.exists() else "",
            "chrome_hashes": {},
        }
        for profile_key, profile_config in chrome_targets.items():
            if profile_config.get("enabled", True):
                profile_path = Path(os.path.expanduser(profile_config.get("path", "")))
                chrome_data = load_chrome_bookmarks(profile_path)
                if chrome_data:
                    state["chrome_hashes"][profile_key] = hash_content(chrome_data)
        save_sync_state(state)
        print("\nSync state saved")


def sync_pull(dry_run: bool = False) -> None:
    """Pull browser changes into YAML."""
    print("Loading current state...")
    yaml_data = load_yaml(YAML_PATH)
    prev_state = load_sync_state()

    # Flatten YAML bookmarks
    yaml_flat = {}
    for section in ["favorites_bar", "other", "reading_list", "mobile"]:
        items = yaml_data.get("base", {}).get(section, [])
        yaml_flat.update(flatten_bookmarks(items, section))

    # Load previous sync state bookmarks (if available)
    last_sync_flat = None  # TODO: Store flattened bookmarks in state

    # Check Safari for changes
    targets = yaml_data.get("targets", {})
    if targets.get("safari", {}).get("enabled", True) and SAFARI_PLIST.exists():
        print("\nChecking Safari for changes...")
        safari_data = load_safari_bookmarks()
        safari_sections = extract_safari_bookmarks(safari_data)
        safari_flat = {}
        for section, items in safari_sections.items():
            safari_flat.update(flatten_bookmarks(items, section))

        additions, deletions, conflicts = detect_changes(yaml_flat, safari_flat, last_sync_flat)

        if additions:
            print(f"  Found {len([a for a in additions if a['source'] == 'browser'])} new bookmarks in Safari")
        if deletions:
            print(f"  Found {len([d for d in deletions if d['target'] == 'yaml'])} deletions from Safari")
        if conflicts:
            print(f"  Found {len(conflicts)} conflicts")
            for c in conflicts:
                print(f"    - {c['url']}: YAML='{c['yaml']['name']}' vs Safari='{c['browser']['name']}'")

        if additions and not dry_run:
            yaml_data = merge_to_yaml(yaml_data, additions)

    # Check Chrome profiles
    chrome_targets = targets.get("chrome", {})
    for profile_key, profile_config in chrome_targets.items():
        if not profile_config.get("enabled", True):
            continue

        profile_path = Path(os.path.expanduser(profile_config.get("path", "")))
        bookmarks_path = profile_path / "Bookmarks" if profile_path.is_dir() else profile_path

        if not bookmarks_path.exists():
            continue

        print(f"\nChecking Chrome/{profile_key} for changes...")
        chrome_data = load_chrome_bookmarks(profile_path)
        chrome_sections = extract_chrome_bookmarks(chrome_data)
        chrome_flat = {}
        for section, items in chrome_sections.items():
            chrome_flat.update(flatten_bookmarks(items, section))

        additions, deletions, conflicts = detect_changes(yaml_flat, chrome_flat, last_sync_flat)

        if additions:
            print(f"  Found {len([a for a in additions if a['source'] == 'browser'])} new bookmarks")
        if conflicts:
            print(f"  Found {len(conflicts)} conflicts")

    # Save updated YAML
    if not dry_run:
        save_yaml(YAML_PATH, yaml_data)
        print("\nYAML updated")


def sync_status() -> None:
    """Show sync status and any pending changes."""
    print("Bookmark Sync Status")
    print("=" * 40)

    yaml_data = load_yaml(YAML_PATH)
    prev_state = load_sync_state()

    if prev_state:
        print(f"Last sync: {prev_state['last_sync']}")
    else:
        print("Last sync: Never")

    # Count bookmarks in YAML
    total = 0
    for section in ["favorites_bar", "other", "reading_list", "mobile"]:
        items = yaml_data.get("base", {}).get(section, [])
        flat = flatten_bookmarks(items, section)
        count = len(flat)
        total += count
        print(f"  {section}: {count} bookmarks")
    print(f"  Total: {total} bookmarks")

    # Check targets
    targets = yaml_data.get("targets", {})
    print("\nTargets:")

    if targets.get("safari", {}).get("enabled", True):
        if SAFARI_PLIST.exists():
            safari_data = load_safari_bookmarks()
            safari_sections = extract_safari_bookmarks(safari_data)
            safari_count = sum(len(flatten_bookmarks(items, s)) for s, items in safari_sections.items())

            current_hash = hash_content(safari_data)
            changed = prev_state and current_hash != prev_state.get("safari_hash", "")
            status = " (changed)" if changed else ""
            print(f"  Safari: {safari_count} bookmarks{status}")
        else:
            print("  Safari: Not found")

    chrome_targets = targets.get("chrome", {})
    for profile_key, profile_config in chrome_targets.items():
        enabled = profile_config.get("enabled", True)
        if not enabled:
            print(f"  Chrome/{profile_key}: Disabled")
            continue

        profile_path = Path(os.path.expanduser(profile_config.get("path", "")))
        bookmarks_path = profile_path / "Bookmarks" if profile_path.is_dir() else profile_path

        if bookmarks_path.exists():
            chrome_data = load_chrome_bookmarks(profile_path)
            chrome_sections = extract_chrome_bookmarks(chrome_data)
            chrome_count = sum(len(flatten_bookmarks(items, s)) for s, items in chrome_sections.items())

            current_hash = hash_content(chrome_data)
            changed = prev_state and current_hash != prev_state.get("chrome_hashes", {}).get(profile_key, "")
            status = " (changed)" if changed else ""
            print(f"  Chrome/{profile_key}: {chrome_count} bookmarks{status}")
        else:
            print(f"  Chrome/{profile_key}: Not found")


def main():
    parser = argparse.ArgumentParser(description="Bidirectional bookmark sync")
    subparsers = parser.add_subparsers(dest="command", help="Commands")

    # Push command
    push_parser = subparsers.add_parser("push", help="Push YAML to browsers")
    push_parser.add_argument("--dry-run", action="store_true", help="Show what would be done")

    # Pull command
    pull_parser = subparsers.add_parser("pull", help="Pull browser changes to YAML")
    pull_parser.add_argument("--dry-run", action="store_true", help="Show what would be done")

    # Status command
    subparsers.add_parser("status", help="Show sync status")

    # Backup command
    subparsers.add_parser("backup", help="Create backups of all browser bookmarks")

    args = parser.parse_args()

    if args.command == "push":
        sync_push(dry_run=args.dry_run)
    elif args.command == "pull":
        sync_pull(dry_run=args.dry_run)
    elif args.command == "status":
        sync_status()
    elif args.command == "backup":
        if SAFARI_PLIST.exists():
            backup_safari()
        yaml_data = load_yaml(YAML_PATH)
        for profile_key, profile_config in yaml_data.get("targets", {}).get("chrome", {}).items():
            profile_path = Path(os.path.expanduser(profile_config.get("path", "")))
            bookmarks_path = profile_path / "Bookmarks" if profile_path.is_dir() else profile_path
            if bookmarks_path.exists():
                backup_chrome(profile_path)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
