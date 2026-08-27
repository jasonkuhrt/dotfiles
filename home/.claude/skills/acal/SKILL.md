---
name: acal
description: Apple Calendar via the acal CLI and mcp__acal__* tools — the canonical surface for ALL macOS/iCloud Calendar work. Use whenever the user says my calendar, schedule X, what's on my calendar, my events, today/tomorrow/next week, find a slot, am I free, move/reschedule the meeting, delete the event, or which calendars do I have. Covers the three event identities, the bare-YYYY-MM-DD date footgun that shifts events a day earlier, recurrence, TCC permissions, and never reaching for Google Calendar.
---

# acal — Apple Calendar CLI

`acal` is the canonical agent surface for Apple Calendar (read + write). Single signed binary, EventKit-native, JSON-first. Lives in tier-2 of `computer-use.md` (CLI-driveable APIs); also exposed as MCP server (`mcp__acal__*`).

MCP is registered user-scope (`/Users/jasonkuhrt/.claude.json`). The editable working source is `/Users/jasonkuhrt/projects/Helmi/acal-apple-calendar-cli`:

- `origin` is Jason's owned fork: `git@github.com:jasonkuhrt/acal-apple-calendar-cli.git`
- `upstream` is Helmi's project: `git@github.com:Helmi/acal-apple-calendar-cli.git`

Treat `origin` as ours: this is normal source we can edit, test, commit, and install locally. Calendar permission must survive those rebuilds, so install only through the repository's root `justfile` with one persistent certificate-backed code-signing identity. Apple Development and Developer ID Application identities work; a Certificate Assistant self-signed **Code Signing** identity is supported through the guarded `local-untrusted` path without changing global Trust Settings. The recipe fails before replacing the target when no eligible stable identity is available:

```bash
cd /Users/jasonkuhrt/projects/Helmi/acal-apple-calendar-cli
just signing-doctor
just install-local /opt/homebrew/bin/acal
codesign --verify --verbose=2 /opt/homebrew/bin/acal
```

With multiple identities, pass the intended 40-character hash from `signing-doctor` as the second `install-local` argument. A `local-untrusted` identity is eligible only when its status is exactly `CSSMERR_TP_NOT_TRUSTED`, the installer extracts the certificate matching that exact SHA, and an isolated native `codeSign` validity gate passes; every other invalid status is rejected. The recipe then signs offline as `com.jasonkuhrt.acal`, pins the designated requirement to that exact certificate, and runs strict `codesign` verification before replacement. Keep the certificate and private key; recreating either changes the identity. Never weaken global Trust Settings or fall back to `codesign --sign -`: an ad-hoc cdhash identity changes on every build, so macOS cannot retain Calendar TCC authorization. The old brew installation is intentionally absent so it cannot overwrite the fork binary.

## Canonical mapping — what "calendar" means

When Jason says any of the following, the referent is **macOS Calendar (Apple Calendar)** and the tool is **`acal`** (CLI or `mcp__acal__*` MCP):

- "my calendar" / "the calendar" / "calendar"
- "schedule X" / "put X on my calendar" / "what's on my calendar"
- "my events" / "today's events" / "tomorrow" / "this week" / "next Monday"
- "find a slot" / "am I free" / "do I have time" / "when am I free"
- "move the X meeting" / "reschedule" / "delete the event"
- "what calendars do I have" / "which calendar"

Jason is all-in on Apple/iCloud (see memory `user_apple_ecosystem.md`). Never reach for Google Calendar MCP, `gcalcli`, Outlook, Fantastical, or any cross-platform calendar tool unless he explicitly names it. The Anthropic-hosted `claude_ai_Google_Calendar` MCP is the wrong platform — ignore it for calendar work.

## When to use acal

- Anything Apple Calendar read or write: list events, search, create, reschedule, delete, list calendars, recurrence reasoning.
- Prefer over: `osascript`/`macos-automator` (slow, brittle), `peekaboo`/Calendar.app (visual, expensive), `claude_ai_Google_Calendar` (wrong platform — user is Apple-only).
- Prefer MCP form (`mcp__acal__*`) for read-heavy multi-step queries; prefer Bash form (`acal events ...`) when composing with shell pipelines or capturing JSON for downstream tools.

## Output contract

Every command returns a stable JSON envelope:

