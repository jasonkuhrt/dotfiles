# Tab Presets

A small Chrome extension for saving a window's tabs and pins, then opening that layout in a new window.

## Install

From the dotfiles root:

```sh
just tab-presets-setup
```

Then, once in Chrome:

1. Open `chrome://extensions` and enable **Developer mode**.
2. Choose **Load unpacked**. In the file picker press **⌘⇧G**, paste `~/.local/share/tab-presets/extension`, press Return, then select the folder.
3. Pin **Tab Presets** using Chrome's puzzle-piece Extensions menu.

The setup command creates a stable symlink into this repo. It never edits a Chrome profile or installs automatically. The manifest's fixed public key keeps the extension ID stable if the repository moves. Keep that key when updating.

## Use

- Arrange your tabs and pins, click Tab Presets, enter a name, and **Save**.
- **Open** restores a fresh window with the saved tab order, pins and active tab.
- **Rename** changes a label.
- **Update from this window** replaces a preset's contents after confirmation.
- **Delete** removes a preset after confirmation.

Opening and deleting presets leave existing windows alone. Changes you make while browsing do not automatically change your saved presets. Repeated URLs are retained deliberately; preset names must be unique.

HTTP/HTTPS pages, Chrome New Tab and blank tabs are supported. Other special pages (such as Chrome settings, local files and temporary blob URLs) are skipped with a count when saving. Grouped tabs reopen as ordinary tabs; Chrome's saved groups are not changed. A restore reopens URLs, not page history, scroll position or unsaved form contents.

Presets stay in this Chrome profile's local extension storage. Uninstalling the extension deletes them. There are no accounts, network requests or runtime dependencies. Permissions: `tabs` reads tab URLs and titles; `storage` keeps presets and restore feedback.

If a tab cannot open, the other tabs still restore and the preset stays intact. An **!** badge means there is a report to read in the popup. All saves, edits and restores run in a service worker, so dismissing the popup does not interrupt them. An unreadable saved record is kept on disk and reported without hiding the usable presets.

## Development

The `extension/` directory is ready to load, with no build step. After changing any extension files, run `just tab-presets-update`. This advances the manifest version. On its next normal toolbar opening, the popup compares the on-disk manifest with Chrome's loaded version, waits for any save/restore to finish, and calls Chrome's supported `runtime.reload()` API. The updated worker reopens the popup if its original window is still focused. No Extensions-page visit is needed for these updates. Presets stay in local storage.

The source files must be complete before running the update command. It prepares an update; it does not install a new extension, publish to the Web Store or change permissions. The first Load unpacked remains a separate install action. This self-refresh path is implemented but has not yet been verified live in Chrome.

From the dotfiles root:

```sh
just tab-presets-deps    # install development-only type declarations and TypeScript
just tab-presets-update  # prepare completed changes for automatic refresh on next open
just tab-presets-check   # focused pure capture tests and strict JSDoc typechecking
just tab-presets-icons   # regenerate the four PNG icons
```

The package scripts expose these workflows directly too. No Chrome APIs are mocked in tests.

Manual smoke check after loading: save a disposable window with two pinned tabs, two normal tabs and the last tab active. Open the preset and check exact order, pins and active tab. Then rename, update after changing that disposable window, delete, and reopen the popup to check persistence. Also dismiss the popup during an Open operation: the worker should finish the restore.

Implementation: `presets.js` defines and validates the stored model; `popup.js` presents the controls; `worker.js` handles mutations and restoration using the native Chrome APIs. Web Locks serializes commands so concurrent saves cannot create duplicate names.

Update evidence: Chrome documents [self-reload and the unpacked update event](https://developer.chrome.com/docs/extensions/reference/api/runtime#method-reload), and [opening the popup from extension code](https://developer.chrome.com/docs/extensions/reference/api/action#method-openPopup). For initial installation, [external-install JSON on macOS](https://developer.chrome.com/docs/extensions/how-to/distribute/install-extensions) supports Web Store-hosted extensions and still requires user enablement; it does not load this local unpacked folder.

Delivery status: code reviewed, icons generated, setup prepared. Local tests, typechecking and a Chrome smoke test have not been run; the saved preference requires explicit approval for those checks.
