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
