---
name: heartbeat-dep-gardener
description: Find and land one high-leverage Heartbeat app dependency removal or update. Use when the user asks to audit app dependencies, remove weak or unused dependencies, update stale packages, make dependency usage Effect-native, create an internal monorepo package for a dependency concern, or run a repeatable dependency gardening pass that ends with land-pr when a real change is made.
---

# Heartbeat Dep Gardener

## Contract

Run one dependency gardening pass for the Heartbeat monorepo.

Target end state: one app dependency is removed, updated, or moved behind a better internal/Effect-native surface, then the branch is prepared with `land-pr`. If no high-confidence candidate exists, make no code changes and report the evidence.

Keep the pass intentionally narrow: one app, one dependency candidate, one reviewable PR.

## Scorecard

From the Heartbeat repo root, start with the bundled Bun script:

```bash
bun /Users/jasonkuhrt/.codex/skills/heartbeat-dep-gardener/scripts/score-deps.ts --repo . --registry
```

Use `--app <package-name-or-path>` only when the user names a specific app. Use `--json` when another script or subagent needs structured output.

The script finds the app with the most direct external production dependencies, counts direct import usage, inspects the installed package metadata, and optionally enriches maintenance data from the npm registry.

## Audit

Confirm the top candidate with source evidence before editing:

1. Read the selected app's `package.json`.
2. Inspect every import/use site for the candidate.
3. Inspect the installed package metadata and, when semantics matter, the official package repository or docs plus the exact installed version.
4. Prefer candidates with multiple signals, especially low usage plus poor type/ESM/maintenance/ecosystem fit.

Quality signals:

- Not ESM-native.
- Not TypeScript-native at the source level.
- Does not ship its own declarations.
- Has no DefinitelyTyped declarations.
- No release in over 12 months.
- Outdated relative to its ecosystem, such as React 18-only peers in a React 19 app.
- Published runtime surface is less than 300 LOC.
- Unused by the app.
- Barely used or only used for trivial behavior.
- Has install/postinstall/prepare scripts.
- Pulls native binaries or platform-specific package behavior.
- Has a broad transitive surface for a tiny usage site.
- Duplicates mature web/platform APIs.
- Wraps runtime data where `Schema` would provide a stronger boundary.
- Touches IO, environment, filesystem, process, network, time, randomness, or logging outside an Effect service boundary.

Treat "less than 300 LOC" as an ownership signal, not a defect by itself.

## Action

Pick the ideal action from first principles:

- Remove the dependency when usage is zero, dead, trivial, or replaceable with platform APIs.
- Update the dependency when it remains the right primitive but is stale or ecosystem-misaligned.
- Create or use a monorepo package when the concern is domain-owned, app-owned but reusable, or deserves a stable typed API.
- Make the replacement Effect-native when runtime dependencies cross IO, environment, filesystem, process, network, time, randomness, logging, or runtime data decoding boundaries.

Use existing Heartbeat package conventions. App code should not use direct globals or ad hoc substitutes where an Effect service boundary belongs. Prefer `Schema` for runtime data and `Config` / `ConfigProvider` for environment reads.

Before file edits, state the locked wave and expected outcome. If the user explicitly asked for an autonomous gardening/landing pass, continue after that update; otherwise ask a direct plain-text go/no-go question.

## Verification

Use the repo's package-manager/task-runner workflow. Never invoke `tsc` directly.

Prefer narrow checks tied to the changed package or app. Re-run the scorecard to confirm the dependency disappeared, changed version, or has fewer risk signals. Do not run broad local checks unless the user approved them.

## Landing

If code or manifests changed, load and follow the `land-pr` skill from the active skill list. If needed, use:

```text
/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/home/.claude/skills/land-pr/SKILL.md
```

Do not copy or reinterpret `land-pr`; follow it as the terminal phase. If no change was made, do not land a PR.

Use `refactor: ...` for the PR title and merge subject. Dependency removals, updates, internalized replacements, and Effect-native adapter moves are architecture/ownership cleanups, even when the diff is manifest-only.

## Output

Keep the closeout short:

- Selected app and why it was selected.
- Candidate dependency and evidence.
- Action taken: removed, updated, internalized, or Effect-native adapter/package.
- Verification run.
- PR URL and any remaining blocker when `land-pr` ran.
