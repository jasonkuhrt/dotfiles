# Browser Automation Next-Gen V2: Ceiling First

Date: 2026-05-31

Status: Replaces `2026-05-31-browser-automation-next-gen.md`.

## What Changed

The first document overfit to the current local Chrome setup. That made useful audit points, but it was not a first-principles ceiling analysis.

This version starts from the ideal outcome:

- Agents can operate authenticated web surfaces for years, not just today's local browser.
- The authoring interface is fully type-safe.
- The runtime hides transport details behind a stable capability model.
- The system can use browser UI, browser internals, site-provided tools, and native OS input.
- Security posture is configurable policy, not the thing that determines the core architecture.
- Chrome is one substrate option, not the center of the design.

## Ceiling Decision

The ceiling is **not** "automate Chrome better."

The ceiling is a **typed agent browser runtime**:

1. A browser or browser-side runtime that agents can control as a first-class surface.
2. A type-safe TypeScript SDK that agents author against.
3. A policy router that chooses the best execution channel per action.
4. Built-in durable identity: profiles, accounts, cookies, passkeys, downloads, files, and session lanes.
5. Built-in agent support: page snapshots, stable element refs, semantic locators, evidence, replay, recovery, and human handoff.
6. Native brokers for credentials, TOTP, SMS, passkeys, file downloads, and OS dialogs.
7. A semantic web capability layer for sites that expose tools directly.

The best near-term ceiling candidate is an **agent-native Chromium-family browser with a Playwright-like typed SDK**.

Extension/native-host control is still important, but the source-filtered role is narrower: use it for current-profile snapshots, extraction, and page-local capabilities, not as the whole interaction substrate.

The best long-term shape is a **daily-driver agent browser** with a stable local capability API, plus web standards that let sites expose typed capabilities directly so UI automation becomes a fallback instead of the main path.

## The First-Principles Stack

### Layer 1: Site Capability

Highest reliability comes from typed site capabilities, not screen scraping.

Ideal order:

1. Site exposes a typed tool/API for the task.
2. Site exposes WebMCP/NLWeb/MCP-compatible capabilities.
3. Browser extension/runtime extracts structured app state.
4. DOM/accessibility automation.
5. Native OS input.
6. Pixel-only automation.

Primary sources:

