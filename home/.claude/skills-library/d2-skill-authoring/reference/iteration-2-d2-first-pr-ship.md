# Iteration 2: Decision Log — D2-First Design for pr-ship

## Experiment

**Process:** Design a new skill entirely in D2 first, then produce the SKILL.md from it.
**Goal:** Discover what D2 can't express when you're designing from scratch (vs. retro-fitting existing).

---

## Experience of Designing in D2 First

### What worked well

**1. Flow structure came naturally.**
D2 forced me to think about the FLOW first — what checks happen in what order, what are the decision points, what are the terminal states. This is the right decomposition for procedural skills.

**2. Decision points were explicit from the start.**
Using `shape: diamond` forced me to identify every fork upfront. In prose, it's easy to hand-wave "check if CI passes" without specifying what happens for each outcome. D2 made me enumerate all edges.

**3. Phases emerged from containers.**
I naturally grouped into Preflight → Merge → Post-Merge containers. D2's nesting made the phase structure visual before I wrote any prose.

**4. Terminal states (HALT/END) were clear.**
Every dead-end got its own node. This prevented the common prose problem of forgetting to specify what happens on failure.

### What D2 couldn't express

**1. Command details beyond node labels.**
Node labels like `gh pr merge --squash` work for simple commands. But for complex commands with flags and piped output, the label gets unwieldy. I wanted to write:
```
gh pr view --json state,reviews,mergeable,statusCheckRollup
```
...but this is awkward as a D2 node label. Block strings could help:
```d2
gather_pr: |md
  **Gather PR metadata**
  ```sh
  gh pr view --json state,reviews,mergeable,statusCheckRollup
  ```
|
```
But this makes the D2 visually noisy and defeats the purpose of a clean flow diagram.

**FINDING: Commands belong in the SKILL.md, not the D2.** D2 should say WHAT ("gather PR metadata"), SKILL.md says HOW (`gh pr view --json ...`).

**2. User interaction tables.**
The "Review action" decision with select/description/then columns — this is a SKILL.md concern, not a D2 concern. D2 can show the decision diamond with edge labels ("request", "force", "wait"), but the detailed table formatting is execution-level detail.

**FINDING: D2 edges carry the CHOICE LABELS, not the interaction format.** The meta-skill needs to expand diamond → edge-labels into AskUserQuestion select tables automatically.

**3. Polling/retry semantics.**
The CI check has "poll every 30s, max 10min" — this is behavioral detail that D2 can hint at (loop edge from wait_ci back to check_ci) but can't fully specify. The loop in D2 says "retry" but not "how often" or "for how long."

**FINDING: Temporal behavior (polling intervals, timeouts, retries) is always external to D2.** D2 captures the TOPOLOGY of retries (edges), not the TIMING.

**4. Defaults and preferences.**
"Squash (default)" — D2 has no mechanism for marking a preferred edge. I used the edge label `squash (default)` but this is a convention, not a D2 feature.

**FINDING: Edge annotations for defaults/preferences need a convention.** Possible: parenthetical in edge label, or a D2 style property (e.g., `style.bold: true` on the default edge).

**5. Glossary terms.**
Same gap as Iteration 1. D2 has no way to mark "this term needs a definition."

**6. Frontmatter/CSO.**
Same gap. Metadata about the skill itself is outside D2's scope.

---

## Layout Decisions During SKILL.md Generation

### Decision 1: No separate Procedures section needed
**Why:** pr-ship has no reusable sub-procedures. All logic is inline within phases. Unlike git-sync (which has 5 shared procedures), this skill is linear within each phase.
**Heuristic:** Only create a Procedures section when D2 shows sub-containers referenced from multiple places (cross-container edges to the same target).

### Decision 2: Three operations as sequential phases, not independent modes
**Why:** pr-ship's phases are sequential (Preflight → Merge → Post-Merge), not alternative modes like git-sync (Plan-only OR Full-sync OR Execute-only). D2 made this clear: edges between top-level containers go ONE direction.
**Heuristic:** Unidirectional edges between containers → sequential phases (no mode table). Bidirectional or optional edges → operation modes (needs mode table).

### Decision 3: User decisions rendered as select tables
**Why:** Two diamonds have 3+ edges with meaningful labels — "Review action" and "Merge strategy". Following Iteration 1's heuristic: 3+ edges from diamond → select table.
**Confirmed heuristic:** Diamond with 3+ outgoing edges → AskUserQuestion select table. Diamond with 2 edges (yes/no) → inline conditional.

### Decision 4: Glossary is minimal
**Why:** Only 2 terms needed definition (Ship, Trunk). Git-sync needed 7 because its domain is denser. The meta-skill shouldn't force a glossary — only include when terms are non-obvious.
**Heuristic:** Include Glossary when D2 uses 3+ domain-specific terms that aren't standard git/dev vocabulary.

### Decision 5: No schemas, scripts, or templates needed
**Why:** pr-ship delegates to `gh` CLI directly — no intermediate state to persist, no custom output formatting needed, no data gathering scripts.
**Heuristic:** Need for support files correlates with:
- **Schemas:** When flow produces/consumes structured data that persists across phases
- **Scripts:** When a step requires complex shell logic (>3 commands)
- **Templates:** When output to user follows a repeatable format shown multiple times

---

## What D2 Couldn't Express — NEW findings (not in Iteration 1)

| Gap | Description | Implication for meta-skill |
|-----|-------------|---------------------------|
| **Polling/retry semantics** | "poll every 30s, max 10min" | Need annotation syntax for temporal behavior |
| **Default edges** | "squash (default)" | Need convention for preferred path |
| **Phase sequencing vs. mode selection** | Sequential phases look identical to alternative modes in D2 | Need heuristic: unidirectional = sequential, bidirectional/optional = modes |
| **Conditional sub-procedures** | "If yes" vs. "goto procedure" | D2 can't distinguish inline conditional from procedure call |
| **Skill complexity signals** | Simple skill vs. complex skill | No D2 mechanism signals whether the generated skill needs scripts/schemas/templates |

---

## Comparison: D2-First vs. D2-Retrofit (Iteration 1)

| Aspect | Iteration 1 (retrofit) | Iteration 2 (D2-first) |
|--------|----------------------|----------------------|
| **D2 design difficulty** | Easier — I had the SKILL.md to reference | Harder — had to think about flow from scratch |
| **Layout decisions** | Mechanical — D2 structure dictated layout | Slightly more creative — had to decide phase granularity |
| **Gap severity** | High — actual SKILL.md has 2x the content | Lower — I designed knowing D2 would be incomplete |
| **D2 quality** | Faithful to existing flow | More intentional — I designed for visual clarity |
| **Missing info** | Discovered retrospectively | Known upfront — I knew I'd add details in SKILL.md |

**Key insight:** When designing D2-first, you KNOW the D2 is incomplete and plan for the enrichment step. When retrofitting, you discover gaps by comparing. D2-first is the healthier workflow — it separates intent (D2) from execution (SKILL.md) cleanly.

---

## Revised Understanding

The meta-skill's job is NOT "D2 → SKILL.md translation." It's:

1. **Read D2 for structural intent** — phases, steps, decisions, procedures, terminals
2. **Apply layout heuristics** — derived from structure (mostly mechanical)
3. **Identify enrichment needs** — what information D2 can't carry but SKILL.md needs
4. **Either prompt for enrichment or generate from conventions** — glossary if 3+ domain terms, select tables if 3+ edges, etc.
