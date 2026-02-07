/**
 * Migration: ~/.claude/skill-inventory/ (flat) → ~/.claude/skills-library/ (hierarchical)
 *
 * Algorithm:
 * 1. Split name on first underscore: ts_tooling → group "ts", leaf "tooling"
 * 2. Names without underscores stay at root: git → skills-library/git/
 * 3. Names with underscores become nested: cc_authoring → skills-library/cc/authoring/
 * 4. Update all symlinks in ~/.claude/skills/ to point to new locations
 * 5. Delete skill-inventory/ and skill-loadouts.yml after migration
 *
 * Special cases handled during migration:
 * - Symlinks with custom target names (e.g. cc_tips → tips, gdrive → uploading-to-gdrive)
 *   are resolved using the actual inventory directory name
 * - Existing real directories in skills/ (core skills) are untouched
 */

import { Console, Effect } from "effect"
import { lstat, mkdir, readdir, readlink, rename, rm, symlink, unlink } from "node:fs/promises"
import { homedir } from "node:os"
import * as path from "node:path"
import * as Lib from "../../lib/skill-library.js"

const OLD_INVENTORY_DIR = path.join(homedir(), ".claude/skill-inventory")
const OLD_LOADOUTS_FILE = path.join(homedir(), ".claude/skill-loadouts.yml")

interface MigrationPlan {
  moves: Array<{
    oldName: string // name in skill-inventory/
    newRelPath: string // path in skills-library/ (e.g. "cc/authoring")
    oldPath: string
    newPath: string
  }>
  symlinkUpdates: Array<{
    symlinkName: string // name in skills/ outfit
    oldTarget: string
    newTarget: string
    symlinkPath: string
  }>
  deletes: string[] // files/dirs to delete after migration
}

/**
 * Split an inventory name on the first underscore to determine hierarchy.
 * Names without underscores stay at root.
 */
const splitName = (name: string): { group: string | null; leaf: string } => {
  const idx = name.indexOf("_")
  if (idx === -1) return { group: null, leaf: name }
  return { group: name.slice(0, idx), leaf: name.slice(idx + 1) }
}

export const skillsMigrate = (options: { execute: boolean }) =>
  Effect.gen(function* () {
    // Check old inventory exists
    const oldExists = yield* Effect.tryPromise(async () => {
      const stat = await lstat(OLD_INVENTORY_DIR)
      return stat.isDirectory()
    }).pipe(Effect.catchAll(() => Effect.succeed(false)))

    if (!oldExists) {
      yield* Console.error(`Old inventory not found: ${OLD_INVENTORY_DIR}`)
      yield* Console.error("Nothing to migrate.")
      return yield* Effect.fail(new Error("Nothing to migrate"))
    }

    // Check new library doesn't already exist
    const newExists = yield* Lib.libraryExists()
    if (newExists) {
      yield* Console.error(`Library already exists: ${Lib.LIBRARY_DIR}`)
      yield* Console.error("Migration already complete, or clean up first.")
      return yield* Effect.fail(new Error("Library already exists"))
    }

    // Build migration plan
    const plan = yield* buildPlan()

    if (!options.execute) {
      yield* printPlan(plan)
      yield* Console.log("")
      yield* Console.log("Run with --execute to perform the migration.")
      return
    }

    yield* executePlan(plan)
  })

const buildPlan = () =>
  Effect.gen(function* () {
    const entries = yield* Effect.tryPromise(() => readdir(OLD_INVENTORY_DIR))
    const plan: MigrationPlan = { moves: [], symlinkUpdates: [], deletes: [] }

    // Plan moves
    for (const name of entries.sort()) {
      const oldPath = path.join(OLD_INVENTORY_DIR, name)
      const stat = yield* Effect.tryPromise(() => lstat(oldPath))
      if (!stat.isDirectory()) continue

      const { group, leaf } = splitName(name)
      const newRelPath = group ? `${group}/${leaf}` : leaf
      const newPath = path.join(Lib.LIBRARY_DIR, newRelPath)

      plan.moves.push({ oldName: name, newRelPath, oldPath, newPath })
    }

    // Plan symlink updates
    const skillsEntries = yield* Effect.tryPromise(() => readdir(Lib.USER_OUTFIT_DIR)).pipe(
      Effect.catchAll(() => Effect.succeed([] as string[])),
    )

    for (const name of skillsEntries.sort()) {
      const symlinkPath = path.join(Lib.USER_OUTFIT_DIR, name)
      const stat = yield* Effect.tryPromise(() => lstat(symlinkPath))
      if (!stat.isSymbolicLink()) continue

      const oldTarget = yield* Effect.tryPromise(() => readlink(symlinkPath)).pipe(
        Effect.catchAll(() => Effect.succeed("")),
      )
      if (!oldTarget.includes("skill-inventory")) continue

      // Figure out which inventory item this symlink points to
      const inventoryName = path.basename(oldTarget)
      const move = plan.moves.find((m) => m.oldName === inventoryName)
      if (!move) continue

      plan.symlinkUpdates.push({
        symlinkName: name,
        oldTarget,
        newTarget: move.newPath,
        symlinkPath,
      })
    }

    // Plan deletes
    plan.deletes.push(OLD_INVENTORY_DIR)

    const loadoutsExist = yield* Effect.tryPromise(async () => {
      const stat = await lstat(OLD_LOADOUTS_FILE)
      return stat.isFile()
    }).pipe(Effect.catchAll(() => Effect.succeed(false)))
    if (loadoutsExist) {
      plan.deletes.push(OLD_LOADOUTS_FILE)
    }

    return plan
  })

