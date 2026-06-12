---
name: claude-in-chrome
description: The authoritative playbook for driving a browser with the Claude in Chrome integration. Use whenever browser work is starting — web app testing, navigating or clicking pages, reading the DOM or console, filling forms, extracting data, recording a demo GIF, or any mcp__claude-in-chrome__* tool — and whenever the user mentions Chrome, Edge, the browser extension, "the chrome plugin", remote debugging, or browser permissions, even if no specific tool is named. Load it BEFORE touching any browser tool; it prevents conflating the extension with CDP / remote-debugging and guessing at the tooling.
---

# Claude in Chrome

The rich playbook for the Claude in Chrome browser integration. Three layers
work together — never drive a browser on a guessed model of the tooling:

- **Rule** `~/.claude/rules/claude-in-chrome.md` — 10 terse facts, always loaded.
- **This skill** — the full how-to, loaded on demand when browser work starts.
- **Hook** — a `PreToolUse` guard (`claude-in-chrome-guard.sh`) hard-stops the
  first `mcp__claude-in-chrome__*` call each session until you have verified.

## The one distinction that matters

**"The chrome plugin" is the Claude in Chrome browser extension** — a real
Chrome Web Store extension (id `fcoeoabgfenejglbffodgkkbkcdhcgfn`). Claude Code
drives it; the `mcp__claude-in-chrome__*` tools are the agent's interface to it.

There are **three separate ways** to connect Claude Code to a browser — they are
not interchangeable, and conflating them is the single most common mistake:

| Mechanism | What it is | How it connects |
|---|---|---|
| **Extension** (the plugin) | The Claude in Chrome extension | `claude --chrome` + a native messaging host |
| `--autoConnect` | Chrome 144+ auto-connect | a one-time `chrome://inspect` opt-in |
| **CDP / remote debugging** | Chrome DevTools Protocol | the remote-debugging port — what `dev-browser.md` uses |

**The "Allow remote debugging?" dialog** — "an external app wants full control
over this Chrome session to debug it" — belongs to **CDP / remote debugging**
(mechanism 3). It is **NOT the plugin.** The extension path talks over native
messaging (`com.anthropic.claude_code_browser_extension.json`) and never raises
that dialog. If it appears while you intend to use the plugin, the extension is
not the active path — **stop and tell the user; do not click it, do not guess.**

## Connecting

- `claude --chrome` starts a session with Chrome enabled; `/chrome` enables it
  inside a running session.
- `/chrome` also checks connection status, manages permissions, reconnects the
  extension, and offers "Enabled by default".
- `/mcp` → `claude-in-chrome` lists the browser tools.
- First-time setup writes a native messaging host file Chrome reads on startup —
  a Chrome restart may be required.

**Prerequisites are strict:** Google Chrome or Microsoft Edge only — never
Brave, Arc, other Chromium browsers, or WSL. Extension v1.0.36+, Claude Code
v2.0.73+, a direct Anthropic plan (Pro / Max / Team / Enterprise — not Bedrock /
Vertex / Foundry). The integration is beta.

## Permissions

The extension gates browser work — not Claude Code:

- **Two modes**, set by the user in the extension: "Ask before acting" and
  "Act without asking".
- An unapproved site raises a **"Permission required"** prompt in the extension
  side panel: "Allow this action" / "Always allow actions on this site" /
  "Decline". Approved sites live at Settings → Permissions → "Your approved
  sites".
- **`claude-chrome-allow`** is a legitimate companion CLI that pre-writes URL
  approvals into the extension's allowlist so a new URL does not block on a
  manual click. It is expected, not a workaround — see
  `~/.claude/rules/claude-in-chrome.md`. Pre-approve a task's domains with it
  before browser work.
- **Protected actions always require explicit user approval** regardless of
  mode: purchases, permanent deletes, modifying permissions, creating accounts,
  granting authorizations, entering sensitive information.

## Operating the tools

1. The `mcp__claude-in-chrome__*` tools are deferred — load them with
   `ToolSearch` (`select:mcp__claude-in-chrome__<name>`) before first use.
2. Call `tabs_context_mcp` once before any other browser tool.
3. Create a fresh tab per conversation with `tabs_create_mcp` — do not reuse the
   user's existing tabs unless asked.
4. Batch a known multi-step sequence with `browser_batch` — one round trip
   instead of many.
5. Claude works inside a designated Chrome tab group and shares the browser's
   login state, so it can use sites the user is already signed into. On a login
   page or CAPTCHA it pauses for the user.

## Troubleshooting

- **"Receiving end does not exist" / "Browser extension is not connected"** —
  the extension's service worker went idle (common in long sessions). Fix:
  `/chrome` → "Reconnect extension". Do not just retry the tool.
- **A JavaScript modal (alert / confirm / prompt)** freezes the connection —
  never trigger one.
- **"Extension not detected"** — check `chrome://extensions`, update Claude
  Code, ensure Chrome is running, then `/chrome` → "Reconnect extension".

## When something fails

Browser failures are **setup or permission problems, not scripting problems.** A
denied action or a "not connected" error is resolved by extension setup, a
`/chrome` reconnect, or a user permission decision — never by a workaround CLI,
and never by guessing. There is no CLI-managed "navigation allowlist"; never
invent concepts like "re-allowing navigation". If browser work is blocked, stop
and surface it to the user.

## Sources

- [Use Claude Code with Chrome (beta)](https://code.claude.com/docs/en/chrome)
- [Claude in Chrome permissions guide](https://support.claude.com/en/articles/12902446-claude-in-chrome-permissions-guide)
- [Get started with Claude in Chrome](https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome)
