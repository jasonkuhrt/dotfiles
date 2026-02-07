/**
 * shan skills history — Show the operation log for the current scope.
 */

import { Console, Effect } from "effect"
import * as Lib from "../../lib/skill-library.js"

export const skillsHistory = (scope: Lib.Scope) =>
  Effect.gen(function* () {
    const state = yield* Lib.loadState()
    const history = Lib.getProjectHistory(state, scope)

    if (history.entries.length === 0) {
      yield* Console.log("No history.")
      return
    }

    const activeCount = history.entries.length - history.undoneCount

    // Table header
    yield* Console.log(`#   Op     Targets               Scope      Time`)
    yield* Console.log(`${"─".repeat(60)}`)

    for (let i = 0; i < history.entries.length; i++) {
      const entry = history.entries[i]!
      const isUndone = i >= activeCount
      const num = String(i + 1).padEnd(4)
      const opLabel: Record<string, string> = {
        OnOp: "on", OffOp: "off", MoveOp: "move",
        CopyToOutfitOp: "cp-out", MoveToLibraryOp: "mv-lib",
        MoveDirOp: "mv-dir", MoveLibraryDirOp: "mv-ldir", DoctorOp: "doctor",
      }
      const op = (opLabel[entry._tag] ?? entry._tag).padEnd(7)
      const targets = (entry.targets.length > 0 ? entry.targets.join(",") : "(all)").padEnd(22)
      const scopeStr = entry.scope.padEnd(11)
      const time = formatRelativeTime(entry.timestamp)
      const undoneMarker = isUndone ? " (undone)" : ""
      yield* Console.log(`${num}${op}${targets}${scopeStr}${time}${undoneMarker}`)
    }
  })

const formatRelativeTime = (iso: string): string => {
  const now = Date.now()
  const then = new Date(iso).getTime()
  const diffMs = now - then
  const diffMin = Math.floor(diffMs / 60_000)
  const diffHr = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHr / 24)

  if (diffMin < 1) return "just now"
  if (diffMin < 60) return `${diffMin} min ago`
  if (diffHr < 24) return `${diffHr} hr ago`
  return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`
}
