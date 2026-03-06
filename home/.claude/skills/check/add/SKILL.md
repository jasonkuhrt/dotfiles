---
name: check:add
description: Add a new check to the system. Guided workflow for creating checks optimally.
---

# Add Check

Guided workflow to create new checks optimally.

## Gather Information

**Use a single AskUserQuestion call with multiple questions (tabbed interface).**

First, run `bun ~/.claude/skills/check/scripts/discover.ts` to get available skills for the placement question.

Then ask all core questions together:

```typescript
AskUserQuestion({
  questions: [
    {
      question: "What pattern or rule should this check enforce?",
      header: "Pattern",
      multiSelect: false,
      options: [
        { label: "Naming convention", description: "Enforce naming patterns (files, variables, exports)" },
        { label: "Code structure", description: "Require specific patterns (hooks, fixtures, guards)" },
        { label: "Import/export rule", description: "Control module boundaries and exports" },
        { label: "Test requirement", description: "Enforce testing patterns or coverage" }
      ]
      // User will typically select "Other" and describe their specific pattern
    },
    {
      question: "Which skill should own this check?",
      header: "Skill",
      multiSelect: false,
      options: [
        // Populate from discover.ts output, max 2-3 relevant ones + standalone
        { label: "Standalone check (Recommended)", description: "Independent check in ~/.claude/checks/" },
        { label: "{skill-name}", description: "Add to existing {skill-name} skill" },
        { label: "Create new skill", description: "Create a new skill to own this check" }
      ]
    },
    {
      question: "What tier is this check?",
      header: "Tier",
      multiSelect: false,
      options: [
        { label: "quality (Recommended)", description: "Structural, pattern-based, judgment needed" },
        { label: "gate", description: "Fast, mechanical, binary (types pass, command succeeds)" },
        { label: "polish", description: "Late-stage, edge cases, manual verification" },
        { label: "all", description: "Applies regardless of tier" }
      ]
    }
  ]
})
```

### Conditional: Scope Question

Only ask separately if the selected skill has `paths` configured in CLAUDE.md:

```typescript
AskUserQuestion({
  questions: [{
    question: "This skill has configured paths: {paths}. Should this check use the same paths?",
    header: "Scope",
    multiSelect: false,
    options: [
      { label: "Same paths (Recommended)", description: "Use {paths}" },
      { label: "Different paths", description: "Specify custom paths for this check" },
      { label: "All project files", description: "No path restriction" }
    ]
  }]
})
```

## Generate Check

Based on answers, generate the check content:

```markdown
## {slug-from-description}

{User's description, refined to be clear and actionable}

### Correct

```{language}
{Generate a realistic "good" example based on the pattern}
```

### Incorrect

```{language}
{Generate a realistic "bad" example showing the anti-pattern}
```
```

## Determine File Location

Decision tree:

1. **Existing skill selected** → append to existing `CHECKS.{tier}.md` or create if doesn't exist
2. **New skill** → create `~/.claude/skills/{name}/CHECKS.{tier}.md`
3. **Standalone** → create any `.md` in `~/.claude/checks/` (e.g. `{slug}.{tier}.md`)

For project-specific checks (user indicates), use `.claude/` instead of `~/.claude/`.

## Write Check

1. Show the user the proposed check content
2. Show the target file path
3. Ask for confirmation or edits
4. Write the file (append if existing, create if new)

## Update Config (if needed)

If creating a check for a skill that has no `paths` configured:

```
This skill has no paths configured. Checks will examine all files.

Would you like to configure paths?

Options:
- Yes, suggest paths based on project structure
- No, examine all files
- Skip for now
```

If yes, help add to CLAUDE.md frontmatter:

```yaml
checks:
  {skill}:
    paths:
      - "{suggested paths}"
```

## Verify

After writing:

1. Run `bun ~/.claude/skills/check/scripts/discover.ts`
2. Confirm the new check appears in output
3. Report success:

```
Added check: {skill}#{slug}

Location: {file path}
Tier: {tier}
Paths: {configured paths or "all files"}

Test with: /check @{group}
```

## Example Session

```
User: /check:add

Agent: [Runs discover.ts, then presents single tabbed prompt]

User: [Fills all three tabs in one interaction]
- Pattern: Other → "React components should use named exports, not default exports"
- Skill: Standalone check
- Tier: quality

Agent: Here's the proposed check:

## named-exports-only

React components must use named exports for better refactoring support and explicit imports.

### Correct
export const Button = () => { ... }

### Incorrect
export default function Button() { ... }

Target: ~/.claude/checks/named-exports-only.quality.md

Confirm? [Y/n]

User: Y

Agent: Added check: check#named-exports-only
```
