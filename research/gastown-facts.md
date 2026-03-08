# Gastown Research

Last updated: 2026-03-05

## Sources

- [GitHub repo](https://github.com/steveyegge/gastown) — 11k stars, 893 forks, 5,718 commits
- [gastown.dev install docs](https://gastown.dev/docs/INSTALLING/)
- [Emergency User Manual (Medium)](https://steve-yegge.medium.com/gas-town-emergency-user-manual-cf0e4556d74b) — paywalled, could not fetch
- [User Manual (Xexr gist)](https://gist.github.com/Xexr/3a1439038e4ce34b5e9de020f6cbdc4b)
- [Maggie Appleton: Gas Town's Agent Patterns](https://maggieappleton.com/gastown)
- [Eric Koziol: Exploring Gas Town](https://embracingenigmas.substack.com/p/exploring-gas-town)
- [DoltHub: A Day in Gas Town](https://www.dolthub.com/blog/2026-01-15-a-day-in-gas-town/)
- [paddo.dev: Claude Code's Hidden Multi-Agent System](https://paddo.dev/blog/claude-code-hidden-swarm/)
- [paddo.dev: Two Kinds of Multi-Agent](https://paddo.dev/blog/gastown-two-kinds-of-multi-agent/)
- [v0.10.0 release notes](https://github.com/steveyegge/gastown/releases/tag/v0.10.0) (2026-03-03)
- [OpenCode startup prompt bug (#1619)](https://github.com/steveyegge/gastown/issues/1619)
- [Gastown-copilot fork](https://github.com/AmeliaRose802/gastown-copilot)
- [Worktree integrity (#2026)](https://github.com/steveyegge/gastown/issues/2026)
- [Branch contamination preflight (#2220)](https://github.com/steveyegge/gastown/issues/2220)
- [Dustin Smith: Hardening Gastown RBAC](https://dustinsmith.info/blog/gastown-configuration/)
- [AGENTS.md](https://github.com/steveyegge/gastown/blob/main/AGENTS.md)
- [DeepWiki: Quick Start Guide](https://deepwiki.com/steveyegge/gastown/1.2-quick-start-guide)
- [docs.gastownhall.ai: Quality Gates](https://docs.gastownhall.ai/other/why-these-features/#feature-validation-and-quality-gates)
- [Goosetown (Block/Goose port)](https://block.github.io/goose/blog/2026/02/19/gastown-explained-goosetown/)
- [Discord](https://discord.gg/yM4RX3Rv)
- [Glossary](https://github.com/steveyegge/gastown/blob/main/docs/glossary.md)
- [Polecat lifecycle](https://github.com/steveyegge/gastown/blob/main/docs/concepts/polecat-lifecycle.md)
- [Persistent polecat pool design](https://github.com/steveyegge/gastown/blob/main/docs/design/persistent-polecat-pool.md)
- [Formula resolution design](https://github.com/steveyegge/gastown/blob/main/docs/design/formula-resolution.md)
- [Integration branches concept](https://github.com/steveyegge/gastown/blob/main/docs/concepts/integration-branches.md)
- [Mayor work_dir issue (#1142)](https://github.com/steveyegge/gastown/issues/1142)
- [gastown-viewer (community React dashboard)](https://github.com/intent-solutions-io/gastown-viewer-intent)

## Project Vitals

- Current version: **v0.10.0** (released [2026-03-03](https://github.com/steveyegge/gastown/releases/tag/v0.10.0))
- 150 commits since v0.9.0 (2 weeks). 5 PRs merged on 2026-03-05 alone.
- Minimum beads version: **v0.57.0** (breaking change in v0.10.0)
- Dependencies: Go 1.24+, Git 2.25+, Dolt 1.82.4+, tmux 3.0+
- Discord exists: [invite link](https://discord.gg/yM4RX3Rv) (not indexed by search engines)
- Also: [GitHub Discussions](https://github.com/steveyegge/gastown/discussions)

## Entity Model

See `research/gastown-entities.d2` (and `.png`) for visual diagram.

- **Town** (1) contains **Rigs** (N) — a rig wraps a git repo
- **Rig** (1) contains **Crew** (N) + **Polecats** (N) + **Witness** (0-1) + **Refinery** (0-1)
- **Town** (1) has **Mayor** (1) + **Deacon** (0-1) + **Dogs** (N)
- **Mayor** (1) creates/manages **Convoys** (N)
- **Convoy** (1) bundles **Beads** (N) — a convoy is a batch of related work
- **Bead** (1) assigned to **Agent** (1) via "hook" (persistent pointer in git worktree)
- Agent = { Mayor | Crew | Polecat | Witness | Refinery | Deacon | Dog }
- Each Polecat/Crew gets its own **git worktree** (filesystem isolation)
- **Formulas** (TOML) define repeatable multi-step workflows (embedded in binary)

## Agent Roles

| Role     | Scope | Lifespan                      | Purpose                                               |
| -------- | ----- | ----------------------------- | ----------------------------------------------------- |
| Mayor    | Town  | Persistent                    | User-facing orchestrator, plans work, creates convoys |
| Crew     | Rig   | Persistent                    | Human-managed workers for design/judgment-heavy tasks |
| Polecat  | Rig   | Ephemeral (identity persists) | Grunt workers, one bead at a time                     |
| Witness  | Rig   | Persistent                    | Monitors polecats, unsticks blocked workers           |
| Refinery | Rig   | Persistent                    | Merge queue manager, conflict resolution              |
| Deacon   | Town  | Persistent (daemon)           | Background supervisor, patrol loops                   |
| Dogs     | Town  | Ephemeral                     | Deacon infrastructure helpers (not project workers)   |

## Graceful Degradation ([User Manual](https://gist.github.com/Xexr/3a1439038e4ce34b5e9de020f6cbdc4b))

Each layer optional, adopt incrementally:

1. Mayor-only (simplest — just an orchestrating CC session)
2. Mayor + Crew (add persistent workers)
3. Mayor + Crew + Polecats (add ephemeral workers)
4. \+ Witness (add monitoring)
5. \+ Refinery (add merge queue)
6. \+ Deacon (add background supervision)

## Cost Model ([Maggie Appleton](https://maggieappleton.com/gastown))

- Yegge estimates $2,000-5,000/month at full scale (20-30 agents)
- At 5-10 agents: proportionally less, but Mayor + Witness still burn tokens
- Multiple Claude accounts used to circumvent spending limits
- v0.10.0: Refinery spawn gated on pending events (avoids idle API burns)

## Known Issues (v0.10.0)

- Orphaned sling contexts can block convoy dispatch ([#2279](https://github.com/steveyegge/gastown/issues/2279))
- Cross-machine Dolt not fully supported ([#2276](https://github.com/steveyegge/gastown/issues/2276))
- Context-budget tap guard still in review ([#2008](https://github.com/steveyegge/gastown/issues/2008))

## Open Questions

- [x] How does gt interact with CLAUDE.md / project rules? **ANSWERED R1-Q2**: Per-agent `.claude/` directories. Mayor gets `~/gt/mayor/.claude/`, polecats get `~/gt/<rig>/polecats/.claude/`. ([Dustin Smith RBAC](https://dustinsmith.info/blog/gastown-configuration/))
- [x] What happens to Jason's CC hooks (PreToolUse, etc.) inside gt-managed sessions? **ANSWERED R1-Q2**: They fire — hooks are in per-agent `.claude/settings.json`. Guard scripts use PreToolUse events, exit code 2 to block. ([Dustin Smith RBAC](https://dustinsmith.info/blog/gastown-configuration/))
- [x] What about Jason's CC plugins/skills inside gt-managed polecat sessions? **ANSWERED R1-Q2**: Directory-scoped. Polecats only see skills in their `.claude/` hierarchy. You can strip polecats down to implementation-only skills.
- [x] How does `gt prime` interact with session context? **ANSWERED R1-Q2**: Injects full context at session start. For runtimes without hooks, gt sends startup fallback. ([AGENTS.md](https://github.com/steveyegge/gastown/blob/main/AGENTS.md))
- [ ] What does `gt remember/memories/forget` store and where? How does it differ from beads notes?
- [ ] How do you configure which quality signals the Refinery checks? (`lint_clean`, `tests_passed`, etc.) — data model documented, config mechanism is NOT. Ask on [Discord](https://discord.gg/yM4RX3Rv) or read Refinery formula source.
- [x] What's the .env / gitignored file provisioning story for new worktrees? **ANSWERED R3-Q35**: Persistent polecat pool means worktrees are REUSED, not recreated. node_modules persists. For initial setup, wire it yourself via formula step or CC hook.
- [x] Can formulas be customized/overridden? **ANSWERED R3-Q37**: Yes. 3-tier precedence: project → town → system. Place custom TOML in `.beads/formulas/`. ([formula-resolution.md](https://github.com/steveyegge/gastown/blob/main/docs/design/formula-resolution.md))
- [ ] How does gt handle user-level claude config (~/.claude/) bleeding into all roles? Per-agent overrides exist but user-level skills still load. Token budget concern for 90+ skills.
- [ ] What is the tmux abstraction surface? Could gt theoretically support alternative multiplexers? Or is tmux too deeply coupled?
- [ ] What does the Refinery formula actually look like? What verification commands does it run?

---

# Q&A Log

Chronological. Jason's questions verbatim, answers preserved in full.

## Round 1 (2026-03-05): Initial 8 Questions

### Q1: How do/can worktrees fit into this?

**Gastown manages worktrees automatically.** Each polecat and crew member gets its own git worktree within the rig — you never run `git worktree add` yourself. This is a direct replacement for your current "epic = worktree" model. ([GitHub README](https://github.com/steveyegge/gastown), [User Manual](https://gist.github.com/Xexr/3a1439038e4ce34b5e9de020f6cbdc4b))

Key difference: your model is **epic-level worktrees** (agents share a worktree per epic, hunk-based commits prevent conflicts). Gastown is **agent-level worktrees** (each agent has total filesystem isolation, merge queue resolves integration). Gastown's model is simpler per-agent but pushes complexity to the merge queue.

Your flo2 invariant "Epic = Worktree" would change to "Agent = Worktree, Epic = Convoy."

Worktree integrity checks exist ([#2026](https://github.com/steveyegge/gastown/issues/2026): fail closed on check failure). Branch contamination preflight before sling/merge flows ([#2220](https://github.com/steveyegge/gastown/issues/2220)).

### Q2: How does my convo with mayor look like? Does it refuse to ever make edits itself? Who decides when to fire off polecats?

**The Mayor does NOT edit code.** It's purely an orchestration layer. You describe intent in natural language, and it: ([DoltHub: A Day in Gas Town](https://www.dolthub.com/blog/2026-01-15-a-day-in-gas-town/), [User Manual](https://gist.github.com/Xexr/3a1439038e4ce34b5e9de020f6cbdc4b))

1. Decomposes into beads
2. Groups into convoys
3. Assigns to crew or polecats via `gt sling`

**Who decides when to fire polecats?** The Mayor does. You say "refactor fish config and fix starship SSH prompt" and the Mayor decides: that's 2 beads, both can be parallelized, sling to polecats. You can also override — tell the Mayor to assign something to crew if it needs judgment.

The [DoltHub article](https://www.dolthub.com/blog/2026-01-15-a-day-in-gas-town/) confirms: Mayor proposes parallelizable sub-tasks, user approves (or the Mayor just does it if you've given broad latitude). It's YOLO by default. The DoltHub author had to manually intervene when the Mayor misreported bug status, discovering agents had made commits that weren't yet pushed.

### Q3: How does/can CC native plan mode integrate into gt? Any repo discussions about this? Discord?

**No integration exists and none is discussed** in [issues](https://github.com/steveyegge/gastown/issues) or [discussions](https://github.com/steveyegge/gastown/discussions). Zero results for "plan mode" in issue search.

But here's the key insight: **the Mayor IS the planning layer.** Plan mode is Claude thinking before acting; the Mayor is Claude thinking before delegating. They're the same pattern at different scales.

That said, a polecat is just a `claude` session — so plan mode works _within_ any polecat naturally. There's nothing preventing a polecat from entering plan mode for its own sub-task. This isn't "integration" — it's just claude being claude inside a gt-managed session.

### Q4: How does/can checks (lint, types, tests) fit into gt?

**Gastown's quality gate is the merge queue + test suite.** Here's the flow: ([User Manual](https://gist.github.com/Xexr/3a1439038e4ce34b5e9de020f6cbdc4b), [v0.10.0 release](https://github.com/steveyegge/gastown/releases/tag/v0.10.0))

1. Polecat finishes work -> pushes branch -> `gt done`
2. Refinery pulls branch, runs the project's test suite
3. Tests fail -> merge rejected, bead goes back to backlog for another polecat
4. Tests pass + merge conflicts -> Refinery resolves conflicts, re-runs tests
5. Tests pass + clean merge -> merged to main

**Lint and type checking are NOT built-in.** If you want them gated, they need to be part of your test suite (e.g., `npm test` runs `tsgo --noEmit && eslint . && vitest`). The Refinery just runs whatever your project's verification command is — it's project-defined, not gt-defined.

v0.10.0 added `gt done --pre-verified` for a fast-path when the polecat already ran checks before submitting.

### Q5: TLDR on what other agents would buy me?

| Agent        | What it buys you                                                                                 | Worth it at 5-10 scale?                       |
| ------------ | ------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| **Witness**  | Detects stalled polecats, nudges them, helps unstick blocked workers. You currently fly blind.   | Yes — this is the #1 gap in your stack        |
| **Refinery** | Automated merge queue with conflict resolution + test gating. Replaces your manual hunk staging. | Yes — reduces merge cognitive load            |
| **Deacon**   | Background daemon running patrol loops, spawning Witness/Refinery, health checks                 | Maybe — overhead vs value at your scale       |
| **Dogs**     | Infrastructure maintenance (cleanup, health checks)                                              | No — Deacon helpers, not needed at your scale |

Source: role descriptions from [User Manual](https://gist.github.com/Xexr/3a1439038e4ce34b5e9de020f6cbdc4b), value assessment from [Koziol](https://embracingenigmas.substack.com/p/exploring-gas-town) and [Appleton](https://maggieappleton.com/gastown) analyses.

### Q6: Is the community that uses claude using native CC agent teams at all or strictly unhelpful to combine with gt?

**They're architecturally nearly identical** — the [paddo.dev analysis](https://paddo.dev/blog/claude-code-hidden-swarm/) of CC's TeammateTool (13 operations with schemas, env vars like `CLAUDE_CODE_TEAM_NAME`) calls them "striking architectural parallels" to Gastown's Mayor/Polecat/Witness.

**Combining them likely conflicts at the orchestration layer** — both want to be the coordinator. However, a plausible composition exists: **gt orchestrates at the town level, CC agent teams run inside a single polecat for sub-task parallelism.** A polecat gets a bead like "implement feature X" and internally spawns CC subagents for the components. Nobody seems to be doing this yet — it's theoretically sound but unexplored.

Community consensus: most people pick one or the other. Gastown users use gt's orchestration; CC-native users use agent teams. No hybrid patterns documented. The [paddo.dev article](https://paddo.dev/blog/claude-code-hidden-swarm/) notes genuine disagreement — critics say it's "manual implementation of prompt routing", supporters say task isolation genuinely improves output quality.

### Q7: Can you show me an entity diagram?

See `research/gastown-entities.d2` and rendered `research/gastown-entities.png`. Key relationships:

- **You -> Mayor** (1:1, your only interaction point)
- **Mayor -> Convoys** (1:N, Mayor creates batches of work)
- **Convoy -> Beads** (1:N, convoy bundles beads)
- **Mayor -> Polecats/Crew** (1:N, assigns via `gt sling`)
- **Polecat/Crew -> Worktree** (1:1, each gets isolation)
- **Polecat -> Merge Queue -> Refinery -> Main** (the completion pipeline)
- **Witness -> Polecats** (monitors + nudges)
- **Deacon -> Witness/Refinery/Dogs** (spawns + supervises)
- **All agents -> Agent Runtimes** (gt launches claude/codex/opencode/etc.)

### Q8: Does gt CLI represent its own agent harness or literally launches `$ claude`?

**gt is purely an orchestration harness.** It literally launches `$ claude` (or any other CLI agent). ([GitHub README](https://github.com/steveyegge/gastown), [Install docs](https://gastown.dev/docs/INSTALLING/))

Built-in presets:

```
claude, gemini, codex, cursor, auggie, amp
```

Custom agents:

```bash
gt config agent set codex-low "codex --thinking low"
gt config default-agent codex-low
```

So yes — it could launch codex, opencode, or anything with a CLI. Known caveat: OpenCode ignores startup prompts (`PromptMode: "none"`), which breaks autonomous roles like Refinery that rely on initial instructions ([#1619](https://github.com/steveyegge/gastown/issues/1619)). A [fork exists](https://github.com/AmeliaRose802/gastown-copilot) for GitHub Copilot CLI support.

Because gt is runtime-agnostic, your investment in gt knowledge/config isn't locked to Claude. You could run Mayor on claude while polecats use codex for cheaper grunt work. Model A/B testing is a built-in capability.

## Round 2 (2026-03-05): Follow-up Qs from Round 1

### Q9: Is polecat always 1:1 with a bead? If not, how is its scope defined?

**Yes, polecat is 1:1 with a bead.** Each polecat gets one bead, works it to completion, then either self-destructs or goes idle (`gt done`). The branch naming confirms this: `polecat/<name>/<bead-id-prefix>`. The v0.10.0 release added a per-bead respawn circuit breaker specifically to prevent spawn storms when one bead keeps failing — which only makes sense in a 1:1 model. ([v0.10.0 release](https://github.com/steveyegge/gastown/releases/tag/v0.10.0), [Kilo-Org multi-polecat PR](https://github.com/Kilo-Org/cloud/issues/216))

### Q10: Ditto crew members — are they 1:1 with beads?

**Crew members are NOT 1:1 with beads.** Crew are persistent, long-lived sessions — more like "your personal CC session within the rig." A crew member can work on multiple beads sequentially, do exploratory work, have design conversations, etc. [Koziol](https://embracingenigmas.substack.com/p/exploring-gas-town) reports working with 7-8 crew members per project for iterative design discussions. Crew = human-steered, open-ended. Polecat = machine-driven, single-task.

### Q11: With worktree automation, how do .env and other gitignored files get copied over?

**This is a real gap — gt doesn't handle it natively.** Git worktrees by design don't copy gitignored files. The broader community uses post-creation hooks or symlinks to solve this (e.g., [git-worktree-runner](https://github.com/coderabbitai/git-worktree-runner) automates copying .env + running npm install). Within Gastown, the likely approach is a formula or hook that provisions each new worktree — but I found no built-in mechanism for this. You'd need to wire it up yourself, possibly via a CC hook that fires on session start, or a gt formula step.

### Q12: So this approach will incur the cost of initial monorepo setup (npm install)... motivation to get off npm?

**Yes, each worktree needs its own `node_modules`.** This is the real cost of agent-level worktree isolation. With npm this is painful (slow installs, disk bloat). pnpm's content-addressable store helps a lot — all worktrees share the same cached packages via hardlinks, so `pnpm install` in a new worktree is near-instant. bun is similarly fast. This is genuinely a forcing function toward better tooling. Some people symlink `node_modules` across worktrees but that's fragile with different branch dependencies.

### Q13: Does a mayor always launch convoys? Are convoys equiv to CC task list graphs? Are they just a set of beads? Beads are already graphs so why does convoy duplicate that?

**Convoys are NOT dependency graphs — they're tracking groups.** A convoy is just a named bundle of beads for progress tracking and notification: `gt convoy create "Auth Feature" gt-abc gt-def gt-ghi --notify`. When all beads in the convoy close, you get notified. Convoys don't define ordering or dependencies — beads still handle that via `bd dep add`. Think of a convoy as a "project milestone" label, not a DAG. CC's task list graphs are closer to beads' dependency system than to convoys. The Mayor doesn't always use convoys — for a single bead it can just `gt sling` directly. Convoys are for batching. ([DeepWiki Quick Start](https://deepwiki.com/steveyegge/gastown/1.2-quick-start-guide), [User Manual](https://gist.github.com/Xexr/3a1439038e4ce34b5e9de020f6cbdc4b))

### Q14: What is 'sling'?

**`gt sling <bead-id> <rig>` = dispatch work to an agent.** It spawns a fresh polecat (with its own worktree + branch), hooks the bead to it, and the polecat starts working immediately (GUPP: "if there's work on your hook, you run it"). It's the verb for "assign this bead to a worker." The Mayor uses it under the hood when delegating. You can also sling manually. ([DeepWiki Quick Start](https://deepwiki.com/steveyegge/gastown/1.2-quick-start-guide))

### Q15: Would I continue to use brainstorm skills with mayor for design doc building / Q&A?

**The Mayor is the wrong place for brainstorming.** It's optimized for orchestration — its system prompt constrains it to planning/delegation, not open-ended design exploration. For brainstorming, you'd use a **crew member** (persistent, judgment-heavy, interactive). Or honestly, a plain `claude` session outside gt entirely. The Mayor's value is when you already know what you want built and need it decomposed + dispatched. If you're still figuring out _what_ to build, you're in design mode, not orchestration mode.

### Q16: Could I write a rule-like md file to target just the mayor? Other roles? Injected at every session start?

**Yes — and this is well-documented.** Each agent role gets its own `.claude/` directory with role-specific settings. From [Dustin Smith's RBAC guide](https://dustinsmith.info/blog/gastown-configuration/): settings must be **per-agent, not town-wide** — placing `settings.json` at `~/gt/.claude/` would pollute all child workspaces. Instead:

- `~/gt/mayor/.claude/settings.json` — Mayor-specific
- `~/gt/<rig>/polecats/.claude/settings.json` — all polecats in that rig
- `~/gt/<rig>/crew/<name>/.claude/settings.json` — specific crew member

Role instructions go in `CLAUDE.md` at the corresponding path. `gt prime` injects full context at session start (confirmed in [AGENTS.md](https://github.com/steveyegge/gastown/blob/main/AGENTS.md)). For runtimes without hooks (e.g., Codex), gt sends a startup fallback: `gt prime` + `gt mail check --inject` + `gt nudge deacon session-started`.

### Q17: I have 90+ skills — what control is there for which roles see which skills?

**Per-agent `.claude/` directories give you this control.** Skills are loaded from the `.claude/` hierarchy — if a polecat's worktree only has a lean `CLAUDE.md` with no skill symlinks, it won't see your 90+ skills. The Mayor can have the full skill set (since it benefits from brainstorming/planning skills), while polecats get a stripped-down set focused on implementation. This is directory-based scoping, not a gt feature per se — it's just how CC resolves skills from the filesystem. The [RBAC guide](https://dustinsmith.info/blog/gastown-configuration/) confirms MCP tools are unrestricted across roles, but code modification tools pass through guard scripts.

### Q18: When mayor launches other agents, does that appear as CC subagents or a fully custom gt sub agent system?

**Fully separate processes — NOT CC subagents.** When the Mayor runs `gt sling`, the gt binary spawns a new tmux pane with a fresh `claude` (or codex, etc.) process. These are independent OS processes with their own context windows. They communicate via the beads ledger (Dolt DB) and gt's mail system — not CC's internal subagent/task mechanism. This is fundamentally different from CC agent teams where teammates are managed within CC's process model. The Mayor literally cannot "see" what a polecat is doing in real-time — it relies on the Witness for monitoring and beads status updates for progress.

### Q19: Discord exists — https://discord.gg/yM4RX3Rv

Noted — updated Sources and Project Vitals sections. Not indexed by search engines, which is why it didn't surface.

### Q20: 50 test failures = 50 worktree/polecat spawn iterations? Please verify.

**Your concern is valid and v0.10.0 specifically addressed this.** The flow is NOT "fail → new worktree → new polecat" every time. Here's what actually happens:

1. Polecat finishes work → pushes branch → `gt done`
2. Refinery pulls branch, runs the project's test suite
3. Tests fail → **bead goes back to backlog** (this part is correct)
4. BUT: v0.10.0 added **per-bead respawn circuit breaker** — if the same bead keeps failing, it stops re-dispatching after N attempts to prevent spawn storms. ([v0.10.0: "clown show #22 resolved"](https://github.com/steveyegge/gastown/releases/tag/v0.10.0))
5. Also: `gt done --pre-verified` lets the **polecat itself run checks before submitting**, so the Refinery gets pre-verified work. If the polecat catches failures, it fixes them in its own worktree — no respawn needed.
6. Tests pass + merge conflicts → Refinery resolves conflicts, re-runs tests
7. Tests pass + clean merge → merged to main

So the practical loop is: polecat runs checks locally (pre-verify) → fixes issues → only submits when passing → Refinery confirms. The "back to backlog" path is the failure mode, not the happy path, and it's circuit-broken.

### Q21: Quality gates DO exist — https://docs.gastownhall.ai/other/why-these-features/#feature-validation-and-quality-gates has `lint_clean: true`

**Good catch — I was wrong.** The [quality gates docs](https://docs.gastownhall.ai/other/why-these-features/#feature-validation-and-quality-gates) show structured validation metadata:

```json
{
  "validated_by": "gastown/refinery",
  "validation_type": "merge",
  "quality_signals": {
    "tests_passed": true,
    "review_approved": true,
    "lint_clean": true
  }
}
```

So lint cleanliness IS tracked as a quality signal. The docs describe this as "quality gates are data, not just policy" — the Refinery records what passed/failed as structured metadata on the bead. However, the docs don't detail how you configure which signals are checked or what commands run for `lint_clean`. This needs more investigation — possibly via the [Discord](https://discord.gg/yM4RX3Rv) or by reading the Refinery formula source.

### Q22: When would polecat pre-verify vs not? Who decides?

**The formula decides.** The `mol-polecat-work` formula (v8 as of v0.10.0) defines the polecat's workflow steps. The pre-verify step is part of that formula — it's not the polecat "choosing" to run checks, it's the formula instructing it to. If your formula includes pre-verification, every polecat does it. If not, they don't. Formulas are TOML-defined and embedded in the gt binary, but you can presumably override them.

### Q23: So refinery is also an agent session? The D2 diagram didn't make that clear.

**Yes, the Refinery IS an agent session** — it's a Claude Code (or other runtime) instance, just like the Mayor or a polecat. It has its own `.claude/` directory, its own system prompt, its own worktree. It's not a simple script — it's an LLM that can reason about merge conflicts, re-run tests, and even "creatively reimagine implementations when merge conflicts become too tangled" ([Appleton](https://maggieappleton.com/gastown)). D2 diagram needs updating to show this — all roles with a person/hexagon shape are agent sessions.

### Q24: How is deacon optional if it's critical to system health?

**Without Deacon, YOU are the Deacon.** The Deacon automates patrol loops (checking agent health, spawning Witness/Refinery, cleaning up). Without it, you manually check `gt agents`, manually nudge stalled workers, manually spawn the Refinery. At 5-10 agents this is manageable — you can eyeball tmux panes. At 20-30 it's not. The Deacon is "optional" in the same way CI is optional — you can do it by hand, it just doesn't scale. At your current scale, starting without Deacon and adding it when manual monitoring gets painful is the right call.

### Q25: When is a deacon helper (dog) helpful?

**Dogs do infrastructure maintenance** — things like cleaning stale beads, clearing orphaned processes, checking Dolt health, running `gt doctor` periodically. At your scale, you'd run these manually or not at all. Dogs become useful when the system is large enough that maintenance tasks accumulate faster than you notice them. Think of Dogs as cron jobs that happen to be LLM-powered.

### Q26: CC agent teams vs Gastown — I find them quite different frankly. Merge queue, quality gates, there's way more on offer.

**You're right — the "architecturally similar" framing undersells the gap.** CC agent teams give you: task decomposition, parallel execution, context isolation. Gastown gives you all of that PLUS: persistent state across sessions (beads), automated merge queue (Refinery), agent monitoring (Witness), quality gates with structured validation, worktree-per-agent isolation, agent identity persistence, formula-driven workflows, and multi-runtime support. CC agent teams are the orchestration primitive; Gastown is the full operational system built around it. You could theoretically build Gastown's features on top of CC agent teams, but that's months of engineering — it's what Yegge spent 5,700 commits doing. The honest comparison is: CC agent teams are to Gastown as `git` is to GitHub.

## Round 3 (2026-03-05): Deep follow-ups

### Q27: Define 'session' in gt context. Compaction leads to multiple transcripts — how does gt handle 1:1 session<>crew member?

**In gt, "session" = one ephemeral Claude runtime instance.** From the [glossary](https://github.com/steveyegge/gastown/blob/main/docs/glossary.md): "Sessions and sandboxes are ephemeral — spawned for specific tasks, cleaned up on completion." A crew member's **identity** persists (name, worktree, hook), but the Claude session underneath is ephemeral. When context fills or you run `gt handoff`, the session ends and a new one starts — the new session runs `gt prime` to reload context from beads and the hook.

So it's NOT 1:1 session<>crew member. It's **1:N** — one crew identity, many sessions over time. Same as how you use Claude Code today: "Jason's dotfiles session" might compact 3 times, creating 3+ transcripts, but it's still "you working on dotfiles." The crew member identity is the continuity layer; sessions are disposable underneath.

`gt seance` lets a new session query its predecessors for context and decisions. `gt handoff` is the voluntary version — "I'm done with this context window, start fresh."

### Q28: Do crew members have identities like polecats? Special session start/end stuff?

**Yes, crew members have persistent named identities.** From the [glossary](https://github.com/steveyegge/gastown/blob/main/docs/glossary.md): "Long-lived, named agents for persistent collaboration. Unlike ephemeral Polecats, Crew members maintain context across sessions." They get themed names (e.g., Jane Austen characters — [User Manual](https://gist.github.com/Xexr/3a1439038e4ce34b5e9de020f6cbdc4b)).

On session start, `gt prime` fires to inject full context. On session end or handoff, work state persists via the hook/bead system. They're not "raw claude sessions" — they have the same gt lifecycle hooks as other roles, just without the automatic task dispatch that polecats get.

### Q29: Does gt give special UI for looking at history of all these sessions?

**`gt feed` is a 3-panel TUI dashboard** (Agent Tree, Convoy Panel, Event Stream) for real-time monitoring. `gt agents` lists all active agents. `gt seance` queries previous session context. The v0.10.0 release added OTel telemetry instrumentation (agent sessions, mail, token usage) which would feed into standard observability tools. There's also a community [gastown-viewer](https://github.com/intent-solutions-io/gastown-viewer-intent) project providing a React web dashboard with D3.js dependency visualization. But there's no built-in "session history browser" like CC's `claude --resume` list — history is in beads and git, not a dedicated UI.

### Q30: Does gt CLI cwd scope to a project? Where are worktrees stored? Do I have to work within gt's dir structure?

**Yes, you work within gt's prescribed directory structure.** Your town lives at e.g. `~/gt/`. The Mayor runs from `~/gt/mayor/`. Each rig is a cloned repo under the town: `~/gt/<rig-name>/`. Polecats get worktrees at `~/gt/<rig-name>/polecats/<polecat-name>/`. Crew at `~/gt/<rig-name>/crew/<crew-name>/`.

The gt CLI is context-aware from cwd — running from `~/gt/` sees town-level beads, running from `~/gt/<rig>/` sees rig-level beads. ([Issue #1142](https://github.com/steveyegge/gastown/issues/1142) documents a bug where Mayor couldn't find rig beads due to work_dir mismatch.)

This means your project's git repo gets cloned INTO the gt structure. You don't run gt from your existing `~/projects/jasonkuhrt/dotfiles/` — you'd `gt rig add dotfiles <url>` and it clones into `~/gt/dotfiles/`. Your existing repo stays untouched; the rig is a managed clone.

### Q31: Would there ever be multiple rigs? Is rig = project?

**Rig ≈ project, and yes, multiple rigs is the norm at scale.** From the [glossary](https://github.com/steveyegge/gastown/blob/main/docs/glossary.md): "A project-specific Git repository under Gas Town management. Each Rig has its own Polecats, Refinery, Witness, and Crew members."

You'd have multiple rigs if you work on multiple repos (e.g., `dotfiles`, `heartbeat`, `kitz`). The Mayor coordinates across all rigs — convoys can span rigs. This is the "cross-rig tracking" feature that's unique to Gastown. At your current scale (mostly dotfiles + heartbeat), 2 rigs is realistic.

### Q32: Is there community insight on using gt for design work, not just implementation? E.g. crews emit specs, mayor plans against specs?

**Design is explicitly acknowledged as the bottleneck, but gt doesn't solve it.** [Appleton](https://maggieappleton.com/gastown) and [Koziol](https://embracingenigmas.substack.com/p/exploring-gas-town) both identify that "the limiting factor is how fast you can think, give direction, and validate" — not implementation speed. Koziol's workflow: 30-60 min deep thinking (no screens) → specification batching → then feed gt.

The [Appleton analysis](https://maggieappleton.com/gastown) lists design decisions that cannot be made by agents: "architectural decisions, product strategy, visual design, interface design, incremental milestone sequencing." These require human context, taste, and vision.

**No evidence of a structured crew-for-design → mayor-for-implementation pipeline in the community.** The practical pattern seems to be: you do design work in a plain session (or crew member), produce a spec, then hand the spec to the Mayor for decomposition. The Mayor's input is a well-formed description of what to build — it's on you to produce that.

### Q33: Surely real claude CLI sessions would still use my user-level claude config (~/.claude/)?

**Yes — and this is a real tension.** User-level config (`~/.claude/CLAUDE.md`, `~/.claude/settings.json`) applies to ALL claude sessions, including gt-managed ones. The per-agent `.claude/` directories add project-level overrides on top of your user config. CC resolves config hierarchically: user → project → local.

So your 90+ skills in `~/.claude/` WOULD load into every polecat unless you do something about it. Options:

1. Strip skills from user-level, only place them in agent-specific dirs
2. Use `allowedTools` in per-agent settings to restrict what's available
3. Accept that polecats see all skills (they'll just ignore irrelevant ones, but the token cost of trigger descriptions hits every session)

This is a real operational concern at your scale. The [RBAC guide](https://dustinsmith.info/blog/gastown-configuration/) focuses on guarding code modification tools, not skill token budgets.

### Q34: Can I make gt use cmux+zmx instead of tmux?

**tmux is deeply embedded in gt's architecture.** It uses tmux for spawning panes, managing agent sessions, and isolating processes. v0.10.0 added `GT_TMUX_SOCKET=auto` for per-town tmux isolation (so multiple towns don't collide). The [design docs](https://github.com/steveyegge/gastown/blob/main/docs/design/tmux-keybindings.md) have a dedicated tmux keybindings doc.

**No abstraction layer exists for swapping tmux out.** cmux and zmx aren't recognized by gt. You'd need to either: (a) run gt's tmux sessions alongside your cmux workflow (they're separate tmux servers if you use `GT_TMUX_SOCKET`), or (b) fork gt and replace the tmux integration, which touches core spawning logic. This is a significant friction point for your workflow.

However: you don't have to use tmux as YOUR terminal multiplexer to use gt. gt manages its own tmux sessions for agent lifecycle — you could continue using cmux/zmx for your daily work and let gt's tmux run in the background. They'd be separate process trees.

### Q35: WHEN does polecat pre-verify? Default path? Worktree cost concern.

**Critical finding: polecats reuse worktrees, they don't create new ones each time.** The [persistent polecat pool design](https://github.com/steveyegge/gastown/blob/main/docs/design/persistent-polecat-pool.md) separates three concepts:

- **Identity**: persistent polecat name (survives across assignments)
- **Sandbox/worktree**: persistent per-polecat (reused across assignments!)
- **Session**: ephemeral (Claude context, disposable)

Between tasks, the worktree does `git checkout main && git pull`, then `git checkout -b polecat/<name>/<new-bead>`. **No `git worktree add/remove`.** Just branch operations on an existing worktree. This eliminates the ~5s worktree creation overhead AND the `npm install` problem — the `node_modules` from the previous assignment is still there.

**On pre-verify specifically:** The `mol-polecat-work` formula (v8) defines when pre-verify runs. Formulas follow a [3-tier precedence](https://github.com/steveyegge/gastown/blob/main/docs/design/formula-resolution.md):

1. Project level: `<project>/.beads/formulas/`
2. Town level: `~/gt/.beads/formulas/`
3. System level: embedded in gt binary (factory defaults)

**You CAN override the default formula** by placing a custom `mol-polecat-work.formula.toml` in your town or project formulas dir. So if the default doesn't include pre-verify, you add it. If you want polecats to ALWAYS run `npm run check:types && npm test` before `gt done`, you define that in your formula.

So your nightmare scenario (obsolete vitest snapshot → new worktree → 2 min npm install → fans) **does not happen** with persistent polecat pool. The worktree persists, node_modules persists, and you can formula-enforce pre-verification.

### Q36: HOW are quality gates configured and used by polecats?

**I dug into the docs and the answer is: the configuration mechanism is not well-documented yet.** The [quality gates page](https://docs.gastownhall.ai/other/why-these-features/#feature-validation-and-quality-gates) shows the data model (what gets recorded), not the configuration model (how you set it up). The [work management docs](https://docs.gastownhall.ai/usage/work-management/) mention gate types abstractly ("timer, gh:run, human, mail") but don't explain how to configure `lint_clean` or `tests_passed` gates.

The quality signals JSON is **output** from the Refinery — it records what happened. The actual checks are defined in formulas and/or the project's verification commands. So the answer is likely: you configure your formula's verification step to run lint + types + tests, and the Refinery records the results as quality signals. But the specific TOML syntax for this isn't documented in public docs yet. This is a [Discord](https://discord.gg/yM4RX3Rv) question or source code reading task.

### Q37: Formula override — turn 'presumably' into real explanation.

**Confirmed: formulas ARE overridable.** The [formula resolution design doc](https://github.com/steveyegge/gastown/blob/main/docs/design/formula-resolution.md) details a 3-tier precedence system:

1. **Tier 1 (Project)**: `<project>/.beads/formulas/` — committed to repo
2. **Tier 2 (Town)**: `~/gt/.beads/formulas/` — user-level customizations
3. **Tier 3 (System)**: Embedded in gt binary — factory defaults

Resolution walks up from cwd. You can force a tier: `bd cook mol-polecat-work --tier=system` bypasses custom versions. Formulas support `@major`, `@major.minor.patch`, or `@latest` version syntax. They're TOML files with steps, variables, and composition rules.

So to customize polecat behavior: copy the system `mol-polecat-work.formula.toml` to your town's `.beads/formulas/`, modify it, and all polecats in your town use your version.

### Q38: What happens when roles compact? Steve says compaction is a failure mode — for all roles?

**Compaction is a failure mode specifically for polecats, less so for other roles.** The [polecat lifecycle doc](https://github.com/steveyegge/gastown/blob/main/docs/concepts/polecat-lifecycle.md) treats compaction as an automatic trigger that causes session cycling. When context fills, `gt handoff` fires (or is forced), the session ends, and a new one starts with `gt prime` restoring context from beads/hooks.

For the **Refinery**, compaction is particularly dangerous because a merge conflict can consume 50k-100k tokens for diffs + surrounding code. If the Refinery compacts mid-merge, it loses track of which files are resolved. The [search results](https://github.com/steveyegge/gastown/blob/main/CHANGELOG.md) confirm this is a real operational risk — the Refinery needs to hold both versions + conflict markers in a single pass.

The mitigation strategies are:

- **Polecats**: Scope beads small enough to fit in context (your flo2 invariant "Bead Fits Context" aligns perfectly)
- **Refinery**: Process one merge at a time, keep merge complexity bounded, circuit-break on pathological conflicts
- **Witness/Deacon**: Lightweight — mostly running gt CLI commands, not holding large code contexts
- **Mayor**: Orchestration-only, no code in context, compaction risk is low

The Refinery is the role most vulnerable to compaction. There's no pool/scaling mechanism for it — it's one agent per rig processing merges sequentially.

### Q39: Deacon is not optional for my workflow. Revised assessment.

**You're right — I gave bad advice.** Retracting the "start without Deacon" recommendation. At your workflow (designing feature N+1 while agents implement feature N), you cannot be manually monitoring agents. The Witness watches polecats, but the Deacon spawns and manages the Witness + Refinery + runs health checks. Without Deacon, nobody spawns the Witness, and nobody notices when the Witness itself stalls.

**Revised recommendation**: If you adopt gt, run Deacon from day one. The token cost of Deacon is low (it's mostly running `gt` CLI commands in patrol loops, not holding code context). The alternative — you manually babysitting agent health — directly contradicts your workflow where implementation runs unattended while you design.

The graceful degradation list should be read as: "these are the layers you can adopt" not "skip the lower layers at small scale." For your workflow specifically: Mayor + Polecats + Witness + Refinery + Deacon is the minimum viable stack. Crew and Dogs are optional.

## Round 4 (2026-03-05): More follow-ups

### Q40: tmux integration means all polecats are viewable in tmux panes anyway — how does `gt feed` TUI build over that?

**Yes, each polecat runs in its own tmux pane — you CAN switch between them manually** with standard tmux navigation (`C-b s` for sessions, `C-b n/p` for windows). But watching raw panes is like watching raw terminal output of 10 concurrent builds — it's noise, not signal.

`gt feed` is a **structured overlay** that aggregates across all panes into 3 panels:
- **Agent Tree**: who's alive, what role, what bead they're working on, what state (idle/working/done)
- **Convoy Panel**: progress of work batches — how many beads done, how many pending
- **Event Stream**: chronological log of significant events (bead completed, merge succeeded, agent stalled)

Think of it as: tmux panes = raw process output (useful for debugging one agent). `gt feed` = dashboard (useful for understanding the system). Same relationship as `docker logs` vs a Grafana dashboard. You'd use tmux panes when you need to see what a specific polecat is doing; `gt feed` when you need the big picture.

The v0.10.0 OTel instrumentation takes this further — agent session data, mail events, and token usage are all structured telemetry that could feed into Prometheus/Grafana for historical analysis, not just real-time viewing.

### Q41: Is multi-rig optional? One gt dir with all projects? Shared mayor? How does that work for totally different projects?

**One town = one `~/gt/` dir = one Mayor = all your rigs.** This is not optional — it's the architecture. The Mayor is a town-level singleton that coordinates across all rigs. From the [glossary](https://github.com/steveyegge/gastown/blob/main/docs/glossary.md): the Town is "the management headquarters" that "coordinates all workers across multiple Rigs."

**How it works with unrelated projects:** The Mayor can context-switch. You tell it "work on dotfiles: refactor fish config" and it slings to dotfiles polecats. Then "work on heartbeat: fix the auth bug" and it slings to heartbeat polecats. Convoys can be rig-scoped or cross-rig. Each rig has its OWN Witness, Refinery, polecats, crew — those are per-project. Only the Mayor and Deacon span the whole town.

**If you truly want isolated orchestration per project**, you'd create multiple towns: `gt install ~/gt-dotfiles --git` and `gt install ~/gt-heartbeat --git`. Each gets its own Mayor. v0.10.0's `GT_TMUX_SOCKET=auto` enables this — per-town tmux isolation so they don't collide. But you lose cross-rig tracking (the Mayor can't coordinate work spanning both projects).

For your scale (dotfiles + heartbeat + maybe kitz), a single town with multiple rigs is the intended model. The Mayor's context cost is low since it's orchestration-only — it doesn't need to hold both codebases in memory simultaneously.

### Q42: How does polecat identity help? Who creates it? What is it? Just a name or more?

**Polecat identity solves the "ephemeral session, persistent context" problem.** From the [persistent polecat pool design](https://github.com/steveyegge/gastown/blob/main/docs/design/persistent-polecat-pool.md), identity has three layers:

**What identity IS:**
- A **name** (themed — drawn from a name pool, e.g., `furiosa`, `ripley`). Custom themes supported via `gt namepool theme`.
- A **CV** (work history) — which beads this polecat has completed, accumulated forever
- A **sandbox** (persistent worktree at `polecats/<name>/<rig>/`) that survives across assignments
- A **hook** (pointer to current bead assignment)

**Who creates it:** `gt sling` creates a polecat identity when dispatching work, or reuses an idle one from the pool. The [v0.10.0 release](https://github.com/steveyegge/gastown/releases/tag/v0.10.0) added duplicate spawn prevention — won't create a new identity if one already exists for the same bead.

**How it persists:** Identity is stored in the beads ledger (Dolt DB) + the filesystem (worktree directory). Sessions come and go (compaction, handoff, crashes), but the identity remains. A new session starts, runs `gt prime`, reads the hook, finds the bead, and continues working. This is GUPP: "if there's work on your hook, you run it."

**Why it helps:**
1. **No worktree churn** — persistent sandbox means no `git worktree add`, no `npm install` on each assignment
2. **Auditable work history** — the CV tracks what each polecat did, useful for A/B testing models
3. **Crash recovery** — session dies, identity survives, next session picks up from the hook
4. **Resource management** — v0.10.0 circuit breaker is per-identity, so a failing polecat identity gets flagged, not just a failing session
5. **Name recycling** — when a polecat goes idle, its identity + sandbox are available for the next assignment without provisioning overhead

### Q43: Do crew members have the same structured identity model as polecats? CVs, work history, identity/sandbox/session separation?

**Crew have persistent identity but NOT the same structured model as polecats.** Here's the comparison:

| Feature | Polecat | Crew |
|---------|---------|------|
| Persistent name | Yes (themed pool: `furiosa`, `ripley`) | Yes (themed: Jane Austen characters, etc.) |
| Persistent worktree/sandbox | Yes — reused across assignments ([persistent polecat pool design](https://github.com/steveyegge/gastown/blob/main/docs/design/persistent-polecat-pool.md)) | Yes — `~/gt/<rig>/crew/<name>/` persists |
| CV / structured work history | **Yes** — which beads completed, accumulates forever | **No evidence** — no equivalent design doc or glossary mention |
| Identity/Sandbox/Session separation | **Formal 3-layer model** (documented in design doc) | **Informal** — identity and worktree persist, sessions are ephemeral, but no formal separation spec |
| Session lifecycle hooks | `gt prime` on start, `gt done` on completion | `gt prime` on start, `gt handoff` for voluntary cycling |
| Per-agent `.claude/` config | Yes — `polecats/.claude/` | Yes — `crew/<name>/.claude/` (more granular, per-name) |
| Automatic task dispatch | Yes — GUPP: "work on hook, run it" | **No** — human-steered, you tell crew what to work on |
| `gt seance` (query predecessors) | Yes | Yes |

**Why the asymmetry?** Polecats are machine-managed disposable workers — their identity model exists to solve operational problems (worktree churn, crash recovery, resource tracking, A/B testing models). CVs enable the system to track which polecat identities produce good work vs bad. Crew members are human-managed — YOU are the tracking system. You know what your crew member "Jane" has been working on because you're steering the conversation directly.

The [glossary](https://github.com/steveyegge/gastown/blob/main/docs/glossary.md) captures this distinction precisely: polecats have "identity accumulating forever" while crew "maintain context across sessions." The former is about machine-readable history; the latter is about human-readable continuity.

**There is no `docs/design/persistent-crew-pool.md` or equivalent.** The [persistent polecat pool design](https://github.com/steveyegge/gastown/blob/main/docs/design/persistent-polecat-pool.md) is explicitly polecat-only. Crew don't need pool management because they're created explicitly by the user (`gt crew add <name>`) and persist indefinitely — there's no lifecycle problem to solve.

One related note: the inline Q from Round 3 ("does gt do something with these identities, creating some kind of long term memory?") — the answer is yes for polecats (CV chain in Dolt), and implicitly yes for crew (beads ledger tracks all work, `gt seance` enables cross-session queries), but crew don't get a dedicated structured memory artifact like the CV.

### Q44: Does the Refinery work with PRs instead of pushing to trunk? Does it have CI check integration?

**By default, the Refinery merges directly to main — no PRs.** This is a known adoption concern. [Discussion #951](https://github.com/steveyegge/gastown/discussions/951) explicitly criticizes this: "refinery auto-merging to main/master (protected branches)" and argues "polecats should never push to main/master." The poster advocates for requiring PR creation for main merges instead of direct pushes. As of the discussion, no maintainer response was visible.

**The merge flow is:**
1. Polecat finishes → `gt done` → submits branch to merge queue (`gt mq submit`)
2. Refinery picks up from the queue (`gt mq next`)
3. Refinery pulls the branch into its own worktree (shared bare repo — polecat branches are immediately visible)
4. Runs project tests against the branch
5. If conflicts: resolves them, re-runs tests
6. If clean: **merges directly to main** (default behavior)

**Merge queue CLI** ([reference docs](https://docs.gastownhall.ai/reference/)): `gt mq list`, `gt mq next`, `gt mq submit`, `gt mq status <id>`, `gt mq retry <id>`, `gt mq reject <id>`. Aliased as `gt mr`.

**Squash merge IS supported** — the CHANGELOG mentions a "Molecule squash --no-digest flag to skip digest creation," confirming squash as an available merge strategy. Not clear if it's the default or configurable per-rig.

**CI integration exists via the gate system.** From the [work management docs](https://docs.gastownhall.ai/usage/work-management/), gates have four types:

| Gate type | Example | Purpose |
|-----------|---------|---------|
| `timer` | `bd gate create --await timer:30m` | Wait for a time period |
| `gh:run` | `bd gate create --await gh:run:123456789` | Wait for a GitHub Actions run to complete |
| `human` | `bd gate create --await human:deploy-approval` | Wait for human approval |
| `mail` | (notification-based) | Wait for a mail signal |

The `gh:run` gate type means a polecat or refinery CAN wait on CI. However, **CI gates appear to be opt-in, not default Refinery behavior.** The Refinery runs the project's test suite itself (in its own worktree) rather than delegating to GitHub Actions. Gates are a general mechanism any agent can use — they're not Refinery-specific.

**The protected branch gap is real.** If your repo has branch protection rules requiring PR reviews before merge, the Refinery's direct-push model would be blocked by GitHub. The [Discussion #951](https://github.com/steveyegge/gastown/discussions/951) community member specifically flagged this as an enterprise adoption blocker. A [PR #620](https://github.com/steveyegge/gastown/pull/620) is referenced as evidence the system CAN respect branch protection when configured, but the details are unclear.

**For your workflow:** This is a significant design difference from flo2. If you want GitHub-native PR workflows (CI checks, review requirements, merge protection), the Refinery's default direct-to-main model doesn't align. You'd need either: (a) a formula override that makes the Refinery create PRs instead of direct-merging, (b) using gates to wait on CI after PR creation, or (c) disabling branch protection and trusting the Refinery's own test execution. Option (c) is what Yegge's workflow assumes — the Refinery IS your CI, running tests locally rather than delegating to GitHub Actions. [PR #2044](https://github.com/steveyegge/gastown/pull/2044) shows the Witness was prematurely cleaning up polecat branches before the Refinery could merge, confirming that the merge happens locally, not through GitHub's merge machinery.

### Q45: How would I use Gastown on a team project like Heartbeat?

**This is Gastown's blind spot.** Gastown is designed for **one human orchestrating many agents on repos they own** — not for multi-human teams with shared code review norms. [A community post](https://dev.to/kiwibreaksme/what-i-learned-from-steve-yegges-gas-town-and-a-small-tool-for-solo-developers-2me2) explicitly frames it as a tool "for solo developers." [Paddo.dev](https://paddo.dev/blog/gastown-two-kinds-of-multi-agent/) and [Appleton](https://maggieappleton.com/gastown) analyze it as single-orchestrator architecture.

**The core tensions on a team repo:**

1. **Code review**: On Heartbeat, teammates review each other's code via PRs. The Refinery bypasses this entirely — it merges to main without human review. Your teammates would wake up to code on main they've never seen.

2. **Branch protection**: Team repos typically have branch protection (require PR, require approvals, require CI). The Refinery's direct-push model hits a wall here — GitHub would reject the push. [Discussion #951](https://github.com/steveyegge/gastown/discussions/951) confirms this is an unresolved adoption blocker.

3. **CI pipeline**: Heartbeat presumably has GitHub Actions for tests, linting, type-checking, maybe deployment. The Refinery runs tests locally in its worktree — it doesn't trigger or wait for your CI pipeline by default. You'd need `gh:run` gates to bridge this, but that's manual wiring per-formula.

4. **Teammate visibility**: Your teammates aren't running gt. They'd see branches appearing, code landing on main, and have no context for what happened. `gt feed` and beads are YOUR dashboard — they don't integrate with GitHub's UI that your team uses.

5. **Commit attribution**: Agent commits would come from your git identity. Teammates can't distinguish your manual work from polecat output without reading commit messages/branch names.

**What you COULD do (with significant friction):**

- **Use gt for implementation only, stop before merge.** Run polecats to write code on branches, but instead of `gt done` → Refinery → main, have polecats create PRs (`gh pr create`) as their final step. You'd override the polecat formula to end with PR creation instead of merge queue submission. Your teammates review the PR normally. This discards the Refinery entirely — you're using gt as a branch-per-task spawner, not a merge system.

- **Separate town, integration branch.** Run gt against a fork or integration branch, let the Refinery merge there, then you manually PR from integration → main. Extra indirection but preserves team PR workflow.

- **Use gt only for your solo tasks.** When you have a batch of tasks assigned to you personally (no cross-team review needed), gt them. When work needs team review, use normal CC workflow.

**The honest assessment:** Gastown assumes you ARE the team — you're the sole human, agents are your team. On a real multi-human team like Heartbeat, you'd be fighting the architecture rather than using it. The parts of gt that help on a team repo are the parts that DON'T touch the merge path: beads for task tracking, worktree isolation, polecat spawning for parallel implementation. But the Refinery — gt's crown jewel — is designed for a world where the human trusts the agent to merge, and that's not how team repos work.

~~This is arguably the single biggest factor for your flo2 design: **flo2 should be PR-native from day one** if it needs to work on both solo and team repos.~~ **See Q46 — integration branches solve this.**

## Round 5 (2026-03-06): Integration branches + team workflow

### Q46: Can the Refinery target a branch other than main? (e.g., branch-of-branch as "trunk" for development)

**Yes — this is exactly what integration branches do, and it's a fully documented first-class feature.** ([docs/concepts/integration-branches.md](https://github.com/steveyegge/gastown/blob/main/docs/concepts/integration-branches.md))

**The pattern:** Instead of polecats merging individually to main, all epic-scoped work accumulates on `integration/{epic-name}`, then lands atomically.

**How it works:**
1. `gt mq integration create <epic-id>` → creates branch from base (default: rig's `default_branch`, configurable with `--base-branch`)
2. Polecats auto-detect the integration branch — their worktrees source from it, so sibling work is visible
3. `gt done` auto-detects the parent epic's integration branch and targets MRs there, NOT main
4. Refinery merges to `integration/{epic}` instead of main
5. When all children are done: `gt mq integration land <epic-id>` → `--no-ff` merge to base branch → deletes integration branch → closes epic

**This directly solves the team project problem (Q45).** On Heartbeat:
- Set the rig's `default_branch` to `develop` (or leave as `main`)
- Create an integration branch per epic: `gt mq integration create <epic> --base-branch main`
- Let the Refinery merge all polecat work to `integration/{epic}`
- When the epic is ready, instead of `gt mq integration land` (which merges directly), **you create a PR from the integration branch to main** for team review
- Teammates review one PR with all the atomic work, CI runs, approvals happen normally
- After approval, either merge via GitHub or run `gt mq integration land`

**The rig's `default_branch` is configurable** ([reference docs](https://docs.gastownhall.ai/reference/)):

```json
{
  "default_branch": "main",
  "merge_queue": {
    "integration_branch_polecat_enabled": true,
    "integration_branch_refinery_enabled": true,
    "integration_branch_template": "integration/{title}",
    "integration_branch_auto_land": false
  }
}
```

Key config flags:
- `integration_branch_polecat_enabled` — polecats source worktrees from integration branch (siblings see each other's work)
- `integration_branch_refinery_enabled` — Refinery auto-detects integration branch as MR target
- `integration_branch_auto_land` — patrol auto-lands ready branches (set `false` for team review)
- `integration_branch_template` — naming pattern (supports `{title}`, `{epic}`, `{user}`)

**Auto-detection algorithm:** When a polecat runs `gt done`, the system: checks config gate → extracts issue ID from branch → walks parent chain (max 10 levels) for ancestor epics → reads `integration_branch:` from epic metadata → falls back to template → verifies branch exists → targets MR at that branch.

**Landing has 3 safety layers:**
1. Formula/role forbids raw `git merge` to main — only `gt mq integration land` is authorized
2. `.githooks/pre-push` blocks pushes to default branch with integration content unless `GT_INTEGRATION_LAND=1`
3. Code path verification ensures only sanctioned tools execute landing

**Auto-landing** (when `auto_land: true`): Refinery patrol checks each epic's readiness — integration branch has commits ahead of main, all children closed, no pending MRs → auto-lands. Set this to `false` for team repos where you want to PR instead.

**This retracts Q45's conclusion.** Gastown CAN work on team repos — the integration branch model is the bridge. The workflow becomes: gt manages the parallel agent implementation internally (Refinery merges to integration branch), and the team interface is a single PR from integration branch to main. Teammates see one clean PR, not 15 polecat branches.

Sources: [integration-branches.md](https://github.com/steveyegge/gastown/blob/main/docs/concepts/integration-branches.md), [reference docs](https://docs.gastownhall.ai/reference/), [CHANGELOG](https://github.com/steveyegge/gastown/blob/main/CHANGELOG.md)
