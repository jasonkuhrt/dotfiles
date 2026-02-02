# flo:next:swarm — Design

## Problem

`flo:next` advances an epic one bead at a time — sequential, single-agent. For epics with many independent beads, this is unnecessarily slow. The existing `beads:fanout` skill addresses parallel execution but lives outside the flo namespace, doesn't share flo's infrastructure (`.flo/state.yml`, `resolve.sh`, epic context loading), and lacks flo:next's core safety properties (chain tracing, downstream integrity checking).

## Decision: Merge Into Flo

`flo:next:swarm` replaces `beads:fanout` entirely. Both assume epic-scoped work, so there's no gap. `beads_fanout/` gets deleted.

## Naming

The flo execution skills use `flo:next` as the "advance progress" verb. The execution mode is a suffix:

```
flo:next            → advance one bead (sequential, existing)
flo:next:swarm      → advance many beads in parallel (new)
```

CC supports triple-colon skill names (`name:sub:sub`).

## Invocation

```
flo:next:swarm                          → prompt user for wave depth
flo:next:swarm --waves all              → full remaining epic, no prompt
flo:next:swarm --waves 2                → two waves deep, no prompt
flo:next:swarm --commit false           → agents don't commit; one dirty dir at end
flo:next:swarm --waves all --commit false
```

| Flag | Accepts | Default | Description |
|------|---------|---------|-------------|
| `--waves` | `all \| \d+` | _(prompt)_ | Wave depth to swarm |
| `--commit` | `true \| false` | `true` | Whether subagents commit independently |

## Wave Model

Beads in an epic form a dependency DAG. "Waves" are the dependency layers:

```
Wave 1 (ready now):  A, B      ← no blockers
Wave 2 (after W1):   C, D      ← blocked by A, B respectively
Wave 3 (after W2):   E         ← blocked by C
```

`--waves` controls **how many layers of CC tasks to create**, not an explicit execution boundary. CC's task system (TaskCreate + `addBlockedBy`) handles execution ordering natively — the orchestrator creates the DAG, CC dispatches subagents for unblocked tasks automatically.

### Wave Selection UX

When invoked without `--waves`, present waves to the user:

1. Compute waves via `scripts/waves.sh <epic-id>` (shell script — queries `bd` for children + deps, outputs structured wave layers; zero in-context token cost)
2. Show the dependency graph (`bd graph <epic> --compact`)
3. Show each wave with its beads
4. AskUserQuestion: "How many waves to swarm?" with options like `Wave 1 only`, `Waves 1-2`, `All 3 waves`

This avoids the tree-multiselect problem — users think in depth (how far to go), not individual bead selection.

### Wave Computation Script

`scripts/waves.sh <epic-id>` — a shell script that:

1. Lists open children of the epic (`bd show <epic> --children`)
2. For each child, queries its `blockedBy` relationships
3. Assigns wave numbers: beads with no blockers = wave 1, beads blocked only by wave 1 = wave 2, etc.
4. Outputs structured wave data (JSON or formatted text) for the orchestrator to present

Same pattern as `flo_next/scripts/context.sh` — keeps graph traversal out of the agent's context window.

## Execution Architecture

### Orchestrator Responsibilities

The orchestrator (current CC session) handles:

1. **Context loading** — resolve epic, load context once via `context.sh`, read design docs
2. **Wave computation** — run `scripts/waves.sh <epic-id>`, apply `--waves` depth filter
3. **Task creation** — one TaskCreate per bead (up to wave depth), mirror bead deps with `addBlockedBy`
4. **Dispatch** — CC automatically dispatches subagents for unblocked tasks
5. **Wrap-up** — downstream integrity check, epic status, sync, push

No sizing gate — beads created via `flo:add` already passed the sizing heuristic. If a bead bypassed `flo:add` and is too large, the subagent failure handling catches it.

The orchestrator's own context is thin: epic context + task management. It should be invoked early in a session or as a fresh session, not after heavy exploration.

