---
name: devin_review
description: "Run Devin Review on a PR — smart diffs, bug catching, codebase-aware chat."
argument-hint: "<pr-url or number>"
---

# Devin Review

Run [Devin Review](https://docs.devin.ai/work-with-devin/devin-review) on a pull request. Devin provides smart diff organization, automatic bug detection, and codebase-aware Q&A.

## Resolve PR

Determine the target PR from `$ARGUMENTS` or current context:

1. **Explicit URL** — `$ARGUMENTS` contains a GitHub PR URL → use directly
2. **PR number** — `$ARGUMENTS` is a number → resolve to full URL via `gh pr view <number> --json url -q .url`
3. **No argument** — detect from current branch:

```bash
gh pr view --json url -q .url
```

If no PR is found, tell the user and stop.

Store the resolved URL as `$PR_URL` and the PR number as `$PR_NUMBER`.

## Run Review

**Always run in background.** The CLI takes ~2 minutes for analysis, then hangs indefinitely (starts a local auth server and waits for TTY input). It will never exit on its own.

```bash
# MUST use run_in_background: true
npx devin-review "$PR_URL"
```

Immediately after launching, tell the user:

```
Devin Review running in background for PR #$PR_NUMBER (~2 min).
I'll share the results link when it's ready.
```

## Get Results

After ~2 minutes, check the background task output. The CLI prints a results URL in this format:

```
View results: https://app.devin.ai/review/{owner}/{repo}/pull/{number}?jobId=...
```

Extract that URL and share it with the user. This is the actual review link — it includes a `jobId` that points to the specific analysis run.

Once you have the URL, **stop the background task** — the CLI hangs on a local auth server after completion and will never exit.

## Features Available in Devin Review

Once the review opens, the user has access to:

- **Smart Diffs** — changes grouped logically (related edits together), not alphabetically
- **Copy/Move Detection** — relocated code shown as moves, not delete+insert
- **Bug Catcher** — automatic severity-rated analysis (severe, non-severe, investigation, informational)
- **Codebase Chat** — ask questions about the PR with full repo context
- **GitHub Sync** — comments, approvals, and change requests sync bidirectionally with GitHub
- **Resolution Tracking** — mark bugs/flags as resolved; resolved items dim and sort to bottom

## REVIEW.md

Devin Review reads `REVIEW.md` at the repo root for review-specific guidelines. If the user asks to configure review rules, help them create or edit `REVIEW.md` with:

- Areas of the codebase that need extra scrutiny
- Common pitfalls or anti-patterns to watch for
- Project-specific review conventions
