# Ownership — Everything Visible On Your Branch Is Yours

Every error, failure, red check, wrong assertion, stale comment, or broken behaviour visible in the worktree you are working in is **yours**. Fix it, or surface it with `file:line`. Silence is never an option.

## 1. No provenance hunting

**Never** spend a tool call, token, or sentence establishing *who caused* a failure — "pre-existing", "from my merge", "already broken on develop", "another commit", "not mine".

Jason, verbatim:

> "i want you to stop trying to find error provenance. it doesn't matter. this pr is yours. assume all errors are yours. stop tracking down a scope of work based on provenance. i never ever want this approach to my agentic engineering. ever. it literally has no upside, wastes my time and tokens."

- Visible on your branch → yours → fix it. There is no second category.
- The only allowed diagnosis is the one that **directly produces the fix**. Root-cause-for-repair: required. Root-cause-for-attribution: banned.
- Test: if learning the answer changes zero edits, don't investigate it.
- Never scope, size, defer, or split work by provenance.

**The tell:** "was this already failing…", "did my merge cause…", "let me establish the baseline", "is this pre-existing or…", reaching for `git show develop:…` to compare blame. Stop. Go fix it.

## 2. Scope constrains architecture, never quality or honesty

| Constraint | Means | Does NOT mean |
|---|---|---|
| "Fix this bug" | Don't redesign the module | Ignore wrong tests you find |
| "Not a full rewrite" | Keep current structure | Leave broken assertions |
| "This is a band-aid" | Architectural fix comes later | Silence about what you discovered |
| "Just do X" | Don't gold-plate | Skip quality on X itself |
| "Acceptable for now" | Limits THIS session's edits | It's acceptable forever |

A scope constraint limits how much code you **change**. It never limits how much you **report**.

If told "fix bug X" and you find Y and Z: fix X, fix Y and Z if small and safe, surface them if large.

**"Acceptable for now" in a task prompt** scopes your work, not the project's architectural position. Never cite it back as a "known limitation". Say plainly: "the task scoped me to X; Y and Z remain unfixed."

## 3. What counts as discovering

- A test with a wrong assertion (passes, checks the wrong thing)
- A comment contradicting its code
- An obvious bug in a function you read for another reason
- An API used wrongly — wrong args, deprecated pattern, silent data loss
- A test passing only because its assertion is too weak to fail

## 4. Invalid reasons to stay silent

"Pre-existing" · "out of scope" · "not from this PR" · "acceptable for now" · "known limitation" · "separate PR" · "follow-up".

All banned. **"Separate PR" and "defer to a follow-up" are banned outright** when the issue is known now.

## 5. Debugging-skill override

`superpowers:systematic-debugging` Phase 4.2 says "no while-I'm-here improvements" and "no bundled refactoring". **This rule overrides it.**

| Found while debugging | Action |
|---|---|
| Wrong test assertion | Fix — correctness |
| Comment contradicting code | Fix — correctness |
| Budget contradicting its rationale | Fix — correctness |
| Style you'd do differently | Leave — preference |
| Refactoring opportunity | Leave — architecture |
| Unused import | Leave — cleanup |

Stay focused on the root cause; correctness fixes ride along, cosmetics don't.

## The counterweight

This rule says *act*. [[surface-coupling-decisions]] says *stop and ask* when a discovery forces a dependency-direction, layering, or ownership decision. Fixing is yours; **re-architecting is Jason's**.
