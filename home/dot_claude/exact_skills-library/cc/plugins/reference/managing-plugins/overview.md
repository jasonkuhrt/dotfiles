# Managing Plugins

## Scope

This skill covers **plugin lifecycle operations** (install, uninstall, enable, disable, update) and marketplace setup. For different purposes, use:

- **Marketplace internals** (caching, versioning, local dev): `cc:plugins`, Managing Marketplaces topic
- **Plugin authoring**: `plugin-dev:*`
- **Permission configuration**: `cc:plugins`, Managing Permissions topic

## CRITICAL

### Prefer CLI Over JSON Edits

Always use `claude plugin` CLI for plugin management. Direct JSON edits can produce invalid state, get silently overwritten, or break plugin loading.

**Exception — manifest corruption:** When the CLI itself is broken (e.g., `uninstall` can't find a plugin that `list` shows, or cache directories are missing), editing `~/.claude/plugins/installed_plugins.json` directly is acceptable as a last resort. Verify the JSON is valid after editing (`jq empty ~/.claude/plugins/installed_plugins.json`).

### Use External CLI, Not REPL

All commands work **outside** CC sessions via the `claude plugin` subcommand — no need to open a session.

```bash
# These work from any terminal
claude plugin install superpowers@superpowers-marketplace --scope user
claude plugin list
```

REPL equivalents (inside a session) use `/plugin` prefix:

```
/plugin install superpowers@superpowers-marketplace
/plugin list
```

## CLI Reference

### Plugin Commands

```bash
claude plugin install <plugin>@<marketplace>                # Install (default: --scope user)
claude plugin install <plugin>@<marketplace> --scope <scope> # Install at scope
claude plugin uninstall <plugin>@<marketplace>               # Uninstall (must match install scope)
claude plugin uninstall <plugin>@<marketplace> --scope <scope>
claude plugin enable <plugin>@<marketplace>                  # Enable disabled plugin
claude plugin disable <plugin>@<marketplace>                 # Disable without uninstalling
claude plugin update <plugin>@<marketplace>                  # Update to latest version
claude plugin list                                           # List ALL installed plugins (no scope filter)
claude plugin list --json                                    # JSON output (scriptable)
claude plugin list --json | jq '[.[] | select(.scope == "user")]'    # Filter by scope
claude plugin list --json | jq '[.[] | select(.scope == "project")]' # Filter by scope
```

### Marketplace Commands

```bash
claude plugin marketplace add <url-or-repo>    # Add marketplace (GitHub URL, owner/repo, or local path)
claude plugin marketplace list                 # List all marketplaces
claude plugin marketplace update <name>        # Pull latest catalog
claude plugin marketplace remove <name>        # Remove marketplace and its plugins
```

## Scoping

| Scope | Flag | Applies to | Use case |
|-------|------|------------|----------|
| `user` | `--scope user` (default) | All projects, all worktrees | Plugins you want everywhere |
| `project` | `--scope project` | One cwd path only | Project-specific plugins |
| `local` | `--scope local` | One cwd path only | Testing |

- **Worktrees** — CC identifies projects by cwd path, not git repo. A `--scope project` plugin at `/repo` is NOT available in `/repo/.worktrees/feature-branch`. Use `--scope user` for cross-worktree availability.
- **Uninstall must match scope** — `claude plugin uninstall X --scope user` if installed at user scope. Mismatched scope silently does nothing.
- **Uninstall must match cwd** — project-scoped operations (`uninstall`, `enable`, `disable`) must be run from the exact cwd the plugin was installed at. Running from a worktree or different path fails with "not found."

### `list` Is Global (as of Jan 2026)

`claude plugin list` dumps the **entire manifest** regardless of cwd. It does not filter by project relevance. The `Status` field indicates whether the plugin is active for your current cwd:

| What you see | Meaning |
|---|---|
| `Scope: user`, `Status: ✔ enabled` | Global, works everywhere |
| `Scope: project`, `Status: ✔ enabled` | Installed for your current cwd's project |
| `Scope: project`, `Status: ✘ disabled` | Installed for a DIFFERENT project — visible but inoperable here |

This means `list` shows plugins you can't act on from your current directory. There is no `--scope` filter flag on `list` — use JSON + jq to filter:

```bash
claude plugin list --json | jq '[.[] | select(.scope == "user")]'
claude plugin list --json | jq '[.[] | select(.status == "enabled")]'
```

**Note:** This behavior may change in future CC versions.

## Known Bugs (Jan 2026)

### Install Reports "Already Installed" for Wrong Project

`claude plugin install X --scope project` reports "already installed" if X exists at ANY project, even a different one. Checks plugin key globally without verifying `projectPath`.

- **Tracked:** [#14185][1], [#14202][2], [#16205][3]
- **Workaround:** Uninstall from old scope first, reinstall at desired scope:
  ```bash
  claude plugin uninstall X@marketplace --scope project
  claude plugin install X@marketplace --scope user
  ```

### Marketplace Add Not Idempotent

`claude plugin marketplace add` errors if marketplace already exists instead of updating.

- **Workaround:** Catch error, run update:
  ```bash
  output=$(claude plugin marketplace add "$url" 2>&1)
  if echo "$output" | grep -qi "already"; then
      name=$(echo "$output" | sed -n "s/.*Marketplace '\([^']*\)'.*/\1/p")
      claude plugin marketplace update "$name"
  fi
  ```

### Uninstall Fails Despite Plugin Existing

`claude plugin uninstall X --scope user` may report "not found" while `claude plugin list` shows the plugin and `disable` works fine. Symptom of manifest corruption — the cache directory on disk is missing but the manifest entry remains.

- **Diagnosis:** Check if `installPath` from `installed_plugins.json` exists on disk
- **Fix:** Remove the orphaned entry from `installed_plugins.json` directly (this is the one case where JSON editing is acceptable)

### `remove` Alias Broken With `--scope`

`claude plugin remove X --scope project` fails with "not found", but `claude plugin uninstall X --scope project` works. The `remove` alias doesn't pass `--scope` through.

- **Workaround:** Always use `uninstall`, never `remove`, when specifying `--scope`.

### Uninstall Scope Mismatch Silent Failure

Uninstalling with the wrong `--scope` flag silently succeeds without removing the plugin. Always match the scope used during install.

## Quick Recipes

- **Install globally:**
  `claude plugin install X@marketplace --scope user`
- **Move project→user scope:**
  ```bash
  claude plugin uninstall X@marketplace --scope project
  claude plugin install X@marketplace --scope user
  ```
- **Add marketplace + install plugin:**
  ```bash
  claude plugin marketplace add owner/repo
  claude plugin install plugin-name@marketplace-name --scope user
  ```
- **Update all from a marketplace:**
  ```bash
  claude plugin marketplace update marketplace-name
  claude plugin update plugin-name@marketplace-name
  ```

## Reference

- [Claude Code Plugin CLI: The Missing Manual][4]

[1]: https://github.com/anthropics/claude-code/issues/14185
[2]: https://github.com/anthropics/claude-code/issues/14202
[3]: https://github.com/anthropics/claude-code/issues/16205
[4]: https://garyj.dev/post/claude-cli-the-missing-manual/
