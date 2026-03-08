---
name: beads:offload
description: Use when the user or conversation veers into an adjacent idea worth tracking. Captures the idea as a bead without derailing the current task.
---

# Offload

Park an adjacent idea as a bead (`bd create`) and return to current work immediately.

## Invocation Modes

**Agent-invoked** (you noticed a tangent):

* You already have context. Propose in one prompt: "Offload? [proposed title]. Priority?"
* User confirms/adjusts -> create bead immediately

**User-invoked** (`/beads:offload`):

* If recent conversation makes the idea obvious: propose like agent-invoked
* If unclear, ask:
  ```
  What idea do you want to offload?

  Priority?
  - P1: fast-follow, next session or soon
  - P2: near-term, this week/month
  - P3: someday, no rush
  - P4: backlog, parking it
  ```
* If user provides idea but not priority: infer from context or ask once

## Detecting Idea Count

Check if input contains obviously distinct ideas. NOT scrum epic breakdown -- just major fault lines.

**Default**: Err on side of one bead. Faster workflow, non-lossy capture means it can always be split later.

* "Migrate to tsgo, and that reminds me I wanted to build an AST parser" -> 2 beads
* "Add dark mode with a toggle in settings and persistence" -> 1 bead
* "Refactor the auth module" -> 1 bead

## Execution

For each idea:

1. Determine type (`feature`, `task`, or `bug`) and priority (P1-P4)
2. Determine if the offloaded idea is **actionable** (autonomous-safe) or **needs discussion** (interactive). Default to `flo/interactive` for offloads — tangents are usually half-formed ideas needing human refinement. Skip the label only if the idea is clearly a concrete, self-contained task an agent could execute without human input.
3. Extract session ID from tool results path: `~/.claude/projects/<hash>/<id>.jsonl`
4. Run:
   ```bash
   bd create \
     --title="<concise title>" \
     --type=<type> \
     --priority=<0-4> \
     --labels="flo/interactive" \
     --description="<full idea text, non-lossy>

   ---
   Offloaded from CC session: <session-id>
   Context: <what we were working on>"
   ```
   Omit `--labels="flo/interactive"` only if step 2 determined the idea is autonomous-safe.
5. Acknowledge using template below

## Acknowledgment

```
[OFFLOADED - pick one]
  Single:   Offloaded: <title> (P<n>)
  Multiple: Offloaded <N> ideas:
            1. <title1> (P<n>)
            2. <title2> (P<n>)

[REWIND - include when tangent consumed notable context window]
Rewind: Esc+Esc -> <suggested rewind point> -> "Conversation only"

[RESUME - always]
Continuing with <previous task>...
```

## Principles

* **Non-lossy capture**: Preserve the user's full thought. Do not summarize away detail.
* **Don't elaborate**: Park the idea, don't expand it.
* **Return quickly**: Acknowledge briefly and continue.
* **Session trace**: Always append session ID to the bead description.
