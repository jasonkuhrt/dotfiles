---
name: codex-dispatch
description: >
  The canonical way to invoke the Codex (OpenAI) CLI headlessly for ANY purpose —
  review, research, implementation, burndown, second opinions. Use this skill
  whenever constructing a `codex exec` command, dispatching work to Codex, or
  when another skill (codex-review, codex-research) needs the invocation
  mechanics. Also trigger when the user says "run codex", "dispatch to codex",
  "use codex to implement/execute", or asks which model/flags to use with Codex.
  Always gpt-5.5 at xhigh reasoning effort.
---

# Codex Dispatch

Canonical invocation mechanics for the Codex CLI. Purpose-specific skills
(codex-review, codex-research) define WHAT to ask Codex; this skill defines HOW
to invoke it. When in doubt, this skill wins on flags, model, and process
handling.

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
  -m gpt-5.5 \
  -c model_reasoning_effort="xhigh" \
  -c service_tier="priority" \
  - < "$PROMPT_FILE" \
  2>&1 | tee -a "$RAW_LOG"
```

Mechanics that make this work:

- **Record every session at dispatch time.** The ID prints in the log header
  (`session id: <uuid>`, first ~15 lines). Immediately append a line to a
  session ledger file in the working scratchpad (e.g.
  `codex-sessions.md`: `<id> — <repo/domain> — <what it learned/did>`), so
  later turns — and post-compaction turns — can pick the right session to
  resume without re-reading logs.
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

## The canonical invocation

**Always `gpt-5.5` at `xhigh` reasoning effort, on the `priority` service tier
(fast mode).** No exceptions unless the user explicitly names a different
model/effort for a specific run, or says to save tokens / "slow" — then drop
the tier to `default` (keep model and effort unchanged).

```bash
codex exec \
  --dangerously-bypass-approvals-and-sandbox \
  -m gpt-5.5 \
  -c model_reasoning_effort="xhigh" \
  -c service_tier="priority" \
  - < "$PROMPT_FILE" \
  2>&1 | tee "$RAW_LOG"
```

These three values are also the global defaults in `~/.codex/config.toml`
(`model`, `model_reasoning_effort`, `service_tier`) — pass them explicitly
anyway so invocations survive config drift.

- **Prompt via stdin from a file** (`- < file`) for anything longer than a
  sentence — avoids shell-quoting hell and keeps the prompt reviewable and
  re-runnable. Write the prompt file to the session scratchpad (or `.tmp/`).
  Short one-liners may pass the prompt as a positional argument instead.
- **Always capture all output**: `2>&1 | tee "$RAW_LOG"`. The final agent
  message appears at the end of stdout.
- **Always run in the background** (`run_in_background: true` from Claude
  Code) — xhigh runs take minutes to tens of minutes. Read the log file for
  interim progress; act on the completion notification.

## Flags reference

| Flag                                  | Purpose                                                          |
| ------------------------------------- | ---------------------------------------------------------------- |
| `--dangerously-bypass-approvals-and-sandbox` | No approvals, NO sandbox. The default for dispatch on this machine — see below. |
| `-m gpt-5.5`                          | The model. Always this one.                                      |
| `-c model_reasoning_effort="xhigh"`   | Reasoning effort. Always xhigh.                                  |
| `-c service_tier="priority"`          | Fast mode (priority processing). Default; `"default"` only when the user asks to save tokens / go slow. |
| `- < prompt.md`                       | Prompt from stdin file.                                          |
| `--ephemeral`                         | Optional: skip session persistence for throwaway runs.           |
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

## Long multi-item runs (implementation burndowns)

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
