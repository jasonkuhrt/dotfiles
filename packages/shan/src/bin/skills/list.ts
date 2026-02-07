/**
 * shan skills list — Show effective outfit across all layers.
 *
 * Displays core skills, pluggable on/off, budget info.
 * This is the default command when `shan skills` is called with no subcommand.
 */

import { Console, Effect } from "effect"
import * as Lib from "../../lib/skill-library.js"

const BUDGET_LIMIT = 15_000

export const skillsList = () =>
  Effect.gen(function* () {
    const userOutfit = yield* Lib.listOutfit("user")
    const projectOutfit = yield* Lib.listOutfit("project")
    const library = yield* Lib.listLibrary()

    // Classify user outfit
    const userCore = userOutfit.filter((e) => e.commitment === "core")
    const userPluggable = userOutfit.filter((e) => e.commitment === "pluggable")

    // Classify project outfit
    const projectCore = projectOutfit.filter((e) => e.commitment === "core")
    const projectPluggable = projectOutfit.filter((e) => e.commitment === "pluggable")

    // All on skills (pluggable with symlinks)
    const allPluggableOn = [...userPluggable, ...projectPluggable]
    const allOnNames = new Set([
      ...userPluggable.map((e) => e.name),
      ...projectPluggable.map((e) => e.name),
    ])

    // Library skills that are off (not in any outfit)
    const libraryOff = library.filter((s) => {
      const flatName = Lib.flattenName(s.libraryRelPath)
      return !allOnNames.has(flatName)
    })

    // Core (user)
    if (userCore.length > 0) {
      yield* Console.log("Core (user):")
      yield* printGrid(userCore.map((e) => e.name))
      yield* Console.log("")
    }

    // Core (project)
    if (projectCore.length > 0) {
      yield* Console.log("Core (project):")
      yield* printGrid(projectCore.map((e) => e.name))
      yield* Console.log("")
    }

    // Pluggable (on)
    if (allPluggableOn.length > 0) {
      yield* Console.log("Pluggable (on):")
      for (const entry of allPluggableOn) {
        const scope = userPluggable.includes(entry) ? "user" : "project"
        // Read frontmatter from symlink target for budget
        const targetDir = entry.symlinkTarget ?? entry.dir
        const fm = yield* Lib.readFrontmatter(targetDir)
        const tokens = fm && !fm.disableModelInvocation ? Lib.estimateBudget(fm) : 0
        const colonName = fm?.name ?? Lib.pathToColon(Lib.unflattenName(entry.name))
        const tokenStr = tokens > 0 ? `${tokens} tokens` : "hidden"
        yield* Console.log(`  ● ${colonName}  [${scope}]  ${tokenStr}`)
      }
      yield* Console.log("")
    }

    // Pluggable (off)
    if (libraryOff.length > 0) {
      yield* Console.log("Pluggable (off):")
      yield* printGrid(libraryOff.map((s) => s.colonName), "○")
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

/** Print names in a compact grid with bullet prefix. */
const printGrid = (names: string[], bullet = "●") =>
  Effect.gen(function* () {
    // 3 columns with padding
    const colWidth = 22
    const cols = 3
    for (let i = 0; i < names.length; i += cols) {
      const cells = names.slice(i, i + cols).map((n) => `  ${bullet} ${n}`.padEnd(colWidth))
      yield* Console.log(cells.join(""))
    }
  })
