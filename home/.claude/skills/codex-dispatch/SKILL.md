---
name: codex-dispatch
description: >
  The canonical way to invoke the Codex (OpenAI) CLI headlessly for ANY purpose —
  review, research, implementation, burndown, second opinions. Use this skill
  whenever constructing a `codex exec` command, dispatching work to Codex, or
  when another skill (codex-review, codex-research) needs the invocation
  mechanics. Also trigger when the user says "run codex", "dispatch to codex",
  "use codex to implement/execute", or asks which model/flags to use with Codex.
  Always gpt-5.6-sol at xhigh reasoning effort, regular service tier.
---

# Codex Dispatch

Canonical invocation mechanics for the Codex CLI. Purpose-specific skills
(codex-review, codex-research) define WHAT to ask Codex; this skill defines HOW
to invoke it. When in doubt, this skill wins on flags, model, and process
handling.

## First dispatch readiness

Before the first Codex dispatch in a Claude thread, make one cheap readiness
check:

```bash
codex --version
```

If Codex is missing, not authenticated, or the requested runtime feature is not
available, surface the exact failure and stop. Tell the user to install or run
`codex login`; do not auto-install, downgrade, or improvise an alternate auth
flow.

## Resume by default — fresh sessions are the exception

Every fresh session pays for Codex to re-learn the repo/domain from zero:
tokens and wall-clock burned re-reading files a prior session already holds in
context. **Before ANY dispatch, check whether an earlier session this
conversation (or a recorded one) already covers the same repo/domain/task
lineage. If yes, `codex exec resume <SESSION_ID>` with the new prompt instead
of `codex exec`.** Same flags as a fresh dispatch, `tee -a` onto the same log.

```bash
codex exec resume "$SESSION_ID" \
  --dangerously-bypass-approvals-and-sandbox \
  --disable code_mode_host \
  -m gpt-5.6-sol \
  -c model_reasoning_effort="xhigh" \
  - < "$PROMPT_FILE" \
  2>&1 | tee -a "$RAW_LOG"
```

