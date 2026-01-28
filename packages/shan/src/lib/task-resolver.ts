/**
 * Task list and task resolution — maps user-provided targets to filesystem paths.
 *
 * Task lists live in ~/.claude/tasks/<list-id>/ where list-id is either:
 *   - A UUID matching a Claude Code session ID (session-scoped)
 *   - A named string (user-created, e.g. "test-schema")
 *
 * Target syntax: [<list>[@<task>]]
 *   - "test-schema"       → list by exact name
 *   - "21b0"              → list by UUID prefix
 *   - "test-schema@3"     → specific task in named list
 *   - "21b0@1"            → specific task in UUID-prefixed list
 *   - "@Scaffold"         → task by subject substring (searches in-scope lists)
 *
 * Project scoping: UUID lists are filtered to those matching session UUIDs
 * from ~/.claude/projects/<project-dir>/. Named lists are always included.
 * Use --all to include all lists regardless of project.
 */

import { Effect } from "effect"
import { homedir } from "node:os"
import { basename, join } from "node:path"
import { readdir, stat } from "node:fs/promises"
import { createHash } from "node:crypto"
import { Glob } from "bun"

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface TaskListInfo {
  /** Absolute path to the list directory */
  path: string
  /** List identifier (UUID or named string) */
  id: string
  /** Whether this is a UUID-based (session) list */
  isSession: boolean
  /** Directory modification time */
  mtime: Date
  /** Number of task JSON files */
  taskCount: number
}

export interface ResolvedTarget {
  /** "list" = entire task list dir, "task" = single task file */
  kind: "list" | "task"
  /** Absolute path to list directory */
  listPath: string
  /** List identifier */
  listId: string
  /** Absolute path to task file (only when kind === "task") */
  taskPath?: string
  /** Task number (only when kind === "task") */
  taskNum?: string
}

export interface ResolveOptions {
  /** If true, include all lists regardless of project scope */
  all?: boolean
}

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const tasksDir = () => join(homedir(), ".claude", "tasks")

// -----------------------------------------------------------------------------
// Discovery
// -----------------------------------------------------------------------------

/**
 * Get session UUIDs belonging to the current project.
 * Scans ~/.claude/projects/<project-dir>/ for .jsonl session files.
 */
const getProjectSessionIds = async (directory?: string): Promise<Set<string>> => {
  const cwd = directory ?? process.cwd()
  const projectDirName = cwd.replace(/[/.]/g, "-")
  const projectDir = join(homedir(), ".claude", "projects", projectDirName)
  const ids = new Set<string>()

  try {
    const glob = new Glob("*.jsonl")
    for await (const file of glob.scan({ cwd: projectDir, absolute: false })) {
      ids.add(basename(file).replace(/\.jsonl$/, ""))
    }
  } catch {
    // Directory doesn't exist — no sessions for this project
  }

  return ids
}

/**
 * Get the current session ID from tmp files (written by hooks).
 */
const getCurrentSessionId = async (): Promise<string | null> => {
  const cwd = process.cwd()
  const cwdHash = createHash("md5").update(cwd).digest("hex").slice(0, 8)

  const paths = [
    `/tmp/claude-session-id-${cwdHash}`,
    "/tmp/claude-session-id",
  ]

  for (const path of paths) {
    const file = Bun.file(path)
    if (await file.exists()) {
      const content = await file.text()
      const sessionId = content.trim()
      if (sessionId) return sessionId
    }
  }
  return null
}

/**
 * Discover all task lists, optionally scoped to the current project.
 *
 * Project scoping: UUID lists are included only if their UUID matches a
 * session from the current project's transcript directory. Named lists
 * are always included.
 */
export const discoverTaskLists = async (options: ResolveOptions = {}): Promise<TaskListInfo[]> => {
  const root = tasksDir()
  const lists: TaskListInfo[] = []

  let entries: string[]
  try {
    entries = await readdir(root)
  } catch {
    return []
  }

  // For project scoping, find which session UUIDs belong to this project
  const projectSessionIds = options.all ? null : await getProjectSessionIds()
  const currentSessionId = options.all ? null : await getCurrentSessionId()

  for (const entry of entries) {
    const entryPath = join(root, entry)

    let stats
    try {
      stats = await stat(entryPath)
    } catch {
      continue
    }
    if (!stats.isDirectory()) continue

    const isSession = UUID_RE.test(entry)

    // Project scoping: skip UUID lists that don't belong to this project
    if (!options.all && isSession) {
      const belongs =
        projectSessionIds?.has(entry) ||
        entry === currentSessionId
      if (!belongs) continue
    }

    // Count task JSON files
    let taskCount = 0
    try {
      const files = await readdir(entryPath)
      taskCount = files.filter((f) => f.endsWith(".json")).length
    } catch {
      // Skip unreadable dirs
    }

    lists.push({
      path: entryPath,
      id: entry,
      isSession,
      mtime: stats.mtime,
      taskCount,
    })
  }

  // Sort: named lists first (alphabetical), then UUID lists (most recent first)
  lists.sort((a, b) => {
    if (a.isSession !== b.isSession) return a.isSession ? 1 : -1
    if (!a.isSession) return a.id.localeCompare(b.id)
    return b.mtime.getTime() - a.mtime.getTime()
  })

  return lists
}

