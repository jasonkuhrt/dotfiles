/**
 * Workbench local host — serves the built bundle and accepts writes.
 *
 *   ./node_modules/.bin/tsx serve.ts --dir <workbench-dir> [--port 4517]
 *
 * GET  /          → <dir>/workbench.html (no-store: rebuilds are live on reload)
 * POST /record    → appends the JSON body as <dir>/inbox/<kind>-<ts>.json
 * GET  /messages  → {pending: [...]} — the inbox as a queue (drives node counters)
 *
 * The inbox is the agent's queue: Messages and Decisions land as files;
 * the agent processes each and moves it to <dir>/processed/ with a
 * receipt — until then it counts as pending. No cloud, no auth.
 */
import fs from "node:fs"
import http from "node:http"
import path from "node:path"
import { parseArgs } from "node:util"

const { values: args } = parseArgs({
  options: {
    dir: { type: "string" },
    port: { type: "string", default: "4517" },
  },
})
if (!args.dir) {
  console.error("--dir is required")
  process.exit(1)
}
const dir = path.resolve(args.dir)
const inbox = path.join(dir, "inbox")
fs.mkdirSync(inbox, { recursive: true })

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/record") {
    let body = ""
    req.on("data", (c) => (body += c))
    req.on("end", () => {
      try {
        const payload = JSON.parse(body)
        const kind = typeof payload.kind === "string" ? payload.kind.replace(/[^a-z]/g, "") : "record"
        const file = path.join(inbox, `${kind}-${Date.now()}.json`)
        fs.writeFileSync(file, JSON.stringify(payload, null, 2))
        res.writeHead(200, { "content-type": "application/json" }).end('{"ok":true}')
        console.log(`recorded ${path.basename(file)}`)
      } catch {
        res.writeHead(400).end('{"ok":false}')
      }
    })
    return
  }
  if (req.method === "GET" && req.url === "/messages") {
    const pending = fs
      .readdirSync(inbox)
      .filter((f) => f.endsWith(".json"))
      .map((f) => {
        try {
          return { id: f, ...JSON.parse(fs.readFileSync(path.join(inbox, f), "utf8")) }
        } catch {
          return { id: f }
        }
      })
    res
      .writeHead(200, { "content-type": "application/json", "cache-control": "no-store" })
      .end(JSON.stringify({ pending }))
    return
  }
  if (req.method === "GET" && (req.url === "/" || req.url?.startsWith("/?"))) {
    res.writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" })
    res.end(fs.readFileSync(path.join(dir, "workbench.html")))
    return
  }
  res.writeHead(404).end()
})

server.listen(Number(args.port), "127.0.0.1", () => {
  console.log(`workbench → http://127.0.0.1:${args.port}/  (inbox: ${inbox})`)
})
