# Claude for Chrome — pre-approve URLs

Before invoking any `mcp__claude-in-chrome__*` tool that touches a URL (`navigate`, `tabs_create_mcp`, anything that loads a page), ensure the target domain is in the extension's approved-sites allowlist. Otherwise the per-site permission gate fires — the dialog blocks the agent or (per issue [#50842](https://github.com/anthropics/claude-code/issues/50842)) silently denies the navigation.

The `claude-chrome-allow` CLI writes approval entries live to `chrome.storage.local` via dev-browser/CDP. **No Chrome restart, no tabs disturbed.** Source: `~/projects/jasonkuhrt/claude-chrome-allow/`.

## Workflow

```sh
claude-chrome-allow list
claude-chrome-allow add github.com claude.ai docs.anthropic.com
```

Steps before the first `mcp__claude-in-chrome__navigate` of a session:

1. Extract the netloc from each URL you'll need: `https://github.com/x/y` → `github.com`, `http://localhost:3000/` → `localhost:3000`.
2. Run `claude-chrome-allow list` to see what's already approved.
3. For any missing domain, run `claude-chrome-allow add <netloc>...` BEFORE the MCP call. Batch in a single invocation when possible.

If a navigation unexpectedly fails or hangs, suspect a missing approval — run `claude-chrome-allow add <netloc>` and retry.

## Preconditions handled by the CLI

- Chrome must be running.
- `chrome-debug connect` must be active. The CLI auto-runs it if not, which takes cursor control for ~1 second. This is acceptable in agent flows — it does NOT restart Chrome.

## Never do these

- Never invoke `mcp__claude-in-chrome__navigate` (or any URL-loading MCP tool) without first verifying the domain via `claude-chrome-allow list`.
- Never run `claude-chrome-allow clear` or `claude-chrome-allow restore` without explicit user instruction — both replace the entire allowlist and require `-y`.
- Never quit Chrome to manipulate the allowlist. The live-write CLI exists specifically so Chrome stays running. If a future tool needs to quit Chrome, `AskUserQuestion` for explicit per-occurrence approval first (see memory: `feedback_chrome_restart_requires_approval`).
