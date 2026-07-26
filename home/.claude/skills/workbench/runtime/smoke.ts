/**
 * Smoke — executes the built single-file HTML in jsdom and asserts the app
 * actually rendered. Closes the verify loop without a human eyeballing the page.
 *
 *   ./node_modules/.bin/tsx smoke.ts <built.html> [expected-text ...]
 */
import fs from "node:fs"
import { JSDOM, VirtualConsole } from "jsdom"

const [htmlPath, ...expectations] = process.argv.slice(2)
if (!htmlPath) {
  console.error("usage: smoke.ts <built.html> [expected-text ...]")
  process.exit(1)
}

const pageErrors: string[] = []
const virtualConsole = new VirtualConsole()
virtualConsole.on("jsdomError", (e) => pageErrors.push(String(e)))
virtualConsole.on("error", (...a) => pageErrors.push(a.map(String).join(" ")))

const dom = new JSDOM(
  `<!doctype html><html><head></head><body>${fs.readFileSync(htmlPath, "utf8")}</body></html>`,
  {
    runScripts: "dangerously",
    pretendToBeVisual: true,
    url: "https://workbench.local/",
    virtualConsole,
    beforeParse(window) {
      window.matchMedia ??= (query: string) =>
        ({
          matches: false,
          media: query,
          addEventListener() {},
          removeEventListener() {},
          addListener() {},
          removeListener() {},
          dispatchEvent: () => false,
          onchange: null,
        }) as MediaQueryList
      ;(window as any).ResizeObserver ??= class {
        observe() {}
        unobserve() {}
        disconnect() {}
      }
    },
  },
)

await new Promise((r) => setTimeout(r, 150))

const text = dom.window.document.getElementById("root")?.textContent ?? ""
const failures: string[] = []
if (!text.trim()) failures.push("root rendered empty")
for (const expected of expectations) {
  if (!text.includes(expected)) failures.push(`missing rendered text: ${JSON.stringify(expected)}`)
}
failures.push(...pageErrors.map((e) => `page error: ${e}`))

if (failures.length) {
  console.error(`SMOKE FAIL — ${htmlPath}\n` + failures.map((f) => `  · ${f}`).join("\n"))
  process.exit(1)
}
console.log(`SMOKE OK — ${(text.length / 1024).toFixed(1)}k chars of rendered text`)
