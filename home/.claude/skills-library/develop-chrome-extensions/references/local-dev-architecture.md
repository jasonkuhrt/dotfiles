# Privileged Local-Dev Architecture

This skill is for local developer extensions, not marketplace extensions.

## Assumptions

- The extension is source-controlled with the devtool.
- The operator trusts the repo and machine-local helper.
- Native host access is acceptable when explicit and inspectable.
- UX optimizes developer speed, diagnostics, and recovery over public distribution constraints.
- Install/reload can be a repo command, not a public onboarding funnel.

## Boundary Model

Keep these boundaries explicit:

- Browser extension: Chrome APIs, tabs, groups, windows, storage, popup UI, service worker.
- Native host: filesystem, process, sockets, local workspace discovery, privileged machine IO.
- CLI/devtool: generated config, host manifest install, launcher generation, diagnostics, user commands.
- Shared protocol: schema-checked messages and responses crossing each boundary.

## Design Rules

- Keep Chrome API usage in extension-side services.
- Keep Node/machine IO in the native host or CLI, never in browser-bundled modules.
- Treat protocol messages as the only coupling between CLI, host, and extension.
- Make install artifacts reproducible from source.
- Make every generated path inspectable by a doctor command.
- Do not hide privileged operations behind vague "open" or "wake" language; name the host/profile/manifest/socket path.

## UX For Local Tools

Prefer explicit repair commands:

```sh
pnpm dev chrome-extension install
pnpm dev chrome-extension doctor
pnpm dev chrome-extension doctor --deep
pnpm dev chrome-extension logs
pnpm dev chrome-extension logs --sw
```

The tool should explain which artifact failed and which source command regenerates it.