```json
{ "data": <payload>, "meta": { "command": "...", "schemaVersion": "1.4.0", "timestamp": "..." }, "ok": true }
```

`--format` defaults to `json` for non-TTY (agent), `table` for TTY (human). Don't pass `--format json` defensively from a script — it's already the default.

## Reviewed conditional batches

Treat the installed binary's schema as the runtime contract. Before producing or applying a proposal, require the exact schema and capability your decoder supports; a command name or version string alone is insufficient:

```bash
acal schema --pretty false | jq -e '
  .ok == true and
  .data.schemaVersion == "1.4.0" and
  any(.data.capabilities[];
    .id == "events.conditional-batch.v1" and
    .requires == [] and
    .snapshotVersion == "1.0.0" and
    .digestCanonicalization == "sha256-json-v1-sorted-keys-unescaped-slashes-positive-zero" and
    .grammar.semantics == "snapshot-preconditioned-single-commit-post-observed" and
    .grammar.recurringOperationKinds == []) and
  any(.data.capabilities[];
    .id == "events.conditional-batch.recurring-create.v1" and
    .requires == ["events.conditional-batch.v1"] and
    .grammar.recurringOperationKinds == ["create"] and
    .grammar.recurrenceFields == ["frequency", "interval", "byDay", "byMonthDay", "setPositions"] and
    .grammar.recurrenceOptionalFields == ["until", "count"]) and
  any(.data.capabilities[];
    .id == "events.conditional-batch.recurring-create-exclusions.v1" and
    .requires == ["events.conditional-batch.recurring-create.v1"] and
    .grammar.recurringOperationKinds == ["create"] and
    .grammar.recurrenceFields == ["frequency", "interval", "byDay", "byMonthDay", "setPositions"] and
    .grammar.recurrenceOptionalFields == ["until", "count", "excludedOccurrenceStarts"]) and
  any(.data.capabilities[];
    .id == "events.conditional-batch.recurring-update-all.v1" and
    .requires == ["events.conditional-batch.v1"] and
    .grammar.recurringOperationKinds == ["update"] and
    .grammar.recurrenceFields == [] and
    .grammar.recurrenceOptionalFields == [] and
    .grammar.recurrenceSemantics == "scope=all targets one exact recurring master whose finite exactly expandable daily or single-weekday weekly series is fully contained by the snapshot; desired timing must semantically equal expected timing; the existing structured recurrence rule and complete occurrence anchor set, including exclusions, are preserved; detached or overridden occurrences are rejected")
'
```

Capture the bounded preflight state read-only, then persist only the envelope's `.data` payload. The snapshot digest and native fingerprints are acal-owned opaque values: do not recompute, normalize, or reconstruct them; embed the snapshot unchanged as `expectedSnapshot` in the reviewed request.

```bash
acal events snapshot \
  --from 2026-08-01T00:00:00Z \
  --to 2027-07-01T00:00:00Z \
  --calendar "School" \
  --pretty false \
  | jq '.data' > snapshot.json
```

Freeze the proposal before approval. The base capability allows non-recurring
create/update/delete operations with `scope: "all"`; update/delete must carry
the exact snapshot record in `expected`. The recurring-create extension adds
one operation-level structured `recurrence` object to `create` only. Raw
`rrule`, recurring delete, and occurrence-scoped conditional mutations remain
unsupported.

The recurring-create-exclusions extension creates one recurring EventKit
series with exceptions, not separate events. Add one non-empty
`excludedOccurrenceStarts` array to that same `recurrence` object. Its values
are unique, chronologically sorted, canonical whole-second UTC occurrence
anchors inside the approved snapshot; omit the field when there are no
exclusions. `count` is the number of base-rule occurrences before exclusions,
and the seed occurrence cannot be excluded. Exact exclusions support daily or
single-weekday weekly cadence and fail closed beyond 10,000 base occurrences.

The recurring-update-all extension allows only `scope: "all"` updates against
one exact recurring master. The finite daily or single-weekday weekly series
must be completely contained by the approved snapshot. Timing, recurrence,
occurrence anchors, exclusions, and occurrence-native state are preserved;
only the desired mutable non-timing fields may change. Unbounded or truncated
series, unsupported cadence, timing changes, detached occurrences, and
overridden occurrences fail closed.

Run the frozen file only after Jason approves that exact proposal/ID:

