import path from "node:path"

import type { RuntimeContext } from "./env.js"
import { findTrueDirEntry } from "./config.js"

export const pathIsWithin = (candidate: string, root: string): boolean =>
  candidate === root || candidate.startsWith(`${root}${path.sep}`)

export const expandUserPath = (target: string, homeDir: string): string => {
  if (target === "~") return homeDir
  if (target.startsWith("~/")) return path.join(homeDir, target.slice(2))
  if (path.isAbsolute(target)) return path.normalize(target)
  return path.resolve(process.cwd(), target)
}

export const toHomeRelative = (targetAbs: string, homeDir: string): string => {
  const relative = path.relative(homeDir, targetAbs)
  return relative === "" ? "." : relative.split(path.sep).join("/")
}

export const toRepoRelative = (targetAbs: string, repoRoot: string): string | null => {
  if (!pathIsWithin(targetAbs, repoRoot)) return null
  const relative = path.relative(repoRoot, targetAbs)
  return relative === "" ? "." : relative.split(path.sep).join("/")
}

export const resolveTrueDirRepoPath = (ctx: RuntimeContext, target: string): string | null => {
  const targetAbs = expandUserPath(target, ctx.homeDir)
  const targetRel = toHomeRelative(targetAbs, ctx.homeDir)
  const entry = findTrueDirEntry(targetRel)
  if (!entry) return null

  const targetRoot = path.join(ctx.homeDir, entry.targetRel)
  const suffix = path.relative(targetRoot, targetAbs)
  return suffix === "" ? path.join(ctx.repoRoot, entry.repoRel) : path.join(ctx.repoRoot, entry.repoRel, suffix)
}

export const displayHomePath = (targetAbs: string, homeDir: string): string => {
  if (!pathIsWithin(targetAbs, homeDir)) return targetAbs
  const relative = path.relative(homeDir, targetAbs)
  return relative === "" ? "~" : `~/${relative.split(path.sep).join("/")}`
}
