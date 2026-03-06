# Flo Behavioral Labels

Flo skills use the `flo/` label namespace for behavioral metadata — labels that control how flo skills treat beads during execution. These are distinct from content labels (`backend`, `skill`, `fish`, etc.) which describe *what* a bead is about.

Flo labels describe *how* a bead should be handled.

## Convention

- Prefix: `flo/`
- Format: `flo/<behavior>` — all lowercase, hyphenated if multi-word
- These labels are a built-in concept of the flo skill system, not per-project configuration
- Any bead can have flo labels applied via `--labels "flo/interactive,..."` at creation time

## Active Labels

| Label | Meaning | Read by | Applied by |
|-------|---------|---------|------------|
| `flo/interactive` | Requires human-in-the-loop — excluded from autonomous swarm dispatch | flo_next_swarm, flo_next, flo_review | flo_add, beads_offload |

## Behavior Summary

**`flo/interactive`**

- **flo_next_swarm**: Filters out beads with this label before dispatching to subagents. Surfaces them in the wrap-up summary as "needs interactive session."
- **flo_next**: When presenting a ready bead with this label, annotates it as interactive — should not be delegated to a background agent. Does not block selection.
- **flo_review**: Flags open beads with this label as "awaiting human input" rather than stalled work.
- **flo_add**: Auto-applies when bead heuristics suggest human-in-the-loop is needed (design, brainstorm, decision, evaluate, etc.).
- **beads_offload**: Defaults to applying this label since offloaded tangents are typically half-formed ideas needing human refinement. Asks user to confirm.

## Reserved (Future)

These labels are reserved for future use. Do not implement — just follow the namespace convention when adding new labels.

- `flo/review-gate` — needs human review before downstream beads unblock
- `flo/time-sensitive` — has real deadline, not just priority
