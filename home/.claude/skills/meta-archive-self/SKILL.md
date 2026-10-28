---
name: meta-archive-self
description: Use when the user invokes meta-archive-self, or tells the agent to archive itself or this session ("archive yourself", "archive this session", "you can archive now"). Runs meta-can-end's audit and end steps, then archives this session if nothing blocks. Works in the Claude desktop app and in Codex.
---

# Archive self

The user wants this session gone from their list, without clicking through it. Archive it yourself, but only once closing it loses nothing.

## The gate

Run `meta-can-end` in full: its audit, then on a yes its end steps. Its verdict decides what happens here.

- **Not yet:** don't archive. Reply exactly as meta-can-end's not-yet reply does: the blockers, and what happens next. Keep working on what is yours. The user can invoke this skill again once the blockers clear.
- **Yes:** do the end steps, write the one-line report below, then archive as the last action of the turn.

Archiving stops the session's process. A worker, side session, background task, monitor or cron that is still running would die with it, so the gate is not optional.

Before archiving, delete every cron job and wakeup this session scheduled (`CronList`, `CronDelete`). In the desktop app, live background work blocks the archive.

## Archive

Write the reply first. The archive ends the conversation, so nothing after it reaches the user. One line is enough: what was cleaned up, and that the session archives now.

**Claude desktop app (Code tab).** Load `mcp__ccd_session_mgmt__archive_session` with `ToolSearch` if it is deferred. Then call it with `session_id: "self"` and a short `reason`. The app:

- stops the session and, by default, cleans up its worktree;
- also archives side sessions that share its worktree or have finished;
- refuses while the session is pinned, or open on screen, unless the user approves the app's card or the session runs in bypass permissions mode;
- refuses while background work is live.

Archived sessions reopen from the Archived list.

**Codex.** Run `codex archive "$CODEX_THREAD_ID"` as the final shell command. Codex puts the session's own id in `CODEX_THREAD_ID` for every command it runs (checked 2026-10-28, codex-cli 0.162.1). `codex unarchive <id>` brings it back. Archiving a finished session was checked; archiving a session from inside its own running turn was not, so run it last.

**Anywhere else** (the Claude Code CLI in a terminal, or a host with neither): no archive exists. Say so in one line, and tell the user how to close the session themselves.

## Common mistakes

| Thought | Reality |
| --- | --- |
| "They said archive, so I'll archive now." | The gate comes first. Running work dies with the session. |
| "Not yet, but they asked, so I'll stop the workers and archive." | meta-can-end never stops work to make the verdict yes. Report the blockers. |
| "I'll archive, then summarize." | The archive ends the conversation. The summary goes first. |
| "The archive call was refused because the session is open on screen." | Tell the user to approve the card, or to archive it from the sidebar. Don't retry in a loop. |