Scripts:
- `scripts/waves.sh` — wave computation (new, described above)
- `flo_shared/resolve.sh` — epic resolution (shared with `flo:next`, `flo:add`, `flo:review`)
- `flo_next/scripts/context.sh` — epic context loading (shared with `flo:next`)

### Subagent Briefings (Orchestrator-Curated)

The orchestrator loads all bead bodies upfront to build focused per-agent briefings. This costs tokens proportional to (bead count × description size), but the payoff is:

- Orchestrator has a holistic view of the epic's work surface
- Can provide better briefings (knows sibling context, can warn about adjacencies)
- After swarm completes, orchestrator already understands what was done — makes the downstream integrity check and wrap-up intelligent
- If work continues after swarm (e.g., sequential `flo:next` for remaining beads), the orchestrator has full context to continue

Each subagent's briefing includes:

- Bead ID and full body (inlined — no `bd show` round-trip)
- Predecessor close reason (what was built before this bead)
- Relevant design doc excerpt (if applicable)
- Commit instructions (parallel-safe pathspec mode from `git:parallel-commit`)
- Bead close instructions (`bd close <id> --reason="..."`)
- Constraint: "Only modify files relevant to this bead. Other agents are running concurrently."

### Communication Model: Beads as the Channel

Subagents do NOT need to pass results back to the parent via Task return values. The bead system is the communication channel:

- **Subagent's job**: Do the work → commit → `bd close <id> --reason="what was actually built"`. That's it.
- **Parent's job at wrap-up**: Read close reasons from `bd show` for each bead. The close reason IS the result.
- **Task return value**: Minimal — just a success/failure signal. The meaningful content lives in the bead's close reason.

This keeps subagent prompts simple (close the bead when done) and keeps all persistent state in beads where it belongs — readable by any future session, not trapped in a Task result that's session-scoped.

### CC Task System as Execution Engine

CC's task system IS the execution engine:

- `TaskCreate` with `addBlockedBy` wires the DAG
- CC automatically works through tasks, respecting dependency ordering
- Subagents are dispatched via `Task(general-purpose, run_in_background: true)`
- When a task completes, CC picks up newly unblocked tasks

No explicit polling loop or wave boundary logic needed.

## Subagent Failure: Context Limit

**Subagents do not compact.** They hit the 200k token wall and exit non-zero. No recovery, no compaction cycle.

Reference: https://www.reddit.com/r/ClaudeCode/comments/1pz84yw/will_task_subagents_or_any_subagents_autocompact/

This creates a hard constraint: **swarm beads must complete within a single 200k subagent window.** This is tighter than `flo:next`'s budget (~165k with compaction recovery available). The skill doc must call this out.

### Failure Handling

1. **Detection** — Subagent exits non-zero → bead not closed (no `--reason`). Orchestrator detects unclosed bead.
2. **Graceful report** — Orchestrator tells user: "Bead X's agent hit context limit. Bead stays `in_progress` (claimed, unclosed). Downstream beads remain blocked."
3. **User decides** — Decompose with `flo:add` and re-swarm, or handle sequentially with `flo:next` (which has compaction recovery).

No preventive sizing gate — beads created via `flo:add` already passed the sizing heuristic at creation time.

## Hooks in Subagents

Hooks behave differently in subagents vs. the parent session:

| Hook | In parent | In subagent |
|------|-----------|-------------|
| `PreToolUse` / `PostToolUse` | ✅ fires | ✅ fires |
| `Stop` | ✅ fires | Converted to `SubagentStop` (fires on parent) |
| `SubagentStart` | ✅ fires (can inject `additionalContext`) | N/A |
| `SubagentStop` | ✅ fires | N/A |
| `PreCompact` | ✅ fires | ❌ subagents don't compact |
| `SessionStart(compact)` | ✅ fires | ❌ subagents don't compact |

