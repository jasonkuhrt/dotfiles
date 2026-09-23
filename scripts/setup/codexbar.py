"""Apply local CodexBar settings while preserving iCloud configuration and secrets."""
import copy
import json
import os
from pathlib import Path
import plistlib
import shutil
import subprocess
import tempfile
import time

DOMAIN = "com.steipete.codexbar"


def merge_config(current, managed, target_home):
    if current.get("version") != 1:
        raise ValueError("Unsupported CodexBar config version")
    result = copy.deepcopy(current)
    providers = result.setdefault("providers", [])
    for source in managed["providers"]:
        patch = dict(source)
        if "codexProfileHomePaths" in patch:
            paths = [str(target_home / p.removeprefix("~/")) for p in patch["codexProfileHomePaths"]]
            paths = [p for p in paths if (Path(p) / "auth.json").is_file()]
            if not paths:
                continue
            patch["codexProfileHomePaths"] = paths
        if "claudeSwapExecutablePath" in patch:
            patch["claudeSwapExecutablePath"] = str(target_home / patch["claudeSwapExecutablePath"].removeprefix("~/"))
        matches = [p for p in providers if p["id"] == patch["id"]]
        if len(matches) > 1:
            raise ValueError("Ambiguous CodexBar provider identity")
        if matches:
            matches[0].update(patch)
        else:
            providers.append(patch)
    return result


def main():
    root = Path(os.environ["DOTFILES_ROOT"])
    target_home = Path.home()
    managed = json.loads((root / "scripts/data/codexbar-local.json").read_text())
    config_path = target_home / ".config/codexbar/config.json"
    if config_path.is_symlink():
        raise RuntimeError("CodexBar's credential-bearing config must remain a local regular file")

    def read_config():
        return json.loads(config_path.read_text()) if config_path.exists() else {"version": 1, "providers": []}

    current = read_config()
    exported = subprocess.run(["defaults", "export", DOMAIN, "-"], capture_output=True)
    preferences = plistlib.loads(exported.stdout) if exported.returncode == 0 else {}
    desired = managed["preferences"]
    changed_preferences = {k: v for k, v in desired.items() if preferences.get(k) != v}
    config_changed = merge_config(current, managed, target_home) != current
    restart = False
    if config_changed or changed_preferences:
        # Finish an existing account transaction before attempting configuration changes.
        if subprocess.run(["pgrep", "-f", r"cswap (--switch-to|switch)"], capture_output=True).returncode == 0:
            raise RuntimeError("A Claude account switch is running; retry setup when it finishes")
        restart = subprocess.run(["pgrep", "-x", "CodexBar"], capture_output=True).returncode == 0
        if restart:
            subprocess.run(["pkill", "-TERM", "-x", "CodexBar"], check=True)
            deadline = time.monotonic() + 10
            while subprocess.run(["pgrep", "-x", "CodexBar"], capture_output=True).returncode == 0:
                if time.monotonic() >= deadline:
                    raise RuntimeError("CodexBar did not exit; configuration was not written")
                time.sleep(0.1)
    try:
        # Re-read after the app exits so its last writes and iCloud updates survive.
        current = read_config()
        updated = merge_config(current, managed, target_home)
        if updated != current:
            config_path.parent.mkdir(parents=True, exist_ok=True)
            descriptor, temporary = tempfile.mkstemp(prefix=".config-", dir=config_path.parent)
            try:
                with os.fdopen(descriptor, "w") as output:
                    json.dump(updated, output, indent=2)
                    output.write("\n")
                environment = dict(os.environ, CODEXBAR_CONFIG=temporary)
                check = subprocess.run([shutil.which("codexbar"), "config", "validate"],
                                       env=environment, capture_output=True)
                if check.returncode:
                    raise RuntimeError("Merged CodexBar config failed validation")
                os.replace(temporary, config_path)
            finally:
                Path(temporary).unlink(missing_ok=True)
        for key, value in changed_preferences.items():
            flag = "-bool" if isinstance(value, bool) else "-string"
            encoded = str(value).lower() if isinstance(value, bool) else value
            subprocess.run(["defaults", "write", DOMAIN, key, flag, encoded], check=True)
        print("CodexBar local settings applied; iCloud settings and credentials preserved."
              if config_changed or changed_preferences else "CodexBar local settings already match dotfiles.")
    finally:
        if restart:
            subprocess.run(["open", "-a", "CodexBar"], check=True)


if __name__ == "__main__":
    main()