`codex exec resume` REJECTS the root-level `-C <DIR>` flag ("unexpected
argument"). Set the shell working directory to the workspace root before
invoking instead (Claude Code's Bash cwd persists across calls — verify with
`pwd` if earlier commands `cd`'d around).

### The jobs-session pattern

Resume chaining doubles as job streaming: designate one session per
worktree/domain as the standing jobs session and stream each new job into it
with `codex exec resume <ID>` as it arrives. Each job pays only its
incremental prompt; the session retains the repo conventions, contracts, and
prior findings. There is no hot daemon in `codex exec` (each job is still a
process run-to-completion), but since jobs per worktree must serialize anyway
(one writer rule), a queue of resumes is equivalent. Codex 0.144.0 also ships
experimental long-lived surfaces — `app-server` (+ `remote-control` for its
daemon), `exec-server`, and `mcp-server` (stdio MCP) — which are real hot
processes but different integration surfaces (JSON-RPC/MCP, not the exec CLI);
unevaluated here, so do not reach for them in normal dispatch.

Mechanics that make this work:

- **Record every session at dispatch time.** The ID prints in the log header
  (`session id: <uuid>`, first ~15 lines). Immediately append a line to a
  session ledger file in the working scratchpad (usually `codex-sessions.md`),
  so later turns — and post-compaction turns — can pick the right session to
  resume without re-reading logs. Use a compact table or fenced record with:
  `job_id`, `repo_root`, `claude_session_id` if known, `codex_session_id`,
  `pid`, `prompt_file`, `raw_log`, `status`, `started_at`, `completed_at`, and
  `summary`.
- **Find resume candidates from the ledger, not `--last`.** Prefer an entry
  with the same `repo_root`, same Claude session/thread if known, a non-running
  status (`completed`, `failed`, `killed`, or `cancelled`), and an explicit
  `codex_session_id`. If multiple rows match, choose deliberately by ID and
  what it learned/did; do not guess.
- **Chain naturally:** audit session → resume it for the fix batch; stress
  session → resume it for the follow-up probe; implementation session →
  resume it for the review-feedback pass. The follow-up prompt can then be
  LEAN — no need to re-explain repo layout, conventions, or prior findings it
  already holds.
- **Start fresh only when:** the task is a genuinely new domain/repo with no
  useful overlap; you WANT independence (adversarial second opinion, clean-eyes
  review — prior context would bias it); or the prior session's context is
  contaminated (wrong assumptions you'd have to argue it out of).
- Resume is by EXPLICIT ID only — never `--last` (see Never below).

### Ledger operations: status, result, cancel

These are documented procedures over the ledger, `ps`, and logs — not plugin
commands:

- **Status:** locate the ledger row by `job_id` or `codex_session_id`; check
  whether `pid` is alive with `ps`; inspect the log tail and look for the final
  summary/tokens block. Update `status` to `running`, `completed`, `failed`,
  `killed`, or `cancelled` based on evidence.
- **Result:** read the final answer from `raw_log`; report `job_id`,
  `codex_session_id`, `status`, `raw_log`, and touched files if Codex reported
  them. Treat Codex's final message as a report, not evidence; verify claims
  yourself.
- **Cancel:** cancel only the selected ledger row. Kill the recorded `pid` or
  process tree if still alive, append a cancellation note to the log, and mark
  the row `cancelled`. Never kill by broad process-name matching.

### Full-context transfer

If a future workflow truly needs the whole Claude conversation inside Codex,
prefer an intentional transfer/import handoff when the installed Codex runtime
supports it, then record the imported `codex_session_id` in the ledger. Do not
bloat ordinary dispatch prompts with full transcript dumps.

## The canonical invocation

**Always `gpt-5.6-sol` at `xhigh` reasoning effort, on the regular service
tier (NOT fast mode — omit `service_tier` / leave it `"default"`).** No
exceptions unless the user explicitly names a different model/effort/tier for
a specific run. Requires codex-cli newer than 0.139.0 — on an older CLI the
API rejects the model with "requires a newer version of Codex"; surface that
and stop.

```bash
codex exec \
  --dangerously-bypass-approvals-and-sandbox \
  --disable code_mode_host \
  -m gpt-5.6-sol \
  -c model_reasoning_effort="xhigh" \
  - < "$PROMPT_FILE" \
  2>&1 | tee "$RAW_LOG"
```

Pass model and effort explicitly even when `~/.codex/config.toml` agrees, so
invocations survive config drift. Do not pass `service_tier` — regular speed
is the default; `"priority"` (fast mode) only when the user asks for it.

### Why `--disable code_mode_host`

The Homebrew-cask install of codex-cli 0.144.0 ships only the main binary and
NOT the `codex-code-mode-host` helper. The `code_mode_host` feature flag is
stable + enabled by default, so at startup the tool router tries to spawn the
missing host and wedges the whole run. `--disable code_mode_host` is therefore
REQUIRED on every dispatch until the host binary is present on the machine.
What it costs: nothing functional today — the parent `code_mode` feature
(agent batches tool calls by writing code executed in the host) is itself
"under development" and off. When the binary ships (npm distribution or a
fixed cask), drop the flag and re-evaluate `code_mode`. Verify with:
`which codex-code-mode-host` and `codex features list | grep code_mode`.

- **Prompt via stdin from a file** (`- < file`) for anything longer than a
  sentence — avoids shell-quoting hell and keeps the prompt reviewable and
  re-runnable. Write the prompt file to the session scratchpad (or `.tmp/`).
  Short one-liners may pass the prompt as a positional argument instead.
  If you ever use a positional prompt in a non-TTY/background/hook context,
  explicitly close stdin with `</dev/null`; otherwise `codex exec` can wait on
  inherited stdin.
- **Always capture all output**: `2>&1 | tee "$RAW_LOG"`. The final agent
  message appears at the end of stdout.
- **Optional split capture:** only when a downstream parser needs clean stdout,
  split stdout and stderr into separate logs while still preserving both. Never
  use `2>/dev/null` as the default evidence policy.
- **Always run in the background** (`run_in_background: true` from Claude
  Code) — xhigh runs take minutes to tens of minutes. Read the log file for
  interim progress; act on the completion notification.
- **Only one write-capable Codex process per worktree.** Parallelize read-only
  research freely, or use separate worktrees for write-capable parallelism.

## Prompt contract

Brief Codex as a capable engineer with no access to the current Claude
conversation except what you provide. Keep one coherent deliverable per run,
but do not micro-slice related work.

For substantial runs, use a compact block contract:

```xml
<task>
Do <specific goal>. Done means <observable end state>.
</task>

<scope>
Workspace: <absolute repo/root path>
Inspect: <paths, commands, docs>
Do not touch: <explicit non-goals>
</scope>

<execution_policy>
Edits: allowed|not allowed
Network: none|web-search-only|shell-network-ok
Destructive actions: stop and report before executing
</execution_policy>

<grounding_rules>
Use current files, command output, tests, and official docs. Do not guess.
Separate observed facts, evidence-based inferences, and unknowns.
</grounding_rules>

<verification_loop>
Run the named gates below. If a gate fails, diagnose and make the smallest
scoped fix unless blocked by credentials, external state, or a safety gate.
</verification_loop>

<output_contract>
Report the exact facts requested: files changed, root cause confirmation,
validation commands/results, remaining risks, and blockers.
</output_contract>
```

Brief-hardening rules:

- Name every quality gate verbatim and say it **MUST pass**. Codex runs the
  checks you name, not the checks you merely imply.
- If you already have a diagnosis, pin it with file/line evidence and say
  "verify this root cause before changing code." Codex should catch stale or
  wrong handoffs instead of building on them.
- Encode risky scope with a stop condition: "Implement X only as Y; if broader
  machinery is needed, stop on X, keep safe completed work, and report why."
- End the prompt with the exact report shape needed. A good final message
  should drop into a commit message, issue comment, or handoff without further
  excavation.
- For normal code tasks, include "Do NOT commit" unless this is an explicit
  implementation burndown (see exception below).

Research addendum:

- For current facts, require primary sources first, absolute dates, and source
  disagreement/caveats.
- Ask Codex to quote only short load-bearing facts and provide the URL for each
  claim.
- Require a confidence line (`high`, `medium`, `low`) with the reason.

Result-handling contract:

- Preserve Codex's verdict, findings, severity order, file paths, line numbers,
  uncertainty, and evidence boundaries.
- If Codex returns malformed output or fails, report the actionable stderr/log
  lines and stop. Do not invent a substitute answer.
- Review output is review output. Do not auto-fix findings unless the user
  explicitly asks for fixes after seeing them.

## Flags reference

| Flag                                  | Purpose                                                          |
| ------------------------------------- | ---------------------------------------------------------------- |
| `--dangerously-bypass-approvals-and-sandbox` | No approvals, NO sandbox. The default for dispatch on this machine — see below. |
| `-m gpt-5.6-sol`                      | The model. Always this one.                                      |
| `-c model_reasoning_effort="xhigh"`   | Reasoning effort. Always xhigh.                                  |
| `-c service_tier="priority"`          | Fast mode. NOT the default — only when the user explicitly asks for fast/priority. |
| `- < prompt.md`                       | Prompt from stdin file.                                          |
| `</dev/null`                          | Only for rare positional-prompt invocations in non-TTY contexts; closes inherited stdin. |
| `--disable code_mode_host`            | REQUIRED on every dispatch while the cask lacks the `codex-code-mode-host` binary — see "Why --disable code_mode_host". |
| `--skip-git-repo-check`               | Optional: allow non-git scratch or external directories when intentional. |
| `-C <DIR>`                            | Optional on `exec` only: set the Codex working root explicitly. `codex exec resume` REJECTS it — set the shell cwd instead. |
| `--add-dir <DIR>`                     | Optional: add one scoped extra directory when a task genuinely spans roots. |
| `--json`                              | Optional: JSONL event stream for wrappers/parsers, not normal human output. |
| `--output-schema <FILE>`              | Optional: force final structured output for downstream automation. |
| `--ephemeral`                         | Optional: skip session persistence for throwaway runs.           |
| `--ignore-user-config`                | Optional: reproducible automation only; skips user config.       |
| `--ignore-rules`                      | Optional: controlled automation only; skips user/project execpolicy rules. |
| `--strict-config`                     | Optional: fail on unknown config fields.                         |
| `--enable <FEATURE>` / `--disable <FEATURE>` | Optional: feature flags for controlled experiments.         |
| `-c web_search="live"`                | Optional: live web-search capability when shell network is not the point of the task. |
| `codex exec resume <SESSION_ID>`      | Resume a session by explicit ID (continue interrupted work). Never `--last` — see below. |

## Why no sandbox

`--full-auto` (workspace-write sandbox) blocks network access, so any dispatched
work that touches a package manager (`vp install`, `vp add/remove`, registry
fetches) fails — and a blocked Codex has been observed attempting destructive
recovery (purging `node_modules`) instead of stopping. Jason has decided
dispatch runs unsandboxed. Consequences:

- Never use `--full-auto` or `-s workspace-write` for dispatch; they are the
  broken mode here.
- Prompts for long runs must still include the standing rule: "never purge
  node_modules or other environment state as a recovery tactic — stop and
  report instead" (unsandboxed makes this rule MORE important, not less).

## Never do these

- **Never start a fresh session when a prior session already holds the
  relevant context** — resume it by explicit ID instead (see "Resume by
  default"). Fresh-on-familiar-ground silently burns tokens re-learning what
  a resume gets for free. The only exemptions are the independence and
  contamination cases listed there.
- **Never use `-o`** — `codex exec` (and especially `codex exec review`) often
  emits no "last agent message", so `-o` writes an empty file and, worse,
  overwrites content the prompt told Codex to write. Capture stdout instead.
- **Never run foreground** — xhigh runs block for minutes; dispatch in the
  background and monitor the log.
- **Never run two write-capable Codex processes in the same worktree** —
  formatters, tests, and file edits collide. Use one writer, or split work into
  separate worktrees.
- **Never downgrade the model or effort to "save time"** — if a smaller run is
  wanted, the user says so.
- **Never re-send a huge prompt inline after a quoting failure** — write it to
  a file and use stdin.
- **Never `codex exec resume --last`** — sessions are user-global
  (`~/.codex/sessions`), not per-worktree or per-agent. With multiple agent
  lanes dispatching Codex concurrently (the normal state on this machine),
  `--last` resolves to whichever lane's session happened to start most
  recently, silently continuing the WRONG conversation in the wrong worktree.
  Always resume by explicit session ID.
- **Never use multiselect / `AskUserQuestion` dispatch flows** on this machine.
  If a dispatch truly needs clarification, ask a direct plain-text question.
- **Never use `2>/dev/null` as the default** — happy-path cleanliness is not
  worth losing failure evidence. Split logs only if both streams are preserved.
- **Never auto-install Codex or mutate global tool state** from this skill.
  Surface setup guidance and stop.

## Resuming a dead run

Codex CLI processes can die mid-task (harness kills, crashes while polling a
hung child). The session survives on disk and resumes with full context:

1. **Capture the session ID at dispatch time** — it's in the log header
   (`session id: <uuid>`, printed in the first ~15 lines; the log exists
   because every dispatch runs `2>&1 | tee "$RAW_LOG"`).
2. Detect death: process gone from `ps` but the log has no final
   `tokens used` / summary block.
3. Resume by explicit ID, appending to the same log:

   ```bash
   codex exec resume <SESSION_ID> \
     <same flags as the original dispatch> \
     - < "$RESUME_PROMPT" \
     2>&1 | tee -a "$RAW_LOG"
   ```

4. The resume prompt should tell Codex its process was killed (not its fault),
   that the worktree retains its partial edits, and to continue from ACTUAL
   DISK STATE (re-read its own changes) rather than from memory — then re-run
   any child command that may have died with it and finish the original gates.

## Normal implementation runs

- Default instruction for code tasks: **Do NOT commit.** Codex may edit files,
  but you verify the diff, `git status`, and claims yourself before committing.
- Do not stage from Codex's reported file list alone; reports can omit touched
  files. Inspect the actual worktree state.
- If Codex says it edited or generated files, spot-check the files and run the
  named gates before relaying the result as fact.

## Long multi-item runs (implementation burndowns)

This is the exception to the normal Do-NOT-commit default.

- Instruct Codex to **commit per logical item** (conventional commits; include
  any required trailers such as `Session-Id`) so a killed/timed-out run loses
  at most one item.
- Instruct it to check `git log --oneline` before starting so a relaunched run
  skips already-landed items.
- On kill/timeout: check `git status` for a partial working-tree edit of the
  in-flight item; `git restore` it before relaunching (committed items are
  safe).
- Verify Codex's claims yourself after the run — run the checks it says it ran,
  read the diffs. Its summary is a report, not evidence.

## Model errors

If Codex fails with a model-not-available error, surface it to the user —
do not silently fall back to a lesser model.

## Known environment failure: resuming pre-0.144 sessions

Codex CLI 0.144 (Homebrew cask) cannot RESUME sessions recorded by older
CLI versions — every tool call in the resumed run dies with:

```text
failed to spawn code-mode host /opt/homebrew/bin/codex-code-mode-host: No such file or directory
```

The run burns tokens reaching the model and then can do nothing. Verified
2026-07-09 with controls: FRESH sessions on 0.144 work fine (with or
without `--disable code_mode` — the flag is irrelevant; an earlier
attribution to it was wrong); only resume-of-old-session fails.

Consequence for the resume-by-default rule: after a Codex CLI upgrade,
sessions recorded under the previous version may be version-trapped. When a
resume fails this way, START FRESH (self-contained prompt; note in the
session ledger that the old ID is trapped) — do not keep prodding the old
session, and do not add flags hoping to revive it. Re-check resumability
after future CLI upgrades before assuming the ledger's sessions are live.
