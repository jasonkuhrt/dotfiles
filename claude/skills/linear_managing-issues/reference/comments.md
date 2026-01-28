# Comments

## Post a Comment

```typescript
import { client } from '@jasonkuhrt/linear/client'

const result = await client.mutation.commentCreate({
  $: {
    input: {
      issueId: 'ISSUE_UUID',
      body: 'Comment body with https://linear.app/{workspace}/profiles/nick mention',
    },
  },
  success: true,
  comment: {
    id: true,
    body: true,
    url: true,
  },
})
```

## Mention Validation

Before posting any comment, validate mentions. The `@username` syntax does NOT work in Linear -- it renders as plain text and sends no notification.

**Validation rule:** Scan the comment body for `@` followed by a word character (`/(?<!\w)@(\w+)/`). Replace each match with the profile URL:

```
https://linear.app/{workspace}/profiles/{displayName}
```

The `{workspace}` comes from `linear_core` config resolution. The `{displayName}` is the user's `displayName` field, not their email or full name.

**Examples:**

| Input | Output |
|-------|--------|
| `@nick what do you think?` | `https://linear.app/{workspace}/profiles/nick what do you think?` |
| `Hey @jason, can you review?` | `Hey https://linear.app/{workspace}/profiles/jason, can you review?` |
| `CC @nick @jason` | `CC https://linear.app/{workspace}/profiles/nick https://linear.app/{workspace}/profiles/jason` |

## Reporting to User

After posting a comment, always show:

```
Comment posted to ENG-1234:

> [full comment text]

View: https://linear.app/{workspace}/issue/ENG-1234
```

## List Comments on an Issue

```typescript
const result = await client.query.issue({
  $: { id: 'ISSUE_UUID' },
  identifier: true,
  comments: {
    nodes: {
      id: true,
      body: true,
      user: {
        name: true,
        displayName: true,
      },
      createdAt: true,
      updatedAt: true,
    },
  },
})
```

## Edit a Comment

```typescript
const result = await client.mutation.commentUpdate({
  $: {
    id: 'COMMENT_UUID',
    input: {
      body: 'Updated comment body',
    },
  },
  success: true,
  comment: {
    id: true,
    body: true,
  },
})
```

## Delete a Comment

```typescript
const result = await client.mutation.commentDelete({
  $: {
    id: 'COMMENT_UUID',
  },
  success: true,
})
```

To find the comment UUID, list comments on the issue first (see above), then match by body content or author.

## Comment Formatting

Linear comments support Markdown:

```markdown
## Summary
Brief update on the issue.

- Point 1
- Point 2

> Quoted context from earlier discussion

**Action needed:** https://linear.app/{workspace}/profiles/nick please review.
```

## Identifying the Issue

Comments require an `issueId` (UUID). To resolve from an identifier like `ENG-1234`:

```typescript
const results = await client.query.issueSearch({
  $: { query: 'ENG-1234', first: 1 },
  nodes: { id: true, identifier: true },
})
const issueId = results.nodes[0].id
```

Common sources for the issue reference:
- User's message (e.g., "comment on ENG-1234")
- URL (extract identifier from `https://linear.app/.../ENG-1234`)
- Current context (e.g., issue being worked on)

If the issue reference is ambiguous, ask the user to clarify.
