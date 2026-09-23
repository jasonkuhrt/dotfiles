# CodexBar

iCloud owns shared provider settings and the supported notification/display preferences. Dotfiles owns the installation and local settings that CodexBar deliberately does not sync.

Run `just codexbar-setup` to apply local settings. The same setup runs during `just up`; the Brewfile installs CodexBar and uv, and setup installs claude-swap 0.26.0 when it is missing. An existing claude-swap installation is retained. Edit `scripts/data/codexbar-local.json` to change the merged icon, stacked account layout, local Spark visibility, Claude connection source, Keychain prompt policy, or account paths.

Setup merges only those fields into the app's private `~/.config/codexbar/config.json`, preserves provider order, credentials, and iCloud-managed fields, and restarts CodexBar only when settings actually change. Account paths expand against the current home directory. The extra Codex profile is configured only once its `auth.json` exists; rerun setup after signing into that account on a new Mac.

The live config, account directories, Claude swap backups, and app preferences plist stay outside Git. CodexBar may write secrets into its config, including secrets received through optional encrypted iCloud sync. The local settings file in this repo contains no credentials and is not symlinked over the live config.

On another Mac, sign into the same Apple ID and enable CodexBar's iCloud sync. Authenticate Codex, both Claude subscriptions through claude-swap, and Grok locally. iCloud does not copy the external CLI credential stores or install those CLIs. Launch at Login is configured in CodexBar on each Mac. This setup leaves the current iCloud sync and secret-sync choices unchanged.

The tokenless AI Quota Resets calendar helper is a separate local installation; this setup manages CodexBar itself.

Upstream: [configuration and iCloud sync](https://github.com/steipete/CodexBar/blob/main/docs/configuration.md#icloud-sync), [Claude multi-account integration](https://github.com/steipete/CodexBar/blob/main/docs/claude-multi-account-and-status-items.md).
