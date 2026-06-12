---
name: rq-login
description: Use when Codex needs to log into Revenu Quebec My Account with the Government Authentication Service, including Chrome navigation, Passwords.app credential handoff, Mail.app 2FA/security-notice handling, and post-login cleanup of recent RQ auth emails. Triggers include "rq login", "log into my rq", "Revenu Quebec gov auth", "Government Authentication Service", or RQ document/download flows that require an authenticated session.
---

# RQ Login

## Contract

Use the Government Authentication Service path, not legacy clicSEQUR, unless the user explicitly asks otherwise.

Defer to the existing skills and tools:

- Use `chrome:Chrome` for the remote browser/login tab by default.
- Use `$passwords` for Apple Passwords.app or Keychain credential reads/writes. Do not print secrets.
- Use macOS Mail only through the `gov rq auth-mail` CLI for RQ authentication emails from `notifications@authentification.quebec.ca`.
- Use the `gov rq` CLI namespace for authenticated portal inspection, auth email cleanup, document listing/download, and downloaded-PDF parsing once login is complete.

Keep the login non-destructive until `STATUS:logged_in` or an equivalent logged-in RQ home state is confirmed.

## Flow

1. Record the login start time:

```sh
rq_login_started_at="$(date +%s)"
```

2. Open/resume RQ login:

```sh
/Users/jasonkuhrt/projects/jasonkuhrt/rq/gov rq open
```

3. If credentials are required, use `$passwords` to fill the Government Authentication Service account. Do not use legacy clicSEQUR credentials.

4. If email 2FA is required, use Mail.app to get the newest matching RQ auth email received after `rq_login_started_at`. Avoid printing the email body or security code in chat or logs.

5. After successful login, clean up RQ auth emails received during the flow:

```sh
/Users/jasonkuhrt/projects/jasonkuhrt/rq/gov rq auth-mail cleanup --since-epoch "$rq_login_started_at"
```

6. For document download tasks, check whether mail indicates a portal download is needed:

```sh
/Users/jasonkuhrt/projects/jasonkuhrt/rq/gov rq documents needs-download --output-dir /Users/jasonkuhrt/me/data/sources/gov-provincial/rq-documents/inbox --mail-client msgvault
```

Use `--refresh-mail` when the decision needs the freshest possible local archive before checking.

7. Continue the requested RQ task through the CLI when needed, for example:

```sh
/Users/jasonkuhrt/projects/jasonkuhrt/rq/gov rq documents download-all --output-dir /Users/jasonkuhrt/me/data/sources/gov-provincial/rq-documents/inbox
```

`download-all` writes PDFs, `manifest.json`, and sibling parsed JSON files. To
re-parse already-downloaded PDFs without touching the portal:

```sh
/Users/jasonkuhrt/projects/jasonkuhrt/rq/gov rq documents parse --input-dir /Users/jasonkuhrt/me/data/sources/gov-provincial/rq-documents/inbox
```

For the `me` repo source-type flow, use:

```sh
bun /Users/jasonkuhrt/me/data/sources/rq-documents/syncer.ts
bun /Users/jasonkuhrt/me/data/sources/rq-documents/parser.ts
```

## Mail Cleanup

Recent RQ auth emails may be deleted after login succeeds. This includes both email 2FA messages and "login from device" / account-connection notices, as long as they were received after the login flow began.

Before deletion, list the matching messages:

```sh
/Users/jasonkuhrt/projects/jasonkuhrt/rq/gov rq auth-mail list --since-epoch "$rq_login_started_at"
```

Only run `gov rq auth-mail cleanup` after the browser is confirmed logged in.

The CLI reports date, sender, and subject only. It does not read or print email bodies. Cleanup moves messages to Mail Trash; it does not permanently delete them.

## Failure Rules

- If the portal shows invalid credentials, stop. Do not retry with guesses.
- If Mail.app is inaccessible, report the blocker and keep the browser state as-is.
- If cleanup finds no matching messages, treat that as fine; login state is authoritative.
- If cleanup fails, do not mark the RQ task failed when the portal login and requested operation succeeded. Report cleanup separately.
