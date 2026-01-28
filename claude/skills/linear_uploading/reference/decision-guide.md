# Decision Guide: Attachment vs Embed

## Core Distinction

Linear has two file-attachment mechanisms with different UX:

| Method | Location | Visibility | Best For |
|--------|----------|------------|----------|
| Attachment | Paperclip section below description | Listed by name, click to open | Documents, PDFs, meeting notes, any file |
| Inline Embed | Within description or comment body | Rendered inline (images shown, others linked) | Screenshots, diagrams, visual evidence |
| Comment Embed | Within a comment body | Rendered inline in activity feed | Follow-up screenshots, visual discussion |

## Decision Flowchart

```
Is the file visual content (screenshot, diagram, image)?
  YES -> Should it appear in the main description?
           YES -> Upload for Embed (description)
           NO  -> Is it part of a follow-up discussion?
                    YES -> Upload for Embed (comment)
                    NO  -> Attach
  NO  -> Attach
```

## Ordering Constraint (Embeds Only)

For inline embeds, the upload **must** precede the issue create/update:

1. `upload(filePath)` -- get `assetUrl`
2. Use `![description](assetUrl)` in the markdown body
3. Create or update the issue/comment with that body

This is because the `assetUrl` must exist in Linear's storage before it can be rendered.

Attachments have no ordering constraint -- `attach()` handles the full flow (upload + link) in one call.

## Embed Syntax

Only markdown image syntax works for inline rendering:

| Syntax | Result |
|--------|--------|
| `![desc](assetUrl)` | Rendered inline (image displayed, video playable) |
| Raw URL | Plain text link |
| `<img src="...">` | Plain text (HTML not rendered) |
| `<video src="...">` | Plain text (HTML not rendered) |

## Multiple Files

When uploading multiple files, upload them in parallel for performance:

```typescript
import { upload, attach } from '@jasonkuhrt/linear/upload'

// Parallel embeds
const results = await Promise.all([
  upload('/path/to/before.png'),
  upload('/path/to/after.png'),
])

const body = `## Visual comparison

Before:
${results[0].markdown}

After:
${results[1].markdown}`

// Parallel attachments
await Promise.all([
  attach('/path/to/spec.pdf', 'ENG-123', 'Spec Document'),
  attach('/path/to/notes.md', 'ENG-123', 'Meeting Notes'),
])
```

## Edge Cases

- **File too large:** Linear's `fileUpload` mutation will reject files exceeding their size limit. The error surfaces from the mutation response.
- **Unsupported embed type:** Non-image files embedded with `![](url)` will render as a download link, not inline. This is fine but not visually rich. Prefer attachments for non-visual files.
- **Issue identifier vs UUID:** The `attach()` helper accepts both forms (e.g., `"ENG-123"` or a UUID string). The Linear API resolves identifiers automatically.
