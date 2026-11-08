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
   A file another stream is also editing goes in by hunk, never whole: write the
   slice's hunks of it as a patch.
2. **Every hunk serves the scope.** No rename, cleanup or extra beyond it. A
   hunk the scope needs in order to compile (an import, a moved caller) counts.
3. **Nothing asked for is missing.** No old name left anywhere, no caller
   unmoved.
4. **It ratchets up.** The checks the slice ran exited 0, as reported; nothing
   is newly red.

## Then

- **All four hold:** first check that no `CHERRY_PICK_HEAD` exists. Then build
  the commit in an index of its own, from `HEAD`, the slice's whole files and
  its patch, and commit with hooks skipped, so lint-staged and the pre-commit
  checks can't interrupt:

  ```sh
  git apply --cached --check <slice.patch> &&
    (
      GIT_INDEX_FILE=$(git rev-parse --git-path top-down-commit.index) &&
        export GIT_INDEX_FILE &&
        git read-tree HEAD &&
        git add -- <whole-file paths> &&
        git apply --cached <slice.patch> &&
        VP_GIT_HOOKS=0 git -c core.hooksPath=/dev/null commit -q -m "<message naming the slice>"
    ) &&
    git reset -q -- <whole-file paths> &&
    git apply --cached <slice.patch>
  ```

  Neither the shared index nor another stream's edits in the same files reach
  the commit. `git commit -- <paths>` would commit those files whole from the
  working tree. Every step is chained with `&&`: `set -e` is ignored inside a
  subshell on the left of `&&`, so a failed step leaves the shared index as it
  was. After the commit, the whole files' shared entries move to the new
  commit, and the patch is applied to the shared index too, so another
  stream's staged hunks in those files stay staged. The first `--check` fails
  when that stream's staging overlaps the slice's hunks; that is a failed
  check. The next run's `read-tree` resets the private index. Reply with the
  SHA in one line.

- **Any check fails:** commit nothing, and list each failure with file:line, in
  at most five lines.

## Not

- No review beyond the scope.
- No new checks.
- No push: pushing stays under the user's other rules.
- No attribution lines.
