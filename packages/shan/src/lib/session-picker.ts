/**
 * Interactive session picker for selecting Claude Code transcripts.
 *
 * Uses @clack/prompts for TUI selection with TTY detection.
 * When no TTY is available, errors with a helpful message.
 */

import * as Clack from "@clack/prompts"
import { Effect } from "effect"
import { homedir } from "node:os"
import { basename, dirname, join, relative } from "node:path"
import { stat } from "node:fs/promises"
import { Glob } from "bun"

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface SessionInfo {
  /** Absolute path to the .jsonl file */
  path: string
  /** Session ID (filename without extension) */
  id: string
  /** Project path relative to ~/.claude/projects */
  project: string
  /** File modification time */
  mtime: Date
  /** File size in bytes */
  size: number
}

// -----------------------------------------------------------------------------
// Session Discovery
// -----------------------------------------------------------------------------

/**
 * Convert a directory path to Claude Code's project directory name.
 * Claude uses the path with "/" replaced by "-" (e.g., /Users/foo -> -Users-foo)
 */
const toClaudeProjectDir = (dir: string): string => {
  return dir.replace(/\//g, "-")
}

export interface DiscoverOptions {
  /** Directory to find sessions for. Defaults to cwd. */
  directory?: string
  /** If true, show sessions from all projects. */
  all?: boolean
}

/**
 * Scan ~/.claude/projects for session files with metadata.
 * By default, only returns sessions for the specified directory (or cwd).
 * Pass `all: true` to return sessions from all projects.
 */
const discoverSessions = async (options: DiscoverOptions = {}): Promise<SessionInfo[]> => {
  const claudeDir = join(homedir(), ".claude", "projects")
  const targetDir = options.directory ?? process.cwd()
  const projectDirName = toClaudeProjectDir(targetDir)

  // If scoped to a directory, only scan that project folder
  const scanDir = options.all ? claudeDir : join(claudeDir, projectDirName)
  const glob = new Glob("**/*.jsonl")
  const sessions: SessionInfo[] = []

  try {
    for await (const file of glob.scan({ cwd: scanDir, absolute: true })) {
      try {
        const stats = await stat(file)
        const id = basename(file).replace(/\.jsonl$/, "")
        const projectPath = dirname(relative(claudeDir, file))

        sessions.push({
          path: file,
          id,
          project: projectPath,
          mtime: stats.mtime,
          size: stats.size,
        })
      } catch {
        // Skip files we can't stat
      }
    }
  } catch {
    // Directory doesn't exist - return empty
  }

  // Sort by modification time, most recent first
  sessions.sort((a, b) => b.mtime.getTime() - a.mtime.getTime())

  return sessions
}

// -----------------------------------------------------------------------------
// Formatting
// -----------------------------------------------------------------------------

const formatSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes}B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`
}

const formatDate = (date: Date): string => {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    const hours = date.getHours().toString().padStart(2, "0")
    const mins = date.getMinutes().toString().padStart(2, "0")
    return `today ${hours}:${mins}`
  }
  if (diffDays === 1) return "yesterday"
  if (diffDays < 7) return `${diffDays}d ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
  return `${Math.floor(diffDays / 30)}mo ago`
}

/**
 * Find the longest common prefix among an array of strings.
 */
const findCommonPrefix = (strings: string[]): string => {
  if (strings.length === 0) return ""
  if (strings.length === 1) return strings[0]!

  const sorted = [...strings].sort()
  const first = sorted[0]!
  const last = sorted[sorted.length - 1]!

  let i = 0
  while (i < first.length && first[i] === last[i]) {
    i++
  }

  return first.slice(0, i)
}

// Column widths
const COL_ID = 8
const COL_DATE = 12
const COL_SIZE = 7