```bash
acal events transact --input reviewed-transaction.json
```

Interpret the typed result precisely:

- `rejected`: no EventKit commit was attempted.
- `committed`: one deferred local EventKit commit returned successfully and a fresh local store observed the requested postconditions. It is **not** an iCloud sync receipt, CAS, external-writer lock, or filesystem durability guarantee.
- `indeterminate`: a commit was attempted but post-observation did not prove the result; `tentativeOperations` is evidence, not verified output.

`rejected` and `indeterminate` are valid `ok:true` protocol results. If the process exits without a result or returns `indeterminate`, capture a fresh snapshot, reconcile observed state, and construct a new attempt with a new transaction ID. Never blindly replay the old request.

## Three event identities — pick the right one

Recurring events expose three IDs. Using the wrong one silently mutates the wrong scope:

| Field | Scope | Use for |
|---|---|---|
| `id` | This single occurrence | Mutate one instance ("move this Thursday's standup") |
| `seriesMasterId` | The whole recurrence series | Mutate every instance ("change the standup time forever") |
| `externalId` | CalDAV/iCloud sync ID | Cross-reference with other systems; not for mutation |

`id == seriesMasterId` for the master record itself. For one-off events, `id == seriesMasterId == externalId` (modulo formatting).

## Date input gotchas — bare `YYYY-MM-DD` shifts events 1 day earlier

**Bare `YYYY-MM-DD` is parsed as UTC midnight, NOT the event's local timezone.** This silently shifts events 1 day earlier in any zone west of UTC. For Toronto (-04:00 EDT / -05:00 EST), an event passed as `--start 2026-08-24` lands on **Aug 23**.

```bash
# WRONG — lands on Aug 23 in Toronto:
acal events create --calendar "Willem" --title "First day" \
  --start 2026-08-24 --end 2026-08-24 --all-day

# WRONG — `--timezone` only sets the event's stored zone field; it does NOT fix bare-date parsing:
acal events create --calendar "Willem" --title "First day" \
  --start 2026-08-24 --end 2026-08-24 --all-day --timezone America/Toronto

# RIGHT — full ISO-8601 with explicit offset:
acal events create --calendar "Willem" --title "First day" \
  --start 2026-08-24T12:00:00-04:00 --end 2026-08-24T12:00:00-04:00 \
  --all-day --timezone America/Toronto
```

**Use noon with the Toronto offset in effect on that date.** Use `-04:00` during EDT and `-05:00` during EST. Noon keeps the instant safely inside the intended local day, while the date-specific offset keeps serialized evidence and review payloads exact.

`--timezone America/Toronto` is still worth passing alongside — it sets the event's stored timezone field so iCloud sync renders it correctly across devices.

**Multi-day all-day spans** are inclusive on `--end`:

```bash
# Winter break Dec 21 through Jan 1, inclusive:
acal events create --calendar "Willem" --title "Winter break" \
  --start 2026-12-21T12:00:00-05:00 --end 2027-01-01T12:00:00-05:00 \
  --all-day --timezone America/Toronto
```

**Allowed input formats** (verified):
- ISO-8601 with explicit offset: `2026-08-24T12:00:00-04:00` ✓
- Bare `YYYY-MM-DD` (with the UTC-midnight caveat above): ✓
- ISO-8601 without offset (e.g. `2026-08-24T12:00:00`): ✗ rejected with `VALIDATION_FAILED: Unsupported date format`

## Default alarm behavior

When `--alarm-minutes` is omitted, acal adds a **default alarm of `-900` minutes (15h before start)**. For an all-day event starting at local midnight, that fires at 9am the previous day. Often useful as a "tomorrow" nudge but can surprise you. Pass `--alarm-minutes 0` (or any value) to override. There's no documented CLI flag to suppress alarms entirely.

## Read/update/delete syntax — flag-based, NOT positional

```bash
acal events get    --id <event-id>      # NOT: acal events get <event-id>
acal events update --id <event-id> --start ...
acal events delete --id <event-id>      # NOT: acal events delete <event-id>
```

Positional `<event-id>` is silently rejected (no JSON, no error) and confuses any downstream JSON parsing.

## TCC permission model — granted at parent process, not at acal

