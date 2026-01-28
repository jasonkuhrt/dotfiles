# Create Issues

## Pre-Creation Checklist

1. **Search first** - Always search for existing issues before creating (see [search.md](./search.md))
2. **Exclude canceled** - Canceled issues are not duplicates
3. **Comment instead** - If an active issue covers the topic, comment on it

## Basic Creation

```bash
bun claude/skills/linear/scripts/create.ts \
  --title "Issue title" \
  --team ENG \
  --description "Markdown description"
```

## With All Optional Fields

```bash
bun claude/skills/linear/scripts/create.ts \
  --title "Issue title" \
  --team ENG \
  --description "Markdown description with details" \
  --assignee USER_UUID \
  --priority 2 \
  --state STATE_UUID \
  --label LABEL_UUID \
  --parent PARENT_ISSUE_UUID
```

**Options:**
- `--title` (required) - Issue title
- `--team` (required) - Team key (e.g., ENG, PLATFORM)
- `-d, --description` - Markdown description
- `-a, --assignee` - User UUID
- `-p, --priority` - 0=None, 1=Urgent, 2=High, 3=Normal, 4=Low
- `-s, --state` - Workflow state UUID (override default)
- `-l, --label` - Label UUID (can repeat)
- `--parent` - Parent issue UUID (create as sub-issue)

## Resolving IDs

### Team ID

The create script resolves team key to UUID automatically. For manual lookup:

```bash
bun claude/skills/linear/scripts/query.ts '{ teams(filter: { key: { eq: "ENG" } }) { nodes { id name key } } }'
```

### Assignee ID

```bash
bun claude/skills/linear/scripts/query.ts '{ users(filter: { displayName: { eq: "jason" } }) { nodes { id name displayName } } }'
```

### Label IDs

```bash
bun claude/skills/linear/scripts/query.ts '{ issueLabels(filter: { name: { eq: "bug" } }) { nodes { id name } } }'
```

### State ID (to override starting state)

```bash
bun claude/skills/linear/scripts/query.ts '{ workflowStates(filter: { team: { key: { eq: "ENG" } }, name: { eq: "In Progress" } }) { nodes { id name type } } }'
```

## Description Formatting

Linear descriptions support Markdown. Common patterns:

```markdown
## Context
Brief background on why this issue exists.

## Requirements
- Requirement 1
- Requirement 2

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## References
- [Related PR](https://github.com/...)
- [Design doc](https://...)
```

Mentions in descriptions use profile URLs (see core topic):

```
https://linear.app/{workspace}/profiles/{displayName}
```

## Reporting to User

After successful creation, always show:

```
Created ENG-1234: [title]

> [description text]

View: https://linear.app/{workspace}/issue/ENG-1234
```

This lets the user:
1. Verify the title and description are correct
2. Click through to the issue in Linear
