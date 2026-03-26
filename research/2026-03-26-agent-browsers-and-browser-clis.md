# Agent browsers and browser-vendor CLIs — 60-day snapshot

**Date:** 2026-03-26  
**Research window used in the original pass:** 2026-01-25 to 2026-03-25  
**Purpose:** Capture the current crop of agent browsers and official browser-vendor/browser-adjacent CLIs, then judge how well each one serves practical web chores — especially whether any are suitable for **paying rent by Interac e-Transfer**.

## Bottom line

The market moved fast in the last ~60 days, but the practical answer for money movement is still the same:

- **Best mainstream chores browser:** **Perplexity Comet**
- **Best Mac-only guarded browser:** **OpenAI Atlas**
- **Best technical terminal/browser control:** **Playwright CLI**
- **Most experimental:** **Opera Neon**, **Strawberry**, **Brave Nightly AI browsing**
- **Best answer for rent payment:** **none of these should autonomously send the payment**

For your use case, the right split is:

1. Let the tool research, navigate, compare, summarize, fill low-risk forms, or prep notes.
2. Keep the **bank login, recipient verification, Interac e-Transfer confirmation, and final send** manual.

Canadian banking, anti-fraud checks, and the risk of sending funds to the wrong recipient make autonomous rent payment a bad fit for today’s agent browsers.

## Short ranking for real-life usefulness

| Rank | Tool | Best use | My take |
|---|---|---|---|
| 1 | **Perplexity Comet** | Cross-platform consumer chores | Best overall if you want one browser agent that is broadly useful day to day |
| 2 | **OpenAI Atlas** | Guardrailed Mac workflows | Best if you are on Mac and want the most conservative safety posture |
| 3 | **Playwright CLI** | Supervised technical automation | Best if you are comfortable in the terminal and want deterministic control |
| 4 | **Dia** | Research, writing, context-aware browsing | Great assistant, weaker operator |
| 5 | **Microsoft Edge (Copilot / Agent features)** | Microsoft-centric browsing and enterprise workflows | Useful, but less compelling for personal chores than Comet |
| 6 | **Opera Neon** | Frontier consumer experimentation | Impressive, but too experimental for sensitive workflows |
| 7 | **Strawberry** | Workflow-centric browsing | Promising for repetitive browser/SaaS tasks; less clear safety story for finance |
| 8 | **Brave Nightly AI browsing** | Security-minded testing | Interesting if you like isolated profiles and explicit invocation, not a polished chores tool |
| 9 | **Chrome DevTools CLI / MCP** | Live Chrome inspection/control | Better as an agent substrate than as a consumer chores tool |
| 10 | **Chrome WebMCP / Brave Search MCP** | Infrastructure for agent ecosystems | Important strategically, but not what you reach for to pay rent |

## Detailed notes

### 1) Perplexity Comet

**Why it matters:** strongest all-around consumer option in this set.

**What changed in the 60-day window:**
- Upgraded **Voice Mode** on **2026-02-27** with the ability to talk about what is on screen and interact with sites.
- **Comet Enterprise** announced on **2026-03-17** with autonomous multi-step tasks and admin controls.
- **iOS availability** announced on **2026-03-18**.

**Platforms / availability:** Mac, Windows, iOS, Android.

**Strengths:**
- Broadest platform coverage among the mainstream agent browsers in this snapshot.
- Strong fit for inbox work, research, comparisons, tab wrangling, shopping, and general navigation.
- Good consumer ergonomics; less “developer tool” feel than Playwright or DevTools MCP.

**Weaknesses / limits:**
- Still not something to trust with unattended financial actions.
- Sensitive actions are precisely where autonomy is least trustworthy.

**How well it serves you:**
- **High** for general web chores.
- **Medium-high** for form filling and prep.
- **Low** for autonomous banking or transfers.

**Rent / Interac e-Transfer verdict:**
- Good for looking up the right page, drafting the rent memo, checking the amount, or confirming landlord details.
- **Not recommended** for the actual send step.

### 2) OpenAI Atlas

**Why it matters:** best “guardrailed” Mac-only browser agent in the set.

**What changed in the 60-day window:**
- **Multiple ChatGPT logins/profiles** added on **2026-03-10**.
- Agent mode improved on tedious tasks on **2026-02-24**.

**Platforms / availability:** macOS only, Apple silicon Macs.

**Strengths:**
- Clear safety posture.
- Explicitly pausing on sensitive sites and avoiding access to saved passwords/autofill is the right design choice.
- Very strong for prep work: research, page setup, comparison, drafting, summarizing, and routine navigation.

**Weaknesses / limits:**
- Mac-only.
- The very guardrails that make it trustworthy also make it less suitable for true end-to-end automation.

**How well it serves you:**
- **High** if you are on a Mac and value safety over maximum autonomy.
- **Low** for anything that requires directly moving money.

