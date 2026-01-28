---
name: linear_current-issue
description: Resolves "the issue" or "the ticket" to a Linear issue identifier. Use when user references "current issue", "this ticket", "attach to Linear", "what issue am I on", "which Linear issue", or any action needing the active Linear issue.
---

# Current Linear Issue

Resolve "the issue" or "the ticket" to a specific Linear issue identifier (e.g., `ENG-123`).

Follow the resolution chain in order. Stop at the first match.

## Resolution Chain

### 1. Branch Name

```bash
git branch --show-current
```

Extract an issue identifier matching the pattern `[A-Z]+-\d+` from the branch name.

Common branch formats:
- `feat/ENG-123-add-widget` -> `ENG-123`
- `fix/ENG-456` -> `ENG-456`
- `jk/PLATFORM-78-refactor-api` -> `PLATFORM-78`

**If found:** Use silently -- do not announce the detection method.

### 2. Context File (`.claude/issue.md`)

Check if `.claude/issue.md` exists in the project root. This file is typically gitignored and auto-loaded via `@issue.md` in the project's `.claude/CLAUDE.md`.

Extract an issue identifier matching `[A-Z]+-\d+` from the file contents.

**If found:** Use silently.

### 3. Query Linear for Assigned Issues

Use the Graffle client (see `linear_core`) to fetch the current user's assigned incomplete issues:

```typescript
import { client } from '@jasonkuhrt/linear/client'

const viewer = await client.query.viewer({
  id: true,
  assignedIssues: {
    $: {
      filter: {
        state: {
          type: { in: ['triage', 'backlog', 'unstarted', 'started'] },
        },
      },
      first: 20,
      orderBy: { updatedAt: 'desc' } as any,
    },
    nodes: {
      identifier: true,
      title: true,
      url: true,
      state: {
        name: true,
        type: true,
      },
      priority: true,
    },
  },
})
```

Present issues to the user for selection:

```
I couldn't detect an issue automatically. Here are your assigned issues:

1. **ENG-123** - Add voice notes (In Progress)
2. **ENG-456** - Fix upload bug (Todo)
3. **PLATFORM-78** - Refactor API client (In Progress)

Which issue? (number or identifier)
```

### 4. Ask User (Last Resort)

If the query returns no results, or the user's environment has no `LINEAR_API_TOKEN`, ask directly:

```
What Linear issue are you working on? (e.g., ENG-123)
```

After receiving the identifier, educate about automatic detection:

```
Tip: Automatic detection options for next time:
1. Branch name - include the identifier (e.g., `feat/ENG-123-description`)
2. `.claude/issue.md` - create in project root with the issue ID (gitignored)
```

## After Resolution

Once resolved, you have an **identifier** (e.g., `ENG-123`), not a UUID. Most downstream operations need the full issue object. Fetch it:

```typescript
const result = await client.query.issueSearch({
  $: {
    query: 'ENG-123',
    first: 1,
  },
  nodes: {
    id: true,
    identifier: true,
    title: true,
    description: true,
    url: true,
    state: {
      name: true,
      type: true,
    },
    assignee: {
      name: true,
      displayName: true,
    },
    team: {
      key: true,
      name: true,
    },
    priority: true,
    labels: {
      nodes: {
        name: true,
      },
    },
  },
})
```

## Behavioral Rules

- **Silent resolution:** Steps 1-2 should not announce how the issue was found. Just use it.
- **No redundant confirmation:** If the issue was auto-detected, do not ask "Is ENG-123 correct?" unless the context is ambiguous (e.g., branch has one ID but `.claude/issue.md` has another).
- **Conflict handling:** If branch name and context file disagree, prefer the branch name (it reflects current work) and mention the discrepancy.
- **Trunk branch:** If on `main`/`master`/`develop` with no context file, skip directly to step 3 (query). Do not warn about being on trunk -- just proceed.
- **Cache within session:** Once resolved, reuse the same issue for the remainder of the session unless the user explicitly switches.

## Examples

| User says                       | Action                                             |
| ------------------------------- | -------------------------------------------------- |
| "Attach the video to the issue" | Resolve issue silently, then attach                 |
| "What issue am I on?"           | Report resolved issue or show assigned list          |
| "What issues am I assigned to?" | Skip to step 3 (query) regardless of auto-detection |
| "Switch to ENG-456"             | Update cached issue, confirm                         |

## Dependencies

- `linear_core` -- auth, config resolution, Graffle client, mention syntax
