# flo:add — Design Rationale

## Problem

Agents creating beads with `bd create` during feature sessions frequently forget `--parent <epic-id>`, producing orphaned beads unattached to the active epic. Two beads were created and attached as blockers instead of children, requiring manual cleanup. This skill eliminates the class of error by making parenting automatic and mandatory.

## Economic Model: Bead Sizing

Every bead must complete within a single agent session (~165k token window, ~120k working budget after system overhead). This is economic and quality-driven:

- **Each agent turn compounds cost.** A bead that takes 40 turns costs exponentially more than two beads that take 15 turns each.
- **Agent quality degrades with context length.** The further into a session, the more likely the agent drifts, hallucinates, or loses the thread.
- **Compaction destroys context.** If a bead forces compaction, the agent loses the very context it spent tokens acquiring. This is the worst outcome — high cost AND low quality.

Well-factored bite-size beads are the bedrock strategy: fast completion, high quality, low cost. Never trade quality for speed — use AI to enhance quality — but always decompose to reach that quality optimally.

The ~45k reserved overhead accounts for: system prompt, skill loading, project context (CLAUDE.md, spec), and the bead description itself.

## Context Economics: Bead Quality

Context is cheap to write now and ruinously expensive for a future agent to reconstruct. The agent creating the bead is mid-session with rich context — file paths, symbol names, error messages, design decisions, user intent. Once that session ends, all of this is lost.

A 500-word description that saves a future agent 20 minutes of exploration is a good trade. Every missing file path or vague reference becomes an exploration cost multiplied across every agent that touches the bead.

## Context Harvesting Philosophy

When this skill is invoked, the agent is usually mid-session with rich context about the work that triggered the bead creation — a bug just found, a missing feature just noticed, a refactor need just identified. This context is the most valuable input to the bead and it's about to be lost.

The agent should not ask the user to re-explain what they just said — it's already in the conversation. Harvest it directly into the description.

## Invocation Design

The skill supports four modes because bead creation happens in different contexts:

1. **With arguments** — user provides seed context (title, type, priority), agent enriches from conversation
2. **With free text** — user describes need informally, agent derives structured fields
3. **Bare** — user is mid-conversation, agent harvests entirely from context
4. **Agent-invoked** — agent discovers work mid-task, has full context, presents for approval

Each mode escalates confirmation based on ambiguity: clear intent means propose and create; ambiguous means ask.

The key insight: the user's thin input (`/flo:add`) doesn't mean the bead should be thin. The conversation already contains the trigger, file paths, user intent, and adjacent decisions. The agent's job is to extract all of that into the description.

## Description Template Design

The template covers: What, Context, Location, Approach, Dependencies & Relations, Acceptance. Not every section is needed for every bead — a trivial bug fix may only need What + Location + Acceptance. But err on the side of too much context. The economic model justifies this: context written now is essentially free; context reconstructed later by a fresh agent is expensive.

## Hookify Safety Net

`hookify.flo-orphan-guard.local.md` uses `action: warn` (not `block`) because:

- No epic context is sometimes intentional (standalone beads outside feature work)
- The skill itself is the primary enforcement mechanism
- The hook is a reminder for agents that bypass the skill, not a hard gate
- Blocking would break legitimate workflows where beads genuinely have no parent

Pattern `bd\s+create\b(?!.*--parent)` uses negative lookahead to match `bd create` without `--parent`. Edge case: compound commands with `&&` could confuse the lookahead, but warn-level tolerates false negatives.

## Decomposition Anti-Pattern: "Part 1 / Part 2"

If a split produces beads that can't be verified in isolation, the decomposition is wrong. "Part 1 / Part 2" naming is a smell — it means the seam was drawn at an arbitrary point in the implementation rather than at a natural boundary (layer, concern, data flow). Each sub-bead must produce a testable artifact independently.
