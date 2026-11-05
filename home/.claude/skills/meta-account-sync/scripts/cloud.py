#!/usr/bin/env python3
"""Make every account's cloud environments match the org used last.

Cloud environments live on Anthropic's servers, one set per org. Each org is
reached through the Claude Code login claude-account keeps for it
(docs/claude-account.md in the dotfiles): the config dir whose .claude.json
names the org, and that dir's keychain item. A token reaches only its own org,
whatever org a request names. Environments match by name.

  cloud.py plan [--from <uuid>]   print what differs per org, as JSON
  cloud.py copy [--from <uuid>]   create or update the other orgs' environments

Values are never printed: a variable or setup script shows as changed or not.
"""

import argparse
import hashlib
import json
import os
import subprocess
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

from sync import current_scope, source_scope

API = "https://api.anthropic.com"
HOME = Path.home()
CLAUDE = HOME / ".local/bin/claude"
# The fields the web app's environment dialog sends; the rest are derived.
NETWORK_FIELDS = ("allowed_hosts", "allow_default_hosts")


def logins():
    """org uuid -> config dir (None for the default dir) of the login for it."""
    found = {}
    candidates = [(None, HOME / ".claude.json")]
    candidates += [(d, d / ".claude.json") for d in sorted(HOME.glob(".claude-*")) if d.is_dir()]
    for config_dir, path in candidates:
        try:
            org = json.loads(path.read_text()).get("oauthAccount", {}).get("organizationUuid")
        except (OSError, json.JSONDecodeError):
            continue
        if org:
            found.setdefault(org, config_dir)
    return found


def keychain_item(config_dir):
    if config_dir is None:
        return "Claude Code-credentials"
    return "Claude Code-credentials-" + hashlib.sha256(str(config_dir).encode()).hexdigest()[:8]


def read_login(config_dir):
    out = subprocess.run(["security", "find-generic-password", "-s", keychain_item(config_dir), "-w"],
                         capture_output=True, text=True).stdout
    return json.loads(out)["claudeAiOauth"] if out else None


class DeadLogin(Exception):
    pass


def sign_in_command(config_dir):
    """The fish command that signs claude-account's account for config_dir in again."""
    n = "2" if config_dir is None else config_dir.name.removeprefix(".claude-")
    return f"claude{n} auth login"


def token(org, config_dir):
    """A live access token for org, refreshed the way the CLI does it.

    A stored token lasts hours. Running the CLI once on that account renews
    it, even when the account is at its usage limit and the request fails.
    The refresh token has its own expiry, which a refresh doesn't extend:
    past it only a sign-in helps, and the CLI run would blank the item.
    """
    login = read_login(config_dir)
    now = time.time() * 1000
    if login and login["expiresAt"] >= now + 120_000:
        return login["accessToken"]
    if not login or not login.get("refreshToken") or login.get("refreshTokenExpiresAt", now + 1) < now:
        raise DeadLogin(sign_in_command(config_dir))
    env = {k: v for k, v in os.environ.items()
           if not k.startswith(("CLAUDE_CODE_", "CLAUDECODE", "ANTHROPIC_"))}
    env.pop("CLAUDE_CONFIG_DIR", None)
    if config_dir is not None:
        env["CLAUDE_CONFIG_DIR"] = str(config_dir)
    subprocess.run([str(CLAUDE), "-p", "reply with ok", "--model", "haiku"], env=env,
                   cwd=HOME, capture_output=True, timeout=120)
    login = read_login(config_dir)
    if not login or login["expiresAt"] < time.time() * 1000:
        raise DeadLogin(sign_in_command(config_dir))
    return login["accessToken"]


class Org:
    def __init__(self, org, config_dir):
        self.org = org
        self.headers = {"Authorization": f"Bearer {token(org, config_dir)}",
                        "anthropic-beta": "ccr-byoc-2025-07-29",
                        "anthropic-version": "2023-06-01",
                        "x-organization-uuid": org,
                        "content-type": "application/json"}

    def call(self, method, path, body=None):
        data = json.dumps(body).encode() if body is not None else None
        request = urllib.request.Request(API + path, data=data, method=method, headers=self.headers)
        try:
            with urllib.request.urlopen(request) as response:
                return json.loads(response.read() or b"null")
        except urllib.error.HTTPError as error:
            sys.exit(f"{method} {path} for org {self.org}: HTTP {error.code} {error.read()[:300].decode()}")

    def environments(self):
        """name -> full environment, cloud ones only."""
        found, after = {}, None
        while True:
            page = self.call("GET", "/v1/environment_providers" + (f"?after_id={after}" if after else ""))
            for env in page["environments"]:
                if env.get("kind") == "anthropic_cloud" and env.get("state") == "active":
                    found[env["name"]] = self.call("GET", f"/v1/environment_providers/{env['environment_id']}")
            if not page.get("has_more"):
                return found
            after = page["last_id"]


def writable(env):
    """The body the web app sends to create or save an environment."""
    config = dict(env["config"])
    config["network_config"] = {k: config["network_config"].get(k) for k in NETWORK_FIELDS}
    return {"name": env["name"], "description": env.get("description") or "", "config": config}


def differences(src, tgt):
    a, b = writable(src)["config"], writable(tgt)["config"]
    changed = sorted(k for k in set(a) | set(b) if k != "environment" and a.get(k) != b.get(k))
    variables = sorted(k for k in set(a["environment"]) | set(b["environment"])
                       if a["environment"].get(k) != b["environment"].get(k))
    return changed + [f"environment.{k}" for k in variables]


def diff(src_envs, tgt_envs):
    return {
        "create": sorted(n for n in src_envs if n not in tgt_envs),
        "update": {n: d for n in sorted(src_envs) if n in tgt_envs
                   for d in [differences(src_envs[n], tgt_envs[n])] if d},
        "only_here": sorted(n for n in tgt_envs if n not in src_envs),
    }


def run(command, wanted):
    found = logins()
    source = source_scope(current_scope(), wanted).split("/")[1]
    if source not in found:
        sys.exit(f"No Claude Code login names the source org {source}.")
    try:
        src = Org(source, found[source])
    except DeadLogin as dead:
        sys.exit(f"The source org's login is dead. Sign it in again with: {dead}")
    src_envs = src.environments()
    report = {"source_org": source, "source_environments": sorted(src_envs), "orgs": {}}
    for org, config_dir in found.items():
        if org == source:
            continue
        try:
            tgt = Org(org, config_dir)
        except DeadLogin as dead:
            report["orgs"][org] = {"dead_login": str(dead)}
            continue
        tgt_envs = tgt.environments()
        changes = diff(src_envs, tgt_envs)
        if command == "copy":
            for name in changes["create"]:
                tgt.call("POST", "/v1/environment_providers/cloud/create",
                         {"kind": "anthropic_cloud", **writable(src_envs[name])})
            for name in changes["update"]:
                tgt.call("POST", f"/v1/environment_providers/{tgt_envs[name]['environment_id']}",
                         writable(src_envs[name]))
            changes = diff(src_envs, tgt.environments())
        report["orgs"][org] = changes
    return report


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("command", choices=["plan", "copy"])
    parser.add_argument("--from", dest="source", help="uuid (or part) of the source account or org")
    args = parser.parse_args()
    json.dump(run(args.command, args.source), sys.stdout, indent=2, ensure_ascii=False)
    print()


if __name__ == "__main__":
    main()
