---
name: codex-dispatch
description: >
  The canonical way to dispatch work to OpenAI gpt-5.6-sol for ANY purpose —
  review, research, implementation, burndown, second opinions. Use whenever
  dispatching work to Codex/sol, or when another skill (codex-review,
  codex-research) needs the invocation mechanics. Also trigger when the user
  says "run codex", "dispatch to codex", "use codex to implement/execute".
  Dispatch runs EXCLUSIVELY through the claudex apiproxy (sol inside the
  Claude Code harness); if the proxy is unavailable, HALT — never fall back
  to the codex CLI.
---

# Codex Dispatch

Canonical invocation mechanics for dispatching work to gpt-5.6-sol. Purpose-
specific skills (codex-review, codex-research) define WHAT to ask; this skill
defines HOW to invoke. When in doubt, this skill wins on surface and process
handling.

## The one and only surface: claudex (apiproxy)

**All dispatch runs through `claudex`** — CLIProxyAPI (127.0.0.1:8317) fronts
the Codex OAuth as an Anthropic-compatible endpoint, and Claude Code runs
against it with `--model gpt-5.6-sol`. The worker is sol INSIDE the Claude
Code harness: it loads CLAUDE.md, rules, project memory, skills, and hooks
automatically — briefs carry task + gates, not house rules.

- Only the Codex OAuth is proxied (`cliproxyapi -codex-login`). Claude auth
  never routes through the proxy; normal `claude` and `codex` are unaffected.
- Entry point: the `claudex` fish function
  (dotfiles `home/.config/fish/functions/claudex.fish`) — sets
  `ANTHROPIC_BASE_URL`, `ANTHROPIC_AUTH_TOKEN` (from
  `~/.cli-proxy-api/client.key`), `CLAUDE_CODE_SUBAGENT_MODEL=gpt-5.6-sol`,
  then `claude --model gpt-5.6-sol $argv` (args forward).

**The codex CLI (`codex exec`, `codex exec resume`) is NOT a dispatch
surface. Never use it. There is no fallback mode.**

## Readiness check — HALT on failure

Before the first dispatch in a thread:

```bash
curl -s http://127.0.0.1:8317/v1/models -H "Authorization: Bearer $(cat ~/.cli-proxy-api/client.key)" | head -c 200
```

If the probe fails, the key is missing, or `gpt-5.6-sol` is absent from the
model list: **HALT.** Report the exact failure and the likely remedy
(`brew services start cliproxyapi`; re-auth via `cliproxyapi -codex-login`;
key perms) and stop. Do not run the remedies yourself, do not degrade to
another model, do not touch the codex CLI, do not point normal `claude` at
the proxy.

The same rule applies mid-run: a dispatch that errors on proxy/auth grounds
is reported and halted, not retried on another surface.

## The canonical invocation

```bash
fish -lc 'claudex -p "$(cat '"$PROMPT_FILE"')" --verbose --output-format stream-json --disallowedTools Agent' \
  2>&1 | tee "$RAW_LOG"
```

- **Prompt positional comes IMMEDIATELY after `-p`; `--disallowedTools` goes
  LAST.** `--disallowedTools <tools...>` is variadic — any positional after it
  (including the prompt) is swallowed as a tool name, and the run dies with
  "Input must be provided either through stdin or as a prompt argument"
  (observed 2026-07-18).

- `claudex` is a fish function — from a non-fish shell, wrap with `fish -lc`.
- **Prompt via a file** for anything longer than a sentence; write it to the
  session scratchpad. `-p` runs headless print mode.
- **`--verbose --output-format stream-json` is REQUIRED** — it streams every
  tool call live into the log, so progress is observable from the log tail.
  Without it the run is silent until the final message and a wedged or derailed
  worker is indistinguishable from a thinking one. (Bug found 2026-07-18: a
  silent dispatch hid a worker that did zero work.)
