---
name: review:ask
description: Interactive review dispatcher — discover checks, choose scope/tier/group, then run. Use when the user wants to configure a review interactively.
---

# Code Review — Interactive Dispatcher

Discover available checks, present choices, then delegate to CORE.

## Step 1: Discover

```bash
bun ~/.claude/skills/review/scripts/discover.ts
bun ~/.claude/skills/review/scripts/config.ts
```

Parse the results to understand:
- Which tiers have checks
- Which groups exist (derive from check source file prefixes — e.g., `stripe.quality.md` = group `stripe`)
- What config is active

## Step 2: Present Choices

Use AskUserQuestion with dynamically populated options:

```typescript
AskUserQuestion({
  questions: [
    {
      question: "What scope should the review cover?",
      header: "Scope",
      multiSelect: false,
      options: [
        { label: "here (Recommended)", description: "Files touched in this conversation, fallback to dirty" },
        { label: "dirty", description: "All uncommitted changes (staged + unstaged)" },
        { label: "pr", description: "Full branch diff from trunk" }
      ]
    },
    {
      question: "Which tier ceiling?",
      header: "Tier",
      multiSelect: false,
      options: [
        { label: "quality (Recommended)", description: "Gate + quality checks" },
        { label: "gate", description: "Mechanical checks only (types, lint)" },
        { label: "polish", description: "All tiers including late-stage" },
        { label: "all", description: "Every check regardless of tier" }
      ]
    },
    {
      question: "Filter to a specific group?",
      header: "Group",
      multiSelect: false,
      options: [
        { label: "All groups (Recommended)", description: "Run all relevant checks" },
        // Populate remaining options from discovered groups:
        // { label: "@stripe", description: "N checks from stripe" },
        // { label: "@react", description: "N checks from react" },
      ]
    }
  ]
})
```

Populate the Group options dynamically from discover.ts output. Show each group with its check count.

## Step 3: Execute

Set context from user's choices, then follow `~/.claude/skills/review_/CORE.md` for execution.
