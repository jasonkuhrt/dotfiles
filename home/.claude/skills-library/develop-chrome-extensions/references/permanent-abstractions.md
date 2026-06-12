# Permanent Library Abstractions

When a Chrome/platform lesson is reusable, move it into the Chrome extension library or devtool framework. Do not leave it as a comment, checklist, or one-off command if typed code can prevent rediscovery.

## Heartbeat Library Surface

Before adding new one-off logic, inspect:

- `tools/dev/chrome-extension/source-paths.ts`
- `tools/dev/chrome-extension/native-messaging-manifest.ts`
- `tools/dev/chrome-extension/native-host-framing.ts`
- `tools/dev/chrome-extension/protocol.ts`
- `tools/dev/chrome-extension/diagnose.ts`
- `tools/dev/chrome-extension/install-state.ts`

If the lesson is not represented there, prefer extending those modules or adding a sibling module with the same style.

## Abstraction Bias

Prefer these outcomes, in order:

1. A typed pure function with tests.
2. A schema-defined protocol or diagnostic.
3. An Effect service boundary with fakeable tests.
4. A generator that produces inspectable artifacts.
5. A doctor check that names the violated contract.
6. Documentation only when code cannot enforce the rule.

## Good Library Targets

Extract or centralize:

- Chrome profile/user-data-dir resolution.
- Browser/channel-specific native-host manifest locations.
- Extension id derivation from manifest key.
- Native-host manifest generation and validation.
- Launcher rendering and validation.
- Length-prefixed native messaging framing.
- MV3 reconnect state machines.
- Popup-to-service-worker request helpers.
- Storage schema versioning/migration.
- Diagnostic data model and renderers.

## Type Safety Standard

Make illegal states unrepresentable when the boundary is under repo control.

Examples:

```ts
class NativeHostName extends Schema.TaggedClass<NativeHostName>()(
  'NativeHostName',
  { value: Schema.String },
) {}

class ChromeExtensionOrigin extends Schema.TaggedClass<ChromeExtensionOrigin>()(
  'ChromeExtensionOrigin',
  { value: Schema.TemplateLiteral('chrome-extension://', Schema.String, '/') },
) {}
```

Use typed constructors for values that have Chrome-specific grammar:

- extension id
- extension origin
- native host name
- browser channel
- profile directory
- user-data directory
- native host manifest path

## Effect Boundary Standard

Use Effect services for runtime capabilities:

- `ChromeProfiles`
- `ChromeExtensionInstall`
- `NativeHostManifest`
- `NativeHostSocket`
- `ExtensionStorage`
- `ChromeRuntime`

Tests should fake these services rather than monkeypatch modules or shelling out.

## Diagnostic Standard

Every recurring live failure should become a diagnostic check. The diagnostic should include:

- check name
- severity
- exact source/artifact path
- observed value
- expected value
- repair command

If the fix requires human Chrome UI action, say exactly which UI action and why no code path can do it safely.
