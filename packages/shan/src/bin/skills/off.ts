/**
 * shan skills off [targets] [--scope user] [--strict]
 *
 * Turn off one or more skills or groups. Removes symlinks from outfit.
 * No targets = turn off ALL pluggable (reset).
 * Two-phase execution: validate all targets first, abort on any error, then execute.
 */

import { Console, Effect } from "effect"
import { lstat, rm, unlink } from "node:fs/promises"
import * as path from "node:path"
import * as Lib from "../../lib/skill-library.js"

export interface SkillsOffOptions {
  readonly scope: Lib.Scope
  readonly strict: boolean
}

/** Validated uninstall action ready for Phase 2. */
interface ValidatedUninstall {
  readonly flatName: string
  readonly colonName: string
  readonly linkPath: string
}

export const skillsOff = (targetInput: string, options: SkillsOffOptions) =>
  Effect.gen(function* () {
    const exists = yield* Lib.libraryExists(options.scope)
    if (!exists) {
      yield* Console.error("No skills library found.")
      return yield* Effect.fail(new Error("Library not found"))
    }

    const dir = Lib.outfitDir(options.scope)

    // No targets = reset all pluggable (non-atomic — always succeeds)
    if (!targetInput) {
      yield* resetAll(dir, options.scope)
      return
    }

    const targets = Lib.parseTargets(targetInput)

    // ── Phase 1: Validate all targets (no side effects) ─────────────

    const batch = Lib.emptyBatch<ValidatedUninstall>()
    const groupsToClean = new Set<string>()

    for (const target of targets) {
      const resolved = yield* Lib.resolveTarget(target, options.scope)
      if (!resolved) {
        batch.errors.push({ name: target, reason: "not found in library" })
        continue
      }

      // Track top-level group for router cleanup
      if (resolved.nodeType === "group" || resolved.nodeType === "callable-group") {
        const topGroup = target.split(":")[0]!
        if (topGroup === target || !target.includes(":")) {
          groupsToClean.add(topGroup)
        }
      }

      for (const leaf of resolved.leaves) {
        const flatName = Lib.flattenName(leaf.libraryRelPath)
        const linkPath = path.join(dir, flatName)

        const stat = yield* Effect.tryPromise(() => lstat(linkPath)).pipe(
          Effect.catchAll(() => Effect.succeed(null)),
        )

        if (!stat) {
          batch.skips.push({ name: leaf.colonName, reason: "already off" })
          continue
        }

        if (stat.isSymbolicLink()) {
          batch.actions.push({ flatName, colonName: leaf.colonName, linkPath })
        } else if (stat.isDirectory()) {
          batch.errors.push({ name: leaf.colonName, reason: "cannot turn off core skill" })
        }
      }
    }

    // ── Abort check ─────────────────────────────────────────────────

    if (Lib.shouldAbort(batch, options.strict)) {
      yield* Lib.reportBatch(batch, "off", (a) => a.colonName, { aborted: true })
      return yield* Effect.fail(new Error("Some targets failed"))
    }

    // ── Phase 2: Execute all mutations ──────────────────────────────

    // Snapshot before mutations
    const state = yield* Lib.loadState()
    const config = yield* Lib.loadConfig()
    const snapshotBefore = yield* Lib.snapshotOutfit(options.scope)
    const routersBefore = yield* Lib.detectGeneratedRouters(options.scope)

    // Remove symlinks
    for (const action of batch.actions) {
      yield* Effect.tryPromise(() => unlink(action.linkPath))
    }

    // Auto-router cleanup for top-level groups
    for (const groupName of groupsToClean) {
      yield* cleanupRouter(dir, groupName, options.scope)
    }

    // Update current state
    let updatedState = state
    for (const action of batch.actions) {
      updatedState = Lib.removeCurrentInstall(updatedState, options.scope, action.flatName)
    }

    // Record history
    const history = Lib.getProjectHistory(updatedState, options.scope)
    if (history.undoneCount > 0) {
      history.entries.splice(history.entries.length - history.undoneCount)
      history.undoneCount = 0
    }
    history.entries.push(Lib.OffOp({
      targets,
      scope: options.scope,
      timestamp: new Date().toISOString(),
      snapshot: snapshotBefore,
      generatedRouters: routersBefore,
    }))
    if (history.entries.length > config.skills.historyLimit) {
      history.entries.splice(0, history.entries.length - config.skills.historyLimit)
    }
    updatedState = Lib.setProjectHistory(updatedState, options.scope, history)
    yield* Lib.saveState(updatedState)

    // Report results
    yield* Lib.reportBatch(batch, "off", (a) => a.colonName)
  })

