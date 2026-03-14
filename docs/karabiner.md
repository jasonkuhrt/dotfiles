# Karabiner

Mental model and operating manual for the dotfiles-managed Karabiner setup.

## Short Answer

Under normal circumstances, Karabiner should not need a reload very often.

Expected behavior:

- edit `home/.config/karabiner/karabiner.json`
- let dotctl keep the live file in sync
- Karabiner notices the change and applies it

A reload is the right move when the rule looks correct but the live engine seems stale.

That usually means:

- the config is present but behavior does not match it
- several remaps break at once
- Karabiner was quit, restarted, or woke up into a half-healthy state

If only one app-scoped binding is broken, do not assume reload first. Check context first:

- is the target app truly frontmost?
- is the keyboard eligible for remapping?
- is the selected profile the one that contains the rule?

## What Karabiner Is

Karabiner is a keyboard event router, not just a keybinding preferences UI.

The useful model is:

```text
physical key
  -> device gate
  -> selected profile in karabiner.json
  -> matching rule + conditions
  -> virtual keyboard output
  -> target app
```

That is why a rule can be correct in JSON and still not work live. Any layer in that pipeline can fail.

For app-scoped rules, "frontmost app" is one of the conditions checked before Karabiner emits the replacement key.

## Components

| Piece | Role |
|---|---|
| `Karabiner-Elements.app` | Settings UI. Useful for device visibility, profiles, and recovery. |
| `Karabiner-Core-Service` | Backend service that owns event processing. |
| `karabiner_console_user_server` | Per-login-session process that tracks session state and frontmost apps. |
| `Karabiner-DriverKit-VirtualHIDDevice` | Virtual keyboard Karabiner uses to emit remapped output. |

The UI being open does not guarantee the rest of the pipeline is healthy.

## Repo-Owned Sources

- `home/.config/karabiner/karabiner.json` is the source of truth.
- The live file is `~/.config/karabiner/karabiner.json`.
- Because the file is repo-managed through dotctl, normal edits to the existing file path are live immediately.
- `just up` is a convergence command. It deploys files and runs setup scripts, but it is not a dedicated Karabiner restart step.
- A synced config file and a healthy Karabiner engine are different things. The file can be correct while the live engine is stale.

## State Model

When reasoning about Karabiner, keep these states separate:

| State | Question |
|---|---|
| Repo state | Is the desired rule written correctly in the repo file? |
| Live config state | Does `~/.config/karabiner/karabiner.json` match the repo file? |
| Engine state | Are the Karabiner services and virtual HID path healthy right now? |
| Context state | Is the correct profile active, is the device eligible, and are rule conditions true? |

Most confusion comes from collapsing these into one idea of "Karabiner config." They are related, but they fail differently.

## Rule Anatomy

Most useful parts of a complex modification rule:

- `from`: the incoming key and modifier shape.
- `to`: the replacement event Karabiner emits.
- `conditions`: app scope, variables, or device-dependent filters.
- `description`: the human handle used by checks and future maintenance.

Example: the Raycast vim-style navigation rule says:

- `control + j` becomes `down_arrow`
- `control + k` becomes `up_arrow`
- only when the frontmost bundle id is `com.raycast.macos`

That means the rule is app-scoped, not global. If Raycast is visible but not truly frontmost, the rule should not fire.

## Failure Layers

Use this map when behavior goes weird.

| Layer | Typical symptom | First move |
|---|---|---|
| Config | Rule missing, malformed, or on the wrong profile | `just raycast-nav-check` or `just karabiner-check` |
| Live config | Repo file is correct, but Karabiner is reading something else | `just karabiner-check` |
| Device | Nothing happens from a keyboard that should be remapped | Check Karabiner Settings > Devices |
| Context | Only one app-scoped binding is broken | Make sure the target app is actually frontmost |
| Engine | Several remaps stop working or fresh edits feel stale | `just karabiner-reload` |
| Output | Rule seems matched, but the emitted key path is still unhealthy | `just karabiner-log` and inspect the virtual HID side |

The important distinction is:

- config problems mean the rule definition is wrong
- engine problems mean the rule definition is fine, but the running system is not honoring it yet
- context problems mean the rule is healthy, but the conditions for firing are false

## Workflows

These are the repo-managed entry points for Karabiner operations:

```sh
just karabiner-check
just karabiner-reload
LINES=80 just karabiner-log
just raycast-nav-check
```

### `just karabiner-check`

Health check for the live stack. It verifies:

- repo JSON validity
- live config matches repo config
- core service is running
- console user server is running
- virtual HID driver is running
- current profile is readable
- connected devices are visible to `karabiner_cli`
- selected profile contains the Raycast rule
- current console-user session log is free of connection errors

### `just karabiner-reload`

Safe recovery path when Karabiner behavior feels stale:

- opens Karabiner-Elements
- re-selects the current profile
- runs `karabiner-check`

Use this before restarting a target app. Karabiner is often the stale layer, not the app receiving the remapped key.

## When Reload Is Actually Necessary

Under normal circumstances, a Karabiner reload should be uncommon.

Usually you should **not** need a reload for:

- ordinary editing of `karabiner.json`
- running `just up`
- switching to an app that already has a working app-scoped rule

The normal expectation is that the repo-managed config is live and Karabiner notices the change on its own.

A reload becomes reasonable when config state and live engine state seem out of sync. Common signs:

- you changed `karabiner.json`, the rule is present, but behavior is still stale
- multiple remaps stop working at once
- Karabiner was quit, crashed, or just reopened
- you just logged in, woke from sleep, or the Karabiner background pieces feel half-awake
- `just karabiner-check` says the services are unhealthy or the current session log has connection trouble

Put differently: reload when the **engine** seems stale, not when the **idea of the rule** is in doubt.

If only one app-scoped binding is broken, reload is not the first guess. Check context first:

- is the target app actually frontmost?
- is the device eligible for remapping?
- is the selected profile the one that contains the rule?

## Quick Triage

Use this as the first-pass decision tree:

1. If only one app-scoped rule is broken, check context.
2. If multiple remaps are broken, check engine health.
3. If the repo file changed recently and behavior is stale, reload Karabiner.
4. If `karabiner-check` passes but behavior is still wrong, inspect the specific rule and app conditions.

In command form:

```sh
just karabiner-check
just karabiner-reload
LINES=40 just karabiner-log
```

### `just karabiner-log`

Quick way to inspect the current console-user log:

```sh
LINES=20 just karabiner-log
```

Useful when `karabiner-check` says services are healthy but behavior is still strange.

### `just raycast-nav-check`

Focused shape check for the Raycast `control-j` / `control-k` rule in the repo config.

## Practical Heuristics

- If only one app-specific rule fails, suspect conditions before suspecting Karabiner globally.
- If several remaps fail at once, suspect the engine or device layer.
- If the config changed recently and behavior is stale, reload Karabiner before touching the target app.
- If the target app is not frontmost, app-scoped rules should be expected to do nothing.
- For Karabiner behavior problems, prefer `just karabiner-check` and `just karabiner-reload` over `just up`.

## Current State In This Repo

Karabiner is doing two kinds of work here:

- low-level keyboard behavior like fn handling and cmux mode
- app-scoped niceties like Raycast vim-style list navigation

That split matters. Global mode systems tend to use variables and more complex rules. App niceties are usually simple `frontmost_application_if` remaps.
