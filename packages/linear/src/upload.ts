import { client } from './client.js'
import { stat } from 'node:fs/promises'
import { basename } from 'node:path'

/**
 * MIME type detection from file extension.
 */
const mimeFromExtension = (filename: string): string => {
  const ext = filename.split(`.`).pop()?.toLowerCase()
  switch (ext) {
    case `png`: return `image/png`
    case `jpg`: case `jpeg`: return `image/jpeg`
    case `gif`: return `image/gif`
    case `webp`: return `image/webp`
    case `webm`: return `video/webm`
    case `mp4`: return `video/mp4`
    case `svg`: return `image/svg+xml`
    case `pdf`: return `application/pdf`
    case `md`: return `text/markdown`
    case `txt`: return `text/plain`
    case `json`: return `application/json`
    default: return `application/octet-stream`
  }
}

/**
 * Result of uploading a file to Linear's cloud storage.
 */
export interface UploadResult {
  /** The public asset URL for the uploaded file. */
  assetUrl: string
  /** Markdown embed snippet for the file. */
  markdown: string
}

/**
 * Result of uploading and attaching a file to a Linear issue.
 */
export interface AttachResult extends UploadResult {
  /** The ID of the created attachment. */
  attachmentId: string
}

/**
 * Upload a file to Linear's cloud storage (3-step signed URL flow).
 *
 * 1. `fileUpload` GraphQL mutation to get a signed upload URL + headers
 * 2. HTTP PUT binary to GCS signed URL
 * 3. Return the asset URL (for embedding in comments/descriptions)
 */
export const upload = async (filePath: string): Promise<UploadResult> => {
  const filename = basename(filePath)
  const contentType = mimeFromExtension(filename)
  const fileInfo = await stat(filePath)
  const size = fileInfo.size

  // Step 1: Get signed upload URL from Linear
  // Cast needed: Graffle's generated types for Linear's large schema exceed TS type resolution depth.
  const uploadPayload = await client.mutation.fileUpload({
    $: { contentType, filename, size },
    success: true,
    uploadFile: {
      uploadUrl: true,
      assetUrl: true,
      headers: {
        key: true,
        value: true,
      },
    },
  }) as any as FileUploadResult | null

  if (!uploadPayload?.success || !uploadPayload.uploadFile) {
    throw new Error(`fileUpload mutation failed`)
  }

  const { uploadUrl, assetUrl, headers } = uploadPayload.uploadFile

  // Step 2: PUT binary to GCS signed URL
  const file = Bun.file(filePath)
  const fileBuffer = await file.arrayBuffer()

  const uploadHeaders: Record<string, string> = {
    'Content-Type': contentType,
    'x-goog-content-length-range': `${size},${size}`,
  }

  if (headers) {
    for (const header of headers) {
      uploadHeaders[header.key] = header.value
    }
  }

  const putResponse = await fetch(uploadUrl, {
    method: `PUT`,
    headers: uploadHeaders,
    body: fileBuffer,
  })

  if (!putResponse.ok) {
    throw new Error(`Upload PUT failed with HTTP ${putResponse.status}: ${await putResponse.text()}`)
  }

  return {
    assetUrl,
    markdown: `![${filename}](${assetUrl})`,
  }
}

/**
 * Upload a file and attach it to a Linear issue (4-step flow).
 *
 * 1-2. Same as {@link upload}
 * 3. `attachmentCreate` GraphQL mutation to link the asset to an issue
 *
 * @param filePath - Path to the file to upload
 * @param issueId - Linear issue ID (UUID or identifier like "ENG-123")
 * @param title - Attachment title (defaults to filename)
 */
export const attach = async (filePath: string, issueId: string, title?: string): Promise<AttachResult> => {
  const result = await upload(filePath)
  const attachmentTitle = title ?? basename(filePath)

  // Cast needed: Graffle's generated types for Linear's large schema exceed TS type resolution depth.
  const attachPayload = await client.mutation.attachmentCreate({
    $: {
      input: {
        issueId,
        title: attachmentTitle,
        url: result.assetUrl,
      },
    },
    success: true,
    attachment: {
      id: true,
    },
  }) as any as AttachmentCreateResult | null

  if (!attachPayload?.success) {
    throw new Error(`attachmentCreate mutation failed`)
  }

  return {
    ...result,
    attachmentId: attachPayload.attachment.id,
  }
}

// ---------------------------------------------------------------------------
// Internal types for Graffle mutation results (TS can't infer these due to
// schema complexity exceeding type resolution depth).
// ---------------------------------------------------------------------------

interface FileUploadResult {
  success: boolean
  uploadFile: {
    uploadUrl: string
    assetUrl: string
    headers: Array<{ key: string; value: string }> | null
  } | null
}

interface AttachmentCreateResult {
  success: boolean
  attachment: {
    id: string
  }
}
