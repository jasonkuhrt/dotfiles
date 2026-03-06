# Proposal: Full Replacement of Chezmoi With Nix-Darwin + Home Manager + Syncthing (Bidirectional)

As of March 5, 2026, this proposal describes replacing the current chezmoi system with:
- nix-darwin for macOS system configuration
- home-manager for user-level configuration
- nh as the daily rebuild UX
- Syncthing for bidirectional tool-managed config sync

## 1) Decision
1. Replace chezmoi as control plane with nix-darwin + home-manager + nh.
2. Keep bidirectional cross-Mac sync for tool-managed files with Syncthing Send/Receive.
3. Enforce one writer per path.

## 2) Why this was proposed
The prior analysis identified recurring friction in the current workflow:
- apply/re-add drift loop for tool-mutated files
- atomic-write replacement problems (for example settings files)
- lifecycle scripts coupled to apply behavior

## 3) Up-to-date baseline (session-verified)
- Nix active, latest tag 2.34.0
- nix-darwin active, flakes-first onboarding
- home-manager active, release-25.11 branch
- nh active, tag v4.3.0
- Syncthing active

## 4) Target architecture
1. Declarative control plane: flake.nix + nix-darwin + home-manager.
2. Mutable config plane: Syncthing allowlisted folders.
3. Conflict plane: explicit conflict queue.
4. Secrets plane: Nix-native static secret handling plus mutable tokens in sync lane.

## 5) Ownership policy
- Declarative: Nix/HM-owned files.
- Tool-managed config: app/CLI-owned files, synced bidirectionally.
- Local-only state/cache: never synced.

## 6) Mapping from current chezmoi scripts
The prior proposal mapped each current script under home/.chezmoiscripts to either:
- declarative Nix/HM equivalents
- retained imperative tasks
- one-time migration tasks

Highlights:
- brew-bundle -> nix-darwin homebrew module
- macos-defaults -> nix-darwin defaults
- fisher/npm globals/toolchain -> HM or explicit update tasks
- wispr/tool-written JSON -> mutable config lane

## 7) Homebrew mode
Hybrid mode:
- core CLI in Nix
- casks/edge packages in nix-darwin homebrew declarations
- no ad-hoc brew installs outside config

## 8) Syncthing integration level
- Operational integration via Home Manager module (including launchd on macOS)
- File-conflict semantics remain Syncthing’s domain

## 9) Command surface after cutover
- just bootstrap
- just switch (nh darwin switch)
- just update (flake update + switch)
- just conflicts
- just resolve <path>

## 10) Migration plan
Wave 1: flake scaffolding
Wave 2: package/system parity
Wave 3: mutable config lane + conflict tooling
Wave 4: decommission chezmoi daily use

## 11) Risks and controls
- HM collisions during migration -> backupFileExtension + overwriteBackup
- bidirectional semantic conflicts -> explicit queue + agent resolution
- package drift -> pinned flake inputs and controlled update windows

## 12) Acceptance criteria
- chezmoi not required for daily operations
- one switch command
- no recurring clobber failures
- bidirectional mutable-config replication works
- conflicts visible and resolved deterministically

## 13) Source references used in that proposal
- README.md
- docs/how-it-works.md
- docs/manual-setup.md
- docs/known-limitations.md
- justfile
- home/.chezmoiignore
- home/.chezmoi.toml.tmpl
- home/.chezmoiscripts/*
- upstream docs for nix, nix-darwin, home-manager, nh, syncthing

