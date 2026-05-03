# Agent Harness Landscape Research

Date: 2026-04-03
Context: Surveying the agent+git tooling ecosystem to inform session system development

## The Stack Model

```
orchestration          "what work, which agents, when"
session system         "what's the state of the work"
terminal/workspace     "where agents live"
persistence            "processes survive everything"
git/worktrees          "code isolation + truth"
infrastructure         "conflict detection, dep sync, ports"
```

## Tier 1: Evaluate Now

### worktrunk (max-sixty, 4.1k stars, Rust)
https://github.com/max-sixty/worktrunk
Cleanest worktree manager. Three commands: `switch`, `list`, `merge`. PR checkout (`wt switch pr:123`). Port hashing per worktree. Build cache copying. 3,323 commits. Purpose-built for 5-10+ parallel agents. Most mature of the worktree tools.

### clash (clash-sh, 49 stars, Rust)
https://github.com/clash-sh/clash
Read-only merge conflict detection across worktrees using `gix` three-way merge simulation. `clash check <file>` (exit codes), `clash status` (matrix), `clash watch` (live TUI). Claude Code plugin available. Complementary to session boundary guard (different failure mode).

### zmx (neurosnap, 1.2k stars, Zig)
https://github.com/neurosnap/zmx
Session persistence only. No window management. Unix sockets per session, ring buffer for scrollback, multi-client attach. The anti-tmux. North star for persistence layer under cmux.

### entire (entireio, 3.8k stars, Go)
https://github.com/entireio/cli
Captures full agent session transcripts on every commit. Pushes to separate `entire/checkpoints/v1` branch. Supports Claude/Codex/Gemini/Cursor/Copilot. Checkpoint IDs for rollback. Complementary to debriefs (objective record vs subjective reflection).

## Tier 2: Study Architecture, Don't Adopt

### gastown (gastownhall, 13.5k stars, Go)
https://github.com/gastownhall/gastown
Most complete orchestration system. Mayor (coordinator) dispatches to Polecats (workers) via Convoys (task bundles). Persistent agent identity. Recovery infrastructure. Merge queue (Refinery). Federation (Wasteland). Built on beads.
**WARNING: Built on Dolt. See Dolt status below.**

### beads (gastownhall, 20k stars, Go)
https://github.com/gastownhall/beads
Dependency-aware task graph backed by Dolt. Hash IDs (`bd-a1b2`), `bd ready` queue, semantic compaction, messaging. The task graph concept is excellent.
**WARNING: Dolt embedded mode is actively unstable. See issues #2573 "Moving to dolt pretty much made beads unusable for me", #2938 "Beads feels painful to use", #2994 "updating beads has now failed, hard, 2 out of 2 times". Firefighting daily as of Apr 3 2026.**

### citadel (SethGammon, 447 stars, JS)
https://github.com/SethGammon/Citadel
Four-tier routing (regex -> session state -> keyword -> LLM). Campaign persistence across sessions. 15 lifecycle hooks with consent system. Fleet mode. Interesting architecture, monolithic implementation.

### mcp-agent-mail-rust (Dicklesworthstone, 57 stars, Rust)
https://github.com/Dicklesworthstone/mcp_agent_mail_rust
Advisory file reservations (glob patterns, TTL expiration, pre-commit guards) + async agent messaging. Git-backed, SQLite-indexed. The reservation primitive is superior to YAML frontmatter claims: file-level granularity, TTL prevents crashed-agent deadlocks. Platform-heavy (36 MCP tools) but core ideas are extractable.

### tick-md (Purple-Horizons, 18 stars, TypeScript)
https://github.com/Purple-Horizons/tick-md
Markdown-native task coordination. One YAML-frontmatter file per task. Dependencies with auto-unblock on completion. MCP server. Interesting alternative to checkbox-list tasks.md.

## Tier 3: Worktree Infrastructure

### workz (rohansx, 51 stars, Rust)
https://github.com/rohansx/workz
Dep sync (symlinks node_modules etc across worktrees), port isolation, fleet mode, MCP server. Good prims trapped in a monolith. Fleet mode overlaps with orchestration.

### silo (silo-rs, 103 stars, Rust)
https://github.com/silo-rs/silo
Port virtualization via network namespaces. Every worktree thinks it has port 3000. Zero app config changes. Linux-native (namespace isolation), macOS support unclear.

### agent-worktree (nekocode, 133 stars, Rust)
https://github.com/nekocode/agent-worktree
Snap mode: create -> run agent -> prompt merge/discard -> cleanup. TOML metadata. Hooks (post_create, pre_merge). Generic agent support.