**Rent / Interac e-Transfer verdict:**
- Excellent for prep and orchestration.
- **Not a tool I would delegate the actual payment to**.

### 3) Microsoft Edge (Copilot Mode + Agent features)

**Why it matters:** Microsoft is steadily turning Edge into an AI browser, especially for enterprise use.

**What changed in the 60-day window:**
- **Copilot Mode** remains the consumer-facing live experiment for search/chat/navigation.
- On **2026-03-23**, Edge for Business highlighted more agentic behavior, including multi-tab reasoning and enterprise-controlled agent mode.

**Platforms / availability:** broad Edge support across desktop; enterprise features depend on admin controls.

**Strengths:**
- Good if you already live in the Microsoft ecosystem.
- Voice, history/tab summarization, and multi-tab reasoning are useful for research-heavy chores.
- Enterprise controls are a genuine advantage for work environments.

**Weaknesses / limits:**
- Personal-use story is not as compelling as Comet’s.
- Enterprise guardrails mean it is not really aimed at consumer financial automation.

**How well it serves you:**
- **Medium-high** if you are already an Edge/Copilot user.
- **Medium** for general chores.
- **Low** for autonomous banking.

**Rent / Interac e-Transfer verdict:**
- Fine as an assistant.
- **Not appropriate** as the thing that actually sends money.

### 4) Opera Neon

**Why it matters:** probably the boldest experimental consumer “AI browser” in this snapshot.

**What changed in the 60-day window:**
- Added **new model choices** on **2026-01-29**.
- Added **automatic agent suggestion** on **2026-02-02**.

**Platforms / availability:** Windows 11 and macOS 14+.

**Strengths:**
- Feels closest to the “browser that just does stuff” vision.
- Claims to handle forms, orders, emails, research, and price-finding.
- Attractive if you like frontier products and don’t mind early-access rough edges.

**Weaknesses / limits:**
- Experimental product risk.
- Higher chance of brittle behavior, weird edge cases, or misfires around high-stakes actions.

**How well it serves you:**
- **Medium-high** for low-stakes chores and experimentation.
- **Low** for high-stakes transactions.

**Rent / Interac e-Transfer verdict:**
- **No** for unattended money movement.
- Maybe useful for everything *around* the payment, not the payment itself.

### 5) Dia

**Why it matters:** strong context-rich assistant, less of an autonomous click-bot.

**What changed in the 60-day window:**
- Continued steady weekly releases in March 2026.

**Platforms / availability:** macOS 14+, M1 or later.

**Strengths:**
- Great for summarizing tabs, writing, planning, research, and context-aware browsing.
- Explicitly avoids storing/processing data from sensitive sites like banking by default.

**Weaknesses / limits:**
- Less of a full autonomous operator than Comet or Neon.
- Limited platform availability.

**How well it serves you:**
- **High** if your chores are mostly research, comparison, writing, or tab synthesis.
- **Low** if your goal is end-to-end action on sensitive sites.

**Rent / Interac e-Transfer verdict:**
- Strong prep assistant.
- **Weak choice** for the actual transfer flow.

### 6) Strawberry

**Why it matters:** workflow-oriented browser with plain-language tasking and approval checkpoints.

**What changed in the 60-day window:**
- Public materials emphasize browser-native workflow execution with approvals before important actions.

**Platforms / availability:** macOS and Windows.

**Strengths:**
- Promising fit for repetitive SaaS/browser workflows.
- Approval-before-important-actions is the right UX direction.

**Weaknesses / limits:**
- Public safety specifics around financial sites are less explicit than Atlas, Dia, Edge for Business, or Brave Nightly.
- Feels promising, but not yet like the safest pick for sensitive consumer finance.

**How well it serves you:**
- **Medium-high** for repetitive workflow chores.
- **Low** for autonomous money movement.

**Rent / Interac e-Transfer verdict:**
- I would keep it out of the actual payment step.

### 7) Brave Nightly AI browsing

**Why it matters:** security-first experimental agentic browsing, but intentionally cautious.

**What changed in the 60-day window:**
- Brave’s launch framing stresses isolated profiles, opt-in enablement, and explicit manual invocation.

**Platforms / availability:** Nightly / experimental channel.

**Strengths:**
- Serious treatment of prompt-injection and browsing risk.
- Isolated profiles are a smart containment mechanism.

**Weaknesses / limits:**
- Nightly-only and experimental.
- Not a polished consumer chores browser.
- Even Brave says the risk is not eliminated.

**How well it serves you:**
- **Medium** if you are security-minded and willing to tinker.
- **Low** for polished daily chores.
- **Very low** for bank-linked tasks.

**Rent / Interac e-Transfer verdict:**
- **Definitely not** a rent-payment robot.

## Official browser / browser-adjacent CLIs

