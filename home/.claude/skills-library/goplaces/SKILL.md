---
name: goplaces
description: Use Google Places and Routes through the installed `goplaces` CLI for driving directions, traffic-aware travel times, distances, route comparisons, place resolution, nearby search, and place details. Trigger for route, mileage, ETA, directions, travel-time, or location-research requests where a real routing provider is better than estimating manually or navigating a maps website.
---

# goplaces

Use Peter Steinberger's `goplaces` CLI as the direct Google Places and Routes surface.

## Command contract

- Call `~/.local/bin/goplaces`. This wrapper loads its API key from macOS Keychain and then runs the Homebrew binary.
- Call `~/.local/bin/groute` when the result also needs a ready-to-open Google Maps directions URL or Markdown link.
- Prefer `--json`; Peter documents it as the stable automation and agent contract.
- Inspect `~/.local/bin/goplaces <command> --help` before forming an unfamiliar command.
- Never read, print, pass on the command line, or persist the API key.
- Do not call `/opt/homebrew/bin/goplaces` directly; that bypasses Keychain injection.

Canonical documentation index: [goplaces llms.txt](https://goplaces.sh/llms.txt). Fetch only the specific command page needed.

## Provider configuration

- Google Cloud project: `Personal Agent Maps` (`jkuhrt-agent-maps-2026`).
- The Keychain-held API key is restricted to Routes API and Places API (New).
- Useful calls are capped at 100/day; unused Places endpoints are capped at 10/day.
- The billing account emails alerts at 50%, 90%, and 100% of a CA$5 monthly budget.

## Directions

Use addresses, place IDs, or coordinates:

```bash
~/.local/bin/goplaces directions \
  --from "<origin>" \
  --to "<destination>" \
  --mode drive \
  --json
```

For a future driving departure, include its RFC3339 timestamp. `goplaces` then requests Google's `TRAFFIC_AWARE` routing:

```bash
~/.local/bin/goplaces directions \
  --from "<origin>" \
  --to "<destination>" \
  --mode drive \
  --departure-time "2026-08-16T15:45:00-06:00" \
  --json
```

Use `--steps` only when turn-by-turn instructions matter. Use `--avoid-tolls`, `--avoid-highways`, or `--avoid-ferries` only when requested or operationally relevant.

When reporting a route, retain:

- exact endpoints or their resolved place names;
- provider: Google Routes API;
- requested departure time and timezone, if any;
- distance and duration;
- whether the result is traffic-aware.

### Route facts plus Google Maps link

`groute` is the agent-facing companion for durable itinerary links. It calls
`goplaces` for route facts and deterministically creates a Google Maps URL from
the same endpoints, Place IDs, and travel mode:

```bash
~/.local/bin/groute \
  --from "<origin name or address>" \
  --to "<destination name or address>" \
  --from-place-id "<origin Google Place ID>" \
  --to-place-id "<destination Google Place ID>" \
  --mode drive \
  --departure-time "2026-08-16T15:45:00-06:00" \
  --format markdown \
  --label "Chad's → Royal Tyrrell"
```

Formats:

- `--format json`: route facts plus `google_maps_url`.
- `--format markdown`: `[label](URL) · distance · duration`.
- `--format url`: URL only; performs no API call.

The planning result and link share Google endpoints and travel mode. The link
does not freeze the API route or its future departure time: Google Maps
recalculates the route and live conditions when opened.

## Places

- Use `~/.local/bin/goplaces resolve "<location>" --json` before routing when an endpoint is ambiguous.
- Use `search`, `nearby`, or `details` for current place research.
- Keep result limits small and request only the operation needed.

## Failure handling

- Missing Keychain credential: report that Google Maps setup is incomplete; never fall back to scraping Google Maps.
- API or quota error: report the provider error without exposing credentials.
- Browser maps remain the final-day surface for interactive navigation and live incident inspection.
