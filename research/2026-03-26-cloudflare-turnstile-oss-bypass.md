# Cloudflare Turnstile: OSS bypass landscape for browser agents

**Date:** 2026-03-26
**Context:** Looking for ways to auto-pass Cloudflare Turnstile captchas when driving a browser with an AI agent (e.g. dev-browser, MCP tools). Triggered by an expired Turnstile on Rippling login.

## Tier 1: Actually work against Cloudflare Turnstile today

### SeleniumBase UC Mode (Python)

- **Repo:** https://seleniumbase.io/help_docs/uc_mode/
- The most reliable free OSS option right now
- Renames Chrome DevTools variables that anti-bot scans for, launches Chrome before attaching ChromeDriver, disconnects driver during sensitive page loads and button clicks
- Has dedicated `uc_gui_click_captcha()` for Turnstile
- Caveat: Python-only, uses pyautogui for the captcha click (same idea as our usecomputer approach)

### Nodriver (Python)

- **Repo:** https://github.com/ultrafunkamsterdam/nodriver
- Successor of undetected-chromedriver, by the same author
- Complete rewrite: fully async, zero Selenium dependency, talks CDP directly
- No `navigator.webdriver` flag because there's no WebDriver at all
- No automation markers because there's no framework injecting them
- Best stealth architecture of the bunch

## Tier 2: Anti-detect browsers with MCP integration

### Camoufox (Python, Firefox-based)

- **Repo:** https://github.com/daijro/camoufox
- **Docs:** https://camoufox.com/
- Custom Firefox fork with fingerprint spoofing at the **C++ engine level** (not JS injection)
- Rotates canvas, WebGL, audio, screen metrics, fonts
- Has MCP server wrappers (https://github.com/redf0x1/camofox-mcp) — 46 browser tools for Claude/agents
- **Problem:** maintainer went dark for a year, latest 2026 releases are "highly experimental with expected breaking changes, not suitable for production"

### Camoufox CLI

- **Repo:** https://github.com/Bin-Huang/camoufox-cli
- Standalone CLI wrapper around Camoufox for headless agent use
- C++-level fingerprint spoofing via the CLI

## Tier 3: Paid services

Scrapfly, ZenRows, BrightData, Browserless — all offer managed cloud browsers with built-in Cloudflare bypass. 98%+ success rates but not OSS.

## How Cloudflare detects automation

Cloudflare layers multiple detection signals into a trust score:

- **TLS fingerprinting** — verifies browser authenticity via JA4 and HTTP/2 patterns
- **Browser fingerprinting** — Canvas, WebGL, Audio contexts
- **Behavioral analysis** — mouse movements, click patterns, input timing
- **IP reputation scoring** — per-IP and per-ASN trust levels
- **Automation markers** — `navigator.webdriver`, DevTools variables, injected scripts
- **Per-customer ML models** — site-specific behavioral baselines

## Assessment for our use case

Our situation: Rippling login has Cloudflare Turnstile. We're legitimately authenticating, not scraping at scale. The captcha expired because the page sat idle.

**Best approach:** Use `chrome-debug connect` + dev-browser to drive the real Chrome profile. The Turnstile "managed challenge" passes silently for a real browser with a real fingerprint. If it expires, dev-browser can click "Refresh" since it's just a DOM element — the re-verification passes automatically.

**Why anti-detect tools are overkill here:** We already have a real Chrome with a real fingerprint via `chrome-debug`. The Turnstile isn't blocking us — it just expired. Anti-detect browsers solve a different problem (making automation look human to Cloudflare's fingerprinting). We don't need that because we ARE running in a real browser.

**When anti-detect would matter:** If we were running headless, using Playwright's bundled Chromium, or connecting via a fresh profile — then Cloudflare would flag us. That's when Camoufox/Nodriver/SeleniumBase UC Mode become relevant.
