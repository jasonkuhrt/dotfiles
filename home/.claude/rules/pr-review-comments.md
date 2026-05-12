# PR Review Comments

When asked to "address", "fix", "handle", "close", "resolve", "respond to", or "follow up on" PR review comments (including bot findings from Greptile, CodeRabbit, Devin, etc.), always close the communication loop on every addressed thread.

A review thread is **not done** merely because code changed, checks passed, or the chat summary says it was addressed.

## Required steps per addressed thread

1. Push the code fix (if any) first.
2. Reply on the exact review thread with **what changed and the commit hash**, or why no code change was needed.
3. Mark the thread resolved.
4. Re-fetch thread state and confirm `isResolved: true` and the reply is present.

Leave a thread unresolved only when the user explicitly asks to keep it open, the fix is incomplete, or a real reviewer decision is still pending.

## Reply format

Factual and short:

```
Resolved in <commit> by <specific change>. <One detail proving the comment was addressed.>
```

Avoid generic text like "fixed" or "done". Name the commit and the concrete change.

If no code change:

```
No code change needed: <reason>. Marking resolved because <why this closes the thread>.
```

## Tooling

Use the bundled helper script (same shape as the codex skill):

```bash
python3 ~/.codex/skills/gh-close-review-threads/scripts/reply_resolve_thread.py \
  --thread-id PRRT_... \
  --body "Resolved in abc123 by ..."
```

For long bodies, pipe stdin:

```bash
printf '%s\n' "Resolved in abc123 by ..." \
  | python3 ~/.codex/skills/gh-close-review-threads/scripts/reply_resolve_thread.py \
    --thread-id PRRT_...
```

The script does both `addPullRequestReviewThreadReply` and `resolveReviewThread` in sequence. Pass `--no-resolve` to reply without resolving.

## Fetching thread IDs

`gh pr view` and `gh api repos/.../pulls/N/comments` return flat comments — not thread-aware. Use the GraphQL query that returns `reviewThreads(first: 100) { nodes { id isResolved comments { nodes { databaseId author body path line } } } }` to map each comment to its `PRRT_...` thread ID.

```bash
gh api graphql -f query='query($owner:String!,$name:String!,$num:Int!){
  repository(owner:$owner,name:$name){
    pullRequest(number:$num){
      reviewThreads(first:100){
        nodes{
          id
          isResolved
          comments(first:20){
            nodes{ databaseId author{login} body path line }
          }
        }
      }
    }
  }
}' -F owner=<owner> -F name=<repo> -F num=<pr>
```

## Done check

Before reporting the PR-feedback task done:

- Every addressed thread has both a reply and `isResolved: true`.
- Any thread left open has an explicit stated reason.
- CI is green after the latest push.
