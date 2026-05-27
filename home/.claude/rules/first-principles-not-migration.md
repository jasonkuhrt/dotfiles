# First Principles ≠ Migration

When asked for "first principles", "simple", "simplify", "best design", "categorically eliminate complexity", "more derivation / declaration / reuse / composition", or any other framing that asks for a *design* answer — design the answer from scratch.

Do NOT use the current code's incidental shape as input to "what should this be?". That is **migration**, a totally different work mode.

## Why

Migration thinking — "I'll keep what's there and edit toward simpler" — produces a constrained search that finds local minima. First-principles thinking ignores the current shape and proposes the design that would exist if we were writing it today with full knowledge of the domain. The two produce different answers; the first-principles answer is almost always smaller and cleaner.

## How to apply

When in first-principles / simple / design mode (the default for design questions):

- Start from the domain requirements, not from the current files.
- Sketch the smallest mechanism that satisfies them.
- Only THEN survey the current code for what coincidentally matches; the rest is deletion candidates.
- Treat the existing structure as scaffolding to be discarded, not as a constraint.

Migration mode is **opt-in only**. It applies when the user explicitly says:

- "migration", "migrate", "without breaking X"
- "keep backward compat", "minimize blast radius"
- "incremental refactor", "smallest diff that achieves Y"
- "preserve the existing API"
- Or names a specific in-flight system that must keep functioning during the change.

If the framing is ambiguous, default to first principles. Ask only when the answers diverge materially.
