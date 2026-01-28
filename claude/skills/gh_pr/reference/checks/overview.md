# PR Checks

Debug and fix failing CI checks in an analyze-fix-push-watch loop until all checks pass.

## Assets

| Path                         | Description                     |
| ---------------------------- | ------------------------------- |
| `templates/checks.tpl.md`    | Check status display            |
| `templates/failure.tpl.md`   | Failed check details            |
| `templates/fix-cycle.tpl.md` | Fix cycle progress summary      |
| `templates/waiting.tpl.md`   | Background watch status updates |

## Requirements

| Tool | Required | Purpose                        |
| ---- | -------- | ------------------------------ |
| `gh` | Yes      | Fetch PR checks, view run logs |

---

## Glossary

| Term         | Definition                                                               |
| ------------ | ------------------------------------------------------------------------ |
| Check        | A CI workflow job (types, lint, format, etc.)                            |
| Failed Check | A Check with status `fail`                                               |
| Batch        | Set of Failed Checks to fix before pushing (minimizes CI churn)          |
| In-Flight    | Fixes pushed to CI but not yet confirmed (background watch running)      |
| Watch Task   | Background task running `gh pr checks --watch` (tracked by _watch_task_) |

---

Read this flowlist using the `flowlist` skill (Reading operation).

## Operations

### Fix

1. FETCH - Get current check status.
   `gh pr checks --json name,state,bucket,link,workflow`

2. ASSESS - Route based on states.
   - When _all pass_:
     1. Show using _fix-cycle_
     2. **END**: all passing
   - When _any fail_: add Failed Checks to _Batch_, continue
   - When _all pending_: Goto _start_background_watch_ then Goto _poll_or_work_

3. SHOW - Display status.
   Show using _checks_

4. NEXT FAILURE - Pick from Batch.
   - If _Batch_ empty: Goto step 8 (ready to push)
   - Else: take first by priority (types -> lint -> format -> test -> build -> other)

5. ANALYZE - Investigate.
   1. `gh run view <run_id> --log-failed`
   2. If truncated: `gh run view <run_id> --log`
   3. Show using _failure_

6. CONFIRM - Get approval.
   Ask single select "Fix approach":

   | select  | description        | then                        |
   | ------- | ------------------ | --------------------------- |
   | Fix     | Apply proposed fix | continue                    |
   | Skip    | Skip this failure  | mark addressed, Goto step 4 |
   | Discuss | Talk through issue | conversation, then re-ask   |
   | Abort   | Stop entirely      | **END**: aborted            |

7. APPLY - Fix locally.
   1. Edit file(s)
   2. Verify locally (discover check script from package.json or CI workflow)
   3. If fails: iterate until passing or skip
   4. Mark addressed, Goto step 4 (next in batch)

8. PRE-PUSH - Check for new failures before pushing (minimize CI churn).
   1. Re-fetch: `gh pr checks --json name,state,bucket,link,workflow`
   2. If new Failed Checks (not already addressed): add to _Batch_, Goto step 4
   3. Else: continue

9. PUSH - Trigger CI and start background watch.
   1. `git add -A && git commit -m "fix: <description>"`
   2. `git push`
   3. Clear _Batch_ and addressed set
   4. Output: "Pushed. Watching CI in background..."
   5. Goto _start_background_watch_
   6. Goto _poll_or_work_

---

## Procedures

- **start_background_watch**
  1. START - Launch background CI watch.
     Use Bash with `run_in_background: true`:
     ```sh
     gh pr checks --watch --fail-fast
     ```
     Store returned task ID in _watch_task_.
  2. **END**

- **poll_or_work**
  1. CHECK - Poll background watch for completion.
     Use TaskOutput with `block: false` on _watch_task_.
     - When _completed_: Goto step 1 (FETCH)
     - When _still running_: continue
  2. DECIDE - Route based on known work.
     - If _Batch_ has items: Goto step 4 (continue fixing while CI runs)
     - Else: continue to step 3
  3. STATUS - Show current CI state.
     1. Fetch fresh data: `gh pr checks --json name,state,startedAt,link`
     2. Show using _waiting_
     3. Wait 15s
     4. Goto step 1 of this procedure

---

## Notes

- **Background watching**: CI watch runs in background to avoid blocking. This allows fixing multiple issues while CI runs, reducing total latency.
- **Fresh JSON queries**: During polling, we run `gh pr checks --json` each time rather than parsing `--watch` TTY output. This gives clean, parseable data with startedAt for elapsed time calculation.
- **Log parsing**: CI logs can be verbose. Focus on the first error and stack trace.
- **Rate limits**: `gh pr checks --watch` handles polling efficiently. Manual polling should use 15s+ intervals.
- **Parallel fixes**: If you identify multiple failures upfront, you can fix them all locally before pushing once, minimizing CI round-trips.
