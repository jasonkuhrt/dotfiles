#!/usr/bin/env bun
/**
 * Upload a file to Linear's cloud storage for embedding in descriptions/comments.
 *
 * Usage:
 *   bun scripts/upload.ts /path/to/screenshot.png
 */
import { upload } from '/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/packages/linear/src/upload.ts'
import { parseArgs } from 'node:util'

const { values, positionals } = parseArgs({
  args: Bun.argv.slice(2),
  options: {
    help: { type: `boolean`, short: `h` },
  },
  allowPositionals: true,
})

if (values.help || positionals.length === 0) {
  console.log(`Usage: bun scripts/upload.ts <file-path>

Uploads a file to Linear's cloud storage and returns the asset URL
and markdown embed snippet for use in issue descriptions or comments.

Output (JSON):
  {
    "assetUrl": "https://uploads.linear.app/...",
    "markdown": "![filename](https://uploads.linear.app/...)"
  }

Examples:
  bun scripts/upload.ts ./screenshot.png
  bun scripts/upload.ts ~/Downloads/diagram.svg
`)
  process.exit(values.help ? 0 : 1)
}

const filePath = positionals[0]

try {
  const result = await upload(filePath)
  console.log(JSON.stringify(result, null, 2))
} catch (err: any) {
  console.error(`Upload failed: ${err.message}`)
  process.exit(1)
}
