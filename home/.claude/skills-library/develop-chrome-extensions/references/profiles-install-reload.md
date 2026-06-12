# Profiles, Install, Reload

## User Data Directory

Chrome profile data lives inside the user-data directory. On macOS stable Chrome, the default user-data directory is:

```text
~/Library/Application Support/Google/Chrome
```

Profiles are subdirectories such as `Default` or `Profile 3`. `chrome://version` shows the active profile path.

## Native Host Manifest Directories

On macOS:

| Browser | User-Level NativeMessagingHosts |
| --- | --- |
| Google Chrome | `~/Library/Application Support/Google/Chrome/NativeMessagingHosts` |
| Chrome for Testing | `~/Library/Application Support/Google/ChromeForTesting/NativeMessagingHosts` |
| Chromium | `~/Library/Application Support/Chromium/NativeMessagingHosts` |

Do not assume a manifest installed for stable Chrome applies to Chrome for Testing or Chromium.

## Loaded Extension State

For local diagnostics, read Chrome preferences as evidence, not as an API:

```sh
node - <<'NODE'
const fs = require('fs');
const path = require('path');
const profile = path.join(process.env.HOME, 'Library/Application Support/Google/Chrome/Default');
for (const file of ['Preferences', 'Secure Preferences']) {
  const full = path.join(profile, file);
  if (!fs.existsSync(full)) continue;
  const json = JSON.parse(fs.readFileSync(full, 'utf8'));
  console.log(file, Object.keys(json.extensions?.settings ?? {}));
}
NODE
```

Useful fields include:

- extension id
- extension path
- active permissions
- state/disable reasons
- `has_started_service_worker`
- `serviceworkerevents`

These fields are diagnostic evidence, not a stable public API. Prefer a repo `doctor` command that wraps them.

## Reload Model

For unpacked local dev extensions:

- Rebuild extension assets from source.
- Reinstall/update generated native-host manifest and launcher when those sources change.
- Reload the unpacked extension in Chrome when service worker or manifest changed.
- Restart Chrome only when testing Chrome startup/profile/manifest discovery behavior.

Do not conflate rebuild, reinstall, reload, and restart.
