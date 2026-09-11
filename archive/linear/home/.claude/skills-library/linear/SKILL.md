---
name: linear
description: Use when working with Linear — searching/creating/updating issues, uploading attachments, resolving current issue context, executing GraphQL queries, or pulling workspace settings.
---

# Linear

## Topics

### Core
Authentication, config resolution, mentions, and the script execution model.
- [Overview](reference/core/overview.md)
- [Config Schema](reference/core/config-schema.md)
- [GraphQL Patterns](reference/core/graphql-patterns.md)

### Managing Issues
Search, create, update, and comment on issues.
- [Overview](reference/managing-issues/overview.md)
- [Comments](reference/managing-issues/comments.md)
- [Create](reference/managing-issues/create.md)
- [Search](reference/managing-issues/search.md)
- [Update](reference/managing-issues/update.md)

### Uploading
Upload, attach, and download files for issues.
- [Overview](reference/uploading/overview.md)
- [Decision Guide](reference/uploading/decision-guide.md)
- [API Details](reference/uploading/api-details.md)

### Current Issue
Resolve "the issue" or "the ticket" to a Linear issue identifier.
- [Overview](reference/current-issue/overview.md)

### GQL
Execute arbitrary GraphQL queries (escape hatch).
- [Overview](reference/gql/overview.md)

### Workspace Pull
Pull and cache workspace settings (teams, states, users, labels).
- [Overview](reference/workspace-pull/overview.md)

## Scripts

All scripts output JSON to stdout and exit non-zero on errors.

- `scripts/search.ts` — Search issues by text query
- `scripts/get.ts` — Get single issue by identifier or UUID
- `scripts/create.ts` — Create new issue
- `scripts/update.ts` — Update issue state, assignee, priority, or other fields
- `scripts/comment.ts` — Post comment on issue
- `scripts/upload.ts` — Upload file to Linear cloud storage for embedding
- `scripts/attach.ts` — Upload file and attach to issue's attachments area
- `scripts/download.ts` — Download file from Linear uploads storage
- `scripts/resolve.ts` — Resolve current issue from branch name, context file, or assigned list
- `scripts/query.ts` — Execute arbitrary GraphQL query or mutation
- `scripts/pull.ts` — Pull workspace data (teams, states, users, labels) into local cache
