import { cpSync, existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, realpathSync, statSync } from "node:fs"
import path from "node:path"

import { CUTOVER_VERSION, TRUE_DIRS } from "./config.js"
import type { RuntimeContext } from "./env.js"
import { timestampUtc } from "./env.js"
import { writeJsonFile } from "./json.js"

export interface TrueDirAuditIssue {
  readonly targetRel: string
  readonly targetAbs: string
  readonly repoAbs: string
  readonly message: string
}

export interface CutoverMarker {
  readonly version: number
  readonly completedAt: string
  readonly backupDir: string
  readonly trueDirTargets: readonly string[]
}

const listLeafPaths = (root: string): readonly string[] => {
  const results: string[] = []
  const visit = (dir: string): void => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const absolute = path.join(dir, entry.name)
      const relative = path.relative(root, absolute).split(path.sep).join("/")
      if (entry.isDirectory()) {
        visit(absolute)
        continue
      }
      if (entry.isSymbolicLink()) {
        try {
          if (statSync(absolute).isDirectory()) {
            visit(absolute)
            continue
          }
        } catch {}
      }
      results.push(relative)
    }
  }

  if (!existsSync(root)) return []
  visit(root)
  return results.sort((left, right) => left.localeCompare(right))
}

export const auditTrueDirRoots = (ctx: RuntimeContext): readonly TrueDirAuditIssue[] => {
  const issues: TrueDirAuditIssue[] = []

  for (const entry of TRUE_DIRS) {
    const targetAbs = path.join(ctx.homeDir, entry.targetRel)
    const repoAbs = path.join(ctx.repoRoot, entry.repoRel)

    if (!existsSync(repoAbs)) {
      issues.push({ targetRel: entry.targetRel, targetAbs, repoAbs, message: `missing repo root ${repoAbs}` })
      continue
    }

    if (!existsSync(targetAbs) && !lstatExists(targetAbs)) continue

    if (lstatExists(targetAbs) && lstatSync(targetAbs).isSymbolicLink()) {
      const resolved = realpathSync(targetAbs)
      if (resolved !== repoAbs) {
        issues.push({ targetRel: entry.targetRel, targetAbs, repoAbs, message: `target points to ${resolved}, expected ${repoAbs}` })
      }
      continue
    }

    if (!existsSync(targetAbs) || !lstatSync(targetAbs).isDirectory()) {
      issues.push({ targetRel: entry.targetRel, targetAbs, repoAbs, message: `target is not a directory or symlink` })
      continue
    }

    const repoSet = new Set(listLeafPaths(repoAbs))
    for (const livePath of listLeafPaths(targetAbs)) {
      if (!repoSet.has(livePath)) {
        issues.push({
          targetRel: entry.targetRel,
          targetAbs,
          repoAbs,
          message: `extra live path ${path.join(targetAbs, livePath)}`,
        })
      }
    }
  }

  return issues
}

const lstatExists = (target: string): boolean => {
  try {
    lstatSync(target)
    return true
  } catch {
    return false
  }
}

export const backupTrueDirRoots = (ctx: RuntimeContext, backupDir: string): void => {
  for (const entry of TRUE_DIRS) {
    const targetAbs = path.join(ctx.homeDir, entry.targetRel)
    if (!existsSync(targetAbs) && !lstatExists(targetAbs)) continue
    const destination = path.join(backupDir, "live", entry.targetRel)
    mkdirSync(path.dirname(destination), { recursive: true })
    cpSync(targetAbs, destination, { recursive: true, force: true, dereference: false, verbatimSymlinks: true })
  }
}

export const loadCutoverMarker = (ctx: RuntimeContext): CutoverMarker | null => {
  if (!existsSync(ctx.cutoverMarkerPath)) return null
  const raw = readFileSync(ctx.cutoverMarkerPath, "utf8")
  try {
    return JSON.parse(raw) as CutoverMarker
  } catch {
    return JSON.parse(raw.replaceAll('\\"', '"')) as CutoverMarker
  }
}

export const needsCutoverPass = (ctx: RuntimeContext): boolean => loadCutoverMarker(ctx)?.version !== CUTOVER_VERSION

export const writeCutoverMarker = (ctx: RuntimeContext, backupDir: string): void => {
  writeJsonFile(ctx.cutoverMarkerPath, {
    version: CUTOVER_VERSION,
    completedAt: timestampUtc(),
    backupDir,
    trueDirTargets: TRUE_DIRS.map((entry) => entry.targetRel),
  } satisfies CutoverMarker)
}
