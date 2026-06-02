# Browser Automation Unblock Plan

Date: 2026-05-31

Companion to:

- `2026-05-31-browser-automation-next-gen-v2-ceiling.md`
- `2026-05-31-browser-automation-next-gen.md`

## Goal

Unblock the CLIs now without building the whole future system.

The best browser primitive, if Chrome continuity is not fixed, is an agent-native browser: Tandem/Vessel/BrowserOS-style. In that model the browser is built for shared user/agent sessions instead of adding an agent control layer after the fact.

After checking the actual CLI source, the best primitive to implement for today's current-profile unblock is native browser/app control, with an extension/native-host layer used for page snapshots and extraction. The extension lane alone is not enough for the actual scripts that currently matter.

The sweet spot is:

1. Prototype current-profile native browser/app control.
2. Add the durable routing seam that the ideal architecture needs anyway.
3. Keep existing browser scripts mostly intact.
4. Stop every CLI from making its own browser transport decision.
5. Keep the authoring model Playwright-like and type-safe.

The practical move is not to rewrite TD/Rippling/RQ/CRA/Parks/ACC/Classifieds into a full new browser kernel this week.

The practical move is to prove a native current-profile driver, keep the extension/native-host prototype as an extraction helper, then introduce `browserctl` as the first slice of the future kernel and route existing CLIs through it.

## Current Failure Pattern

The apparent common failure is the browser transport, not the domain logic.

Today the CLIs mix these concerns:

- Which browser/profile to use.
- Whether to use real Chrome or managed Chromium.
- Whether to attach through CDP.
- Whether to bootstrap `chrome-debug`.
- How to pass data into `dev-browser`.
- How to handle credentials and 2FA.
- How to recover when Chrome 148 remote debugging behaves differently.

That makes every CLI fail independently when the browser layer shifts.

The first durable fix is to centralize the decision.

## No Breakthrough Yet

`browserctl` does not create a new browser primitive.

It is not a solution to bot detection, default-profile CDP prompts, or profile freshness. It is a control-plane seam that stops every CLI from hard-coding its own browser connection path.

The primitives available today are still basically:

1. Attach to the current signed-in browser.
2. Start an owned persistent browser profile.
3. Drive the visible browser through extension/native-host or OS input.
4. Use a different agent-browser runtime.

The first two are the primitives already in use. If an empty or owned profile is blocked by a site, `browserctl` does not magically fix that. If attaching to the current browser depends on permissioned CDP, `browserctl` does not magically fix that either.

So the practical plan has two separate pieces:

1. A durable control seam: `browserctl`.
2. A primitive-changing experiment: prove one current-profile lane that is not default-profile CDP.

The seam is useful because it avoids repeating the same migration across every CLI. The primitive experiment is what can actually change connectivity.

## Best Option

Best ceiling option:

```text
agent-native browser -> shared user/agent session -> typed local API
```

Why:

- It makes agent control part of the browser model.
- It avoids bolting automation onto a browser through CDP.
- It avoids relying on an empty automation profile.
- It can provide stable page snapshots, element refs, recovery, and human handoff as native browser features.
- It scales better over months and years than a pile of per-site browser scripts.

Concrete tradeoffs:

- You have to move the relevant session into that browser.
- Browser maturity matters more than API elegance.
- The local typed API must actually exist and stay stable.
- Target flows still need empirical validation.

Best immediate primitive to implement:

```text
current signed-in profile -> native browser/app control -> typed local CLI
```

Why this one:

- It uses the current signed-in browser profile.
- It avoids default-profile CDP as the control channel.
- It can produce real user input where the source already requires trusted clicks.
- It can handle browser UI, downloads, file pickers, and passkey/password flows that extensions cannot fully own.
- It is closer to the actual current CLI needs than more `chrome-debug` work.

Extension/native-host remains useful, but as a helper:

```text
current signed-in profile -> extension/native-host extraction -> typed local CLI
```

Use it for URL/title/text snapshots, structured DOM extraction, PDF.js extraction, and page-local fetches. Do not make it the primary click/input primitive for the current CLIs.

The smoke test is the actual unblock question:

1. Can a local CLI read the active tab URL/title/text from the current signed-in profile?
2. Can it compute a target element rectangle from the current page?
3. Can native input click/type/select the element and survive navigation?
4. Can it run repeatedly without per-connection prompts?
5. Can it expose a typed TypeScript interface or a stable command schema?
6. Does it work on one CLI path whose source already requires current-profile behavior?

If yes, that is the new current-profile primitive to route through `browserctl`.

If neither current-profile primitive works quickly, then the honest near-term state is:

```text
owned persistent profiles + Dev Browser
```

That can unblock only the flows that work in owned profiles. It will not solve sites that reject the owned-profile/browser-automation shape.

## Source-Filtered Fit

