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
  - TeamCreate
  - TeamDelete
  - TaskCreate
  - TaskUpdate
  - TaskList
  - TaskGet
  - Agent
  - SendMessage
  - AskUserQuestion
---

# flo:next:swarm

Autopilot execution through an epic using **Agent Teams**. The orchestrator creates a team, sets up tasks mirroring bead dependencies, spawns named teammates, and lets CC's team coordination drive wave progression. Teammates self-serve from the shared task list — completing one task, checking for the next unblocked one, and continuing until the epic is done.

Parallelism within waves is a bonus, not the point. A wave with 1 bead runs that bead as a single teammate. A wave with 5 beads runs all 5 in parallel. Either way, the swarm keeps advancing.

## CRITICAL — Never Push Back

**When the user invokes flo:next:swarm, execute it.** Do not:

- Suggest falling back to flo:next because "only 1 bead is ready"
- Say "there's nothing to parallelize" because wave 1 has a single bead
- Recommend waiting until more beads unblock

Single-bead waves are normal in any dependency DAG. The value of swarming is the **full autopilot execution across all waves**, not just within-wave parallelism.

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
| `--commit` | `true` or `false` | `true` | Whether teammates commit independently |
| `--epic` | bead ID | *(auto-detect)* | Override epic resolution |

## Quick Reference

| Phase | Steps |
|-------|-------|
| Entry | context.sh → epic fields → design docs → waves.sh → wave selection |
| Prepare | Load bead bodies → build briefings → warn on file overlap |
| Execute | TeamCreate → TaskCreate per bead → spawn teammates → teammates self-serve |
| Wrap-up | Check failures → read close reasons → downstream integrity → shutdown teammates → TeamDelete → commit (if --commit false) → epic status → sync → push |

## Orchestrator Protocol

The orchestrator (this session) should be thin: epic context + team management. Invoke this skill early in a session or as a fresh session, not after heavy exploration.

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

### 5. Load bead bodies

For each bead in the selected waves, read its full body:

```
bd show <id>
```

This upfront loading enables:

- Building focused per-teammate briefings with sibling awareness
- Warning about potential file overlaps between beads
- Having context for the wrap-up integrity check

**File overlap check**: If two beads in the same wave might touch the same files (inferred from their descriptions — same source directory, same module, etc.), warn the user and suggest running those sequentially.

### 6. Create team and tasks

#### Create the team

```
TeamCreate:
  team_name: <epic-id>
  description: "Epic: <epic title>"
```

This creates the team and its shared task list.

#### Create tasks

One **TaskCreate** per bead in the selected waves. Mirror bead dependencies with **addBlockedBy**:

```
TaskCreate:
  subject: "[<BEAD_ID>] <bead title>"
  description: <full bead body — inline from step 5>
```

For beads that depend on other beads also in the swarm:

```
TaskUpdate:
  taskId: <dependent-task-id>
  addBlockedBy: [<blocker-task-id>]
```

CC's task system handles execution ordering — only unblocked tasks are available to claim.

**Task-to-bead mapping**: Include the bead ID in the task subject (e.g., `[dotfiles-vbfc.1] Convention engine`). This lets teammates identify which bead they're working on.

### 7. Spawn teammates

Spawn one named teammate per **wave-1 bead** (unblocked tasks). Each teammate joins the team and self-serves from the shared task list.

```
Agent:
  team_name: <epic-id>
  name: <bead-slug>            # e.g., "convention-engine", "script-runner"
  subagent_type: "general-purpose"
  prompt: <teammate briefing>  # see template below
```

**Spawn all wave-1 teammates in a single message** (parallel tool calls) for maximum concurrency.

**Do NOT spawn teammates for later waves upfront.** Teammates self-serve — when a wave-1 teammate completes its task, it checks `TaskList` and claims the next unblocked task automatically. The team scales naturally through the dependency graph.

**Teammate count**: Spawn one teammate per wave-1 bead. If wave-1 has 1 bead, spawn 1 teammate. If it has 4, spawn 4. Teammates persist across waves — they claim new tasks as they become unblocked.

## Teammate Briefing Template

Build a focused briefing per teammate. This is their sole instruction source — teammates don't receive SessionStart hooks or bd prime.

```
You are a teammate on team "<TEAM_NAME>" completing beads for epic <EPIC_ID> in <REPO_PATH>.

## How You Work

1. Your first task is already assigned: [<BEAD_ID>] <bead title>
2. Read the task description (TaskGet) for the full bead body
3. Do the work described in the bead
<IF --commit true>
4. Commit using parallel-safe pathspec mode:
   ```bash
   git add <new-files>                           # only untracked files
   git commit -m "<bead title>: <summary>" -- <all changed files>
   ```
   If commit fails with index.lock error, sleep 1 and retry (up to 3 times).
<END IF>
<IF --commit false>
4. Do NOT commit. Leave changes in the working directory.
<END IF>
5. Close the bead:
   ```bash
   bd close <BEAD_ID> --reason="<what was actually built>"
   ```
   Follow beads-close-discipline: describe actual result, name artifacts, note divergence.
6. Mark your task completed: TaskUpdate(taskId: <id>, status: "completed")
7. Check TaskList for the next unblocked, unowned task
8. If one exists: claim it (TaskUpdate with owner: "<your-name>"), read its description, and repeat from step 3
9. If none exist: send a message to the orchestrator saying you're done, then go idle

## Context
<Predecessor close reason, if relevant — what was built before this bead>
<Relevant design doc excerpt, if applicable>

## Constraints
- Only modify files relevant to your current bead. Other teammates are running concurrently.
- Do NOT run `bd dolt pull`, `bd dolt push`, `git push`, or any session close protocol — the orchestrator handles that.
- Refer to teammates by NAME when messaging.
- After completing each task, always check TaskList before going idle.
```

