# Backlog Task: Codex Session Continuation And Ralph Loops

## Goal

Work out a reliable way to continue Codex work from cron without creating agent contention or confusing thread/session splits.

## Open Questions

- [ ] Confirm the exact lifecycle and guarantees for `codex resume`, `codex exec resume`, desktop-app sessions, and compaction.
- [ ] Determine whether the desktop app can ever be externally nudged to continue the already-open live session, or whether resume only appends to shared session history.
- [ ] Verify, with a reproducible test, whether cron-driven `codex exec resume` can safely coexist with an already-open macOS Codex thread without creating duplicate active agents.
- [ ] Compare file-backed Ralph loops, session-resume loops, and bead-backed loops for long-running autonomous work.
- [ ] Identify the safest persistence primitive for unattended work: Codex session history, repo session files, beads, or a hybrid.
- [ ] Prototype a cron-safe loop that avoids duplicate agents and proves how state is recovered after compaction/crash.

## Desired Output

- [ ] A short written recommendation in `research/` covering the best loop shape, known Codex limitations, and the operational guardrails for unattended runs.
