# flo2 Specification

Working specification. Accumulated through brainstorming Q&A.

## Scope

This is not just about coding workflows. flo2 governs how Jason does all directed work — software engineering, research, trip planning, brainstorming, etc. Some pipeline stages (testing, type checking) are domain-specific, but the outer loop (brainstorm → plan → execute → review → capture learnings) applies broadly.

Key landscape question: what is the right orchestration layer?
- **CC Agent Teams** — built into Claude Code, native
- **Gastown** — Steve's fleet orchestration built on beads, ~2 months old, declared stable
- **Hybrid** — compose them somehow
- **Something else** — other tools TBD

These may be mutually exclusive for orchestration, or composable. Need to understand tradeoffs before committing.

## Tool Stack (Confirmed)

- **cmux** — terminal multiplexer (replaces tmux), CLI-driven pane management
- **zmx** — persistent cmux workspaces (session persistence across reboots)
- **nvim** — editor
- **Claude Code** — agent harness, primary interface
- **beads (`bd`)** — persistent task tracking with dependency DAGs
- **showboat** — executable demo documents (proof-of-work, walkthroughs, verification)

### cmux/zmx Integration Points (Design Requirements)

These are capabilities flo2 should leverage, not implementation details:

- **CC agent teams → cmux panes** — CC has native tmux support for spawning team members into panes. cmux users in Discord have achieved the same with cmux panes. This is the primary multi-agent visibility mechanism — each team member gets its own pane automatically.
- **Manual agent spawn** — `/fork` skill: launch standalone CC agent sessions into cmux panes (outside of agent teams)
- **Notification integration** — agents notify at workflow junctures (completion, blocked, needs review, failure)
- **Progress visualization** — multi-agent dashboard in cmux (which agents are running, their beads, status)
- **Workspace persistence** — zmx ensures the flo2 workspace (all agent panes, dashboard) survives terminal restarts

Open: cmux/zmx integration state needs research (recent PRs, Discord findings on CC team→pane routing). Separate bead for that work.

### Showboat Integration Points (Design Requirements)

Showboat creates executable markdown documents that prove an agent's work. Fits flo2 at:

