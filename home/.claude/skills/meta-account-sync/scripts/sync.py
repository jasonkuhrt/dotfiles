#!/usr/bin/env python3
"""Make the Claude desktop app's per-account state match the account used last.

The app keeps one folder of session records and one sidebar (sections and
filing) per account/org scope, and one set of session presets per account.
This makes the current scope match the scope used most recently before it:
per session, the newer record wins, and the filing of whichever scope's
record won comes with it. Presets match by name and the source's wins; the
source's built-in defaults for new sessions replace the current ones.

  sync.py plan [--from <uuid>]   print what differs, as JSON
  sync.py copy [--from <uuid>]   copy the winning records in, back up what they
                                 replace, rebuild the archive index, and leave
                                 an at-quit waiter
  sync.py at-quit --scope <account/org> --from <account/org>
                                 wait for the app to quit, write the presets
                                 into its localStorage, reopen it

Sections and filing are only computed here. The app's ccd_sidebar tools apply
them: the window owns that state, and the config file is its mirror. Presets
live in the app's localStorage, which a running app holds locked and rewrites
its presets file from, so only a closed app takes them.
"""

import argparse
import json
import os
import shutil
import signal
import subprocess
import sys
import time
from pathlib import Path

import localstorage

APP = Path.home() / "Library/Application Support/Claude"
RECORDS = APP / "claude-code-sessions"
CONFIG = APP / "claude_desktop_config.json"
PRESETS_KEY = "persisted.ccd-session-presets.{}"
BACKUPS = Path.home() / ".local/state/meta-account-sync"
WAITER = BACKUPS / "at-quit.pid"
APP_BINARY = "/Claude.app/Contents/MacOS/Claude"
# Fields from the other account's quota state, such as a weekly-limit banner.
STALE_KEYS = ("error", "errorAt", "errorRows")


def current_scope():
    account = os.environ.get("CLAUDE_CODE_ACCOUNT_UUID")
    org = os.environ.get("CLAUDE_CODE_ORGANIZATION_UUID")
    if not (account and org):
        sys.exit("Run this from a Code session in the Claude desktop app: "
                 "CLAUDE_CODE_ACCOUNT_UUID or CLAUDE_CODE_ORGANIZATION_UUID is unset.")
    return f"{account}/{org}"


def last_write(scope):
    with os.scandir(RECORDS / scope) as entries:
        return max((e.stat().st_mtime for e in entries if e.name.startswith("local_")), default=0)


def source_scope(current, wanted):
    others = [f"{d.parent.name}/{d.name}" for d in RECORDS.glob("*/*")
              if d.is_dir() and f"{d.parent.name}/{d.name}" != current]
    if wanted:
        matches = [s for s in others if wanted in s]
        if len(matches) != 1:
            sys.exit(f"--from {wanted} matches {len(matches)} of {others}")
        return matches[0]
    if not others:
        sys.exit("No other account has session records.")
    return max(others, key=last_write)


def load_records(scope):
    records = {}
    for path in (RECORDS / scope).glob("local_*.json"):
        try:
            records[path.stem] = json.loads(path.read_text())
        except (OSError, json.JSONDecodeError):
            continue  # caught mid-write; the next plan sees it
    return records


def activity(record):
    return record.get("lastActivityAt") or record.get("createdAt") or 0


def shown(record):
    return activity(record), record.get("title"), bool(record.get("isArchived"))


def sidebar(prefs, scope):
    sections = prefs.get("dframe-code-sections", {}).get(scope, {}).get("sections", [])
    manual = [s for s in sorted(sections, key=lambda s: s["order"]) if s.get("kind") == "manual"]
    names = {s["id"]: s["name"] for s in manual}
    assignments = prefs.get("dframe-group-scopes", {}).get(scope, {}).get("assignments", {})
    filing = {key.removeprefix("code:"): names.get(group)
              for key, group in assignments.items() if key.startswith("code:")}
    return manual, filing


def section_ops(src, tgt, src_filing, tgt_filing):
    """Ops that turn the target's sections (names, in order) into the source's.

    A source section the target lacks takes over the target-only section whose
    sessions overlap it most (a rename), else it is created. Leftover
    target-only sections are deleted. create_section appends, so when the
    order still differs, every section from the first misplaced one is
    deleted and created again in source order.
    """
    members = lambda filing, name: {sid for sid, n in filing.items() if n == name}
    tgt_only = [t for t in tgt if t not in src]
    renamed = {}
    for s in (s for s in src if s not in tgt):
        free = [t for t in tgt_only if t not in renamed]
        best = max(free, default=None,
                   key=lambda t: len(members(src_filing, s) & members(tgt_filing, t)))
        if best and members(src_filing, s) & members(tgt_filing, best):
            renamed[best] = s
    kept = [t for t in tgt if t in src or t in renamed]
    result = [renamed.get(t, t) for t in kept]
    result += [s for s in src if s not in result]
    first_misplaced = next((i for i, (a, b) in enumerate(zip(result, src)) if a != b), None)
    rebuilt = set(src[first_misplaced:]) if first_misplaced is not None else set()

    ops = [{"op": "rename", "from": t, "to": s} for t, s in renamed.items() if s not in rebuilt]
    deleted = [t for t in tgt if t in tgt_only and t not in renamed]
    deleted += [t for t in kept if renamed.get(t, t) in rebuilt]
    ops += [{"op": "delete", "name": t} for t in deleted]
    existing = {renamed.get(t, t) for t in kept} - rebuilt
    ops += [{"op": "create", "name": s} for s in src if s not in existing]
    return ops, {t: s for t, s in renamed.items() if s not in rebuilt}, set(deleted)


