---
name: gh:pr-comment-write
description: Draft and post PR comments. Use when asked to "draft a comment", "write to [teammate]", "summarize for [person]", "update the PR", or "tell [person] about [work]". Includes draft preview and edit workflow.
---

# GH PR Comment Write

## Steps

1. **Determine PR number**
   - Use explicit PR number if provided
   - Otherwise detect from current branch: `gh pr view --json number -q .number`

2. **Draft the comment**
   - Write content to `<tmp>/comment.md`
   - Show the draft in conversation

3. **Get confirmation**
   Use AskUserQuestion with options:
   - **Post** - Send as-is
   - **Edit file** - User edits `<tmp>/comment.md`, then re-read and confirm
   - **Revise** - User provides feedback, you redraft

4. **Post and confirm**

   ```bash
   gh pr comment <PR_NUMBER> --body-file <tmp>/comment.md
   ```

5. **Always output link**
   After posting, output:
   ```
   Posted: https://github.com/<owner>/<repo>/pull/<PR_NUMBER>#issuecomment-<ID>
   ```
   The `gh pr comment` command returns this URL.

## Notes

- Draft file location: `<tmp>/comment.md`
- If "Edit file" chosen, wait for user to say "done" or "ready" before re-reading
- Keep drafts concise - PR comments should be scannable
