/**
 * Shared I/O boilerplate for transcript commands.
 *
 * Handles session resolution, transcript loading, and output directory setup.
 */

import { Console, Effect } from "effect"
import { join } from "node:path"
import { mkdir } from "node:fs/promises"
import type { TranscriptEntry } from "./transcript-schema.js"
import { parseTranscriptEntries } from "./transcript-parser.js"
import { resolveSessionPath, extractSessionId } from "./session-resolver.js"
import { pickSession, type PickSessionOptions } from "./session-picker.js"

export interface LoadedTranscript {
  sessionPath: string
  sessionId: string
  entries: TranscriptEntry[]
}

/**
 * Resolve session target + load and parse the transcript JSONL.
 */
export const loadTranscript = (input: string | undefined, options: PickSessionOptions = {}) =>
  Effect.gen(function* () {
    const sessionPath = input
      ? yield* resolveSessionPath(input)
      : yield* pickSession(options)
    const sessionId = extractSessionId(sessionPath)

    yield* Console.log(`Reading: ${sessionPath}`)

    const text = yield* Effect.promise(() => Bun.file(sessionPath).text())
    const entries = yield* parseTranscriptEntries(text)

    return { sessionPath, sessionId, entries } satisfies LoadedTranscript
  })

/**
 * Ensure the .claude/transcripts/ output directory exists and return its path.
 */
export const ensureOutputDir = () =>
  Effect.gen(function* () {
    const outputDir = join(process.cwd(), ".claude", "transcripts")
    yield* Effect.promise(() => mkdir(outputDir, { recursive: true }))
    return outputDir
  })

/**
 * Write content to a file in the output directory.
 */
export const writeOutput = (outputDir: string, filename: string, content: string) =>
  Effect.gen(function* () {
    const outputPath = join(outputDir, filename)
    yield* Effect.promise(() => Bun.write(outputPath, content))
    return outputPath
  })
