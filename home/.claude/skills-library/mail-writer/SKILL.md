---
name: mail-writer
description: >-
  Draft, review, or send email through Apple Mail. Use for "draft a reply",
  "reply to someone", "respond to that email", "write back to", "send the
  approved draft", or "/mail-writer". Uses msgvault only for archive search and
  macos-automator for current mailbox state and native Mail actions.
---

# mail-writer

Use one owner per concern:

| Concern | Owner |
|---|---|
| Historical search and corpus analysis | `msgvault` |
| Current mailbox and thread state | Apple Mail via `macos-automator` |
| Draft, reply, delete, and approved send | Apple Mail via `macos-automator` |
| Outbound approval policy | `~/.codex/AGENTS.md` |

Treat msgvault as read-only in this workflow. Never use it or raw IMAP to create,
delete, or send mail.

## Workflow

1. For broad or historical discovery, use:

   ```bash
   msgvault --local search '<query>' --json
   msgvault --local show-message <id> --json
   ```

   Do not sync reflexively. If archive freshness itself matters, run
   `cd ~/me && just msgvault-sync`; never substitute native `msgvault sync`,
   which exhaustively enumerates this iCloud IMAP account.

2. Before operating on a live thread, call
   `mcp__macos_automator.get_scripting_tips`, then use
   `mcp__macos_automator.execute_script` against Mail. Trigger a background Mail
   refresh when recency matters. Never `activate` Mail or open a compose window.

3. Read the whole live thread oldest to newest, including Inbox, Sent, Drafts,
   and Deleted Messages. Read bodies, not only subjects or display names. Reply
   to the latest inbound. If a later sent reply already exists, report that
   instead of drafting a duplicate.

4. Create native drafts:

   - Reply with Mail's `reply ... opening window false`, then set the content and
     `save` the outgoing message.
   - Compose new mail as an invisible outgoing message, add native recipients
     and attachments, then `save`.
   - Verify exactly one matching draft exists with the intended recipient,
     subject, body, and attachments. Return its Mail identifier.

   Draft creation needs no approval.

5. Send only after Jason explicitly approves that exact draft. Re-read the
   saved draft and live thread, assert that recipient, subject, body, and
   attachments are unchanged, then send that exact outgoing message. Verify the
   message appears in Sent.

## Invariants

- Never send or submit external communication without exact-send approval.
- Never edit an approved draft before sending it.
- Never infer live state from msgvault's periodic archive.
- Never confuse a msgvault numeric ID, Mail object ID, and RFC Message-ID.
- Never use UI focus, clicks, keystrokes, or visible compose windows for Mail.
- Delete only an exact identified draft; leave it recoverable in Deleted
  Messages.
