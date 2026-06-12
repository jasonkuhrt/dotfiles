# Diagnostics And Verification

## Doctor Command Standard

A doctor command should distinguish:

- build/install state
- loaded Chrome profile state
- generated manifest/launcher correctness
- native-host runtime readiness
- service-worker/native-host protocol health

It should print exact checked paths.

## Artifact Inspection

Before live browser probing:

```sh
pnpm dev chrome-extension doctor
pnpm dev chrome-extension path
cat "$HOME/Library/Application Support/Google/Chrome/NativeMessagingHosts/<host>.json"
grep -n "REPO_ROOT\|NODE_BIN\|DEV_HOME" "$HOME/.local/state/heartbeat/dev/native-host.sh"
find "$(pnpm dev chrome-extension path)" -maxdepth 2 -type f | sort
```

## Verification Ladder

1. Unit-test pure path and manifest generation.
2. Typecheck/lint modified source.
3. Rebuild generated extension and launcher.
4. Inspect generated artifacts.
5. Run doctor without deep wake.
6. Run one deep native-host check.
7. Use Chrome UI/browser automation only for the remaining unproven browser contract.

## Root Cause Examples

Good:

`Because Chrome starts the native host from the manifest path, a launcher whose REPO_ROOT points one directory above the repo cannot start the source host; therefore no socket or host log appears.`

Bad:

`Chrome is flaky; try opening the popup again.`

Good:

`Because MV3 workers are disposable, reconnect timers stored only in worker memory are not a durable recovery path; therefore the next popup message must re-attempt connection before handling state.`

Bad:

`The service worker probably did not wake.`
