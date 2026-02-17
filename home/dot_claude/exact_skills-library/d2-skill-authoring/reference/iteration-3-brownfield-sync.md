# Iteration 3: Decision Log — Brownfield D2 → SKILL.md Sync

## Experiment

**Change made to D2:** Added `stale_check` container between `gather_state` and `tag_loop` in Plan phase.
**Goal:** Apply targeted edits to SKILL.md based on D2 diff, rather than regenerating.

---

## D2 Diff Analysis

### Structural changes detected:

1. **New container added:** `stale_check` with:
   - 3 leaf nodes: `show_stale`, `mark_cleanup`, `keep_branch`, `skip_stale`
   - 1 diamond: `stale_choice`
   - Internal edges: `show_stale -> stale_choice -> {3 outcomes}`

2. **Edge repointed:** `gather_state -> tag_loop` became `gather_state -> stale_check` and new `stale_check -> tag_loop`

3. **Node added to existing container:** `assign_actions` gained `stale_marked: stale + marked → cleanup` (new priority rule)

### What the diff tells us about SKILL.md edits:

| D2 Change | SKILL.md Edit Needed | Edit Type |
|-----------|---------------------|-----------|
| New container between steps 2 and 3 | Insert new step between existing steps | **INSERT** — add step, renumber subsequent |
| New container has diamond + 3 edges | New step needs user interaction table | **INSERT** — add select table |
| New node in `assign_actions` | Add new row to priority table | **EDIT** — modify existing table |
| Edge repointing | No SKILL.md impact | N/A — flow is implicit in step ordering |

---

## Attempting Targeted Edits

### Edit 1: Insert new Plan step

**Location in SKILL.md:** Between current step 2 (GATHER STATE) and step 3 (RESOLVE TAG CONFLICTS)

**Before:**
```markdown
2. GATHER STATE ◆ Collect repository metadata including worktrees, branches, and tag conflicts.
   Run script `gather [trunk]` → `RepositoryState`
3. RESOLVE TAG CONFLICTS ◆ Let user decide how to handle each Tag Conflict.
```

**After:**
```markdown
2. GATHER STATE ◆ Collect repository metadata including worktrees, branches, and tag conflicts.
   Run script `gather [trunk]` → `RepositoryState`
3. CHECK STALE BRANCHES ◆ Identify branches with no commits in 30+ days.
   1. For each stale branch:
      1. Show branch name and last commit date
      2. Ask single select "Stale branch action":

         | select  | description              | then                     |
         | ------- | ------------------------ | ------------------------ |
         | Cleanup | mark for cleanup         | set action=cleanup       |
         | Keep    | ignore staleness         | no change                |
         | Skip    | decide later             | next branch              |

4. RESOLVE TAG CONFLICTS ◆ Let user decide how to handle each Tag Conflict.
```

**Edit type:** INSERT + RENUMBER
**Difficulty:** Easy — insertion point is unambiguous (between two numbered steps)
**Could this be automated?** Yes — the D2 diff says "new container between node X and node Y in sequence" → insert new numbered step at that position, renumber subsequent.

### Edit 2: Modify assign_actions priority table

**Location:** Current step 4 (ASSIGN BRANCH ACTIONS), now step 5

**Before:**
```markdown
   | Condition                  | Action    | Set                       |
   | -------------------------- | --------- | ------------------------- |
   | midRebase or midMerge      | _skip_    | _skipReason_              |
   | prState = MERGED or CLOSED | _cleanup_ | _prStatus_, _needsRescue_ |
   | Otherwise                  | _sync_    | _complexity_              |
```

**After:**
```markdown
   | Condition                  | Action    | Set                       |
   | -------------------------- | --------- | ------------------------- |
   | stale + marked for cleanup | _cleanup_ | _staleCleanup_            |
   | midRebase or midMerge      | _skip_    | _skipReason_              |
   | prState = MERGED or CLOSED | _cleanup_ | _prStatus_, _needsRescue_ |
   | Otherwise                  | _sync_    | _complexity_              |
```

**Edit type:** ADD ROW to existing table
**Difficulty:** Easy — new node in D2 container maps to new row in table
**Could this be automated?** Partially — D2 tells us a new node was added to the container, but the table column values ("Set" = `_staleCleanup_`) are enrichment not in D2.

### Edit 3: No schema/script/template changes

The stale check doesn't need new scripts (uses existing `gather.sh` data), no new output templates (uses existing plan-preview), no new schemas (stale branches fit in existing BranchTask with action=cleanup).

**Decision:** Schema and template changes would only be needed if the D2 introduced new data shapes or output formats.

---

## Brownfield Sync Assessment

### What worked — targeted edits were feasible

**The D2 diff was sufficient to determine:**
1. WHERE to insert (between which existing steps)
2. WHAT to insert (new step structure from new container)
3. WHAT to modify (new row in existing table from new node in existing container)
4. Step renumbering (mechanical — all steps after insertion point +1)

### What didn't work — enrichment was still needed

**The D2 diff could NOT determine:**
1. Exact command/script to use for stale detection (D2 says "30+ days" but not how to compute it)
2. AskUserQuestion table column values beyond edge labels (need "description" and "then" columns)
3. Whether new glossary terms are needed ("Stale Branch" — probably yes)
4. Whether existing schemas need updating (need human judgment)

### When targeted edits work vs. when full regeneration is needed

| Scenario | Targeted edit? | Why |
|----------|---------------|-----|
| Add new step to sequence | ✅ Yes | Clear insertion point, mechanical renumbering |
| Add option to existing decision | ✅ Yes | New edge → new table row |
| Modify existing step logic | ⚠️ Maybe | Depends on whether the SKILL.md text is a direct linearization or has enriched context |
| Reorder steps | ❌ No | Renumbering + prose transitions may change |
| Remove a step | ⚠️ Maybe | Remove + renumber is mechanical, but downstream references may break |
| Add new phase/container | ✅ Yes | Insert new section, clear boundaries |
| Restructure procedures | ❌ No | Procedure calls are referenced by name throughout; changing structure has cascading effects |
| Change flow topology (not just add/remove) | ❌ No | Fundamentally changes the linearization |

### Key finding: Structural edits ✅, Topological edits ❌

**Structural edits** (insert step, add option, add phase) preserve the existing linearization — you're adding to it, not changing its shape. These are safely targeted.

**Topological edits** (reorder steps, merge procedures, change decision tree shape) change the fundamental linearization. These need regeneration or at minimum careful manual review.

---

## Enrichment Gap Patterns (Cumulative from All Iterations)

| Gap Pattern | When it appears | Resolution |
|-------------|----------------|------------|
| **Command detail** | Every "Run X" or "Check X" node | Prompt: "What exact command?" or derive from node label |
| **Interaction table** | Every diamond with 3+ edges | Auto-generate: edge labels → select column, prompt for description/then |
| **Glossary term** | Domain terms used without definition | Count unique domain terms; if 3+, prompt for definitions |
| **Template reference** | Every "Show X" node | Prompt: "What template?" or auto-name from node label |
| **Temporal behavior** | Loop edges (retries, polls) | Prompt: "Interval? Timeout?" |
| **Default path** | Multi-option diamonds | Prompt: "Which is default?" or convention: first edge |
| **Schema updates** | New data shapes introduced | Analyze: does new step produce/consume data not in existing schemas? |
| **Script updates** | New computation needed | Analyze: does new step need shell logic beyond existing scripts? |
