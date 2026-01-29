---
name: flo:next
description: >
  Use when continuing work on a multi-session epic, starting a new agent
  session on an existing epic, or when told to work on the next bead.
allowed-tools:
  - Read
  - Bash(bd:*)
  - Bash(bash:*)
  - Bash(git:*)
---

# flo:next

Work through an epic one bead at a time with full chain awareness. Additive to beads session protocol — this skill adds epic-scoped chain tracing and downstream plan integrity checking.

## When to Use

- Continuing a multi-session epic (1-3 concurrent agents)
- Starting a new session on an existing epic branch
- Told to "pick up the next bead" or "continue the epic"

**Not for:** Single-bead standalone tasks (no epic parent), exploratory work not tracked in beads.

## Requirements

- `bd` CLI (beads plugin active)
- `jq` (used by context.sh)
- Git repo on a feature branch with issue key (e.g. `feature/hea-3849-*`)
- Epic must have `--external-ref` set to the issue key

## Quick Reference

| Phase        | Steps                                                                                                       |
| ------------ | ----------------------------------------------------------------------------------------------------------- |
| Entry (cold) | context.sh → epic fields → design docs → choose bead → trace chain → read bead + claim → read code contract |
| Entry (hot)  | sync → context.sh --hot → check new predecessors → choose bead → read bead + claim → read code contract     |
| Exit         | close with result → check downstream → update epic context → git commit + push                              |

## Key `bd` Commands

| Command                                                       | Purpose                                                                                    |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `bd ready --unassigned --parent <epic>`                       | **Authoritative** list of unclaimed, unblocked beads — the ONLY source for selectable work |
| `bd blocked --parent <epic>`                                  | Blocked beads with their blockers — informational only                                     |
| `bd graph <epic> --compact`                                   | Dependency graph with layers and status icons — show to user for orientation               |
| `bd show <id>`                                                | Full bead details (body, acceptance, design, notes)                                        |
| `bd comments <id>`                                            | Comments on a bead                                                                         |
| `bd update <id> --claim --actor "u/s"`                        | **Atomic claim** with session identity; fails if already claimed                           |
| `bd close <id> --reason "..." --session <sid> --suggest-next` | Close with result, record session, show unblocked beads                                    |
| `bd dep tree <id> --direction=up --status open`               | Downstream beads that depend on this one (for integrity check)                             |
| `bd comments add <id> "..."`                                  | Add session learnings                                                                      |

## CRITICAL — Downstream Plan Integrity

**This is the core value of flo:next.** When closing a bead whose resolution differs from its original body — because human-in-the-loop changed scope, because you discovered a constraint, because the work naturally evolved — you MUST check downstream beads for cascading implications.

**The rule:**

1. Compare your close reason against the bead's original body
2. If they diverge: run `bd dep tree <id> --direction=up --status open` to get all downstream beads that depend on this one
3. For each downstream bead, assess: does this change affect its body, acceptance criteria, or feasibility?
4. **If you are confident** the downstream impact is clear and mechanical (e.g., a rename, a symbol that moved): propose the updates and apply them after user confirmation
5. **If you are NOT confident** — if there is ANY ambiguity about how the change cascades — you MUST:
   - Report every downstream bead you think is affected
   - Describe the specific concern for each
   - Suggest fixes if you have them
   - **STOP and wait for user input**
   - NEVER silently ignore a potential downstream misalignment
   - NEVER force-fit the situation into apparent alignment

**Why this is non-negotiable:** Late-stage discovery that an epic has gone off the rails wastes all prior work. Short-circuit at the first sign of plan drift. If the user pushes back on stopping, remind them: this is the only sane way to develop with agents on non-trivial epics at scale.

## Entry Protocol

### Hot next (same session, next bead)

If you just completed a bead and are taking the next one **without clearing context**, use the lighter hot path. Epic fields and design docs are already in your window.

```
bd sync --import 2>/dev/null
bash ~/.claude/skills/flo_next/scripts/context.sh --hot
```

**Always sync before hot next.** Other agents may have closed beads, added comments, or changed dependencies since you started working. `bd sync --import` pulls their changes so the context dump reflects current state.

The hot output includes: recently closed beads (with timestamps), dependency graph, ready list, claimed list, and blocked list — all fetched fresh from `bd`. Then jump to **step 4** (choose bead).

You may skip steps 2 and 3 (epic fields and design docs are already in your window). **Do NOT skip step 5** (trace chain) — if another agent closed a bead while you were working, there is a new predecessor you haven't seen. Check the RECENTLY CLOSED section for any beads closed since your session started. If you see new ones, read their close reasons before choosing your next bead.

---

### 1. Load context (cold entry)

```
bash ~/.claude/skills/flo_next/scripts/context.sh
```

Outputs: epic metadata + all fields, epic comments, completed chain with close reasons, latest predecessor details (comments/design/notes), dependency graph, ready/blocked/in-progress children.

If branch detection fails, pass explicitly: `bash scripts/context.sh --epic <id>`

### 2. Read epic fields (MANDATORY every session)

These fields carry cross-session context. Read all of them:

- **design** → follow its pointer to the issue directory (feeds step 3)
- **notes** → constraints and conventions set by the epic author
- **comments** → session learnings from all prior agents (already in context dump)

### 3. Read design docs

Follow the epic's DESIGN pointer:

1. Read the issue dir's `README.md` — it explains the directory structure
2. Read files it calls out as prerequisites (e.g., `terminology.md`)
3. _(Task-specific design doc read happens after choosing a bead in step 5)_

### 4. Choose bead (interactive)

Present the epic state to the user:

