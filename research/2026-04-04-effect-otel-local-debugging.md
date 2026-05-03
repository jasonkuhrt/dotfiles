# Effect OTel + Local Debugging for Agent Dev Loops

**Date:** 2026-04-04
**Context:** Heartbeat codebase, Effect v4 (beta.43), PR 877 (codex/HEA-4225-redo)

## The Problem

Agents debugging Effect workflows fall back to `console.log`. Effect has first-class OTel tracing but the codebase doesn't connect it to anything locally. 56 `withSpan` calls exist but produce orphaned spans.

## Current State (Heartbeat)

- `apps/api/src/ddTracing.ts` — OTel SDK already initialized, auto-instruments HTTP/Prisma/runtime, exports to `localhost:4318` via OTLP HTTP
- `@effect/opentelemetry@4.0.0-beta.43` — installed, unused
- `@opentelemetry/sdk-trace-node@0.207.0`, `@opentelemetry/exporter-trace-otlp-http@0.207.0` — installed
- 56 `Effect.withSpan()` calls across 11 files — spans created but never exported
- Gap: no `NodeSdk.layer()` composed into the Effect runtime
- Gap: no local receiver listening on `:4318` in dev mode

## Effect v4 OTel API

Layer composition — provide `NodeSdk.layer()` to your Effect program:

```ts
import { NodeSdk } from "@effect/opentelemetry"
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base"
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http"

const OTelLive = NodeSdk.layer(() => ({
  resource: { serviceName: "heartbeat-api" },
  spanProcessor: new BatchSpanProcessor(
    new OTLPTraceExporter({ url: "http://localhost:4318/v1/traces" })
  ),
}))
```

Key modules in `@effect/opentelemetry`: `NodeSdk`, `WebSdk`, `Otlp`, `Tracer`, `Logger`, `Metrics`, `Resource`.

v4 changes: `captureStackTrace` now accepts `boolean | LazyArg<string>`. Layer API stable from v3.

Reference source: `~/repo-references/effect-smol/packages/opentelemetry/src/`

## Trace Backend Decision: Grafana Tempo

### Why Tempo

- **TraceQL** — the only structural trace query language in OSS. Parent/child/sibling operators (`>>`, `>`, `~`) match Effect fiber tree debugging patterns.
- **Lightweight** — single Go binary, ~200MB RAM, local filesystem storage. No external DB.
- **OTLP native** — accepts on `:4318` (same port the app already exports to)
- **TraceQL HTTP API** — `GET /api/search?q={TraceQL}`, returns jq-friendly JSON. No browser needed.

### Why not alternatives

| Alternative | Why not |
|---|---|
| **Jaeger** | No query language. Tag-based flat filters only. Betting on NL search (unproven). |
| **SigNoz** | 4 containers, 4GB RAM minimum, ClickHouse + ZooKeeper. Overkill for local dev. |
| **Grafana Tempo + Grafana UI** | UI unnecessary — agents query via curl, not browser. |

### Competitive validation (April 2026)

- 6 releases in Q1 2026 (v2.10.0 → v2.10.3), 3 concurrent maintenance lines
- TraceQL added `topk(n)`, `bottomk(n)`, `sum_over_time()` in 2025
- AGPLv3, fully open source, no feature gating on query capabilities
- 766k Docker Hub pulls
- **Tempo 2.9 (Oct 2025) shipped a built-in MCP server** for LLM trace analysis — needs investigation
- No competing structural query language exists or is planned by competitors
- CNCF Query Standardization WG exists but is pre-spec, no implementation

### Lock-in assessment

TraceQL is Grafana Labs proprietary — tightly coupled to Tempo's storage engine. Not an OTel standard. BUT: the lock-in boundary is clean — only at the query layer. All instrumentation (`Effect.withSpan`, OTLP export) is standard OTel. Swapping Tempo means changing query patterns, not app code.

### Setup

Needs a 20-line config YAML (cannot run zero-config — must explicitly enable OTLP receivers and bind to `0.0.0.0` for Docker):

