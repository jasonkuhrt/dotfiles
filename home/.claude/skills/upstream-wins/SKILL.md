---
name: upstream-wins
description: Use when the user names one or more upstream packages or repos (dependencies the project uses, patches or wraps) and wants the changes worth upstreaming to them found and filed as issues and PRs, asks to upstream workarounds, perf wins or patches for a dependency, or invokes upstream-wins with targets such as `/upstream-wins tsrs`.
---

# Upstream wins

For each target upstream, find every change to it that would delete code we
wrote around it or win us time or memory. Write one local doc per change, then
post the issue (and the PR, when it qualifies) on the user's word.

You are the lead, not a relay: you decide every outcome and category, verify
the claims that decide them, and write every text the user or a maintainer
reads. Astra (see `astra-sidekicks` for launching) does the sweeps and evidence
runs.

## The one parameter

`/upstream-wins <target>...`. A target is a package name (`tsrs`) or a GitHub
repo (`oxc-project/tsrs`). The user gives nothing else, so derive it:

- **Repo, from a package:** `vp info <pkg> repository.url` (or `npm view`
  outside Vite+).
- **Packages, from a repo:** every installed package whose `repository` is
  that repo, including scoped siblings and platform binaries.
- **Versions:** the catalog pin and the lockfile.

Scope is the targets only. A finding about another upstream gets one line in
the index, pointing at it, and no doc.

## Phase 1: Sweep

Two Astra runs per target, in parallel, launched from the user's checkout with
the default sandbox, since they need `gh` and a clone. One run takes sources 1
to 3 and 6, the other sources 4 and 5; one run over all six missed leads that
another run found. Each run's whole prompt:

> Do the "Phase 1: Sweep" section of
> `~/.claude/skills/upstream-wins/SKILL.md` for the target `<target>`, sources
> `<1-3 and 6 | 4 and 5>` only, and nothing else. Write only inside
> `~/repo-references/`. Your final message is the norms line and the rows
> alone, one line per field.

Merge the two runs' rows by `local`.

Check `git status` in the checkout after the run.

The target's local sources are whatever "we use, patch or wrap it" implies:

1. **Pin and install:** the version pin and every comment beside it;
   `overrides`, `ignoredOptionalDependencies`, `peerDependencyRules` and
   build-permission entries for its packages.
2. **Patches:** `patchedDependencies` entries for its packages, and each
   patch's header.
3. **Wrappers and call sites:** imports of its packages; invocations of its
   binaries in package scripts, task configs, CI workflows and editor
   settings; environment variables it reads; its config files. Each of these
   is a candidate:
   - a wrapper that adds behavior beyond calling the package
   - a guard around its process (spawn, exit, timeout, crash)
   - our code that reimplements something it ships internally
4. **Workaround notes:** comments, docs and ADRs naming the package, its
   binary, its repo or its surface (its options, error codes, message text),
   such as `Remove when`, `FIXME(`, `workaround`, `until`, `does not`,
   `not supported`, `instead of`, or a code like `TS7056`.
5. **History:** commits and merged PR bodies naming it (`git log -i --grep`,
   `gh pr list --state merged --search`), research folders and measured-facts
   docs naming it. Recent first.
6. **Our asks in its repo:** `gh search issues` and `gh search prs` with
   `--author <user> --repo <owner/repo>`, all states, each with the
   maintainers' last word.

The final message opens with one line on the repo's contribution norms, each
with a pointer: whether outside PRs are open, any AI-contribution policy, a
CLA, issue-before-PR rules, and the issue template. Rows follow.

Every hit in every source becomes a row. A field the run couldn't check says
`unchecked`; a row is never dropped to save its fields.

Each row has these fields:

- `id`: a short slug
- `local`: `path:line` of the code or note that carries the cost
- `cost`: one sentence on what we wrote or lose because of the upstream
- `claim`: one sentence on the upstream change that removes the cost
- `outcome`: a guess of `file`, `bump`, `push` or `cut`
- `category`: a guess of `A` or `B`, with the design-call test's answer
- `duplicates`: each upstream search run, as query → URLs
- `upstream`: `file:line@SHA` in a clone at `~/repo-references/<repo>` on
  main

Read the final message, never the log. Open only the pointers that decide a
row.

## Phase 2: Triage (lead)

Each row gets one outcome:

- **file:** no upstream ask exists, and upstream main lacks the change.
- **bump:** upstream main or a release already has it. Upgrade and delete our
  code in a PR to our repo. Nothing is posted upstream.
- **push:** we already asked, and a PR or new evidence from us would move it.
- **reference:** the target follows a reference by its own policy, and the
  reference has the bug. The post goes to the reference, and the doc names
  how the target picks up the fix (a port at its next pin move, say). This is
  the target's own route, so it isn't off-target.
- **cut:** it fails a bar. Keep its one-line reason.

The category test is **does merging it need a maintainer's design decision?**

- **A, impl detail slam dunk:** no. Outputs are byte-identical (speed, memory,
  a crash gone), or behavior moves to the upstream's own stated contract: its
  docs, or the reference it ports.
- **B, idea with semantic implications:** yes. A new API, option, output,
  diagnostic or default, or a departure from its reference that its own policy
  doesn't already allow.

