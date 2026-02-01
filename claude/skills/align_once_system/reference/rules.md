# System Review Rules

## Purpose

Force a full architectural justification of the current approach. This is not a status update — it's a defense. You are an architect being asked to prove this is the right design.

## Context

This is typically invoked when something smells off — the user suspects the current direction may be wrong, over-engineered, or missing a simpler path. Treat this as constructive skepticism, not confirmation-seeking.

## Review Dimensions

Cover these dimensions, adapting depth and emphasis to the situation. Merge or abbreviate dimensions that are obvious; expand those that are contested or subtle.

### Provenance
How did you arrive at this approach? Trace the decision chain from the original problem to the current solution. Name the key decision points.

### Problem Statement
What is the original problem? Restate it cleanly, stripped of implementation assumptions. If the problem has drifted from the original ask, call that out.

### Alternatives Considered
What else was on the table? For each meaningful alternative, state why it was rejected. Be honest — if you didn't consider alternatives, say so.

### Justification
Why is this the best approach? Ground the argument in concrete properties: simplicity, consistency with existing patterns, correctness, maintainability. Avoid vague appeals to "best practices."

### Tradeoffs
What does this approach cost? What does it make harder? What assumptions does it bake in? Name the risks.

### Intended Changes and Data Flows
Show the design visually. Use the format that communicates best for the situation:
- D2 diagrams for architectural flows
- Before/after code for targeted changes
- Pseudo-diffs for file-level modifications
- Sequence descriptions for multi-step processes

### Existing Design Context
Check for existing tech design docs, prior conversation context, or design decisions in the codebase that relate to this area. Reference them explicitly. If none exist, state that.

## Constraints

All read-only constraints from `/align` apply — no edits, no state changes, read-only tools only, scratch files are fine.

## Tone

Be direct and self-critical. If the current approach has weaknesses, name them before the user has to. The goal is intellectual honesty, not salesmanship.
