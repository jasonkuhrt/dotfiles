---
name: passwords
description: Use when Codex needs the user's secrets, Apple Passwords.app, or macOS Keychain for credential reads/writes without exposing secrets. Prefer the `security` CLI credential cache first for recurring agent logins, falling back to Passwords.app only on cache miss or verification/update. Triggers include "$passwords", "$secrets", "secrets skill", "use Passwords", "open my pw app", "copy password from Passwords", "save/update this password", "use my security cli", "unlock Passwords", or any login/workflow where credentials live in Apple Passwords.
---

# Passwords

## Core Contract

Use this skill to bridge from the user's local Passwords.app or macOS Keychain into the current task while keeping secrets out of chat, tool output, repo files, and shell history.

Passwords.app is the source of truth for credential management. The macOS Keychain `security` CLI cache is the first read path for recurring agent-operated logins because it is cheaper, faster, and less focus-stealing than Passwords.app. Passwords.app remains the fallback for cache misses, cache repair, and explicit credential create/update/delete requests.

Reads include finding usernames/passwords and copying them into an approved destination. Writes include creating, updating, or deleting a saved Passwords.app credential, but only when the user explicitly asks for that mutation. Never create, update, or delete a Passwords.app item as an inferred side effect of a login. Writing or updating an `agent-credential:<service>` Keychain cache entry is allowed only as an explicit cache/refill step from a selected Passwords.app entry or from another user-approved secret source.

Keep the surfaces separate:

- For website navigation and form interaction, use the browser surface required by the active task and current user/browser policy. In this Codex setup, that usually means `[@Chrome](plugin://chrome@openai-bundled)` unless the user has approved a different browser path.
- Use Computer Use only for the local Passwords.app UI, including approved credential creation or update flows.
- Use `/usr/bin/security` for the documented local macOS Keychain items only: the Passwords.app unlock item and `agent-credential:<service>` runtime cache items.
- Do not use Browser/browser-use, dev-browser, raw CDP, or `apw` as a fallback unless the user explicitly approves that exact fallback.
- AppleScript/System Events is allowed only for the documented Passwords.app unlock fallback below. Do not use it for general credential scraping, Passwords.app reads, browser login, or site automation.

## Known Local Setup

The user has a macOS Keychain generic-password item for unlocking Passwords.app:

```sh
security find-generic-password -s "mac-login-password" -a "$USER" -w
```

The item was created with a hidden local prompt and label like `Mac login (for agent unlock)`. Use it only to unlock Passwords.app when the user has asked for Passwords-based login help.

`apw` is intentionally uninstalled on this machine. It was tested on 2026-05-09 and found broken: `apw pw list <domain>` returned status 9 / missing encryption key, and `apw auth` hung instead of completing. Do not suggest or reinstall `apw`; use `security` plus Passwords.app UI copy actions.

## Credential Cache

For recurring agent-operated logins, always use the narrow macOS Keychain cache before opening Passwords.app.

Service naming:

```text
agent-credential:<service>
```

Examples:

```text
agent-credential:kijiji
agent-credential:craigslist
```

Cache lookup order:

1. Check the Keychain cache with:

```sh
~/.codex/skills/passwords/scripts/credential-cache-status.sh <service>
```

2. If found, copy only the password to the clipboard with:

```sh
~/.codex/skills/passwords/scripts/credential-cache-copy-password.sh <service>
```

The status helper may print the username, but the copy helper must never print the password.

3. If missing, fall back to Passwords.app. After selecting the correct Passwords.app entry, port it into the Keychain cache:

```sh
~/.codex/skills/passwords/scripts/credential-cache-save-selected-passwords-entry.sh <service>
```

This reads the selected Passwords.app entry by menu actions, stores the username as the Keychain account and the password as the Keychain secret, and clears the clipboard. It does not print the password.

Passwords.app remains the source of truth. The Keychain cache is an agent runtime cache for speed and repeatability. If a cached login fails, do not guess or retry with variants; fall back to Passwords.app to verify/update the cache, then retry once from the refreshed cache if the task still requires login.

## Unlock Passwords.app

1. Copy the unlock secret to the clipboard without printing it:

```sh
security find-generic-password -s "mac-login-password" -a "$USER" -w | pbcopy
```

2. Open or focus Passwords.app with Computer Use.
3. Paste into the locked Passwords.app password field with `super+v`.
4. Press Return if needed.
5. Clear the clipboard immediately:

```sh
printf '' | pbcopy
```

If Computer Use refuses to paste because focus has moved through `com.apple.LocalAuthenticationRemoteService`, use the local Accessibility fallback instead of stopping. This is the approved narrow fallback for the already-focused Passwords.app unlock field:

```sh
~/.codex/skills/passwords/scripts/unlock-passwords-app.sh
```

The helper:

- fetches only the `mac-login-password` Keychain item the user created for agent unlock;
- copies it to the clipboard without printing it;
- activates Passwords.app;
- focuses the unlock field, types the clipboard value through System Events, and sends Return;
- clears the clipboard on exit.

Do not replace this with a plain Command-V paste. On 2026-05-09, Passwords.app accepted the pasted value visually but did not submit/unlock through simulated Return, `AXConfirm`, or lower-level `CGEvent` Return. Typing the clipboard value as System Events keystrokes with a short delay before Return did unlock successfully.

If the fallback fails, clear the clipboard and report the exact failure. Do not reveal or inspect the secret.

## Copy A Credential

After Passwords.app is unlocked:

1. Search for the site, app, service, or account in Passwords.app.
2. Select the intended entry.
3. Prefer Passwords.app menu actions over exposing fields:
   - `Edit -> Copy User Name`
   - `Edit -> Copy Password`
4. Do not read clipboard contents back into the model.
5. Paste clipboard contents directly into the destination UI.
6. Clear the clipboard after each secret paste.

Do not silently "fix" or guess usernames. Use what Passwords.app provides unless the user explicitly corrects it.

## Write A Credential

Use Passwords.app writes only for explicit credential-management requests, such as "save this password", "update this login", "create an entry for this site", or "delete the stale entry".

1. Open and unlock Passwords.app.
2. Search first, so an update does not accidentally become a duplicate.
3. For create/update/delete, state the non-secret target fields you are about to change: title, username, website/app, and whether this is create/update/delete.
4. Use Passwords.app UI controls for the mutation.
5. Do not print or reveal the secret value.
6. Leave the item selected and report the non-secret result.

If a write would replace an existing password, ask for direct confirmation unless the user already gave an explicit update instruction for that exact entry in the current turn.

## Browser Login Flow

1. Connect through the task's approved browser surface.
2. Reuse or claim the existing login tab/window when present.
3. Accept normal privacy/cookie consent when it blocks the form.
4. Check `agent-credential:<service>` with the credential cache status helper.
5. If cached, use the cached username and copy the cached password with the copy helper. Paste the password directly into the destination field and clear the clipboard.
6. If missing, open Passwords.app, select the correct entry, save it into the cache with the save-selected helper, then use the cache for the login.
7. Submit only when the user has clearly asked to log in.
8. Stop on MFA, CAPTCHA, identity proofing, or invalid-login errors and report the exact visible state.

If the site rejects the login, do not retry with guesses. Government and financial portals can lock accounts after repeated failures.

## Hygiene

- Never print, summarize, transform, or store secrets.
- Never save secrets into `.env`, shell history, markdown, memory, logs, or generated files.
- Never paste a password into chat.
- Clear the clipboard after any secret transfer.
- If a destructive Passwords.app dialog appears, cancel it immediately and state what happened.
