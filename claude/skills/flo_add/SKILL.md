---
name: flo:add
description: >
  Creates beads as children of the active epic. Use when creating beads during feature work
  to prevent orphaned beads. Triggers on "add a bead", "create a task for", "track this as a bead",
  or /flo:add.
allowed-tools:
  - Read
  - Bash(bd:*)
  - Bash(bash:*)
  - Bash(git:*)
---

# flo:add

Create beads that are always parented to the active epic. Prevents orphaned beads by resolving the epic first and refusing to create without a parent. Enforces bead quality so future agents can pick up the work without rebuilding context.

## When to Use

- Creating beads during feature work on an epic branch
- Agent discovers work that needs tracking as a child of the current epic
- Batch creation of multiple related beads

**Not for:** Standalone beads with no epic context (use `bd create` directly), offloading tangent ideas (use `beads:offload`).

## CRITICAL — Bead Sizing

Every bead must complete within a single agent session (~165k token window) with no compaction. This is an economic and quality constraint, not a preference:

- **Each agent turn compounds cost.** A bead that takes 40 turns costs exponentially more than two beads that take 15 turns each.
- **Agent quality degrades with context length.** The further into a session, the more likely the agent drifts, hallucinates, or loses the thread.
- **Compaction destroys context.** If a bead forces compaction, the agent loses the very context it spent tokens acquiring. This is the worst outcome — high cost AND low quality.

Well-factored bite-size beads are the bedrock strategy: fast completion, high quality, low cost. Never trade quality for speed — use AI to enhance quality — but always decompose to reach that quality optimally.

### Sizing Heuristic

Ask: **can a fresh agent read the bead, explore the relevant code, implement, and verify — all within ~120k tokens of working budget?** (~45k reserved for system prompt, skill loading, project context, and bead description itself.)

| Signal                 | Likely fits                                | Decompose                                  |
| ---------------------- | ------------------------------------------ | ------------------------------------------ |
| Files touched          | 1-4                                        | 5+                                         |
| Modules involved       | 1-2                                        | 3+                                         |
| Concepts to understand | Narrow, well-defined                       | Requires understanding multiple subsystems |
| Implementation steps   | Linear, sequential                         | Branching, requires backtracking           |
| Test surface           | Focused unit/integration                   | Broad E2E across layers                    |
| Exploration needed     | Knows where to look (paths in description) | Needs to discover structure                |

### Decomposition Rules

When a bead is too large, split it:

1. **Split by layer** — API endpoint, service logic, frontend component, tests become separate beads
2. **Split by concern** — validation vs. execution vs. error handling vs. UI feedback
3. **Split by data flow** — input parsing, transformation, persistence, notification
4. **Each sub-bead must be independently verifiable** — it produces a testable artifact, not a "partial implementation" that only works when combined with siblings
5. **Wire dependencies** — if bead B needs bead A's output, set `--deps`. This makes ordering explicit and lets `bd ready` manage flow.

**Anti-pattern: "Part 1 / Part 2" beads.** If the split produces beads that can't be verified in isolation, the decomposition is wrong. Find a different seam.

### When NOT to Decompose

- The bead is already small but touches 5 files because it's a cross-cutting rename or config change — that's fine, the work is mechanical
- The bead's complexity is in understanding, not volume — reading 10 files to make a 3-line fix is fine if the description captures the understanding

## CRITICAL — Bead Quality

Context is cheap to write now and ruinously expensive for a future agent to reconstruct. Every bead created through this skill must be **self-contained**: an agent in a fresh session with no prior context should be able to read the bead and start working without asking questions or exploring the codebase to understand what's needed.

### Required Description Elements

Every bead MUST include all of these in its `--description`:

| Element                                                         | Why                                                                     |
| --------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **What** — concrete deliverable                                 | Future agent needs to know what "done" looks like                       |
| **Why** — motivation/context                                    | Without this, agents make wrong trade-offs                              |
| **Where** — file paths, symbols, modules                        | Eliminates exploration cost; you know this now, they won't              |
| **How** (if non-obvious) — approach, patterns to follow         | Prevents agents from reinventing or deviating from established patterns |
| **Siblings** — related beads in the epic                        | "See also Heartbeat-xxx which handles the API side"                     |
| **Contracts** — inputs/outputs this bead depends on or produces | What does this bead consume? What must it expose for downstream beads?  |