1. **Show the dependency graph** from the context dump (`bd graph` output) — this gives the user a visual map of the epic's structure and progress
2. **Show the ready, claimed, and blocked sections** from the context dump
3. **Use AskUserQuestion with ONLY ready beads as options** (up to 4, priority-sorted). The READY section of the context dump (sourced from `bd ready --unassigned --parent`) is the **sole authority** for what appears as a selectable option.
4. If no ready beads: report to user — either all are blocked (show blockers), all are claimed (show who claimed them), or the epic is complete

**NEVER offer claimed, blocked, or in-progress beads as AskUserQuestion options.** They are shown for situational awareness only:

- **Claimed** beads have an assignee and are being worked on by another agent session
- **Blocked** beads have unsatisfied dependencies — they cannot be worked on yet

If the user explicitly asks to override (e.g., work on a claimed or blocked bead anyway), that's their call — but the default presentation must only offer unclaimed, unblocked work.

### 5. Trace the chain

For the chosen bead's most recent closed predecessor:

1. Read its **close reason** (already in context dump) — what was actually built
2. Read its **comments, design, notes** (`bd show <id>` + `bd comments <id>`) for implementation decisions the close reason may not capture
3. If the close reason references specific files or patterns, read those — they establish the contract your task builds on

The context dump pre-fetches the most recently closed child as the optimistic predecessor. If your chosen bead has a different predecessor (e.g., it depends on a specific sibling, not the latest), fetch that one instead.

You don't need to trace the entire chain — the immediate predecessor is usually sufficient. Go deeper only if the predecessor's close reason references decisions made in earlier beads, or if its close reason is sparse and its comments/design/notes don't fill the gap.

### 6. Read your bead + claim it

```
bd show <id>            # Full body, acceptance, design, notes
bd update <id> --claim --actor "<user>/<session-prefix>"
bd comments add <id> "claimed by session <full-session-id>"
```

**Claim identity:** Your session ID is the UUID from the session start message (the `--resume` value, e.g. `e65f21da-49c5-4bf9-8a2f-dc723444d3af`).

- **Assignee** (short, current holder): `--actor "<git user.name>/<first 8 chars>"` — e.g. `"Jason Kuhrt/e65f21da"`
- **Comment** (full audit trail): log the complete session UUID so any future session can trace back or resume

Multiple sessions may touch the same bead (hand-offs, retries). Each adds a comment — the history accumulates naturally.

Use `--claim`, NOT `--status in_progress`. The `--claim` flag atomically sets assignee + in_progress and fails if already claimed. If the claim fails, go back to step 4 and pick a different bead.

Cross-reference the bead body against the terminology/design docs. If the bead uses stale terms (written before a terminology audit, for example), use the design docs as the authority.

Now read the task-specific design doc (deferred from step 3).

### 7. Read the code contract

Read the stub or interface your task replaces. Read the most recent predecessor's implementation for established patterns (imports, component structure, mutation flow).

## Exit Protocol

### 1. Close with actual result

Apply the beads close discipline rules (see `beads-close-discipline` rule file):

- Describe what was **actually achieved**
- If it diverged from the bead body, state the delta and why
- Name key artifacts (files, symbols, patterns)

### 2. Check downstream integrity

This is the CRITICAL section above. Do it now, before moving on.

Compare your close reason against the original bead body:

- **No divergence?** Proceed to step 3.
- **Divergence detected?** Scan downstream beads. Report findings. Wait for user if uncertain.

### 3. Update epic context (if session produced learnings)

If this session produced decisions, discoveries, or convention changes that future sessions should know:

```
bd comments add <epic-id> "Session: <what was learned or decided>"
```

### 4. Standard close

```
git add <files> && git commit -m "..."
bd close <id> --reason "..." --session <full-session-id> --suggest-next
bd sync
git push
```

- `--session` records which Claude Code session closed this bead (first-class field, separate from comments)
- `--suggest-next` shows newly unblocked beads after closing — feeds directly into hot path if continuing

## Common Mistakes

| Mistake                                  | Fix                                                                 |
| ---------------------------------------- | ------------------------------------------------------------------- |
| Offering claimed/blocked as options      | ONLY `bd ready --unassigned` output goes into AskUserQuestion       |
| Skipping the dependency graph            | Always show `bd graph` output — the user needs the visual map       |
| Hand-rolling a ready list                | Use `bd ready --parent` — it is authoritative; never reimplement it |
| Assuming hot path = skip chain trace     | Other agents may have closed beads — check for new predecessors     |
| Skipping sync before hot next            | Always `bd sync --import` before hot path — state may have changed  |
| Skipping chain trace                     | Always read predecessor's close reason before starting              |
| Closing without downstream check         | The CRITICAL section is non-negotiable — do it every time           |
| Using stale terminology                  | Design docs are authority over bead body text                       |
| Using `--status in_progress` to claim    | Use `--claim` — it's atomic and sets assignee; `--status` does not  |
| Ignoring epic comments                   | Epic comments carry session learnings — read them at entry          |
| Reading only close_reason on predecessor | Also check comments, design, notes for implementation decisions     |
| Skipping bead selection with user        | Always present options via AskUserQuestion — user chooses           |

## Notes

- This skill layers on top of the beads session protocol. It does not replace `bd ready`, `bd sync`, or the session close checklist — it adds chain tracing and plan integrity checking.
- Git commit/push permissions come from the beads session protocol, not this skill's `allowed-tools`.
- The context script is zero-token when the agent reads the stdout. The script source is never loaded.
- For parallel agent sessions (1-3 concurrent), each agent runs its own `flo:next` entry. The `--claim --actor` flag is the concurrency primitive — it atomically sets assignee + status and fails if another agent already claimed the bead. Each agent uses its session ID (from the conversation start message) to form a unique actor identity: `<git user.name>/<session-id-first-8-chars>`.
