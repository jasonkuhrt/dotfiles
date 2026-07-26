---
name: codex-review
description: >
  Run a deep Codex (OpenAI) headless review using gpt-5.5 at xhigh reasoning
  effort. Use this skill whenever the user asks for a "codex review", "openai
  review", "gpt review", "get a second opinion", "external review", or
  /codex-review. Also trigger when the user says "codex" in the context of
  reviewing code, plans, or designs. This is distinct from adversarial-review
  (which uses Claude) — this sends work to OpenAI's Codex CLI for a cross-model
  perspective.
---

# Codex Review

Run a headless review via the Codex CLI. Produces a written review file and
prints the results.

**Invocation mechanics (model, effort, flags, background handling, output
capture) live in the `codex-dispatch` skill — read it first.** This skill only
defines the review-specific prompt shapes and output extraction. Per
codex-dispatch: always `-m gpt-5.5 -c model_reasoning_effort="xhigh"`, always
`--full-auto`, always background, never `-o`.

## Two modes

### 1. Code review (default, no file argument)

Reviews the current branch changes against the base branch. This is the common
case — the user just finished work and wants a review.

`codex exec review` does NOT produce a "last agent message" — the review
content appears inline in stdout. Capture stdout to a raw log and extract.

```bash
TIMESTAMP=$(date +%Y%m%dT%H%M%S)
OUT_FILE=".tmp/codex-review-${TIMESTAMP}.md"
RAW_LOG="/tmp/codex-review-${TIMESTAMP}.raw.log"
mkdir -p .tmp

# Detect base branch
BASE=$(git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's|refs/remotes/origin/||' || echo "develop")

codex exec review \
  --full-auto \
  -m gpt-5.5 \
  -c model_reasoning_effort="xhigh" \
  --base "$BASE" \
  2>&1 | tee "$RAW_LOG"

# Extract review: everything after the last bare "codex" marker line,
# excluding the "Warning: no last agent message" trailer
awk '/^codex$/ { found=NR; content="" }
     found && NR>found { content = content $0 "\n" }
     END { printf "%s", content }' "$RAW_LOG" \
  | sed '/^Warning: no last agent message/d' \
  > "$OUT_FILE"
```

### 2. Document review (file argument provided)

Reviews a specific file — a plan, design doc, RFC, architecture proposal, etc.
Uses `codex exec` (not the `review` subcommand) with a prompt that tells Codex
to write the review file directly.

```bash
TIMESTAMP=$(date +%Y%m%dT%H%M%S)
TARGET_FILE="$1"  # the file to review
OUT_FILE=".tmp/codex-review-${TIMESTAMP}.md"
mkdir -p .tmp

codex exec \
  --full-auto \
  -m gpt-5.5 \
  -c model_reasoning_effort="xhigh" \
  "Read ${TARGET_FILE} carefully and write a thorough review to ${OUT_FILE}. Cover: 1) Correctness — will this work? Are there logic errors or missing steps? 2) Gaps — what did the author forget? 3) Risks — race conditions, security, failure modes. 4) Simplification — is anything overengineered? 5) Concrete recommendations with file/line references where applicable." \
  2>&1
```

## Execution

1. Run the appropriate codex command in the background (per codex-dispatch)
2. Wait for completion via the task notification
3. Read the output file (`$OUT_FILE`)
4. If the output file is empty or missing, fall back to reading the raw log
   (`$RAW_LOG`) — the review content is at the end after the last `codex`
   marker line
5. Present the review to the user

## Review-specific flags

| Flag              | Purpose                                |
| ----------------- | -------------------------------------- |
| `--base <branch>` | Code review: diff against this branch  |

All other flags: see codex-dispatch.
