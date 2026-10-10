# Raycast workbench

Editable source and reconstruction guide for Jason's Raycast setup. Quicklinks, snippets, custom Script Commands, aliases, and hotkeys were activated and verified on 2026-09-27. Raycast's machine-local state is recorded here because most of it is not driven live by these files.

## Deploy

From the dotfiles root, run `just raycast-setup` to link only this directory into `~/.config/raycast/workbench`. Future `just up` runs also manage it through the parent `.spread` directory. Raycast's other files remain machine-local.

## Reinstall or restore

1. In Raycast Settings → Script Commands, add `~/.config/raycast/workbench/script-commands`. Raycast watches this directory after registration.
2. Run **Import Quicklinks**, choosing `~/.config/raycast/workbench/quicklinks.json`.
3. Run **Import Snippets**, choosing `~/.config/raycast/workbench/snippets.json`.
4. Configure aliases and hotkeys using the table below after checking existing bindings.
5. Enable **Prefer Existing Tabs** for the imported Quicklinks.
6. Install [GitHub](https://www.raycast.com/raycast/github), [Chrome](https://www.raycast.com/Codely/google-chrome), and [Linear](https://www.raycast.com/linear/linear) from the Store as needed, then complete their account connections. Raycast's Terms of Service and Acceptable Use Policy were accepted on 2026-09-27.

Imports are additive: matching Quicklinks and Snippet keyword collisions can be skipped. Editing these JSON files does not live-update imported entries. Export the app's current Quicklinks/Snippets back to these files when maintaining them through Raycast.

All requested free-plan activation is complete. Pro-only AI commands and layouts remain deferred to the October 1 reminder.

## Everyday commands

| Command | Alias | Hotkey | State |
| --- | --- | --- | --- |
| Clipboard History | `clip` | ⌃⌥V | Active |
| Chrome: Search Tabs | `tabs` | ⌃⌥T | Active; verified with two current Chrome tabs |
| Chrome: Search History | `history` | — | Active |
| Heartbeat PR | `pr` | — | Active |
| Sessions | `session` | — | Active |
| Email Sequences | `sequences` | — | Active |
| Search Snippets | `snip` | — | Active |
| Linear: My Issues | `issues` | — | Active; verified with 2 In Development and 11 Merged issues |
| Linear: Search Issues | `linear` | — | Active |
| GitHub: My Pull Requests | `github` | — | Active; verified with 20 open pull requests |
| cmux Workspaces | `workspaces` | — | Active |
| Heartbeat: My Pull Requests | `prs` | — | Active |
| Left Half | — | ⌃⌥← | Active |
| Right Half | — | ⌃⌥→ | Active |
| Maximize | — | ⌃⌥↑ | Active |
| Restore | — | ⌃⌥↓ | Active |

Clipboard History is enabled with three-month retention. All four Quicklinks are imported with **Prefer Existing Tabs** enabled.

Chrome Automation access is enabled. **Search Tabs** executed successfully and showed the two current Chrome tabs. Chrome's `tabs` and `history` aliases and ⌃⌥T were verified again after relaunch. Window-management hotkeys were verified in settings when saved.

Linear Settings is logged in through `jason@heartbeat.chat`. **My Issues** loaded its live list with 2 In Development and 11 Merged issues.

The GitHub extension is installed and logged in. **My Pull Requests** returned 20 open pull requests, and alias `github` is saved. This verifies the generic GitHub command; the separate `prs` Script Command is the verified Heartbeat-specific view.

All three snippets are imported with expansion enabled: `;brief`, `;review`, and `;design`. Their full text is in `snippets.json`.

## Custom commands

- **cmux Workspaces** shows the current windows, workspaces, and selected surfaces.
- **Heartbeat: My Pull Requests** shows authored open PRs with observed CI counts, draft/open state, review decision, and URLs. The list is capped at 30; it does not assess merge readiness.

Both commands are read-only and use the existing CLI installations and GitHub CLI session. The Bun interpreter is pinned to this machine's `/Users/jasonkuhrt/.vite-plus/bin/bun`; cmux and gh are in `/opt/homebrew/bin`. Update these paths when moving to a machine with different locations. Raycast Script Commands run in a non-login shell.

The directory is registered in Raycast and resolves through the live dotfiles symlink. Both commands executed successfully from Raycast using aliases `workspaces` and `prs`; the verified outputs showed three windows with seven workspaces and 13 open authored PRs.

## AI and layouts

`ai-prompts.md` contains three source prompts: Plain English, Tighten Draft, and Explain Error. The AI trial has ended and the account does not have Pro. Official pricing was verified as $10 per month or $96 per year, plus applicable tax. Jason deferred the purchase until next month; a **Get Raycast Pro** reminder is in the Personal list for October 1, 2026. **Plain English** currently exists only as an unsaved draft with the correct `{selection}` input; model selection requires an upgrade. The other two prompts have not been created.

No layouts have been created. Proposed Pro layouts remain **Code and Review**, with Codex on the left half and Chrome on the right half, and **Terminal and Browser**, with cmux and Chrome. Raycast's built-in single-window commands work without these layouts.

## What is actually reproducible

| Item | Supported representation |
| --- | --- |
| Script Commands | Live source directory |
| Quicklinks and Snippets | Import/export JSON |
| Custom extension code | Source repository, registered via developer tools |
| AI prompt wording | Plain text here; command creation is an in-app step |
| Aliases, hotkeys, app preferences, installed extensions, AI commands, layouts | Raycast's encrypted `.rayconfig` export |
| Sign-in and OS permissions | Verify and authorize on each machine |

Use **Export Settings & Data** for a restore snapshot. Store the encrypted `.rayconfig` in a private backup directory; it can include personal histories and notes. Keep its passphrase separately. Import lets you select categories and merges with existing data. This is not a declarative configuration engine.

## Official references

- [Quicklinks JSON](https://manual.raycast.com/quicklinks)
- [Snippets JSON](https://manual.raycast.com/snippets)
- [Aliases and hotkeys](https://manual.raycast.com/command-aliases-and-hotkeys)
- [Script Commands](https://manual.raycast.com/script-commands)
- [Import and export](https://manual.raycast.com/import-export)
- [Window management](https://manual.raycast.com/window-management)

Script metadata was checked against the official `raycast/script-commands` checkout at commit `cf612c22a8ddea40f6d717f513bbb5619a73ad33` in `~/repo-references/raycast-script-commands`.
