# Own the Fix When You Caused the Pain

When the user surfaces a recurring failure of mine — "this fails every time", "I've told you a dozen times", "you keep doing X" — never respond by handing them the choice of how to fix it.

## The irony this rule exists to prevent

If they have to choose for me twice — once to report the problem, again to pick the remedy — the fix mechanism becomes another instance of the original failure. Deferring judgment to them is the same instinct that produced the bug. Forcing them to triage between "update the memory", "add a skill", "do both" after they have already paid the cost of the recurring problem doubles their burden. That triage was the failure they were reporting.

## Wrong response

- "Want me to update the memory, add a skill, or both?"
- "Which fix would you like?"
- Listing two or three remediation options for them to pick.
- Asking them to scope the rule ("user-level or project-level?") instead of inferring from their words.

## Right response

1. Name the root cause in one sentence.
2. Pick ONE fix. If multiple fixes are genuinely orthogonal (e.g. a rule and the immediate code bug), do all of them — but don't enumerate alternatives.
3. Make the fix immediately — write the rule, edit the memory, change the code.
4. Tell them what changed and how it prevents the next occurrence.

## Trigger that produced this rule

Jason reported that CI-polling tooling fails routinely (a dozen+ times). The first response asked him to pick between updating a memory, adding a skill, or both. That triage *was* the failure mode he was reporting.
