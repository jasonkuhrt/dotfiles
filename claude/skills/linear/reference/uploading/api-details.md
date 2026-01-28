# API Details

## Upload Flow (3-Step Signed URL)

The upload script implements a 3-step flow:

1. **`fileUpload` mutation** -- Requests a signed GCS upload URL from Linear
   - Input: `contentType`, `filename`, `size`
   - Returns: `uploadUrl` (signed GCS PUT target), `assetUrl` (permanent public URL), `headers` (extra headers for PUT)

2. **HTTP PUT to GCS** -- Binary upload to the signed URL
   - Headers: `Content-Type`, `x-goog-content-length-range`, plus any extra headers from step 1
   - Body: raw file bytes

3. **Return** -- `{ assetUrl, markdown }` where `markdown` is `![filename](assetUrl)`

## Attach Flow (Upload + Link)

The attach script extends upload with a 4th step:

4. **`attachmentCreate` mutation** -- Links the uploaded asset to an issue
   - Input: `issueId`, `title`, `url` (the assetUrl from upload)
   - Returns: `attachmentId`

## Download Flow

The download script:

1. **Authenticated GET** -- Fetches from `uploads.linear.app` with Bearer token
2. **Write to disk** -- Saves the response body
3. **Path resolution** -- If `outputPath` ends with `/`, derives filename from the URL pathname

## Supported File Types

MIME detection is automatic from file extension:

| Extension | MIME Type |
|-----------|-----------|
| `.png` | `image/png` |
| `.jpg`, `.jpeg` | `image/jpeg` |
| `.gif` | `image/gif` |
| `.webp` | `image/webp` |
| `.svg` | `image/svg+xml` |
| `.mp4` | `video/mp4` |
| `.webm` | `video/webm` |
| `.pdf` | `application/pdf` |
| `.md` | `text/markdown` |
| `.txt` | `text/plain` |
| `.json` | `application/json` |
| Other | `application/octet-stream` |

## Script Outputs

### Upload

```bash
bun claude/skills/linear/scripts/upload.ts /path/to/file.png
```

```json
{
  "assetUrl": "https://uploads.linear.app/...",
  "markdown": "![file.png](https://uploads.linear.app/...)"
}
```

### Attach

```bash
bun claude/skills/linear/scripts/attach.ts ENG-123 /path/to/file.pdf
```

```json
{
  "assetUrl": "https://uploads.linear.app/...",
  "markdown": "![file.pdf](https://uploads.linear.app/...)",
  "attachmentId": "attachment-uuid"
}
```

### Download

```bash
bun claude/skills/linear/scripts/download.ts "https://uploads.linear.app/..." /tmp/file.png
```

```json
{
  "path": "/tmp/file.png",
  "size": 12345
}
```

## Embed Workflows with Scripts

After uploading, use the `assetUrl` in issue creation or updates.

**Create issue with embedded image:**

```bash
# 1. Upload image
result=$(bun claude/skills/linear/scripts/upload.ts /path/to/screenshot.png)
asset_url=$(echo "$result" | jq -r '.assetUrl')

# 2. Create issue with embedded image
bun claude/skills/linear/scripts/create.ts \
  --title "Bug: layout broken on mobile" \
  --team ENG \
  --description "The layout is broken on mobile viewport.

![screenshot](${asset_url})"
```

**Add comment with embedded image:**

```bash
# 1. Upload image
result=$(bun claude/skills/linear/scripts/upload.ts /path/to/screenshot.png)
markdown=$(echo "$result" | jq -r '.markdown')

# 2. Post comment
bun claude/skills/linear/scripts/comment.ts ENG-123 "Here's the updated screenshot:

${markdown}"
```

**For complex workflows**, use the gql escape hatch directly to construct mutations with precise control over descriptions and bodies.
