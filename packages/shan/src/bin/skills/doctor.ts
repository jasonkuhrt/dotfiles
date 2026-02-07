/**
 * shan skills doctor — Run aspect-based health checks on the skills system.
 *
 * Default: detect + auto-fix. Use --no-fix for report-only mode.
 */

import { Console, Effect } from "effect"
import * as Lib from "../../lib/skill-library.js"
import { ALL_ASPECTS, type DoctorContext, type DoctorFinding } from "../../lib/doctor-aspects.js"

export interface DoctorOptions {
  readonly noFix: boolean
}

export const skillsDoctor = (options: DoctorOptions = { noFix: false }) =>
  Effect.gen(function* () {
    yield* Console.log("Running health checks...")
    yield* Console.log("")

    // ── Check: Library exists ──────────────────────────────────────
    const libExists = yield* Lib.libraryExists()
    if (!libExists) {
      yield* Console.error(`Library directory not found: ${Lib.LIBRARY_DIR}`)
      return
    }

    // ── Build context ─────────────────────────────────────────────
    const state = yield* Lib.loadState()
    const library = yield* Lib.listLibrary()
    const userOutfit = yield* Lib.listOutfit("user")
    const projectOutfit = yield* Lib.listOutfit("project")
    const gitignoreEntries = yield* Lib.readGitignoreEntries(process.cwd())
    const config = yield* Lib.loadConfig()

    const ctx: DoctorContext = {
      state,
      library,
      userOutfit,
      projectOutfit,
      projectOutfitDir: Lib.outfitDir("project"),
      gitignoreEntries,
    }

    // ── Resolve disabled aspects ──────────────────────────────────
    const disabled = new Set(config.skills.doctor?.disabled ?? [])
    const aspects = ALL_ASPECTS.filter((a) => !disabled.has(a.name))

    // ── Run detection ─────────────────────────────────────────────
    const allFindings: DoctorFinding[] = []
    for (const aspect of aspects) {
      const findings = yield* aspect.detect(ctx)
      allFindings.push(...findings)
    }

    if (allFindings.length === 0) {
      yield* Console.log("doctor: 0 issues — all clear")
      return
    }

    // ── Apply fixes or report ─────────────────────────────────────
    const fixable = allFindings.filter((f) => f.fixable)
    const unfixable = allFindings.filter((f) => !f.fixable)
    let fixedCount = 0
    const fixDescriptions: string[] = []

    if (!options.noFix) {
      // Auto-fix mode
      for (const f of fixable) {
        if (f.fix) {
          const desc = yield* f.fix().pipe(Effect.catchAll((err) => {
            return Console.error(`  fix failed: ${f.message} — ${err}`).pipe(
              Effect.map(() => null as string | null),
            )
          }))
          if (desc) {
            fixedCount++
            fixDescriptions.push(desc)
          }
        }
      }

      yield* Console.log(`doctor: ${allFindings.length} issues found, ${fixedCount} fixed`)
      yield* Console.log("")

      for (const desc of fixDescriptions) {
        yield* Console.log(`  + ${desc}`)
      }
      for (const f of unfixable) {
        yield* Console.log(`  ! ${f.aspect}: ${f.message}`)
      }
      for (const f of fixable) {
        if (!f.fix) {
          yield* Console.log(`  ! ${f.aspect}: ${f.message}`)
        }
      }

      // Record doctor history entry
      if (fixedCount > 0) {
        const history = Lib.getProjectHistory(state, "project")
        history.entries.push(Lib.DoctorOp({
          targets: fixDescriptions,
          scope: "project",
          timestamp: new Date().toISOString(),
        }))
        if (history.entries.length > config.skills.historyLimit) {
          history.entries.splice(0, history.entries.length - config.skills.historyLimit)
        }
        const newState = Lib.setProjectHistory(state, "project", history)
        yield* Lib.saveState(newState)
      }
    } else {
      // Report-only mode
      yield* Console.log(`doctor: ${allFindings.length} issues found (--no-fix: report only)`)
      yield* Console.log("")

      for (const f of allFindings) {
        const fixLabel = f.fixable ? " [fixable]" : ""
        yield* Console.log(`  ${f.aspect}: ${f.message}${fixLabel}`)
      }

      if (fixable.length > 0) {
        yield* Console.log("")
        yield* Console.log(`  Run \`shan skills doctor\` to auto-fix ${fixable.length} of ${allFindings.length} issues`)
      }
    }
  })