### Quality Checklist (apply before creation)

Before running `bd create`, verify:

1. **Could a fresh agent start from this description alone?** If you'd need to "also read file X" or "check how Y works" — put that information IN the description.
2. **Are file paths absolute from repo root?** Not "the migration service" but `apps/api/src/services/migration/execute.ts`.
3. **Are symbol names included?** Not "the validation function" but `validateSubscriptionRow()` in `apps/api/src/services/migration/validate.ts`.
4. **Are related sibling beads referenced?** Check `bd list --parent <epic> --limit 0` — if another bead touches the same area, mention it.
5. **Are dependencies set?** If this bead can't start until another finishes, use `--deps <id>` at creation time.

### Description Template

```
<What this bead delivers — 1-2 sentences>

## Context
<Why this work exists. What problem it solves. What user story or spec requirement it addresses.>

## Location
- <repo-root-relative file paths>
- Key symbols: <function/class/type names>
- Related module: <path>

## Approach
<How to implement. Patterns to follow. Existing code to mirror. Decisions already made.>

## Dependencies & Relations
- Depends on: <bead-id> (<why>)
- Related: <bead-id> (<what it handles>)
- Produces: <what downstream beads expect from this>

## Acceptance
- <Concrete, testable criterion>
- <Another criterion>
```

Not every section is needed for every bead — a trivial bug fix may only need What + Location + Acceptance. But **err on the side of too much context**. A 500-word description that saves a future agent 20 minutes of exploration is a good trade.

## Invocation Modes

### With arguments — user provides seed context

```
/flo:add --title="Fix Step 7 retry button" --type=bug --priority=1
/flo:add --title="Add CSV column mapping" --type=feature --description="..."
```

Use the provided args as a starting point. Still apply context harvesting (below) — the user's args are the seed, the conversation is the soil.

### With free text — user describes the need informally

```
/flo:add the validation logic doesn't handle negative amounts
/flo:add we need a retry mechanism for the PAN copy step
```

Parse the free text to derive title, type, priority, and description seed. Use conversation context to fill in the rest.

### Bare — no arguments, harvest from conversation

```
/flo:add
```

The user is mid-conversation and wants to capture what they're looking at as a bead. The conversation already contains the trigger. Scan recent messages for:

- Bug just found → type=bug
- Missing feature noticed → type=feature
- Refactor/cleanup needed → type=task or chore

**If the intent is clear from context:** Propose a title and type. Confirm with the user only if ambiguous.

**If the context is ambiguous or sparse:** Ask the user to clarify. Don't guess blindly — but also don't ask what's already obvious from the last few messages.

### Agent-invoked — agent discovers work mid-task

When the agent itself triggers this skill (not from `/flo:add`), it already has full context. Skip confirmation unless scope is unclear — just harvest, draft, and present the proposed bead for user approval before creating.

## Context Harvesting

When this skill is invoked, the agent is usually mid-session with rich context about the work that triggered the bead creation — a bug just found, a missing feature just noticed, a refactor need just identified. **This context is the most valuable input to the bead and it's about to be lost.**

Before doing anything else, harvest from the current conversation:

1. **What triggered this?** What was the agent doing when the need was discovered? What file, function, or behavior revealed the gap?
2. **What does the agent already know?** File paths, symbol names, error messages, patterns observed, related code — all of this is already in the context window. Extract it.
3. **What was the user's intent?** The user's words when they asked for the bead — their mental model of the problem — is signal. Capture it, don't paraphrase it away.
4. **What adjacent decisions were made?** If the current session made design decisions that constrain this new work, record them.

This harvested context feeds directly into the description (step 4). The agent should not ask the user to re-explain what they just said — it's already in the conversation. Use it.

## Steps

### 1. Resolve the epic

```bash
bash ~/.claude/skills/flo_add/scripts/resolve-epic.sh
```

Resolution cascade:

1. Explicit `--epic <id>` argument (from `/flo:add --epic Heartbeat-2az ...`)
2. Branch name → issue key (e.g. `feature/hea-3849-research` → `HEA-3849`)
3. `.issues/` directory scan

**If resolution fails:** STOP. Do not create the bead. Report the failure and suggest `--epic <id>`.

### 2. Survey siblings

```bash
bd list --parent <epic-id> --limit 0
```