- Chrome WebMCP explains web pages exposing MCP servers and tools discoverable by AI agents: [Chrome WebMCP](https://developer.chrome.com/docs/ai/webmcp?hl=en)
- The Model Context Protocol defines tools/resources/prompts as a model-facing capability layer: [MCP specification](https://modelcontextprotocol.io/specification/2025-06-18)
- Microsoft NLWeb is an open project for natural language interfaces over websites: [NLWeb](https://github.com/microsoft/NLWeb)

Ceiling implication:

Browser automation should not be designed as "clicking forever." It should be designed as a capability router where UI automation is the universal fallback.

### Layer 2: Browser Runtime

The ideal runtime is an agent-aware browser, not a test browser.

Required properties:

- Durable profiles and login state.
- Real extensions and passkeys.
- Auth flows that survive browser updates.
- First-class snapshots for agents.
- Stable element references.
- Native download/file handling.
- Human takeover and handback.
- Multi-session isolation.
- Local-first execution.
- Optional cloud execution for scale.
- No dependency on fragile debugging endpoints as the only control path.

Chromium-family runtimes have the highest practical ceiling today because:

- The modern web is most tested against Chromium.
- Extension APIs are mature.
- CDP, BiDi, and browser-internal tooling are strongest there.
- Most agent-browser projects target Chromium first.

That does **not** mean "Chrome installed on this machine" should drive the design.

### Layer 3: Authoring Interface

The ideal agent authoring interface is typed TypeScript with a familiar Playwright-like action model.

Dev Browser is directionally right here: a Playwright-compatible syntax is valuable because agents already know it, TypeScript can type it, and the mental model is established.

The ceiling is stricter than Playwright:

- Credentials are not strings; they are `SecretRef`.
- 2FA codes are not strings in logs; they are `SecondFactorRef`.
- A click target is not just a selector; it is a fresh element reference tied to a snapshot.
- A download is not a filepath guess; it is a typed `DownloadArtifact`.
- A workflow is not loose script text; it is an effectful, recoverable state machine.
- Browser transport is not chosen by the script author; it is selected by policy.

Ideal code shape:

```ts
const session = await browser.agentSession({
  site: "td",
  profile: Profile.ref("personal-finance"),
  mode: "current-profile-auth",
});

await session.page.getByLabel("Username").fill(Secret.ref("td.username"));
await session.page.getByLabel("Password").fill(Secret.ref("td.password"));
await session.page.getByRole("button", { name: "Log in" }).click();

const code = await SecondFactor.sms({
  sender: "83687",
  purpose: "td-login",
});

await session.page.getByLabel("Security code").fill(code);
await session.page.getByRole("button", { name: "Continue" }).click();
```

The code an agent writes should be boring, typed, and familiar. The runtime underneath can be sophisticated.

### Layer 4: Execution Channels

The runtime should support several channels behind one typed interface:

1. Site-provided typed capabilities.
2. Browser-native/agent-browser API.
3. Extension/native-host control.
4. CDP/BiDi automation.
5. Native OS input.
6. Pixel/vision fallback.

The ceiling is not choosing one forever. The ceiling is a policy router that can select the best channel per site and per action.

## Browser Market: Ceiling View

### Agent-Native Browsers

These are the most important category.

They are not just automation tools. They try to make the browser itself an agent runtime.

#### Tandem Browser

Source: [Tandem Browser](https://tandembrowser.org/)

Ceiling:

- Local-first.
- Open source.
- Browser designed around same tabs, cookies, DOM, accessibility tree, and logged-in sessions for user and agent.
- MCP/HTTP model-agnostic control.
- Strong conceptual fit for multi-month and multi-year agent workflows.

Limits:

- Developer preview.
- Requires using a separate browser as an important part of the workflow.
- Needs empirical testing against the specific authenticated sites this system must operate.

Ceiling verdict:

High. This is closer to the ideal product direction than "Chrome plus scripts."

#### Vessel Browser

Source: [Vessel Browser](https://github.com/unmodeled-tyler/vessel-browser)

Ceiling:

- Open-source Chromium/Electron browser for persistent web agents.
- MCP control.
- Named sessions, checkpoints, supervision UI, persistent state, page schema inference.
- Designed for long-running agents, not test automation.

Limits:

- Less mature on macOS than Linux.
- Project maturity and operating model need verification before relying on it.
- Needs empirical testing for the specific authenticated sites this system must operate.

Ceiling verdict:

High as a product/runtime model. Especially relevant when the priority is usability and autonomy.

#### BrowserOS

Source: [BrowserOS](https://browseros.com/)

Ceiling:

- Open-source AI browser direction.
- Explicitly positions itself as a browser for agents and user-controlled data.
- Browser-level product, not merely a test framework.

Limits:

- Needs source-level and runtime evaluation before relying on it.
- Must be tested for typed automation APIs, extension support, passkeys, downloads, and target-site behavior.

Ceiling verdict:

Worth tracking as an agent-browser ceiling candidate.

#### OpenAI Atlas, Perplexity Comet, Dia, Opera Neon

Sources:

- [OpenAI ChatGPT Atlas](https://openai.com/blog/introducing-chatgpt-atlas/)
- [Perplexity Comet](https://www.perplexity.ai/comet)
- [Dia](https://www.diabrowser.com/)
- [Opera Neon](https://www.opera.com/neon)

Ceiling:

- These show where commercial browser UX is going: browser-native AI, page context, memory, agent modes, task execution, and user-facing autonomy.
- They matter because they set the product ceiling users will expect.

Limits:

- Not ideal as the core for repo-authored, inspectable, local CLI workflows unless they expose stable local typed APIs.
- Often closed-source or cloud-account mediated.

Ceiling verdict:

Important product references, not the ideal engineering substrate unless a stable local automation API emerges.

### Agent Browser Runtimes and CLIs

These are the strongest near-term implementation references for code-authored workflows.

#### Vercel `agent-browser`

Source: [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser)

Ceiling:

- Rust CLI and daemon for AI-agent browser control.
- Snapshots with stable element refs.
- Semantic locators and selector actions.
- Session persistence.
- CDP attach.
- Cloud providers.
- Can copy existing Chrome profile state into a temp profile.

Authoring-interface value:

- Very high for agents because stable refs and CLI commands reduce ambiguity.
- Stronger than plain Playwright in some agent contexts because it exposes an agent-optimized command grammar.

Limits:

- CDP-based runtime.
- Profile copying is useful, but it is not the same as a durable daily-driver agent browser.
- For durable repo workflows, a typed TypeScript SDK would still be better than command strings alone.

Ceiling verdict:

One of the best near-term references. It should be studied as an agent ergonomics model.

#### Dev Browser

Source: [dev-browser](https://github.com/steel-dev/dev-browser)

Ceiling:

- Playwright-compatible scripting.
- Persistent named browser contexts.
- CLI-first.
- Good fit for agents that can write familiar TypeScript/JavaScript-style browser actions.
- Strong DX because it preserves a known API shape.

Authoring-interface value:

- High. The Playwright-like surface is a real advantage, not an incidental implementation detail.
- Agents can generate Playwright-style code better than bespoke browser DSLs.

Limits:

- Current core is Playwright/CDP.
- It is not itself the full ceiling for credentials, 2FA, passkeys, native OS dialogs, multi-year profile strategy, or site capability routing.

Ceiling verdict:

Excellent authoring reference. Not enough as the whole runtime ceiling.

#### Open Browser Use

Source: [Open Browser Use](https://github.com/iFurySt/open-browser-use)

Ceiling:

- Chrome extension plus native host.
- JavaScript/TypeScript, Python, Go SDKs.
- MCP support.
- Targets real Chrome profile operation.

Authoring-interface value:

- Very high if the SDK is typed and stable.
- This class may be closer than CDP-first tools to the ideal "real browser profile plus agent SDK."

Limits:

- Extension/content-script detectability and capability limits need empirical testing.
- Native-host install and browser permission model become part of product maintenance.

Ceiling verdict:

One of the most important candidates to test. This is a plausible route to a higher ceiling than CDP-only automation.

#### Playwright MCP

Source: [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp)

Ceiling:

- Gives agents structured browser tools through MCP.
- Good bridge between LLM agents and Playwright's mature browser model.

Authoring-interface value:

- Useful for tool-calling agents.
- Less ideal for durable repo-authored workflows than typed TypeScript SDKs.

Limits:

- Still Playwright under the hood.
- MCP tool schemas can be token-heavy and less expressive than typed workflow code.

Ceiling verdict:

Good tool surface. Not the final ceiling.

### Browser Automation Frameworks

These are essential infrastructure, but not sufficient as the whole ideal.

#### Playwright

Source: [Playwright BrowserType API](https://playwright.dev/docs/api/class-browsertype)

Ceiling:

- Best-known modern browser automation API.
- Excellent TypeScript DX.
- Strong locator model.
- Mature cross-browser support.
- Familiar to agents.

Limits:

- Test automation heritage.
- Default model is controlled browser sessions, not agent-owned daily-driver browser life.
- CDP attach is Chromium-only and lower-fidelity than Playwright protocol.
- Current-profile authenticated workflows need more than Playwright's abstractions.

Ceiling verdict:

Best authoring reference. Not enough runtime by itself.

#### Puppeteer

Source: [Puppeteer WebDriver BiDi](https://pptr.dev/webdriver-bidi)

Ceiling:

- Strong CDP-native Chrome control.
- Mature ecosystem.
- BiDi support emerging.

Limits:

- Lower-level than Playwright for authoring.
- Chrome/CDP-centric.

Ceiling verdict:

Important infrastructure, not ideal authoring ceiling.

#### WebDriver BiDi / Selenium

Sources:

- [W3C WebDriver BiDi](https://www.w3.org/TR/webdriver-bidi/)
- [Selenium BiDi docs](https://www.selenium.dev/documentation/webdriver/bidi/)

Ceiling:

- Standards-based bidirectional automation.
- Long-term cross-browser relevance.

Limits:

- Still automation-session oriented.
- Not an agent-native browser runtime.
- Authoring ergonomics are weaker than Playwright for agents.

Ceiling verdict:

Important standard. Not enough as the primary experience.

### Stealth and Anti-Bot Automation

These are tactical tools, not the architecture ceiling.

Sources:

- [Nodriver](https://github.com/ultrafunkamsterdam/nodriver)
- [Rebrowser patches](https://github.com/rebrowser/rebrowser-patches)
- [Patchright](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright)
- [Camoufox](https://github.com/daijro/camoufox)

Ceiling:

- Useful when the job is scraping adversarial public websites.
- They expose real weaknesses in Playwright/Puppeteer/CDP detectability.

Limits:

- Patch/retest cycle is inherently fragile.
- Not a clean type-safe authoring model.
- Not a durable identity/session/product model.

Ceiling verdict:

Useful backend options for a scraping pool. Not the ideal agent browser.

### Browser Infrastructure Clouds

Sources:

- [Browserless](https://github.com/browserless/browserless)
- [Steel Browser](https://github.com/steel-dev/steel-browser)
- [Browser Use](https://github.com/browser-use/browser-use)
- [Stagehand](https://github.com/browserbase/stagehand)
- [Skyvern](https://github.com/Skyvern-AI/skyvern)

Ceiling:

- Strong for scaling, proxies, hosted browsers, replay, and operational convenience.
- Useful above or beside a local runtime.

Limits:

- Cloud browsers do not automatically satisfy personal daily-driver identity.
- Authoring may be agent-friendly, but runtime ownership shifts to a service.

Ceiling verdict:

Great for scalable scraping and enterprise automation. Not the local personal browser ceiling unless local-first identity is solved.

## Browser Choice: Ideal View

The ideal answer is not "Chrome because it is installed."

The ideal near-term browser substrate is:

1. Chromium-family for web compatibility and extension/runtime ecosystem.
2. Agent-native or extension/native-host controlled.
3. Local-first.
4. Durable profile/session model.
5. Typed automation SDK.
6. OS-integrated brokers for credentials, passkeys, downloads, SMS, and TOTP.

That could be:

- Tandem Browser as a daily-driver-quality agent browser.
- Vessel Browser as a persistent supervised agent browser.
- BrowserOS with a stable typed local API.
- A local runtime that wraps Chrome/Chromium while exposing the ideal SDK.
- Open Browser Use style extension/native-host as the current-profile extraction sidecar.

Chrome itself is a good substrate, but it is not the ceiling. The ceiling is browser-agent co-design.

## Ignoring Security

Ignoring security changes the simplicity answer.

The simplest high-usability end state becomes:

1. Use an agent-native Chromium browser, or
2. Use extension/native-host control over a real browser profile, or
3. Use Dev Browser / Vercel `agent-browser` over a persistent automation profile.

This is much simpler than building a careful native-input kernel around today's Chrome.

Ignoring security does **not** make all options equally reliable.

Reliability dimensions that remain:

- Site bot detection.
- Browser fingerprint.
- Passkey and extension behavior.
- Download handling.
- Session expiry.
- Recovery after partial failure.
- Human handoff.
- Agent code generation quality.
- Browser update breakage.

For ordinary web automation and public scraping, ignoring security strongly favors Dev Browser, Vercel `agent-browser`, Open Browser Use, or an agent-native browser.

For current-profile authenticated workflows, ignoring security improves autonomy and removes some permission friction, but it does not remove site-side reliability problems. The most reliable ceiling is still an agent-native real browser with typed capabilities and native brokers.

## Type Safety Is Non-Negotiable

The interface used for writing browser interactions should be completely type-safe.

Best shape:

```ts
type SiteMode = "public-scrape" | "authenticated" | "current-profile-auth";

type BrowserPolicy = {
  site: SiteId;
  mode: SiteMode;
  profile: ProfileRef;
  allowedChannels: ReadonlyArray<ExecutionChannel>;
};

type ExecutionChannel =
  | "site-capability"
  | "agent-browser"
  | "extension-native-host"
  | "cdp-bidi"
  | "native-input"
  | "vision";
```

Workflow code should use typed locators and typed domain capabilities:

```ts
const page = await session.page();

await page.getByRole("link", { name: "Accounts" }).click();

const balance = await page
  .locator(AccountSummary.balance("chequing"))
  .read(MoneyCad);

await Downloads.expect({
  kind: "pdf",
  purpose: "statement",
  account: AccountRef.chequing(),
});
```

Agents should never write:

- Raw secrets.
- Unbranded string selectors for durable workflows.
- Unscoped shell commands.
- Pixel coordinates without a typed snapshot.
- Site-specific ad hoc browser setup.

## What Code Approach Matters

The particular approach matters a lot at the authoring boundary.

Agents are more effective when:

- The API looks like a known interface such as Playwright.
- The API is fully typed.
- The tool returns compact structured snapshots.
- Element references are stable.
- Errors are typed and recoverable.
- The runtime gives examples in the same shape agents need to produce.
- Secrets and 2FA have first-class types.
- Transport choice is policy, not workflow code.

The particular transport matters less when hidden behind the right typed interface.

That means the ideal could use:

- Playwright/CDP for cheap flows.
- Extension/native-host for real browser profile flows.
- Agent-browser native API when available.
- OS native input for trusted actions.
- Site MCP/WebMCP tools when sites expose them.

The code agents write can stay stable.

## Recommended Ideal Direction

Build or adopt a **type-safe agent browser SDK** with a Playwright-like surface and a policy-routed backend.

Near-term highest-potential adoption path:

1. Evaluate Tandem, Vessel, and BrowserOS as daily-driver agent-browser candidates.
2. Evaluate Open Browser Use, Vercel `agent-browser`, and Dev Browser as implementation references for the SDK, snapshots, routing, and profile handling.
3. Select the runtime strategy:
   - Agent-native browser as the ceiling substrate.
   - Native current-profile control plus extension/native-host extraction as the current-browser bridge.
4. Keep Dev Browser/Playwright compatibility as the authoring-model benchmark.
5. Define a strict TypeScript SDK above runtime details.
6. Add typed brokers for credentials, SMS, TOTP, passkeys, downloads, and evidence.
7. Make transport policy explicit and typed.

If no existing project meets the bar, the thing to build is not "another Playwright wrapper."

The thing to build is:

- A Playwright-like typed SDK.
- A real-browser agent runtime.
- A capability router.
- A broker layer for secrets/2FA/files.
- A recorder/replayer for reliable agent workflows.

## Ideal Ranking

For the next few months:

1. Agent-native Chromium-family browser candidate: Tandem, Vessel, or BrowserOS.
2. Native current-profile bridge for the existing CLIs that already require trusted input, current profile state, downloads, or file upload.
3. Extension/native-host extraction sidecar for active-tab snapshots, structured DOM extraction, PDF.js extraction, and page-local fetches.
4. Vercel `agent-browser` for agent CLI ergonomics and stable refs.
5. Dev Browser for Playwright-compatible type-safe authoring over owned profiles.
6. Playwright MCP for broad MCP compatibility.

For the next few years:

1. Agent-native daily-driver browser with typed local capability API.
2. WebMCP/NLWeb/site-provided tools for high-reliability semantic operations.
3. Type-safe Playwright-like SDK over multiple execution channels.
4. Local-first personal automation substrate with cloud execution optional.
5. Browser automation as fallback, not the main abstraction.

## Direct Answer

The ideal outcome is not Chrome-specific.

The ideal outcome is an agent browser platform where:

- the browser is agent-aware,
- the authoring interface is fully type-safe,
- Playwright compatibility is preserved where useful,
- site capabilities are preferred over UI automation,
- credentials and 2FA are typed brokered capabilities,
- runtime transport is hidden behind policy,
- the same workflow code can survive changes in browser substrate.

Dev Browser found an important part of the answer: agents benefit from a familiar typed Playwright-like interface.

The higher ceiling is to keep that authoring ergonomics while moving beyond "Playwright/CDP is the runtime" as the core assumption.
