# No Direct CC JSON Edits

globs: **/.claude/**/*.json, ~/.claude/**/*.json

**FORBIDDEN**: Never directly edit Claude Code's internal JSON files (`installed_plugins.json`, `settings.json`, `known_marketplaces.json`, `sessions-index.json`, etc.).

These files are managed by CC's CLI commands (`/plugin`, `/settings`, etc.). Direct edits can:

- Produce invalid state that CC doesn't recognize
- Be silently overwritten by the next CLI operation
- Break plugin loading in ways that are hard to debug

## What to Do Instead

| Goal | Use |
|------|-----|
| Install/remove plugins | `/plugin install`, `/plugin remove` |
| Change settings | `/settings`, or edit `.claude/settings.json` (the project one, not internal) |
| Manage marketplaces | `/plugin marketplace` |

If a CLI command has a bug (e.g., scope detection), work around it at the CLI level or file an issue. Don't patch the JSON.

## Exception: Manifest Corruption

When the CLI itself is broken (e.g., `uninstall` can't find a plugin that `list` shows, cache directories missing on disk), editing JSON directly is acceptable as a **last resort**. Validate after: `jq empty ~/.claude/plugins/installed_plugins.json`