// -----------------------------------------------------------------------------
// Parsing
// -----------------------------------------------------------------------------

interface ParsedTarget {
  listPart: string | null
  taskPart: string | null
}

/**
 * Parse target syntax: [<list>][@<task>]
 */
export const parseTarget = (input: string): ParsedTarget => {
  const atIdx = input.indexOf("@")
  if (atIdx === -1) {
    return { listPart: input, taskPart: null }
  }
  const listPart = input.slice(0, atIdx) || null
  const taskPart = input.slice(atIdx + 1) || null
  return { listPart, taskPart }
}

// -----------------------------------------------------------------------------
// Resolution
// -----------------------------------------------------------------------------

/**
 * Find a task list by identifier.
 *
 * Resolution order:
 * 1. Exact match on list directory name
 * 2. UUID prefix match
 * 3. Substring match on directory name
 */
const resolveList = (
  lists: TaskListInfo[],
  identifier: string,
): TaskListInfo | null => {
  // 1. Exact match
  const exact = lists.find((l) => l.id === identifier)
  if (exact) return exact

  // 2. UUID prefix match
  const prefixMatch = lists.find((l) => l.isSession && l.id.startsWith(identifier))
  if (prefixMatch) return prefixMatch

  // 3. Substring match on name
  const lower = identifier.toLowerCase()
  const substringMatch = lists.find((l) => l.id.toLowerCase().includes(lower))
  if (substringMatch) return substringMatch

  return null
}

/**
 * Find a task file within a list directory by task number.
 */
const resolveTaskFile = (listPath: string, taskId: string): string =>
  join(listPath, `${taskId}.json`)

/**
 * Resolve a user-provided target string to a filesystem path.
 *
 * Returns a ResolvedTarget pointing at either a list directory or a specific task file.
 */
export const resolveTarget = (input: string, options: ResolveOptions = {}) =>
  Effect.gen(function* () {
    const { listPart, taskPart } = parseTarget(input)
    const lists = yield* Effect.promise(() => discoverTaskLists(options))

    if (lists.length === 0) {
      return yield* Effect.fail(
        new Error(
          options.all
            ? "No task lists found in ~/.claude/tasks/"
            : "No task lists found for this project.\nUse --all to show all task lists.",
        ),
      )
    }

    // If no list part but has task part (e.g. "@Scaffold"), search by subject
    if (!listPart && taskPart) {
      return yield* resolveBySubject(lists, taskPart)
    }

    // If no input parts at all, this shouldn't happen (caller uses picker)
    if (!listPart) {
      return yield* Effect.fail(new Error("No target specified"))
    }

    // Resolve the list
    const list = resolveList(lists, listPart)
    if (!list) {
      return yield* Effect.fail(new Error(`No task list found matching: ${listPart}`))
    }

    // If no task part, return the whole list
    if (!taskPart) {
      return {
        kind: "list" as const,
        listPath: list.path,
        listId: list.id,
      }
    }

    // Resolve specific task within list
    const taskPath = resolveTaskFile(list.path, taskPart)
    const exists = yield* Effect.promise(() => Bun.file(taskPath).exists())
    if (!exists) {
      return yield* Effect.fail(
        new Error(`Task ${taskPart} not found in list ${list.id}`),
      )
    }

    return {
      kind: "task" as const,
      listPath: list.path,
      listId: list.id,
      taskPath,
      taskNum: taskPart,
    }
  })

/**
 * Search for a task by subject substring across all in-scope lists.
 */
const resolveBySubject = (lists: TaskListInfo[], query: string) =>
  Effect.gen(function* () {
    const lower = query.toLowerCase()

    for (const list of lists) {
      const files = yield* Effect.promise(async () => {
        try {
          return (await readdir(list.path)).filter((f) => f.endsWith(".json"))
        } catch {
          return [] as string[]
        }
      })

      for (const file of files) {
        const filePath = join(list.path, file)
        const subject = yield* Effect.promise(async () => {
          try {
            const content = await Bun.file(filePath).json()
            return (content as { subject?: string }).subject ?? ""
          } catch {
            return ""
          }
        })
        if (subject.toLowerCase().includes(lower)) {
          const taskNum = file.replace(/\.json$/, "")
          return {
            kind: "task" as const,
            listPath: list.path,
            listId: list.id,
            taskPath: filePath,
            taskNum,
          }
        }
      }
    }

    return yield* Effect.fail(
      new Error(`No task found with subject matching: ${query}`),
    )
  })
