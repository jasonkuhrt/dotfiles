# claude-account

Runs Claude Code as one of several accounts. `claude1`, `claude2` and `claude3` pin an account, and plain `claude` runs whichever one `claude-default` names. Each account signs in once to its own directory (`~/.claude-1`, `~/.claude`, `~/.claude-3`); the setup, plugins and conversation history are symlinked to `~/.claude`, and user-scope MCP servers are merged through `~/.claude.json`.

The tool is `claude-account.fish`, `claude.fish`, `claude-default.fish` and `claude1.fish` to `claude3.fish` in `home/.config/fish/functions/`. `just claude-account-check` verifies it against `scripts/tests/fake-claude.sh`.

## The goal, and the one simpler design

The goal is one Claude Code setup with more quota: a single subscription does not last a week, so a second and third stand behind it. Nothing about the setup should differ between accounts.

A separate directory per account is how Anthropic documents staying signed in to several accounts ([Log in with multiple accounts](https://code.claude.com/docs/en/authentication#log-in-with-multiple-accounts)). It makes the login per account, and this tool then shares everything else back.

The only simpler design is a single directory with a one-year token per extra account (`claude setup-token`, passed as `CLAUDE_CODE_OAUTH_TOKEN`). That needs no sharing at all. It was not chosen because, per the same page, such a token "can only make model requests": no Remote Control and no claude.ai connectors while running on an extra account.

## Why it exists beside claude-swap

[claude-swap](https://github.com/realiti4/claude-swap) is the popular tool for this and stays installed as CodexBar's usage meter (see [codexbar.md](codexbar.md)). It runs accounts two ways, and neither fits here.

- `cswap switch` swaps the one shared login by copying a rotating refresh token between accounts. A missed rotation leaves the copy dead. That killed logins on this machine and is why this tool was written on 2026-10-06.
- `cswap run N` gives an account its own profile through `CLAUDE_CONFIG_DIR`, the same mechanism this tool uses. It still seeds that profile from a copy of the stored login and reconciles the two afterwards.

What this tool does that `cswap run` does not, as of claude-swap 0.26.0:

- One login per account, never copied.
- Plugins, the status line, scripts, tasks, todos and plans are shared, and history is shared without a flag.
- A user-scope MCP server added or removed under any account reaches the others.
- Changing the default account touches no login.

What claude-swap does that this tool does not: move a running session to another account without a restart, rotate automatically near a limit, and show every account's usage. Here a session that hits its limit is quit and resumed with another launcher.

## Delete when

Written 2026-10-10 against claude-swap 0.26.0, released 2026-09-02. The states below are what was known that day; recheck them before acting on this section.

The criteria follow from the goal above. Delete this tool and launch through `cswap run` once all four hold:

| Part of the goal | Criterion | Upstream | State on 2026-10-10 |
| --- | --- | --- | --- |
| Nothing differs between accounts | A session profile shares everything in `~/.claude` but the login | PR [#163](https://github.com/realiti4/claude-swap/pull/163) (`--share-all`). It covers plugins ([#304](https://github.com/realiti4/claude-swap/issues/304)) and history ([#396](https://github.com/realiti4/claude-swap/issues/396)) | Open since 2026-07-22, merge conflicts, no maintainer reply |
| Nothing differs between accounts | A user-scope MCP change made inside a session persists | No issue filed | The one-way mirror is by design ([#139](https://github.com/realiti4/claude-swap/issues/139)) |
| Logins do not die | `cswap run` on the default account from inside a session no longer revokes that login's token | [#381](https://github.com/realiti4/claude-swap/issues/381) | Open since 2026-09-21, confirmed by a second user |
| Logins do not die | The login-copy bugs are closed and no new report of a destroyed or revoked refresh token has appeared for three months | [#383](https://github.com/realiti4/claude-swap/issues/383), [#302](https://github.com/realiti4/claude-swap/issues/302), [#444](https://github.com/realiti4/claude-swap/issues/444), [#415](https://github.com/realiti4/claude-swap/issues/415) | All open; #415, #434 and #444 were filed in the ten days before this date |

The last criterion is the one that decides it. Those bugs are instances of how claude-swap is built, a stored login with live copies, so closing them one at a time does not show the class is gone. Three quiet months is this repo's own bar, not upstream's.

Reasons to want the move, which are not conditions for it:

- **Automatic account choice.** PR [#386](https://github.com/realiti4/claude-swap/pull/386) (`cswap run --auto`, for [#382](https://github.com/realiti4/claude-swap/issues/382)) starts each session on an account that has quota left. Here the flip is manual, with `claude-default N`. Open since 2026-09-22 with merge conflicts, and it competes with PR #338 for the same flag.
- **Folder trust.** PR [#430](https://github.com/realiti4/claude-swap/pull/430) carries "trust this folder" answers into session profiles. This tool copies them once, when an account is created, so each account asks again about folders trusted later. Open since 2026-10-04.

Not a blocker: there is no default-account flip upstream, but `cswap map N ~` with a bare `cswap run` picks the account by directory, which is close enough.

Moving over means signing in to each account again: Claude Code keys a saved login to the literal `CLAUDE_CONFIG_DIR` path, and claude-swap keeps its profiles under `~/.claude-swap-backup/sessions/`.