Check for beads that touch the same area. Note any that should be:

- Referenced in the new bead's description ("Related: ...")
- Set as dependencies (`--deps <id>`)
- Set as dependents (run `bd dep add <new-id> <depends-on-id>` after creation)

### 3. Size check and decompose if needed

Before writing the description, apply the sizing heuristic. Mentally walk through what an agent would need to do:

1. How many files would it read?
2. How many files would it modify?
3. How many modules does it need to understand?
4. Can the result be verified in isolation?

**If it's too large:** Decompose into sub-beads using the decomposition rules. Each sub-bead goes through this entire skill workflow independently (steps 3-6). Wire dependencies between them.

**If it fits:** Proceed to draft the description.

### 4. Draft and review the description

Start from the harvested context (see Context Harvesting above). The conversation already contains the trigger, the file paths, the user's intent, and adjacent decisions — weave all of that into the description using the template. Apply the quality checklist.

If the user provided a terse title/description (e.g. "track that as a bug"), expand it using what you already know from the session. You have the context — the user shouldn't need to repeat themselves. Ask the user to confirm if you're unsure about scope, but never create a thin bead just because the input was thin.

### 5. Create the bead

```bash
bash ~/.claude/skills/flo_add/scripts/create-child.sh <epic-id> --title="..." --type=... --priority=... --description="..." [--deps <id>]
```

The script wraps `bd create` and automatically appends `--parent <epic-id>`. Accepts all `bd create` flags.

### 6. Set post-creation dependencies

If the new bead blocks or is blocked by siblings that you identified in step 2 but couldn't set with `--deps` at creation:

```bash
bd dep add <new-bead-id> <depends-on-id>
```

### 7. Confirm

Report to user:

```
Created <bead-id> as child of epic <epic-id>
  Title: <title>
  Type: <type> | Priority: P<n>
  Dependencies: <ids or "none">
  Related: <sibling ids mentioned in description>
```

## Batch Creation

When creating multiple beads, resolve the epic once (step 1), survey siblings once (step 2), then run steps 3-5 for each bead. Set inter-batch dependencies after all beads exist. Report all results together:

```
Created 3 beads as children of epic Heartbeat-2az:
  1. Heartbeat-xxx: Fix Step 7 retry button (bug, P1)
     deps: Heartbeat-yyy
  2. Heartbeat-yyy: Add migration history view (feature, P2)
  3. Heartbeat-zzz: Write CSV parsing tests (task, P2)
     related: Heartbeat-xxx, Heartbeat-yyy
```

## Argument Parsing

`/flo:add` arguments map directly to `bd create` flags:

| Argument              | Maps to                                               |
| --------------------- | ----------------------------------------------------- |
| `--title="..."`       | `bd create --title="..."`                             |
| `--type=bug`          | `bd create --type=bug`                                |
| `--priority=1`        | `bd create --priority=1`                              |
| `--description="..."` | `bd create --description="..."`                       |
| `--deps <id>`         | `bd create --deps <id>`                               |
| `--epic <id>`         | Epic override (consumed by resolve, not passed to bd) |

Everything else passes through to `bd create` unchanged.

If `--description` is missing or terse (under ~50 words), the agent MUST expand it using the template before creation. A title is not a description.

## Common Mistakes

| Mistake                               | Fix                                                            |
| ------------------------------------- | -------------------------------------------------------------- |
| Creating bead then attaching after    | Use this skill — parent is set at creation                     |
| Using `bd dep add` for parenting      | Dependencies ≠ parenting. `--parent` is hierarchical ownership |
| Creating without resolving epic first | Script refuses — resolution is mandatory                       |
| Passing `--parent` manually           | Script rejects double-parenting to prevent confusion           |
| Thin descriptions ("Fix the button")  | Apply quality checklist — include what, why, where, how        |
| Missing sibling references            | Survey siblings first — related beads must cross-reference     |
| Skipping dependency wiring            | If order matters, set `--deps` — don't leave it implicit       |
| "I'll add context later"              | You won't. Your session will end. Write it now.                |
| Mega-bead that spans layers           | Decompose — split by layer, concern, or data flow              |
| "Part 1 / Part 2" split               | Each bead must be independently verifiable. Find a better seam |
| No size check before creation         | Always run the sizing heuristic at step 3                      |
