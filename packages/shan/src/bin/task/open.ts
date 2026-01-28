/**
 * shan task open — Open task lists or tasks in the editor.
 *
 * Target is a list directory or a single task JSON file.
 * Uses $EDITOR (defaults to "zed") to open.
 */

import { Console, Effect } from "effect"
import { resolveTarget, type ResolveOptions } from "../../lib/task-resolver.js"
import { pickTask, type PickTaskOptions } from "../../lib/task-picker.js"

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

export interface OpenOptions extends ResolveOptions, PickTaskOptions {}

export const taskOpen = (input: string | undefined, options: OpenOptions = {}) =>
  Effect.gen(function* () {
    const target = input
      ? yield* resolveTarget(input, options)
      : yield* pickTask(options)

    const editor = process.env["EDITOR"] ?? "zed"
    const editorTarget = target.kind === "task" ? target.taskPath! : target.listPath

    yield* Console.log(`Opening: ${editorTarget}`)

    const proc = Bun.spawn([editor, editorTarget], {
      stdout: "inherit",
      stderr: "inherit",
    })

    yield* Effect.promise(() => proc.exited)
  })
