# mail-writer — draft email replies from msgvault evidence

When the task is to **draft a reply** to an email, use the `mail-writer` CLI.
Never hand-write a `.eml`, never drive Mail.app to compose, never ask the user
to copy-paste a reply body. mail-writer reads the original message from the
local msgvault archive, builds a correctly-threaded RFC-5322 reply
(`In-Reply-To` / `References`, `Re:` subject, recipient resolved from the
original's `Reply-To`/`From`), and appends it to the iCloud IMAP **Drafts**
mailbox so it shows up in Mail.app for the user to review and send.

It is the companion *write* tool to the msgvault *read* tools (`mcp__msgvault__*`).

For the full drafting workflow, invoke the **`mail-writer` skill** (`~/me/.claude/skills/mail-writer/`). The non-negotiable preconditions below are summarized here because this rule is always loaded.

## Two preconditions before ANY draft (learned the hard way 2026-06-05)

1. **Sync to a known baseline first.** msgvault lags real inbox state by up to
   ~30 min. Run `just msgvault-sync-recent` before reading a thread or drafting.
   A draft authored against a stale archive is invalid — the lead may have
   already replied/withdrawn, or the user may have answered from their phone. If
   you can't sync, STOP and say so; don't draft against an unknown baseline.
2. **Read the WHOLE thread chronologically, never one message.** Run
   `bun ~/me/scripts/mail-writer.ts thread --message <id>` — it prints the
   conversation oldest→newest with direction/folder, and tells you whether the
   last message is from THEM (reply to it) or YOU (awaiting them — do NOT draft).
   The original failure: a reply was drafted off one inbound while the user had
   already sent a reply later in the thread — duplicate + contradictory.

The CLI enforces #2 with a **thread-state guard**: `reply` refuses (exit 2) when
the target already has a later *sent* reply. Don't `--force` past it reflexively
— a block almost always means wrong target or already-handled thread.

## Location

`~/me/scripts/mail-writer.ts` — run with `bun` from the `~/me` repo. (Lives in
the /me repo because it reads `~/.msgvault/msgvault.db` and the user's IMAP
token cache `~/.msgvault/tokens/`. A future relocation to a standalone
`~/projects/jasonkuhrt/<name>/` repo would match the standalone-CLI rule, but
it is in /me/scripts for now — don't assume a different path.)

## Workflow

1. Find the msgvault id of the message being replied to (msgvault search/get).
2. Write a body file (markdown) with a `## Proposed Reply` section. By default
   the draft quotes the **full body of the original message** beneath your
   reply (standard email behavior — preserves the whole prior thread), rendered
   as a `> `-quoted block under an `On <date>, <who> wrote:` intro. Add an
   optional `## Incoming` section ONLY to TRIM the quote to a chosen excerpt;
   omit it to keep the full thread. `--no-quote-original` drops the quote
   entirely. The reply body itself can be raw, or fenced in a ```` ```text ````
   block.

   Pitfall (fixed 2026-06-05): `## Incoming` used to be the *only* source of the
   quote, so supplying a one-line excerpt silently cropped the entire prior
   thread to that one line. Default is now full-body; reach for `## Incoming`
   only when you deliberately want less.
3. Run:

   ```bash
   cd ~/me && bun scripts/mail-writer.ts reply \
     --message <msgvault-id> --body-file <body.md> --append --print-mime
   ```

   - `--append` writes the draft to IMAP Drafts (the useful default — it lands
     in Mail.app Drafts, threaded). Omit `--append` to only preview the plan.
   - `--out <file.eml>` writes the MIME to disk instead of/as well.
   - `--print-mime` echoes the full MIME so you can show the user the exact draft.
   - `--from` defaults to `Jason Kuhrt <jasonkuhrt@me.com>`; `--mailbox` defaults
     to `Drafts`.

4. Batches: `reply-many --reply <id>=<body.md> --reply <id>=<body.md> --append`,
   or `reply-dir --dir <folder> --append` (each `.md` must carry a
   `Message ID: <id>` line; files are processed in sorted order).

## Rules

- **mail-writer drafts, never sends.** It only APPENDs to Drafts. Sending is the
  user's action from Mail.app. This keeps the "drafting a reply" task fully
  inside the agent's authority without an outward send.
- Appending to the user's own Drafts is safe and reversible — do it directly
  when asked to draft a reply; no per-draft approval needed. (Sending would be
  different — that's the user's.)
- The section headings `## Proposed Reply` (required) and `## Incoming`
  (optional trim override) are parsed literally — don't rename them.
- Recipient + threading are derived from the original message; don't hand-set
  `To`/`In-Reply-To` unless overriding deliberately.
