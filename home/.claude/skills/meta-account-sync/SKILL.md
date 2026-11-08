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
   It brings this account's environments up to date with the source's and
   prints what this account still lacks. It touches no other account.
   - `dead_login` lists the commands that sign the source's or this
     account's login in again. Only a sign-in revives one. Run each yourself
     with `run_in_terminal`, each in its own tab. Each opens a sign-in page
     offering only that account's org, so Jason's part is one click per page.
     Make approving them part of the turn's ask (step 3).
   - `only_here` environments stay. Name them in the close.
2. Run `python3 ~/.claude/skills/meta-account-sync/scripts/sync.py plan`.
3. If `records` or `presets` is not empty, run the same script with `copy`.
   The app reads records only at launch, and `move_sessions` fails on a
   session it hasn't loaded. It takes presets only while it is closed, so
   `copy` also leaves a waiter that writes them once the app quits, then
   reopens the app (its log is `~/.local/state/meta-account-sync/at-quit.log`).
   So end the turn with `wrap_up`: the recap says what came over, the ask is
   to quit the app with Cmd+Q (it reopens by itself), and one button,
   "Restarted", sends "Restarted, finish the account sync". With no restart
   needed but a `dead_login` left, end the turn the same way: the ask is to
   approve the sign-in page, and one button, "Signed in", sends "Signed in,
   finish the account sync". After either, close the sign-in tabs and start
   again at step 1, so `copy` runs again.
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
   sessions only, and which environments this account has. `collapsed` has
   no tool: name those sections, to be clicked by hand.

## What to know

- Records live in `~/Library/Application Support/Claude/claude-code-sessions/<account>/<org>/`,
  beside `archived-sessions.idx`, which `copy` rebuilds to match them.
  Replaced records, and the app's localStorage before a presets write, are
  backed up under `~/.local/state/meta-account-sync/`.
- Sections and filing are owned by the app window. The config file's
  `preferences.epitaxyPrefs` (`dframe-code-sections`, `dframe-group-scopes`)
  is its mirror: `plan` reads it, nothing writes it.
- Its `groups` list leaves out empty sections, so read sections from
  `dframe-code-sections`.
- `move_sessions` refuses archived sessions, so `moves` holds active ones
  only. An archived session keeps whatever filing this account gave it.
- A session started from another (a record with `spawnedFrom.sessionId` and
  no `lineageDetached`) shows in its parent's section. `move_sessions`
  reports it moved but the app records nothing, so `moves` leaves it out.
- Records with a `scheduledTaskId` are routine runs. They show only in the
  Routines section, which Jason keeps switched off.
- Conversations (`~/.claude/projects/**/<cliSessionId>.jsonl`) are shared by
  every account; only the records, the sidebar and the presets are per account.
- Presets live in the app's localStorage (`Local Storage/leveldb`, origin
  `https://claude.ai`), under `persisted.ccd-session-presets.<account>`. At
  launch the app rewrites `ccd-session-presets.json`'s `byAccount` from it and
  never reads that file back, so a write to the file is lost (Nov 8). A
  running app holds the leveldb's lock, so the waiter writes once it has quit:
  one record appended to the leveldb's log (`scripts/localstorage.py`), which
  the next launch replays.
- A preset matches by name, the source's place and settings win, and the
  source's `builtIns` (model, effort and worktree for a new session) replace
  this account's. The rest of this account's preset state (recent places)
  stays.
- Cloud environments are reached through each account's Claude Code login:
  `~/.claude-N` and its keychain item, `Claude Code-credentials-` plus the
  first 8 hex of the dir path's SHA-256. A token reaches only its own org,
  whatever org a request names, so `cloud.py` asks the server which org each
  token reaches (`GET /api/oauth/profile`), never a `.claude.json`. The
  desktop app writes its own login into `~/.claude.json`, which is why no
  account's login is kept in `~/.claude` (`docs/claude-account.md`).
- A stored token expires within hours. `cloud.py` renews it by running that
  account's CLI once, which works even at the usage limit. The refresh token
  has its own expiry, `refreshTokenExpiresAt`, and a refresh doesn't extend
  it (account 1, refreshed Nov 3, still lapsed Nov 4). Past it the login is
  dead: `cloud.py` reports it without running the CLI, which would blank
  the keychain item.
- `claudeN auth login` opens the sign-in page set to that account's org
  (claude-account's `claude-sign-in-browser`, in `docs/claude-account.md`),
  so the page offers one row instead of the picker's look-alike rows for
  accounts 1 and 2. Account 3's opens in Safari, which holds its email.
- The API: list `GET /v1/environment_providers`, read and save
  `GET`/`POST /v1/environment_providers/<id>`, create
  `POST /v1/environment_providers/cloud/create` with `kind: anthropic_cloud`,
  all with header `anthropic-beta: ccr-byoc-2025-07-29`. The web app's
  `/v1/environment_providers/private/…` routes refuse OAuth tokens.
- Environment variables and setup scripts are copied server to server and
  never printed.
- Not synced, by design: routines (a copy would run on every account) and
  claude.ai connectors (each is its own sign-in).