def stored_presets(account):
    """An account's presets as the app stores them: {"state": {...}, "version": n}."""
    raw = localstorage.read(PRESETS_KEY.format(account))
    return json.loads(raw) if raw else None


def presets(current, source):
    """The current account's stored presets after taking the source's, and what changes.

    A preset is matched by name. The source's place and settings win; the
    target keeps its own id and use times. Presets only the target has stay,
    and so does the rest of the target's state (its recent places).
    """
    src_account, tgt_account = source.split("/")[0], current.split("/")[0]
    none = {"add": [], "change": [], "builtIns": False}
    src = stored_presets(src_account) if src_account != tgt_account else None
    if src is None:
        return None, none
    tgt = stored_presets(tgt_account) or {"state": {"presets": []}, "version": src.get("version")}
    src_state, tgt_state = src["state"], tgt["state"]
    merged = [dict(p) for p in tgt_state.get("presets", [])]
    by_name = {p["name"]: p for p in merged}
    added, changed = [], []
    for p in src_state.get("presets", []):
        mine = by_name.get(p["name"])
        if mine is None:
            merged.append(dict(p))
            added.append(p["name"])
        elif (mine.get("target"), mine.get("settings")) != (p.get("target"), p.get("settings")):
            mine.update(target=p.get("target"), settings=p.get("settings"))
            changed.append(p["name"])
    built_ins = src_state.get("builtIns") or tgt_state.get("builtIns", {})
    result = {**tgt, "state": {**tgt_state, "presets": merged, "builtIns": built_ins}}
    return result, {"add": added, "change": changed,
                    "builtIns": built_ins != tgt_state.get("builtIns", {})}


def plan(current, source):
    src_records, tgt_records = load_records(source), load_records(current)
    host = os.environ.get("CLAUDE_CODE_HOST_SESSION_ID")
    # A tie goes to the source: archiving or unarchiving there moves no timestamp.
    source_wins = {sid for sid, rec in src_records.items() if sid != host and (
        sid not in tgt_records or activity(rec) >= activity(tgt_records[sid]))}
    copy = sorted(sid for sid in source_wins
                  if sid not in tgt_records or shown(src_records[sid]) != shown(tgt_records[sid]))

    prefs = json.loads(CONFIG.read_text())["preferences"]["epitaxyPrefs"]
    src_sections, src_filing = sidebar(prefs, source)
    tgt_sections, tgt_filing = sidebar(prefs, current)
    src_names = [s["name"] for s in src_sections]
    tgt_names = [s["name"] for s in tgt_sections]
    ops, renamed, deleted = section_ops(src_names, tgt_names, src_filing, tgt_filing)

    moves = {}
    for sid in sorted(set(tgt_records) | set(copy)):
        record = src_records[sid] if sid in copy else tgt_records[sid]
        if record.get("isArchived"):
            continue  # the app files only active sessions; move_sessions refuses archived ones
        if sid in source_wins:
            want = src_filing.get(sid)
        else:
            want = renamed.get(tgt_filing.get(sid), tgt_filing.get(sid))
        want = want if want in src_names else None
        now = tgt_filing.get(sid)
        now = None if now in deleted else renamed.get(now, now)
        if want != now:
            moves.setdefault(want or "", []).append(sid)

    by_name = {s["name"]: s for s in tgt_sections}
    before = {renamed.get(n, n): by_name[n] for n in tgt_names if n not in deleted}
    views, collapsed = [], []
    for s in src_sections:
        was = before.get(s["name"], {"sortBy": "recency", "collapsed": False})
        if s.get("sortBy", "recency") != was.get("sortBy", "recency"):
            views.append({"name": s["name"], "sort_by": s["sortBy"]})
        if s.get("collapsed", False) != was.get("collapsed", False):
            collapsed.append({"name": s["name"], "collapsed": s.get("collapsed", False)})

    index = RECORDS / current / "archived-sessions.idx"
    indexed = set(json.loads(index.read_text())["archived"]) if index.exists() else set()
    archived = {sid for sid, rec in tgt_records.items() if rec.get("isArchived")}
    changes = presets(current, source)[1]

    return {
        "current": current,
        "source": source,
        "records": [{"id": sid, "title": src_records[sid].get("title"),
                     "archived": bool(src_records[sid].get("isArchived")),
                     "replaces": sid in tgt_records} for sid in copy],
        "presets": [] if not any(changes.values()) else changes,
        "archive_index_ok": indexed == archived,
        "sections": {"source": src_names, "target": tgt_names, "ops": ops},
        "views": views,
        "collapsed": collapsed,
        "moves": moves,
    }