This table filters the primitives against the actual CLI source instead of guessing.

| CLI | Source requirement | Extension/native-host fit | Native browser/app fit | Recommendation |
|---|---|---|---|---|
| `td` | `td` says real Chrome is required because final submit gates on CDP-attached-tab signals: `/Users/jasonkuhrt/projects/jasonkuhrt/td/td:7`. The bill-pay notes say a non-CDP tab is the known working submit path: `/Users/jasonkuhrt/projects/jasonkuhrt/td/docs/bill-pay-flow-notes.md:78`. Transfer scripts use Angular Material overlays and Playwright clicks: `/Users/jasonkuhrt/projects/jasonkuhrt/td/browser-scripts/transfer-internal.js:27`. Statement downloads use CDP download behavior and Playwright download events: `/Users/jasonkuhrt/projects/jasonkuhrt/td/browser-scripts/statements-download.js:24`. | Not enough as the primary primitive. DOM snapshots/fill helpers are useful, but extension-mediated action does not match the known working non-CDP human/native submit path or the current download path. | Best current-profile primitive. Needs typed DOM snapshot to rect plus native click/type, and a download broker. | Lead with native current-profile driver. |
| `rippling` | Source says managed Chromium is blocked by Cloudflare Turnstile: `/Users/jasonkuhrt/projects/jasonkuhrt/rippling/rippling:4`. Login waits for Turnstile and uses real Chrome assumptions: `/Users/jasonkuhrt/projects/jasonkuhrt/rippling/browser-scripts/open.js:64`. Downloads use CDP download behavior and Playwright request/download APIs: `/Users/jasonkuhrt/projects/jasonkuhrt/rippling/browser-scripts/documents-download.js:18`. | Plausible for snapshots and some login steps. Not enough for the current download implementation without a download/data broker. | Better fit for login. Downloads need a dedicated broker or extension extraction path. | Native current-profile for auth, extension extraction for document metadata, separate download broker. |
| `parks` | Source explicitly says `--connect` is used because Material `mat-select` panels need trusted pointer events: `/Users/jasonkuhrt/projects/jasonkuhrt/parks/src/dev-browser.ts:7`. Scripts repeat the trusted event requirement: `/Users/jasonkuhrt/projects/jasonkuhrt/parks/browser-scripts/pc-bky-backcountry-capture.js:2`. | Poor primary fit. Extension DOM events are the wrong shape for the cited trusted-event problem. | Strong fit if native clicks can target computed rects. | Native current-profile driver for the mat-select flows; keep owned profile only where already proven. |
| `classifieds` | Kijiji posting uses file upload through `setInputFiles`: `/Users/jasonkuhrt/projects/jasonkuhrt/classifieds/browser-scripts/kijiji-post-draft.js:84`. | Not enough for image posting because an extension content script cannot set local file paths into file inputs. | Fits via file chooser/native input; CDP still fits owned-profile posting if the site accepts it. | Native current-profile or agent-native browser for posting with files; Dev Browser remains fine for search/open flows that work. |
| `acc` | Scripts are mostly in-page evaluation and Mews fetch capture: `/Users/jasonkuhrt/projects/jasonkuhrt/acc/browser-scripts/acc-mews-availability.js:9`. | Could work, but not needed first. | Could work, but overkill. | Keep Dev Browser/owned profile. This is not the blocker class. |
| `rq/gov` | CLI defaults to managed browser and only connects on request: `/Users/jasonkuhrt/projects/jasonkuhrt/rq/gov:18`. RQ document download extracts PDF data through page JS/PDF.js and writes base64 out: `/Users/jasonkuhrt/projects/jasonkuhrt/rq/browser-scripts/documents-download.js:119`. | Good fit for post-login extraction/download because it can run page-local JS. Auth still may need native/user-visible browser control. | Good fit for auth and provider selection. | Hybrid: native current-profile for auth/navigation, extension extraction for document/PDF data. |
| `cra` | Standalone CRA browser-backed commands are mostly stubs; implemented value is mail notification detection: `/Users/jasonkuhrt/projects/jasonkuhrt/cra/cra:11`. | No urgent browser primitive to migrate yet. | No urgent browser primitive to migrate yet. | Do not spend primitive work here first. |

## The Durable Minimal Slice

Create a small CLI named `browserctl`.

It is not the whole future browser runtime. It is the first permanent seam.

Interface:

```text
browserctl run <site> <script> [--json]
browserctl open <site> [--json]
browserctl status [--json]
browserctl policy [--json]
```

Responsibilities:

- Read one policy map.
- Choose a transport for the site/action.
- Ensure the selected channel is healthy before running a workflow.
- Own or reuse persistent browser sessions instead of reconnecting ad hoc from every CLI.
- Invoke the existing runner.
- Normalize JSON status.
- Keep credentials/2FA references out of logs.
- Become the only browser entrypoint used by personal CLIs.

