/**
 * shan skills undo [N] — Undo the last N operations (default 1).
 *
 * Restores the outfit to the snapshot taken before each operation.
 * For composite MoveOp entries, executes the reverse move.
 */

import { Console, Effect } from "effect"
import * as path from "node:path"
import { mkdir, rename, symlink, unlink } from "node:fs/promises"
import * as Lib from "../../lib/skill-library.js"

export const skillsUndo = (n: number, scope: Lib.Scope) =>
  Effect.gen(function* () {
    const state = yield* Lib.loadState()
    const history = Lib.getProjectHistory(state, scope)

    const activeCount = history.entries.length - history.undoneCount
    if (activeCount === 0) {
      yield* Console.log("Nothing to undo.")
      return
    }

    const undoCount = Math.min(n, activeCount)

    yield* Console.log(`Undoing ${undoCount} operation${undoCount > 1 ? "s" : ""}...`)

    // Process entries from most recent to oldest
    for (let i = activeCount - 1; i >= activeCount - undoCount; i--) {
      const entry = history.entries[i]!
      yield* undoEntry(entry, scope)
    }

    // Update undo pointer
    history.undoneCount += undoCount
    const newState = Lib.setProjectHistory(state, scope, history)
    yield* Lib.saveState(newState)

    yield* Console.log(`Restored outfit to ${undoCount} operation${undoCount > 1 ? "s" : ""} ago.`)
  })

/** Undo a single history entry. */
const undoEntry = (entry: Lib.HistoryEntry, scope: Lib.Scope): Effect.Effect<void, unknown> => {
  if (entry._tag === "OnOp" || entry._tag === "OffOp") {
    return Lib.restoreSnapshot(entry.snapshot, entry.generatedRouters, scope)
  }
  if (entry._tag === "MoveOp") {
    return undoMoveOp(entry)
  }
  return Console.error(`  warn: undo for ${entry._tag} not yet implemented`)
}

/** Undo a composite MoveOp by reversing sub-actions in reverse order. */
const undoMoveOp = (entry: Lib.HistoryEntry & { readonly _tag: "MoveOp" }) =>
  Effect.gen(function* () {
    const subActions = [...entry.subActions].reverse()
    for (const sub of subActions) {
      yield* undoSubAction(sub)
    }
  })

/** Resolve a scope key from a sub-action to the actual outfit directory. */
const resolveOutfitDir = (scopeKey: string): string =>
  scopeKey === "user" || scopeKey === "global"
    ? Lib.outfitDir("user")
    : scopeKey === "project"
      ? Lib.outfitDir("project")
      : path.join(scopeKey, ".claude/skills")

/** Resolve a scope key to a Lib.Scope for library search order. */
const resolveLibScope = (scopeKey: string): Lib.Scope =>
  scopeKey === "user" || scopeKey === "global" ? "user" : "project"

/** Reverse a single sub-action from a composite move. */
const undoSubAction = (sub: Lib.HistoryEntry): Effect.Effect<void, unknown> => {
  // Filesystem moves: swap src and dest
  if (sub._tag === "MoveDirOp" || sub._tag === "MoveLibraryDirOp" || sub._tag === "MoveToLibraryOp") {
    return Effect.gen(function* () {
      yield* Effect.tryPromise(() => mkdir(path.dirname(sub.sourcePath), { recursive: true }))
      yield* Effect.tryPromise(() => rename(sub.destPath, sub.sourcePath))
    })
  }
  // CopyToOutfitOp: remove the copied outfit directory
  if (sub._tag === "CopyToOutfitOp") {
    return Effect.gen(function* () {
      const { rm } = yield* Effect.tryPromise(() => import("node:fs/promises"))
      yield* Effect.tryPromise(() => rm(sub.destPath, { recursive: true, force: true }))
    })
  }
  // OnOp (install): reverse = remove the symlink
  if (sub._tag === "OnOp") {
    return Effect.gen(function* () {
      for (const target of sub.targets) {
        const flatName = Lib.flattenName(Lib.colonToPath(target))
        const outfitDir = resolveOutfitDir(sub.scope)
        const linkPath = path.join(outfitDir, flatName)
        yield* Effect.tryPromise(() => unlink(linkPath)).pipe(Effect.catchAll(() => Effect.void))
      }
    })
  }
  // OffOp (uninstall): reverse = recreate the symlink
  if (sub._tag === "OffOp") {
    return Effect.gen(function* () {
      for (const target of sub.targets) {
        const flatName = Lib.flattenName(Lib.colonToPath(target))
        const relPath = Lib.colonToPath(target)
        const outfitDir = resolveOutfitDir(sub.scope)
        const linkPath = path.join(outfitDir, flatName)
        const libraryDirs = Lib.librarySearchOrder(resolveLibScope(sub.scope))
        for (const libDir of libraryDirs) {
          const libPath = path.join(libDir, relPath)
          const exists = yield* Effect.tryPromise(async () => {
            const { lstat } = await import("node:fs/promises")
            const s = await lstat(libPath)
            return s.isDirectory()
          }).pipe(Effect.catchAll(() => Effect.succeed(false)))
          if (exists) {
            yield* Effect.tryPromise(() => mkdir(path.dirname(linkPath), { recursive: true }))
            yield* Effect.tryPromise(() => symlink(libPath, linkPath)).pipe(Effect.catchAll(() => Effect.void))
            break
          }
        }
      }
    })
  }
  return Console.error(`  warn: undo for sub-action ${sub._tag} not yet implemented`)
}