## Tier 4: Observability / Session Tools

### agentsview (wesm, 657 stars)
https://github.com/wesm/agentsview
Local-first desktop/web app for browsing agent sessions across all providers.

### cross_agent_session_resumer (Dicklesworthstone, 63 stars, Rust)
https://github.com/Dicklesworthstone/cross_agent_session_resumer
Canonical IR for converting sessions between Claude/Codex/Gemini. Resume in any tool.

### showboat (simonw, 1k stars)
https://github.com/simonw/showboat
Executable documents that demonstrate an agent's work.

### diffity (kamranahmedse, 486 stars)
https://github.com/kamranahmedse/diffity
GitHub-style diff viewer for reviewing AI code changes.

## Tier 5: Orchestration / Coordination

### agent-of-empires (njbrake, 1.4k stars, Rust)
https://github.com/njbrake/agent-of-empires
tmux + git worktree session manager for 9 agent CLIs. TUI dashboard. Docker sandboxing.

### vigilante (aliengiraffe, 23 stars, Go)
https://github.com/aliengiraffe/vigilante
Autonomous loop: watch repos -> fetch issues -> filter -> create worktrees -> launch agents -> track -> cleanup. Hardwired to GitHub Issues.

### pro-workflow (rohitg00, 1.5k stars, TypeScript)
https://github.com/rohitg00/pro-workflow
Self-correcting memory via SQLite FTS5. Corrections -> rules -> loaded on SessionStart. 24 skills, 8 agents, 29 hooks. Session memory compounds across 50+ sessions.

## Tier 6: Other Notable

### drift (fiberplane, 23 stars)
https://github.com/fiberplane/drift
Bind specs to code and check for drift. Could verify reference.md against CLI implementation.

### OpenViking (volcengine, 20.8k stars)
https://github.com/volcengine/OpenViking
Context database for agents. File-system paradigm for memory/resources/skills with hierarchical delivery.

### cx (ind-igo, 226 stars)
https://github.com/ind-igo/cx
Semantic code navigation for AI agents.

### lat.md (1st1, 863 stars)
https://github.com/1st1/lat.md
Knowledge graph for your codebase, written in markdown.

## Dicklesworthstone Prim Toolkit
This author is building composable Rust infrastructure:
- frankensearch: two-tier hybrid search (lexical + semantic)
- frankensqlite: concurrent-writer SQLite reimpl in Rust
- frankentui: minimal diff-based TUI kernel
- pi_agent_rust (665 stars): full coding agent CLI
- post_compact_reminder: hook for post-compaction rule injection

## Dolt Status (as of 2026-04-03)

Actively unstable for embedded use. 524 open issues. Releasing almost daily (v1.85.0 on Apr 1).

Recent embedded-mode issues:
- #10687: nil pointer panic on concurrent access (Mar 16)
- #10375: embedded DB lock contention (Jan 27)
- #10383: SQL engine panic when database locked (Jan 29)
- #10746: `dolt init` hangs on Linux ext4 (Mar 25)
- #10807: push fails after successful push (Apr 3)

Beads-specific Dolt issues:
- #2573: "Moving to dolt pretty much made beads unusable" (Mar 13)
- #2559: connecting to dolt fails on restart (Mar 13)
- #2867: worktree restarts corrupt repo fingerprint (Mar 28)
- #2938: "Beads feels painful to use" (Mar 31)
- #2994: "updating beads has now failed, hard, 2 out of 2 times" (Apr 3)
- #3005: concurrent embedded callers fail (Apr 3)

Verdict: Do not depend on Dolt for anything. Study beads/gastown architecture, reimplement ideas on SQLite or plain files.

## Key Principles From This Research

1. **zmx + cmux** is the right persistence + workspace split
2. **worktrunk** is the most mature worktree prim (evaluate for adoption)
3. **clash** is directly adoptable (Claude Code plugin, read-only, composable)
4. **Dep sync** (workz-style symlinks) is a real need nobody has extracted as a standalone prim
5. **Task dependency graphs** (beads/tick-md) are better than checkbox lists but don't require Dolt
6. **File-glob TTL reservations** (mcp-agent-mail) are better than frontmatter claims
7. **Session capture** (entire) is complementary to debriefs, not competing
8. **Orchestration** is wide open — gastown is the most complete attempt but radioactive due to Dolt
9. The session system's unique value is thread lifecycle + semantic coordination. Don't rebuild plumbing.
