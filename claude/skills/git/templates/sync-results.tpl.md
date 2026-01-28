# Results

```
@(Tags:
Tag          | Action | Result
─────────────────────────────────────────────
@...@:TAG | @:ACTION | @+result_icon @:RESULT
@)@>if(tag tasks exist)

Branches:
Branch       | Action  | Result
─────────────────────────────────────────────
@:TRUNK | sync | @+result_icon @:RESULT_DETAIL
@...@:BRANCH | @:ACTION | @+result_icon @:RESULT_DETAIL
```

## Functions

| Name        | Description            | Instructions                    |
| ----------- | ---------------------- | ------------------------------- |
| result_icon | Status icon for result | success=✓, warning=⚠, deleted=⌀ |

## Example

```
Tags:
Tag          | Action | Result
─────────────────────────────────────────────
v1.0.0       | push   | ✓ pushed
v0.9.0       | pull   | ✓ pulled
v0.8.0       | skip   | ⚠ skipped

Branches:
Branch       | Action  | Result
─────────────────────────────────────────────
develop      | sync    | ✓ pulled 3
feat/X       | sync    | ✓ merged, pushed
feat/Y       | sync    | ⚠ aborted
feat/stuck   | skip    | ⚠ mid-rebase
feat/A       | cleanup | ⌀ deleted (PR merged)
```
