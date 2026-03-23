---
name: codex-review
description: >
  Run a deep Codex (OpenAI) headless review using gpt-5.4 with full-auto mode.
  Use this skill whenever the user asks for a "codex review", "openai review",
  "gpt review", "get a second opinion", "external review", or /codex-review.
  Also trigger when the user says "codex" in the context of reviewing code,
  plans, or designs. This is distinct from adversarial-review (which uses
  Claude) — this sends work to OpenAI's Codex CLI for a cross-model perspective.
---

# Codex Review

Run a headless review via the Codex CLI (`codex exec review` or `codex exec`) using OpenAI's strongest model. Produces a written review file and prints the results.

## Two modes

### 1. Code review (default, no file argument)

Reviews the current branch changes against the base branch. This is the common case — the user just finished work and wants a review.

```bash
TIMESTAMP=$(date +%Y%m%dT%H%M%S)
OUT_FILE=".tmp/codex-review-${TIMESTAMP}.md"
mkdir -p .tmp

# Detect base branch
BASE=$(git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's|refs/remotes/origin/||' || echo "develop")

codex exec review \
  --full-auto \
  -m gpt-5.4 \
  --base "$BASE" \
  -o "$OUT_FILE" \
  2>&1
```

### 2. Document review (file argument provided)

Reviews a specific file — a plan, design doc, RFC, architecture proposal, etc. Uses `codex exec` (not `review` subcommand) with a prompt that reads and critiques the file.

**Important:** Do NOT use `-o` here. The prompt tells Codex to write the review to `$OUT_FILE` via file write (apply_patch). Adding `-o` would overwrite the full review with just the agent's final summary message.

```bash
TIMESTAMP=$(date +%Y%m%dT%H%M%S)
TARGET_FILE="$1"  # the file to review
OUT_FILE=".tmp/codex-review-${TIMESTAMP}.md"
mkdir -p .tmp

codex exec \
  --full-auto \
  -m gpt-5.4 \
  "Read ${TARGET_FILE} carefully and write a thorough review to ${OUT_FILE}. Cover: 1) Correctness — will this work? Are there logic errors or missing steps? 2) Gaps — what did the author forget? 3) Risks — race conditions, security, failure modes. 4) Simplification — is anything overengineered? 5) Concrete recommendations with file/line references where applicable." \
  2>&1
```

## Execution

1. Run the appropriate codex command in the background (`run_in_background: true`)
2. Wait for completion via `TaskOutput`
3. Read the output file
4. Present the review to the user

## Flags reference

| Flag              | Purpose                                                 |
| ----------------- | ------------------------------------------------------- |
| `--full-auto`     | No approval prompts, workspace-write sandbox            |
| `-m gpt-5.4`      | OpenAI's strongest model (user's max plan)              |
| `--base <branch>` | Code review: diff against this branch                   |
| `-o <file>`       | Write the agent's final message to this file            |
| `--ephemeral`     | Optional: skip session persistence for faster execution |

## Important

- Always run in the background — Codex reviews take 1-3 minutes
- Always write output to `.tmp/codex-review-*.md` so results persist
- The `--full-auto` flag is critical — without it, Codex blocks waiting for approval
- If Codex fails with a model error, the user's plan may not support that model. Fall back to the default (omit `-m`)
