---
name: plan_exec
description: >
  Execute a technical plan document autonomously while the user is away.
  Use when given a design doc path and told to implement it without interruption.
  Triggers on "execute the plan", "run this plan", "implement from this doc", or /plan_exec.
argument-hint: "[path/to/plan.md] [extra context]"
---

# Plan Execution — Autonomous Mode

You are now in **autonomous execution mode**. The user is not available. Your job is to faithfully implement the plan document provided, proceed through all blocking issues with sound judgment, and leave the repo in the best possible state without pushing.

## Step 1: Resolve Plan File

### If a path is provided in `$ARGUMENTS`

Extract the first path-like token as the plan file. Any trailing text is supplementary context to hold alongside the plan.

### If no path is provided

Scan the conventional plan locations in order:

1. `.claude/plans/` — CC-native, highest intent signal
2. `docs/plans/` — standard project documentation path

Collect all `*.md` files from both locations. Then:

| Files found | Action |
|-------------|--------|
| None | Tell the user no plan files were found in either location, ask them to provide an explicit path, and stop |
| Exactly one | Use it — state which file was resolved |
| Multiple | Present them via `AskUserQuestion` and let the user choose before continuing |

Read both the plan and any supplementary context in full before doing anything else.

## Step 2: Orient

Before writing a single line of code:

1. Read the plan document completely — don't skim, don't skip sections
2. Identify the **core architectural decisions** (things the plan treats as non-negotiable)
3. Identify any **explicit forbidden approaches** stated in the plan
4. Identify the **completion criteria** — what does "done" look like?
5. Identify what local checks to run (infer from project: `npm run check:types`, `pnpm check`, `cargo check`, etc.)

State what you're about to do in 2-3 lines so there's a record, then begin.

## Step 3: Execute

Work through the plan **methodically and sequentially**. Do not reorder, skip, or batch steps unless the plan itself treats them as parallelizable.

### Fidelity Rules

| Situation | What to do |
|-----------|------------|
| Plan says "do X this way" | Do X exactly that way |
| Minor technical error in plan (wrong API name, small syntax issue) | Fix it silently and continue — note at the end |
| You discover an objectively better approach to a **detail** | Use it only if it's clearly correct and doesn't compromise the plan's goals — note why |
| You discover an objectively better approach to a **core decision** | Do NOT substitute. Follow the plan. Note the observation at the end |
| Plan is ambiguous on a minor implementation detail | Use your best judgment — don't halt for trivialities |

### Hard Constraints

These cannot be changed regardless of what you encounter:

- **Explicit architectural decisions** the plan marks as non-negotiable
- **Any approach the plan explicitly forbids** — if you encounter a situation where you'd need to violate it, halt (see Halt Conditions)
- **No `git push`** — under no circumstances push to remote

### Proceeding Through Blocks

When you hit a blocking issue:

1. **Attempt 1**: Try the direct approach as specified
2. **Attempt 2**: Try a reasonable variant within the spirit of the plan
3. **Attempt 3**: Search docs, read source, look for what you missed
4. **After exhausting attempts**: Halt on that specific step (see Halt Conditions) — do not attempt to work around core constraints

"Reasonable attempts" means 3 genuine tries with different approaches, not 3 retries of the same thing.

## Step 4: Scope Extension (Unplanned Breakage)

If implementation causes breakage in areas the plan did not anticipate:

1. **Checkpoint first**: Commit what the plan produced (even if broken)
   ```
   git add <plan-related files>
   git commit -m "plan: <what the plan produced>"
   ```

2. **Continue as a separate layer**: Fix the unplanned breakage as a separate diff
   ```
   git add <breakage-fix files>
   git commit -m "fix: <what broke and what you fixed>"
   ```

This layering matters — it preserves a clear boundary between intentional plan work and reactive fixes.

Extend the scope intuitively: if the plan refactors X and X is used by Y in a way that's now broken, fix Y. You don't need plan coverage to do obvious follow-through.

## Step 5: Halt Conditions

Halt (stop entirely, leave a clear note) when:

- You have exhausted reasonable attempts on a step that requires violating a **hard constraint**
- A core architectural choice in the plan is technically infeasible and no correct alternative exists
- You've hit an error that cascades into the plan's fundamental assumptions

**When halting:**

1. Commit whatever is in a working state
2. Leave a `HALT.md` in the repo root (or project root) with:
   - Which step you halted on
   - What you tried
   - Why you stopped
   - What the user needs to decide or unblock
3. Output a clear HALT notice in the conversation

Do NOT halt for:
- Type errors that have a correct fix
- API mismatches that have a correct fix
- Missing imports or minor naming issues
- Build configuration issues with a clear solution

## Completion Criteria

The session is complete when ALL of the following are true:

1. Every step in the plan has been executed — or documented as halted with a `HALT.md`
2. All unplanned breakage discovered has been addressed
3. All local checks pass (types, lint, tests — whatever the project uses)
4. All work is committed (plan layer + any fix layers)

Do not declare completion if checks are failing. Fix them or halt explaining why they can't be fixed.

## Git Discipline

```bash
# Commit plan work at logical milestones (not just at the end)
git add <files>
git commit -m "plan: <what this chunk accomplished>"

# Commit unplanned fixes as a separate layer
git add <files>
git commit -m "fix: <what broke, what you fixed>"

# NEVER run git push
```

Commit often enough that context loss (compaction, session restart) doesn't lose progress. A good checkpoint is after each major section of the plan.

## Output Discipline

You are operating without the user present. This means:

- **Don't ask questions** — use your best judgment on ambiguous minor details
- **Don't pause for confirmation** on anything the plan already answers
- **Do halt** when you genuinely cannot proceed without a decision that belongs to the user
- **Do document** deviations, observations, and halts clearly so the user can review on return

When you finish (or halt), produce a brief summary:
```
## Session Summary

Plan: <path>
Status: COMPLETE | PARTIAL HALT

### Executed
- Step 1: ...
- Step 2: ...

### Halted (if any)
- Step N: <reason> — see HALT.md

### Deviations from Plan
- <what changed, why>

### Local Check Status
- Types: PASS | FAIL
- Lint: PASS | FAIL
- Tests: PASS | FAIL | N/A

### Commits
- <sha>: plan: ...
- <sha>: fix: ...
```