A port's contract is what its policy docs and precedents say. Read both before
ruling a departure B, `reference` or cut, and match the case to the precedent
exactly. tsrs's `CONTRIBUTING.md` says a bug in the Go code is reported
upstream and followed "until the pinned commit moves". Its one default-mode
departure (`notes/fix-history-dependent-diagnostics.md`) fixed output that
depended on tsrs's own checker scheduling, which is a different case.

Before triage, add rows the sweep can't reach: the project tracker's issues
naming the target (Heartbeat: Linear), and every lead the user names in the
chat.

Write the index at `tmp/upstream/README.md`, one row per candidate with its
outcome, category and doc link. Cut rows keep their reason. When `tmp/` is not
gitignored, add `tmp/upstream/` to `.git/info/exclude`.

## Phase 3: Evidence

One Astra run per `file`, `push` or `reference` item, in parallel. Each run
works in its own worktree of the `~/repo-references/<repo>` clone at upstream
main (`~/repo-references/<repo>-uw-<id>`), never in the user's checkout, which
it only reads. Runs that compile share one build cache (for Rust,
`CARGO_TARGET_DIR`), so the build tool's lock runs them one at a time. Heavy
builds follow the repo's heavy-work rule (Heartbeat:
`vp exec vpp capacity wait`). Every answer carries a pointer: a URL,
`file:line@SHA`, or a command with its output.

- **Not intentionally missing:** the upstream's design notes and their
  rejected or deferred lists, issues closed as wontfix, maintainer statements;
  for a port, what the reference does.
- **Appropriate for production:** who else hits it (the shared domain, not
  today's user count), fit with the upstream's stated goals, and no new option
  where a default would do.
- **Tractable:** the upstream `file:line@SHA`, a patch that applies to main,
  the upstream's own tests passing, and our measurement before and after. For
  A, outputs are byte-identical.
- **The reference, for a `reference` item:** the same three bars, answered
  for the reference repo, plus its own contribution norms.

## Phase 4: Verify and write (lead)

Rerun the measurement yourself. Read the cited maintainer words, the
rejected-list entry and the code that decides the category. Drop what doesn't
hold, and cut its row with the reason.

Write one doc per item at `tmp/upstream/<owner>-<repo>/<id>.md`:

1. **What it is:** one sentence, from the side of someone using the upstream.
2. **How it helps us:** the measured number, the command that produced it,
   and the paths of our code that get deleted.
3. **Category:** A or B, with the test's answer in one line.
4. **Not intentionally missing:** the evidence.
5. **Appropriate production addition:** the evidence.
6. **Tractable:** the evidence.
7. **Confidence:** premise and solution, each high, medium or low.
8. **The post:** where it goes (a new issue, a comment, a review on a PR), why
   there, and who posts it, linking the post file.

The post itself is `<id>.post.md` beside the doc: the exact text as it will go
out, in the repo's template, opening with the AI-disclosure line. Sections 1
to 7 follow the user's reply-presentation rules; the post file follows the
repo's conventions.

Before writing a post, check who else is already on the issue: an open PR for
it, or a comment saying someone has a fix coming. Then the post goes to them
(a review, or a question with our evidence attached), and a second PR waits
until they drop theirs.

An A item's issue takes the shape of
[oxc-project/tsrs#722](https://github.com/oxc-project/tsrs/issues/722), which
was fixed under four hours after it opened: the summary with its numbers,
reproduction files, a measure script, a results table, byte-identical outputs,
the upstream's own note quoted, and the patch.

## Phase 5: Post, on the user's word per doc

- An issue needs a high-confidence premise.
- A PR needs a high-confidence premise and solution, and category A. Where
  the repo's norms close outside PRs, the patch goes inline in the issue.
  tsrs closes them, and on tsrs#722 Boshen turned the inline patch into
  [tsrs#727](https://github.com/oxc-project/tsrs/pull/727).
- A B item gets an issue only, and its PR once a maintainer agrees.
- **Goodwill budget:** at most 3 open asks per upstream at a time, strongest
  first. B items wait until that repo's A items land.
- Posts follow the user's posting rules. A CLA is the user's to sign.
- Where a repo's norms require the person who posts to shepherd it
  (microsoft/TypeScript: AI-written work only with a disclosure and a human
  who answers the review; no automated comments; no bulk agent PRs), the user
  posts it and answers the replies. The doc says so in section 8.
- A PR or comment in a reference repo needs that repo's own issue triage. For
  example, TypeScript takes a PR only for an issue in Backlog.
- Once an item is filed, a PR to our repo points the local site's tracking
  pointer (a patch's `Tracking:` header, a workaround comment) at the upstream
  URL.

## Common mistakes

| Mistake | Instead |
| --- | --- |
| Widening past the targets | One index line per off-target finding |
| Asking the user what to search locally | Derive it from the target (Phase 1) |
| Dropping a sweep row that couldn't be checked | Keep it, with `unchecked` fields |
| Ruling on a port from "it ports X" alone | Its policy, and the precedent that matches |
| "Helps us" without a number | The number and its command, or the row is cut |
| Category by user visibility | Category by the design-call test |
| Filing what upstream main already has | `bump` |
| Reading Astra's log | Read its rows, open the deciding pointers |
| Posting before the user reads the doc | Docs first, posts on their word |
