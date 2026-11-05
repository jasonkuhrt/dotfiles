---
name: meta-account-sync
description: Use when Jason invokes meta-account-sync (formerly meta-sidebar-restore), asks to sync, restore or fix his Claude setup after switching Claude accounts or orgs, or says sessions, sidebar sections or groups, session presets, new-session defaults or cloud environments are missing or stale after a switch. Makes this account's sidebar, presets and cloud environments match the account he used last, with no screenshot or input from him.
---

# Account sync

Jason switches between three Claude accounts as each hits its weekly limit
(`docs/claude-account.md` in the dotfiles). Some of his setup is kept per
account, so after a switch this account shows whatever it last had. This
skill makes it match the account just left. Ask nothing: invoking it is the go.

| State | Kept | Script |
| --- | --- | --- |
| Session records, sidebar sections and filing | per account/org, in the desktop app | `scripts/sync.py` |
| Session presets, built-in new-session defaults | per account, in the desktop app | `scripts/sync.py` |
| Cloud environments | per org, on Anthropic's servers | `scripts/cloud.py` |

The source is the other account whose session records were written last.
`--from <part of a uuid>` overrides it, for both scripts. Never ask for a
screenshot.

## Steps

1. Run `python3 ~/.claude/skills/meta-account-sync/scripts/cloud.py copy`.
   It brings every account with a Claude Code login up to date with the
   source, not just this one, and prints what each still lacks.
   - `dead_login` names the command that signs that account in again. Only
     a sign-in revives it. Give each command in its own `bash` block in the
     closing message, and make signing in part of the turn's ask (step 3).
   - `only_here` environments stay. Name them in the close.
2. Run `python3 ~/.claude/skills/meta-account-sync/scripts/sync.py plan`.
3. If `records` or `presets` is not empty, run the same script with `copy`.
   The app reads both only at launch, and `move_sessions` fails on a session
   it hasn't loaded. So end the turn with `wrap_up`: the recap says what came
   over, the ask is to quit the app with Cmd+Q and reopen it, and one button,
   "Restarted", sends "Restarted, finish the account sync". With no restart
   needed but a `dead_login` left, end the turn the same way: the ask is to
   sign in, and one button, "Signed in", sends "Signed in, finish the account
   sync". After either, start again at step 1, so `copy` runs again.
4. With `records` and `presets` empty, apply the rest through the
   `ccd_sidebar` tools, mapping names to ids with `list_sections`:
   - `sections.ops`, in order: `rename` with `rename_section`, `delete` with
     `delete_section`, `create` with `create_section`. Invoking this skill is
     the request to delete those sections.
   - `views`: `set_view` with the section's id and `sort_by`.
   - `moves`: `move_sessions` per key, with that section's id, or `"sessions"`
     for the key `""` (ungrouped); at most 100 ids per call.
5. Run `plan` again. It must show no `records`, `presets`, `ops`, `views` or
   `moves`, and `archive_index_ok` true. Anything left is a bug in the
   script: fix it and repeat.
6. Close with what the sidebar holds now, section by section, active
   sessions only, and which environments each account has. `collapsed` has
   no tool: name those sections, to be clicked by hand.

## What to know

- Records live in `~/Library/Application Support/Claude/claude-code-sessions/<account>/<org>/`,
  beside `archived-sessions.idx`, which `copy` rebuilds to match them.
  Replaced records and presets are backed up under `~/.local/state/meta-account-sync/`.
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
  every account; only the records, the sidebar and the presets are per account.
- Presets are `ccd-session-presets.json`'s `byAccount`. A preset matches by
  name, the source's place and settings win, and the source's `builtIns`
  (model, effort and worktree for a new session) replace this account's.
- Cloud environments are reached through each account's Claude Code login:
  the config dir whose `.claude.json` names the org (`~/.claude.json` for
  account 2, `~/.claude-N/.claude.json` otherwise) and that dir's keychain
  item, `Claude Code-credentials` plus `-` and the first 8 hex of the dir
  path's SHA-256 for a non-default dir. A token reaches only its own org,
  whatever org a request names.
- A stored token expires within hours. `cloud.py` renews it by running that
  account's CLI once, which works even at the usage limit. The refresh token
  has its own expiry, `refreshTokenExpiresAt`, and a refresh doesn't extend
  it (account 1, refreshed Nov 3, still lapsed Nov 4). Past it the login is
  dead: `cloud.py` reports it without running the CLI, which would blank
  the keychain item.
- The API: list `GET /v1/environment_providers`, read and save
  `GET`/`POST /v1/environment_providers/<id>`, create
  `POST /v1/environment_providers/cloud/create` with `kind: anthropic_cloud`,
  all with header `anthropic-beta: ccr-byoc-2025-07-29`. The web app's
  `/v1/environment_providers/private/…` routes refuse OAuth tokens.
- Environment variables and setup scripts are copied server to server and
  never printed.
- Not synced, by design: routines (a copy would run on every account) and
  claude.ai connectors (each is its own sign-in).
