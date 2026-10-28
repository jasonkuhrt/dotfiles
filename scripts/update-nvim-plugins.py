#!/usr/bin/env python3
"""Apply reviewed plugin commits from an upgrade audit without loading user config."""

import argparse
import datetime
import json
import pathlib
import re
import shutil
import subprocess


def git(directory, *args):
    return subprocess.check_output(
        ["git", "-C", str(directory), *args], text=True
    ).strip()


parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("plan", type=pathlib.Path)
args = parser.parse_args()
plan = json.loads(args.plan.read_text())
plugins = plan["nvim_plugins"] if isinstance(plan, dict) else plan
config = pathlib.Path.home() / ".config/nvim"
lock_path = config / "lazy-lock.json"
lock = json.loads(lock_path.read_text())
plugin_root = pathlib.Path.home() / ".local/share/nvim/lazy"
selected = [row for row in plugins if row.get("updates")]
stamp = datetime.datetime.now(datetime.timezone.utc).strftime("%Y%m%dT%H%M%SZ")
backup = pathlib.Path.home() / ".local/state/tool-upgrades" / (stamp + "-nvim")
backup.mkdir(parents=True, mode=0o700)
shutil.copy2(lock_path, backup / "lazy-lock.json")

# Validate the complete plan before changing any checkout.
for row in selected:
    name = row["name"]
    directory = plugin_root / name
    target = row["available"]
    if not re.fullmatch(r"[0-9a-f]{40}", target):
        raise SystemExit(f"Invalid commit for {name}")
    if lock[name]["branch"] != row["branch"]:
        raise SystemExit(f"Configured branch changed for {name}; refresh the audit")
    # Preserve generated help tags and other untracked files. Git checkout
    # refuses an overwrite if an incoming tracked file collides with them.
    if git(directory, "status", "--porcelain", "--untracked-files=no"):
        raise SystemExit(f"Preserve local changes in {name} before updating")
    head = git(directory, "rev-parse", "HEAD")
    if head not in {row["installed"], target}:
        raise SystemExit(f"Installed commit changed for {name}; refresh the audit")
    if lock[name]["commit"] not in {row["installed"], target}:
        raise SystemExit(f"Locked commit changed for {name}; refresh the audit")


def save_lock():
    # Retain lazy.nvim's compact, one-entry-per-line lockfile layout.
    text = "{\n" + ",\n".join(
        "  " + json.dumps(name) + ": { " + json.dumps(value)[1:-1] + " }"
        for name, value in lock.items()
    ) + "\n}\n"
    temporary = lock_path.with_name("lazy-lock.json.upgrade-tmp")
    temporary.write_text(text)
    temporary.replace(lock_path)


for row in selected:
    name = row["name"]
    directory = plugin_root / name
    target = row["available"]
    if git(directory, "rev-parse", "HEAD") != target:
        git(directory, "fetch", "--no-tags", "origin", "refs/heads/" + row["branch"])
        git(directory, "cat-file", "-e", target + "^{commit}")
        git(directory, "checkout", "--detach", target)
    lock[name]["commit"] = target
    save_lock()
    print(f"{name}: {target[:12]}")

if any(row["name"] == "nvim-treesitter" for row in selected):
    # Complete Treesitter's upstream build step in an isolated editor: this
    # refreshes installed parsers without starting personal plugin integrations.
    subprocess.run(
        [
            "nvim", "--headless", "-u", "NONE",
            "-c", "lua vim.opt.rtp:append(vim.fn.stdpath('data') .. '/lazy/nvim-treesitter'); "
            "assert(require('nvim-treesitter').update(nil, {summary=true, max_jobs=4}):wait(600000))",
            "-c", "qa",
        ],
        check=True,
    )

print(f"Updated {len(selected)} reviewed plugins; backup: {backup}")
