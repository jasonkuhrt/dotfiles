# claude-account

Runs Claude Code as one of several accounts. `claude1`, `claude2` and `claude3` pin an account. Plain `claude` runs the one `claude-default` names, or with `claude-default auto` the account to finish next: of those with quota left, the one whose week resets soonest. Each account signs in once to its own directory (`~/.claude-1`, `~/.claude-2`, `~/.claude-3`); the setup, plugins and conversation history are symlinked to `~/.claude`, and user-scope MCP servers are merged through `~/.claude.json`.

`~/.claude` itself is no account's login. The desktop app runs Claude Code there, with no `CLAUDE_CONFIG_DIR`, and each of its sessions writes the app's own login into `~/.claude.json`. Account 2's login lived there until 2026-11-04, when the file named account 1's org while its token reached account 2's: the sign-in helper below and `cswap-meter` read the org from that file, so both took the app's account for account 2.

The tool is `claude-account.fish`, `claude.fish`, `claude-default.fish` and `claude1.fish` to `claude3.fish` in `home/.config/fish/functions/`. `just claude-account-check` verifies it against `scripts/tests/fake-claude.sh`.

Plain `claude` from any other shell gets the same choice through `home/.local/shims/claude`, which hands its arguments to the fish function. Agents' shells are zsh, so without it an agent's `claude -p` ran on account 2 whatever its limit. `~/.local/shims` comes before the installer's `~/.local/bin` on PATH: in `config.fish`, and in `home/.zshenv` and `home/.zprofile`. claude-account runs the binary by its path, `~/.local/bin/claude`, so the shim never calls itself.

## Signing in

A login lasts about four weeks from its sign-in, and using it does not push that date back. The same login also feeds CodexBar's usage cards, so it is the only one per account to keep. `claudeN auth login` renews it with one click: claude-account sets `BROWSER` to `home/.local/bin/claude-sign-in-browser`, so the sign-in page opens set to the account's org and email (the `orgUUID` and `login_hint` parameters, read from that account's `.claude.json`). Without that, accounts 1 and 2, which share an email, show as two identical "Personal Ultra" rows in the page's org picker. Account 3 has its own email, so its page opens in Safari, which stays signed in to claude.ai as that email; Chrome holds the other one. Every other URL goes to `open` unchanged. The desktop app signs in through the default browser too, which is [Velja](velja.md): its Claude sign-in rule asks whether to approve in Chrome or Safari.

## One-year tokens

Each account also has a token from `claude setup-token`, made on 2026-11-06. They live in 1Password's MeOS vault as API Credential items named after the launcher, `Claude Code OAuth token claude1` to `claude3`, in the `credential` field (moved there from the login keychain on 2026-11-09). A token lasts one year, so all three expire around 2027-11-06. Put a new one in the same item before then.

They are for any integration that takes a Claude subscription by token. Each account has one token, and every integration shares it: a deliberate choice, made knowing that one leaked token exposes every integration using it. The `claudeN` launchers don't use them and shouldn't, because such a token can only make model requests (see the next section).

The Amp app is one such integration. Amp keeps at most two Claude subscriptions linked, one of them active, and only its app can link one (Settings → Model Routing → Claude Subscription). Its CLI can switch which linked one is active, list them and delete one, but can't set a token. So switching to a third account means deleting a link in the app and pasting that account's token.

Agents run these with `meos-op` in place of `op`.

```sh
# Copy account 2's token, to paste into Amp
op read "op://MeOS/Claude Code OAuth token claude2/credential" | tr -d '\n' | pbcopy
# Make a linked subscription the active one (IDs from `amp config model-providers list`)
amp config model-providers activate <connection-id>
# Replace account 1's token with the one on the clipboard
op item edit "Claude Code OAuth token claude1" --vault MeOS "credential=$(pbpaste)"
```

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

What claude-swap does that this tool does not: move a running session to another account without a restart, and show every account's usage. Here a session that hits its limit is quit and resumed with `claude --resume`, which on auto lands on the next account with quota left.

## Automatic account choice

The rule is use it or lose it. On `claude-default auto`, each launch of plain `claude` asks `cswap-meter` for every account's usage and takes, of the accounts with quota left, the one whose week resets soonest, so quota about to expire is spent first. An account at its five-hour or weekly limit is passed over until that window resets, and one whose week has not started goes last. The launch prints the account and why, for example `claude: account 1, week 4% used, resets in 3d 10h`.

`claude-default N` pins an account and turns the choice off; `claude1` to `claude3` force one for a single launch.

claude-swap's aliases carry the launcher names, so the row aliased `claudeN` is account N. The choice adds about 0.13 seconds to a launch.

The figures come from `cswap-meter`, which reads them with the launchers' own logins (see [codexbar.md](codexbar.md)). An account whose login has expired (its CodexBar card reads "Re-login required") has no figures and is passed over until `claudeN auth login`. With no figures at all, the launch goes to account 2.

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

A reason to want the move, which is not a condition for it: folder trust. PR [#430](https://github.com/realiti4/claude-swap/pull/430) carries "trust this folder" answers into session profiles. This tool copies them once, when an account is created, so each account asks again about folders trusted later. Open since 2026-10-04.

Not blockers, because a few lines of launcher over `cswap run` would cover both: upstream has no automatic choice per launch yet (PR [#386](https://github.com/realiti4/claude-swap/pull/386), `cswap run --auto`, open since 2026-09-22 with merge conflicts), and no default-account flip (`cswap map N ~` with a bare `cswap run` comes close).

Moving over means signing in to each account again: Claude Code keys a saved login to the literal `CLAUDE_CONFIG_DIR` path, and claude-swap keeps its profiles under `~/.claude-swap-backup/sessions/`.
