import { basename, dirname } from "node:path/posix"
import type { ExtensionDiffFile, ExtensionVcsFileChangeType } from "hunkdiff/extension"

/**
 * Sidebar entry model.
 *
 * Mirrors Hunk's `packages/hunk/src/ui/lib/files.ts` (0.22.0) with one delta:
 * a file entry carries only its agent-note count, not `+adds` / `-dels`.
 */

export interface FileListEntry {
  kind: "file"
  id: string
  /** The review path, unformatted: the identity other extensions key files by. */
  path: string
  name: string
  depth: number
  agentCommentsText: string | null
  changeType: ExtensionVcsFileChangeType
  isUntracked: boolean
}

export interface FileGroupEntry {
  kind: "group"
  id: string
  label: string
}

export interface FileDirectoryEntry {
  kind: "directory"
  id: string
  path: string
  label: string
  depth: number
  descendantFileCount: number
}

export type FileSidebarMode = "flat" | "tree"
export type SidebarEntry = FileListEntry | FileGroupEntry | FileDirectoryEntry

export const TREE_FILE_SIDEBAR_MIN_CONTENT_WIDTH = 32

/** Choose the compact or hierarchical sidebar projection for an available content width. */
export function resolveFileSidebarMode(contentWidth: number): FileSidebarMode {
  return contentWidth >= TREE_FILE_SIDEBAR_MIN_CONTENT_WIDTH ? "tree" : "flat"
}

/** Render a review path safely: strip parser-added CR/LF, then escape controls. */
function formatSidebarPath(path: string) {
  let formatted = ""
  for (const character of path.replace(/[\r\n]+$/u, "")) {
    const codePoint = character.codePointAt(0)!
    if (character === "\\") {
      formatted += "\\\\"
    } else if (character === "\t") {
      formatted += "\\t"
    } else if (character === "\n") {
      formatted += "\\n"
    } else if (character === "\r") {
      formatted += "\\r"
    } else if (codePoint <= 0x1f || (codePoint >= 0x7f && codePoint <= 0x9f)) {
      formatted += `\\x${codePoint.toString(16).padStart(2, "0")}`
    } else {
      formatted += character
    }
  }
  return formatted
}

/** Build the filename-first label shown inside one sidebar row. */
function sidebarFileName(file: ExtensionDiffFile) {
  const path = formatSidebarPath(file.path)
  const previousPath = file.previousPath ? formatSidebarPath(file.previousPath) : undefined

  if (!previousPath || previousPath === path) {
    return basename(path)
  }

  const previousName = basename(previousPath)
  const nextName = basename(path)
  return previousName === nextName ? nextName : `${previousName} -> ${nextName}`
}

/** Build the shared file-row metadata used by both sidebar projections. */
function buildSidebarFileEntry(file: ExtensionDiffFile, depth: number): FileListEntry {
  const agentCommentCount = file.agent?.annotations.length ?? 0

  return {
    kind: "file",
    id: file.id,
    path: file.path,
    name: sidebarFileName(file),
    depth,
    agentCommentsText: agentCommentCount > 0 ? `*${agentCommentCount}` : null,
    changeType: file.changeType ?? "change",
    isUntracked: file.isUntracked ?? false,
  }
}

/** Build compact grouped sidebar entries while preserving the review stream order. */
export function buildFlatSidebarEntries(files: readonly ExtensionDiffFile[]): SidebarEntry[] {
  const entries: SidebarEntry[] = []
  let activeGroup: string | undefined

  files.forEach((file, index) => {
    const group = dirname(formatSidebarPath(file.path))

    if (group !== activeGroup) {
      activeGroup = group
      entries.push({
        kind: "group",
        id: `group:${group}:${index}`,
        label: group === "." ? "./" : `${group}/`,
      })
    }

    entries.push(buildSidebarFileEntry(file, 0))
  })

  return entries
}

/** Split a POSIX review path while retaining its absolute or UNC-style root marker. */
function sidebarDirectorySegments(parent: string) {
  if (parent === ".") {
    return []
  }

  const root = parent.match(/^\/+/u)?.[0]
  const segments = parent.split("/").filter(Boolean)
  return root ? [root, ...segments] : segments
}

