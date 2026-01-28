# Comments

## Post a Comment

```bash
bun claude/skills/linear_managing-issues/scripts/comment.ts ENG-123 "Comment body"
bun claude/skills/linear_managing-issues/scripts/comment.ts ENG-123 --body "Multi-line comment here"
```

## Mention Validation

Before posting any comment, validate mentions. The `@username` syntax does NOT work in Linear -- it renders as plain text and sends no notification.

**Validation rule:** Scan the comment body for `@` followed by a word character. Replace each match with the profile URL:

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

```bash
bun claude/skills/linear_managing-issues/scripts/get.ts ENG-123
```

The output includes the `comments` array with recent comments.

## Edit a Comment (via linear_gql)

```bash
bun claude/skills/linear_gql/scripts/query.ts \
  'mutation($id: String!, $input: CommentUpdateInput!) { commentUpdate(id: $id, input: $input) { success comment { id body } } }' \
  --variables '{"id": "COMMENT_UUID", "input": {"body": "Updated comment body"}}'
```

## Delete a Comment (via linear_gql)

```bash
bun claude/skills/linear_gql/scripts/query.ts \
  'mutation($id: String!) { commentDelete(id: $id) { success } }' \
  --variables '{"id": "COMMENT_UUID"}'
```

To find the comment UUID, get the issue first and look at `comments.nodes[].id`.

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

The comment script accepts issue identifiers like `ENG-1234`. It resolves to UUID automatically.

Common sources for the issue reference:
- User's message (e.g., "comment on ENG-1234")
- URL (extract identifier from `https://linear.app/.../ENG-1234`)
- Current context (via `linear_current-issue` skill)

If the issue reference is ambiguous, ask the user to clarify.
