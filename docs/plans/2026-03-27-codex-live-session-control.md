# Codex Live Session Control Research

## Goal

Figure out whether an existing live Codex desktop session can be externally continued on a cron without spawning a competing session/client, and if not, what the best practical alternative is.

## Questions

- Is there any supported primitive to remotely continue the already-open desktop session/thread?
- What is the exact relationship between `CODEX_THREAD_ID`, CLI `resume`, session logs, and the desktop app UI?
- Can cron safely target one logical session without creating client contention?
- If not, what is the best file/state-driven loop pattern for long-running autonomous work?

## Current Evidence

- `codex exec resume <id> "message"` appends to saved session history.
- The macOS Codex app does not appear to live-refresh from those out-of-band writes.
- Using `resume` against the same UUID does not behave like remote-controlling one live GUI agent.
- Practical implication: `resume` is a history/session primitive, not a "force the open app to continue" primitive.

## Next Steps

- Inspect official Codex app/CLI docs for any explicit live-session control semantics.
- Test whether reopening/reloading the desktop thread reflects CLI-injected turns deterministically.
- Determine whether any local IPC, automation, or app-specific interface exists for targeting the active desktop thread.
- If not, design a robust Codex loop around `codex exec`, durable state files, and explicit done markers.