/** Format one directory segment without doubling a retained root marker. */
function sidebarDirectoryLabel(segment: string) {
  return segment.startsWith("/") ? segment : `${segment}/`
}

/** Join directory segments into the stable path represented by one row. */
function sidebarDirectoryPath(segments: readonly string[]) {
  const [root, ...rest] = segments
  return root?.startsWith("/") ? `${root}${rest.join("/")}` : segments.join("/")
}

/** Return the number of leading directory segments shared by two active branches. */
function sharedDirectoryDepth(previous: readonly string[], next: readonly string[]) {
  const maxDepth = Math.min(previous.length, next.length)
  let depth = 0

  while (depth < maxDepth && previous[depth] === next[depth]) {
    depth += 1
  }

  return depth
}

/** Return the stable logical paths for every directory containing one review path. */
export function sidebarDirectoryPaths(path: string): string[] {
  const directories = sidebarDirectorySegments(dirname(formatSidebarPath(path)))
  return directories.map((_, depth) => sidebarDirectoryPath(directories.slice(0, depth + 1)))
}

/** Build an expanded hierarchy without regrouping files away from review order. */
export function buildTreeSidebarEntries(files: readonly ExtensionDiffFile[]): SidebarEntry[] {
  const entries: SidebarEntry[] = []
  let activeDirectories: string[] = []
  let activeDirectoryEntries: FileDirectoryEntry[] = []

  files.forEach((file, fileIndex) => {
    const directories = sidebarDirectorySegments(dirname(formatSidebarPath(file.path)))
    const sharedDepth = sharedDirectoryDepth(activeDirectories, directories)
    activeDirectoryEntries = activeDirectoryEntries.slice(0, sharedDepth)

    for (let depth = sharedDepth; depth < directories.length; depth += 1) {
      const segment = directories[depth]!
      const directoryPath = sidebarDirectoryPath(directories.slice(0, depth + 1))
      const directoryEntry: FileDirectoryEntry = {
        kind: "directory",
        id: `directory:${fileIndex}:${depth}:${directoryPath}`,
        path: directoryPath,
        label: sidebarDirectoryLabel(segment),
        depth,
        descendantFileCount: 0,
      }
      entries.push(directoryEntry)
      activeDirectoryEntries.push(directoryEntry)
    }

    entries.push(buildSidebarFileEntry(file, directories.length))
    for (const directoryEntry of activeDirectoryEntries) {
      directoryEntry.descendantFileCount += 1
    }
    activeDirectories = directories
  })

  return entries
}

/** Expand the named ancestors while preserving unrelated collapsed directory paths. */
export function expandCollapsedDirectoryPaths(
  current: ReadonlySet<string>,
  paths: readonly string[],
): ReadonlySet<string> {
  const expandedPaths = paths.filter((path) => current.has(path))
  if (expandedPaths.length === 0) {
    return current
  }

  const next = new Set(current)
  for (const path of expandedPaths) {
    next.delete(path)
  }
  return next
}

/** Toggle one directory path without mutating the current collapsed-path set. */
export function toggleCollapsedDirectoryPath(
  current: ReadonlySet<string>,
  path: string,
): ReadonlySet<string> {
  const next = new Set(current)
  if (next.has(path)) {
    next.delete(path)
  } else {
    next.add(path)
  }
  return next
}

/** Hide descendants of collapsed directory rows without changing the remaining review order. */
export function collapseTreeSidebarEntries(
  entries: readonly SidebarEntry[],
  collapsedDirectoryPaths: ReadonlySet<string>,
): SidebarEntry[] {
  if (collapsedDirectoryPaths.size === 0) {
    return [...entries]
  }

  const visible: SidebarEntry[] = []
  let collapsedDepth: number | null = null

  for (const entry of entries) {
    if (entry.kind === "group") {
      collapsedDepth = null
      visible.push(entry)
      continue
    }

    if (collapsedDepth !== null) {
      if (entry.depth > collapsedDepth) {
        continue
      }
      collapsedDepth = null
    }

    visible.push(entry)
    if (entry.kind === "directory" && collapsedDirectoryPaths.has(entry.path)) {
      collapsedDepth = entry.depth
    }
  }

  return visible
}