const printPlan = (plan: MigrationPlan) =>
  Effect.gen(function* () {
    yield* Console.log("Migration Plan (dry run)")
    yield* Console.log("═".repeat(50))
    yield* Console.log("")

    // Group moves by group
    const groups = new Map<string, string[]>()
    const standalone: string[] = []
    for (const move of plan.moves) {
      const { group } = splitName(move.oldName)
      if (group) {
        const existing = groups.get(group) ?? []
        existing.push(move.newRelPath)
        groups.set(group, existing)
      } else {
        standalone.push(move.newRelPath)
      }
    }

    yield* Console.log(`Create: ${Lib.LIBRARY_DIR}`)
    yield* Console.log("")

    if (groups.size > 0) {
      yield* Console.log("Groups:")
      for (const [group, paths] of [...groups].sort()) {
        yield* Console.log(`  ${group}/`)
        for (const p of paths.sort()) {
          yield* Console.log(`    ${p}/`)
        }
      }
      yield* Console.log("")
    }

    if (standalone.length > 0) {
      yield* Console.log("Standalone:")
      for (const p of standalone.sort()) {
        yield* Console.log(`  ${p}/`)
      }
      yield* Console.log("")
    }

    yield* Console.log(`Symlinks to update: ${plan.symlinkUpdates.length}`)
    yield* Console.log(`Items to delete: ${plan.deletes.join(", ")}`)
    yield* Console.log("")
    yield* Console.log(`Total: ${plan.moves.length} skills migrated`)
  })

const executePlan = (plan: MigrationPlan) =>
  Effect.gen(function* () {
    yield* Console.log("Migrating skill inventory to hierarchical library...")
    yield* Console.log("")

    // 1. Create library directory
    yield* Effect.tryPromise(() => mkdir(Lib.LIBRARY_DIR, { recursive: true }))

    // 2. Create group directories and move skills
    const groupDirs = new Set<string>()
    for (const move of plan.moves) {
      const parentDir = path.dirname(move.newPath)
      if (!groupDirs.has(parentDir)) {
        yield* Effect.tryPromise(() => mkdir(parentDir, { recursive: true }))
        groupDirs.add(parentDir)
      }
      yield* Effect.tryPromise(() => rename(move.oldPath, move.newPath))
      yield* Console.log(`  move: ${move.oldName} → ${move.newRelPath}/`)
    }

    // 3. Update symlinks
    yield* Console.log("")
    for (const update of plan.symlinkUpdates) {
      yield* Effect.tryPromise(() => unlink(update.symlinkPath)).pipe(
        Effect.catchAll(() => Effect.void),
      )
      yield* Effect.tryPromise(() => symlink(update.newTarget, update.symlinkPath))
      yield* Console.log(`  link: ${update.symlinkName} → ${update.newTarget}`)
    }

    // 4. Delete old files
    yield* Console.log("")
    for (const toDelete of plan.deletes) {
      yield* Effect.tryPromise(() => rm(toDelete, { recursive: true })).pipe(
        Effect.catchAll(() => Effect.void),
      )
      yield* Console.log(`  delete: ${toDelete}`)
    }

    yield* Console.log("")
    yield* Console.log(`Migrated ${plan.moves.length} skills to ${Lib.LIBRARY_DIR}`)
    yield* Console.log("")
    yield* Console.log("Run 'shan skills doctor' to verify the migration.")
  })
