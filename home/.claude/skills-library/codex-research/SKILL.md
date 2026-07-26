---
name: codex-research
description: >
  Run a deep Codex (OpenAI) headless research pass using gpt-5.6-sol at xhigh
  reasoning effort. Use this skill whenever the user asks for "codex research",
  "openai research", "gpt research", "get a second opinion on the theory", or
  /codex-research. Sends a research question to OpenAI's Codex CLI for
  cross-model literature and algorithm research. Produces a written research
  report.
---

# Codex Research

Run a headless research pass via the Codex CLI. Produces a written research
report and prints the results.

**Invocation mechanics (model, effort, flags, background handling, output
capture) live in the `codex-dispatch` skill — read it first.** This skill only
defines the research-specific prompt shape. Per codex-dispatch: always
`-m gpt-5.6-sol -c model_reasoning_effort="xhigh"`, always `--full-auto`, always
background, never `-o`.

## Usage

The user provides a research question or topic. Codex is prompted to research
the topic thoroughly and write findings to a file.

```bash
TIMESTAMP=$(date +%Y%m%dT%H%M%S)
TOPIC="$1"  # brief slug for the filename
OUT_FILE=".tmp/codex-research-${TOPIC}-${TIMESTAMP}.md"
RAW_LOG="/tmp/codex-research-${TIMESTAMP}.raw.log"
mkdir -p .tmp

codex exec \
  --full-auto \
  -m gpt-5.6-sol \
  -c model_reasoning_effort="xhigh" \
  "${RESEARCH_PROMPT}" \
  2>&1 | tee "$RAW_LOG"
```

The `RESEARCH_PROMPT` should instruct Codex to:

1. Research the topic using its training knowledge
2. Write findings to `$OUT_FILE` with sections: Prior Art, Algorithms,
   Trade-offs, Recommendations
3. Cite specific papers, libraries, or implementations by name
4. Be explicit about what is established theory vs. speculation
5. Focus on practical applicability, not just theoretical interest

## Execution

1. Construct a detailed research prompt from the user's question
2. Run the codex command in the background (per codex-dispatch)
3. Wait for completion
4. Read the output file (`$OUT_FILE`)
5. If the output file is empty or missing, fall back to reading the raw log
6. Present the research findings to the user