```yaml
server:
  http_listen_port: 3200

distributor:
  receivers:
    otlp:
      protocols:
        grpc:
          endpoint: 0.0.0.0:4317
        http:
          endpoint: 0.0.0.0:4318

ingester:
  trace_idle_period: 10s
  max_block_duration: 5m

storage:
  trace:
    backend: local
    local:
      path: /tmp/tempo/traces
    wal:
      path: /tmp/tempo/wal

compactor:
  compaction:
    block_retention: 1h
```

```bash
docker run --rm -d --name tempo \
  -p 3200:3200 -p 4317:4317 -p 4318:4318 \
  -v $(pwd)/tools/tempo/tempo.yaml:/etc/tempo/tempo.yaml \
  grafana/tempo:latest \
  -config.file=/etc/tempo/tempo.yaml
```

### TraceQL API (verified)

**Search:** `GET /api/search?q={url-encoded-traceql}&limit=20`

**Response:**
```json
{
  "traces": [
    {
      "traceID": "2f3e0cee77ae5dc9c17ade3689eb2e54",
      "rootServiceName": "shop-backend",
      "rootTraceName": "update-billing",
      "startTimeUnixNano": "1684778327699392724",
      "durationMs": 557,
      "spanSets": [
        {
          "spans": [
            {
              "spanID": "563d623c76514f8e",
              "startTimeUnixNano": "1684778327735077898",
              "durationNanos": "446979497",
              "attributes": [{ "key": "status", "value": { "stringValue": "error" } }]
            }
          ],
          "matched": 1
        }
      ]
    }
  ]
}
```

**Get trace:** `GET /api/traces/<traceid>` — returns full span tree as OTLP JSON.

**tempo-cli:** Real, maintained (`cmd/tempo-cli` in grafana/tempo repo). Must compile from source (Go). Commands: `query api search`, `query api trace-id`.

## OTel Landscape (April 2026)

### Three competing bets on trace querying

1. **Bespoke DSL** — TraceQL (Grafana/Tempo). Structural, purpose-built, powerful, vendor-locked.
2. **SQL** — ClickStack, SigNoz, DuckDB. General-purpose, already known, heavier infra.
3. **Natural language** — Jaeger's new bet. LLM → search params. Early, unproven.

### Trajectory

OTel won the pipeline layer (everyone agrees on OTLP). The query layer is fragmenting, not converging. CNCF has a query standardization working group (elevated to Initiative Jul 2025) but no spec or implementation exists.

### Key blogs/links

