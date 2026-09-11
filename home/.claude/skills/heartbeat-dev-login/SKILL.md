---
name: heartbeat-dev-login
description: Sign in to a local Heartbeat dev stack without typing a password, by minting a session JWT from the testing API and injecting it into localStorage. Use whenever browser work needs an authenticated dev session — manual QA, visual checks, driving the app with Claude in Chrome — or when a dev stack shows the "Welcome back!" login page.
---

# Heartbeat dev login

The dev login is `jason@example.com` with any password string. Do not type it
into the form — agents must not enter passwords into fields, and the form is the
slow path anyway. Mint the session directly; it is the same mechanism the E2E
fixtures use.

## The mechanism

- The API mounts `POST /testing/service` in every non-production environment
  (`apps/api/src/publicAPI/routes/testing.ts`). It takes `{ op, input }`.
- `authn/getTokenForEmail` returns `{ token }` for an existing user's email.
- The app reads its session from `localStorage['heartbeat-auth-token']`
  (`apps/e2e/src/_fixtures/fixture.ts`, `createStorageState`).

Discover every available op against a running stack:

```sh
curl -sk -X POST "$API/testing/service" -H 'content-type: application/json' \
  -d '{"op":"meta/introspect","input":{}}'
```

## Origins

`vpr @infra/platform#dev` serves per-worktree portless origins named after the
worktree, so each checkout has its own stack and its own cookies:

```
https://dev-<user>-<worktree>.app.heartbeat.localhost
https://dev-<user>-<worktree>.api.heartbeat.localhost
```

Read the actual origins out of the dev process output rather than guessing the
worktree slug.

## Sign in from Claude in Chrome

Navigate to the app origin first so `localStorage` is on the right origin, then
run this in the page (`javascript_tool`), then navigate to the community:

```js
const api = location.origin.replace('.app.', '.api.');
const r = await fetch(`${api}/testing/service`, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({
    op: 'authn/getTokenForEmail',
    input: { email: 'jason@example.com' },
  }),
});
const { token } = await r.json();
localStorage.setItem('heartbeat-auth-token', token);
// Suppress the page-editor intro overlay, as the E2E fixtures do.
localStorage.setItem(
  'heartbeat-page-editor-tutorial:v1',
  JSON.stringify({ completedAt: 0 }),
);
```

The seeded community slug is `localdev`, so land on `/localdev`.

## If the stack will not start

A fresh worktree has no `.env` and `vpr @infra/platform#dev` exits with
`.env: not found`. Copy it from the main checkout — it is gitignored:

```sh
cp /Users/jasonkuhrt/projects/heartbeat-chat/Heartbeat/.env .env
```
