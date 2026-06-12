---
name: develop-chrome-extensions
description: Source-first workflow for building, debugging, reviewing, or modifying privileged high-trust local development Chrome extensions, especially Manifest V3 service workers, native messaging hosts, extension popup/options pages, browser profiles, Chrome launch behavior, TypeScript/Effect extension architecture, or extension install/reload flows. Use when work touches chrome-extension:// URLs, manifest.json, chrome.runtime/chrome.* APIs, nativeMessaging, service workers, extension storage, profile/native-host diagnostics, or local devtool browser integrations.
---

# Develop Chrome Extensions

Build Chrome extensions as local privileged developer tools: high trust, machine-local, source-controlled, TypeScript-first, and Effect-friendly where runtime boundaries matter. Do not optimize for Chrome Web Store distribution unless the user explicitly asks.

In Heartbeat, first look for reusable primitives under `tools/dev/chrome-extension` before writing bespoke code. Current permanent surfaces include:

- `source-paths.ts` for repo/extension/template/tsconfig path derivation.
- `native-messaging-manifest.ts` for typed native-host manifest, origin, browser, and manifest-directory construction.
- `native-host-framing.ts` for native messaging frame encode/decode.
- `protocol.ts` for extension/native-host/CLI request-response schemas.
- `diagnose.ts` and `install-state.ts` for doctor/install-state diagnostics.

## Topic Dispatch

| Topic | Read | Use For |
| --- | --- | --- |
| Source-first investigation loop | [references/source-first-workflow.md](references/source-first-workflow.md) | Any bug, unclear platform behavior, failed live check, or proposed architecture change. |
| Privileged local-dev architecture | [references/local-dev-architecture.md](references/local-dev-architecture.md) | Designing extension boundaries, trust model, host/extension split, and devtool UX. |
| Manifest V3 service workers | [references/mv3-service-workers.md](references/mv3-service-workers.md) | Worker lifecycle, wake events, listener registration, reconnect behavior, storage, and ports. |
| Native messaging | [references/native-messaging.md](references/native-messaging.md) | Host manifest generation, launcher scripts, stdio framing, sockets, host lifecycle, and `connectNative`. |
| Profiles, install, reload | [references/profiles-install-reload.md](references/profiles-install-reload.md) | Chrome user-data dirs, loaded extension state, unpacked installs, manifest keys, and reload/rebuild flows. |
| TypeScript and Effect patterns | [references/typescript-effect.md](references/typescript-effect.md) | Schema classes, protocol typing, service boundaries, diagnostics, tests, and avoiding ambient IO. |
| Permanent library abstractions | [references/permanent-abstractions.md](references/permanent-abstractions.md) | Extending `tools/dev/chrome-extension` so platform learnings become reusable typed code. |
| Diagnostics and verification | [references/diagnostics-verification.md](references/diagnostics-verification.md) | Doctor commands, artifact inspection, root-cause framing, and deterministic verification ladders. |

## Mandatory Posture

1. Read the topic reference before editing or proposing.
2. Establish the Chrome/platform contract from local source plus official docs or Chromium source.
3. Inspect generated artifacts before live browser probing.
4. Treat missing sockets, stale tabs, and failed wakeups as symptoms, not root causes.
5. Prefer a permanent typed abstraction or diagnostic when a platform rule is reusable.
6. Verify with deterministic tests and generated artifact inspection before a live Chrome check.

If Chrome plugin policy blocks inspection of extension pages, stop using that route. Use source, generated artifacts, Chrome preference files, official docs, and Chromium source.

## Appendix: Primary Links

- Chrome native messaging: https://developer.chrome.com/docs/extensions/develop/concepts/native-messaging
- Chrome runtime API: https://developer.chrome.com/docs/extensions/reference/api/runtime
- MV3 service worker migration: https://developer.chrome.com/docs/extensions/develop/migrate/to-service-workers
- Chrome extension service worker lifecycle: https://developer.chrome.com/docs/extensions/develop/concepts/service-workers/lifecycle
- Chromium user data directory: https://chromium.googlesource.com/chromium/src/+/HEAD/docs/user_data_dir.md
