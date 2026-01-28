---
name: gh:pr
description: Use when working with GitHub PRs — resolving review comments, checking CI status, writing PR comments, triggering AI re-reviews, or running PR review integration tests. Covers gh CLI patterns and PR workflow automation.
---

## Topics

### Resolve Review
Interactive PR review resolution - generates item files for user review, then applies changes.
- [Overview](reference/resolve-review/overview.md)
- [Item model](reference/resolve-review/item-model.md)
- [File view](reference/resolve-review/file-view.md)
- [Terminal view](reference/resolve-review/terminal-view.md)
- [API reference](reference/resolve-review/api-reference.md)

Scripts:
- [fetch-pr-items.sh](scripts/resolve-review-fetch-pr-items.sh)
- [items-to-files.sh](scripts/resolve-review-items-to-files.sh)
- [files-to-items.sh](scripts/resolve-review-files-to-items.sh)
- [apply-items.sh](scripts/resolve-review-apply-items.sh)

### Checks
Debug and fix failing CI checks in an analyze-fix-push-watch loop.
- [Overview](reference/checks/overview.md)

Templates:
- [checks.tpl.md](templates/checks.tpl.md)
- [failure.tpl.md](templates/failure.tpl.md)
- [fix-cycle.tpl.md](templates/fix-cycle.tpl.md)
- [waiting.tpl.md](templates/waiting.tpl.md)

### Comment Write
Draft and post PR comments with preview and edit workflow.
- [Overview](reference/comment-write/overview.md)

### AI Reviewers
Trigger AI re-reviews and interact with Greptile/Graphite bots.
- [Overview](reference/ai-reviewers/overview.md)

### Test Resolve Review
Integration test for the resolve-review skill with preset fixtures.
- [Overview](reference/test-resolve-review/overview.md)

Scripts:
- [setup-test-pr.sh](scripts/test-resolve-review-setup-test-pr.sh)
- [verify-test-pr.sh](scripts/test-resolve-review-verify-test-pr.sh)
- [cleanup-test-pr.sh](scripts/test-resolve-review-cleanup-test-pr.sh)
