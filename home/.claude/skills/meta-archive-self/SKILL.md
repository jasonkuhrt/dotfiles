---
name: meta-archive-self
description: Use when the user invokes meta-archive-self, or tells the agent to archive itself or this session ("archive yourself", "archive this session", "you can archive now"). Archives this session at once. Works in the Claude desktop app, in Codex, and in Conductor cloud workspaces.
---

# Archive self

The user has decided this session is done and wants it gone from their list. Archive it now. Run no audit and ask no question: whether to end was their call, and they made it. Jason, 2026-10-28: "i dont want can end to archive, itmight raise seomthig that changes my mind".

## Before the archive

1. **Delete every cron job and wakeup this session scheduled** (`CronList`, `CronDelete`). In the desktop app, live background work makes the archive refuse.
2. **Write the reply.** The archive ends the conversation, so nothing after it reaches the user. One line: that the session archives now, naming any worker or background task still running, since archiving stops it.

## Archive

**Claude desktop app (Code tab).** Load `mcp__ccd_session_mgmt__archive_session` with `ToolSearch` if it is deferred. Call it with `session_id: "self"` and a short `reason`. The app:

- stops the session and, by default, cleans up its worktree;
- also archives side sessions that share its worktree or have finished;
- refuses while the session is pinned, or open on screen, unless the user approves the app's card or the session runs in bypass permissions mode;
- refuses while background work is live.

Archived sessions reopen from the Archived list.

**Conductor cloud workspace** (`CONDUCTOR_IS_LOCAL=0`, whichever agent you are, so check this before Codex). Run `conductor workspace archive`, with no ID, as the final shell command. The workspace's own token archives it and the sandbox stops, so the command returns nothing (checked 2026-10-28 from a Codex agent). The API's `POST /v0/workspaces/{id}/unarchive` restores it. `codex archive` there would archive only Codex's internal thread and leave the workspace running.

**Codex.** Run `codex archive "$CODEX_THREAD_ID"` as the final shell command. Codex puts the session's own id in `CODEX_THREAD_ID` for every command it runs (checked 2026-10-28, codex-cli 0.162.1). `codex unarchive <id>` brings it back. Archiving a finished session was checked; archiving from inside the session's own running turn was not, so run it last.

**Anywhere else** (the Claude Code CLI in a terminal, or a host with neither): no archive exists. Say so in one line.

## Common mistakes

| Thought | Reality |
| --- | --- |
| "I'll run meta-can-end first to make sure." | The user decides that, and may run it themselves. This skill archives. |
| "A worker is still running; I'll ask first." | Name it in the last line and archive. The user chose. |
| "I'll archive, then summarize." | The archive ends the conversation. The line goes first. |
| "The archive call was refused because the session is open on screen." | Tell the user to approve the card, or to archive it from the sidebar. Don't retry in a loop. |