acal does NOT appear in `System Settings → Privacy & Security → Calendars`. macOS attributes Calendar TCC to the **invoking process** (the terminal/agent host), not the binary itself. Agent terminals you'll see there: `cmux.app`, `Codex.app`, `Raycast.app`, etc.

- **To grant full access**: bump the relevant terminal app to "Full Access" via the Options... button.
- **`acal auth grant` cannot upgrade write_only → full_access** on macOS 26 — the system caches the lower tier and won't re-prompt. Manual System Settings change is required.
- **`acal auth status`** reports the effective level for the current process tree.
- Required level for agent work: `full_access`. `write_only` lets you create events but not list/search them.

## Recurrence — structured, not RFC-5545

acal exposes recurrence as a structured object (`frequency`, `interval`, `byDay`, etc.), not as an RRULE string. Reason about cadence directly without parsing.

```json
"recurrence": { "frequency": "weekly", "interval": 1, "byDay": ["mon","wed","fri"] }
```

When creating a recurring event, pass the same structured shape. Don't synthesize RRULE strings. A reviewed whole-series conditional update carries the exact existing recurrence in `expected`; `desired` does not restate or replace it.

## Common operations

```bash
# Read
acal calendars list
acal calendars sources                # fork-only: list EKSources (iCloud, Local, Exchange, ...)
acal events list --from 2026-05-09 --to 2026-05-16
acal events list --from 2026-05-09 --to 2026-05-09 --calendar "Work" --calendar "Anca/Jason"
acal events list --from 2026-05-09T00:00:00-04:00 --to 2026-05-09T23:59:59-04:00 --output-timezone America/Toronto

# Write — see "Date input gotchas" above; ALWAYS use ISO-8601 with explicit offset.
acal calendars create --name "Summer 26" --source iCloud --color "#FFCC00"   # fork-only: create on a specific source
acal events create --calendar "Accounting" --title "Bernard rent" \
  --start 2026-06-02T09:00:00-04:00 --end 2026-06-02T09:15:00-04:00 --timezone America/Toronto
acal events create ... --location "Royal Tyrrell Museum" \                   # fork-only: structured (Maps-clickable) location
  --location-lat=51.4793524 --location-lon=-112.7900615
acal events update --id <event-id> --start 2026-06-02T10:00:00-04:00
acal events delete --id <event-id>

# Diagnostics
acal doctor                # macOS version, EventKit availability, auth level
acal auth status           # current authorization tier
acal schema                # full CLI command contract (use to discover flags before guessing)
```

## Never do these

- Never call AppleScript (`osascript`) or `macos-automator` for Calendar work when acal can do it — acal is faster, returns structured data, and survives Calendar.app being closed.
- Never use bundled `computer-use` to drive Calendar.app — pixel automation for a surface with a real CLI is wasteful and fragile.
- Never mutate a recurring event by `id` when the user means the series — confirm scope first ("this occurrence only" vs "all future occurrences"). For a reviewed whole-series transaction, use the exact master with `scope: "all"` and require the recurring-update-all capability.
- Never assume `acal auth grant` will upgrade an existing TCC tier on macOS 26 — it returns `granted: false` silently. Send the user to System Settings instead.
- Never pass `--format table` from agent code — it's for human terminals; downstream JSON parsing will fail.
- Never re-tap or reinstall acal to "reset" permissions — TCC state is independent of the binary; reinstalling does nothing.
- Never pass bare `YYYY-MM-DD` to `--start`/`--end` for `events create` — silently shifts events 1 day earlier in any zone west of UTC. Always use noon with the date's actual Toronto offset (`-04:00` during EDT, `-05:00` during EST; see "Date input gotchas").
- Never use positional event-ID syntax (`acal events get <id>`, `acal events delete <id>`) — silently rejected. Use `--id <id>`.
- Never assume `--timezone` rescues bare-date parsing — it only sets the stored timezone field, not how `--start`/`--end` are interpreted.
- Never try to auto-geocode an address inside acal (CLGeocoder, MapKit). Apple's geocoding APIs silently time out from a CLI invocation on macOS 26.2+ — they require an entitled host app with Location TCC, which a bare swift binary does not hold. Pass coords explicitly via `--location-lat=<deg> --location-lon=<deg>` (note `=` syntax — negative longitudes start with `-` and ArgumentParser otherwise consumes them as flags). Geocode externally (Nominatim, copy from Maps.app, etc.) and store the result alongside the address text.
