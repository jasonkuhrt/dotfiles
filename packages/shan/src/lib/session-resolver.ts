/**
 * Session resolution - resolves session IDs or file paths to transcript paths.
 *
 * Resolution order:
 * 1. Absolute path (/...) - use directly
 * 2. Home-relative path (~...) - expand ~ to home directory
 * 3. Relative path with .jsonl extension - resolve relative to cwd
 * 4. Session ID prefix - search in ~/.claude/projects/**
 */

import { Effect } from "effect"
import { homedir } from "node:os"
import { basename, join, resolve } from "node:path"
import { createHash } from "node:crypto"
import { Glob } from "bun"

/**
 * Find a session file by ID prefix in ~/.claude/projects
 */
const findSessionFile = async (input: string): Promise<string | null> => {
  const claudeDir = join(homedir(), ".claude", "projects")
  const glob = new Glob("**/*.jsonl")

  for await (const file of glob.scan({ cwd: claudeDir, absolute: true })) {
    if (basename(file).startsWith(input)) {
      return file
    }
  }
  return null
}

/**
 * Get the current session ID from tmp files (written by hooks)
 */
export const getCurrentSessionId = async (): Promise<string | null> => {
  const cwd = process.cwd()
  const cwdHash = createHash("md5").update(cwd).digest("hex").slice(0, 8)

  const paths = [
    `/tmp/claude-session-id-${cwdHash}`,
    "/tmp/claude-session-id",
  ]

  for (const path of paths) {
    const file = Bun.file(path)
    if (await file.exists()) {
      const content = await file.text()
      const sessionId = content.trim()
      if (sessionId) return sessionId
    }
  }
  return null
}

/**
 * Resolve input to an absolute transcript file path.
 *
 * Accepts:
 * - Absolute path: /path/to/file.jsonl
 * - Home path: ~/path/to/file.jsonl
 * - Relative path: ./file.jsonl or path/to/file.jsonl (if ends with .jsonl)
 * - Session ID: abc123 (prefix match in ~/.claude/projects)
 */
export const resolveSessionPath = (input: string) =>
  Effect.gen(function* () {
    // Absolute path
    if (input.startsWith("/")) {
      return input
    }

    // Home-relative path
    if (input.startsWith("~")) {
      return input.replace("~", homedir())
    }

    // Relative path (ends with .jsonl)
    if (input.endsWith(".jsonl")) {
      return resolve(process.cwd(), input)
    }

    // Session ID prefix - search in ~/.claude/projects
    const found = yield* Effect.promise(() => findSessionFile(input))
    if (found) {
      return found
    }

    return yield* Effect.fail(new Error(`No session found matching: ${input}`))
  })

/**
 * Extract session ID from a path (filename without .jsonl extension)
 */
export const extractSessionId = (path: string): string =>
  basename(path).replace(/\.jsonl$/, "")
