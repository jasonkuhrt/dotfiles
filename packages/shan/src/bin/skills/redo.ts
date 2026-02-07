/**
 * shan skills redo [N] — Redo the last N undone operations (default 1).
 *
 * Restores the outfit to the state after each re-applied operation.
 * For composite MoveOp entries, replays sub-actions in forward order.
 */

import { Console, Effect } from "effect"
import * as path from "node:path"
import { cp, mkdir, rename, symlink, unlink } from "node:fs/promises"
import * as Lib from "../../lib/skill-library.js"
import { skillsOn } from "./on.js"
import { skillsOff } from "./off.js"

/** Check if an entry supports snapshot-based undo/redo. */
const hasSnapshot = (entry: Lib.HistoryEntry): entry is Lib.HistoryEntry & { readonly snapshot: ReadonlyArray<string>; readonly generatedRouters: ReadonlyArray<string> } =>
  entry._tag === "OnOp" || entry._tag === "OffOp"

export const skillsRedo = (n: number, scope: Lib.Scope) =>
  Effect.gen(function* () {
    const state = yield* Lib.loadState()
    const history = Lib.getProjectHistory(state, scope)

    if (history.undoneCount === 0) {
      yield* Console.log("Nothing to redo.")
      return
    }

    const redoCount = Math.min(n, history.undoneCount)
    const activeCount = history.entries.length - history.undoneCount

    yield* Console.log(`Redoing ${redoCount} operation${redoCount > 1 ? "s" : ""}...`)

    // Process entries from oldest undone to newest
    for (let i = activeCount; i < activeCount + redoCount; i++) {
      const entry = history.entries[i]!
      yield* redoEntry(entry, scope)
    }

    // Update undo pointer
    history.undoneCount -= redoCount
    const newState = Lib.setProjectHistory(state, scope, history)
    yield* Lib.saveState(newState)

    yield* Console.log(`Redone ${redoCount} operation${redoCount > 1 ? "s" : ""}.`)
  })

/** Redo a single history entry. */
const redoEntry = (entry: Lib.HistoryEntry, scope: Lib.Scope): Effect.Effect<void, unknown> => {
  if (hasSnapshot(entry)) {
    // For on/off, we need the NEXT entry's snapshot (state after this op)
    // But since we don't have easy access to it here, replay the operation instead
    return replayEntry(entry, scope)
  }
  if (entry._tag === "MoveOp") {
    return redoMoveOp(entry)
  }
  return Console.error(`  warn: redo for ${entry._tag} not yet implemented`)
}

/** Replay a history entry by re-executing its operation. */
const replayEntry = (entry: Lib.HistoryEntry, scope: Lib.Scope): Effect.Effect<void, unknown> => {
  if (entry._tag === "OnOp") {
    return entry.targets.length > 0
      ? skillsOn(entry.targets.join(","), { scope, strict: false })
      : Effect.void
  }
  if (entry._tag === "OffOp") {
    return skillsOff(entry.targets.join(","), { scope, strict: false })
  }
  return Console.error(`  warn: redo replay for ${entry._tag} not yet implemented`)
}

/** Redo a composite MoveOp by replaying sub-actions in forward order. */
const redoMoveOp = (entry: Lib.HistoryEntry & { readonly _tag: "MoveOp" }) =>
  Effect.gen(function* () {
    for (const sub of entry.subActions) {
      yield* replaySubAction(sub)
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

/** Replay a single sub-action from a composite move. */
const replaySubAction = (sub: Lib.HistoryEntry): Effect.Effect<void, unknown> => {
  // Filesystem moves: execute the original move
  if (sub._tag === "MoveDirOp" || sub._tag === "MoveLibraryDirOp" || sub._tag === "MoveToLibraryOp") {
    return Effect.gen(function* () {
      yield* Effect.tryPromise(() => mkdir(path.dirname(sub.destPath), { recursive: true }))
      yield* Effect.tryPromise(() => rename(sub.sourcePath, sub.destPath))
    })
  }
  // CopyToOutfitOp: copy library to outfit
  if (sub._tag === "CopyToOutfitOp") {
    return Effect.gen(function* () {
      yield* Effect.tryPromise(() => mkdir(path.dirname(sub.destPath), { recursive: true }))
      yield* Effect.tryPromise(() => cp(sub.sourcePath, sub.destPath, { recursive: true }))
    })
  }
  // OnOp: create symlinks
  if (sub._tag === "OnOp") {
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
  // OffOp: remove symlinks
  if (sub._tag === "OffOp") {
    return Effect.gen(function* () {
      for (const target of sub.targets) {
        const flatName = Lib.flattenName(Lib.colonToPath(target))
        const outfitDir = resolveOutfitDir(sub.scope)
        const linkPath = path.join(outfitDir, flatName)
        yield* Effect.tryPromise(() => unlink(linkPath)).pipe(Effect.catchAll(() => Effect.void))
      }
    })
  }
  return Console.error(`  warn: redo for sub-action ${sub._tag} not yet implemented`)
}