- [charity.wtf — "Another observability 3.0 appears on the horizon"](https://charity.wtf/2025/03/24/another-observability-3-0-appears-on-the-horizon/) (Mar 2025)
- [Grafana — Tempo 2.9 release (MCP server, TraceQL metrics)](https://grafana.com/blog/2025/10/22/grafana-tempo-2-9-release-mcp-server-support-traceql-metrics-sampling-and-more/) (Oct 2025)
- [ClickHouse — "State of SQL-based Observability"](https://clickhouse.com/blog/the-state-of-sql-based-observability)
- [The New Stack — "Can OpenTelemetry Save Observability in 2026?"](https://thenewstack.io/can-opentelemetry-save-observability-in-2026/)
- [CNCF — Jaeger v2 / OTel unification](https://www.cncf.io/blog/2025/11/27/from-chaos-to-clarity-how-opentelemetry-unified-observability-across-clouds/)
- [CNCF Query Standardization WG](https://github.com/cncf/tag-observability/blob/main/working-groups/query-standardization.md)
- [ClickHouse — ClickStack launch](https://clickhouse.com/blog/clickstack-a-high-performance-oss-observability-stack-on-clickhouse) (May 2025)

### Blogs to follow

- `charity.wtf` — observability philosophy, vendor-independent
- `grafana.com/blog` (tag: tempo) — Tempo/TraceQL releases
- `clickhouse.com/blog` — SQL-over-traces counter-narrative
- `thenewstack.io` — OTel ecosystem coverage
- `signoz.io/blog` — ClickHouse-native OTel perspective

## Local Trace Viewer Landscape

### TUI

| Project | Stars | Status | Notes |
|---|---|---|---|
| [otel-tui](https://github.com/ymtdzzz/otel-tui) | 888 | Active (Mar 2026) | Only real TUI. Go. Span tree, metrics, logs, topology. OTLP/Zipkin/Prometheus/Datadog. |

### Lightweight web viewers

| Project | Stars | Status | Notes |
|---|---|---|---|
| [otel-desktop-viewer](https://github.com/CtrlSpice/otel-desktop-viewer) | 778 | Active (Apr 2026) | Go CLI + React UI, DuckDB. [Proposed donation to OTel org](https://github.com/open-telemetry/community/issues/1515). |
| [otel-gui](https://github.com/metafab/otel-gui) | 37 | Active (Apr 2026) | TypeScript, Honeycomb-style waterfall, PGlite, OTLP receiver built in. |
| [teley](https://github.com/logaretm/teley) | 54 | Active (Apr 2026) | Vue, SQLite, WebSocket real-time. Also converts Sentry→OTLP. |

### Embeddable components

| Project | Stars | Status | Notes |
|---|---|---|---|
| [agent-prism](https://github.com/evilmartians/agent-prism) | 319 | Active (Feb 2026) | React trace viewer components with OTel + Langfuse adapters. Designed for AI agent traces. |

### Platforms (community, not corporate)

| Project | Stars | Status | Notes |
|---|---|---|---|
| [uptrace](https://github.com/uptrace/uptrace) | 4,159 | Active (Mar 2026) | Full APM, ClickHouse, AGPL. Small company. |
| [Aspire Dashboard](https://github.com/dotnet/aspire) | — | Active | Microsoft. Standalone Docker, accepts OTLP, polished waterfall. Language-agnostic despite .NET branding. |

### Dead/stale (signal about the niche)

| Project | Stars | Status |
|---|---|---|
| [teletrace](https://github.com/teletrace/teletrace) | 629 | Archived |
| [TraceLens](https://github.com/asynkron/TraceLens) | 166 | Stale (Oct 2024) |

### Other notable

- **DuckDB OTLP extension** — `read_otlp_traces()` queries OTLP JSON files with SQL locally
- **Perfetto UI** — could visualize OTel traces if converted, but no converter exists
- **d3-flame-graph** (966 stars) — D3 plugin, not OTel-specific but could render span hierarchies

## Integration Seams (Heartbeat-specific)

1. **Effect OTel Layer → runtime** (highest priority) — `libs/inngest-effect/src/inngest-effect.ts` lines ~260, ~313, ~966-975. Compose `NodeSdk.layer()` into `ManagedRuntime`.
2. **Inngest workflow root spans** — same file, `defaultRunner` at line 674-676. Wrap with `Effect.withSpan()` per workflow invocation.
3. **Effect Logger → OTel** — `libs/backend-services/src/lib/effect/effectLogging.ts`. Add `Logger.layerLoggerProvider()`.
4. **Cross-process trace propagation** (largest effort) — W3C TraceContext in Inngest event payloads.

## Dev tip

Use `SimpleSpanProcessor` (not `BatchSpanProcessor`) in dev mode for immediate span export. Batching delays spans, making real-time debugging frustrating. Source: [OneUptime blog on OTel local dev](https://oneuptime.com/blog/post/2026-02-06-opentelemetry-local-development-hot-reloading/view).

## Open questions

- **Tempo 2.9 MCP server** — shipped Oct 2025. What tools does it expose? Could replace a custom MCP server entirely.
- **Where does `NodeSdk.layer()` compose?** Inngest-Effect runtime vs API server level alongside `ddTracing.ts`.
- **`tempo.yaml` location** — `tools/tempo/tempo.yaml` proposed.