- **Proof-of-work artifacts** — each bead's deliverable can include a showboat document showing what was built, with executable verification
- **Review evidence** — reviewer agents can use `showboat verify` to re-execute and confirm implementer claims
- **Walkthrough generation** — post-completion, generate linear walkthroughs of what was built (Willison's pattern for combating cognitive debt)
- **Session capture** — showboat documents as a richer alternative to close reasons, capturing not just what was done but executable proof

## Prior Art: Superpowers + Community Agent Team Fork

Superpowers (obra/superpowers) provides the proven pipeline. A community fork by bok- adds CC agent team support. Both are cloned at `~/repo-references/superpowers/` (with community skills at `community-agent-team-skills/`).

### What to adopt from superpowers

- **Two-stage review** (spec compliance → code quality) — separation is critical
- **Fresh context for reviewers** (subagents, not team members) — eliminates bias
- **Implementer self-review before reporting** — catches easy issues early
- **Spec reviewer distrust** — "verify everything independently, do not trust the report"
- **Wave-based parallel execution** (from community fork) — maps to bead dependency DAG
- **Specialist naming** (role-based, not numbered) — `backend-engineer` not `agent-1`
- **Staggered reviews** — review starts as each implementer finishes, don't wait for whole wave

### What to customize/replace

- **TodoWrite → beads** — superpowers uses flat TodoWrite; flo2 uses beads with dependency DAGs
- **Worktree-per-feature → epic-level worktrees** — superpowers creates worktree per brainstorm; flo2 shares worktree within an epic
- **Generic code review → convention-aware review** — superpowers reviews for generic SOLID/patterns; flo2 reviews against project-specific conventions via `/check`
- **TDD orthodoxy → context-appropriate testing** — not all beads have test suites (config, skills, dotfiles)
- **brainstorm→plan→execute pipeline → flexible entry points** — sometimes you already have a bead body and just need execution

## Existing Skills to Integrate

### `/check` — Pluggable Code Checks

Already built. Tiered (gate/quality/polish), scoped (here/dirty/pr), grouped by domain (@effect, @prisma, @react-components, etc.). Discovers CHECKS files from skills directories, evaluates against correct/incorrect examples, writes findings to `.claude/checks-output/`.

**Integration with flo2 review phase:**

- **Gate tier as mandatory pre-commit** — before an agent commits a bead's work, run `/check gate` on dirty files. Binary pass/fail — types, lint. No judgment needed.
- **Quality tier as part of code quality review** — superpowers' code quality reviewer dispatches a fresh subagent; that subagent should run `/check quality` as part of its review. The checks system already has project-specific conventions encoded (Effect patterns, React components, Playwright patterns). This IS the convention-aware review layer.
- **Polish tier for pre-merge** — when finishing an epic (all beads complete), run `/check polish pr` against the full branch diff before merge.
- **`/check:add` for accumulating conventions** — every time you see an agent do something wrong, add a check. The checks system is the living convention document.
- **Check hardening flywheel** — new checks start as LLM-evaluated CHECKS.md entries (judgment-based, costs tokens). Whenever possible, harden them into oxlint custom rules (deterministic, zero tokens, runs in gate tier). This hardening is itself a bead — the debrief or review identifies the check, `/check:add` creates the soft check, and a follow-up bead converts it to an oxlint rule. Over time, the gate tier grows and the quality tier shrinks as conventions become machine-enforced.

### `/debrief` — Knowledge Extraction After Action

Already built. Structured post-mortem: deviations, discoveries, code debt, documentation gaps, plan methodology flaws, follow-ups.

**Integration with flo2:**

- **Mandatory after epic completion** — before closing an epic bead, run `/debrief`. Captures what would otherwise evaporate.
- **Optional after individual beads** — lightweight debrief when a bead's work was surprising or difficult.
- **Feeds back into checks** — debrief identifies convention violations → these become `/check:add` inputs.
- **Feeds back into beads** — debrief proposes follow-up `bd create` commands for discovered work.
- **Showboat as debrief evidence** — debrief references showboat documents for concrete proof of what was learned.

## Invariants

1. **Engagement ↔ Bead (1:1)** — Every engagement is tied to exactly one bead, except meta-engagements (creating/refining beads themselves)
2. **Bead = One Commit** — Each bead produces exactly one atomic commit
3. **Bead Fits Context** — A bead must be scoped to fit within 200k context. Compaction is a failure mode to avoid, not a recovery strategy.
4. **Hunk-Based Commits** — Each agent commits independently using hunk-level staging (`git add -p`). Agents stage only their own diff hunks, not whole files. Other agents' uncommitted changes in the same worktree are ignored.
5. **Epic = Worktree** — Epic-level beads get their own worktree. Individual beads within an epic share the epic's worktree.

## Open Research

- [ ] Gastown: what it is, what it replaces, what it assumes, tradeoffs vs CC agent teams (separate exploration session started — awaiting gastown-conclusion.md)
- [ ] Kitz: where its boundaries are, what it handles vs what flo2 overlays
- [ ] cmux/zmx: current integration state, recent PRs, what's possible for notifications/progress/pane management
- [ ] Non-software workflows: what parts of the pipeline apply to research, planning, etc.
- [ ] Skill-creator eval methodology: applicable to flo2 skill development?
- [ ] Personal conventions: the specific ones that hurt when violated (needs enumeration)
- [ ] flo v1 retrospective: what worked, what didn't

## Terminology

- **bead** — unit of work tracked by `bd` CLI
- **epic** — parent bead containing child beads with dependencies
- **session** — a single Claude Code agent session (1:1 with CC sessions)
- **engagement** — (term TBD) the user's unit of directed work: one orchestrator + any team members. 1:1 with beads.
- **worktree** — git worktree for isolation

## Design Decisions

1. **cmux+zmx+nvim confirmed** as terminal/editor stack. Tmux archived.
2. **Superpowers as base, not from scratch.** Adopt proven patterns (two-stage review, wave execution, specialist naming), replace integration points (beads for tracking, conventions for review, flexible entry).
3. **Showboat for proof-of-work.** Executable demo documents for verification, walkthroughs, and richer close reasons.
