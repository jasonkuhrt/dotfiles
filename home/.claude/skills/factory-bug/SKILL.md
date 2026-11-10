---
name: factory-bug
description: Use when Jason calls something a factory bug or invokes factory-bug to correct how an agent worked. Repair the affected work and the mechanism that let the mistake happen.
---

# Factory Bug

Find the first decision that produced the wrong outcome. Compare what the user needed with what the agent delivered. Read the owning rules on the current remote default branch. Recover relevant corrections from the user’s conversations, tracker, open PRs and worktrees. Distinguish what the user decided, what someone proposed and what actually shipped.

Repair the work the user received. Trace the mistake to the tool, workflow or instruction that can prevent it. Check whether an existing rule reached the agent when it made the decision. Fix that cause where it acts. If a pending change owns the same fix, reconcile with it. If the live mechanism already prevents a repeat, show that evidence. Write any instruction at the scope and strength of the user’s point. Apply the normal review and landing rules of the owner.

Verify the corrected work where the user uses it. Show what will change the agent’s decision next time. Check the remote default branch before calling a fix landed and identify anything still outstanding.

- Bad: after recognizing that a release has work that can land early, an agent lists the pieces in the original ticket’s description.
- Good: the ready pieces are separately actionable in the tracker, the release blocks only the work that needs it, and the planning rule reaches the next agent before it files the issue.
