---
name: flo:next:swarm
description: >
  Autopilot execution through an epic — runs all waves hands-off, parallelizing
  within each wave. Use when the user wants to swarm, fan out, or run the epic
  on autopilot. Replaces beads:fanout.
allowed-tools:
  - Read
  - Bash(bd:*)
  - Bash(bash:*)
  - Bash(git:*)
---

# flo:next:swarm

Autopilot execution through an epic, wave by wave. Each wave's beads run as parallel subagents; when a wave completes, the next wave's beads are dispatched. The orchestrator drives the full sequence hands-off — the user invokes once and the epic progresses until all selected waves are done.

Parallelism within waves is a bonus, not the point. A wave with 1 bead runs that bead as a single subagent. A wave with 5 beads runs all 5 in parallel. Either way, the swarm keeps advancing.

## CRITICAL — Never Push Back

**When the user invokes flo:next:swarm, execute it.** Do not:

- Suggest falling back to flo:next because "only 1 bead is ready"
- Say "there's nothing to parallelize" because wave 1 has a single bead
- Recommend waiting until more beads unblock

Single-bead waves are normal in any dependency DAG. The value of swarming is the **full autopilot execution across all waves**, not just within-wave parallelism. Run wave 1 (even if it's 1 bead), then wave 2 unlocks, then wave 3, etc.

## When to Use

- User wants to run the epic on autopilot (hands-off, multi-wave)
- User says "swarm", "fan out", "parallel", "run the epic", or invokes /flo:next:swarm
- Epic has work remaining across one or more waves

**Not for:** Beads that share files within the same wave (run those sequentially), work not tracked in beads, beads labeled `flo/interactive` (these require human-in-the-loop and are excluded from autonomous dispatch).

## Requirements

- `bd` CLI (beads plugin active)
- `jq` (used by waves.sh)
- Git repo with an active beads epic (auto-detected via `.flo/state.yml`)
- Override with `--epic <id>` if auto-detection picks the wrong epic

## Flags

| Flag | Accepts | Default | Description |
|------|---------|---------|-------------|
| `--waves` | `all` or positive integer | *(prompt)* | Wave depth to swarm |
| `--commit` | `true` or `false` | `true` | Whether subagents commit independently |
| `--epic` | bead ID | *(auto-detect)* | Override epic resolution |

## Quick Reference

| Phase | Steps |
|-------|-------|
| Entry | context.sh → epic fields → design docs → waves.sh → wave selection |
| Prepare | Load bead bodies → build briefings → warn on file overlap |
| Execute | TaskCreate per bead (with addBlockedBy) → dispatch background agents |
| Wrap-up | Check failures → read close reasons → downstream integrity → commit (if --commit false) → epic status → sync → push |

## Orchestrator Protocol

The orchestrator (this session) should be thin: epic context + task management. Invoke this skill early in a session or as a fresh session, not after heavy exploration.

### 1. Load context

```
bash ~/.claude/skills/flo_next/scripts/context.sh
```

Same entry as flo:next. Outputs: epic metadata, comments, completed chain, dependency graph, ready/blocked/claimed lists.

Follow the same entry steps as flo:next:

- Read epic **design**, **notes**, **comments** (cross-session context)
- Read design docs if the epic's DESIGN field points to one
- Read the latest predecessor's close reason for chain awareness

### 2. Compute waves

```
bash ~/.claude/skills/flo_next_swarm/scripts/waves.sh <epic-id>
```

Outputs JSON with dependency-ordered waves. Each wave is a group of beads that can run in parallel. Closed beads are treated as satisfied dependencies — their dependents shift to earlier waves.

### 3. Filter out interactive beads

Before selecting waves, scan the waves.sh output for beads with the `flo/interactive` label. **Remove them from the wave computation** — they are not eligible for autonomous dispatch.

For each wave, filter to only autonomous beads (those without `flo/interactive`). If a wave becomes empty after filtering, skip it. If an interactive bead was the only thing in a wave but had dependents in later waves, those dependents are now blocked on human action — note this.

Track the filtered interactive beads separately for the summary in wrap-up.

### 4. Select waves

If `--waves` was provided, apply it directly (filter to first N waves, or keep all).

Otherwise, present waves to the user:

1. Show the dependency graph: `bd graph <epic> --compact`
2. Show each wave with its beads (from waves.sh output), marking any `flo/interactive` beads as excluded
3. **AskUserQuestion**: "How many waves to swarm?" with options like:
   - "Wave 1 only (N beads)"
   - "Waves 1–2 (N beads)"
   - "All K waves (N beads)"

### 4. Load bead bodies

For each bead in the selected waves, read its full body:

```
bd show <id>
```

This upfront loading enables:

- Building focused per-agent briefings with sibling awareness
- Warning about potential file overlaps between beads
- Having context for the wrap-up integrity check

**File overlap check**: If two beads in the same wave might touch the same files (inferred from their descriptions — same source directory, same module, etc.), warn the user and suggest running those sequentially.

### 5. Create CC tasks

One **TaskCreate** per bead in the selected waves. Mirror bead dependencies with **addBlockedBy**:

```
TaskCreate:
  subject: <bead title>
  description: "Bead <BEAD_ID> (epic <EPIC_ID>)"
  activeForm: "Working on <bead title>"
```

For beads that depend on other beads also in the swarm, add:

```
TaskUpdate:
  taskId: <dependent-task-id>
  addBlockedBy: [<blocker-task-id>]
```

CC's task system handles execution ordering — only unblocked tasks are dispatched.

### 6. Dispatch subagents

For each unblocked task (wave 1 beads), dispatch a background agent:

```
Task(subagent_type: "general-purpose", run_in_background: true)
```

Use the briefing template below. When a wave completes, check TaskList for newly unblocked tasks and dispatch those.

**All dispatch calls for a wave should be sent in a single message** (parallel tool calls) for maximum concurrency.

## Subagent Briefing Template

Build a focused briefing per agent. Include ONLY what the agent needs:

```
You are completing bead <BEAD_ID> (part of epic <EPIC_ID>) in <REPO_PATH>.

## Your Task
<Inline the full bead body here — no bd show round-trip needed>

## Context
<Predecessor close reason, if relevant — what was built before this bead>
<Relevant design doc excerpt, if applicable>

## Instructions
1. Read the code contract: check existing files/interfaces your task builds on
2. Do the work described in the bead body

<IF --commit true>
3. Commit using parallel-safe pathspec mode:
   ```bash
   git add <new-files>                           # only untracked files
   git commit -m "<bead title>: <summary>" -- <all changed files>
   ```
   If commit fails with index.lock error, sleep 1 and retry (up to 3 times).
<END IF>
<IF --commit false>
3. Do NOT commit. Leave changes in the working directory.
<END IF>

4. Close the bead:
   ```bash
   bd close <BEAD_ID> --reason="<what was actually built>"
   ```
   Follow beads-close-discipline: describe actual result, name artifacts, note divergence.

## Constraints
- Only modify files relevant to this bead. Other agents are running concurrently.
- Do NOT run bd sync, git push, or any session close protocol — the orchestrator handles that.
```

### Briefing Notes

- **Inline bead body**: Saves subagent a `bd show` round-trip. Orchestrator already loaded it.
- **Predecessor context**: Include the close reason of the most relevant predecessor. Helps the agent understand the code it builds on.
- **Design doc excerpt**: If the bead references a design doc, include the relevant section (not the whole doc).
- **Commit instructions**: Only when `--commit true`. The `-- <paths>` suffix triggers git's `--only` mode — critical for parallel safety.
- **No bd prime**: Subagents don't receive SessionStart hooks, so no bd prime output. The briefing IS their sole instruction source.

## Communication Model

Beads are the communication channel, not Task return values:

- **Subagent's job**: Do the work → commit (if --commit true) → `bd close <id> --reason="..."`. That's it.
- **Orchestrator's job at wrap-up**: Read close reasons via `bd show` for each bead.
- **Task return value**: Just a success/failure signal. The meaningful content lives in the bead's close reason.

## Git Commit Mode

### --commit true (default)

Each subagent commits its own work using pathspec mode (see `git:parallel-commit` skill):

```bash
git add <new-files>
git commit -m "<bead title>: <summary>" -- <all changed files>
```

**Required sub-skill**: `git:parallel-commit`

**Non-overlapping files required**: Parallel commits are safe only when agents touch disjoint file sets. If overlap is detected during bead body loading (step 4), warn user and suggest running those beads sequentially.

### --commit false

Subagents skip commits. All changes accumulate as a dirty working directory. The orchestrator handles a single commit at wrap-up.

## Subagent Failure Handling

Subagents do not compact — they hit the 200k token wall and exit non-zero. No recovery, no compaction cycle.

1. **Detection**: Subagent exits non-zero → bead not closed (no --reason). Detect unclosed beads at wrap-up.
2. **Report**: Tell user: "Bead X's agent hit context limit. Bead stays in_progress (claimed, unclosed). Downstream beads remain blocked."
3. **User decides**: Decompose with flo:add and re-swarm, or handle sequentially with flo:next (which has compaction recovery).

## Wrap-Up Protocol

After all tasks complete:

1. **Check failures** — identify unclosed beads (subagent exited non-zero)
2. **Surface interactive beads** — if any beads were filtered out due to `flo/interactive` label (step 3), report them now:
   ```
   ## Needs Interactive Session
   - <bead-id>: <title> — flo/interactive (requires human-in-the-loop)
   ```
   If interactive beads are blocking downstream autonomous beads, flag that explicitly.
3. **Read close reasons** — `bd show <id>` for each closed bead; the close reason IS the result
4. **Downstream integrity check** — for each closed bead, compare close reason against original body:
   - **No divergence?** Continue.
   - **Divergence?** Check downstream beads: `bd dep tree <id> --direction=up --status open`
   - Report findings to user
   - If downstream beads are in later (unexecuted) waves: update them or flag for user decision
5. **Commit** (if `--commit false`): `git add <files> && git commit -m "feat: <epic summary>"`
6. **Epic status**: `bd epic status`
7. **Close-eligible**: if all children done: `bd epic close-eligible`
8. **Sync + push**: `bd sync && git push`

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Skipping bead body loading | Load ALL bodies upfront — enables briefings and overlap detection |
| Overlapping files in same wave | Warn user, suggest sequential for those beads |
| Not mirroring bead deps as task deps | Use addBlockedBy on CC tasks — CC handles execution ordering |
| Subagent running bd sync / git push | Briefing says "skip session close protocol — orchestrator handles" |
| Skipping downstream integrity check | Non-negotiable — same rule as flo:next, runs once at wrap-up |
| Using bd prime in subagent briefing | Subagents don't get SessionStart hooks — briefing IS the instruction |
| Dispatching wave 2 before wave 1 completes | Check TaskList for completed blockers before dispatching next wave |
| Skipping wave computation for small epics | Always compute waves — even 3 beads may have dependencies |
| Suggesting flo:next for single-bead waves | **Never.** Single-bead waves are normal. The value is autopilot across all waves, not within-wave parallelism. Execute it. |
| Pushing back when "nothing to parallelize" | **Never.** The user chose swarm for autopilot execution. Run wave 1 (even 1 bead), then wave 2 unlocks, etc. |
| Dispatching flo/interactive beads to subagents | Filter them out at step 3. Surface them in wrap-up as "needs interactive session." |
| Ignoring interactive beads that block downstream | If a flo/interactive bead is the only blocker for autonomous beads, flag it explicitly in the summary. |
