---
name: review:checks:add
description: Guided workflow to add new review checks. Use when user wants to add a check, create a new check, or extend the review system.
---

# Add Review Check

Guided workflow to create new checks optimally.

## Gather Information

Use AskUserQuestion to collect:

### Question 1: What to Check

```
What pattern or rule should this check enforce?

Examples:
- "Tests should use fixtures instead of direct database calls"
- "Components must have displayName for debugging"
- "API routes must validate input with zod"
```

### Question 2: Skill Placement

```
Which skill should own this check?

Options:
- [Existing skill from discover.ts output]
- [Existing skill from discover.ts output]
- "Create new skill"
- "Standalone check (no skill)"
```

### Question 3: Tier

```
What tier is this check?

Options:
- gate — Fast, mechanical, binary (types pass, command succeeds)
- quality — Structural, pattern-based, judgment needed (Recommended)
- polish — Late-stage, edge cases, manual verification
- all — Applies regardless of tier
```

### Question 4: Scope (if skill exists in config)

```
This skill has configured paths: {paths}

Should this check use:
- Same paths (Recommended)
- Different paths (specify)
- All project files
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
3. **Standalone** → create `~/.claude/checks/{slug}.{tier}.md`

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

1. Run `bun ~/.claude/skills/review/scripts/discover.ts`
2. Confirm the new check appears in output
3. Report success:

```
✓ Added check: {skill}#{slug}

Location: {file path}
Tier: {tier}
Paths: {configured paths or "all files"}

Test with: /review --check={skill}#{slug} --dry-run
```

## Example Session

```
User: /review:checks:add

Agent: What pattern should this check enforce?

User: React components should use named exports, not default exports

Agent: Which skill should own this check?
- react-components (existing)
- Create new skill
- Standalone check

User: react-components

Agent: What tier?
- gate
- quality (Recommended)
- polish

User: quality

Agent: Here's the proposed check:

## named-exports-only

React components must use named exports for better refactoring support and explicit imports.

### Correct
export const Button = () => { ... }

### Incorrect
export default function Button() { ... }

Target: ~/.claude/skills/react-components/CHECKS.quality.md

Confirm? [Y/n]

User: Y

Agent: ✓ Added check: react-components#named-exports-only
```
