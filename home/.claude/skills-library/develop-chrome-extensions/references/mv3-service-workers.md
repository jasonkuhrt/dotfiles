# Manifest V3 Service Workers

## Platform Shape

MV3 background logic runs in a service worker. It is event-driven and disposable. In-memory values, timers, ports, and queues are not durable.

## Listener Registration

Register Chrome event listeners at module top level:

```ts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  void handle(message, sender, sendResponse);
  return true;
});
```

Do not register listeners after awaited work or inside delayed callbacks unless official docs/source prove that event still wakes the worker.

## Reconnect Pattern

For resources like native-host ports:

- Connect at top-level startup for fast path.
- Reconnect on every event that needs the resource.
- Deduplicate pending reconnect timers.
- Drain pending callbacks on disconnect with explicit failures.
- Persist durable state in `chrome.storage`, not module variables.

Example shape:

```ts
function ensureNativeHostConnected(): void {
  if (currentPort() !== undefined) return;
  connectToHost();
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  ensureNativeHostConnected();
  void respond(message, sendResponse);
  return true;
});
```

## Storage

Use `chrome.storage.local` for durable extension state. Use in-memory state only as a cache for the current worker lifetime.

For devtool extensions, schema-decode storage on read and clear or migrate explicitly on version mismatch.

## Wakeups

A popup page load can send a message to the service worker, and `runtime.sendMessage` fires `runtime.onMessage` in extension contexts other than the sender. The worker must do useful wake work inside that event path, not only in top-level startup.
