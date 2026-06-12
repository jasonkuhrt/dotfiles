---
name: gh-close-review-threads
description: Complete GitHub PR review-comment closeout. Use whenever the user asks to address, fix, handle, clear, close, resolve, respond to, or follow up on PR review comments, review threads, requested changes, bot findings, CodeRabbit, Greptile, or Devin review feedback. Addressing a review thread includes a written thread reply and resolving the thread after the fix or justification is pushed.
---

# GitHub Review Thread Closeout

## Core Rule

After addressing a PR review thread, always close the communication loop. A review thread is not done merely because code changed, checks passed, or the final chat summary says it was addressed.

1. Push the code fix first when code changed.
2. Reply on the exact review thread with what changed and the commit hash, or why no code change was needed.
3. Mark the thread resolved when the issue is resolved or justified.
4. Re-fetch thread state and verify `isResolved: true` and that the written reply is present.

If the resolution does not need code, reply on the thread with the explanation and resolve it when appropriate. Only leave a thread unresolved when the user explicitly asks to keep it open, the fix is not complete, or a real reviewer decision is still needed.

This rule applies even when another GitHub skill says not to write review-thread replies unless explicitly requested. For this user's workflow, "address the review comment" is the explicit request to write the response and resolve the addressed thread.

## Workflow

1. Resolve the PR from the current branch unless the user gave a PR URL or number.
2. Fetch thread-aware review data. Prefer the GitHub plugin `gh-address-comments` workflow or its `fetch_comments.py` helper when available. Flat PR comments are not enough.
3. Group unresolved threads:
   - Actionable code changes.
   - Explanation-only comments.
   - Noise such as deploy previews, summaries, stale bot chatter, or already-resolved threads.
4. Implement the actionable fixes.
5. Run targeted checks for edited files and affected packages. Follow repo-specific CI rules.
6. Commit and push fixes before replying on GitHub.
7. For every addressed thread, reply and resolve using `scripts/reply_resolve_thread.py`.
8. Fetch thread state again. Do not report done until addressed threads have both the reply and `isResolved: true`, or are explicitly called out as intentionally left open.

## Reply Content

Keep replies factual and short:

```text
Resolved in <commit> by <specific change>. <One detail proving the comment was addressed.>
```

Good replies name the pushed commit and the concrete code change. Avoid generic text like "fixed" or "done". If the fix was already pushed before this skill ran, still reply with the existing commit hash and resolve the thread.

If a comment does not require code:

```text
No code change needed: <reason>. Marking resolved because <why this closes the thread>.
```

## Script

Use the bundled helper for the fragile GraphQL write sequence:

```bash
python3 ~/.codex/skills/gh-close-review-threads/scripts/reply_resolve_thread.py \
  --thread-id PRRT_... \
  --body "Resolved in abc123 by ..."
```

For long bodies, pipe stdin:

```bash
printf '%s\n' "Resolved in abc123 by ..." |
  python3 ~/.codex/skills/gh-close-review-threads/scripts/reply_resolve_thread.py \
    --thread-id PRRT_...
```

The helper requires `gh` authentication and performs two operations:

1. `addPullRequestReviewThreadReply`
2. `resolveReviewThread`

Use `--no-resolve` only when replying but deliberately leaving the thread open.

## Verification

After replying/resolving, fetch review threads again and confirm:

- The intended reply is present on each thread.
- Each resolved thread has `isResolved: true`.
- Any thread left open has a clear reason.
- The PR status checks are green after any push.
