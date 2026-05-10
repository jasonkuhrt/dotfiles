# acal — Apple Calendar CLI

`acal` is the canonical agent surface for Apple Calendar (read + write). Single signed binary, EventKit-native, JSON-first. Lives in tier-2 of `computer-use.md` (CLI-driveable APIs); also exposed as MCP server (`mcp__acal__*`).

Source: https://github.com/Helmi/acal-apple-calendar-cli — installed via `brew install helmi/tap/acal`. MCP registered user-scope (`/Users/jasonkuhrt/.claude.json`).

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
{ "data": <payload>, "meta": { "command": "...", "schemaVersion": "1.0.0", "timestamp": "..." }, "ok": true }
```

`--format` defaults to `json` for non-TTY (agent), `table` for TTY (human). Don't pass `--format json` defensively from a script — it's already the default.

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

**The `T12:00:00-04:00` (noon-EDT) trick is DST-safe across the year.** Even when the date falls in EST (winter, UTC-05:00), passing `-04:00` lands at 11am local — still well within the day boundary. Hardcode `-04:00` for every Toronto event regardless of season; skip DST-aware date math.

`--timezone America/Toronto` is still worth passing alongside — it sets the event's stored timezone field so iCloud sync renders it correctly across devices.

**Multi-day all-day spans** are inclusive on `--end`:

```bash
# Winter break Dec 21 through Jan 1, inclusive:
acal events create --calendar "Willem" --title "Winter break" \
  --start 2026-12-21T12:00:00-04:00 --end 2027-01-01T12:00:00-04:00 \
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

When creating/updating a recurring event, pass the same structured shape. Don't synthesize RRULE strings.

## Common operations

```bash
# Read
acal calendars list
acal events list --from 2026-05-09 --to 2026-05-16
acal events list --from 2026-05-09 --to 2026-05-09 --calendar "Work" --calendar "Anca/Jason"
acal events list --from 2026-05-09T00:00:00-04:00 --to 2026-05-09T23:59:59-04:00 --output-timezone America/Toronto

# Write — see "Date input gotchas" above; ALWAYS use ISO-8601 with explicit offset.
acal events create --calendar "Accounting" --title "Bernard rent" \
  --start 2026-06-02T09:00:00-04:00 --end 2026-06-02T09:15:00-04:00 --timezone America/Toronto
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
- Never mutate a recurring event by `id` when the user means the series — confirm scope first ("this occurrence only" vs "all future occurrences").
- Never assume `acal auth grant` will upgrade an existing TCC tier on macOS 26 — it returns `granted: false` silently. Send the user to System Settings instead.
- Never pass `--format table` from agent code — it's for human terminals; downstream JSON parsing will fail.
- Never re-tap or reinstall acal to "reset" permissions — TCC state is independent of the binary; reinstalling does nothing.
- Never pass bare `YYYY-MM-DD` to `--start`/`--end` for `events create` — silently shifts events 1 day earlier in any zone west of UTC. Always use `T12:00:00-04:00` ISO form (see "Date input gotchas").
- Never use positional event-ID syntax (`acal events get <id>`, `acal events delete <id>`) — silently rejected. Use `--id <id>`.
- Never assume `--timezone` rescues bare-date parsing — it only sets the stored timezone field, not how `--start`/`--end` are interpreted.
