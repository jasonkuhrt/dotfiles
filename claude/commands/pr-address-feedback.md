---
argument-hint: "[--author=<name>] [--pr=<number>]"
description: Interactive PR feedback processing - one thread at a time with plan-execute loop
---

# PR Address Feedback

## Goal

Interactively process PR review threads one at a time. Each thread gets full attention: discussion, planning, execution, and resolution before moving to the next.

## Usage

* `/pr-address-feedback` - Process all unresolved threads from current branch's PR
* `/pr-address-feedback --author=copilot` - Only Copilot feedback
* `/pr-address-feedback --author=<username>` - Only feedback from specific user
* `/pr-address-feedback --pr=123` - Specific PR number
* `/pr-address-feedback --author=copilot --pr=626` - Combine filters

## Arguments

* All arguments: $ARGUMENTS
* `--author=<name>`: Filter by thread author (case-insensitive match against login)
* `--pr=<number>`: Specific PR number (default: current branch's PR)

## Instructions

### 1. Fetch Unresolved Review Threads

Get repo info and PR number:

```bash
OWNER=$(gh repo view --json owner -q '.owner.login')
REPO=$(gh repo view --json name -q '.name')
PR_NUMBER=$(gh pr view --json number -q .number)
```

__Argument parsing__: Parse `$ARGUMENTS` for flags:

* Extract `--author=<value>` if present → store as `AUTHOR_FILTER`
* Extract `--pr=<number>` if present → override `PR_NUMBER`

If `--pr` was provided, use it directly:

```bash
PR_NUMBER=123  # from --pr argument
```

__Error handling__: If `gh pr view` fails (no open PR for current branch) and no `--pr` provided:

```
No open PR found for the current branch.

Options:
1. Specify a PR number: /pr-address-feedback --pr=123
2. Push your branch and open a PR first
```

Exit gracefully - do not proceed.

Fetch unresolved review threads via GraphQL:

```bash
gh api graphql -f query='
query($owner: String!, $repo: String!, $pr: Int!) {
  repository(owner: $owner, name: $repo) {
    pullRequest(number: $pr) {
      reviewThreads(first: 100) {
        nodes {
          id
          isResolved
          isOutdated
          comments(first: 10) {
            nodes {
              id
              databaseId
              author { login }
              body
              path
              line
              originalLine
              diffHunk
              url
              createdAt
            }
          }
        }
      }
    }
  }
}' -f owner="$OWNER" -f repo="$REPO" -F pr="$PR_NUMBER"
```

__Field mapping__ (important for API calls later):

| Response field                  | Variable name         | Used for                       |
| ------------------------------- | --------------------- | ------------------------------ |
| `thread.id`                     | `THREAD_NODE_ID`      | GraphQL `resolveReviewThread`  |
| `thread.comments[0].databaseId` | `COMMENT_DATABASE_ID` | REST API reactions and replies |

__Limits__: Query fetches up to 100 threads with 10 comments each. If a thread has more than 10 comments, only the first 10 are returned. Note this to user if relevant.

__PR not found__: If the GraphQL response returns `pullRequest: null`, the PR doesn't exist:

```
PR #123 not found. Check the PR number and try again.
```

Exit gracefully.

__Zero threads__: If PR exists but no unresolved threads found, report "No unresolved review threads found" and exit.

__Filter criteria__:

* Only include threads where `isResolved: false`
* If `--author` provided, only include threads where first comment's author login contains the filter string (case-insensitive)
* Sort by `createdAt` of first comment

__Line number handling__:

* `line`: Current line number in the latest version of the file (may be `null` if code moved)
* `originalLine`: Line number when the comment was made (always present)
* Use `line` if available, fall back to `originalLine`
* If `isOutdated: true`, note this in the display - the code may have changed since the comment

### 2. Semantic Grouping (Optional)

Analyze threads for potential grouping:

* Same file + adjacent lines (within 10 lines) = potential group
* Same reviewer + same conceptual issue = potential group

__Only group if HIGH confidence__. Criteria:

* Threads reference the same function/block
* Threads describe the same issue type (e.g., "missing type cast" appearing twice)

If grouping is proposed, present to user:

```
I notice these threads might be related:
1. @copilot on file.ts:45 - "Type casting needed..."
2. @copilot on file.ts:52 - "Similar type issue..."

Group these together? [Yes / No, keep separate]
```

If no high-confidence groupings found, skip this step silently.

### 3. Create Task List

Use TodoWrite to create one task per thread/group:

```
[pending] #1 @author · file.ts:45 · "first 50 chars..."
[pending] #2 @author · file.ts:89 · "first 50 chars..."
```

### 4. Process Each Thread (Serial Loop)

For EACH thread, complete this entire loop before moving to next:

#### 4a. Present Thread

Display:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
THREAD 1 of N
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Author: @username
File: path/to/file.ts:45
URL: https://github.com/...

Comment:
> [full text of first comment]

[If thread has multiple comments, show conversation:]
Reply from @other_user:
> [reply text]

Reply from @username:
> [reply text]

Diff context:
[show diffHunk from the API response]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

If `isOutdated: true`, add a warning:

```
⚠️  OUTDATED: This thread may reference code that has changed.
```

__Suggestion blocks__: If the comment body contains a GitHub suggestion block (`` ```suggestion ... ``` ``), highlight this:

```
📝 Contains code suggestion - can be applied directly if approved.
```

#### 4b. Get User Direction

Use AskUserQuestion:

| Option          | Description                                                      |
| --------------- | ---------------------------------------------------------------- |
| Address         | Plan and implement a fix (requires approval before code changes) |
| Skip            | Remove from queue for manual triage later                        |
| Already handled | Resolve without code changes (e.g., fixed in another commit)     |
| Discuss         | Talk through the issue before deciding                           |
| Abort           | Stop processing entirely and show summary                        |

If "Discuss" selected: Have a conversation about the thread. When user indicates they're ready to decide (e.g., "ok let's address it", "skip this one", "I think we can move on"), proceed with that action. If unclear, ask "Ready to choose an action?" and present the same options again.

If "Abort" selected: Jump directly to step 5 (Summary), marking remaining threads as "Not processed".

#### 4c. Plan (if addressing)

__CRITICAL: No code changes without explicit approval.__

1. Read the relevant file(s) at the specified lines
2. Analyze what change is needed
3. If comment contains a suggestion block, extract the suggested code
4. Present proposed change to user:

   ```
   Proposed change for: file.ts:45

   The thread suggests: [summary]

   I propose:
   - [specific change 1]
   - [specific change 2]

   Approve this approach? [Yes / No, let's discuss]
   ```

5. Wait for explicit approval before proceeding

__If user says "No, let's discuss"__: Enter discussion mode. Talk through concerns, refine the approach, then present an updated plan. Repeat until user approves or decides to skip.

#### 4d. Execute (if approved)

1. Make the agreed-upon changes
2. Run type checks: `pnpm check:types` or project equivalent
3. __If type checks fail__:
   * Show the errors to user
   * Ask: "Type errors found. [Show full errors / Fix and retry / Skip this thread]"
   * If "Fix and retry": analyze errors, fix, re-run type checks
   * Repeat until passing or user skips
4. Show the diff to user
5. Ask: "Changes look correct? [Yes / No, needs revision]"

__If user says no (revision needed)__:

1. Ask: "What should be different?"
2. Discuss the issue
3. Make revised changes
4. Run type checks again (with same error handling)
5. Show updated diff
6. Repeat until user approves or decides to skip

#### 4e. Resolve on GitHub

Run this step for __all actions except Skip__ (including "Already handled"):

1. __Add thumbs up reaction__ (to the first comment in the thread):

```bash
gh api "repos/$OWNER/$REPO/pulls/comments/$COMMENT_DATABASE_ID/reactions" \
  -X POST -f content='+1'
```

2. __Ask about reply__:
   First ask: "Add a reply comment? [Yes / No]"

   If yes, then ask: "What should the reply say?"

   After getting the message:

   ```bash
   gh api "repos/$OWNER/$REPO/pulls/$PR_NUMBER/comments" \
     -X POST -f body="$MESSAGE" -F in_reply_to="$COMMENT_DATABASE_ID"
   ```

3. __Resolve the thread__ (GraphQL mutation):

```bash
gh api graphql -f query='
mutation($threadId: ID!) {
  resolveReviewThread(input: {threadId: $threadId}) {
    thread { isResolved }
  }
}' -f threadId="$THREAD_NODE_ID"
```

4. Mark task as completed in TodoWrite.

__Grouped threads__: If processing a group:

* Add reaction to each thread's first comment
* Ask once: "Add a reply to these threads? [Yes, same reply to all / Yes, individual replies / No]"
* Resolve each thread
* Mark the group task as completed

__Error handling__: If any API call fails:

* Show the error to user
* Ask: "Retry / Skip resolution / Abort session?"

#### 4f. Move to Next

Flow summary:

* __Address__: 4a → 4b → 4c → 4d → 4e → 4f
* __Skip__: 4a → 4b → 4f (bypasses 4c-4e, remove from active queue, track as skipped)
* __Already handled__: 4a → 4b → 4e → 4f (bypasses 4c-4d)
* __Discuss__: 4a → 4b → conversation → user chooses action → proceed accordingly
* __Abort__: 4a → 4b → jump to step 5

### 5. Summary

After all threads processed (or aborted):

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Addressed: N threads
Skipped: M threads (require manual triage)
Already handled: K threads
Not processed: P threads (aborted early)

Skipped threads (for manual review):
- @author · file.ts:45 · "preview..." [URL]
- ...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

If changes were made, ask: "Create a commit for these changes?"

## Operations

| Action          | Description                               |
| --------------- | ----------------------------------------- |
| Address         | Plan and implement fix with user approval |
| Skip            | Remove from queue for manual triage       |
| Already handled | Resolve thread, no code changes           |
| Discuss         | Talk through approach before deciding     |
| Abort           | Stop processing and show summary          |

## Examples

```bash
# Process all Copilot feedback
/pr-address-feedback --author=copilot

# Process feedback from specific reviewer
/pr-address-feedback --author=ceremonious

# Process all feedback from current PR
/pr-address-feedback

# Process feedback from specific PR
/pr-address-feedback --pr=626

# Combine: Copilot feedback on specific PR
/pr-address-feedback --author=copilot --pr=626
```

## Notes

* Requires `gh` CLI authenticated: `gh auth status`
* Thread resolution requires write access to the repo
* See __Field mapping__ table in step 1 for which IDs to use where
* If a thread was resolved by someone else mid-session, the resolve call will succeed silently (idempotent)
* Copilot's login is `copilot-pull-request-reviewer` but `--author=copilot` should match it (case-insensitive contains)
* Outdated threads (`isOutdated: true`) may reference code that has moved or changed - verify before applying fixes

## Critical Rules

1. __NEVER make code changes without user approval__ - Always present plan first
2. __ONE thread at a time__ - Complete full loop before moving to next
3. __Skip means skip__ - No automation, just remove from current queue
4. __Only unresolved threads__ - Never show already-resolved threads
5. __Resolve = thumbs up + optional reply + mark thread resolved__
6. __User controls pace__ - Wait for user input at each decision point
7. __Abort exits cleanly__ - Show summary of what was done
