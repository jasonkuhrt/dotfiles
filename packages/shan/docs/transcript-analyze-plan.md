# Transcript Analyzer Implementation Plan

## Overview

Add a `shan transcript analyze <session-id>` command that visualizes Claude Code session transcripts with focus on context window consumption and request patterns.

## Output Visualization

Two stacked charts sharing x-axis (columns = transcript entries), followed by dimension tracks and summary, legend.

```
                                   4m 56s
      4m                            ▃▅▆██
      3m                        ▂▄▆██████
      2m                    ▁▃▅██████████
      1m      ▁▂▃▄▄▅▅▆▆▇▇████████████████

                            84,129 Tokens
     80k                            ▄▆▇██
     70k                          ▅██████
     60k                        ▄████████
     50k                      ▃██████████
     40k                  ▁▃▅████████████
     30k                ▃████████████████
     20k          ▁▂▃▄▆██████████████████
     10k      ▁▃▅████████████████████████

    type      ◦ ●   ◦ ●   ◦ ●● ◦ ●   ◦●  ●
   skill        ◆       ◇     ╰
    tool            ▢         ▣     ▤
   cache        ○   ●   ●   ○     ●
   model        ◈   ◈   ◈◈  ◇     ◈
   files            1             3
   trunc                    †
   error                    ×
   alert        ‼           ‼     ‼
     top        1           2     3

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 TOP CONSUMERS (Δ > 5k tokens)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   1  #12  +8.2k  Read ×3           cc-internals      opus   ○ miss
   2  #28  +6.1k  WebFetch          ref               opus   ● hit
   3  #45  +5.4k  Task (Explore)                      opus   ○ miss

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 Entries  68 (8 requests, 15 user, 24 progress)
   Cache  hit rate  75%
  Errors  1   
   Trunc  1   
  Alerts  2
  
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  LEGEND
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    type   (empty) progress/system/snapshot   ◦ user   ● assistant
   skill   ◆ initial load   ╰ progressive @ref   ◇ other
    tool   ▢ Bash   ▤ Read   ▣ WebFetch   ▥ Grep   ▦ Edit   ▧ Glob
   cache   ● hit   ○ miss
   model   ◈ opus   ◇ sonnet   ◦ haiku
   files   1-9 count   + 10+
   trunc   † truncated
   error   × failed
   alert   ‼ 5k+ tokens
     top   1-9 rank in top consumers
```

### Visual Design Notes

* Y-axis labels left-aligned with consistent width
* Dimension labels align with y-axis labels
* Unicode symbols distinguish categories
* __Terminal limitation:__ Horizontal gaps between rows are unavoidable in text mode (line spacing). Best viewed in terminal with tight line height settings.

## Chart Specifications

### Elapsed Time Chart (top)

* __Header:__ Final elapsed time right-aligned above chart (e.g., `4:56`)
* Y-axis: cumulative elapsed time since session start (auto-scale based on total duration)
* X-axis: one column per transcript entry
* __All entries have data points__ — time passes continuously
* Fill character: `▓` (medium shade)
* Use `▁▂▃▄▅▆▇█` for sub-row precision
* Filled area chart: all rows below current value filled with `▓`

### Context Chart (bottom)

* __Header:__ Final token count right-aligned above chart (e.g., `84,129 Tokens`)
* Y-axis: cumulative tokens (auto-scale based on final total)
* X-axis: one column per transcript entry
* __All entries have data points__ — tokens stay flat between assistant responses
* Fill character: `█` family (`▁▂▃▄▅▆▇█`) for sub-row precision
* Filled area chart: all rows below current value filled with `█`

### Sub-row Precision

Each character cell represents a range of values. Use block elements for 8 levels of precision within a row:

```typescript
const BLOCKS = [' ', '▁', '▂', '▃', '▄', '▅', '▆', '▇', '█']

function getBlockChar(value: number, rowMin: number, rowMax: number): string {
  const normalized = (value - rowMin) / (rowMax - rowMin)
  const index = Math.round(normalized * 8)
  return BLOCKS[Math.min(index, 8)]
}
```

## Dimension Tracks

Each dimension is a row below the charts. One character per column, aligned with chart columns.

| Dimension | Applies To            | Symbols                                                           |
| --------- | --------------------- | ----------------------------------------------------------------- |
| `type`    | all                   | (space) = progress/system/snapshot, `◦` = user, `●` = assistant   |
| `skill`   | assistant             | `◆` = initial load, `╰` = progressive @ref, `◇` = different skill |
| `tool`    | assistant             | `▢`=Bash `▤`=Read `▣`=WebFetch `▥`=Grep `▦`=Edit `▧`=Glob         |
| `cache`   | assistant             | `●` = cache hit (cache_read > 0), `○` = cache miss                |
| `model`   | assistant             | `◈` = opus, `◇` = sonnet, `◦` = haiku                             |
| `files`   | assistant (Read tool) | `1`-`9` = count, `+` = 10+                                        |
| `trunc`   | user (tool_result)    | `†` = truncated                                                   |
| `error`   | user (tool_result)    | `×` = error                                                       |
| `alert`   | assistant             | `‼` = Δ tokens > 5000                                             |
| `top`     | assistant             | `1`-`9` = rank in top consumers (by Δ tokens)                     |

__Empty cells:__ Use space character for N/A / null / none. Values pop visually against whitespace.

## Top Consumers Section

Lists top 9 assistant turns by Δ tokens (sorted descending). Limited to 9 so rank fits in dimension track.

