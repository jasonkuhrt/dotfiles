#!/usr/bin/env bun
/**
 * Download a file from Linear's uploads storage.
 *
 * Usage:
 *   bun ~/.claude/skills/linear/scripts/download.ts https://uploads.linear.app/... /tmp/screenshot.png
 *   bun ~/.claude/skills/linear/scripts/download.ts https://uploads.linear.app/... /tmp/  # derives filename
 */
import { download } from '/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/packages/linear/src/download.ts'
import { parseArgs } from 'node:util'

const { values, positionals } = parseArgs({
  args: Bun.argv.slice(2),
  options: {
    help: { type: `boolean`, short: `h` },
  },
  allowPositionals: true,
})

if (values.help || positionals.length < 2) {
  console.log(`Usage: bun ~/.claude/skills/linear/scripts/download.ts <url> <output-path>

Downloads a file from Linear's uploads storage (requires auth).

Arguments:
  url           Linear asset URL (https://uploads.linear.app/...)
  output-path   Where to save. If ends with /, derives filename from URL.

Output (JSON):
  {
    "path": "/absolute/path/to/file.png",
    "size": 12345
  }

Examples:
  bun ~/.claude/skills/linear/scripts/download.ts "https://uploads.linear.app/.../file.png" /tmp/screenshot.png
  bun ~/.claude/skills/linear/scripts/download.ts "https://uploads.linear.app/.../file.png" /tmp/
`)
  process.exit(values.help ? 0 : 1)
}

const [url, outputPath] = positionals

try {
  const result = await download(url, outputPath)
  console.log(JSON.stringify(result, null, 2))
} catch (err: any) {
  console.error(`Download failed: ${err.message}`)
  process.exit(1)
}
