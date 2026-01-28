# Plan Preview

```
@(Tags:
Tag          | Action | Local    | Remote
─────────────────────────────────────────────
@...@:TAG | @:ACTION | @:LOCAL_SHA | @:REMOTE_SHA
@)@>if(tag tasks exist)

Branches:
Branch       | Type   | Action                      | Complexity
────────────────────────────────────────────────────────────────
@:TRUNK | trunk | sync | -
@...@:BRANCH | @:TYPE | @:ACTION_WITH_REASON | @:COMPLEXITY
```

## Example

```
Tags:
Tag          | Action | Local    | Remote
─────────────────────────────────────────────
v1.0.0       | push   | abc123   | def456
v0.9.0       | pull   | 111222   | 333444

Branches:
Branch       | Type   | Action                      | Complexity
────────────────────────────────────────────────────────────────
develop      | trunk  | sync                        | -
feat/X       | linked | sync                        | none
feat/Y       | main   | sync                        | complex
feat/stuck   | linked | skip (mid-rebase)           | -
feat/A       | linked | cleanup (PR merged)         | -
```