| Column | Width | Content                                     |
| ------ | ----- | ------------------------------------------- |
| rank   | 4     | 1-9 ranking (matches `top` dimension track) |
| index  | 4     | Turn number with `#` prefix                 |
| delta  | 6     | Token delta with `+` prefix and `k` suffix  |
| tools  | 18    | Tool names with counts (e.g., `Read ×3`)    |
| skill  | 18    | Active skill name (empty if none)           |
| model  | 6     | `opus` / `sonnet` / `haiku`                 |
| cache  | 6     | `● hit` / `○ miss`                          |

## Data Model

### Key Insight: requestId Groups

Multiple `assistant` entries can share the same `requestId` (one API call produces thinking + text + tool_use blocks). Group by `requestId` to get actual request-level stats.

### Token Calculation

From `assistant` entries, extract `message.usage`:

```typescript
interface Usage {
  input_tokens: number
  output_tokens: number
  cache_creation_input_tokens?: number
  cache_read_input_tokens?: number
}
```

* __Cumulative context__ = running sum of `input_tokens + output_tokens` per unique `requestId`
* __Cache hit__ = `cache_read_input_tokens > 0`
* __Alert__ = delta > 5000 tokens

### Elapsed Time Calculation

Calculate cumulative time from session start to each assistant response using entry timestamps. Parse ISO timestamps and compute delta from first entry's timestamp.

### Skill Detection

Look for user messages containing skill content:

* Pattern: `"Base directory for this skill:"` in message content
* Extract skill name from path
* Progressive disclosure: subsequent loads from same skill directory

### Tool Detection

From `assistant` entries, check `message.content` for `tool_use` blocks:

```typescript
interface ToolUseBlock {
  type: 'tool_use'
  name: string // "Bash", "Read", etc.
  input: unknown
}
```

### Truncation/Error Detection

From `user` entries with `toolUseResult`:

```typescript
interface ToolUseResult {
  truncated?: boolean
  interrupted?: boolean
  // ... varies by tool
}
```

Or from `tool_result` content blocks with `is_error: true`.

## File Structure

```
packages/shan/
├── src/
│   ├── bin/
│   │   ├── shan.ts                    # CLI entry (existing)
│   │   └── transcript/
│   │       ├── dump.ts                # Existing dump command
│   │       └── analyze.ts             # NEW: analyze command
│   └── lib/
│       ├── transcript-schema.ts       # Existing schemas
│       ├── transcript-analyzer.ts     # NEW: analysis logic
│       └── viz/
│           ├── chart.ts               # NEW: chart rendering
│           ├── dimensions.ts          # NEW: dimension track rendering
│           └── legend.ts              # NEW: legend rendering
```

## Implementation Steps

### Step 1: Extend CLI

Add `analyze` subcommand to `shan.ts`:

```typescript
// packages/shan/src/bin/shan.ts
if (args[0] === 'transcript') {
  if (args[1] === 'dump') { /* existing */ }
  if (args[1] === 'analyze') {
    await import('./transcript/analyze.js').then(m => m.run(args.slice(2)))
  }
}
```

### Step 2: Build Analyzer Core

`transcript-analyzer.ts`:

1. Parse JSONL using existing `TranscriptEntry` schema
2. Group assistant entries by `requestId`
3. For each request, compute:
   * Total input/output tokens
   * Cumulative context size
   * Cumulative elapsed time from session start
   * Cache hit/miss
   * Tools used
4. For each entry, compute:
   * Type symbol
   * Associated request (if any)
5. Detect skill loads from user message content
6. Detect errors/truncation from toolUseResult

Output: `AnalyzedTranscript` with all computed data.

### Step 3: Build Chart Renderer

`viz/chart.ts`:

1. Calculate y-axis scale (auto-fit to data)
2. Calculate row boundaries
3. For each column (entry):
   * If assistant with data: compute block character for sub-row position
   * Else: empty space
4. Render rows top-to-bottom
5. Handle y-axis labels (left gutter)

### Step 4: Build Dimension Renderer

`viz/dimensions.ts`:

1. For each dimension track:
   * Map entries to symbols based on dimension rules
   * Render as single row of characters
2. Left gutter: dimension names (right-aligned, max width ~8 chars)

### Step 5: Build Legend Renderer

`viz/legend.ts`:

1. For each dimension: two-line format
   * Line 1: dimension name + description
   * Line 2: symbol definitions
2. Summary stats at bottom

### Step 6: Wire Up CLI

`transcript/analyze.ts`:

1. Resolve session ID to file path (reuse from dump.ts)
2. Load and parse transcript
3. Run analyzer
4. Render charts + dimensions + legend
5. Output to stdout (or optionally write to file)

## Dependencies

Use existing:

* `effect` / `effect/Schema` for parsing
* Existing `TranscriptEntry` schema from `transcript-schema.ts`

No new dependencies needed.

## Usage

```bash
# Analyze by session ID prefix
bun packages/shan/src/bin/shan.ts transcript analyze dc8ffe42

# Analyze by full path
bun packages/shan/src/bin/shan.ts transcript analyze ~/.claude/projects/.../session.jsonl

# Future options (not in MVP)
# --requests-only    Only show request columns, hide progress/system
# --no-time          Hide elapsed time chart
# --output=file.txt  Write to file instead of stdout
```

## Testing

Use existing transcript files in `~/.claude/projects/` for testing:

* Small: `c5a15184-bef9-40fc-8de6-e151c3ff833e` (68 entries, 8 requests)
* Large: `e78ad79f-15e4-4871-ba27-490d1a19b5de` (heartbeat, hundreds of entries)

## Notes

* Terminal width: assume 120+ columns available, but gracefully handle narrower
* All rendering is pure string manipulation, no external viz libraries
* Effect is used for type-safe parsing and effectful I/O, not for rendering logic