Initial transports:

```text
dedicated-cdp
live-profile-extension
live-profile-native
diagnostic-cdp
```

Only `dedicated-cdp` needs to work on day one for owned-profile flows. `live-profile-extension` and `live-profile-native` can start as narrow TD/Rippling vertical slices.

This is on the ideal path because it becomes the `TransportRouter` from the ceiling document.

## Policy Map

Start with a plain typed config file, even if the first implementation is a Bun script.

Example:

```ts
export const browserPolicy = {
  td: {
    mode: "current-profile-auth",
    defaultChannel: "live-profile-native",
    profile: "personal-finance",
    secondFactor: { kind: "sms", sender: "83687" },
  },
  rippling: {
    mode: "current-profile-auth",
    defaultChannel: "live-profile-native",
    profile: "work",
    secondFactor: { kind: "totp", source: "keychain" },
  },
  rq: {
    mode: "current-profile-auth",
    defaultChannel: "live-profile-extension",
    profile: "personal-services",
  },
  cra: {
    mode: "current-profile-auth",
    defaultChannel: "live-profile-extension",
    profile: "personal-services",
  },
  parks: {
    mode: "authenticated",
    defaultChannel: "dedicated-cdp",
    profile: "parks",
    escalateTo: "live-profile-native",
  },
  acc: {
    mode: "authenticated",
    defaultChannel: "dedicated-cdp",
    profile: "acc",
  },
  classifieds: {
    mode: "public-scrape",
    defaultChannel: "dedicated-cdp",
    profile: "classifieds",
  },
} as const;
```

The exact names can change. The important point is that site policy becomes data.

## What To Do Today

### Step 1: Add `browserctl`

Make it a Bun CLI.

It should live somewhere that all personal CLIs can call without repo coupling. A good first home is a dotfiles-managed user command:

```text
/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/.local/bin/browserctl
```

The first implementation can be small:

- Parse `browserctl run <site> <script>`.
- Load policy.
- For `dedicated-cdp`, ensure a persistent owned profile and call `dev-browser --browser <profile> <script>`.
- For `diagnostic-cdp`, call the existing `dev-browser --connect` path only when explicitly requested.
- For `live-profile-native`, initially call one narrow native script or return a typed "not implemented for this action" error.

This is not a hack because the command boundary is the future architecture boundary.

### Step 2: Move Direct `dev-browser` Calls Behind `browserctl`

Do not rewrite every script.

Patch the CLIs so their existing helper functions call:

```text
browserctl run <site> <script> --json
```

instead of:

```text
dev-browser --connect ...
dev-browser --browser ...
chrome-debug connect
```

Priority order:

1. `td`
2. `rippling`
3. `rq/gov`
4. `cra`
5. `parks`
6. `acc`
7. `classifieds`

This gives immediate value because future transport changes happen once.

### Step 3: Default Profile-Independent Flows To Dedicated Profiles

Use `dedicated-cdp` for flows that do not need the current signed-in browser profile:

- `acc`
- `classifieds`
- public scraping pieces of `parks`
- pages that do not need the current signed-in profile
- download/extraction flows after auth has been handled elsewhere

This avoids Chrome 148 default-profile remote debugging, avoids per-connection permission prompts, and keeps the Playwright-like Dev Browser authoring model.

This is the fastest unblock lane.

### Step 4: Add The Real-Profile Lane The Source Requires

The source-filtered best practical candidate is:

```text
native browser/app control + typed page snapshot helper
```

Why:

- `td` already documents CDP-attached-tab rejection at submit time.
- `parks` already documents Angular Material widgets requiring trusted pointer events.
- `classifieds` needs file upload, which extension content scripts cannot set directly.
- `rippling` needs the current signed-in browser profile and has download paths that need a broker.

The first primitive to implement is therefore not extension-mediated click/fill. It is native current-profile control:

```text
active browser tab -> typed snapshot -> element rectangle -> native click/type -> typed result
```

Use the extension/native-host prototype as a helper, not as the main action primitive:

```text
active browser tab -> extension snapshot/extraction -> typed result
```

Required native-current-profile smoke:

1. Read active tab URL/title/text from the current signed-in browser.
2. Compute an element rectangle from typed page snapshot data.
3. Focus the browser and click/type using native input.
4. Survive navigation and return a fresh snapshot.
5. Expose this as a typed TypeScript API or stable JSON command schema.
6. Prove it on one source-selected CLI path: TD login/status, Parks `mat-select`, or Rippling login/status.

Prototype slice now exists at:

```text
/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/research/browser-native-host-prototype
```

It provides:

```text
extension locate(selector) -> estimated desktop point
host native-click(selector) -> usecomputer click at that point
```

This is still small, but it is the actual current-profile primitive the source points toward: no CDP tab attachment and no owned empty browser shell for the action.

