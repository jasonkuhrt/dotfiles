# Velja

[Velja](https://sindresorhus.com/velja) is the default browser and hands each link to a real one. Chrome opens everything except what a rule in `scripts/data/velja.json` sends elsewhere. `just velja-setup` applies that file, and `just up` runs it whenever the file or `scripts/setup/velja.py` changes.

| Rule | Links | Open in |
| --- | --- | --- |
| Claude sign-in | `claude.ai/login…`, `claude.ai/magic-link…` | a picker: Chrome or Safari |
| YouTube | `youtube.com` and its subdomains, `youtu.be` | Brave |

## Why the Claude sign-in picker

The Claude desktop app signs in through the default browser, and a browser holds one claude.ai login. Chrome is signed in as jasonkuhrt@me.com, which owns accounts 1 and 2; Safari is signed in as account 3's email. Switching the app to account 3 means approving in Safari, and switching back means Chrome, so the picker asks which. Accounts 1 and 2 switch inside the app's account menu with no sign-in. `claude3 auth login` opens Safari on its own (see [claude-account.md](claude-account.md)).

## Limits

Velja sees only links opened from other apps: Messages, Mail, Slack, the terminal, the Claude app. A YouTube link clicked inside Chrome stays in Chrome.

## Settings live in Velja's sandbox

Velja keeps rules in its sandbox container as an array of JSON strings, one per rule. macOS lets a terminal write there only after you allow it to access data from other apps, and a terminal inside the Claude app is refused outright, so run `just velja-setup` from your own terminal. The script writes only `defaultBrowser` and `rules`; the trial, window positions and everything else stay as Velja keeps them. A rule made in Velja's Settings is overwritten by the next run, so add it to `velja.json` instead.

The rule format is not documented by Velja. The field names match the ones in the Velja 3.2.4 binary and a live config recorded in [velja-raycast](https://github.com/lmoloney/velja-raycast/blob/main/docs/velja-integration.md): `kind` is `host`, `hostSuffix` or `urlPrefix`, a `urlPrefix` pattern leaves out the scheme, and `browser` is a bundle ID, or `com.sindresorhus.Velja.promptMarker` for the picker.

## Installing

Velja is $10 in the App Store (id `1607635845`) or a free trial from its site that reminds you every 12 hours. It is not in the Brewfile: `mas` installs only apps the Apple ID already bought, so the line would fail on a Mac that hasn't. Once bought, add `mas "Velja", id: 1607635845`.
