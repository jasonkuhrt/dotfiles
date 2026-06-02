# Browser Automation Next-Gen

Date: 2026-05-31

Superseded: This document is a local-tooling audit and is not the ceiling-first architecture answer. Use `2026-05-31-browser-automation-next-gen-v2-ceiling.md` for the first-principles recommendation.

## Decision

Build a local `browser-kernel` that treats browser control as typed infrastructure, not as ad hoc scripts around Playwright or CDP.

The ideal primary transport is the user's real Chrome default profile driven through native macOS/Chrome surfaces:

- Chrome Apple Events for tab/window discovery, navigation, and conservative JavaScript evaluation.
- Native input through CGEvent/AX wrappers (`usecomputer`, Peekaboo, macOS automation) for click/type/press/scroll.
- Keychain, `imsg`, and `oathtool` as typed credential and second-factor brokers.
- Effect services for every runtime boundary: browser, input, clock, filesystem, shell process, credentials, second factor, downloads, evidence recording.

Dedicated CDP profiles remain useful for profile-independent scraping and developer diagnostics. They are not the ideal current-profile authenticated transport.

## Hard Constraints

The recommended system must satisfy these six constraints at the transport boundary:

1. Drive the real logged-in session or a persistent profile that stays authenticated.
2. No per-connection permission prompt.
3. Agent-owned 2FA. The user never relays codes. TD SMS comes through `imsg` sender `83687`; TOTP comes from Keychain plus `oathtool`.
4. Strong bot-detection posture for TD EasyWeb, Turo/airlines, `canada.ca`, and `revenuquebec.ca`; real-browser fidelity matters.
5. macOS/all-Apple, CLI-first, composable shell pipelines, upstream-on-use maintenance.
6. Works on current Chrome 148+.

## Empirical Findings

Observed on this Mac with `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome --version`:

```text
Google Chrome 148.0.7778.216
```

Default-profile remote debugging is listening, but legacy discovery endpoints are dead:

```text
http://127.0.0.1:9222/json/version -> HTTP/1.1 404 Not Found
http://127.0.0.1:9222/json/list    -> HTTP/1.1 404 Not Found
```

Chrome does write a `DevToolsActivePort` file for the permissioned default-profile debugging path:

```text
~/Library/Application Support/Google/Chrome/DevToolsActivePort
9222
/devtools/browser/9bb24709-1fe0-43c9-8d98-788dc59709a3
```

A dedicated temp Chrome with `--user-data-dir` and `--remote-debugging-port=9334` still serves legacy discovery:

```text
/json/version -> 200
/json/list    -> 200
```

Chrome Apple Events work against the current real Chrome window and do not expose WebDriver:

```text
osascript execute active tab javascript:
{"href":"chrome://inspect/#remote-debugging","title":"Inspect with Chrome Developer Tools","webdriver":false}
```

`dev-browser --connect --timeout 5` hung for more than 10 seconds in the current default-profile state and had to be killed. The timeout did not make the command self-resolve. That is enough to treat current `--connect` as operationally unreliable for unattended current-profile workflows even though its code has a `DevToolsActivePort` fallback.

## Primary Source Facts

Chrome's official security change is the baseline: from Chrome 136, `--remote-debugging-port` and `--remote-debugging-pipe` are ignored for the default Chrome data directory; Chrome requires a non-standard `--user-data-dir` for that command-line debugging path, and Chrome for Testing keeps the old behavior. Source: [Chrome remote debugging hardening](https://developer.chrome.com/blog/remote-debugging-port).

Chrome's official agent documentation makes `--autoConnect` a permissioned default-profile path in Chrome 144+: enable `chrome://inspect/#remote-debugging`, configure `chrome-devtools-mcp@latest --autoConnect`, then Chrome asks the user to allow the remote debugging session. Source: [Get started with Chrome DevTools for agents](https://developer.chrome.com/docs/devtools/agents/get-started?hl=en).

Playwright's own API docs say `connectOverCDP` attaches over CDP and is lower-fidelity than the Playwright protocol. They also say `launchPersistentContext(userDataDir)` stores cookies/local storage in that user data directory, but automating the default Chrome profile is unsupported because of recent Chrome policy changes. Source: [Playwright BrowserType API](https://playwright.dev/docs/api/class-browsertype).

