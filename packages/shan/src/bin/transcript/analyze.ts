/**
 * shan transcript analyze - Visualize Claude Code session transcripts.
 *
 * Shows context window consumption and request patterns with:
 * - Two stacked charts (elapsed time + tokens)
 * - Dimension tracks (type, skill, tool, cache, model, files, trunc, error, alert, top)
 * - TOP CONSUMERS table
 * - SUMMARY and LEGEND sections
 */

import { Console, Effect, Option, Schema } from "effect"
import { homedir } from "node:os"
import { basename, join } from "node:path"
import { createHash } from "node:crypto"
import { mkdir } from "node:fs/promises"
import { Glob } from "bun"
import { TranscriptEntry } from "../../lib/transcript-schema.js"
import { analyzeTranscript } from "../../lib/transcript-analyzer.js"
import { renderTimeChart, renderTokenChart } from "../../lib/viz/chart.js"
import { renderDimensions } from "../../lib/viz/dimensions.js"
import { renderTopConsumers, renderSummary, renderLegend } from "../../lib/viz/legend.js"

// -----------------------------------------------------------------------------
// Session resolution (shared with dump.ts)
// -----------------------------------------------------------------------------

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

const getCurrentSessionId = async (): Promise<string | null> => {
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

const resolveSessionPath = (input: string) =>
  Effect.gen(function* () {
    if (input.startsWith("/") || input.startsWith("~")) {
      const resolved = input.startsWith("~") ? input.replace("~", homedir()) : input
      return resolved
    }

    const found = yield* Effect.promise(() => findSessionFile(input))
    if (found) {
      return found
    }

    return yield* Effect.fail(new Error(`No session found matching: ${input}`))
  })

// -----------------------------------------------------------------------------
// JSONL parsing
// -----------------------------------------------------------------------------

const parseTranscript = (text: string) =>
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
      }
    }

    return entries
  })

// -----------------------------------------------------------------------------
// Main command
// -----------------------------------------------------------------------------

export const transcriptAnalyze = (input: string | undefined) =>
  Effect.gen(function* () {
    let sessionInput = input

    // Default to current session if no input provided
    if (!sessionInput) {
      const currentSessionId = yield* Effect.promise(() => getCurrentSessionId())
      if (currentSessionId) {
        sessionInput = currentSessionId
        yield* Console.log(`Using current session: ${currentSessionId}`)
      } else {
        return yield* Effect.fail(
          new Error(
            "No session ID provided and couldn't detect current session.\nUsage: shan transcript analyze [session-id]"
          )
        )
      }
    }

    const sessionPath = yield* resolveSessionPath(sessionInput)
    const sessionId = basename(sessionPath).replace(/\.jsonl$/, "")

    yield* Console.log(`Analyzing: ${sessionPath}`)

    const file = Bun.file(sessionPath)
    const text = yield* Effect.promise(() => file.text())
    const entries = yield* parseTranscript(text)

    if (entries.length === 0) {
      return yield* Effect.fail(new Error("No valid entries found in transcript"))
    }

    // Analyze
    const analysis = analyzeTranscript(entries)

    // Render
    const labelWidth = 8
    const output: string[] = []

    // Time chart
    output.push(...renderTimeChart(analysis.entries, labelWidth))
    output.push("")

    // Token chart
    output.push(...renderTokenChart(analysis.entries, labelWidth))
    output.push("")

    // Dimension tracks
    output.push(...renderDimensions(analysis.entries, labelWidth))

    // Top consumers
    const topWithAlerts = analysis.topConsumers.filter((tc) => tc.deltaTokens > 5000)
    if (topWithAlerts.length > 0) {
      output.push(...renderTopConsumers(topWithAlerts))
    }

    // Summary
    output.push(...renderSummary(analysis.summary))

    // Legend
    output.push(...renderLegend())

    // Write to file
    const outputDir = join(process.cwd(), ".claude", "transcripts")
    yield* Effect.promise(() => mkdir(outputDir, { recursive: true }))
    const outputPath = join(outputDir, `${sessionId}.viz.txt`)

    yield* Effect.promise(() => Bun.write(outputPath, output.join("\n")))
    yield* Console.log(`Wrote: ${outputPath} (${analysis.summary.totalEntries} entries, ${analysis.summary.requestCount} requests)`)
  })
