# Linear Uploading

Upload, attach, and download files for Linear issues using pre-built scripts.

**Prerequisite:** `LINEAR_API_TOKEN` must be set. See the core topic for auth setup.

## Scripts

All scripts live in `claude/skills/linear/scripts/` and output JSON.

### Upload for Embed

Upload a file to Linear's cloud storage for embedding in descriptions/comments.

```bash
bun claude/skills/linear/scripts/upload.ts /path/to/screenshot.png
```

**Output:**
```json
{
  "assetUrl": "https://uploads.linear.app/...",
  "markdown": "![screenshot.png](https://uploads.linear.app/...)"
}
```

Then use the `markdown` in the issue body or comment body. The upload **must** happen before issue create/update since you need the `assetUrl`.

### Attach to Issue

Upload a file and attach it to an issue's paperclip area (attachments section).

```bash
bun claude/skills/linear/scripts/attach.ts ENG-123 /path/to/document.pdf
bun claude/skills/linear/scripts/attach.ts ENG-123 /path/to/spec.pdf --title "Feature Spec v2"
```

**Options:**
- `-t, --title <text>` - Attachment title (defaults to filename)

**Output:**
```json
{
  "assetUrl": "https://uploads.linear.app/...",
  "markdown": "![document.pdf](https://uploads.linear.app/...)",
  "attachmentId": "attachment-uuid"
}
```

### Download

Download a Linear upload to disk for local analysis.

```bash
# To a specific file path
bun claude/skills/linear/scripts/download.ts "https://uploads.linear.app/..." /tmp/screenshot.png

# To a directory (derives filename from URL)
bun claude/skills/linear/scripts/download.ts "https://uploads.linear.app/..." /tmp/
```

**Output:**
```json
{
  "path": "/tmp/screenshot.png",
  "size": 12345
}
```

Linear upload URLs require Bearer token auth. The download script handles this automatically.

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

- [Decision Guide](./decision-guide.md) - Attachment vs embed logic, edge cases
- [API Details](./api-details.md) - Upload flow internals, supported types
