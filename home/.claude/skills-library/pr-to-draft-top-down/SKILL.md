---
name: pr-to-draft-top-down
description: Use when the user wants work done top down taken to a draft PR, says "pr to draft top down" or "draft it top down", or invokes pr-to-draft-top-down. The variant of pr-to-draft for top-down mode, where nothing is checked locally.
---

# PR To Draft, Top Down

## Contract

The variant of `pr-to-draft` for work done top down. It adds the `top-down` skill and, by definition, drops the local green: nothing is checked.

Target end state: the work so far is committed on a named branch, pushed, and open as a draft PR that is ready for review. No local check ran, and the PR says so.

Type role: variant of the first segment. `pr-to-ready` later raises the PR to green, since its first step runs `pr-to-draft`, local checks included.

## Workflow

1. **Top down.** Load the `top-down` skill. If the mode is off, it turns on now and holds for the work that follows. Its rules hold here: no type check, test, lint, build or other check runs unless the user releases it.
2. **Release.** Invoking this skill is the user's release of the commit, the push and the draft PR for the work so far. It releases no check.
3. **Follow `pr-to-draft`** exactly as written, without its step 2 (Verify Locally). Do not restate its other steps here.
4. **Skip hooks.** Commit and push with `--no-verify`, as `top-down-commit` does: a hook that formats, lints or tests is a check.
5. **Say it in the PR body.** The draft's body states that the work was written top down and no local check ran, so a reviewer reads it as the shape, not as proven.

## Output

`pr-to-draft`'s output, with "Local checks: none (top down)" in place of its checks line.
