# dev-browser

## Daemon Connection Caching

The dev-browser daemon (`~/.dev-browser/daemon.mjs`) is a long-lived Node process that **caches CDP connections by browser name**. Connections persist across script runs.

- `dev-browser --connect` caches under the name `"default"`
- `dev-browser --browser foo --connect` caches under `"foo"`
- `dev-browser --browser foo` (managed Chromium) caches under `"foo"`

The Chrome "Allow remote debugging?" dialog only fires on the **first** `--connect` call. Every subsequent call reuses the cached connection with zero dialogs and zero cursor hijacking.

### Correct pattern for sites requiring real Chrome (e.g. Cloudflare Turnstile)

```bash
# One-time per session: enable debugging + accept Allow dialog
chrome-debug connect

# All subsequent calls reuse the cached connection — no dialog, no usecomputer
dev-browser --connect --timeout 30 run script1.js
dev-browser --connect --timeout 30 run script2.js
dev-browser --connect --timeout 30 run script3.js
```

### Never do these

- Never use `usecomputer` to click the Allow dialog on every script call — it's only needed once via `chrome-debug connect`
- Never spawn background processes to "keep the connection alive" — the daemon already does this
- Never assume `--connect` requires re-authentication between scripts — the daemon caches it
- Never use `--browser` mode when the site has bot detection (Cloudflare Turnstile, etc.) — use `--connect` to the user's real Chrome instead

## Named Pages

- `browser.getPage("name")` creates/reuses a named page that persists between script runs within the same browser instance
- `browser.newPage()` creates an anonymous page that is cleaned up when the script exits
- Always use named pages for multi-step flows

## Sandbox Limitations

The QuickJS sandbox blocks:
- `require()` / `import()` — no module loading
- `process` / `fs` / `fetch` — no host access
- Playwright download artifacts (`page.waitForEvent('download')`)

For downloads, use CDP: `Page.setDownloadBehavior` with `behavior: 'allow'` and `downloadPath`.

For passing data between bash and browser scripts, write to `~/.dev-browser/tmp/` from bash, read via `readFile()` in the sandbox.

## Daemon wedge — silent hangs (the `--timeout`-never-fires tell)

**Symptom:** `dev-browser --connect` (and anything on it, e.g. `td`) hangs with **no output**, and `--timeout` **never fires** — client processes pile up for *hours*. A real Chrome/CDP connect failure would time out; timeouts never firing across every client means they're all stuck on the **wedged daemon**.

**Diagnose:** `ps -Ao pid,etime,command | grep '[d]ev-browser'` — multiple clients hung far past their `--timeout`.

**Fix** (restart the daemon — it's shared, so get user OK first; clears the wedge AND re-matches a freshly-updated CLI):

```bash
kill -KILL "$(pgrep -f '[d]aemon.mjs')"
rm -f ~/.dev-browser/daemon.sock ~/.dev-browser/daemon.pid
```

The next `dev-browser` call spawns a fresh daemon. **Verified 2026-05-31:** a wedged daemon — *not* the Chrome-148 `/json` 404 — was the real blocker for `td open`; the restart fixed it instantly after ~3h of chasing the wrong layer.

**Don't chase `/json`.** Chrome M144+'s `chrome://inspect` "Allow remote debugging" toggle is **WebSocket-only — `/json/version` 404s by design** (it's the only way to debug the default/logged-in profile, since Chrome 136 blocked `--remote-debugging-port` on the default profile). dev-browser already handles this: on a 404 it reads the `ws://…/devtools/browser/<id>` URL from `~/Library/Application Support/Google/Chrome/DevToolsActivePort`. So a `/json` 404 is **expected and handled** — if it's hanging, suspect the daemon, not discovery. (Also: passing a `ws://` URL to `--connect` does NOT work — dev-browser forces the path to `/json/version` on whatever URL it's given, so always pass `http://…` or no URL.)
