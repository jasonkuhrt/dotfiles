import { basename } from 'node:path'

const token = process.env[`LINEAR_API_TOKEN`]

if (!token) {
  throw new Error(`LINEAR_API_TOKEN environment variable is required`)
}

/**
 * Result of downloading a file from Linear.
 */
export interface DownloadResult {
  /** The absolute path where the file was saved. */
  path: string
  /** The number of bytes written. */
  size: number
}

/**
 * Download a file from Linear's uploads storage.
 *
 * Linear upload URLs (uploads.linear.app) require Bearer token authentication.
 * This function handles the auth'd GET and saves the file to disk using Bun.write.
 *
 * @param url - The Linear asset URL (https://uploads.linear.app/...)
 * @param outputPath - Where to save the file. If a directory, uses the filename from the URL.
 */
export const download = async (url: string, outputPath: string): Promise<DownloadResult> => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Download failed with HTTP ${response.status}: ${await response.text()}`)
  }

  // If outputPath is a directory, derive filename from URL
  const resolvedPath = outputPath.endsWith(`/`)
    ? `${outputPath}${basename(new URL(url).pathname)}`
    : outputPath

  const buffer = await response.arrayBuffer()
  await Bun.write(resolvedPath, buffer)

  return {
    path: resolvedPath,
    size: buffer.byteLength,
  }
}
