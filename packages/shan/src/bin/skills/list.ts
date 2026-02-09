/**
 * shan skills list — Show effective outfit across all layers.
 *
 * Displays core skills, pluggable on/off, budget info.
 * This is the default command when `shan skills` is called with no subcommand.
 */

import { Console, Effect } from "effect"
import * as Lib from "../../lib/skill-library.js"

const BUDGET_LIMIT = 15_000

interface GridItem {
  readonly name: string
  readonly detail?: string
}

export const skillsList = () =>
  Effect.gen(function* () {
    const userOutfit = yield* Lib.listOutfit("user")
    const projectOutfit = yield* Lib.listOutfit("project")
    const library = yield* Lib.listLibrary()

    // Classify outfit entries
    const userCore = userOutfit.filter((e) => e.commitment === "core")
    const userPluggable = userOutfit.filter((e) => e.commitment === "pluggable")
    const projectCore = projectOutfit.filter((e) => e.commitment === "core")
    const projectPluggable = projectOutfit.filter((e) => e.commitment === "pluggable")

    const allOnNames = new Set([
      ...userPluggable.map((e) => e.name),
      ...projectPluggable.map((e) => e.name),
    ])
    const libraryOff = library.filter((s) => {
      const flatName = Lib.flattenName(s.libraryRelPath)
      return !allOnNames.has(flatName)
    })

    // Resolve pluggable entries to grid items with token detail
    const toGridItems = (entries: typeof userPluggable) =>
      Effect.gen(function* () {
        const items: GridItem[] = []
        for (const entry of entries) {
          const targetDir = entry.symlinkTarget ?? entry.dir
          const fm = yield* Lib.readFrontmatter(targetDir)
          const tokens = fm && !fm.disableModelInvocation ? Lib.estimateBudget(fm) : 0
          const colonName = fm?.name ?? Lib.pathToColon(Lib.unflattenName(entry.name))
          items.push({ name: colonName, detail: tokens > 0 ? String(tokens) : "--" })
        }
        return items
      })

    // Core (user)
    if (userCore.length > 0) {
      yield* Console.log("Core (user):")
      yield* printGrid(userCore.map((e) => ({ name: e.name })))
      yield* Console.log("")
    }

    // Core (project)
    if (projectCore.length > 0) {
      yield* Console.log("Core (project):")
      yield* printGrid(projectCore.map((e) => ({ name: e.name })))
      yield* Console.log("")
    }

    // On (user)
    if (userPluggable.length > 0) {
      yield* Console.log("On (user):")
      yield* printGrid(yield* toGridItems(userPluggable))
      yield* Console.log("")
    }

    // On (project)
    if (projectPluggable.length > 0) {
      yield* Console.log("On (project):")
      yield* printGrid(yield* toGridItems(projectPluggable))
      yield* Console.log("")
    }

    // Off
    if (libraryOff.length > 0) {
      yield* Console.log("Off:")
      yield* printGrid(libraryOff.map((s) => ({ name: s.colonName })), "○")
      yield* Console.log("")
    }

    // Budget summary
    let totalBudget = 0
    for (const entry of [...userOutfit, ...projectOutfit]) {
      const targetDir = entry.symlinkTarget ?? entry.dir
      const fm = yield* Lib.readFrontmatter(targetDir)
      if (fm && !fm.disableModelInvocation) {
        totalBudget += Lib.estimateBudget(fm)
      }
    }
    const pct = Math.round((totalBudget / BUDGET_LIMIT) * 100)
    yield* Console.log(`Budget: ${totalBudget.toLocaleString()} / ${BUDGET_LIMIT.toLocaleString()} tokens (${pct}%)`)
  })

/** Auto-sizing grid that fits columns to terminal width. */
const printGrid = (items: readonly GridItem[], bullet = "●") =>
  Effect.gen(function* () {
    if (items.length === 0) return
    const termWidth = process.stdout.columns || 80

    const maxName = Math.max(...items.map((it) => it.name.length))
    const hasDetail = items.some((it) => it.detail != null)
    const maxDetail = hasDetail
      ? Math.max(...items.map((it) => (it.detail ?? "").length))
      : 0

    // "  ● " = 4 chars prefix, then padded name, then "  " + right-aligned detail
    const cellW = 4 + maxName + (hasDetail ? 2 + maxDetail : 0)
    const gap = 2
    const cols = Math.max(1, Math.floor((termWidth + gap) / (cellW + gap)))

    for (let i = 0; i < items.length; i += cols) {
      const row = items.slice(i, i + cols)
      const line = row.map((it, j) => {
        let cell = `  ${bullet} ${it.name.padEnd(maxName)}`
        if (hasDetail) cell += `  ${(it.detail ?? "").padStart(maxDetail)}`
        return j < row.length - 1 ? cell.padEnd(cellW + gap) : cell
      }).join("")
      yield* Console.log(line)
    }
  })