### 8) Chrome DevTools MCP / experimental `chrome-devtools` CLI

**Why it matters:** gives agents a live Chrome control and inspection surface.

**What changed in the 60-day window:**
- Experimental **`chrome-devtools` CLI** added in **v0.20.0 on 2026-03-11**.
- Support for connecting to a running Chrome instance and `autoConnect` behavior in newer Chrome builds.

**Strengths:**
- Excellent for debugging, page inspection, DOM/state understanding, and building agent workflows around a real browser.
- Good substrate for custom agent systems.

**Weaknesses / limits:**
- More “agent plumbing” than end-user product.
- Explicit warnings that connected clients can expose browser content and sensitive data.

**How well it serves you:**
- **High** if you are technical and want to build or supervise browser automation.
- **Low** if you want a polished consumer chores browser.

**Rent / Interac e-Transfer verdict:**
- Only under tight personal supervision, and even then not a wise target.
- This is tooling for control/inspection, not a safe payments assistant.

### 9) Microsoft Playwright CLI

**Why it matters:** best deterministic terminal-first browser control in the set.

**What changed in the 60-day window:**
- Playwright added an official skill-focused **CLI mode** in late January 2026 and continued building out CLI infrastructure.

**Strengths:**
- Deterministic and scriptable.
- Good command surface for `open`, `click`, `fill`, `upload`, `check`, `reload`, `screenshot`, `pdf`, and tab operations.
- Best choice if you want supervised automation from the terminal instead of an “AI browser” UX.

**Weaknesses / limits:**
- You still own the logic, supervision, and risk boundaries.
- Not a consumer-autonomous product.

**How well it serves you:**
- **Very high** if you are technical.
- **Low** if you want point-and-click magic without setup.

**Rent / Interac e-Transfer verdict:**
- Best of the bunch for **supervised** browser automation.
- Still **not** something I would aim at a live bank transfer flow unless every step is personally watched and approved.

## Adjacent interfaces worth knowing about

### 10) Chrome WebMCP

**Why it matters:** browser-side standardization for agent-friendly site capabilities.

**Usefulness:**
- Strategically important.
- Not, by itself, a consumer tool for chores.

**Rent / Interac e-Transfer verdict:**
- Not relevant directly unless banks someday expose safe agent hooks — which is not where the market is today.

### 11) Brave Search MCP / skills

**Why it matters:** gives agent stacks grounded search and summarization capabilities.

**Usefulness:**
- Helpful as infrastructure for research-heavy agents.
- Not a browser operator for sensitive site actions.

**Rent / Interac e-Transfer verdict:**
- Not directly applicable.

## What I would actually choose by scenario

### If I want one agent browser for normal chores
Choose **Perplexity Comet**.

### If I am on a Mac and care most about guardrails
Choose **OpenAI Atlas**.

### If I am technical and want the strongest terminal/browser control
Choose **Playwright CLI**.

### If I mostly want writing, summarization, and tab context
Choose **Dia**.

### If I enjoy frontier tools and do not mind rough edges
Try **Opera Neon** or **Strawberry**.

## Specific answer to “can any of these pay my rent by Interac e-Transfer?”

**My answer is still no.**

The current generation of agent browsers is good enough to:
- locate the right page,
- open tabs,
- gather landlord/payment details,
- draft the memo or note,
- check the amount,
- fill low-risk fields,
- and remind you of the final steps.

They are **not** a good fit for:
- logging into your bank unattended,
- selecting the recipient autonomously,
- handling fraud checks or 2FA edge cases,
- or pressing the final send button for a real Interac e-Transfer.

For rent, the right model today is still **human-in-the-loop on the banking step**.

## Source links captured from the original research pass

- Perplexity changelog (2026-02-27): https://www.perplexity.ai/changelog/what-we-shipped---february-27-2026
- Perplexity Comet overview: https://www.perplexity.ai/comet/
- OpenAI Atlas help: https://help.openai.com/en/articles/12628555-getting-started-with-atlas
- Microsoft Edge Copilot Mode: https://www.microsoft.com/en-us/edge/copilot-mode
- Opera Neon update: https://blogs.opera.com/news/2026/02/opera-neon-ai-browser-intelligent-mode/
- Dia homepage / docs entry point: https://www.diabrowser.com/
- Strawberry getting started / use-cases: https://strawberrybrowser.com/use-cases/getting-started?utm_source=chatgpt.com
- Brave AI browsing post: https://brave.com/blog/ai-browsing/
- Chrome DevTools MCP releases: https://github.com/ChromeDevTools/chrome-devtools-mcp/releases
- Chrome WebMCP usage post: https://developer.chrome.com/blog/webmcp-mcp-usage

## Note

This file is a structured write-up of the research already captured in chat. It mixes **true new launches** with **existing products that gained meaningful capabilities in the last 60 days**, because that is the more useful way to understand the market right now.
