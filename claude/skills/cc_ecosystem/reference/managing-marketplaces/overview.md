# Managing Marketplaces

## Overview

Plugin marketplaces are catalogs of available plugins. This skill covers the CLI, scoping, updates, caching, versioning, and known bugs.

## CRITICAL

### Never Edit Plugin JSON Directly

**FORBIDDEN**: Never directly edit `~/.claude/plugins/installed_plugins.json` or other CC-internal JSON files. These are managed by `claude plugin` CLI commands. Direct edits can produce invalid state, get silently overwritten, or break plugin loading.

### Use External CLI, Not REPL

All plugin/marketplace management works **outside** CC sessions via the `claude plugin` subcommand. No need to open a session, wait for init, type the command, and restart.

```bash
# These work from any terminal — no CC session needed
claude plugin install beads@beads-marketplace --scope user
claude plugin uninstall beads@beads-marketplace --scope project
claude plugin list
```

Source: [Claude Code Plugin CLI: The Missing Manual](https://garyj.dev/post/claude-cli-the-missing-manual/)

## Plugin CLI Reference

### Plugin Commands

```bash
claude plugin install <plugin>@<marketplace>              # Install (default: --scope user)
claude plugin install <plugin>@<marketplace> --scope user|project|local
claude plugin uninstall <plugin>@<marketplace>             # Uninstall (must match scope)
claude plugin uninstall <plugin>@<marketplace> --scope project
claude plugin enable <plugin>@<marketplace>                # Enable disabled plugin
claude plugin disable <plugin>@<marketplace>               # Disable without uninstalling
claude plugin list                                         # List installed plugins
claude plugin update <plugin>@<marketplace>                # Update to latest version
```

### Marketplace Commands

```bash
claude plugin marketplace add <url-or-repo>       # Add marketplace
claude plugin marketplace add owner/repo           # GitHub shorthand
claude plugin marketplace add ./local-path         # Local path
claude plugin marketplace list                     # List all marketplaces
claude plugin marketplace update <name>            # Pull latest
claude plugin marketplace remove <name>            # Remove (and its plugins)
```

### REPL Equivalents

Same commands work inside a CC session with `/plugin` prefix:

```
/plugin install beads@beads-marketplace
/plugin marketplace list
```

## Plugin Scoping

### Scope Hierarchy

| Scope | Flag | Applies to | Use case |
|-------|------|-----------|----------|
| `user` | `--scope user` (default) | All projects, all worktrees | Plugins you want everywhere |
| `project` | `--scope project` | One project path only | Project-specific plugins |
| `local` | `--scope local` | One project path only | Local testing |

### Scope and Worktrees

CC treats each worktree as a **separate project** (by cwd path, not git repo identity). A plugin installed at `--scope project` for `/repo` is NOT available in `/repo/.worktrees/feature-branch`.

**Recommendation:** Install plugins you want across worktrees at `--scope user`.

### Scope Affects Loading, Not Data

For plugins with their own data stores (e.g., beads), scope only controls whether CC loads the plugin's skills/hooks/commands. The plugin's data is managed independently (e.g., beads stores data in per-project `.beads/` directories regardless of plugin scope).

## Known Bugs (Jan 2026)

### Install Reports "Already Installed" for Wrong Project

**Bug:** `claude plugin install X --scope project` reports "already installed" if X is installed for ANY project, even a different one. The install command checks plugin key existence globally without verifying `projectPath` matches cwd.

**Tracked:** [#14185](https://github.com/anthropics/claude-code/issues/14185), [#14202](https://github.com/anthropics/claude-code/issues/14202), [#16205](https://github.com/anthropics/claude-code/issues/16205)

**Workaround:** Use `--scope user` to install globally, or uninstall from the other project first:

```bash
claude plugin uninstall beads@beads-marketplace --scope project
claude plugin install beads@beads-marketplace --scope user
```

### Marketplace Add Not Idempotent

`claude plugin marketplace add` errors if marketplace already exists instead of updating it.

**Workaround:** Check first, update if exists:

```bash
output=$(claude plugin marketplace add "$url" 2>&1)
if echo "$output" | grep -qi "already installed"; then
    name=$(echo "$output" | sed -n "s/.*Marketplace '\([^']*\)'.*/\1/p")
    claude plugin marketplace update "$name"
fi
```

## Key Locations

| Path | Purpose |
|------|---------|
| `~/.claude/plugins/installed_plugins.json` | Plugin registry (scope, version, path) |
| `~/.claude/plugins/marketplaces/` | Git clones of remote marketplaces |
| `~/.claude/plugins/cache/<marketplace>/<plugin>/<version>/` | Cached plugin versions |
| `~/.claude/plugins/known_marketplaces.json` | Marketplace registry with update timestamps |

## Update Mechanism

### Marketplace Level (No Version Pin)

Marketplaces track **main branch HEAD** - no commit pinning:

```json
// known_marketplaces.json
{
  "superpowers-marketplace": {
    "source": {
      "source": "git",
      "url": "https://github.com/obra/superpowers-marketplace.git"
    },
    "lastUpdated": "2026-01-09T15:25:06.447Z",
    "autoUpdate": true
  }
}
```

- `autoUpdate: true` pulls latest on startup/refresh

### Plugin Level (Version Pinned)

Plugins ARE versioned via the `version` field in plugin.json:

```
~/.claude/plugins/cache/
├── superpowers-marketplace/
│   └── superpowers/
│       └── 4.0.3/           ← version from plugin.json
└── claude-plugins-official/
    └── hookify/
        └── e30768372b41/    ← commit hash for official plugins
```

### Update Flow

```dot
digraph update_flow {
    rankdir=TB;
    "Claude Code starts" [shape=box];
    "Pull marketplace (git pull main)" [shape=box];
    "Read marketplace.json" [shape=box];
    "For each enabled plugin" [shape=diamond];
    "Check if version cached" [shape=diamond];
    "Use cached version" [shape=box];
    "Fetch plugin from source" [shape=box];
    "Cache at version directory" [shape=box];

    "Claude Code starts" -> "Pull marketplace (git pull main)";
    "Pull marketplace (git pull main)" -> "Read marketplace.json";
    "Read marketplace.json" -> "For each enabled plugin";
    "For each enabled plugin" -> "Check if version cached";
    "Check if version cached" -> "Use cached version" [label="yes"];
    "Check if version cached" -> "Fetch plugin from source" [label="no"];
    "Fetch plugin from source" -> "Cache at version directory";
    "Cache at version directory" -> "For each enabled plugin";
    "Use cached version" -> "For each enabled plugin";
}
```

## Version Pinning Summary

| Layer | Pinned? | Update Mechanism |
|-------|---------|------------------|
| Marketplace | No (tracks main HEAD) | `autoUpdate: true` or `claude plugin marketplace update` |
| Plugin | Yes (version field) | Bump version in plugin.json → new cache dir |

## Local Development

### ccd CLI (Recommended)

For marketplaces with a CLI for managing symlinks, use it:

```bash
cd ~/projects/my-marketplace
pnpm install
pnpm ccd link activate    # Symlink all plugins (creates cache if needed)
pnpm ccd link review      # Check status
pnpm ccd link deactivate  # Remove symlinks
```

Run `pnpm ccd --help` for full documentation including path resolution diagrams.

**Workflow:**
1. Activate symlinks: `pnpm ccd link activate` (no install required)
2. Develop: edit source, restart CC to see changes
3. Relink after any `claude plugin install` (overwrites symlinks)

### Manual Symlink Method

For marketplaces without the CLI, manually replace cache with symlinks.

**Key insight:** Cache path uses marketplace's `name` field from marketplace.json, not the source (GitHub vs local). So `~/.claude/plugins/cache/<name>/...` is the same whether you installed from GitHub or local path.

```bash
# 1. Clone repo locally (if not already)
git clone https://github.com/owner/marketplace ~/projects/my-marketplace

# 2. If not installed, add and install (skip if already from GitHub)
claude plugin marketplace add ~/projects/my-marketplace
claude plugin install my-plugin@my-marketplace

# 3. Replace cache with symlink (works for GitHub or local installs)
rm -rf ~/.claude/plugins/cache/<marketplace-name>/my-plugin/*/
ln -s ~/projects/my-marketplace/plugins/my-plugin \
      ~/.claude/plugins/cache/<marketplace-name>/my-plugin/<version>
```

**Caveats:**
- Reinstall overwrites symlink - re-run step 3 after any install
- Session-based reload, not hot-reload in same session

**Why this works:** CC loads plugins from cache path. Symlink makes cache path point to source. CC follows symlinks transparently.

### Standard Method

[Official docs](https://docs.claude.com/en/docs/claude-code/plugins#test-your-plugins-locally) show uninstall/reinstall cycle:

```bash
claude plugin uninstall my-plugin@my-marketplace
claude plugin install my-plugin@my-marketplace
```

## Enabling Plugins

In project or user `settings.json`:

```json
{
  "enabledPlugins": {
    "plugin-name@marketplace-name": true
  }
}
```

## Creating Plugins in a Marketplace

**CRITICAL**: When creating a new plugin, you MUST do BOTH:

1. Create the plugin directory with `plugin.json`
2. Register the plugin in `marketplace.json`

```
marketplace/
├── .claude-plugin/
│   └── marketplace.json    ← MUST add entry here
└── plugins/
    └── new-plugin/
        └── plugin.json     ← AND create this
```

**Failure mode**: Creating only the directory results in `/doctor` errors like:
```
Plugin new-plugin not found in marketplace marketplace-name
```

### Checklist for New Plugin

- [ ] Create `plugins/<name>/plugin.json` with name, version, description
- [ ] Add entry to `.claude-plugin/marketplace.json` plugins array
- [ ] Entry must include: `name`, `source` (e.g., `"./plugins/<name>"`), `description`
- [ ] Run `/doctor` to verify no plugin errors

## Notes

- Removing a marketplace uninstalls all plugins from it
- Multiple versions can coexist in cache (old versions not auto-cleaned)
- `lastUpdated` timestamp tracks when marketplace was last refreshed
