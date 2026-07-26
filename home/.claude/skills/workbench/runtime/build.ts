/**
 * Workbench build — compiles the React+Tailwind+shadcn runtime into ONE
 * self-contained HTML file (Artifact CSP: no external requests, ever).
 *
 *   ./node_modules/.bin/tsx build.ts \
 *     --snippets <dir-of-prerendered-shiki-html> \
 *     --out <file.html> \
 *     [--stamp "<text>"] [--twoslash-css <file>] [--no-minify]
 *
 * The Artifact tool wraps the file in doctype/head/body — emit page content only.
 */
import { execFileSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { parseArgs } from "node:util"
import { rolldown } from "rolldown"

const root = path.dirname(new URL(import.meta.url).pathname)

const { values: args } = parseArgs({
  options: {
    snippets: { type: "string" },
    out: { type: "string" },
    stamp: { type: "string", default: new Date().toISOString().slice(0, 16).replace("T", " ") + " UTC" },
    "twoslash-css": {
      type: "string",
      default: path.join(root, "../scripts/node_modules/@shikijs/twoslash/style-rich.css"),
    },
    "no-minify": { type: "boolean", default: false },
  },
})

if (!args.out) {
  console.error("--out is required")
  process.exit(1)
}

const t0 = performance.now()

// 1 · CSS — Tailwind v4 scans src/ (cwd-relative via @source in globals.css)
const cssOut = path.join(root, "dist/app.css")
fs.mkdirSync(path.dirname(cssOut), { recursive: true })
execFileSync(
  path.join(root, "node_modules/.bin/tailwindcss"),
  ["-i", path.join(root, "src/globals.css"), "-o", cssOut, ...(args["no-minify"] ? [] : ["--minify"])],
  { cwd: root, stdio: ["ignore", "ignore", "inherit"] },
)
const css = fs.readFileSync(cssOut, "utf8")
const twoslashCss = fs.readFileSync(args["twoslash-css"]!, "utf8")

// 2 · JS — rolldown, in-memory
const bundle = await rolldown({
  input: path.join(root, "src/main.tsx"),
  transform: { define: { "process.env.NODE_ENV": '"production"' } },
})
const { output } = await bundle.generate({
  format: "iife",
  minify: !args["no-minify"],
})
const js = output[0].code.replaceAll("%%STAMP%%", args.stamp!)

// 3 · Snippets — prerendered shiki/twoslash HTML, keyed by basename
const snippets: Record<string, string> = {}
if (args.snippets) {
  for (const f of fs.readdirSync(args.snippets)) {
    if (f.endsWith(".html")) {
      snippets[path.basename(f, ".html")] = fs.readFileSync(path.join(args.snippets, f), "utf8")
    }
  }
}
const snippetsJson = JSON.stringify(snippets).replaceAll("</script", "<\\/script")

// 4 · Assemble — theme pre-applied before the bundle runs (no flash)
// twoslash css FIRST: style-rich.css carries its own :root var defaults
// (light theme); ours must come later to win the cascade at :root.
const html = `<meta charset="utf-8">
<title>DW — Design Lanes</title>
<style>
${twoslashCss}
${css}
</style>
<div id="root"></div>
<script>
  window.__WB_SNIPPETS__ = ${snippetsJson};
</script>
<script>
${js}
</script>
`

fs.writeFileSync(args.out, html)
console.log(
  `built ${args.out} — ${(html.length / 1024).toFixed(0)}KB (js ${(js.length / 1024).toFixed(0)}KB, css ${(css.length / 1024).toFixed(0)}KB, snippets ${Object.keys(snippets).length}) in ${Math.round(performance.now() - t0)}ms`,
)
