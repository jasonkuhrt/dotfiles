# Keychain TOTP Recipe

## When to use

When automating login to a site that uses TOTP (authenticator app) 2FA and the credentials are in the macOS Passwords app (iCloud Keychain).

## Prerequisites

- The human must provide the TOTP Setup URL. This is found by:
  1. Opening the Passwords app
  2. Searching for the site
  3. Clicking **Edit**
  4. Clicking **Copy Setup URL** next to the Code field
  5. The URL looks like: `otpauth://totp?secret=XXXXX&algorithm=SHA1&digits=6&period=30`

- The TOTP secret is in the `secret` parameter of that URL, NOT the "Recovery Setup Key" shown in the Passwords app. The Recovery Setup Key is a different thing entirely and will generate wrong codes.

- `oath-toolkit` must be installed (`brew install oath-toolkit`) — provides `oathtool`.

## Two keychain entries

Store two separate entries:

### 1. Password (internet password)

```bash
security add-internet-password -s "<domain>" -a "<username>" -w "<password>" -l "<label>"
```

Retrieve:
```bash
security find-internet-password -s "<domain>" -w
```

### 2. TOTP secret (generic password)

```bash
security add-generic-password -s "<domain>-totp" -a "<username>" -w "<TOTP_SECRET>" -l "<label> TOTP"
```

Retrieve and generate code:
```bash
TOTP_SECRET=$(security find-generic-password -s "<domain>-totp" -w)
oathtool --totp -b "$TOTP_SECRET"
```

## Example: Rippling

```bash
# Password
security add-internet-password -s "app.rippling.com" -a "jasonkuhrt@me.com" -w "<password>" -l "Rippling"

# TOTP (secret from Setup URL, NOT Recovery Setup Key)
security add-generic-password -s "app.rippling.com-totp" -a "jasonkuhrt@me.com" -w "2IZMBFKBFCXPS5C5" -l "Rippling TOTP"

# Generate code at login time
oathtool --totp -b "$(security find-generic-password -s 'app.rippling.com-totp' -w)"
```

## TOTP codes

TOTP codes rotate every 30 seconds. Generate the code as close to submission as possible. A code generated 20+ seconds ago may be expired by the time it's submitted. If a code fails, regenerate and retry immediately — it's likely a timing issue, not a wrong secret.

TOTP is deterministic: at any given 30-second window, there is exactly one valid code for a given secret. The Passwords app and `oathtool` will produce identical codes when their clocks agree.

## Never do these

- Never use the "Recovery Setup Key" as the TOTP secret — it's for account recovery, not code generation
- Never store TOTP secrets in plain text files — use keychain
- Never hardcode TOTP secrets in scripts — read from keychain at runtime
- Never assume a TOTP code is reusable — generate fresh for each login attempt
