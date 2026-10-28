---
name: top-down-commit
disable-model-invocation: true
description: Companion to top-down, run only by the user. Confirms that a finished slice's uncommitted edits are the scope he asked for and nothing more, then stages and commits them with hooks skipped, so he can skip the review and stay in flow. A failed check stops it with a short list.
---

# Top down: commit if aligned

The user's decision to accept a finished slice without reviewing it himself. It
releases one gated act, staging and committing that slice. The mode stays on,
and any standing rule that he owns staging and commits holds for everything
else.

## The scope

The argument names the slice: an item, a worker's report, or "the last one".
With none, it is the slice most recently finished in this conversation.

The scope is his own words that asked for the slice, quoted. A brief, item or
ruling counts only where it quotes him.

## Check, in order

1. **Paths.** The slice's own: a worker's reported list, or the lead's own edits.
   A file another stream is also editing is staged by hunk, never whole. Without
   interactive staging, apply only the slice's hunks to the index
   (`git apply --cached`).
2. **Every hunk serves the scope.** No rename, cleanup or extra beyond it. A
   hunk the scope needs in order to compile (an import, a moved caller) counts.
3. **Nothing asked for is missing.** No old name left anywhere, no caller
   unmoved.
4. **It ratchets up.** The checks the slice ran exited 0, as reported; nothing
   is newly red.

## Then

- **All four hold:** first check that no `CHERRY_PICK_HEAD` exists. Then stage
  exactly those paths or hunks, and commit with hooks skipped, so lint-staged
  and the pre-commit checks can't interrupt:

  ```sh
  VP_GIT_HOOKS=0 git -c core.hooksPath=/dev/null commit -q -m "<message naming the slice>" -- <paths>
  ```

  `-- <paths>` keeps the commit to the slice even when other work is staged in
  a shared index. Reply with the SHA in one line.
- **Any check fails:** commit nothing, and list each failure with file:line, in
  at most five lines.

## Not

- No review beyond the scope.
- No new checks.
- No push: pushing stays under the user's other rules.
- No attribution lines.
