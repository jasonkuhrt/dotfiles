---
name: meta-sidebar-restore
description: Use when Jason invokes meta-sidebar-restore, asks to restore, sync or fix his Claude desktop sidebar, or says sessions, sections or groups are missing or stale after he switched Claude accounts or orgs. Makes this account's Code-tab sidebar match the account he used last, with no screenshot or input from him.
---

# Sidebar restore

Jason switches between three Claude accounts as each hits its weekly limit.
The desktop app keeps a separate set of session records and a separate sidebar
(sections, which session sits in which) per account/org, so after a switch
the sidebar shows whatever this account last had. This skill makes it match
the account just left. Ask nothing: invoking it is the go.

`scripts/sync.py` does the file work and computes the sidebar changes:

- The current account is `CLAUDE_CODE_ACCOUNT_UUID`/`CLAUDE_CODE_ORGANIZATION_UUID`.
- The source is the other account whose session records were written last.
  `--from <part of a uuid>` overrides it. Never ask for a screenshot.
- Per session, the record with the newer `lastActivityAt` wins, a tie going
  to the source. The winning account's filing comes with it.

## Steps

1. Run `python3 ~/.claude/skills/meta-sidebar-restore/scripts/sync.py plan`.
2. If `records` is not empty, run the same script with `copy`. The app reads
   records only at launch, and `move_sessions` fails on a session it hasn't
   loaded. So end the turn with `wrap_up`: the recap says how many sessions
   came over, the ask is to quit the app with Cmd+Q and reopen it, and one
   button, "Restarted", sends "Restarted, finish the sidebar restore". After
   the restart, start again at step 1.
3. With `records` empty, apply the rest through the `ccd_sidebar` tools,
   mapping names to ids with `list_sections`:
   - `sections.ops`, in order: `rename` with `rename_section`, `delete` with
     `delete_section`, `create` with `create_section`. Invoking this skill is
     the request to delete those sections.
   - `views`: `set_view` with the section's id and `sort_by`.
   - `moves`: `move_sessions` per key, with that section's id, or `"sessions"`
     for the key `""` (ungrouped); at most 100 ids per call.
4. Run `plan` again. It must show no `records`, `ops`, `views` or `moves`,
   and `archive_index_ok` true. Anything left is a bug in the script: fix it
   and repeat.
5. Close with what the sidebar holds now, section by section, active sessions
   only. `collapsed` has no tool: name those sections, to be clicked by hand.

## What to know

- Records live in `~/Library/Application Support/Claude/claude-code-sessions/<account>/<org>/`,
  beside `archived-sessions.idx`, which `copy` rebuilds to match them.
  Replaced records are backed up under `~/.local/state/meta-sidebar-restore/`.
- Sections and filing are owned by the app window. The config file's
  `preferences.epitaxyPrefs` (`dframe-code-sections`, `dframe-group-scopes`)
  is its mirror: `plan` reads it, nothing writes it.
- Its `groups` list leaves out empty sections, so read sections from
  `dframe-code-sections`.
- `move_sessions` refuses archived sessions, so `moves` holds active ones
  only. An archived session keeps whatever filing this account gave it.
- Records with a `scheduledTaskId` are routine runs. They show only in the
  Routines section, which Jason keeps switched off.
- Conversations (`~/.claude/projects/**/<cliSessionId>.jsonl`) are shared by
  every account; only the records and the sidebar are per account.
