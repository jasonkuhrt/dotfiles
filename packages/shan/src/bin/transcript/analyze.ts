/**
 * shan transcript analyze - Visualize Claude Code session transcripts.
 *
 * Shows context window consumption and request patterns with:
 * - Two stacked charts (elapsed time + tokens)
 * - Dimension tracks (type, skill, tool, cache, model, files, trunc, error, alert, top)
 * - TOP CONSUMERS table
 * - SUMMARY and LEGEND sections
 */

import { Console, Effect } from "effect"
import { analyzeTranscript } from "../../lib/transcript-analyzer.js"
import { renderTimeChart, renderTokenChart, getTimeChartLabelWidth, getTokenChartLabelWidth } from "../../lib/viz/chart.js"
import { renderDimensions, getDimensionLabelWidth } from "../../lib/viz/dimensions.js"
import { renderTopConsumers, renderSummary, renderLegend } from "../../lib/viz/legend.js"
import { loadTranscript, ensureOutputDir, writeOutput } from "../../lib/transcript-io.js"
import type { PickSessionOptions } from "../../lib/session-picker.js"

// -----------------------------------------------------------------------------
// Main command
// -----------------------------------------------------------------------------

export interface AnalyzeOptions extends PickSessionOptions {}

export const transcriptAnalyze = (input: string | undefined, options: AnalyzeOptions = {}) =>
  Effect.gen(function* () {
    const { sessionId, entries } = yield* loadTranscript(input, options)

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
    const outputDir = yield* ensureOutputDir()
    const outputPath = yield* writeOutput(outputDir, `${sessionId}.viz.txt`, output.join("\n"))
    yield* Console.log(`Wrote: ${outputPath} (${analysis.summary.totalEntries} entries, ${analysis.summary.requestCount} requests)`)
  })
