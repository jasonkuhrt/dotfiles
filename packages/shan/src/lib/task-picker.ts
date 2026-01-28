/**
 * Interactive task picker — flat grouped Clack TUI for selecting task lists or tasks.
 *
 * Shows all tasks across in-scope lists, grouped by list name.
 * Status icons: ● in_progress, ◌ pending, ✓ completed.
 * Sort: in_progress → pending → completed (most recent first).
 * Freshness: show open + completed within 24h.
 */

import * as Clack from "@clack/prompts"
import { Effect, Schema } from "effect"
import { join } from "node:path"
import { readdir, stat } from "node:fs/promises"
import { type TaskListInfo, discoverTaskLists, type ResolveOptions } from "./task-resolver.js"
import { Task, type TaskStatus } from "./task-schema.js"

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface LoadedTask {
  task: typeof Task.Type
  filePath: string
  mtime: Date
}

interface TaskGroup {
  list: TaskListInfo
  tasks: LoadedTask[]
}

export interface PickerResult {
  kind: "list" | "task"
  listPath: string
  listId: string
  taskPath?: string
  taskNum?: string
}

export interface PickTaskOptions extends ResolveOptions {}

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const STATUS_ICON: Record<TaskStatus, string> = {
  in_progress: "●",
  pending: "◌",
  completed: "✓",
  deleted: "✗",
}

const STATUS_ORDER: Record<TaskStatus, number> = {
  in_progress: 0,
  pending: 1,
  completed: 2,
  deleted: 3,
}

const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000

// ANSI escape codes
const DIM = "\x1b[2m"
const RESET = "\x1b[0m"

// -----------------------------------------------------------------------------
// Loading
// -----------------------------------------------------------------------------

/**
 * Load all tasks from a list directory, applying freshness filtering.
 */
const loadTasks = async (list: TaskListInfo): Promise<LoadedTask[]> => {
  const now = Date.now()
  const tasks: LoadedTask[] = []

  let files: string[]
  try {
    files = (await readdir(list.path)).filter((f) => f.endsWith(".json"))
  } catch {
    return []
  }

  for (const file of files) {
    const filePath = join(list.path, file)
    try {
      const raw = await Bun.file(filePath).json()
      const decoded = Schema.decodeUnknownOption(Task)(raw)
      if (decoded._tag === "None") continue

      const mtime = (await stat(filePath)).mtime

      const task = decoded.value

      // Freshness: show open tasks + completed within 24h
      if (task.status === "completed" && now - mtime.getTime() > TWENTY_FOUR_HOURS) {
        continue
      }
      // Skip deleted tasks
      if (task.status === "deleted") continue

      tasks.push({ task, filePath, mtime })
    } catch {
      continue
    }
  }

  // Sort: in_progress → pending → completed, then by mtime (recent first)
  tasks.sort((a, b) => {
    const statusDiff = STATUS_ORDER[a.task.status] - STATUS_ORDER[b.task.status]
    if (statusDiff !== 0) return statusDiff
    return b.mtime.getTime() - a.mtime.getTime()
  })

  return tasks
}

// -----------------------------------------------------------------------------
// TTY Detection
// -----------------------------------------------------------------------------

const isTTY = (): boolean => Boolean(process.stdin.isTTY && process.stdout.isTTY)

// -----------------------------------------------------------------------------
// Formatting
// -----------------------------------------------------------------------------

const formatListHeader = (list: TaskListInfo): string => {
  const idDisplay = list.isSession ? list.id.slice(0, 8) + "…" : list.id
  return `${idDisplay} ${DIM}(${list.taskCount} tasks)${RESET}`
}

const formatTaskLabel = (task: LoadedTask): string => {
  const icon = STATUS_ICON[task.task.status]
  const id = `#${task.task.id}`
  const subject = task.task.subject.length > 60
    ? task.task.subject.slice(0, 57) + "…"
    : task.task.subject

  const blockedSuffix = task.task.blockedBy.length > 0
    ? `  ${DIM}(blocked: ${task.task.blockedBy.map((b) => `#${b}`).join(", ")})${RESET}`
    : ""

  return `  ${icon} ${id.padEnd(4)} ${subject}${blockedSuffix}`
}

// -----------------------------------------------------------------------------
// Public API
// -----------------------------------------------------------------------------

/**
 * Show an interactive task picker.
 *
 * Requires TTY — fails with helpful error if not available.
 * Returns a PickerResult pointing at either a list directory or a specific task file.
 */
export const pickTask = (options: PickTaskOptions = {}) =>
  Effect.gen(function* () {
    if (!isTTY()) {
      return yield* Effect.fail(
        new Error(
          "Interactive task picker requires a TTY.\n" +
            "Provide a target explicitly: shan task <command> <list>[@<task>]",
        ),
      )
    }

    const lists = yield* Effect.promise(() => discoverTaskLists(options))

    if (lists.length === 0) {
      const hint = options.all
        ? "No task lists found in ~/.claude/tasks/"
        : "No task lists found for this project.\nUse --all to show all task lists."
      return yield* Effect.fail(new Error(hint))
    }

    // Load tasks for each list
    const groups: TaskGroup[] = []
    for (const list of lists) {
      const tasks = yield* Effect.promise(() => loadTasks(list))
      if (tasks.length > 0) {
        groups.push({ list, tasks })
      }
    }

    if (groups.length === 0) {
      return yield* Effect.fail(new Error("No active tasks found (all completed or deleted)."))
    }

    // Build flat option list: list headers (selectable) + task entries (selectable)
    type OptionValue = { kind: "list"; list: TaskListInfo } | { kind: "task"; task: LoadedTask; list: TaskListInfo }

    const selectOptions: { value: OptionValue; label: string; hint?: string }[] = []

    for (const group of groups) {
      // List-level entry (selectable — selects the whole list)
      selectOptions.push({
        value: { kind: "list", list: group.list },
        label: `▸ [${formatListHeader(group.list)}]`,
        hint: "entire list",
      })

      // Individual task entries
      for (const task of group.tasks) {
        selectOptions.push({
          value: { kind: "task", task, list: group.list },
          label: formatTaskLabel(task),
        })
      }
    }

    const selected = yield* Effect.promise(() =>
      Clack.select({
        message: "Select a task or list:",
        options: selectOptions as any,
        maxItems: 15,
      }),
    )

    if (Clack.isCancel(selected)) {
      return yield* Effect.fail(new Error("Selection cancelled"))
    }

    const choice = selected as OptionValue

    if (choice.kind === "list") {
      return {
        kind: "list" as const,
        listPath: choice.list.path,
        listId: choice.list.id,
      }
    }

    return {
      kind: "task" as const,
      listPath: choice.list.path,
      listId: choice.list.id,
      taskPath: choice.task.filePath,
      taskNum: choice.task.task.id,
    }
  })
