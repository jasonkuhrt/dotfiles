---
name: heartbeat-visual-parity
description: Prove a branch introduces no unintended visual change by screenshot-diffing its frontend against develop's, both driven from ONE backend so the data is identical. Use when a PR touches shared UI, styles or a component library and "did this change how the app looks?" needs an answer stronger than eyeballing a few screens.
---

# Heartbeat visual parity

Answers "does this branch change how the app looks, anywhere it shouldn't?"
Baseline-image oracles cannot answer that: baselines captured from the branch
only pin future drift. Comparing two live frontends can.

## The idea that makes it work

Run **two frontends against one backend**. `apps/heartbeat/vite.config.mts`
honours `VITE_API_URL`, so develop's frontend can be pointed at the branch's
API and database. Same seed, same rows, same ids, same timestamps — so any
pixel difference is the frontend, not data noise. That is what made the older
approach useless: two stacks meant two databases, and every screenshot differed
for reasons nobody cared about.

Serve **both** sides the same way — bare `vite` on `127.0.0.1` ports. Comparing
an HTTPS portless origin against plain localhost confounds origin differences
with real ones.

## Setup

1. Full stack for the branch (provides the API and DB):
   `vpr @infra/platform#dev` — see [[heartbeat-dev-login]] for the `.env` copy a
   fresh worktree needs.
2. A detached worktree at develop's exact SHA, since the main checkout already
   has that branch checked out:
   `git worktree add --detach ../parity-develop <develop-sha>`
   then `cp <main>/.env .env`, `vp install`, and **`vp run -r generate`** — the
   frontend will not build without generated sources, and `--ignore-depends-on`
   skips that step.
3. Both frontends, same shape, pointed at the branch API:
   `env PORT=<port> HOST=127.0.0.1 VITE_API_URL=<branch api origin> vpr --ignore-depends-on @heartbeat/heartbeat#dev`

## Route list

Derive it, do not hand-write it. `apps/heartbeat/src/routeTree.generated.source.ts`
carries every `fullPath`; filtering to `/$communitySlug/...` entries with no
remaining `$param` or `{...}` segment yields ~64 routes reachable with only the
seeded community slug. Parameterised routes need seeded ids — the testing API
(`course/seed`, `signUpLink/createFreeOnboardingSignUpPage`) mints them.

## Capture and diff

Auth by injecting the token, never the login form — see [[heartbeat-dev-login]].
Pin viewport, `colorScheme`, `reducedMotion`, locale and timezone, and hide the
two live counters or every run differs:

```
[title="API uptime since last local restart"]
[title="Time since API restart and frontend bundle build"]
```

Diff the two PNGs **in the browser** on a canvas — no `pixelmatch`/`pngjs`
dependency is installed and none is needed. Tolerate small per-channel deltas
(~12) to absorb antialiasing.

**Establish the noise floor first** by comparing the branch against *itself*.
Measured 0.000–0.054% on this app; treat anything under ~0.1% as identical and
investigate the rest.

## Gotchas that cost time

- Node resolves imports from the **script's** directory, so a harness living in
  a scratch dir outside the repo cannot import `playwright`. Keep it inside the
  worktree (`.tmp/` does not dirty the tree).
- The portless origins use a self-signed cert: `NODE_TLS_REJECT_UNAUTHORIZED=0`
  for the `fetch` that mints the token, and `ignoreHTTPSErrors` on the context.
- Port 5000 is taken by macOS AirPlay.
- A vite dev server caches a failed transform. If you generate sources after
  starting it, restart it — reloading the page is not enough.
- Before believing a large diff, open the develop-side PNG. A vite error
  overlay reads as ~100% differing and means the baseline never rendered.
