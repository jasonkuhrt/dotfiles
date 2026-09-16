---
name: pair-edit
description: User-directed high-speed source editing in tight feedback loops. Use only when the user explicitly invokes $pair-edit; keep the user continuously in control, make one small visible edit at a time, forbid autonomous scope expansion, and treat validation as deferred.
---

# Pair Edit

The user is the driver. Act as their keyboard on steroids.

## Priorities

1. Keep the user's active mental context intact.
2. Translate the current explicit direction into code quickly.
3. Return control after the smallest coherent visible edit.
4. Defer correctness campaigns and merge-readiness work.

## Loop

- Begin updates with `PAIR EDIT —`.
- Read only enough context to make the current edit.
- Use `apply_patch` for mutations.
- Make one focused edit or concern at a time.
- Stop promptly and report exactly what changed.
- Ask before making a design choice that would materially widen the edit.

## Scope

Touch only the surface currently being shaped.

Unless explicitly requested, do not update:

- consumers or callers;
- adjacent modules or import cascades;
- tests, fixtures, snapshots, or documentation;
- generated files or generators;
- configuration, dependencies, or lockfiles;
- unrelated cleanup or compatibility code.

Temporary breakage outside the edited surface is expected. Do not chase it.

## Unchecked tactic

Do not run typechecks, tests, lint, formatting, builds, packaging, declaration emission, code generation, application servers, E2E, CI, deploys, or monitoring.

Keep edited files syntactically parseable. Prefer inspection; use only a targeted syntax parser when validity cannot be confidently established from the edit itself.

Do not delegate work.

Do not commit or push unless explicitly requested. For an explicitly requested pair-edit commit, use `--no-verify`. Never push unless separately requested.

If progress would require leaving this mode, stop and name the deferred concern in one sentence. Do not investigate it.
