# Claude in Chrome

Ten facts about properly using the Claude in Chrome browser integration —
verified against Anthropic's official docs (sources below). Read this before
any browser work. Do not improvise the chrome tooling.

1. **"The chrome plugin" is the Claude in Chrome browser extension** — a real
   Chrome Web Store extension (id `fcoeoabgfenejglbffodgkkbkcdhcgfn`). Claude
   Code drives it; the `mcp__claude-in-chrome__*` tools are the agent's
   interface to that extension. Nothing else is "the chrome plugin".

2. **Three separate Chrome-connection mechanisms exist — never conflate them.**
   (a) the Claude in Chrome **extension** — the plugin, connected via `--chrome`
   plus a native messaging host; (b) **`--autoConnect`** (Chrome 144+);
   (c) **manual remote debugging / Chrome DevTools Protocol (CDP)** — a wholly
   separate path. The `dev-browser` tooling (see `dev-browser.md`) is mechanism
   (c) — it is NOT the plugin.

3. **The "Allow remote debugging?" dialog is NOT the plugin.** That modal — "an
   external app wants full control over this Chrome session to debug it" —
   belongs to the CDP / remote-debugging path (2c). The extension path talks
   over native messaging (`com.anthropic.claude_code_browser_extension.json`)
   and never raises that dialog. If it appears while you intend to use the
   plugin, the extension path is not active: stop and tell the user — do not
   click it, do not guess.

4. **Connect with `claude --chrome`, or `/chrome` inside a session.** `/chrome`
   checks connection status, manages permissions, reconnects the extension, and
   offers "Enabled by default". `/mcp` → `claude-in-chrome` lists the browser
   tools. First-time setup writes a native messaging host file that Chrome
   reads on startup — a Chrome restart may be required.

5. **Prerequisites are strict.** Google Chrome or Microsoft Edge only — never
   Brave, Arc, other Chromium browsers, or WSL. Claude in Chrome extension
   v1.0.36+, Claude Code v2.0.73+, and a direct Anthropic plan (Pro / Max /
   Team / Enterprise — not Bedrock / Vertex / Foundry). The integration is beta.

6. **The extension gates every new site — pre-approve them.** Site permissions
   live in the extension (Settings → Permissions → "Your approved sites"); an
   unapproved site raises a "Permission required" prompt ("Allow this action" /
   "Always allow actions on this site" / "Decline"). Approving every new URL by
   hand is friction, so this environment provides **`claude-chrome-allow`** — a
   CLI that writes approvals straight into the extension's allowlist. It is
   legitimate and expected: before browser work, pre-approve the task's domains
   with it — see the "Pre-approving URLs" section below for the workflow.

7. **Two permission modes**, chosen by the user in the extension: "Ask before
   acting" and "Act without asking". Regardless of mode, protected actions
   ALWAYS require explicit approval — purchases, permanent deletes, modifying
   permissions, creating accounts, granting authorizations, and entering
   sensitive information.

8. **Operating the tools.** The `mcp__claude-in-chrome__*` tools are deferred —
   load them with ToolSearch (`select:mcp__claude-in-chrome__<name>`) before
   first use. Call `tabs_context_mcp` once before any other browser tool;
   create a fresh tab per conversation with `tabs_create_mcp`; batch multi-step
   sequences with `browser_batch`. Claude works inside a designated Chrome tab
   group and shares the browser's login state, so it can use sites the user is
   already signed into; on a login page or CAPTCHA it pauses for the user.

9. **The connection drops in long sessions.** The extension's service worker
   goes idle, producing "Receiving end does not exist" or "Browser extension is
   not connected". The fix is `/chrome` → "Reconnect extension" — not retrying
   the tool. JavaScript modal dialogs (alert / confirm / prompt) freeze the
   connection; never trigger them.

10. **Browser failures are setup or permission problems, not scripting
    problems.** A denied action or a "not connected" error is resolved by
    extension setup, a `/chrome` reconnect, or a user permission decision —
    never by a workaround CLI and never by guessing. There is no CLI-managed
    "navigation allowlist"; do not invent concepts like "re-allowing
    navigation". If browser work is blocked, STOP and surface it to the user.

## Pre-approving URLs — `claude-chrome-allow`

The per-site gate in fact 6 otherwise interrupts every new URL, and an
unapproved navigation can be silently denied. `claude-chrome-allow` (source:
`~/projects/jasonkuhrt/claude-chrome-allow/`) writes approval entries live into
the extension's `chrome.storage.local` allowlist — no Chrome restart, no tabs
disturbed.

Before the first `mcp__claude-in-chrome__*` call that loads a URL:

1. Extract the netloc of each URL the task will visit (`https://github.com/x` →
   `github.com`; `http://localhost:3000/` → `localhost:3000`).
2. `claude-chrome-allow list` — see what is already approved.
3. `claude-chrome-allow add <netloc> [<netloc> ...]` — add the missing domains,
   batched in one call.

Preconditions, which the CLI handles itself: Chrome must be running, and
`chrome-debug connect` must be active — the CLI auto-runs it, which takes the
cursor for ~1 second.

Never run `claude-chrome-allow clear` or `restore` without explicit user
instruction — both replace the entire allowlist. Never quit Chrome to manage the
allowlist; the live-write CLI exists precisely so Chrome keeps running.

## Sources

- [Use Claude Code with Chrome (beta)](https://code.claude.com/docs/en/chrome)
- [Claude in Chrome permissions guide](https://support.claude.com/en/articles/12902446-claude-in-chrome-permissions-guide)
- [Get started with Claude in Chrome](https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome)
