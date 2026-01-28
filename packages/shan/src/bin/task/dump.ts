/**
 * shan task dump — Copy task lists or tasks into the project's .claude/tasks/ directory.
 *
 * Modes:
 *   Default: Copy raw JSON files
 *   --md:    Convert each task JSON to formatted Markdown
 */

import { Console, Effect, Schema } from "effect"
import { join } from "node:path"
import { mkdir, readdir } from "node:fs/promises"
import { resolveTarget, type ResolveOptions } from "../../lib/task-resolver.js"
import { pickTask, type PickTaskOptions } from "../../lib/task-picker.js"
import { Task } from "../../lib/task-schema.js"

// -----------------------------------------------------------------------------
// Markdown conversion
// -----------------------------------------------------------------------------

const statusLabel = (status: string): string => {
  switch (status) {
    case "in_progress":
      return "🔵 In Progress"
    case "pending":
      return "⚪ Pending"
    case "completed":
      return "✅ Completed"
    case "deleted":
      return "❌ Deleted"
    default:
      return status
  }
}

const taskToMarkdown = (task: typeof Task.Type): string => {
  const lines: string[] = []

  lines.push(`# #${task.id} — ${task.subject}`)
  lines.push("")
  lines.push(`**Status:** ${statusLabel(task.status)}`)

  if (task.activeForm) {
    lines.push(`**Active Form:** ${task.activeForm}`)
  }

  if (task.blocks.length > 0) {
    lines.push(`**Blocks:** ${task.blocks.map((b) => `#${b}`).join(", ")}`)
  }

  if (task.blockedBy.length > 0) {
    lines.push(`**Blocked By:** ${task.blockedBy.map((b) => `#${b}`).join(", ")}`)
  }

  if (task.owner) {
    lines.push(`**Owner:** ${task.owner}`)
  }

  lines.push("")
  lines.push("## Description")
  lines.push("")
  lines.push(task.description)
  lines.push("")

  return lines.join("\n")
}

// -----------------------------------------------------------------------------
// Copy helpers
// -----------------------------------------------------------------------------

const copyTaskFile = (srcPath: string, destPath: string, md: boolean) =>
  Effect.gen(function* () {
    const raw = yield* Effect.promise(() => Bun.file(srcPath).json())

    if (md) {
      const decoded = Schema.decodeUnknownOption(Task)(raw)
      if (decoded._tag === "None") {
        yield* Console.warn(`Skipping invalid task: ${srcPath}`)
        return 0
      }
      const markdown = taskToMarkdown(decoded.value)
      const mdPath = destPath.replace(/\.json$/, ".md")
      yield* Effect.promise(() => Bun.write(mdPath, markdown))
      return 1
    }

    const json = JSON.stringify(raw, null, 2)
    yield* Effect.promise(() => Bun.write(destPath, json))
    return 1
  })

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

export interface DumpOptions extends ResolveOptions, PickTaskOptions {
  md?: boolean
}

export const taskDump = (input: string | undefined, options: DumpOptions = {}) =>
  Effect.gen(function* () {
    const target = input
      ? yield* resolveTarget(input, options)
      : yield* pickTask(options)

    // Output to project's .claude/tasks/<listId>/
    const outputDir = join(process.cwd(), ".claude", "tasks", target.listId)
    yield* Effect.promise(() => mkdir(outputDir, { recursive: true }))

    if (target.kind === "task") {
      // Single task
      const destFile = options.md
        ? `${target.taskNum}.md`
        : `${target.taskNum}.json`
      const destPath = join(outputDir, destFile)

      yield* Console.log(`Copying: ${target.taskPath}`)
      const count = yield* copyTaskFile(target.taskPath!, destPath, options.md ?? false)
      if (count > 0) {
        yield* Console.log(`Wrote: ${destPath}`)
      }
    } else {
      // Entire list — copy all JSON files
      const files = yield* Effect.promise(async () => {
        try {
          return (await readdir(target.listPath)).filter((f) => f.endsWith(".json"))
        } catch {
          return [] as string[]
        }
      })

      if (files.length === 0) {
        yield* Console.log("No task files found in list.")
        return
      }

      yield* Console.log(`Copying ${files.length} tasks from ${target.listId}`)

      let total = 0
      for (const file of files) {
        const srcPath = join(target.listPath, file)
        const destFile = options.md ? file.replace(/\.json$/, ".md") : file
        const destPath = join(outputDir, destFile)
        const count = yield* copyTaskFile(srcPath, destPath, options.md ?? false)
        total += count
      }

      yield* Console.log(`Wrote: ${outputDir} (${total} tasks)`)
    }
  })
