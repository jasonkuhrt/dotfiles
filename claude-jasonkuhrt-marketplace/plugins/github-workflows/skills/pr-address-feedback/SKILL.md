---
name: pr-address-feedback
description: Interactive PR feedback processing - one thread at a time with plan-execute loop. Invoke with /pr-address-feedback [--author=<name>] [--pr=<number>] [--batch].
---

# PR Address Feedback

## Goal

Interactively process PR review threads one at a time. Each thread gets full attention: discussion, planning, execution, and resolution before moving to the next.

## Glossary

| Term       | Definition                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------ |
| **Thread** | A GitHub review comment thread (atomic unit on GitHub)                                                 |
| **Item**   | A unit of work in this process - either a single thread or multiple related threads processed together |

**Actions** (what user chooses):

| Action    | Code change | Thread closed | Meaning                            |
| --------- | ----------- | ------------- | ---------------------------------- |
| Address   | Yes         | Yes           | Valid feedback, implement fix      |
| Dismiss   | No          | Yes           | Invalid/out-of-scope/noise         |
| Prior fix | No          | Yes           | Already fixed in earlier work      |
| Defer     | No          | No            | Too complex, handle manually later |
| Discuss   | TBD         | TBD           | Need conversation first            |

## Usage

- `/pr-address-feedback` - Process all unresolved threads from current branch's PR
- `/pr-address-feedback --author=copilot` - Only Copilot feedback
- `/pr-address-feedback --author=<username>` - Only feedback from specific user
- `/pr-address-feedback --pr=123` - Specific PR number
- `/pr-address-feedback --batch` - Batch mode: defer all GitHub ops to end for confirmation
- `/pr-address-feedback --author=copilot --pr=626` - Combine filters

## Arguments

