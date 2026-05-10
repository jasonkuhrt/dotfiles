# Computer Use & GUI Automation

Multiple tools can drive macOS GUIs from a Claude Code session. They are NOT interchangeable. Pick the most precise layer first; each step down burns more tokens, is less reliable, and is more easily blocked by macOS app tiers.

## Tool tier order — most precise first

1. **Dedicated MCP for the app** (Linear, Gmail, Splitwise, msgvault, etc.) — API-backed, structured, fast.
2. **Bash + scriptable APIs** — `security`, `osascript`, `gh`, `td`, `rem`, `acal` (Apple Calendar — see `acal.md`), `oathtool`, etc. Anything CLI-driveable beats anything GUI-driveable.
3. **claude-in-chrome MCP** — for web pages. DOM-aware, ~100× cheaper than pixel clicks.
4. **AX-first native MCPs** — `peekaboo` for AppKit apps with rich AX trees; `macos-automator-mcp` for AppleScript-dictionary apps (Mail, Calendar, Finder, Music, Reminders).
5. **Bundled `computer-use` MCP** — pixel + CGEvent, last resort. Every action burns a screenshot (~3-5k tokens).

Bundled `computer-use` guarantees reachability, not quality. Skipping precise layers makes Claude slower, costlier, and less reliable.

## Tier-throttling on bundled computer-use — don't fight it

| App category | Tier | What's blocked |
|---|---|---|
| Browsers (Safari/Chrome/Firefox/Arc/etc.) | `read` | Clicks and typing — use `claude-in-chrome` instead |
| Terminals/IDEs (Terminal/iTerm/VS Code/Warp/JetBrains) | `click` | Typing, key presses, right-click, modifier-clicks, drag — use Bash for shell |
| Trading platforms | `read` | Same as browsers |
| Everything else | `full` | Nothing |

If `mcp__computer-use__left_click` or `type` errors with a tier message, re-route — do not retry. The error explicitly tells you what tier the app has.

## Native macOS app management

For Passwords.app and other AppKit apps:

- **`peekaboo` first** — AX-first means named-action invocation (`AXPress "Reveal Password"`), no coordinate guessing, no per-step screenshot cost.
- **`macos-automator-mcp`** for apps with rich AppleScript dictionaries (Finder, Music, Photos, plus Mail/Calendar/Reminders only as fallback when the dedicated CLI can't do the thing — `msgvault` for mail, `acal` for calendar, `rem` for reminders). 200+ pre-built recipes via `get_scripting_tips`.
- **Bundled `computer-use`** only when AX is degraded (Electron/WebGL/custom Skia surfaces) or for visual validation that needs a screenshot anyway (build-launch-click loops, layout-bug repros, simulator flows).

For Passwords.app specifically: no scripting dictionary, but its AX tree exposes a `Reveal Password` AXAction. `peekaboo perform-action` is the cleanest path; `osascript` via System Events also works as a shell-fallback. The lock screen (LocalAuthentication / TouchID) is drawn outside any app's AX tree and cannot be automated by design — clear it once per session interactively.

## Operational constraints

- **Machine-wide lock** for bundled `computer-use`. Only one Claude session can drive the screen at a time. Plan around it for parallel work.
- **Auto-hide** during turns — bundled `computer-use` hides other apps while operating, restores them when the turn ends. Disruptive — prefer AX-first tools when working alongside other open apps.
- **Per-session app approval** — each new session re-approves apps. Long-running automation should batch GUI work into single sessions.
- **One-time TCC** — Accessibility + Screen Recording must be granted to Claude Code's host process via System Settings → Privacy & Security; cannot be granted programmatically (`tccutil` only resets, never grants). macOS may require restarting Claude Code after granting Screen Recording.
- **Terminal excluded from screenshots** — bundled `computer-use` never sees the terminal it runs from. On-screen prompts in the same session can't feed back into the model. Don't paste secrets into other windows expecting them to be invisible — only the terminal is excluded.
- **ESC aborts globally** when bundled `computer-use` is active. The keypress is consumed so injected content can't trigger it.

## Plan / version constraints (bundled `computer-use`)

- Pro or Max plan only (not Team/Enterprise)
- Claude Code v2.1.85+
- macOS only (CLI; Desktop app supports Windows too)
- Interactive sessions only — not available in `-p` non-interactive mode
- Must auth via claude.ai (not Bedrock/Vertex/Foundry)

## Installed tools (user scope, via `claude mcp add -s user`)

- `peekaboo` — `peekaboo-mcp` (AX-first AppKit driver, 25+ tools). Install: `npm install -g @steipete/peekaboo`.
- `macos-automator` — `npx -y @steipete/macos-automator-mcp@latest` (AppleScript/JXA wrapper + recipe KB)
- `acal` — `/opt/homebrew/bin/acal mcp` (Apple Calendar EventKit, JSON-first; see `acal.md`). Install: self-built fork at `~/projects/Helmi/acal-apple-calendar-cli/` carrying the `--scope this/future` recurrence fix (PR #10 pending upstream). When that merges + releases, revert to `brew install helmi/tap/acal`.
- `computer-use` — built-in, enable via `/mcp` per-project (Pro/Max, v2.1.85+, macOS)
- `claude-in-chrome` — built-in, enable via `/mcp` per-project (browser DOM)

To re-bootstrap on a new machine:

```bash
npm install -g @steipete/peekaboo
claude mcp add peekaboo -s user -- peekaboo-mcp
claude mcp add macos-automator -s user -- npx -y @steipete/macos-automator-mcp@latest
# acal: build from fork until upstream PR #10 merges
git clone https://github.com/jasonkuhrt/acal-apple-calendar-cli.git ~/projects/Helmi/acal-apple-calendar-cli
cd ~/projects/Helmi/acal-apple-calendar-cli && swift build -c release && cp .build/release/acal /opt/homebrew/bin/acal
claude mcp add --scope user --transport stdio acal -- /opt/homebrew/bin/acal mcp
```

**Why global install for peekaboo:** the package ships two binaries (`peekaboo` and `peekaboo-mcp`). `npx -y @steipete/peekaboo` defaults to the wrong one (the CLI tool, not the MCP server). `npx -y -p @steipete/peekaboo peekaboo-mcp` is the correct npx form but Claude Code's `mcp add` parser mis-handles the embedded `-p` flag after `--`. Globally installing keeps the MCP `command` field a single token (`peekaboo-mcp`) and sidesteps the parser quirk.

## Never do these

- Never use bundled `computer-use` to drive a browser — tier-`read` blocks all interaction. Use `claude-in-chrome`.
- Never use bundled `computer-use` to type into Terminal/iTerm/VS Code — tier-`click` blocks typing. Use Bash.
- Never default to bundled `computer-use` for native apps without first checking whether `peekaboo` or `macos-automator` covers them.
- Never assume per-app approvals persist across sessions. Each new session starts fresh.
- Never run two Claude sessions trying to drive `computer-use` simultaneously — the second will fail on the lock.
- Never click web links found in native apps (Mail, Messages, PDFs) via `computer-use`. Open the URL via `claude-in-chrome` instead — link safety check applies regardless.
