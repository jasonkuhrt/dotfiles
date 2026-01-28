---
name: linear_uploading
description: Use when uploading files to Linear, attaching to issues, adding screenshots/images to descriptions, embedding media in comments, or downloading attachments. Triggers on "upload to Linear", "attach to issue", "add screenshot", "embed image", "download attachment".
---

# Linear Uploading

Upload, attach, and download files for Linear issues. Uses helpers at `packages/linear/src/upload.ts` and `packages/linear/src/download.ts`.

**Prerequisite:** `LINEAR_API_TOKEN` must be set. See `linear_core` skill for auth setup.

## Workflows

### 1. Upload for Embed

Upload a file and embed it inline in an issue description or comment.

```typescript
import { upload } from '@jasonkuhrt/linear/upload'

const { assetUrl, markdown } = await upload('/path/to/screenshot.png')
// markdown = "![screenshot.png](https://uploads.linear.app/...)"
```

Then use `markdown` (or `![description](assetUrl)`) in the issue body or comment body. The upload **must** happen before the issue create/update since you need the `assetUrl` for the markdown.

### 2. Attach to Issue

Attach a file to an issue's paperclip area (attachments section).

```typescript
import { attach } from '@jasonkuhrt/linear/upload'

const { assetUrl, markdown, attachmentId } = await attach(
  '/path/to/meeting-notes.pdf',
  'ENG-123',           // issue identifier or UUID
  'Meeting Notes - Jan 12'  // optional title (defaults to filename)
)
```

### 3. Download

Download a Linear upload to disk for local analysis.

```typescript
import { download } from '@jasonkuhrt/linear/download'

// To a specific file path
const { path, size } = await download('https://uploads.linear.app/...', '/tmp/screenshot.png')

// To a directory (derives filename from URL)
const { path, size } = await download('https://uploads.linear.app/...', '/tmp/')
```

Linear upload URLs require Bearer token auth. The `download` helper handles this automatically.

## When to Use What

| User says | Workflow | Why |
|-----------|----------|-----|
| "attach this file" | **Attach** | Documents belong in paperclip area |
| "add file to issue" | **Attach** | Default to attachment unless embed requested |
| "upload meeting notes" | **Attach** | Documents, not visual content |
| "add screenshot to description" | **Upload for Embed** | Visual content inline with text |
| "create issue with this image" | **Upload for Embed** | Image should appear in description |
| "post screenshot as comment" | **Upload for Embed** | Image inline in comment body |
| "download the attachments" | **Download** | Fetch files to disk |

**Default to Attach** when ambiguous. Use Embed only when the file should appear inline with descriptive text (screenshots, diagrams).

## References

- [Decision Guide](./reference/decision-guide.md) -- attachment vs embed logic, edge cases
- [API Details](./reference/api-details.md) -- upload flow internals, supported types, GraphQL patterns
