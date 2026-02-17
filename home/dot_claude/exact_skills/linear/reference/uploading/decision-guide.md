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

## Scripts

| Workflow | Script |
|----------|--------|
| Upload for embed | `bun ~/.claude/skills/linear/scripts/upload.ts <file>` |
| Attach to issue | `bun ~/.claude/skills/linear/scripts/attach.ts <issue> <file>` |
| Download | `bun ~/.claude/skills/linear/scripts/download.ts <url> <output>` |

## Ordering Constraint (Embeds Only)

For inline embeds, the upload **must** precede the issue create/update:

1. `upload.ts` -- get `assetUrl`
2. Use `![description](assetUrl)` in the markdown body
3. Create or update the issue/comment with that body

This is because the `assetUrl` must exist in Linear's storage before it can be rendered.

Attachments have no ordering constraint -- `attach.ts` handles the full flow (upload + link) in one call.

## Embed Syntax

Only markdown image syntax works for inline rendering:

| Syntax | Result |
|--------|--------|
| `![desc](assetUrl)` | Rendered inline (image displayed, video playable) |
| Raw URL | Plain text link |
| `<img src="...">` | Plain text (HTML not rendered) |
| `<video src="...">` | Plain text (HTML not rendered) |

## Multiple Files

When uploading multiple files, you can run uploads in parallel:

```bash
# Parallel uploads (bash example)
result1=$(bun ~/.claude/skills/linear/scripts/upload.ts before.png) &
result2=$(bun ~/.claude/skills/linear/scripts/upload.ts after.png) &
wait

# Use results
md1=$(echo "$result1" | jq -r '.markdown')
md2=$(echo "$result2" | jq -r '.markdown')
```

For Claude: execute multiple upload scripts in parallel tool calls, then combine the markdown in the issue body.

## Edge Cases

- **File too large:** Linear's `fileUpload` mutation will reject files exceeding their size limit. The error surfaces in the script output.
- **Unsupported embed type:** Non-image files embedded with `![](url)` will render as a download link, not inline. This is fine but not visually rich. Prefer attachments for non-visual files.
- **Issue identifier vs UUID:** The attach script accepts both forms (e.g., `"ENG-123"` or a UUID string). The Linear API resolves identifiers automatically.
