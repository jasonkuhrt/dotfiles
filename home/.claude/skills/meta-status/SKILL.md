---
name: meta-status
description: Use when the user invokes `meta-status` or asks for this session's overall status. Report what is done, in flight, and pending.
---

# Status

Report the work covered by the request. Check live evidence this turn for states that could change the report. Mark any state you could not verify.

Use these groups in order. Omit empty groups.

1. **Done.** What finished and where to find the result.
2. **In flight.** What is underway, who or what is handling it, and what signals completion.
3. **Pending.** What is waiting to start or resume, who owns the next action, and what it depends on. Apply the global rules before listing anything as waiting on the user.

Give each item one line and a link or identifier. A status-only reply ends with the status. Use `meta-can-end` if the user also asks whether to end the session.

- **Bad.** The compaction review's progress appears between a readiness verdict and text to paste into `/compact`.
- **Good.** The recap shows that the transcript count is complete, the documentation check is running, and the review follows when that check returns.