/** Reset all pluggable skills at the given scope. */
const resetAll = (dir: string, scope: Lib.Scope) =>
  Effect.gen(function* () {
    const state = yield* Lib.loadState()
    const config = yield* Lib.loadConfig()
    const snapshotBefore = yield* Lib.snapshotOutfit(scope)
    const routersBefore = yield* Lib.detectGeneratedRouters(scope)

    const outfit = yield* Lib.listOutfit(scope)
    let removed = 0
    let coreSkipped = 0

    for (const entry of outfit) {
      if (entry.commitment === "pluggable") {
        yield* Effect.tryPromise(() => unlink(path.join(dir, entry.name))).pipe(
          Effect.catchAll(() => Effect.void),
        )
        removed++
      } else {
        coreSkipped++
      }
    }

    // Cleanup all generated routers
    const routers = yield* Lib.detectGeneratedRouters(scope)
    for (const router of routers) {
      yield* Effect.tryPromise(() => rm(path.join(dir, router), { recursive: true })).pipe(
        Effect.catchAll(() => Effect.void),
      )
    }

    // Clear current installs for this scope
    const updatedStateAfterClear = Lib.setCurrentInstalls(state, scope, [])

    // Record history
    const history = Lib.getProjectHistory(updatedStateAfterClear, scope)
    if (history.undoneCount > 0) {
      history.entries.splice(history.entries.length - history.undoneCount)
      history.undoneCount = 0
    }
    history.entries.push(Lib.OffOp({
      targets: [],
      scope,
      timestamp: new Date().toISOString(),
      snapshot: snapshotBefore,
      generatedRouters: routersBefore,
    }))
    if (history.entries.length > config.skills.historyLimit) {
      history.entries.splice(0, history.entries.length - config.skills.historyLimit)
    }
    const newState = Lib.setProjectHistory(updatedStateAfterClear, scope, history)
    yield* Lib.saveState(newState)

    yield* Console.log(`Reset: ${removed} pluggable skills turned off (${coreSkipped} core skills untouched)`)
  })

/** Remove an auto-generated router directory if it exists. */
const cleanupRouter = (outfitDir: string, groupName: string, scope: Lib.Scope) =>
  Effect.gen(function* () {
    const routerPath = path.join(outfitDir, groupName)
    const stat = yield* Effect.tryPromise(() => lstat(routerPath)).pipe(
      Effect.catchAll(() => Effect.succeed(null)),
    )
    if (!stat) return

    // Only remove if it's a real directory (not a symlink = not core)
    // AND it corresponds to a group in one of the libraries
    if (stat.isDirectory() && !stat.isSymbolicLink()) {
      for (const libDir of Lib.librarySearchOrder(scope)) {
        const libPath = path.join(libDir, groupName)
        const libExists = yield* Effect.tryPromise(async () => {
          const s = await lstat(libPath)
          return s.isDirectory()
        }).pipe(Effect.catchAll(() => Effect.succeed(false)))

        if (libExists) {
          const nodeType = yield* Lib.getNodeType(libPath)
          if (nodeType === "group" || nodeType === "callable-group") {
            yield* Effect.tryPromise(() => rm(routerPath, { recursive: true })).pipe(
              Effect.catchAll(() => Effect.void),
            )
            return
          }
        }
      }
    }
  })