### Briefing Notes

- **First task pre-assigned**: The orchestrator assigns the wave-1 task to each teammate via TaskUpdate(owner) before spawning. The briefing tells the teammate what to start on.
- **Self-serve continuation**: After completing their first task, teammates check TaskList autonomously. No orchestrator dispatch needed for subsequent waves.
- **Predecessor context**: Include the close reason of the most relevant predecessor. Helps the agent understand the code it builds on.
- **Design doc excerpt**: If the bead references a design doc, include the relevant section (not the whole doc).
- **Commit instructions**: Only when `--commit true`. The `-- <paths>` suffix triggers git's `--only` mode — critical for parallel safety.

## Communication Model

Teams provide bidirectional communication via SendMessage:

- **Teammate → orchestrator**: Teammates send messages when done or when hitting blockers. Delivered automatically.
- **Orchestrator → teammate**: Use `SendMessage(type: "message", recipient: "<name>")` for targeted instructions.
- **Broadcast**: Use `SendMessage(type: "broadcast")` only for critical team-wide issues (e.g., "stop all work, blocking bug found"). Expensive — costs scale with team size.
- **Beads remain the record**: Close reasons via `bd close --reason` are the durable output. Messages are ephemeral coordination.

## Git Commit Mode

### --commit true (default)

Each teammate commits its own work using pathspec mode:

```bash
git add <new-files>
git commit -m "<bead title>: <summary>" -- <all changed files>
```

**Non-overlapping files required**: Parallel commits are safe only when teammates touch disjoint file sets. If overlap is detected during bead body loading (step 5), warn user and suggest running those beads sequentially.

### --commit false

Teammates skip commits. All changes accumulate as a dirty working directory. The orchestrator handles a single commit at wrap-up.

## Failure Handling

Teammates don't compact — they hit the context limit and exit. The orchestrator detects this via unclosed beads.

1. **Detection**: Teammate exits → bead not closed (no --reason). Detect unclosed beads at wrap-up.
2. **Report**: Tell user: "Bead X's teammate hit context limit. Bead stays in_progress. Downstream beads remain blocked."
3. **User decides**: Decompose with flo:add and re-swarm, or handle sequentially with flo:next (which has compaction recovery).

## Wrap-Up Protocol

The orchestrator monitors team activity. When all teammates are idle and no unblocked tasks remain:

1. **Check failures** — identify unclosed beads (teammate exited or timed out)
2. **Surface interactive beads** — if any beads were filtered out due to `flo/interactive` label, report them:
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
5. **Shutdown teammates** — `SendMessage(type: "shutdown_request")` to each active teammate. Wait for shutdown responses.
6. **Delete team** — `TeamDelete` (removes team + task dirs)
7. **Commit** (if `--commit false`): `git add <files> && git commit -m "feat: <epic summary>"`
8. **Epic status**: `bd epic status`
9. **Close-eligible**: if all children done: `bd epic close-eligible`
10. **Clean up flo state**: if epic is closed, delete `.flo/state.yml` so the next swarm/flo:next auto-bootstraps fresh
    ```bash
    rm -f "$(git rev-parse --show-toplevel)/.flo/state.yml"
    ```
11. **Persist + push**: `bd dolt push && git push`

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Skipping bead body loading | Load ALL bodies upfront — enables briefings and overlap detection |
| Overlapping files in same wave | Warn user, suggest sequential for those beads |
| Not mirroring bead deps as task deps | Use addBlockedBy on CC tasks — teammates need this for self-serve ordering |
| Teammate running bd dolt pull/push or git push | Briefing says "orchestrator handles that" |
| Skipping downstream integrity check | Non-negotiable — runs once at wrap-up |
| Spawning teammates for all waves upfront | Only spawn wave-1 teammates. They self-serve into later waves via TaskList |
| Spawning more teammates than wave-1 beads | One teammate per wave-1 bead. They persist and pick up later work |
| Forgetting to shutdown teammates before TeamDelete | TeamDelete fails with active members. Send shutdown_request first |
| Skipping TeamDelete | Always clean up — team + task dirs persist otherwise |
| Suggesting flo:next for single-bead waves | **Never.** Single-bead waves are normal. Execute it. |
| Pushing back when "nothing to parallelize" | **Never.** The user chose swarm for autopilot. Run it. |
| Dispatching flo/interactive beads to teammates | Filter them out at step 3. Surface in wrap-up. |
| Using broadcast for routine updates | Only broadcast for critical team-wide issues. Use targeted messages otherwise. |
| Not pre-assigning wave-1 tasks | Assign each wave-1 task to its teammate via TaskUpdate(owner) before spawning |
