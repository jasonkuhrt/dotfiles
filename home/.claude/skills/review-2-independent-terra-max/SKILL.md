---
name: review-2-independent-terra-max
description: Get two independent Terra reviews (gpt-6.1-terra at max effort) of one change from a Claude lead, then reconcile them. Use when Jason asks for two independent Terra reviews, or invokes review-2-independent-terra-max.
---

# Two independent Terra reviews

Two runs of Terra see the same brief and nothing of each other. Their
overlap is a signal; every finding is still checked against its evidence.
The model is Terra because Jason asked for Terra; it doesn't follow
`use-workers` when that skill's default OpenAI worker changes. This skill
launches through `codex exec` from a Claude lead on this Mac; a Codex or
Conductor lead launches the pair by `use-workers`' route instead.

1. **Brief.** Write one brief to a file in its own folder: what to review,
   the intended outcome in the user's words with their date, and the verdict
   and finding format wanted. Never put your own conclusions in it.
   - Pin the scope so both reviewers read the same thing: the base and head
     SHAs, plus snapshots of uncommitted contents (untracked files and
     deletions included), or copies of files outside Git. The brief tells
     the reviewers to read those, not the live checkout.
   - A change to durable agent instructions starts the brief with the
     `instruction-review` skill's body, verbatim. A code change has the
     reviewers read it through the repository's `review` skill at `small`,
     when the repository has one.
2. **Run** in the background:
   `bash ~/.claude/skills/review-2-independent-terra-max/run.sh <brief> <dir>`.
   Both runs start in `<dir>` with full access selected explicitly (the
   global rules), told to change no file, spawn no sub-agent and read no
   other reviewer's work, with Codex's own sub-agents switched off, and write
   to a fresh `terra-<timestamp>/` folder beside the brief. A run Codex
   reroutes is stopped. A run counts only when its Codex session record shows
   `gpt-6.1-terra` at `max` and full access selected with sub-agents off, its
   events end in a completed turn with no reroute and no native sub-agent
   call, and its report isn't empty. That record proves the selection; a
   reroute is caught only when the server reports its model. With full
   access, the brief and not a sandbox keeps a reviewer from changing a
   file, starting an agent through a shell, or reading the other's report:
   the script checks Codex's native events, and says when `<dir>`'s HEAD,
   staged diff or tracked working-tree diff changed during the review, or
   that it could not compare them (a `<dir>` outside Git). The script
   names any run that doesn't count; replace it with
   `run.sh <brief> <dir> 1` and keep the valid one.
3. **Reconcile.** If the script says `<dir>` changed, find out what changed
   first; in a shared checkout it can be another session's edit. If it says
   it could not compare, compare the files the reviewers were given. Read
   both reports. A report that didn't review the pinned
   scope or give the requested verdict (it couldn't read the brief, say)
   doesn't count: resolve its blocker and replace it. Group findings as raised by both or by
   one. Check each against its evidence. Apply a confirmed finding when the
   task authorizes changes, and report it otherwise; answer a finding you
   reject with evidence. The reply gives each verdict and each finding's
   outcome, and names both session ids. A question for the reviewers is a
   new brief and a new run, never an unchecked resume.
