# waiting

```
CI WATCHING...

| Check | Status | Elapsed | Link |
| ----- | ------ | ------- | ---- |
@...| @:NAME | @+status_icon | @:ELAPSED | @:LINK@>link(run) |
```

## Functions

| Name        | Description           | Instructions                                                    |
| ----------- | --------------------- | --------------------------------------------------------------- |
| status_icon | Icon for check status | `pass` → ✓, `fail` → ✗, `pending` → ◔                           |
| link        | Make URL clickable    | run                                                             |
| ELAPSED     | Time since startedAt  | Calculate `now - startedAt`, format as `Xm Ys` (e.g., `2m 15s`) |

## Notes

- Show ALL checks (not just pending) so user sees full picture
- Pending checks shown first, then passed, then failed
- If elapsed > 5m for a pending check, append ` (slow)` to elapsed
