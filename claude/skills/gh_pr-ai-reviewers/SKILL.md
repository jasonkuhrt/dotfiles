---
name: gh:pr-ai-reviewers
description: Use when needing to trigger AI re-reviews, ask follow-up questions on Greptile/Graphite comments, or give feedback to AI reviewers
---

# PR AI Reviewers

## Overview

Interact with Greptile and Graphite AI code reviewers. Works on any repo with these services installed.

## Reviewers

| Reviewer | Bot                  | Re-review             | Follow-up                |
| -------- | -------------------- | --------------------- | ------------------------ |
| Greptile | `greptile-apps[bot]` | `@greptileai` comment | `@greptileai <question>` |
| Graphite | `graphite-app[bot]`  | Auto on push          | Graphite UI chat         |

## Operations

### Trigger Re-review

**Greptile**: `gh pr comment <PR> --body "@greptileai"`

**Graphite**: Automatic on every commit.

### Ask Follow-up

**Greptile**: Reply with `@greptileai <question>`

**Graphite**: Use chat in Graphite web UI.

### Greptile Status Emojis

When Greptile responds to `@greptileai`:

| Emoji | Meaning                                        |
| ----- | ---------------------------------------------- |
| 👍    | Review complete (👍 alone = nothing to report) |
| 👀    | Review in progress                             |
| 😕    | Review failed                                  |

### Feedback (train the AI)

| Action        | Effect    |
| ------------- | --------- |
| :+1: reaction | Helpful   |
| :-1: reaction | Unhelpful |

## Notes

- GitHub doesn't show bots in @mention dropdown — type `@greptileai` anyway
- Draft PRs need manual `@greptileai` trigger (no auto-review)

## References

- [Greptile Docs](https://www.greptile.com/docs/code-review-bot/trigger-code-review)
- [Graphite AI Reviews](https://graphite.com/docs/ai-reviews)
