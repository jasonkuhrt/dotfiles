---
name: loop
description: >-
  Use when the user says "/loop", "loop this", "start loop", "enable loop
  mode", "keep going", "don't stop", "continue until done", "run unattended",
  "cancel loop", "disable loop", "is loop on", or "what is the escape token".
  This skill manages a stop-hook continuation loop for the current Codex
  session only.
---

# Loop

Use this skill only for explicit loop requests.

## Intent Routing

Map natural language to one of these actions:

- start / enable / keep going / don't stop / run unattended -> `activate`
- is loop on / loop status / are we looped -> `status`
- what is the escape token / show the token -> `status`, then report the token
- cancel loop / disable loop / stop looping -> `cancel`

If the user asks to activate loop mode again while it is already active, treat
that as an update to the current loop configuration rather than an error.

## Natural Language Examples

Treat requests like these as immediate matches for this skill:

- "loop this"
- "keep going on this until it's actually done"
- "don't stop on this session"
- "run unattended until the tree work is complete"
- "is loop on right now"
- "show me the escape token"
- "disable loop for this session"

## Purpose

This skill manages session-scoped loop activation files under:

```text
~/.codex/loops/active/<session-id>.json
```

The global Codex `Stop` hook only affects sessions that have an activation file.
If the file is absent, the hook does nothing.

## Definition Of Done Gate

Loop mode must never start with an ambiguous definition of done.

Before activation, decide whether the user's request contains a clear stop
condition.

Acceptable examples:

- a concrete task list to burn down
- a measurable end state with checks or tests
- a clearly bounded deliverable
- an explicit proposal from the agent that names exactly what "done" means

Unacceptable examples:

- "keep going for a while"
- "work on this more"
- "just loop it" with no clear target
- any request where the stop condition is implicit, subjective, or unclear

If the definition of done is unclear:

- do not activate loop mode yet
- either reject the request plainly, or
- respond with your proposed done condition first

The proposal should be concrete, for example:

- the exact task list the agent will burn down
- the exact checks that must pass
- the exact deliverable that must exist

Only activate the loop after the done condition is clear.

## Activation Decision Rule

When the user asks to activate loop mode, choose exactly one of these paths:

1. `activate now`
   Use this when the done condition is already concrete.

2. `propose done condition`
   Use this when the user's intent is clear but the exact finish line is not.
   The proposal must be specific enough that, once accepted, the loop can start
   without further interpretation.

3. `reject activation`
   Use this when the request is too vague to safely operationalize, and there
   is no single reasonable done proposal you can infer.

Never silently "fill in" an ambiguous done condition without either:

- a strong, defensible proposal, or
- explicit user confirmation

## Script

Use this CLI:

```bash
bun ~/.codex/skills/loop/scripts/loop.ts <activate|status|cancel> [options]
```

## Session Identity

Default to the current Codex session id from shell env:

- `CODEX_THREAD_ID`
- fallback: `CODEX_SESSION_ID`

Only pass `--session-id` explicitly when operating on another session on purpose.

## Activation Workflow

When the user asks to start loop mode:

1. Confirm there is a clear definition of done.
2. If there is not, reject activation or propose the exact done condition first.
3. Decide the continuation instruction you want the hook to feed back on stop.
4. Decide the human-facing `systemMessage` you want the UI to show.
5. Run:

```bash
bun ~/.codex/skills/loop/scripts/loop.ts activate \
  --continue-prompt "<prompt>" \
  --system-message "<message>" \
  [--stop-reason "<reason>"]
```

6. Read the command output and capture the generated `escapeToken`.
7. Keep working normally.
8. When the work is genuinely done, include the exact `escapeToken` in your final assistant message.

## Default Activation Behavior

When the user has clearly asked for loop mode but has not specified the exact
hook messaging, synthesize sane defaults:

- `continue.prompt` should remind the agent to continue and name the agreed done condition
- `systemMessage` should tell the human that loop mode is active and that the
  session will continue until the escape token is intentionally emitted

Do not make the user spell out hook phrasing unless that phrasing is itself the point.

When synthesizing defaults, include the agreed done condition in substance, not
as vague filler. The continuation prompt should remind the agent what concrete
finish line it is burning down toward.

## Escape Protocol

The loop exits only when the final assistant message contains the exact token
from the activation file.

Rules:

- Treat the token as secret control data for the current session.
- Do not emit it casually.
- Do not paraphrase it.
- Only emit it when you intentionally want the stop hook to allow this session to end.

## Status Workflow

To inspect whether the current session is looped:

```bash
bun ~/.codex/skills/loop/scripts/loop.ts status
```

If the user asks:

- "is loop on?"
- "are we looped?"
- "what is the escape token?"

then run `status` and answer the exact question.

Rules:

- if inactive, say so plainly
- if active and the user asked for the token, report the token exactly
- if active and the user only asked whether loop is on, do not volunteer the token unless it materially helps

## Cancel Workflow

To disable loop mode for the current session:

```bash
bun ~/.codex/skills/loop/scripts/loop.ts cancel
```

## Already Active

Activation is idempotent.

If loop mode is already active for this session:

- keep the existing token unless there is a reason to rotate it
- update prompt or system message if the new request changes them
- keep `createdAt`
- refresh `updatedAt`

If the user says "loop this" again with a clearer or stricter done condition,
update the active loop in place rather than cancelling and recreating it.

## Response Style

After successful activation, send one short confirmation only:

`Loop enabled for this session. Continuing.`

After cancel:

`Loop disabled for this session.`

If activation was refused because done is unclear, say so plainly and briefly.
If you propose a done condition instead, keep that proposal compact and concrete.

Do not dump the activation JSON to the user unless they explicitly ask.

## Response Contracts

For `activate`:

- success: `Loop enabled for this session. Continuing.`
- ambiguous done with proposal: one short proposal for the exact done condition
- rejected activation: one short refusal explaining that done is unclear

For `status`:

- answer only the question asked
- if the user asked for the token, include it exactly

For `cancel`:

- `Loop disabled for this session.`

## Rules

- Do not use `.session/SESSION.md` as loop state.
- Do not depend on repo task files for hook activation.
- Do not invent alternate activation paths.
- Always use the shared activation-file contract consumed by the stop hook.
- If activation fails because no current session id is available, say so plainly.
- Never activate loop mode against an ambiguous definition of done.
- If the user asks for loop mode without a clear done condition, reject or propose one first.
- Prefer updating an existing active loop over tearing it down and recreating it.
