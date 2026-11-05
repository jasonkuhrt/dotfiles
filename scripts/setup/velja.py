"""Apply Velja's primary browser and rules from scripts/data/velja.json, and make it the default browser.

Velja stores rules as an array of JSON strings in its preferences. They live in its sandbox
container, which only a terminal allowed to access other apps' data can write; macOS asks once.
Only the managed keys change. The trial, window state and the rest stay as Velja keeps them.
See docs/velja.md.
"""
import json
import os
import plistlib
import shutil
import subprocess
import sys
import time
from pathlib import Path

DOMAIN = "com.sindresorhus.Velja"
APP = Path("/Applications/Velja.app")
LAUNCH_SERVICES = "com.apple.LaunchServices/com.apple.launchservices.secure"


def export(domain):
    out = subprocess.run(["defaults", "export", domain, "-"], capture_output=True)
    return plistlib.loads(out.stdout) if out.returncode == 0 and out.stdout else {}


def current_settings():
    prefs = export(DOMAIN)
    return {"defaultBrowser": prefs.get("defaultBrowser"),
            "rules": [json.loads(rule) for rule in prefs.get("rules", [])]}


def velja_running():
    return subprocess.run(["pgrep", "-x", "Velja"], capture_output=True).returncode == 0


def write(managed):
    # A running Velja could write its own copy back over the new one, so it is stopped first
    # (a signal, which needs no Automation permission) and opened again after.
    if velja_running():
        subprocess.run(["pkill", "-x", "Velja"])
        for _ in range(50):
            if not velja_running():
                break
            time.sleep(0.1)
    rules = [json.dumps(rule, sort_keys=True, separators=(",", ":")) for rule in managed["rules"]]
    for key, value in (("defaultBrowser", managed["defaultBrowser"]), ("rules", rules)):
        # An XML plist fragment keeps each rule a string: `-array` would parse a JSON object
        # as a plist dictionary.
        fragment = plistlib.dumps(value, fmt=plistlib.FMT_XML).decode()
        fragment = fragment[fragment.index("<plist version=\"1.0\">") + len("<plist version=\"1.0\">"):]
        fragment = fragment[:fragment.rindex("</plist>")].strip()
        if subprocess.run(["defaults", "write", DOMAIN, key, fragment]).returncode != 0:
            sys.exit("Writing Velja's settings failed (see above). A terminal inside the Claude app is "
                     "always refused; from your own terminal, allow access to other apps' data when "
                     "macOS asks (System Settings › Privacy & Security).")
    subprocess.run(["open", "-g", "-b", DOMAIN])


def default_browser():
    for handler in export(LAUNCH_SERVICES).get("LSHandlers", []):
        if handler.get("LSHandlerURLScheme") == "https":
            return (handler.get("LSHandlerRoleAll") or "").lower()
    return ""


def main():
    if not APP.exists():
        print("Velja is not installed: get it from the App Store (id 1607635845), then rerun `just velja-setup`.")
        return
    root = Path(os.environ["DOTFILES_ROOT"])
    managed = json.loads((root / "scripts/data/velja.json").read_text())
    if current_settings() != managed:
        write(managed)
        if current_settings() != managed:
            sys.exit("Velja's settings still differ from scripts/data/velja.json after the write.")
        print(f"Velja: primary browser {managed['defaultBrowser']}, {len(managed['rules'])} rules applied.")
    else:
        print("Velja: settings already match.")

    if default_browser() != DOMAIN.lower():
        duti = shutil.which("duti") or "/opt/homebrew/bin/duti"
        # macOS asks to confirm a new default browser; the click is yours.
        for scheme in ("http", "https"):
            subprocess.run([duti, "-s", DOMAIN, scheme, "all"])
        print("Velja: asked macOS to make it the default browser. Confirm the dialog.")


if __name__ == "__main__":
    main()
