---
name: agent-comment-chat
description: Use Codex loop or heartbeat polling plus a source scanner to treat `@agent` comments as chat messages from the user. Use when the user asks to enter comment chat mode, permanently poll agent comments, watch a file for `@agent` notes, resolve inline agent comments, or keep responding to code comments until they are deleted.
---

# Agent Comment Chat

## Contract

Treat every source comment containing `@agent` as a user message addressed to Codex, except explicit control markers.

Default to a session loop for explicit comment-chat mode. A bare skill invocation
like `[$agent-comment-chat]`, `/agent-comment-chat`, or "enter comment chat
mode" means: activate the Codex loop skill for this session, then repeatedly
resolve comments on the selected target. The loop stays active until the user
explicitly ends comment-chat mode in chat.

Use native Codex heartbeat automation only when the user asks to keep watching
after this turn, wake later, poll on a cadence, or otherwise continue after the
current session stop. Do not implement durable polling with a long-running shell
loop, `watch`, or a background script. The bundled script is only the per-wake
scanner.

Resolution means:

- Read the nearby code before acting.
- Apply the requested change or answer the question in chat.
- Delete the triggering `@agent` comment from the source once resolved.
- Poll again after every edit because line numbers drift.

Do not leave resolved `@agent` comments behind. If a comment cannot be resolved safely, ask the user in chat and leave the comment in place.

Exception: `@agent:chat` comments are persistent discussion anchors. Answer or discuss them in chat, but do not delete them or edit them away until the user explicitly says the chat is done, resolved, or should be removed.

Exception: `@agent:test-locked` is a control marker, not a chat or resolution request. It marks the containing test file as locked: do not edit that file unless the user explicitly approves the edit in chat. The scanner should ignore this marker, and polling should not try to resolve or delete it.

## Session Loop Mode

Use this mode when the user explicitly invokes this skill or asks to enter
comment-chat mode without saying it should be one-shot.

1. Determine the poll target before activating the loop. If no target is named,
   use the current active file when known; otherwise use changed files in the
   current git worktree.
2. Treat the loop done condition as: "the user explicitly says in chat to stop,
   end, cancel, or escape agent-comment-chat/comment-chat/loop mode." A clean
   scanner result is only the done condition for the current polling pass, not
   the loop's escape condition.
3. Activate the `loop` skill for the current session with that concrete done
   condition.
4. Run the normal Comment Resolution Workflow below.
5. When no resolvable comments remain and checks relevant to edits have passed,
   report the clean pass briefly and do not emit the loop escape token.
   Persistent `@agent:chat` anchors may still appear in scanner output and do
   not require further action after they have been answered for this pass.

Do not stop at a single scan in this mode. If a comment causes edits and a later
scan finds more comments, keep going until the target is clean.

Never end session loop mode just because the target is clean. Emit the loop
escape token only when the user gives an explicit stop signal in chat.

## Native Persistent Mode

When the user asks to permanently poll, keep watching, wake later, or continue polling after this turn:

1. Use Codex heartbeat automation attached to the current thread.
2. Put the target file paths and this skill name in the automation prompt.
3. Prefer updating an existing matching heartbeat over creating a duplicate.
4. On each heartbeat wake, run the normal comment resolution workflow below.

If the user did not specify cadence, ask one concise plain-text question for the cadence.

## Comment Resolution Workflow

1. Determine the poll target from the user's request. If no target is named, poll the current file when known; otherwise poll changed files in the current git worktree.
   - If a target contains `@agent:test-locked`, treat that file as read-only until the user explicitly approves edits. You may still read, review, and discuss it.
2. Run the scanner once:

```bash
bun ~/.codex/skills/agent-comment-chat/scripts/poll-agent-comments.ts <target...>
```

   The scanner includes merged source context windows by default:
   `file:start-end`, numbered lines, and `>` markers on matching comment lines.
   It defaults to `--context 10`; pass `--context 20` for wider context or
   `--context 0` for match-only output.

3. Use the scanner-provided context first. Open extra surrounding range with
   `sed -n` or `nl -ba` only when the scanner context is insufficient.
4. Treat the comment body after `@agent` as the next user message.
5. Resolve exactly that message with normal repo editing rules.
6. Remove the resolved comment in the same edit, except for `@agent:chat` anchors.
7. Run the scanner again.
8. Repeat until the scanner reports no resolvable comments. If scanner output
   contains only `@agent:chat` anchors already answered in this pass, treat the
   target as clean for this pass. If this is a heartbeat wake, stop after the
   target is clean so the next wake can poll fresh state.

Use short status updates while waiting or polling. Stay focused on comments from the active target; do not expand to the whole repository unless the user asked for that.

## Comment Format

Prefer this shape:

```ts
// @agent make this one full object equivalence assert
```

Also treat block comments containing `@agent` as messages. Delete only the resolved comment, not unrelated surrounding documentation.

Use `@agent:chat` when the user is discussing a point inline and wants the comment to remain as a conversational anchor. These comments should persist across polling wakes until the user explicitly closes them.

Use `@agent:test-locked` when the user wants a test file protected from agent edits. This marker should not show up as a scanner result, should not be deleted by polling, and should not be treated as resolved by implementation work.

## Test Planning Comments

For test-suite planning, support a lightweight approval protocol:

```ts
// describe #x
// > test proves y
// @agent ok
// ok describe #x
// ok> test proves y
```

Rules:

- Treat `// describe ...` and `// > test ...` comments as proposed test outline only.
- Do not implement proposed outline comments until the user adds an `@agent` comment that signals approval, typically `@agent ok`.
- When approved, implement only comments marked with `ok`/`ok>` or clearly covered by the adjacent approval signal.
- Replace approved outline comments with real `describe`/`it` blocks and delete the `@agent` approval comment.
- Leave unapproved outline comments intact for future polling.

## Scanner Fallback

If the bundled Bun script cannot run, use `rg` directly:

```bash
rg -n --glob '!.git/**' --glob '!node_modules/**' --glob '!**/.tmp/**' '@agent' <target...>
```

When using the fallback, ignore lines containing `@agent:test-locked`.
