# Native Messaging

## Chrome Contract

- The extension must declare `nativeMessaging`.
- `chrome.runtime.connectNative(name)` creates a long-lived `Port`.
- Chrome starts the native host process when the native port is created.
- Chrome keeps the host running until the port is destroyed.
- `chrome.runtime.sendNativeMessage(name, message)` starts a host process per message.
- Chrome and host communicate over stdio using 32-bit length-prefixed UTF-8 JSON.
- On macOS/Linux, host manifest `path` must be absolute.
- `allowed_origins` must include the exact extension origin.

## Host Manifest

The generated host manifest should be deterministic and inspectable:

```json
{
  "name": "com.example.dev_tool",
  "description": "Example devtool native host",
  "path": "/absolute/path/to/native-host.sh",
  "type": "stdio",
  "allowed_origins": ["chrome-extension://<id>/"]
}
```

## Launcher Script

A launcher should bake exact paths:

- repo root
- Node binary
- dev home/state dir
- native host source or built entrypoint

Chrome starts launchers with a minimal environment. Do not depend on shell PATH, pnpm shims, or cwd.

## Host Process Design

For high-trust local devtools, it is fine for the native host to expose local capabilities, but keep them protocol-shaped:

- `host.echo`
- `host.checkPath`
- `host.listWorktrees`
- `host.swLog`

Decode all messages. Return schema-shaped success/failure. Log host startup, socket bind, Chrome messages, CLI messages, and shutdown.

## Symptom Mapping

Do not stop at "socket missing".

| Symptom | Contract To Check |
| --- | --- |
| No socket, no host log | Did the service worker call `connectNative`? Did Chrome find the host manifest? |
| Host log starts then exits | Launcher/runtime/source path or stdio protocol failure. |
| Chrome says host not found | Manifest directory/name/channel mismatch. |
| Chrome says forbidden | `allowed_origins`/extension id mismatch. |
| Host replies malformed | Framing or schema encoding mismatch. |
