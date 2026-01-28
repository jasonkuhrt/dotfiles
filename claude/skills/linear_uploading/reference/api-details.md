# API Details

## Upload Flow (3-Step Signed URL)

The `upload()` function in `packages/linear/src/upload.ts` implements:

1. **`fileUpload` mutation** -- Requests a signed GCS upload URL from Linear
   - Input: `contentType`, `filename`, `size`
   - Returns: `uploadUrl` (signed GCS PUT target), `assetUrl` (permanent public URL), `headers` (extra headers for PUT)

2. **HTTP PUT to GCS** -- Binary upload to the signed URL
   - Headers: `Content-Type`, `x-goog-content-length-range`, plus any extra headers from step 1
   - Body: raw file bytes

3. **Return** -- `{ assetUrl, markdown }` where `markdown` is `![filename](assetUrl)`

## Attach Flow (Upload + Link)

The `attach()` function extends upload with a 4th step:

4. **`attachmentCreate` mutation** -- Links the uploaded asset to an issue
   - Input: `issueId`, `title`, `url` (the assetUrl from upload)
   - Returns: `attachmentId`

## Download Flow

The `download()` function in `packages/linear/src/download.ts`:

1. **Authenticated GET** -- Fetches from `uploads.linear.app` with Bearer token
2. **Write to disk** -- Uses `Bun.write` to save the response body
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

## Function Signatures

```typescript
// packages/linear/src/upload.ts

interface UploadResult {
  assetUrl: string   // Permanent public URL
  markdown: string   // "![filename](assetUrl)"
}

interface AttachResult extends UploadResult {
  attachmentId: string  // Linear attachment ID
}

upload(filePath: string): Promise<UploadResult>
attach(filePath: string, issueId: string, title?: string): Promise<AttachResult>

// packages/linear/src/download.ts

interface DownloadResult {
  path: string   // Absolute path where file was saved
  size: number   // Bytes written
}

download(url: string, outputPath: string): Promise<DownloadResult>
```

## GraphQL Patterns for Embed Workflows

After uploading, use the `assetUrl` in GraphQL mutations.

**Create issue with embedded image:**

```typescript
import { client } from '@jasonkuhrt/linear/client'
import { upload } from '@jasonkuhrt/linear/upload'

const { assetUrl } = await upload('/path/to/screenshot.png')

await client.mutation.issueCreate({
  $: {
    input: {
      title: 'Bug: layout broken on mobile',
      description: `The layout is broken on mobile viewport.\n\n![screenshot](${assetUrl})`,
      teamId: 'team-uuid',
    },
  },
  success: true,
  issue: { id: true, identifier: true, url: true },
})
```

**Add embedded image to existing issue description:**

```typescript
// 1. Get current description
const issue = await client.query.issue({
  $: { id: 'ENG-123' },
  description: true,
})

// 2. Upload image
const { assetUrl } = await upload('/path/to/screenshot.png')

// 3. Append to description
await client.mutation.issueUpdate({
  $: {
    id: 'issue-uuid',
    input: {
      description: `${issue.description}\n\n![screenshot](${assetUrl})`,
    },
  },
  success: true,
})
```

**Add comment with embedded image:**

```typescript
const { assetUrl } = await upload('/path/to/screenshot.png')

await client.mutation.commentCreate({
  $: {
    input: {
      issueId: 'issue-uuid',
      body: `Here's the updated screenshot:\n\n![updated](${assetUrl})`,
    },
  },
  success: true,
})
```