def copy(current, source):
    report = plan(current, source)
    target = RECORDS / current
    backup = BACKUPS / time.strftime("%Y%m%dT%H%M%S") / current
    for entry in report["records"]:
        dest = target / f"{entry['id']}.json"
        if dest.exists():
            backup.mkdir(parents=True, exist_ok=True)
            (backup / dest.name).write_bytes(dest.read_bytes())
        record = json.loads((RECORDS / source / dest.name).read_text())
        for key in STALE_KEYS:
            record.pop(key, None)
        tmp = dest.with_suffix(".json.tmp")
        tmp.write_text(json.dumps(record, ensure_ascii=False, separators=(",", ":")))
        tmp.chmod(0o600)
        tmp.replace(dest)

    archived = sorted(sid for sid, rec in load_records(current).items() if rec.get("isArchived"))
    index = target / "archived-sessions.idx"
    tmp = index.with_suffix(".idx.tmp")
    tmp.write_text(json.dumps({"v": 1, "archived": archived}, separators=(",", ":")))
    tmp.chmod(0o600)
    tmp.replace(index)

    return {"copied": len(report["records"]),
            "presets": report["presets"],
            "backup": str(backup) if backup.exists() else None,
            "archived_indexed": len(archived),
            "at_quit": wait_for_quit(current, source)}


def wait_for_quit(current, source):
    """Start the at-quit waiter, in place of any earlier one, and return its pid."""
    BACKUPS.mkdir(parents=True, exist_ok=True)
    try:
        old = int(WAITER.read_text())
        command = subprocess.run(["ps", "-o", "command=", "-p", str(old)],
                                 capture_output=True, text=True).stdout
        if "at-quit" in command:
            os.kill(old, signal.SIGTERM)
    except (OSError, ValueError):
        pass
    with open(BACKUPS / "at-quit.log", "a") as log:
        waiter = subprocess.Popen(
            [sys.executable, __file__, "at-quit", "--scope", current, "--from", source],
            stdin=subprocess.DEVNULL, stdout=log, stderr=subprocess.STDOUT,
            start_new_session=True)  # outlives this session when the app quits
    WAITER.write_text(str(waiter.pid))
    return waiter.pid


def app_running():
    out = subprocess.run(["ps", "-axo", "comm="], capture_output=True, text=True).stdout
    return any(line.endswith(APP_BINARY) for line in out.splitlines())


def at_quit(current, source):
    """Once the app has quit, write the source's presets into its localStorage and reopen it."""
    say = lambda *parts: print(time.strftime("%Y-%m-%dT%H:%M:%S"), current, *parts, flush=True)
    say("waiting for the app to quit, source", source)
    try:
        deadline = time.time() + 12 * 3600
        while True:
            while app_running():
                if time.time() > deadline:
                    return say("gave up: the app did not quit within 12 hours")
                time.sleep(0.5)
            if write_presets(current, source, say):
                break
            say("the app reopened before its database was free; waiting for the next quit")
        subprocess.run(["open", "-a", "Claude"])
        say("reopened the app")
    finally:
        WAITER.unlink(missing_ok=True)


def write_presets(current, source, say):
    """Write the presets once the database is free; False if the app opens first."""
    while True:
        try:
            with localstorage.closed():
                stored, changes = presets(current, source)
                if stored is not None and any(changes.values()):
                    backup = BACKUPS / time.strftime("%Y%m%dT%H%M%S") / current / "leveldb"
                    shutil.copytree(localstorage.DIR, backup)
                    localstorage.put(PRESETS_KEY.format(current.split("/")[0]),
                                     json.dumps(stored, ensure_ascii=False, separators=(",", ":")))
                    say("wrote presets", json.dumps(changes), "backup", backup)
                else:
                    say("presets already match")
            return True
        except BlockingIOError:
            if app_running():
                return False
            time.sleep(0.2)  # the app's last process is still closing the database


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("command", choices=["plan", "copy", "at-quit"])
    parser.add_argument("--from", dest="source", help="uuid (or part) of the source account or org")
    parser.add_argument("--scope", help="account/org to sync into (at-quit only)")
    args = parser.parse_args()
    current = args.scope or current_scope()
    source = source_scope(current, args.source)
    if args.command == "at-quit":
        return at_quit(current, source)
    result = plan(current, source) if args.command == "plan" else copy(current, source)
    json.dump(result, sys.stdout, indent=2, ensure_ascii=False)
    print()


if __name__ == "__main__":
    main()
