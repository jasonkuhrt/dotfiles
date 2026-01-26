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
import { join } from "node:path"
import { mkdir } from "node:fs/promises"
import { TranscriptEntry } from "../../lib/transcript-schema.js"
import { analyzeTranscript } from "../../lib/transcript-analyzer.js"
import { renderTimeChart, renderTokenChart, getTimeChartLabelWidth, getTokenChartLabelWidth } from "../../lib/viz/chart.js"
import { renderDimensions, getDimensionLabelWidth } from "../../lib/viz/dimensions.js"
import { renderTopConsumers, renderSummary, renderLegend } from "../../lib/viz/legend.js"
import { resolveSessionPath, extractSessionId } from "../../lib/session-resolver.js"
import { pickSession, type PickSessionOptions } from "../../lib/session-picker.js"

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

export interface AnalyzeOptions extends PickSessionOptions {}

export const transcriptAnalyze = (input: string | undefined, options: AnalyzeOptions = {}) =>
  Effect.gen(function* () {
    // If no input, use interactive picker (requires TTY)
    const sessionPath = input
      ? yield* resolveSessionPath(input)
      : yield* pickSession(options)
    const sessionId = extractSessionId(sessionPath)

    yield* Console.log(`Analyzing: ${sessionPath}`)

    const file = Bun.file(sessionPath)
    const text = yield* Effect.promise(() => file.text())
    const entries = yield* parseTranscript(text)

    if (entries.length === 0) {
      return yield* Effect.fail(new Error("No valid entries found in transcript"))
    }

    // Analyze
    const analysis = analyzeTranscript(entries)

    // Calculate shared label width (max across all sections + 1 for gutter)
    const timeWidth = getTimeChartLabelWidth(analysis.entries)
    const tokenWidth = getTokenChartLabelWidth(analysis.entries)
    const dimWidth = getDimensionLabelWidth()
    const labelWidth = Math.max(timeWidth, tokenWidth, dimWidth) + 1 // +1 for gutter space

    const output: string[] = []

    // Time chart
    output.push(...renderTimeChart(analysis.entries, labelWidth))
    output.push("")

    // Token chart
    output.push(...renderTokenChart(analysis.entries, labelWidth))
    output.push("")

    // Dimension tracks
    output.push(...renderDimensions(analysis.entries, labelWidth))

    // Top consumers (show all top 9)
    if (analysis.topConsumers.length > 0) {
      output.push(...renderTopConsumers(analysis.topConsumers))
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
