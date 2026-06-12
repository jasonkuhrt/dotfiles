#!/usr/bin/env bun

import { spawn } from "node:child_process"
import { existsSync, readFileSync } from "node:fs"
import http from "node:http"

type ParsedArgs = {
  values: Record<string, string>
  flags: Set<string>
}

type LaunchStatus = "ok" | "pending" | "error"

type LaunchEvent = {
  at: string
  issue: string
  label: string
  result: string
  status: LaunchStatus
}

type Action = {
  id: string
  title: string
  worktree: string
  branch: string
  state: "Ready" | "Needs check"
  prompt: string
  cwd?: string
}

const parseArgs = (argv: string[]): ParsedArgs => {
  const values: Record<string, string> = {}
  const flags = new Set<string>()

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]

    if (!arg.startsWith("--")) continue

    const raw = arg.slice(2)
    const equalsIndex = raw.indexOf("=")

    if (equalsIndex !== -1) {
      values[raw.slice(0, equalsIndex)] = raw.slice(equalsIndex + 1)
      continue
    }

    const next = argv[index + 1]
    if (next && !next.startsWith("--")) {
      values[raw] = next
      index += 1
      continue
    }

    flags.add(raw)
  }

  return { values, flags }
}

const help = () => {
  console.log(`Usage:
  dashboard.ts [--dummy] [--port 49321]
  dashboard.ts --manifest /path/to/actions.json [--port 49321]

Manifest shape:
  {
    "actions": [
      {
        "id": "HEA-1234",
        "title": "Dock controls",
        "worktree": "Heartbeat-hea-1234-dock",
        "branch": "codex/hea-1234-dock",
        "state": "Ready",
        "cwd": "/absolute/worktree/path",
        "prompt": "Full Codex prompt"
      }
    ]
  }
`)
}

const fail = (message: string): never => {
  console.error(message)
  process.exit(1)
}

const parse = parseArgs(Bun.argv.slice(2))

if (parse.flags.has("help")) {
  help()
  process.exit(0)
}

const port = Number.parseInt(parse.values.port ?? "49321", 10)
if (!Number.isInteger(port) || port <= 0 || port > 65535) fail("--port must be a valid TCP port")

const dummyActions: Action[] = [
  {
    id: "HEA-0001",
    title: "Dock controls",
    worktree: "Heartbeat-hea-0001-dock",
    branch: "codex/hea-0001-dock",
    state: "Ready",
    cwd: "/Users/jasonkuhrt/projects/heartbeat-chat/Heartbeat-hea-0001-dock",
    prompt:
      "Work in /Users/jasonkuhrt/projects/heartbeat-chat/Heartbeat-hea-0001-dock on branch codex/hea-0001-dock. Start HEA-0001. Build the Page Editor dock controls from the Linear issue and Figma context. Keep scope tight, exclude change requests and status pills, add/update e2e coverage, run relevant checks, commit, push, and open a draft PR.",
  },
  {
    id: "HEA-0002",
    title: "Slot editor polish",
    worktree: "Heartbeat-hea-0002-slot-edit",
    branch: "codex/hea-0002-slot-edit",
    state: "Ready",
    cwd: "/Users/jasonkuhrt/projects/heartbeat-chat/Heartbeat-hea-0002-slot-edit",
    prompt:
      "Work in /Users/jasonkuhrt/projects/heartbeat-chat/Heartbeat-hea-0002-slot-edit on branch codex/hea-0002-slot-edit. Start HEA-0002. Polish the existing click-to-edit text and URL slot cue so UI edits stage correctly, add/update e2e coverage, run relevant checks, commit, push, and open a draft PR.",
  },
  {
    id: "HEA-0003",
    title: "Media slot replacement",
    worktree: "Heartbeat-hea-0003-media-slot",
    branch: "codex/hea-0003-media-slot",
    state: "Needs check",
    cwd: "/Users/jasonkuhrt/projects/heartbeat-chat/Heartbeat-hea-0003-media-slot",
    prompt:
      "Work in /Users/jasonkuhrt/projects/heartbeat-chat/Heartbeat-hea-0003-media-slot on branch codex/hea-0003-media-slot. Start HEA-0003. Finish and prove Page Editor media slot replacement UX with e2e coverage. Exclude change requests, status pills, and AI image generation. Run relevant checks, commit, push, and open a draft PR.",
  },
  {
    id: "HEA-0004",
    title: "Canvas context cue",
    worktree: "Heartbeat-hea-0004-canvas-cue",
    branch: "codex/hea-0004-canvas-cue",
    state: "Ready",
    cwd: "/Users/jasonkuhrt/projects/heartbeat-chat/Heartbeat-hea-0004-canvas-cue",
    prompt:
      "Work in /Users/jasonkuhrt/projects/heartbeat-chat/Heartbeat-hea-0004-canvas-cue on branch codex/hea-0004-canvas-cue. Start HEA-0004. Add Page Canvas context menu and cue entry points wired to direct editor actions. Exclude persisted change requests and status annotation pills. Add e2e coverage, run relevant checks, commit, push, and open a draft PR.",
  },
]