### Step 5: Unblock TD With A Narrow Vertical Slice

TD is the highest-value proof because it combines:

- real login,
- Keychain credential use,
- SMS 2FA from sender `83687`,
- known CDP friction.

Do not port every TD command first.

Port this slice:

```text
td open/status/read-account-summary
```

Minimum flow:

1. Open/focus TD in the real-profile lane.
2. Use existing Keychain credential references.
3. Submit login.
4. Detect 2FA.
5. Use existing `imsg` code retrieval.
6. Submit 2FA.
7. Read account summary or emit "logged-in".

This establishes the broker and real-profile lane on the source-selected TD path.

### Step 6: Keep Existing Scripts Playwright-Like

Do not throw away Dev Browser scripts.

For owned-profile flows, keep them.

For current-profile flows, keep the code shape but put it behind `browserctl`:

```ts
await page.getByLabel("Username").fill(Secret.ref("td.username"));
await page.getByRole("button", { name: "Log in" }).click();
```

Under the hood, `page` can be:

- Dev Browser / Playwright for `dedicated-cdp`.
- Extension/native-host facade for `live-profile-extension`.
- Native DOM snapshot plus native input facade for `live-profile-native`.

The agent-facing code should stay typed and familiar.

## What Not To Do Today

Do not rewrite all CLIs.

Do not build the full `browser-kernel`.

Do not try to choose the forever browser.

Do not patch `chrome-debug` in every workflow.

Do not make default-profile CDP the new foundation.

Do not migrate everything to Apple Events directly.

Do not evaluate every open-source browser project before unblocking.

Do not port every TD command before the login/account-status lane works.

## Why This Is Not A Hack

The permanent thing is the seam:

```text
CLI -> browserctl -> policy -> transport -> script/runtime
```

That seam is exactly what the ideal system needs.

Today it can delegate to Dev Browser.

Tomorrow it can delegate to:

- Open Browser Use,
- Vercel `agent-browser`,
- Tandem/Vessel/BrowserOS,
- Playwright MCP,
- native Chrome control,
- site WebMCP tools.

The CLIs should not care.

## Expected Effort

The least useful durable slice:

1. `browserctl` with policy map and `dedicated-cdp` delegation.
2. Patch one CLI helper to call it.
3. Patch the rest of the CLIs at their browser invocation helper.
4. Add one TD real-profile vertical slice.

Expected engineering shape:

- `browserctl` v0: small.
- Owned-profile CLI routing: mostly one helper change per CLI.
- TD real-profile vertical slice: the only meaningful new workflow work.

This is the point where effort starts compounding instead of being thrown away.

## Success Criteria

Immediate:

- `acc`, `classifieds`, and owned-profile flows run without default-profile Chrome remote-debugging.
- CLIs no longer call `chrome-debug` directly.
- All browser invocations go through `browserctl`.
- Failures name the selected channel and policy.

TD/Rippling:

- credentials still come from Keychain.
- TD SMS still comes from `imsg` sender `83687`.
- TOTP still comes from Keychain plus `oathtool`.
- raw secrets and raw codes are not printed.
- login/account status works in the real-profile lane.

Architecture:

- new work is behind the future routing seam.
- existing Playwright-like authoring is preserved.
- swapping a runtime does not require editing each CLI again.

## Recommended Order

1. Try one agent-native browser candidate as the architecture candidate, separate from today's unblock.
2. Implement the native current-profile smoke: snapshot, element rect, native click/type, fresh result.
3. Keep the extension/native-host prototype as the extraction helper: active tab snapshot, structured DOM extraction, PDF.js extraction, page-local fetches.
4. Add `browserctl` v0 with `live-profile-native`, `live-profile-extension`, and `dedicated-cdp` as typed channels.
5. Route `td open/status/read-account-summary` through `live-profile-native`.
6. Route the Parks `mat-select` path through `live-profile-native`.
7. Route `rippling open/status` through `live-profile-native`, with extension extraction for document metadata.
8. Route `rq/gov` document extraction through `live-profile-extension` after auth.
9. Route `acc` through `browserctl` using `dedicated-cdp`.
10. Route `classifieds` through `browserctl`, using native current-profile or agent-native browser for file-upload posting.

This order is source-driven: it starts where the current code already proves owned-profile or extension-only control is not enough.

## Direct Recommendation

Lead with the agent-native browser path as the architecture direction.

Do the smallest current-machine experiment in parallel:

```text
native current-profile driver + extension extraction helper + browserctl + policy map
```

That unblocks current CLIs while preserving the ideal path:

- type-safe authoring,
- Playwright-like workflow code,
- transport policy outside individual CLIs,
- durable profiles,
- real-profile lane for current-profile auth,
- future compatibility with agent-native browsers and site capabilities.
