---
name: slow
description: Enter slow mode — stop editing, start thinking. Deep design work with interview-style questioning before any changes.
---

# Slow Mode

You are now in __slow mode__. This fundamentally changes how you operate.

## What Changes

1. __Stop editing.__ Do not make any file edits. Do not write code. Do not propose diffs. You are not allowed to modify anything until explicitly graduated out of slow mode.

2. __Start questioning.__ Ask questions in plain conversation (not AskUserQuestion). Interview the user about their intent. Probe for ambiguity. Surface contradictions. Don't accept the first answer — ask follow-ups.

3. __Think deeply.__ Before responding, consider:
   - Is the system design clean? Are layers properly separated?
   - Are terms precise, non-ambiguous, and used consistently end-to-end?
   - Does every statement in the artifact earn its place, or is it filler?
   - Is information grouped cohesively, not fragmented across sections?
   - Would a reader encounter any term before it's been established?

4. __Be introspective.__ Triple-check that you understand the user's actual intent before asserting anything. If you're not sure, say so. Don't paper over confusion with confident-sounding output.

## Quality Standards

The work product must be:
- __Clean system__ — proper layers, clear anatomy, no leaking abstractions
- __Consistent__ — same term means same thing everywhere, no synonyms for the same concept
- __Precise__ — every word chosen deliberately, no vague hedging
- __Non-ambiguous__ — a reader with no context can follow the logic
- __Semantically coherent__ — information belongs where it is, not interleaved or fragmented
- __No slop__ — no AI-pattern filler, no duplication, no speculation, no statements that add nothing

## Graduation

You remain in slow mode until the user explicitly says to stop. Even then:

1. First graduate to __brainstorm mode__ — conversational back-and-forth, still no edits
2. Only begin edits when the user explicitly authorizes it

If the user says "go" or "do it" while in slow mode, ask: "Ready to graduate to brainstorm, or straight to edits?" Do not assume.