Key implications:
- `SubagentStart` can inject per-bead context (alternative to prompt-based briefing)
- `SubagentStop` lets the orchestrator react to completion/failure
- No compaction hooks in subagents — recovery is not possible, only failure detection

### Plugin Hooks in Subagents

**Tested empirically:** `SessionStart` hooks do NOT fire inside Task subagents. The beads plugin's `bd prime` hook (which injects session close protocol) does not run in subagents.

This is desirable for swarm — the `bd prime` session close protocol tells agents to `git commit`, `git push`, `bd sync` before finishing, which would conflict with the orchestrator-managed wrap-up. Subagents instead receive only the orchestrator's focused briefing as their sole instruction source.

Subagents DO receive:
- Standard CC system prompt
- CLAUDE.md and rules files (including `beads-close-discipline.md` — so they know how to write close reasons)
- Git status snapshot

Subagents do NOT receive:
- `bd prime` output (session close protocol, beads workflow context)
- Any SessionStart hook output

Custom subagent hooks can be configured via agent frontmatter if needed — see https://code.claude.com/docs/en/sub-agents#define-hooks-for-subagents

## Downstream Integrity Check

`flo:next`'s core safety property: when a bead's close reason diverges from its body, check downstream beads for cascading implications.

In swarm mode, this check runs **once at wrap-up** (not per-agent). After all subagents complete:

1. For each closed bead, compare close reason against original body
2. If any diverge, check downstream beads (`bd dep tree <id> --direction=up --status open`)
3. Report findings to user
4. If downstream beads are affected but not yet executed (later waves), update them before next wave or flag for user decision

## Git Commit Mode (`--commit`)

### `--commit true` (default)

Each subagent commits its own work using **pathspec mode** — the critical mechanism that prevents staging area cross-contamination when multiple agents run concurrently:

```bash
git add <new-files>                          # only needed for untracked files
git commit -m "<bead title>: <summary>" -- <all changed files>  # --only mode via pathspec
```

The `-- <paths>` suffix triggers git's `--only` mode: it commits exactly the listed files regardless of what's in the staging area. This means agents don't interfere with each other's staged changes.

**index.lock retry**: If `git commit` fails with an `index.lock` error (another agent is mid-commit), sleep 1 second and retry up to 3 times.

**Non-overlapping files required**: Parallel commits are safe only when agents touch disjoint file sets. The orchestrator warns if beads might touch the same files and suggests running those sequentially.

Required sub-skill: `git:parallel-commit`

### `--commit false`

Subagents do the work and close beads but **do not commit**. All changes accumulate as a dirty working directory. The orchestrator (or user) handles a single commit at wrap-up.

Use cases:
- Cleaner git history (one commit per swarm run rather than N per-bead commits)
- User wants to review the combined diff before committing

In this mode, the parallel commit sub-skill is not used, and the subagent briefing omits commit instructions. The wrap-up protocol includes staging and committing all changes as one commit.

## Wrap-Up Protocol

After all tasks complete:

1. Check for failed beads (unclosed, agent exited non-zero)
2. Read close reasons from `bd show` for each closed bead
3. Run downstream integrity check on all closed beads
4. If `--commit false`: stage all changes and commit as one (`git add <files> && git commit -m "feat: <epic summary>"`)
5. Check epic completion: `bd epic status`
6. If all children done: `bd epic close-eligible`
7. `bd sync`
8. `git push`

## Relationship to Flo Suite

| Skill | Verb | Mode | Concurrency |
|-------|------|------|-------------|
| `flo:add` | Create | Planning | N/A |
| `flo:next` | Advance | Sequential | 1 agent, compaction-safe |
| `flo:next:swarm` | Advance | Parallel | N agents, no compaction |
| `flo:review` | Verify | QA | N/A |

`flo:next` and `flo:next:swarm` share: epic resolution (`.flo/state.yml`), `context.sh`, design doc reading, downstream integrity checking. They differ in: execution mode, compaction behavior, agent briefing strategy.