Puppeteer supports Chrome over CDP by default; WebDriver BiDi is available, but Chrome still defaults to CDP because not all CDP features are supported over BiDi. Source: [Puppeteer WebDriver BiDi support](https://pptr.dev/webdriver-bidi).

WebDriver BiDi is a W3C protocol extending WebDriver with bidirectional communication over WebSockets. Source: [W3C WebDriver BiDi](https://www.w3.org/TR/webdriver-bidi/). Selenium is moving functionality toward BiDi while exposing high-level APIs. Source: [Selenium BiDi docs](https://www.selenium.dev/documentation/webdriver/bidi/).

Firefox officially supports Marionette and WebDriver BiDi remote protocols. Source: [Firefox Remote Protocols](https://firefox-source-docs.mozilla.org/remote/index.html).

Safari WebDriver exists through `safaridriver`, but Apple's model isolates test execution from normal browsing data and requires enabling WebDriver. Sources: [Apple Testing with WebDriver in Safari](https://developer.apple.com/documentation/webkit/testing-with-webdriver-in-safari?changes=_7_8), [Apple About WebDriver for Safari](https://developer.apple.com/documentation/webkit/about-webdriver-for-safari?changes=_5), [WebKit Safari WebDriver support](https://webkit.org/blog/6900/webdriver-support-in-safari-10/).

Chrome extensions can use the `chrome.debugger` API as an alternate transport for CDP, but the extension must request the `debugger` permission and the API still sends CDP commands to tabs. Source: [chrome.debugger API](https://developer.chrome.com/docs/extensions/reference/api/debugger).

## Local Inventory

### `dev-browser`

Installed command:

```text
/Users/jasonkuhrt/.bun/bin/dev-browser -> ../install/global/node_modules/dev-browser/bin/dev-browser.js
```

Installed package:

```text
dev-browser 0.2.3
playwright 1.58.2
playwright-core 1.58.2
```

Official source cloned to:

```text
/Users/jasonkuhrt/repo-references/browser-automation-2026-05-31/dev-browser
```

Source facts:

- `README.md:7` describes sandboxed JS browser automation with persistent pages and auto-connect.
- `README.md:33` describes connecting to running Chrome via `chrome://inspect` remote debugging.
- `daemon/src/browser-manager.ts:379` uses Playwright `connectOverCDP`.
- `daemon/src/browser-manager.ts:349` uses Playwright `launchPersistentContext` for named managed browser profiles.
- `daemon/src/browser-manager.ts:456` reads `DevToolsActivePort` candidates.
- `daemon/src/browser-manager.ts:605` probes `/json/version`.
- `daemon/src/browser-manager.ts:689` falls back to `DevToolsActivePort` when `/json/version` returns 404.

Hard evaluation:

- Real logged-in session: yes only through permissioned default-profile CDP; otherwise dedicated managed profile.
- Zero per-connection prompt: no hard guarantee. The daemon may cache a connection, but Chrome owns the permissioned session.
- Agent-owned 2FA: yes when wrappers provide brokers.
- Bot resistance: weak for TD-class flows because it is still CDP/Playwright; local TD notes already say final submit gates on CDP-attached-tab signals.
- macOS/CLI/upstream: good.
- Chrome 148: partial. Dedicated profile works; default profile is operationally fragile.

Result: keep for dedicated-CDP scraping and diagnostics, remove from current-profile authenticated flows.

### `chrome-debug`

Path:

```text
/Users/jasonkuhrt/.local/bin/chrome-debug -> ../../projects/jasonkuhrt/dotfiles/home/.local/bin/chrome-debug
```

Source facts:

- `/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/.local/bin/chrome-debug:4` describes connecting `dev-browser` to the Chrome default profile using Chrome M144+ permission-based remote debugging.
- `:21` opens `chrome://inspect`, enables remote debugging, starts `dev-browser`, and clicks Allow.
- `:51` contains window-bound/coordinate logic.
- `:148` implements `status` through `lsof ... | grep -c Chrome`.
- `:167` documents the Chrome 136 default-profile remote-debugging restriction.
- `:177` documents the Chrome M144+ per-session permission flow.

Empirical bug:

`chrome-debug status` said Chrome was not listening while `lsof` showed `COMMAND Google ... TCP 127.0.0.1:9222 (LISTEN)`. The status implementation greps for `Chrome`, but the process command appears as `Google`.

Hard evaluation:

- Real logged-in session: yes.
- Zero per-connection prompt: no. It exists to automate the prompt.
- Agent-owned 2FA: not its layer.
- Bot resistance: poor for sites that react to CDP-attached tabs.
- macOS/CLI/upstream: local script, maintainable but brittle.
- Chrome 148: partially works around permissioned path but inherits prompt semantics.

Result: retire from core automation; keep only as a diagnostic helper if needed.

### `claude-chrome-allow`

Path:

```text
/Users/jasonkuhrt/.bun/bin/claude-chrome-allow -> ../install/global/node_modules/claude-chrome-allow/bin/cli.ts
```

Source facts:

- `/Users/jasonkuhrt/projects/jasonkuhrt/claude-chrome-allow/bin/cli.ts:4` says it requires remote debugging and uses `dev-browser`.
- `:83` evaluates a bridge script in the extension options page.
- `:145` reads Claude extension permissions.
- `:159` adds domains to extension storage.

Hard evaluation:

- Real logged-in session: yes for Claude in Chrome.
- Zero per-connection prompt: no for its CDP setup path.
- Agent-owned 2FA: not its layer.
- Bot resistance: unrelated to site automation; it edits extension storage.
- macOS/CLI/upstream: useful local CLI, but tied to extension storage internals.
- Chrome 148: inherits the CDP setup problem.

Result: keep for Claude-in-Chrome convenience, not as core browser automation.

### TD EasyWeb CLI

Path:

```text
/Users/jasonkuhrt/.local/bin/td -> /Users/jasonkuhrt/projects/jasonkuhrt/td/td
```

Source facts:

- `/Users/jasonkuhrt/projects/jasonkuhrt/td/td:4` says the CLI drives TD through `dev-browser --connect` and real Chrome.
- `:10` says bill-payment Finish gates on CDP-attached-tab signals and managed Chromium fails.
- `:60` sets `TD_2FA_SENDER=83687`.
- `:316` invokes `dev-browser --browser td --connect`.
- `:358` reads Messages through `imsg` and extracts the TD SMS code.
- `:457` pulls password from Keychain, runs login, then runs 2FA after the code arrives.

Hard evaluation:

- Real logged-in session: yes through real Chrome.
- Zero per-connection prompt: no under current CDP path.
- Agent-owned 2FA: yes.
- Bot resistance: current source explicitly identifies CDP-attached-tab gating as the problem.
- macOS/CLI/upstream: good.
- Chrome 148: blocked by prompt/discovery/attached-tab realities.

Result: first migration target for `chrome-default` native transport.

### Rippling CLI

Path:

```text
/Users/jasonkuhrt/.local/bin/rippling -> /Users/jasonkuhrt/projects/jasonkuhrt/rippling/rippling
```

Source facts:

- `/Users/jasonkuhrt/projects/jasonkuhrt/rippling/rippling:4` uses `dev-browser --connect` and real Chrome.
- `:8` says Cloudflare Turnstile blocks managed Chromium.
- `:77` ensures Chrome connection through `chrome-debug`.
- `:140` reads TOTP material from Keychain and generates a code with `oathtool`.

Hard evaluation:

- Real logged-in session: yes through real Chrome.
- Zero per-connection prompt: no under current CDP path.
- Agent-owned 2FA: yes.
- Bot resistance: current system already requires real Chrome for Turnstile; CDP remains the weak point.
- macOS/CLI/upstream: good.
- Chrome 148: inherits default-profile CDP issues.

Result: migrate to `chrome-default`; preserve TOTP broker.

### Government CLIs

Paths:

```text
/Users/jasonkuhrt/projects/jasonkuhrt/cra/cra
/Users/jasonkuhrt/projects/jasonkuhrt/rq/gov
```

Source facts:

- `/Users/jasonkuhrt/projects/jasonkuhrt/cra/cra:4` describes CRA automation through `dev-browser --connect` with real Chrome preferred for SSO redirects/eToken/2FA.
- `/Users/jasonkuhrt/projects/jasonkuhrt/rq/gov:4` covers RQ/HQ/SAAQ/CRA flows.
- `/Users/jasonkuhrt/projects/jasonkuhrt/rq/gov:86` defaults `GOV_BROWSER_MODE=managed`.
- `/Users/jasonkuhrt/projects/jasonkuhrt/rq/gov:112` supports managed/connect modes and bootstraps `chrome-debug` in connect mode.

Hard evaluation:

- Real logged-in session: inconsistent today.
- Zero per-connection prompt: no if connect mode is used.
- Agent-owned 2FA: site-dependent, not yet a common broker.
- Bot resistance: managed mode is weak when the current signed-in profile is required; connect mode inherits CDP problems.
- macOS/CLI/upstream: good enough.
- Chrome 148: managed works for owned-profile flows; connect mode is fragile.

Result: current-profile auth/download flows should use `chrome-default`; managed/dedicated CDP only for profile-independent pages.

### Other Browser Scripts

Found `browser-scripts` or browser helpers in:

```text
/Users/jasonkuhrt/projects/jasonkuhrt/acc
/Users/jasonkuhrt/projects/jasonkuhrt/classifieds
/Users/jasonkuhrt/projects/jasonkuhrt/parks
```

Source facts:

- `/Users/jasonkuhrt/projects/jasonkuhrt/acc/src/dev-browser.ts:1` wraps `dev-browser`; ACC Mews works with managed Chromium by default, connect optional.
- `/Users/jasonkuhrt/projects/jasonkuhrt/classifieds/src/browser.ts:1` supports connect/managed through `CLASSIFIEDS_BROWSER_MODE`.
- `/Users/jasonkuhrt/projects/jasonkuhrt/parks/src/dev-browser.ts:1` always uses `dev-browser --connect`; real Chrome is needed because Material `mat-select` panels need trusted CDP-attached pointer events.

Hard evaluation:

- Real logged-in session: only for connect paths.
- Zero per-connection prompt: no for connect paths.
- Agent-owned 2FA: not core for these flows.
- Bot resistance: mixed; Parks already needs higher-fidelity input.
- macOS/CLI/upstream: good.
- Chrome 148: dedicated/managed CDP is fine for owned-profile scraping, not current-profile auth.

Result: route through the kernel. Use `chrome-default` for trusted-event or current-profile paths; use dedicated CDP for public scraping.

### Peekaboo, macOS Automator, `usecomputer`

Installed:

```text
peekaboo 3.0.0
@steipete/macos-automator-mcp 0.4.1
usecomputer CLI installed
```

Source facts:

- `/Users/jasonkuhrt/.npm-global/lib/node_modules/@steipete/peekaboo/README.md:14` describes high-fidelity screen capture and GUI automation.
- `/Users/jasonkuhrt/.npm-global/lib/node_modules/@steipete/peekaboo/package.json:2` shows package version `3.0.0`.
- `/Users/jasonkuhrt/.npm/_npx/556a04b6d0c944ad/node_modules/@steipete/macos-automator-mcp/README.md:5` describes AppleScript/JXA execution through MCP.
- `/Users/jasonkuhrt/.npm/_npx/556a04b6d0c944ad/node_modules/@steipete/macos-automator-mcp/package.json:2` shows package version `0.4.1`.

Hard evaluation:

- Real logged-in session: yes, because they operate the real app surface.
- Zero per-connection prompt: yes after normal macOS accessibility/automation permissions.
- Agent-owned 2FA: yes when paired with brokers.
- Bot resistance: strongest local posture because input and browser identity are real.
- macOS/CLI/upstream: yes.
- Chrome 148: yes, independent of CDP discovery.

Result: these are the native substrate for the primary transport.

### `plannotator-browser` / `cmux browser`

Path:

```text
/Users/jasonkuhrt/.local/bin/plannotator-browser -> ../../projects/jasonkuhrt/dotfiles/home/.local/bin/plannotator-browser
```

Observed help exposes `cmux browser` operations: profiles, import, cookies, storage, tabs, eval, click, type, download.

Hard evaluation:

- Real logged-in session: not Chrome default profile.
- Zero per-connection prompt: likely yes within its own surface.
- Agent-owned 2FA: not its layer.
- Bot resistance: unknown for target sites; not proven as real Chrome default-profile fidelity.
- macOS/CLI/upstream: useful local CLI.
- Chrome 148: not the controlling issue.

Result: separate app/webview automation, not the current-profile browser kernel.

## Landscape Evaluation

### Follow-Up: Browser Choice and Authoring Interface

The first version of this note overfocused on transport fit against the hard constraints. It did consider non-Chrome browsers, but it did not give enough weight to two separate questions:

1. Which browser/runtime should execute the work?
2. Which interface should agents use to author browser work?

Those are not the same question.

Runtime conclusion:

- Chrome remains the best default execution browser for this use case because the user's real logged-in state is already there, target sites optimize for Chromium compatibility, Chrome 148 behavior can be empirically tested on this machine, and local wrappers already target Chrome.
- Safari is attractive on macOS but fails the current Chrome-profile requirement and has a WebDriver/test-runner model rather than a mature agent authoring surface.
- Firefox is attractive for independence and BiDi, but it fails the current Chrome-profile requirement and changes the browser fingerprint.
- Brave and Edge are Chromium-family alternatives. They may be useful as dedicated persistent profiles, but they do not improve the core real-default-Chrome problem.
- Camoufox is interesting for stealth scraping, not for this default-profile Chrome workflow.
- Lightpanda/Ladybird-class browsers are not mature real-site authenticated workflow candidates.
- Agent-first browsers such as Tandem Browser and Vessel are the most interesting alternative category because they make the browser itself an agent runtime. They are worth tracking, but switching current-profile workflows to a different daily-driver browser is a higher-friction product decision than building a typed local kernel around the browser already in use.

Authoring-interface conclusion:

- A Playwright-compatible interface is a major DX advantage. It is familiar, easy for agents to generate, type-safe in TypeScript, and maps to a huge existing knowledge base.
- Dev Browser's strongest idea is not merely its transport. Its strongest idea is giving agents a familiar Playwright-shaped API in a CLI/runtime that persists browser state.
- The ideal kernel should expose a strict, type-safe TypeScript SDK with Playwright-like locators/actions where possible, plus extra typed services for things Playwright does not model well: native trusted input, credential references, second-factor references, tab ownership, downloads, and evidence.
- If the transport is `ChromeDefault` through Apple Events/native input, the authoring surface can still look Playwright-like. The SDK does not need to leak the transport.

### Open-Source Tools Added After Follow-Up

#### Vercel `agent-browser`

Official source:

```text
https://github.com/vercel-labs/agent-browser
```

Facts:

- It is a fast native Rust CLI for browser automation aimed at AI agents.
- It supports snapshots with stable element refs such as `@e2`, selector actions, semantic locators, batch execution, session persistence, CDP attach, streaming, and cloud providers.
- It installs Chrome for Testing by default but can detect existing Chrome, Brave, Playwright, and Puppeteer installations.
- It can copy an existing Chrome profile to a temp directory for login-state reuse, use a persistent profile path, save/load session state, and connect over CDP.
- Its architecture is a Rust CLI plus Rust daemon using direct CDP.

Hard evaluation:

- Real logged-in session: strong for copied profile state and persistent profiles, but not the current live default Chrome profile unless using CDP/auto-connect.
- Zero per-connection prompt: yes for its own managed/dedicated profiles; no hard solution for Chrome default-profile permissioned CDP.
- Agent-owned 2FA: possible through outer brokers or its auth features.
- Bot resistance: better ergonomics than raw CDP, but still CDP/Chrome-for-Testing or profile-copy based for most flows.
- macOS/CLI/upstream: excellent.
- Chrome 148: likely good for dedicated profiles; default-profile auto-connect inherits Chrome 148 permission semantics.

Authoring-interface evaluation:

- Excellent. The snapshot-ref CLI is highly agent-friendly, and the command surface is simpler for agents than raw Playwright scripts.
- Less ideal than a typed TypeScript SDK for repo-authored durable workflows unless paired with generated types or a TS SDK.

Result: high-value reference design for agent ergonomics; not the final current-profile transport.

#### Open Browser Use

Official source:

```text
https://github.com/iFurySt/open-browser-use
```

Facts:

- Pairs a Chrome extension with a native host and CLI.
- Provides JavaScript/TypeScript, Python, and Go SDKs plus MCP.
- Describes itself as platform-neutral real Chrome automation for AI agents.

Hard evaluation:

- Real logged-in session: yes, because it targets the real Chrome profile.
- Zero per-connection prompt: likely yes after extension/native-host setup.
- Agent-owned 2FA: possible through outer brokers.
- Bot resistance: better than CDP attach for real-profile work if actions are extension/native-host mediated, but extension/content-script observability needs empirical testing on TD-class targets.
- macOS/CLI/upstream: good.
- Chrome 148: likely good because it does not depend primarily on legacy `/json` discovery.

Authoring-interface evaluation:

- Very relevant. It is closer to the desired "real Chrome profile + SDK + MCP" shape than CDP-first tools.
- Needs direct local testing before becoming the primary recommendation.

Result: strongest new candidate to test against the `ChromeDefault` design.

#### Tandem Browser

Official source:

```text
https://tandembrowser.org/
```

Facts:

- Open-source, local-first, MIT-licensed developer-preview browser for AI agents.
- Claims same tabs, cookies, DOM, accessibility tree, and logged-in sessions in an agent-visible browser.
- MCP/HTTP model-agnostic interface.
- macOS Apple Silicon and Windows support; Linux best effort.

Hard evaluation:

- Real logged-in session: yes inside Tandem, not inside the user's current Chrome profile.
- Zero per-connection prompt: yes in its own runtime.
- Agent-owned 2FA: possible.
- Bot resistance: strong if used as a real daily browser; weaker if it is an extra browser nobody uses daily.
- macOS/CLI/upstream: promising but developer-preview.
- Chrome 148: not the direct issue; it is a separate browser.

Authoring-interface evaluation:

- Very interesting as a full product/runtime direction.
- Less ideal if the goal is repo-authored typed workflows over today's Chrome profile.

Result: track closely; not the immediate migration target.

#### Vessel Browser

Official source:

```text
https://github.com/unmodeled-tyler/vessel-browser
```

Facts:

- Open-source Chromium/Electron browser for persistent web agents.
- Provides durable state, MCP control, supervisory UI, named sessions, checkpoints, page schema inference, and agent-facing browser surfaces.
- Linux is the most mature target; macOS release packaging is available from source.
- Its operating model still needs verification.

Hard evaluation:

- Real logged-in session: yes inside Vessel, not the user's current Chrome profile.
- Zero per-connection prompt: yes in its own runtime.
- Agent-owned 2FA: possible; premium credential/TOTP features are described.
- Bot resistance: likely better than headless automation if used as a real browser, but not proven for TD-class sites.
- macOS/CLI/upstream: promising but less mature on macOS.
- Chrome 148: not the direct issue; it is Electron/Chromium.

Authoring-interface evaluation:

- Strong product/runtime ideas for long-running agent supervision.
- Less ideal for immediate CLI-first typed repo workflows.

Result: track; not the immediate primary path.

### If Security Is Ignored

Ignoring security changes the simplicity ranking, but not all reliability conclusions.

The simplest authoring/runtime stack becomes:

1. Vercel `agent-browser` or Dev Browser for agent-friendly CLI automation.
2. Playwright-compatible typed TypeScript workflows over a dedicated persistent Chrome profile.
3. CDP attach to existing Chrome only when the workflow explicitly chooses that prompt-based channel.

That path is substantially easier to use and easier for agents to author than native Apple Events plus typed input services.

But the end state is not equally reliable for current-profile targets. Ignoring security does not remove bot-detection, CDP-attached-tab signals, Chrome default-profile policy changes, or TD's current final-submit behavior. For profile-independent public scraping and ordinary app testing, CDP/Playwright-style tools are simpler and probably more reliable. For current-profile auth, the no-CDP real-profile/native-input path remains the stronger reliability target.

### Ideal Authoring Surface

The best developer experience is not raw AppleScript, raw AX, or raw shell commands. It is a typed TypeScript SDK with a familiar Playwright-like action model:

```ts
const td = await browserKernel.site("td").open();

await td.page.getByLabel("Username").fill(Credential.ref("td.username"));
await td.page.getByLabel("Password").fill(Credential.ref("td.password"));
await td.page.getByRole("button", { name: "Log in" }).click();

const code = await SecondFactor.sms({
  sender: "83687",
  site: "td",
});

await td.page.getByLabel("Security code").fill(code);
await td.page.getByRole("button", { name: "Continue" }).click();
```

This keeps the part agents write familiar and type-safe while allowing the runtime to choose the correct transport:

- Playwright/CDP for public scraping and test-like flows.
- Chrome extension/native-host if it passes empirical TD-class testing.
- Chrome Apple Events/native input for current-profile workflows.

The particular code approach matters most at the boundaries:

- Agents should write against one typed interface.
- Transport choice should be policy, not copied into every workflow.
- The interface should be Playwright-like where that buys familiarity.
- The interface should be stricter than Playwright where the domain requires it: credentials, 2FA, native input, downloads, tab ownership, and evidence.

### Chrome DevTools MCP

Official source:

```text
/Users/jasonkuhrt/repo-references/browser-automation-2026-05-31/chrome-devtools-mcp
```

Facts:

- Uses Puppeteer.
- Supports `--autoConnect`.
- Current package uses `puppeteer 25.1.0`.
- Official Chrome docs say `--autoConnect` requests a remote debugging session and Chrome shows a user permission dialog.

Hard evaluation:

- Real logged-in session: yes through `--autoConnect`.
- Zero per-connection prompt: no.
- Agent-owned 2FA: not its layer.
- Bot resistance: CDP-attached automation.
- macOS/CLI/upstream: excellent.
- Chrome 148: supported for agent debugging, but permissioned.

Result: excellent dev/debug MCP; not core for current-profile automation.

### Playwright / Puppeteer / CDP

Hard evaluation:

- Real logged-in session: only through default-profile CDP, which is permissioned, or a separate persistent automation profile.
- Zero per-connection prompt: no for default profile; yes for dedicated profile.
- Agent-owned 2FA: possible as an outer broker.
- Bot resistance: weak for flows where CDP/automation instrumentation changes site behavior.
- macOS/CLI/upstream: excellent.
- Chrome 148: dedicated profile works; default profile is policy-restricted and permissioned.

Result: ideal only for the dedicated-CDP public scraping pool.

### WebDriver BiDi / Selenium

Hard evaluation:

- Real logged-in session: not ideal for Chrome default-profile use; it is still an automation session.
- Zero per-connection prompt: yes for normal driver-managed sessions, not for the real current Chrome profile.
- Agent-owned 2FA: possible as an outer broker.
- Bot resistance: not a real-user Chrome profile path.
- macOS/CLI/upstream: excellent.
- Chrome 148: protocol is modern but does not solve the default-profile/prompt problem.

Result: not the current-profile primary transport.

### Chrome Extension / Native Messaging

Hard evaluation:

- Real logged-in session: yes, inside the real profile.
- Zero per-connection prompt: yes after extension install/permissions.
- Agent-owned 2FA: possible.
- Bot resistance: mixed. Extension APIs/content scripts are observable by pages in some cases; `chrome.debugger` is still CDP; extension review/permissions create maintenance friction.
- macOS/CLI/upstream: possible with native messaging, but larger maintenance surface than Apple Events.
- Chrome 148: yes.

Result: not the ideal core. Use only if Apple Events cannot expose a required browser primitive.

### Native Chrome App Control

Hard evaluation:

- Real logged-in session: yes, current Chrome default profile.
- Zero per-connection prompt: yes after normal macOS permissions.
- Agent-owned 2FA: yes through broker services.
- Bot resistance: strongest local posture; no CDP-attached-tab signal, no WebDriver, real cookies, real extensions, real browser binary, real user profile.
- macOS/CLI/upstream: yes.
- Chrome 148: empirically yes.

Result: primary transport.

### CDP Stealth Families: Nodriver, Rebrowser, Patchright

Official source repos cloned:

```text
/Users/jasonkuhrt/repo-references/browser-automation-2026-05-31/nodriver
/Users/jasonkuhrt/repo-references/browser-automation-2026-05-31/rebrowser-patches
/Users/jasonkuhrt/repo-references/browser-automation-2026-05-31/patchright
```

Facts:

- Nodriver describes itself as the successor to undetected-chromedriver, communicating directly with the browser and avoiding Selenium/WebDriver.
- Rebrowser patches documented Playwright/Puppeteer leaks such as automatic `Runtime.enable`, `Console.enable`, and source URL / utility-world signals.
- Patchright removes or changes Playwright/Chromium automation leaks and targets Chromium only.

Hard evaluation:

- Real logged-in session: not ideal for current default profile; usually dedicated profiles.
- Zero per-connection prompt: yes for dedicated profiles, no solution for Chrome default-profile permission semantics.
- Agent-owned 2FA: possible as outer broker.
- Bot resistance: better than stock CDP, but still automation-protocol driven and patch-maintenance heavy.
- macOS/CLI/upstream: mixed; patch stacks need ongoing verification against Chrome and detectors.
- Chrome 148: potentially, but every upgrade is a retest.

Result: useful only inside the dedicated-CDP scraping pool when public-site bot pressure requires it.

### Camoufox

Official source:

```text
/Users/jasonkuhrt/repo-references/browser-automation-2026-05-31/camoufox
```

Hard evaluation:

- Real logged-in Chrome session: no.
- Zero per-connection prompt: yes.
- Agent-owned 2FA: possible as outer broker.
- Bot resistance: strong for Firefox-fingerprint scraping.
- macOS/CLI/upstream: plausible.
- Chrome 148: no; it is not Chrome.

Result: not eligible for the requested core.

### Browser Use / Stagehand / Skyvern / Steel / Browserless

Official source repos cloned:

```text
/Users/jasonkuhrt/repo-references/browser-automation-2026-05-31/browser-use
/Users/jasonkuhrt/repo-references/browser-automation-2026-05-31/stagehand
/Users/jasonkuhrt/repo-references/browser-automation-2026-05-31/skyvern
/Users/jasonkuhrt/repo-references/browser-automation-2026-05-31/steel-browser
/Users/jasonkuhrt/repo-references/browser-automation-2026-05-31/browserless
```

Hard evaluation:

- Real logged-in session: no hard distinguisher at the local transport layer; they inherit Playwright/CDP, cloud browser, or managed-session models.
- Zero per-connection prompt: no hard distinguisher for current default Chrome profile.
- Agent-owned 2FA: possible as orchestration logic, not the deciding transport property.
- Bot resistance: cloud/stealth offerings help scraping, but do not give the user's current Chrome default profile.
- macOS/CLI/upstream: good for some layers.
- Chrome 148: no hard distinguisher.

Result: orchestration candidates above the kernel or scraping-pool infrastructure, not the core transport.

### Lightpanda

Official source:

```text
/Users/jasonkuhrt/repo-references/browser-automation-2026-05-31/browser
```

Hard evaluation:

- Real logged-in Chrome session: no.
- Zero per-connection prompt: yes.
- Agent-owned 2FA: possible as outer broker.
- Bot resistance: not a full real browser identity.
- macOS/CLI/upstream: plausible for specific public scraping.
- Chrome 148: no; it is not Chrome.

Result: not eligible for the requested core.

## Hard Constraint Matrix

| Option | Real session | Zero per-connection prompt | Agent 2FA | Bot/fidelity | macOS CLI/upstream | Chrome 148+ | Result |
|---|---:|---:|---:|---:|---:|---:|---|
| Native Chrome default profile via Apple Events + OS input | Yes | Yes | Yes | Strongest | Yes | Yes | Primary |
| `dev-browser --connect` / default-profile CDP | Yes | No | Yes with wrappers | Weak for TD-class flows | Yes | Fragile | Retire from current-profile flows |
| Chrome DevTools MCP `--autoConnect` | Yes | No | External | CDP-attached | Excellent | Yes | Dev/debug only |
| Dedicated Chrome profile + CDP | Persistent profile, not current login | Yes | Yes with wrappers | Medium | Excellent | Yes | Public scraping pool |
| Playwright/Puppeteer stock | Persistent profile, not current login | Yes outside default profile | External | Medium/weak | Excellent | Yes | Public scraping pool only |
| Nodriver/Rebrowser/Patchright | Persistent profile, not current login | Yes outside default profile | External | Medium/strong, retest-heavy | Mixed | Retest required | Stealth scraping pool only |
| Chrome extension/native messaging | Yes | Yes after install | Possible | Mixed; debugger API is CDP | Mixed | Yes | Only if native control lacks a primitive |
| WebDriver BiDi/Selenium | Automation session | Yes | External | Medium | Excellent | Yes | Not core |
| Camoufox | No Chrome session | Yes | External | Strong for Firefox | Good | No | Not core |
| Browser Use/Stagehand/Skyvern/Steel/Browserless | No hard distinguisher | No hard distinguisher | External | No hard local-profile distinguisher | Good | No hard distinguisher | Orchestration/scraping infra |
| Safari WebDriver | No Chrome session | Yes after enable | External | Safari identity | Excellent macOS | No | Not core |
| Firefox BiDi/Marionette | No Chrome session | Yes | External | Firefox identity | Good | No | Not core |
| Lightpanda | No Chrome session | Yes | External | Not full real browser | Good | No | Not core |

## Target Architecture

### Package Shape

Create a `browser-kernel` CLI/package with these public commands:

```text
browser-kernel open <site>
browser-kernel run <workflow> --json
browser-kernel tabs --json
browser-kernel capture --json
browser-kernel broker 2fa --site <site> --json
browser-kernel broker credential --site <site> --json
```

Use Bun for scripts and Effect for services.

### Service Boundaries

`ChromeDefault`

- Apple Events wrapper around Google Chrome.
- Lists windows/tabs.
- Focuses tabs.
- Navigates the active tab.
- Evaluates small DOM-read scripts.
- Returns typed snapshots with URL, title, loading state, visible text, selectors, and element rectangles.

`TrustedInput`

- CGEvent/AX-backed click/type/press/scroll/drag.
- Validates front app, window bounds, screen scale, active tab URL, and target rectangle before acting.
- Supports typed points:
  - `ScreenPoint`
  - `WindowPoint`
  - `CssPoint`
  - `DevicePixelPoint`

`CredentialBroker`

- Reads secrets by stable logical references, never by raw secret strings in workflow state.
- Keychain-backed.
- Returns `SecretRef`/temporary file handles rather than exposing secret values in logs.

`SecondFactorBroker`

- `SmsCodeSource` for `imsg`, including TD sender `83687`.
- `TotpSource` for Keychain `otpauth://` material plus `oathtool`.
- Produces `SecondFactorCodeRef`; avoids printing or storing raw codes.

`DownloadBroker`

- Watches the real Chrome download directory.
- Associates downloads with workflow expectations.
- Moves/renames artifacts through typed `DownloadedFile` values.

`EvidenceRecorder`

- Redacted DOM snapshots.
- Screenshots with secret redaction zones.
- Browser state transitions.
- Input intent and result, not raw credential/2FA values.

`TransportRouter`

- Statically maps site/action to the correct transport.
- TD, Rippling, Turo/airlines, and current-profile auth flows route to `ChromeDefault`.
- Public scraping and profile-independent downloads route to `ChromeDedicatedCdp`.
- Native AX-only fallbacks require an explicit typed reason.

### Types

Use schemas and branded types for:

```text
SiteId
WorkflowId
TabId
WindowId
Selector
ElementHandleRef
CssPoint
ScreenPoint
Rect
SecretRef
SecondFactorCodeRef
DownloadedFile
EvidenceId
TransportKind
```

The workflow authoring surface should make illegal states hard to express:

- A workflow step cannot request a password string; it can request `SecretRef`.
- A 2FA step cannot print a code; it can submit a `SecondFactorCodeRef`.
- A click cannot be issued without an element rectangle tied to a fresh tab snapshot.
- A CDP operation cannot run inside a workflow classified as `CurrentProfileAuth`.
- A site policy chooses transport before any browser process is touched.

### Transport Policy

`ChromeDefault`:

- TD EasyWeb.
- Rippling.
- Turo.
- Airlines.
- CRA/RQ/HQ/SAAQ auth.
- Any flow where real browser profile, trusted native input, or no CDP-attached-tab signal matters.

`ChromeDedicatedCdp`:

- Public classifieds scraping.
- Public park availability scraping when the target does not reject automation.
- Download-only flows after authentication has already been handled in `ChromeDefault`.
- Developer diagnostics.

`NativeOnly`:

- Browser or OS dialogs.
- File pickers.
- Permission prompts.
- Sites where DOM eval is blocked but visible UI remains operable.

## Migration

1. Add `browser-kernel` with Effect services for `ChromeDefault`, `TrustedInput`, `CredentialBroker`, `SecondFactorBroker`, `DownloadBroker`, `EvidenceRecorder`, and `TransportRouter`.
2. Port TD first. Preserve the existing Keychain and `imsg` behavior, but replace `dev-browser --connect` with `ChromeDefault` tab control and native input.
3. Port Rippling next. Preserve TOTP generation from Keychain plus `oathtool`; replace `chrome-debug`/`dev-browser --connect` with `ChromeDefault`.
4. Move CRA/RQ/HQ/SAAQ auth/download flows to `ChromeDefault`. Keep dedicated CDP only for public unauthenticated pages.
5. Route `parks`, `acc`, and `classifieds` through `TransportRouter`. Use dedicated CDP for public scraping and `ChromeDefault` only when the site needs real-profile or trusted-event fidelity.
6. Demote `chrome-debug` to diagnostics and fix its `status` check if it remains installed.
7. Keep `claude-chrome-allow` scoped to Claude-in-Chrome allowlist management.
8. Keep `dev-browser` as a dedicated-CDP execution backend and remove it from current-profile wrappers.

## Implementation Notes

The first useful vertical slice is TD login plus one read-only account-inspection action:

1. Locate or open the TD tab in the real Chrome profile.
2. Use `CredentialBroker` to load username/password references.
3. Navigate through login with Apple Events snapshots and native input.
4. Detect 2FA state.
5. Use `SecondFactorBroker` to wait for sender `83687`.
6. Submit the code through native input.
7. Emit JSON status transitions compatible with the existing `td` CLI output style.
8. Record redacted evidence.

That slice proves the decisive properties: real Chrome profile, no CDP attach, no per-connection prompt, agent-owned 2FA, and repeatable CLI operation.

## Source Index

Local:

- `/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/.local/bin/chrome-debug`
- `/Users/jasonkuhrt/projects/jasonkuhrt/claude-chrome-allow/bin/cli.ts`
- `/Users/jasonkuhrt/projects/jasonkuhrt/td/td`
- `/Users/jasonkuhrt/projects/jasonkuhrt/rippling/rippling`
- `/Users/jasonkuhrt/projects/jasonkuhrt/cra/cra`
- `/Users/jasonkuhrt/projects/jasonkuhrt/rq/gov`
- `/Users/jasonkuhrt/projects/jasonkuhrt/acc/src/dev-browser.ts`
- `/Users/jasonkuhrt/projects/jasonkuhrt/classifieds/src/browser.ts`
- `/Users/jasonkuhrt/projects/jasonkuhrt/parks/src/dev-browser.ts`
- `/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/.claude/rules/dev-browser.md`
- `/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/.claude/rules/claude-in-chrome.md`
- `/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/.claude/rules/computer-use.md`
- `/Users/jasonkuhrt/.npm-global/lib/node_modules/@steipete/peekaboo/README.md`
- `/Users/jasonkuhrt/.npm/_npx/556a04b6d0c944ad/node_modules/@steipete/macos-automator-mcp/README.md`

Reference repos:

- `/Users/jasonkuhrt/repo-references/browser-automation-2026-05-31/dev-browser`
- `/Users/jasonkuhrt/repo-references/browser-automation-2026-05-31/chrome-devtools-mcp`
- `/Users/jasonkuhrt/repo-references/browser-automation-2026-05-31/nodriver`
- `/Users/jasonkuhrt/repo-references/browser-automation-2026-05-31/rebrowser-patches`
- `/Users/jasonkuhrt/repo-references/browser-automation-2026-05-31/patchright`
- `/Users/jasonkuhrt/repo-references/browser-automation-2026-05-31/camoufox`
- `/Users/jasonkuhrt/repo-references/browser-automation-2026-05-31/browser-use`
- `/Users/jasonkuhrt/repo-references/browser-automation-2026-05-31/stagehand`
- `/Users/jasonkuhrt/repo-references/browser-automation-2026-05-31/skyvern`
- `/Users/jasonkuhrt/repo-references/browser-automation-2026-05-31/steel-browser`
- `/Users/jasonkuhrt/repo-references/browser-automation-2026-05-31/browserless`
- `/Users/jasonkuhrt/repo-references/browser-automation-2026-05-31/browser`
- `/Users/jasonkuhrt/repo-references/browser-automation-2026-05-31/webdriver-bidi`

Primary web sources:

- [Chrome remote debugging hardening](https://developer.chrome.com/blog/remote-debugging-port)
- [Chrome DevTools for agents](https://developer.chrome.com/docs/devtools/agents/get-started?hl=en)
- [Chrome remote debugging enterprise policy](https://chromeenterprise.google/policies/remote-debugging-allowed/)
- [Chrome extension debugger API](https://developer.chrome.com/docs/extensions/reference/api/debugger)
- [Playwright BrowserType API](https://playwright.dev/docs/api/class-browsertype)
- [Puppeteer WebDriver BiDi support](https://pptr.dev/webdriver-bidi)
- [W3C WebDriver BiDi](https://www.w3.org/TR/webdriver-bidi/)
- [Selenium BiDi docs](https://www.selenium.dev/documentation/webdriver/bidi/)
- [Firefox Remote Protocols](https://firefox-source-docs.mozilla.org/remote/index.html)
- [Apple Testing with WebDriver in Safari](https://developer.apple.com/documentation/webkit/testing-with-webdriver-in-safari?changes=_7_8)
- [Apple About WebDriver for Safari](https://developer.apple.com/documentation/webkit/about-webdriver-for-safari?changes=_5)
- [WebKit Safari WebDriver support](https://webkit.org/blog/6900/webdriver-support-in-safari-10/)