- All arguments: $ARGUMENTS
- `--author=<name>`: Filter by thread author (case-insensitive match against login)
- `--pr=<number>`: Specific PR number (default: current branch's PR)
- `--batch`: Batch mode - defer all GitHub operations until end of session, show confirmation before executing

## Instructions

### 1. Fetch Unresolved Review Threads

Get repo info and PR number:

```bash
OWNER=$(gh repo view --json owner -q '.owner.login')
REPO=$(gh repo view --json name -q '.name')
PR_NUMBER=$(gh pr view --json number -q .number)
```

**Argument parsing**: Parse `$ARGUMENTS` for flags:

- Extract `--author=<value>` if present → store as `AUTHOR_FILTER`
- Extract `--pr=<number>` if present → override `PR_NUMBER`

If `--pr` was provided, use it directly:

```bash
PR_NUMBER=123  # from --pr argument
```

**Error handling**: If `gh pr view` fails (no open PR for current branch) and no `--pr` provided:

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

**Field mapping** (important for API calls later):

| Response field                  | Variable name         | Used for                       |
| ------------------------------- | --------------------- | ------------------------------ |
| `thread.id`                     | `THREAD_NODE_ID`      | GraphQL `resolveReviewThread`  |
| `thread.comments[0].databaseId` | `COMMENT_DATABASE_ID` | REST API reactions and replies |

**Limits**: Query fetches up to 100 threads with 10 comments each. If a thread has more than 10 comments, only the first 10 are returned. Note this to user if relevant.

**PR not found**: If the GraphQL response returns `pullRequest: null`, the PR doesn't exist:

```
PR #123 not found. Check the PR number and try again.
```

Exit gracefully.

**Zero threads**: If PR exists but no unresolved threads found, report "No unresolved review threads found" and exit.

**Filter criteria**:

- Only include threads where `isResolved: false`
- If `--author` provided, only include threads where first comment's author login contains the filter string (case-insensitive)
- Sort by `createdAt` of first comment

**Line number handling**:

- `line`: Current line number in the latest version of the file (may be `null` if code moved)
- `originalLine`: Line number when the comment was made (always present)
- Use `line` if available, fall back to `originalLine`
- If `isOutdated: true`, note this in the display - the code may have changed since the comment

### 2. Semantic Grouping (Optional)

Analyze threads for potential grouping:

- Same file + adjacent lines (within 10 lines) = potential group
- Same reviewer + same conceptual issue = potential group

**Only group if HIGH confidence**. Criteria:

- Threads reference the same function/block
- Threads describe the same issue type (e.g., "missing type cast" appearing twice)

If grouping is proposed, present to user:

```
I notice these threads might be related:
1. @copilot on file.ts:45 - "Type casting needed..."
2. @copilot on file.ts:52 - "Similar type issue..."

Group these together? [Yes / No, keep separate]
```

If no high-confidence groupings found, skip this step silently.

### 3. Create Task List

Use TodoWrite to create one task per item:

```
[pending] #1 @author · file.ts:45 · "first 50 chars..."
[pending] #2 @author · file.ts:89 · "first 50 chars..."
```

### 4. Process Each Item (Serial Loop)

For EACH item, complete this entire loop before moving to next:

#### 4a. Present Item

Display:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ITEM 1 of N (3 threads)
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

**Item header**: Show `(K threads)` only if item contains multiple threads (was grouped). Single-thread items don't need the count.

If `isOutdated: true`, add a warning:

```
⚠️  OUTDATED: This thread may reference code that has changed.
```

**Suggestion blocks**: If the comment body contains a GitHub suggestion block (` ```suggestion ... ``` `), highlight this:

```
📝 Contains code suggestion - can be applied directly if approved.
```

**Analysis block**: After presenting the thread, analyze and display a triage assessment with a **suggested action**:

```
─── Analysis ──────────────────────────────────────────────────────
<SUGGESTED ACTION>
  reason:   <why this action>
  evidence: <commits, policies, code refs - if applicable>
  response: <what happens on GitHub thread>
  note:     <caveats, follow-up ideas - if applicable>
───────────────────────────────────────────────────────────────────
```

The suggested action is one of: ADDRESS, DISMISS, PRIOR FIX, DEFER, or DISCUSS (see Glossary).

**Analysis fields**:

| Field       | Required      | Purpose                                                      |
| ----------- | ------------- | ------------------------------------------------------------ |
| `reason:`   | Yes           | Why this action is suggested (logic, diagnosis)              |
| `evidence:` | If applicable | Specific proof (commits, policies, code locations)           |
| `response:` | Yes           | What happens on GitHub thread (resolve + comment text, etc.) |
| `note:`     | If applicable | Free-form: caveats, follow-up ideas                          |

**Example analyses**:

```
─── Analysis ──────────────────────────────────────────────────────
DISMISS
  reason:   ARIA not enforced per project policy
  evidence: CLAUDE.md § Accessibility, HEA-3834
  response: resolve, no comment
───────────────────────────────────────────────────────────────────
```

```
─── Analysis ──────────────────────────────────────────────────────
PRIOR FIX
  evidence: commit 15762eb
  reason:   Changed to color="primary" per design
  response: resolve + "Fixed in 15762eb"
───────────────────────────────────────────────────────────────────
```

```
─── Analysis ──────────────────────────────────────────────────────
ADDRESS
  reason:   Selector runs before early return, causes unnecessary work
  response: after fix → resolve + thumbs up
───────────────────────────────────────────────────────────────────
```

#### 4b. Get User Direction

Use AskUserQuestion:

| Option             | Description                                                      |
| ------------------ | ---------------------------------------------------------------- |
| Go with suggestion | Accept the suggested action + response from analysis             |
| Address            | Plan and implement a fix (requires approval before code changes) |
| Dismiss            | Invalid/out-of-scope feedback, close thread without code changes |
| Prior fix          | Already fixed in earlier work, close thread                      |
| Defer              | Too complex, leave thread open for manual handling later         |
| Discuss            | Talk through the issue before deciding                           |
| Abort              | Stop processing entirely and show summary                        |

**"Go with suggestion" behavior**: Accepts the suggested action from the analysis block and proceeds with the specified `response:`. If the suggested action is ADDRESS, still show the plan for approval before code changes (user is agreeing to the direction, not blanket-accepting the final resolution).

If "Discuss" selected: Have a conversation about the thread. When user indicates they're ready to decide (e.g., "ok let's address it", "skip this one", "I think we can move on"), proceed with that action. If unclear, ask "Ready to choose an action?" and present the same options again.

If "Abort" selected: Jump directly to step 5 (Summary), marking remaining threads as "Not processed".

#### 4c. Plan (if addressing)

**CRITICAL: No code changes without explicit approval.**

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

**If user says "No, let's discuss"**: Enter discussion mode. Talk through concerns, refine the approach, then present an updated plan. Repeat until user approves or decides to skip.

#### 4d. Execute (if approved)

1. Make the agreed-upon changes
2. Run type checks: `pnpm check:types` or project equivalent
3. **If type checks fail**:
   - Show the errors to user
   - Ask: "Type errors found. [Show full errors / Fix and retry / Skip this thread]"
   - If "Fix and retry": analyze errors, fix, re-run type checks
   - Repeat until passing or user skips
4. Show the diff to user
5. Ask: "Changes look correct? [Yes / No, needs revision]"

**If user says no (revision needed)**:

1. Ask: "What should be different?"
2. Discuss the issue
3. Make revised changes
4. Run type checks again (with same error handling)
5. Show updated diff
6. Repeat until user approves or decides to skip

#### 4e. Resolve on GitHub

Run this step for **all actions except Defer** (Address, Dismiss, Prior fix all close the thread).

**Batch mode (`--batch`)**: Skip execution. Store pending operation `{thread_ids, action, reply_text}` for batch execution at summary step.

**Incremental mode (default)**: Execute immediately with optimizations below.

1. **Ask about reply first** (before any API calls):

   Ask: "Add a reply comment? [Yes / No]"

   If yes: "What should the reply say?"

2. **Execute GitHub operations** with performance optimizations:

   **Single-thread items** - parallel calls with suppressed output:

   ```bash
   # Reaction + reply in parallel, suppress verbose JSON
   gh api "repos/$R/pulls/comments/$ID/reactions" -X POST -f content='+1' --silent &
   [ -n "$REPLY" ] && gh api "repos/$R/pulls/$PR/comments" -X POST \
     -f body="$REPLY" -F in_reply_to=$ID --silent &
   wait
   # Resolve
   gh api graphql -f query='mutation($id:ID!){resolveReviewThread(input:{threadId:$id}){thread{isResolved}}}' \
     -f id="$NODE_ID" --silent
   ```

   **Multi-thread items** - batch GraphQL mutation:

   ```bash
   # Reactions + replies in parallel
   for ID in $COMMENT_IDS; do
     gh api "repos/$R/pulls/comments/$ID/reactions" -X POST -f content='+1' --silent &
     [ -n "$REPLY" ] && gh api "repos/$R/pulls/$PR/comments" -X POST \
       -f body="$REPLY" -F in_reply_to=$ID --silent &
   done
   wait

   # Batch resolve ALL threads in ONE call
   gh api graphql -f query='mutation {
     t1: resolveReviewThread(input:{threadId:"ID1"}){thread{isResolved}}
     t2: resolveReviewThread(input:{threadId:"ID2"}){thread{isResolved}}
   }' --silent
   ```

3. **Background resolution** (incremental mode):

   Use Claude Code's `run_in_background: true` parameter to run resolution while presenting next item:
   - Start background task for GitHub ops
   - Present next item to user immediately (no waiting)
   - Verify background task completed before summary

4. Mark task as completed in TodoWrite.

**Performance notes**:

- `--silent` suppresses 70+ line JSON responses
- Parallel `&` + `wait` for independent REST calls
- Batched GraphQL mutations reduce round-trips
- Background tasks eliminate user wait time between items

**Error handling**: If any API call fails:

- Show the error to user
- Ask: "Retry / Skip resolution / Abort session?"

#### 4f. Move to Next

Flow summary:

- **Go with suggestion**: Same as the suggested action
- **Address**: 4a → 4b → 4c → 4d → 4e → 4f (code change, close thread)
- **Dismiss**: 4a → 4b → 4e → 4f (no code, close thread)
- **Prior fix**: 4a → 4b → 4e → 4f (no code, close thread)
- **Defer**: 4a → 4b → 4f (no code, thread stays open for manual handling)
- **Discuss**: 4a → 4b → conversation → user chooses action → proceed accordingly
- **Abort**: 4a → 4b → jump to step 5

### 5. Summary

**Batch mode (`--batch`)**: Before showing the summary, execute all pending GitHub operations:

1. Show pending operations for confirmation:

   ```
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PENDING OPERATIONS                             N items → M threads
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   #1  ADDRESSED  @copilot
       └─ "Selector runs before early return"

       > Moved early return above selector call.

   #2  DISMISSED  @copilot (3 threads)
       ├─ "aria-label for filter button"
       ├─ "aria-label for dropdown buttons"
       └─ "ARIA menu roles"

       > Out of scope - accessibility strategy pending (HEA-3834).

   ...
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

   ```

2. Use AskUserQuestion to let user select which items to execute (all selected by default, can deselect to skip). Include "Edit replies" and "Abort" as additional options.

3. If "Edit replies" selected: Let user modify reply text for specific items, then re-present selection.

4. If confirmed, execute all operations with progress indicator:

   ```
   Resolving threads... [████████░░] 8/10
   ```

5. Continue to summary display.

**Incremental mode**: Verify any background resolution tasks completed, then show summary.

After all threads processed (or aborted):

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SUMMARY                                        N items → M threads
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

─── CLOSED (X threads) ────────────────────────────────────────────

#1  ADDRESSED  @author
    └─ "Truncated feedback summary..."
        https://github.com/owner/repo/pull/NNN#discussion_rNNNNNN

    > Reply text that was posted.

#2  DISMISSED  @author
    ├─ "First thread feedback summary"
    │   https://github.com/owner/repo/pull/NNN#discussion_rNNNNNN
    ├─ "Second thread feedback summary"
    │   https://github.com/owner/repo/pull/NNN#discussion_rNNNNNN
    └─ "Third thread feedback summary"
        https://github.com/owner/repo/pull/NNN#discussion_rNNNNNN

    > Reply posted to all threads.

#3  PRIOR FIX  @author
    └─ "Feedback that was already addressed"
        https://github.com/owner/repo/pull/NNN#discussion_rNNNNNN

    > Fixed in abc123.

─── REMAINS OPEN (Y threads) ──────────────────────────────────────

#4  DEFERRED  @author
    └─ "Complex issue needing manual review"
        https://github.com/owner/repo/pull/NNN#discussion_rNNNNNN

─── Artifacts ─────────────────────────────────────────────────────
  • [any files created/modified]
  • [any issues created]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Summary structure**:

| Element              | Description                                                       |
| -------------------- | ----------------------------------------------------------------- |
| Header               | `SUMMARY` left, `N items → M threads` right-aligned               |
| CLOSED section       | Items where thread was resolved (Addressed, Dismissed, Prior fix) |
| REMAINS OPEN section | Items where thread stays open (Deferred, Aborted)                 |
| Artifacts section    | Only if files modified or issues created                          |

**Item format**:

```
#N  ACTION  @author
    ├─ "Truncated feedback summary (~40 chars)"
    │   https://full-github-url-to-thread
    └─ "Another thread if grouped"
        https://full-github-url-to-thread

    > Reply text that was posted (or "(no reply)" if none)
```

- Item line: `#N  ACTION  @author` (no file names)
- Thread lines: truncated feedback summary + full clickable URL
- Tree connectors: `├─` / `└─` / `│` for visual hierarchy
- Reply block: quoted text of what was posted, for spot-checking

**Notes**:

- Items grouped by outcome (CLOSED vs REMAINS OPEN), not processing order
- Thread count in section header (visually self-evident from tree)
- Full URLs required (must be cmd-clickable)
- Reply block shows what user authored into the PR

If changes were made, ask: "Create a commit for these changes?"

## Operations

| Action             | Description                                        |
| ------------------ | -------------------------------------------------- |
| Go with suggestion | Accept suggested action + response from analysis   |
| Address            | Plan and implement fix with user approval          |
| Dismiss            | Invalid/out-of-scope, close thread without changes |
| Prior fix          | Already fixed earlier, close thread                |
| Defer              | Too complex, leave thread open for manual handling |
| Discuss            | Talk through approach before deciding              |
| Abort              | Stop processing and show summary                   |

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

- Requires `gh` CLI authenticated: `gh auth status`
- Thread resolution requires write access to the repo
- See **Field mapping** table in step 1 for which IDs to use where
- If a thread was resolved by someone else mid-session, the resolve call will succeed silently (idempotent)
- Copilot's login is `copilot-pull-request-reviewer` but `--author=copilot` should match it (case-insensitive contains)
- Outdated threads (`isOutdated: true`) may reference code that has moved or changed - verify before applying fixes

## Reply Tone

PR replies come from the user's GitHub account. Keep them:

- Brief (1-2 sentences)
- Direct and factual
- Reference commits/code when relevant
- No AI pleasantries ("Great catch!", "Thanks for pointing this out!")
- No hedging ("I think", "perhaps", "might")
- Human but utilitarian

**Good examples**:

- "Fixed in abc123."
- "Moved early return above the selector call."
- "Intentional - added comment for clarity."
- "Out of scope for this PR, tracking in HEA-1234."

## Critical Rules

1. **NEVER make code changes without user approval** - Always present plan first
2. **ONE item at a time** - Complete full loop before moving to next
3. **Defer = thread stays open** - User must handle manually later
4. **Dismiss/Prior fix = thread closes** - No code changes, but thread is resolved
5. **Only unresolved threads** - Never show already-resolved threads
6. **Resolve = thumbs up + optional reply + mark thread resolved**
7. **User controls pace** - Wait for user input at each decision point
8. **Abort exits cleanly** - Show summary of what was done
