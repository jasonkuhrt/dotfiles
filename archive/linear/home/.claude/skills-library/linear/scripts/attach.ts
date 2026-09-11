#!/usr/bin/env bun
/**
 * Upload a file and attach it to a Linear issue's attachments area.
 *
 * Usage:
 *   bun ~/.claude/skills/linear/scripts/attach.ts ENG-123 /path/to/document.pdf
 *   bun ~/.claude/skills/linear/scripts/attach.ts ENG-123 /path/to/file.pdf --title "Meeting Notes"
 */
import { attach } from '/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/packages/linear/src/upload.ts'
import { parseArgs } from 'node:util'

const { values, positionals } = parseArgs({
  args: Bun.argv.slice(2),
  options: {
    title: { type: `string`, short: `t` },
    help: { type: `boolean`, short: `h` },
  },
  allowPositionals: true,
})

if (values.help || positionals.length < 2) {
  console.log(`Usage: bun ~/.claude/skills/linear/scripts/attach.ts <issue-identifier> <file-path> [options]

Uploads a file and attaches it to a Linear issue's paperclip area.

Arguments:
  issue-identifier    Issue ID (e.g., ENG-123 or UUID)
  file-path          Path to the file to upload

Options:
  -t, --title <text>  Attachment title (defaults to filename)
  -h, --help          Show this help

Output (JSON):
  {
    "assetUrl": "https://uploads.linear.app/...",
    "markdown": "![filename](https://uploads.linear.app/...)",
    "attachmentId": "attachment-uuid"
  }

Examples:
  bun ~/.claude/skills/linear/scripts/attach.ts ENG-123 ./meeting-notes.pdf
  bun ~/.claude/skills/linear/scripts/attach.ts ENG-123 ./spec.pdf --title "Feature Specification v2"
`)
  process.exit(values.help ? 0 : 1)
}

const [issueId, filePath] = positionals

try {
  const result = await attach(filePath, issueId, values.title)
  console.log(JSON.stringify(result, null, 2))
} catch (err: any) {
  console.error(`Attach failed: ${err.message}`)
  process.exit(1)
}
