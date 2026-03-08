---
name: debrief
description: >
  Extract incidental value after completing or failing significant work.
  Captures discoveries, code debt, documentation gaps, plan methodology flaws,
  and follow-up opportunities. Use after plan execution, debugging sessions,
  epic waves, or failed attempts. Triggers on "debrief", "what did we learn",
  "post-mortem", "extract insights", or /debrief.
argument-hint: "[plan-file-path]"
---

# Debrief — Knowledge Extraction After Action

You are conducting a structured debrief of the work just completed (or abandoned) in this session. Your job is to extract every piece of incidental value — insights, opportunities, debt, gaps — that would otherwise evaporate when the session ends.

This is NOT a code review (use `flo:review` for that). This is a **meta-knowledge extraction**: what did the work teach us about the system, our process, and what comes next?

## Step 1: Establish Scope

Determine what work is being debriefed.

**If `$ARGUMENTS` contains a path**: Read that plan/design doc as the baseline for deviation analysis.

**If no arguments**: Infer from conversation context:
- Was a plan executed? (Look for `plan_exec` session summary, plan docs, `HALT.md`)
- Was an epic wave run? (Check `.flo/state.yml`, recent bead activity)
- Was this a debugging/investigation session?
- Was this a failed attempt at something?

State what you're debriefing in one line before proceeding.

## Step 2: Extract Across Categories

Walk through **every** category below. For each, explicitly state findings or "Nothing notable." Do not skip categories.

### 2a. Deviations from Intent

_What changed from what was planned/expected, and why?_

- Compare intended approach vs actual implementation
- Note course corrections and what triggered them
- Distinguish: forced deviations (constraints discovered) vs chosen deviations (better approach found)
- Flag any deviation that was a **mistake** vs a **legitimate pivot**

### 2b. Discoveries & Opportunities

_What did we stumble on that has value beyond the immediate task?_

- Nearby improvements that are low-effort, high-value
- Architectural patterns observed that could be applied elsewhere
- Tools, APIs, or capabilities discovered that weren't previously known
- Performance or UX improvements noticed in passing

### 2c. Code Debt Identified

_What technical debt was observed but intentionally not addressed?_

- Debt that existed before this work (pre-existing)
- Debt introduced by this work (new, accepted trade-off)
- Debt that this work made more visible or urgent
- For each: severity estimate (will bite soon vs. dormant) and proximity (how close to what we just touched)

### 2d. Documentation Gaps

_What system understanding was gained that isn't captured anywhere?_

- Architecture knowledge that should be in a memory or doc
- Gotchas and non-obvious behaviors worth recording
- API contracts or data flows that aren't documented
- Conventions or patterns that are implicit but should be explicit

For each gap: propose WHERE the knowledge should live (memory file, CLAUDE.md rule, project doc, inline comment).

### 2e. Plan Methodology Flaws

_If a plan was involved, what should be done differently next time?_

- Assumptions in the plan that turned out wrong
- Missing prerequisites or dependencies not anticipated
- Scope estimation issues (over/under)
- Ordering issues (steps that should have come earlier/later)
- Information that should have been gathered during planning but wasn't

Skip this category if no plan document was involved.

### 2f. System State Assessment

_Is the system clean? What's the current health?_

- Are all checks passing? (types, lint, tests)
- Any uncommitted work? Temporary files? Debug artifacts?
- Any partially-applied changes that need completion?
- Any state that would confuse the next person/agent touching this area?

### 2g. Follow-up Items

_What concrete work items emerged from this session?_

For each item, classify:
- **Autonomous-safe**: A future agent can execute this without human input
- **Interactive**: Needs human decision-making or design input

## Step 3: Produce Actions

### Beads

For each follow-up item and significant discovery, propose a `bd create` command. Group related items. Present all proposals together and ask the user which to create.

Classify labels:
- Autonomous items: standard labels only
- Interactive items: include `flo/interactive` label

### Documentation Updates

For each documentation gap, propose the specific update:
- Memory files: show the `write_memory` or `edit_memory` content
- CLAUDE.md rules: show the rule text
- Project docs: show what to add and where

Present all proposals together. Do not execute without user approval.

### Methodology Notes

If plan methodology flaws were identified, propose a memory note under `plan-methodology-learnings` that future `plan_exec` sessions can reference. Format as actionable guidelines, not narrative.

## Output Format

```
## Debrief: <one-line scope description>

### Deviations
<findings or "Nothing notable.">

### Discoveries & Opportunities
<findings or "Nothing notable.">

### Code Debt
<findings or "Nothing notable.">

### Documentation Gaps
<findings or "Nothing notable.">

### Plan Methodology
<findings or "N/A — no plan involved.">

### System State
<assessment>

### Follow-ups
<numbered list with autonomous/interactive classification>

---

## Proposed Actions

### Beads to Create
<bd create commands, grouped>

### Documentation to Update
<proposed updates with targets>

### Methodology Notes
<proposed memory content>
```

## Principles

- **Non-lossy**: Capture everything. It's cheaper to discard later than to lose an insight.
- **Forward-looking**: The value is in what happens NEXT because of what we learned, not in rehashing what happened.
- **Concrete over abstract**: "The AuthService.validate() method silently swallows network errors" beats "error handling could be improved."
- **User controls execution**: Propose actions, don't execute them. The user decides what's worth investing in.