const readActions = (): Action[] => {
  const manifest = parse.values.manifest

  if (!manifest) return dummyActions

  const raw = JSON.parse(readFileSync(manifest, "utf8")) as { actions?: Action[] }
  if (!Array.isArray(raw.actions)) fail("Manifest must contain an actions array")

  return raw.actions.map((action) => ({
    ...action,
    state: action.state === "Needs check" ? "Needs check" : "Ready",
  }))
}

const actions = readActions()

let launches: LaunchEvent[] = [
  {
    at: "23:20",
    issue: actions[1]?.id ?? "HEA-0002",
    label: actions[1]?.title ?? "Slot editor polish",
    result: "Opened composer",
    status: "ok",
  },
  {
    at: "23:12",
    issue: actions[0]?.id ?? "HEA-0001",
    label: actions[0]?.title ?? "Dock controls",
    result: "Waiting for send",
    status: "pending",
  },
]

const esc = (value: unknown) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")

const css = `
  :root { color-scheme: light dark; --fg:#17181c; --muted:#626873; --line:#dfe3e8; --soft:#f6f7f9; --blue:#0f5cc0; --green:#10703d; --amber:#8a5a00; --red:#b42318; --bg:#fff; --panel:#fff; }
  @media (prefers-color-scheme: dark) { :root { --fg:#f4f6f8; --muted:#aab0bb; --line:#343a45; --soft:#20242c; --blue:#8db7ff; --green:#6fd08e; --amber:#f0c36b; --red:#ff8a80; --bg:#15171c; --panel:#1b1f27; } }
  * { box-sizing: border-box; }
  body { margin:0; font:14px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; color:var(--fg); background:var(--bg); }
  main { padding:22px 28px 36px; max-width:1180px; }
  h1 { margin:0; font-size:24px; line-height:1.2; letter-spacing:0; }
  h2 { margin:0 0 12px; font-size:13px; text-transform:uppercase; letter-spacing:.04em; color:var(--muted); }
  p { margin:0; color:var(--muted); }
  a { color:inherit; }
  .grid { display:grid; grid-template-columns:minmax(0,1.5fr) minmax(320px,.85fr); gap:22px; align-items:start; }
  .panel { border:1px solid var(--line); border-radius:8px; background:var(--panel); overflow:hidden; }
  .panel-head { padding:14px 16px; border-bottom:1px solid var(--line); background:var(--soft); display:flex; justify-content:space-between; gap:16px; align-items:center; }
  .panel-body { padding:16px; }
  .actions { display:grid; gap:10px; }
  .action { padding:14px; border:1px solid var(--line); border-radius:8px; background:var(--panel); }
  .action-head { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:14px; align-items:center; }
  .issue { font-weight:700; font-size:16px; }
  .title { font-weight:650; }
  .meta { margin-top:6px; display:flex; flex-wrap:wrap; gap:8px; color:var(--muted); font-size:12px; }
  code { padding:2px 6px; border:1px solid var(--line); border-radius:6px; background:var(--soft); font-family:ui-monospace,SFMono-Regular,Menlo,monospace; font-size:12px; }
  .button { display:inline-flex; align-items:center; justify-content:center; min-width:74px; height:34px; border-radius:7px; background:var(--fg); color:var(--bg); font-weight:650; text-decoration:none; }
  .pill { display:inline-flex; align-items:center; height:24px; padding:0 8px; border-radius:999px; border:1px solid var(--line); background:var(--panel); color:var(--muted); font-size:12px; font-weight:650; }
  .ready { color:var(--green); }
  .warn { color:var(--amber); }
  details { margin-top:12px; border-top:1px solid var(--line); padding-top:10px; }
  summary { cursor:pointer; color:var(--blue); font-weight:650; }
  pre { margin:10px 0 0; white-space:pre-wrap; overflow-wrap:anywhere; background:var(--soft); border:1px solid var(--line); border-radius:8px; padding:12px; font:12px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace; }
  table { width:100%; border-collapse:collapse; }
  td { padding:10px 0; border-bottom:1px solid var(--line); vertical-align:top; }
  tr:last-child td { border-bottom:0; }
  .log-time { width:54px; color:var(--muted); font-variant-numeric:tabular-nums; }
  .log-status { width:82px; text-align:right; }
  .ok { color:var(--green); } .pending { color:var(--amber); } .error { color:var(--red); }
  .note { margin-top:14px; padding:12px; border-radius:8px; background:var(--soft); color:var(--muted); }
  @media (max-width: 850px) { .grid { grid-template-columns:1fr; } }
`

