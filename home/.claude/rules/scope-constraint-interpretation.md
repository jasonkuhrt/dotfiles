# Scope Constraint Interpretation

Task prompts often include scope constraints. These constrain ARCHITECTURE, not QUALITY.

## Examples

| Constraint | Means | Does NOT mean |
|---|---|---|
| "Fix this bug" | Don't redesign the module | Ignore wrong tests you find |
| "Not a full rewrite" | Keep the current structure | Leave broken assertions |
| "This is a band-aid" | Architectural fix comes later | Silence about problems you discover |
| "Just do X" | Don't gold-plate the solution | Skip quality on the thing you're doing |
| "Acceptable for now" (in task prompt) | Limit your code changes to this scope | These limitations are architecturally acceptable forever |

## The rule

A scope constraint limits how much code you CHANGE. It never limits how much you REPORT. If a task says "fix bug X" and you discover bugs Y and Z during investigation, you must:

1. Fix X (the task)
2. Fix Y and Z if they're small and safe
3. Surface Y and Z to the user if they're large

You must NEVER treat a scope constraint as permission to stay silent about discovered problems.

## "Acceptable for now"

When a task prompt says something is "acceptable for now", that is scoping YOUR WORK in THIS SESSION. It is not a statement about the project's architectural position. Do not cite it as a "known limitation" or "documented acceptance" when presenting your work. Be honest: "the task scoped my work to X; Y and Z remain unfixed."
