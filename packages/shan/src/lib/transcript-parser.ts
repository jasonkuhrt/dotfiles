/**
 * Shared JSONL transcript parser.
 *
 * Uses Effect Schema to decode each JSON line into a typed TranscriptEntry.
 */

import { Console, Effect, Option, Schema } from "effect"
import { TranscriptEntry } from "./transcript-schema.js"

export const parseTranscriptEntries = (text: string) =>
  Effect.gen(function* () {
    const lines = text.trim().split("\n")
    const entries: TranscriptEntry[] = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]!.trim()
      if (!line) continue

      const raw = yield* Effect.try({
        try: () => JSON.parse(line) as unknown,
        catch: () => new Error(`Invalid JSON at line ${i + 1}`),
      })

      const decoded = Schema.decodeUnknownOption(TranscriptEntry)(raw)
      if (Option.isSome(decoded)) {
        entries.push(decoded.value)
      } else {
        const rawObj = raw as { type?: string }
        yield* Console.warn(`Unknown entry type "${rawObj.type}" at line ${i + 1}`)
      }
    }

    return entries
  })
