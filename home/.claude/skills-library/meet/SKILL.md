---
name: meet
description: Open the Heartbeat local dev app in the user's Chrome browser at a requested app view. Use when the user says "meet me in...", "take me to...", "open the app at...", "get a Chrome tab going", "meet in Page Editor", or otherwise asks Codex to autonomously start or align the dev stack, connect the Chrome plugin, and navigate to a local app place.
---

# Meet

Bring the Heartbeat dev stack and Chrome into the same ready state, then leave the user on the requested local app view.

## Workflow

1. Resolve the target.
   - Treat natural language as an app location request.
   - If the user gives a path, use it.
   - If the user says "Page Editor" without a page id, use `settings/page-editor/create`.
   - If the user says "Page Editor for <pageId>", use `settings/page-editor/<pageId>`.
   - Use the dev community slug `localdev` unless the user explicitly names another community slug.

2. Align the dev stack.
   - In a Heartbeat checkout, use the repo's existing dev workflow first.
   - Run `npm run dev:stack:status -- --json` and parse it as the source of truth for `effective.webUrl`, compose state, and foreground process state.
   - If compose and foreground are already running, continue.
   - If not running, start `npm run dev:stack:heartbeat` as a long-running background process and poll `npm run dev:stack:status -- --json` until the stack reports ready.
   - Do not infer localhost ports from memory, branch names, Docker output, or defaults.
   - Only escalate to `npm run doctor` when stack startup or status output points to missing dependencies, generated artifacts, or broken repo health.

3. Connect Chrome autonomously.
   - Load and follow the Chrome plugin skill for browser-client setup.
   - Use the Chrome plugin, not Browser/browser-use, Computer Use, raw CDP, AppleScript, or macOS GUI automation.
   - This skill is explicit permission to open Chrome or a Chrome window for the selected Chrome profile when Chrome is closed or no usable window exists. Do not stop only because Chrome is not already open.
   - First try the normal browser-client bootstrap and a lightweight tab listing.
   - If the Chrome connection fails, wait 2 seconds and retry once.
   - If Chrome is not running, use the Chrome plugin helper that opens a Chrome window, wait 2 seconds, and retry browser-client setup.
   - If the native host manifest or Codex Chrome Extension is missing, invalid, disabled, or still unreachable after opening Chrome and retrying, report that blocker clearly. Do not repair native host installation yourself.

4. Navigate.
   - Build the URL as `<effective.webUrl>/<communitySlug>/<targetPath>`.
   - Normalize slashes so `settings/page-editor/create` becomes `<effective.webUrl>/localdev/settings/page-editor/create`.
   - Create or claim a Chrome tab through the Chrome plugin and navigate it to the resolved URL.
   - Wait until the page body renders and, when a known view marker exists, wait for that marker too. For Page Editor, prefer `page-editor-dock` or `page-editor-create-mission-input`.
   - If the page lands on login, reload once; the dev auth plugin should seed the local dev admin session. If it still lands on login, report it as a dev-auth readiness issue.

5. Hand off the tab.
   - Keep the navigated tab open for the user as a deliverable or handoff tab.
   - Before ending browser work, finalize Chrome tabs according to the Chrome plugin tab-cleanup rules, keeping the target tab.

## Examples

- "Meet me in Page Editor" -> `/localdev/settings/page-editor/create`
- "Meet me in Page Editor for abc123" -> `/localdev/settings/page-editor/abc123`
- "Take me to settings" -> `/localdev/settings`
- "Open dev at /localdev/feed" -> `/localdev/feed`