- **`--disallowedTools Agent` is REQUIRED** — hard-blocks subagent spawning
  at the permission layer. Root cause found 2026-07-18: workers inherit the
  lead's project memory, including the "all coding dispatched to Codex" HARD
  RULE, and obey it by recursively dispatching their own claudex children,
  which die when the headless turn ends (two silent zero-edit runs). The
  systemic fix is the `CLAUDEX_WORKER=1` env stamp (set by the claudex fish
  function) + the `claudex-worker-identity.sh` SessionStart hook that injects
  "you ARE the dispatch target — work inline" into every worker session; this
  flag is the mechanical backstop for the Agent-tool path.
- **Always capture all output** (`2>&1 | tee`). Never `2>/dev/null`.
- **Always run in the background** (`run_in_background: true`) — sol runs
  take minutes to tens of minutes. Read the log for interim progress; act on
  the completion notification.
- **Only one write-capable worker per worktree.** Parallelize read-only work
  freely; write-parallelism needs separate worktrees.

## Sessions: resume by default

A claudex worker is a Claude Code session; continuity is Claude-native:

```bash
fish -lc 'claudex --resume "$SESSION_ID" -p "$(cat '"$PROMPT_FILE"')" --verbose --output-format stream-json --disallowedTools Agent' 2>&1 | tee -a "$RAW_LOG"
```

- **Record every session at dispatch time** in the scratchpad ledger
  (`codex-sessions.md`): job id, repo root, claude session id, prompt file,
  raw log, status, summary. The session id appears in the run output/log.
- Resume by EXPLICIT session id from the ledger — never guess, never use
  "most recent".
- Start fresh only for: a genuinely new domain; wanted independence
  (adversarial second opinion — prior context would bias it); or a
  contaminated session.

## Prompt contract

Brief the worker as a capable engineer. It already has the repo rules,
memory, and skills via the harness — do NOT restate house conventions; state
what is task-specific:

- **MANDATORY process-constraint block in EVERY prompt** (verbatim or
  equivalent): "You run in headless print mode: the process exits when your
  turn ends, killing any background work. Do ALL work yourself, inline — do
  NOT spawn subagents or background tasks, do NOT end your turn until every
  deliverable is complete and every gate has run. Your final message is the
  full report." (Bug found 2026-07-18: without this, sol delegated to a
  background subagent and ended its turn — the process exited, the child
  died, zero edits landed, and the final message read like a status note.)

- One coherent deliverable per run; don't micro-slice.
- Name every quality gate verbatim and say it MUST pass.
- Pin known diagnoses with file:line evidence; say "verify before building
  on this."
- Encode risky scope with a stop condition ("if broader machinery is needed,
  stop and report").
- For code tasks: **Do NOT commit** (except explicit burndowns, which commit
  per item with required trailers).
- Standing safety line for long runs: never purge node_modules or other
  environment state as a recovery tactic — stop and report instead.
- End with the exact report shape needed.

## Result handling

- Preserve the worker's verdict, findings, severity order, file paths, line
  numbers, uncertainty, and evidence boundaries.
- Treat its final message as a report, not evidence: inspect the actual
  worktree state, re-run the named gates, read the diffs.
- Review output is review output — do not auto-fix findings unless the user
  asked for fixes.
- Malformed output or failure: report the actionable log lines and stop. Do
  not invent a substitute answer.

## Never do these

- **Never dispatch via the codex CLI** (`codex exec`, `codex exec resume`,
  any flags thereof). The apiproxy is the only surface; proxy failure means
  HALT, not fallback.
- **Never point normal `claude` at the proxy** — the env is
  invocation-scoped inside the `claudex` function by design.
- **Never downgrade the model** — sol or halt.
- **Never run foreground** — background always; monitor the log.
- **Never run two write-capable workers in one worktree.**
- **Never use `2>/dev/null` as the default evidence policy.**
- **Never auto-install or mutate global tool state from this skill** —
  surface setup guidance and stop.
