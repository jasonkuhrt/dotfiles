#!/usr/bin/env python3
"""Make this account's cloud environments match the org used last.

Cloud environments live on Anthropic's servers, one set per org. Each org is
reached through a Claude Code login claude-account keeps (docs/claude-account.md
in the dotfiles): a ~/.claude-N dir and its keychain item. A token reaches only
its own org, whatever org a request names, so the server says which org each
login reaches; a .claude.json only says what a client last wrote there.
Environments match by name. Only this org and the source are touched; another
account catches up when it is the one in use.

  cloud.py plan [--from <uuid>]   print what differs, as JSON
  cloud.py copy [--from <uuid>]   create or update this org's environments

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
    """The ~/.claude-N dirs holding a claude-account login."""
    return [d for d in sorted(HOME.glob(".claude-[1-9]")) if d.is_dir() and read_login(d)]


def claimed_org(config_dir):
    """The org config_dir's .claude.json names: a hint for ordering, never the answer."""
    try:
        return json.loads((config_dir / ".claude.json").read_text()).get("oauthAccount", {}).get("organizationUuid")
    except (OSError, json.JSONDecodeError):
        return None


def keychain_item(config_dir):
    return "Claude Code-credentials-" + hashlib.sha256(str(config_dir).encode()).hexdigest()[:8]


def read_login(config_dir):
    out = subprocess.run(["security", "find-generic-password", "-s", keychain_item(config_dir), "-w"],
                         capture_output=True, text=True).stdout
    try:
        return json.loads(out)["claudeAiOauth"]
    except (ValueError, KeyError):
        return None


def live(login):
    return login["expiresAt"] >= time.time() * 1000 + 120_000


class DeadLogin(Exception):
    pass


def sign_in_command(config_dir):
    """The fish command that signs claude-account's account for config_dir in again."""
    return f"claude{config_dir.name.removeprefix('.claude-')} auth login"


def token(config_dir):
    """A live access token for config_dir's login, refreshed the way the CLI does it.

    A stored token lasts hours. Running the CLI once on that account renews
    it, even when the account is at its usage limit and the request fails.
    The refresh token has its own expiry, which a refresh doesn't extend:
    past it only a sign-in helps, and the CLI run would blank the item.
    """
    login = read_login(config_dir)
    now = time.time() * 1000
    if login and live(login):
        return login["accessToken"]
    if not login or not login.get("refreshToken") or login.get("refreshTokenExpiresAt", now + 1) < now:
        raise DeadLogin(sign_in_command(config_dir))
    env = {k: v for k, v in os.environ.items()
           if not k.startswith(("CLAUDE_CODE_", "CLAUDECODE", "ANTHROPIC_"))}
    env["CLAUDE_CONFIG_DIR"] = str(config_dir)
    subprocess.run([str(CLAUDE), "-p", "reply with ok", "--model", "haiku"], env=env,
                   cwd=HOME, capture_output=True, timeout=120)
    login = read_login(config_dir)
    if not login or login["expiresAt"] < time.time() * 1000:
        raise DeadLogin(sign_in_command(config_dir))
    return login["accessToken"]


class Org:
    def __init__(self, token):
        self.org = None
        self.headers = {"Authorization": f"Bearer {token}",
                        "anthropic-beta": "ccr-byoc-2025-07-29",
                        "anthropic-version": "2023-06-01",
                        "content-type": "application/json"}
        self.org = self.call("GET", "/api/oauth/profile", beta="oauth-2025-04-20")["organization"]["uuid"]
        self.headers["x-organization-uuid"] = self.org

    def call(self, method, path, body=None, beta=None):
        data = json.dumps(body).encode() if body is not None else None
        headers = {**self.headers, **({"anthropic-beta": beta} if beta else {})}
        request = urllib.request.Request(API + path, data=data, method=method, headers=headers)
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


def reach(wanted):
    """org -> Org for each wanted org, and the sign-in commands that could revive the rest.

    Asking a live token costs one request and renewing one costs a CLI run, so
    live logins go first, and those whose .claude.json names a wanted org go
    first among each. A dead login's org can't be asked: it counts for the org
    its .claude.json names, and when no dead login names a missing org, any of
    them could be the one.
    """
    found, dead = {}, {}
    for config_dir in sorted(logins(), key=lambda d: (not live(read_login(d)), claimed_org(d) not in wanted)):
        if all(org in found for org in wanted):
            break
        try:
            org = Org(token(config_dir))
        except DeadLogin as login:
            dead[config_dir] = str(login)
            continue
        found.setdefault(org.org, org)
    revive = []
    for org in wanted:
        if org in found:
            continue
        candidates = [c for d, c in dead.items() if claimed_org(d) == org] or list(dead.values())
        if not candidates:
            sys.exit(f"No Claude Code login reaches org {org}.")
        revive += [c for c in candidates if c not in revive]
    return found, revive


def run(command, wanted):
    current = current_scope()
    target = current.split("/")[1]
    source = source_scope(current, wanted).split("/")[1]
    report = {"source_org": source, "target_org": target}
    orgs, dead = reach([source, target])
    if dead:
        return {**report, "dead_login": dead}
    src_envs, tgt = orgs[source].environments(), orgs[target]
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
    return {**report, "source_environments": sorted(src_envs), **changes}


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("command", choices=["plan", "copy"])
    parser.add_argument("--from", dest="source", help="uuid (or part) of the source account or org")
    args = parser.parse_args()
    json.dump(run(args.command, args.source), sys.stdout, indent=2, ensure_ascii=False)
    print()


if __name__ == "__main__":
    main()
