# nix-darwin macOS Sandbox

This directory is an evaluation slice, not an adoption. It does not change your machine unless you explicitly run `darwin-rebuild` against this flake.

The goal is to show what a native-first `nix-darwin` layer would add to this repo for macOS settings only:

- a typed, reviewable macOS settings tree
- one rebuild command instead of shell mutation scripts
- a concrete replacement map for the settings scripts you already have

## New Surface Area

This sandbox introduces:

- `sandbox/nix-darwin-macos/flake.nix`
- `sandbox/nix-darwin-macos/hosts/Jasons-MacBook-Pro-M5/default.nix`
- `sandbox/nix-darwin-macos/modules/base.nix`
- `sandbox/nix-darwin-macos/modules/current-repo-capture.nix`
- `sandbox/nix-darwin-macos/modules/macos/*.nix`
- root `just` recipes:
  - `just nix-darwin-sandbox-readme`
  - `just nix-darwin-sandbox-check`

It intentionally does not wire anything into `just up` or `dotctl`.

## File Layout

```text
sandbox/nix-darwin-macos/
  flake.nix
  README.md
  hosts/
    Jasons-MacBook-Pro-M5/
      default.nix
  modules/
    base.nix
    current-repo-capture.nix
    macos/
      dock.nix
      finder.nix
      keyboard.nix
      platform.nix
      screenshots.nix
      trackpad.nix
```

## New Commands

Inspection only:

```sh
just nix-darwin-sandbox-readme
just nix-darwin-sandbox-check
```

Once `nix` is installed, the new command surface would be:

```sh
# one-time bootstrap from the flake
sudo nix run github:nix-darwin/nix-darwin/master#darwin-rebuild -- switch --flake ./sandbox/nix-darwin-macos#Jasons-MacBook-Pro-M5

# daily workflow after bootstrap
sudo darwin-rebuild switch --flake ./sandbox/nix-darwin-macos#Jasons-MacBook-Pro-M5
sudo darwin-rebuild check --flake ./sandbox/nix-darwin-macos#Jasons-MacBook-Pro-M5

# inspect live option values and docs
darwin-option system.defaults.NSGlobalDomain.KeyRepeat
darwin-option system.defaults.dock.autohide
```

For a real adoption, pin `flake.nix` to the current stable `nix-darwin-<release>` and matching `nixpkgs-<release>-darwin` branch. This sandbox stays on the official `master` + `nixpkgs-unstable` pattern so it remains easy to try without making a release-branch guess in advance.

## Current Repo State Captured Here

This sandbox captures the current native macOS settings now spread across shell scripts:

- keyboard:
  - `AppleFnUsageType = 3`
  - `com.apple.keyboard.fnState = true`
  - `ApplePressAndHoldEnabled = false`
  - `KeyRepeat = 2`
  - `InitialKeyRepeat = 15`
  - disable smart quotes, smart dashes, double-space period, and auto-correct
  - `AppleKeyboardUIMode = 3`
- screenshots:
  - save to `~/Pictures/Screenshots`
- Finder:
  - show all extensions
  - show hidden files
  - show path bar
  - no extension-change warning
  - folders sort first
- system behavior:
  - no `.DS_Store` on network or USB volumes
  - `LSQuarantine = false`
- Dock:
  - autohide
  - minimize to application
  - hide recents
  - tile size `36`
  - scale minimize effect
  - disable auto-rearrange Spaces
  - empty persistent app list
  - Downloads folder stack in `persistent-others`
- trackpad:
  - tap-to-click for built-in and Bluetooth trackpads

This is the useful capture set because it is:

- native macOS state
- deterministic
- stable enough to be worth pinning
- currently owned by imperative shell writes

## What Stays Out

Even in the ideal `nix-darwin` version, these stay outside this sandbox:

- Karabiner rules in `home/.config/karabiner/karabiner.json`
- Ghostty, Fish, Neovim, Claude, and other app config already cleanly owned as files
- Wispr Flow app-specific hotkey mutation in `scripts/setup/after/onchange/18-wispr-flow-shortcut.sh`
- iCloud Desktop & Documents, which is still manual here

## What You Could Delete Elsewhere

If this sandbox became authoritative for macOS settings, the deletion pass is straightforward:

- delete `scripts/setup/after/onchange/08-macos-defaults.sh`
- delete `scripts/setup/after/onchange/09-dock-apps.sh`
- delete `scripts/data/dock/apps.txt`
- delete the now-unused `set_default()` helper from `scripts/lib/helpers.sh`
- remove the macOS defaults / Dock script mentions from:
  - `README.md`
  - `README.new.md`
- trim the native-setting assertions from `justfile` recipe `fn-wispr-qa`
  - keep the Karabiner assertions
  - keep the Wispr assertions

## What You Gain

The DX improvement is not just "the values move to Nix." It is:

- one source of truth for native macOS state
- typed option names where `nix-darwin` has first-class coverage
- one official escape hatch for plist-only settings via `CustomUserPreferences`
- one apply command, one check command
- one reviewable config tree instead of shell scripts that mutate live state in place

## Caveats

- This sandbox was not executed end-to-end because `nix` is not installed in this environment.
- The flake is intentionally isolated so you can inspect it without it taking over bootstrap.
- If you adopted this for real, the next step would be moving these files under a repo-owned `darwin/` root and deciding whether `just up` should call `darwin-rebuild` or keep the flows separate.
