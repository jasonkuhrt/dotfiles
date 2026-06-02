# Browser Native Host Prototype

Minimal extension/native-host prototype for testing this primitive:

```text
current signed-in browser profile -> extension -> local Bun host -> CLI
```

This deliberately avoids default-profile CDP. The extension runs in the current Chrome profile, connects to a local host over `127.0.0.1`, and the CLI forwards typed commands through that host.

This is an extension/native-host-shaped prototype using a localhost WebSocket host. It is enough to test the extraction sidecar shape. The hardened form would use Chrome's formal native messaging protocol.

## What This Helper Tests

This is not the primary click/input primitive for the current CLIs.

After checking the actual CLI source, TD, Parks, Rippling, and Classifieds need capabilities that extension-mediated DOM events do not cover: trusted pointer input, current-profile auth, browser/download brokers, and file upload. The primary current-profile lane should be native browser/app control.

This prototype is still useful as the smallest helper for page-local extraction:

- It uses the current signed-in browser profile.
- It does not attach to Chrome through CDP.
- It can expose a typed local SDK/CLI.
- It can read page state for native input targeting.
- It can run structured DOM/PDF/fetch extraction after navigation/auth is handled elsewhere.

## Install

Start the local host:

```sh
just browser-probe-serve
```

Load the extension:

1. Open `chrome://extensions/`.
2. Enable Developer mode.
3. Load unpacked extension from:

```text
/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/research/browser-native-host-prototype/extension
```

Check connection:

```sh
just browser-probe-status
```

## Commands

Snapshot active tab:

```sh
just browser-probe-snapshot
```

Locate an element and return an estimated desktop point:

```sh
just browser-probe-locate 'button[type="submit"]'
```

Click an element with native OS input:

```sh
just browser-probe-native-click 'button[type="submit"]'
```

Navigate active tab:

```sh
bun research/browser-native-host-prototype/host/agent-browser-host.ts navigate https://example.com
```

Click a selector:

```sh
bun research/browser-native-host-prototype/host/agent-browser-host.ts click 'button[type="submit"]'
```

Fill a selector:

```sh
bun research/browser-native-host-prototype/host/agent-browser-host.ts fill 'input[name="q"]' 'hello'
```

## What This Prototype Can Prove

It can prove:

- a CLI can communicate with the current browser profile without CDP;
- the extension can inspect a normal page;
- the extension can provide page snapshots and simple DOM actions;
- the command surface can be made typed and local;
- the extraction helper can be placed behind `browserctl`.

## Concrete Tradeoffs

Better than default-profile CDP:

- Uses the current signed-in profile.
- Does not require `chrome://inspect` remote debugging.
- Does not use `/json/version` or `/json/list`.
- Does not create a CDP-attached tab.

Worse than a true agent-native browser:

- Still an extension bolted onto a normal browser.
- Content-script and `chrome.scripting` access is limited by Chrome extension rules.
- Browser UI, file pickers, passkeys, and OS dialogs need another lane.
- Actions here dispatch DOM events, not physical input.

What this unlocks:

- `browserctl` can use this as `live-profile-extension` for snapshots and extraction.
- Native current-profile control can use extension snapshots to compute target rectangles.
- `browserctl` can use `native-click` as the first native-current-profile action.
- The TypeScript SDK can wrap these commands behind Playwright-like read/extract methods.

What this does not replace:

- Native click/type for flows that need trusted pointer input.
- Browser/download brokers.
- File upload and file chooser handling.
- Passkeys and OS dialogs.

## What This Prototype Cannot Prove

It cannot prove:

- every site will accept extension-mediated interaction;
- content scripts can access restricted pages such as `chrome://`, extension pages, or browser UI;
- page scripts cannot detect extension effects;
- native input is unnecessary;
- passkeys, downloads, file pickers, and OS dialogs are solved.

For TD, Parks, Rippling, and Classifieds, native browser/app control is the main primitive to implement; this extension remains the extraction and snapshot sidecar.
