# TypeScript And Effect Patterns

Use TypeScript schemas and Effect boundaries where the extension crosses runtime or privilege boundaries.

## Protocol

Use schema-defined request/response messages across:

- CLI to native host
- native host to service worker
- popup to service worker
- service worker to native host

Prefer tagged schema classes or schema-tagged unions for domain values. Keep protocol codecs centralized.

Example:

```ts
export const OpenRequest = Schema.Struct({
  type: Schema.Literal('open'),
  namespace: Schema.String,
  targets: Schema.Array(Target),
});

export const Request = Schema.Union(OpenRequest, GetStateRequest);
export const Response = S.Result(Schema.Unknown, Schema.String);
```

## Services

Use service boundaries for runtime capabilities:

- Chrome tabs/windows/tabGroups/storage/runtime APIs
- filesystem
- process table
- command execution
- native-host socket client
- current process/cwd/env

Do not use module-level mocking for these. Tests should provide fake services.

## Browser Bundle Hygiene

Keep Node imports out of browser-bundled extension code:

- no `node:fs`
- no `node:path`
- no `node:process`
- no CLI-only constants that import Node

Split constants into browser-safe and Node-only modules when needed.

## Diagnostics As Data

Represent diagnostics as typed data:

```ts
interface Diagnostic {
  readonly severity: 'error' | 'warning' | 'info';
  readonly check: string;
  readonly problem: string;
  readonly fix: string;
}
```

Render diagnostics at the CLI edge. Test diagnostic producers as pure functions when possible.
