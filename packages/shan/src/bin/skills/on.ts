/**
 * shan skills on <targets> [--scope user] [--strict]
 *
 * Turn on one or more skills or groups. Creates symlinks in outfit → library.
 * Two-phase execution: validate all targets first, abort on any error, then execute.
 */

import { Console, Effect } from "effect"
import { lstat, mkdir, symlink, writeFile } from "node:fs/promises"
import * as path from "node:path"
import * as Lib from "../../lib/skill-library.js"

export interface SkillsOnOptions {
  readonly scope: Lib.Scope
  readonly strict: boolean
}

/** Validated install action ready for Phase 2. */
interface ValidatedInstall {
  readonly flatName: string
  readonly colonName: string
  readonly libraryPath: string
  readonly linkPath: string
}

/** Validated router generation action ready for Phase 2. */
interface ValidatedRouter {
  readonly groupName: string
  readonly routerPath: string
  readonly leaves: Lib.SkillInfo[]
}

export const skillsOn = (targetInput: string, options: SkillsOnOptions) =>
  Effect.gen(function* () {
    if (!targetInput) {
      yield* Console.error("Usage: shan skills on <targets> [--scope user] [--strict]")
      yield* Console.error("  Targets: comma-separated skill/group names using colon syntax")
      yield* Console.error("  Example: shan skills on ts:tooling,playwright,linear")
      return yield* Effect.fail(new Error("Missing targets"))
    }

    const exists = yield* Lib.libraryExists(options.scope)
    if (!exists) {
      yield* Console.error("No skills library found. Run the migration first to create one.")
      return yield* Effect.fail(new Error("Library not found"))
    }

    const targets = Lib.parseTargets(targetInput)
    const dir = Lib.outfitDir(options.scope)

    // Ensure outfit directory exists
    yield* Effect.tryPromise(() => mkdir(dir, { recursive: true }))

    // ── Phase 1: Validate all targets (no side effects) ─────────────

    const batch = Lib.emptyBatch<ValidatedInstall>()
    const routerActions: ValidatedRouter[] = []
    const groupsToRoute = new Map<string, string>() // groupName → libraryDir

    for (const target of targets) {
      const resolved = yield* Lib.resolveTarget(target, options.scope)
      if (!resolved) {
        batch.errors.push({ name: target, reason: "not found in library" })
        continue
      }

      // Track top-level group for router generation (with its library dir)
      if (resolved.nodeType === "group" || resolved.nodeType === "callable-group") {
        const topGroup = target.split(":")[0]!
        if (topGroup === target || !target.includes(":")) {
          groupsToRoute.set(topGroup, resolved.libraryDir)
        }
      }

      for (const leaf of resolved.leaves) {
        const flatName = Lib.flattenName(leaf.libraryRelPath)

        // Check collision
        const collision = yield* Lib.checkCollision(flatName, options.scope)
        if (collision) {
          batch.errors.push({ name: leaf.colonName, reason: collision })
          continue
        }

        // Check if already on
        const linkPath = path.join(dir, flatName)
        const alreadyExists = yield* Effect.tryPromise(async () => {
          await lstat(linkPath)
          return true
        }).pipe(Effect.catchAll(() => Effect.succeed(false)))

        if (alreadyExists) {
          batch.skips.push({ name: leaf.colonName, reason: "already on" })
          continue
        }

        // Validated — ready for Phase 2
        batch.actions.push({
          flatName,
          colonName: leaf.colonName,
          libraryPath: path.join(leaf.libraryDir, leaf.libraryRelPath),
          linkPath,
        })
      }
    }

    // Validate routers
    for (const [groupName, groupLibDir] of groupsToRoute) {
      const groupLibPath = path.join(groupLibDir, groupName)
      const hasOwnSkillMd = yield* Effect.tryPromise(async () => {
        const stat = await lstat(path.join(groupLibPath, "SKILL.md"))
        return stat.isFile()
      }).pipe(Effect.catchAll(() => Effect.succeed(false)))

      if (hasOwnSkillMd) continue

      const collision = yield* Lib.checkCollision(groupName, options.scope)
      if (collision) continue

      const routerPath = path.join(dir, groupName)
      const routerExists = yield* Effect.tryPromise(async () => {
        await lstat(routerPath)
        return true
      }).pipe(Effect.catchAll(() => Effect.succeed(false)))

      if (routerExists) continue

      const leaves = yield* Lib.resolveLeaves(groupName, groupLibDir)
      routerActions.push({ groupName, routerPath, leaves })
    }

    // ── Abort check ─────────────────────────────────────────────────

    const toRow = (a: ValidatedInstall): Lib.ResultRow => ({
      status: "ok", name: a.colonName, scope: options.scope, commitment: "pluggable",
    })

    if (Lib.shouldAbort(batch, options.strict)) {
      yield* Lib.reportResults(Lib.batchToRows(batch, toRow, true))
      return yield* Effect.fail(new Error("Some targets failed"))
    }

    // ── Phase 2: Execute all mutations ──────────────────────────────

    // Snapshot before mutations
    const state = yield* Lib.loadState()
    const config = yield* Lib.loadConfig()
    const snapshotBefore = yield* Lib.snapshotOutfit(options.scope)
    const routersBefore = yield* Lib.detectGeneratedRouters(options.scope)

    const gitignoreEntries: string[] = []

    // Create symlinks
    for (const action of batch.actions) {
      yield* Effect.tryPromise(() => symlink(action.libraryPath, action.linkPath))
      if (options.scope === "project") {
        gitignoreEntries.push(`.claude/skills/${action.flatName}`)
      }
    }

    // Generate routers
    for (const router of routerActions) {
      const content = Lib.generateRouter(router.groupName, router.leaves)
      yield* Effect.tryPromise(() => mkdir(router.routerPath, { recursive: true }))
      yield* Effect.tryPromise(() => writeFile(path.join(router.routerPath, "SKILL.md"), content))
      if (options.scope === "project") {
        gitignoreEntries.push(`.claude/skills/${router.groupName}`)
      }
    }

    // Update gitignore
    if (gitignoreEntries.length > 0) {
      yield* Lib.manageGitignore(process.cwd(), gitignoreEntries)
    }

    // Update current state
    let updatedState = state
    for (const action of batch.actions) {
      updatedState = Lib.addCurrentInstall(updatedState, options.scope, action.flatName)
    }

    // Record history
    const history = Lib.getProjectHistory(updatedState, options.scope)
    if (history.undoneCount > 0) {
      history.entries.splice(history.entries.length - history.undoneCount)
      history.undoneCount = 0
    }
    history.entries.push(Lib.OnOp({
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
    yield* Lib.reportResults(Lib.batchToRows(batch, toRow))
  })
