# CodexBar

iCloud owns shared provider settings and the supported notification/display preferences. Dotfiles owns the installation and local settings that CodexBar deliberately does not sync.

Run `just codexbar-setup` to apply local settings. The same setup runs during `just up`; the Brewfile installs CodexBar and uv, and setup installs claude-swap 0.26.0 when it is missing. An existing claude-swap installation is retained. Edit `scripts/data/codexbar-local.json` to change the merged icon, stacked account layout, local Spark visibility, Claude connection source, Keychain prompt policy, or account paths.

Setup merges only those fields into the app's private `~/.config/codexbar/config.json`, preserves provider order, credentials, and iCloud-managed fields, and restarts CodexBar only when settings actually change. Account paths expand against the current home directory. The extra Codex profile is configured only once its `auth.json` exists; rerun setup after signing into that account on a new Mac.

The live config, account directories, Claude swap backups, and app preferences plist stay outside Git. CodexBar may write secrets into its config, including secrets received through optional encrypted iCloud sync. The local settings file in this repo contains no credentials and is not symlinked over the live config.

Claude Code accounts each sign in to their own directory through `claude1`, `claude2` and `claude3` (the `claude-account` fish function), so claude-swap no longer switches the login. CodexBar can list several Claude accounts only through claude-swap, so `~/.local/bin/cswap-meter` stands in for it. Its list reads each account's usage with that account's own launcher login, so there is no second login per account to keep alive, and claude-swap's installed modules format the rows the way CodexBar parses them. An expired token is renewed by Claude Code itself (its local `/usage` command, no model request), and a login past its refresh token's expiry shows "Re-login required" until `claudeN auth login`. The card marked Active is the account the Claude desktop app is on: its Claude Code sessions run in `~/.claude` and write their login into `~/.claude.json`, so the meter marks the account whose org matches. The list carries `supportsAccountSwitching: false`, so the cards show usage and offer no switch, and reads `claude1` to `claude3`. The version command passes through to claude-swap; everything else is refused.

On another Mac, sign into the same Apple ID and enable CodexBar's iCloud sync. Authenticate Codex, each Claude account with `claudeN auth login`, and Grok locally. iCloud does not copy the external CLI credential stores or install those CLIs. Launch at Login is configured in CodexBar on each Mac. This setup leaves the current iCloud sync and secret-sync choices unchanged.

The tokenless AI Quota Resets calendar helper is a separate local installation; this setup manages CodexBar itself.

Upstream: [configuration and iCloud sync](https://github.com/steipete/CodexBar/blob/main/docs/configuration.md#icloud-sync), [Claude multi-account integration](https://github.com/steipete/CodexBar/blob/main/docs/claude-multi-account-and-status-items.md).
