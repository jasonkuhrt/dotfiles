---
name: codex-research
description: >
  Run a deep Codex (OpenAI) headless research pass using gpt-5.4 with full-auto mode.
  Use this skill whenever the user asks for "codex research", "openai research",
  "gpt research", "get a second opinion on the theory", or /codex-research.
  Sends a research question to OpenAI's Codex CLI for cross-model literature
  and algorithm research. Produces a written research report.
---

# Codex Research

Run a headless research pass via the Codex CLI (`codex exec`) using OpenAI's strongest model. Produces a written research report and prints the results.

## Usage

The user provides a research question or topic. Codex is prompted to research the topic thoroughly and write findings to a file.

```bash
TIMESTAMP=$(date +%Y%m%dT%H%M%S)
TOPIC="$1"  # brief slug for the filename
OUT_FILE=".tmp/codex-research-${TOPIC}-${TIMESTAMP}.md"
RAW_LOG="/tmp/codex-research-${TIMESTAMP}.raw.log"
mkdir -p .tmp

codex exec \
  --full-auto \
  -m gpt-5.4 \
  "${RESEARCH_PROMPT}" \
  2>&1 | tee "$RAW_LOG"
```

The `RESEARCH_PROMPT` should instruct Codex to:
1. Research the topic using its training knowledge
2. Write findings to `$OUT_FILE` with sections: Prior Art, Algorithms, Trade-offs, Recommendations
3. Cite specific papers, libraries, or implementations by name
4. Be explicit about what is established theory vs. speculation
5. Focus on practical applicability, not just theoretical interest

## Execution

1. Construct a detailed research prompt from the user's question
2. Run the codex command in the background (`run_in_background: true`)
3. Wait for completion
4. Read the output file (`$OUT_FILE`)
5. If the output file is empty or missing, fall back to reading the raw log
6. Present the research findings to the user

## Flags reference

| Flag              | Purpose                                                 |
| ----------------- | ------------------------------------------------------- |
| `--full-auto`     | No approval prompts, workspace-write sandbox            |
| `-m gpt-5.4`     | OpenAI's strongest model (user's max plan)              |
| `--ephemeral`     | Optional: skip session persistence for faster execution |

**Do NOT use `-o`** — same issue as codex-review, capture stdout instead.

## Important

- Always run in the background — Codex research takes 1-3 minutes
- Always write output to `.tmp/codex-research-*.md` so results persist
- The `--full-auto` flag is critical — without it, Codex blocks waiting for approval
- If Codex fails with a model error, fall back to the default (omit `-m`)