const formatSessionLabel = (
  session: SessionInfo,
  projectSuffix: string,
  maxWidth: number
): string => {
  const idShort = session.id.slice(0, COL_ID)
  const size = formatSize(session.size).padStart(COL_SIZE)
  const date = formatDate(session.mtime).padEnd(COL_DATE)

  // Calculate available space for project path
  // Format: "id  date  size  project"
  const fixedWidth = COL_ID + 2 + COL_DATE + 2 + COL_SIZE + 2
  const projectWidth = Math.max(0, maxWidth - fixedWidth)

  // Truncate project suffix if needed
  const projectDisplay =
    projectSuffix.length > projectWidth
      ? projectSuffix.slice(0, projectWidth - 1) + "…"
      : projectSuffix

  return `${idShort}  ${date}  ${size}  ${projectDisplay}`
}

// ANSI escape codes
const DIM = "\x1b[2m"
const RESET = "\x1b[0m"

// Clack's visual prefix for options is "│  ○ " - we match "│    " for the header
// to align with the data columns (bar + 4 spaces = 5 chars before content)
const formatHeader = (): string => {
  return (
    "│    " +
    DIM +
    "ID".padEnd(COL_ID) +
    "  " +
    "MODIFIED".padEnd(COL_DATE) +
    "  " +
    "SIZE".padStart(COL_SIZE) +
    "  " +
    "SUBPATH" +
    RESET
  )
}

// -----------------------------------------------------------------------------
// TTY Detection
// -----------------------------------------------------------------------------

const isTTY = (): boolean => {
  return Boolean(process.stdin.isTTY && process.stdout.isTTY)
}

// -----------------------------------------------------------------------------
// Public API
// -----------------------------------------------------------------------------

export interface PickSessionOptions {
  /** Directory to find sessions for. Defaults to cwd. */
  directory?: string
  /** If true, show sessions from all projects. */
  all?: boolean
}

/**
 * Show an interactive session picker.
 *
 * Requires TTY - fails with helpful error if not available.
 * Returns the selected session's absolute path.
 */
export const pickSession = (options: PickSessionOptions = {}) =>
  Effect.gen(function* () {
    // TTY check
    if (!isTTY()) {
      return yield* Effect.fail(
        new Error(
          "Interactive session picker requires a TTY.\n" +
            "Provide a session ID explicitly: shan transcript <command> <session-id>"
        )
      )
    }

    // Discover sessions
    const sessions = yield* Effect.promise(() => discoverSessions(options))

    if (sessions.length === 0) {
      const hint = options.all
        ? "No sessions found in ~/.claude/projects"
        : `No sessions found for this directory.\nUse --all to show sessions from all projects.`
      return yield* Effect.fail(new Error(hint))
    }

    // Get terminal width (with fallback)
    const termWidth = process.stdout.columns ?? 80
    // Account for clack's prefix ("○ " = 2 chars, plus some margin)
    const maxLabelWidth = termWidth - 4

    // Extract common prefix from project paths
    const projectPaths = sessions.map((s) => s.project)
    const commonPrefix = findCommonPrefix(projectPaths)

    // Build select options with suffixes only
    const selectOptions = sessions.map((session) => {
      const suffix = session.project.slice(commonPrefix.length) || "."
      return {
        value: session.path,
        label: formatSessionLabel(session, suffix, maxLabelWidth),
      }
    })

    // Build message with common prefix inline (dimmed) and column headers
    const header = formatHeader()
    const prefixDisplay = commonPrefix
      ? `~/.claude/projects/${commonPrefix}`
      : "~/.claude/projects"
    const message = `Select a session  ${DIM}${prefixDisplay}${RESET}\n${header}`

    // Show picker (limit visible items to fit typical terminal)
    const selected = yield* Effect.promise(() =>
      Clack.select({
        message,
        options: selectOptions,
        maxItems: 10,
      })
    )

    // Handle cancellation
    if (Clack.isCancel(selected)) {
      return yield* Effect.fail(new Error("Selection cancelled"))
    }

    return selected as string
  })