const page = (title: string, body: string) =>
  `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(title)}</title><style>${css}</style>${body}</html>`

const dashboard = () => {
  const cards = actions
    .map(
      (action) => `
    <article class="action">
      <div class="action-head">
        <div>
          <div><span class="issue">${esc(action.id)}</span> <span class="title">${esc(action.title)}</span></div>
          <p>Open Codex with a ready-to-send start prompt.</p>
          <div class="meta"><code>${esc(action.worktree)}</code><code>${esc(action.branch)}</code><span class="pill ${action.state === "Ready" ? "ready" : "warn"}">${esc(action.state)}</span></div>
        </div>
        <a class="button" href="/run/${encodeURIComponent(action.id)}">Start</a>
      </div>
      <details>
        <summary>Prompt</summary>
        <pre>${esc(action.prompt)}</pre>
      </details>
    </article>`,
    )
    .join("")

  const rows = launches
    .map(
      (entry) => `
    <tr><td class="log-time">${esc(entry.at)}</td><td><strong>${esc(entry.issue)}</strong> ${esc(entry.label)}<br><span style="color:var(--muted)">${esc(entry.result)}</span></td><td class="log-status ${esc(entry.status)}">${esc(entry.status)}</td></tr>`,
    )
    .join("")

  return page(
    "Pages Agent Launcher",
    `<body><main><div class="grid"><section class="panel"><div class="panel-head"><h2>Start Agents</h2><span class="pill">${parse.values.manifest ? "Manifest" : "Dummy data"}</span></div><div class="panel-body"><div class="actions">${cards}</div></div></section><aside class="panel"><div class="panel-head"><h2>Dashboard</h2><span class="pill">127.0.0.1:${port}</span></div><div class="panel-body"><table>${rows}</table><div class="note">Each Start click opens Codex with the visible prompt when a cwd exists; otherwise it records a dashboard event for layout review.</div></div></aside></div></main></body>`,
  )
}

const nowShort = () =>
  new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })

const openCodex = (action: Action) => {
  if (!action.cwd || !existsSync(action.cwd)) {
    return {
      status: "error" as const,
      result: action.cwd ? "Worktree missing" : "No cwd configured",
    }
  }

  const url = new URL("codex://new")
  url.searchParams.set("path", action.cwd)
  url.searchParams.set("prompt", action.prompt)

  const child = spawn("open", [url.toString()], {
    detached: true,
    stdio: "ignore",
  })
  child.unref()

  return {
    status: "ok" as const,
    result: "Opened composer",
  }
}

const actionPage = (id: string) => {
  const action = actions.find((candidate) => candidate.id === id)
  if (!action) return null

  const result = openCodex(action)
  launches = [
    {
      at: nowShort(),
      issue: action.id,
      label: action.title,
      result: result.result,
      status: result.status,
    },
    ...launches,
  ].slice(0, 8)

  return page(
    `Started ${id}`,
    `<body><main><h1>Started ${esc(id)}</h1><p>${esc(result.result)} for ${esc(action.title)}.</p><p style="margin-top:18px"><a href="/" style="color:var(--blue)">Back to dashboard</a></p><pre>${esc(action.prompt)}</pre></main></body>`,
  )
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url ?? "/", `http://127.0.0.1:${port}`)

  if (url.pathname === "/") {
    response.writeHead(200, { "content-type": "text/html" })
    response.end(dashboard())
    return
  }

  const match = url.pathname.match(/^\/run\/([^/]+)$/)
  if (match) {
    const body = actionPage(decodeURIComponent(match[1] ?? ""))
    if (body) {
      response.writeHead(200, { "content-type": "text/html" })
      response.end(body)
      return
    }
  }

  response.writeHead(404, { "content-type": "text/html" })
  response.end(
    page(
      "Not found",
      '<body><main><h1>Not found</h1><p>No launcher route exists here.</p><p><a href="/">Back to dashboard</a></p></main></body>',
    ),
  )
})

server.listen(port, "127.0.0.1", () => {
  console.log(`DASHBOARD http://127.0.0.1:${port}/`)
})
