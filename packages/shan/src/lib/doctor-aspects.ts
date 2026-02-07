/**
 * Doctor aspect registry — each aspect has detect, optional fix, severity level.
 *
 * Aspects are pure detection + remediation functions operating on DoctorContext.
 */

import { Effect } from "effect"
import { lstat, readFile, readlink, rm, symlink, unlink, mkdir, writeFile } from "node:fs/promises"
import * as path from "node:path"
import * as Lib from "./skill-library.js"

// ── Types ────────────────────────────────────────────────────────────

export type Level = "error" | "warning" | "info"

export interface DoctorFinding {
  readonly aspect: string
  readonly level: Level
  readonly message: string
  readonly fixable: boolean
  readonly fix?: () => Effect.Effect<string, unknown> // returns fix description
}

export interface DoctorContext {
  readonly state: Lib.ShanState
  readonly library: Lib.SkillInfo[]
  readonly userOutfit: Lib.OutfitEntry[]
  readonly projectOutfit: Lib.OutfitEntry[]
  readonly projectOutfitDir: string
  readonly gitignoreEntries: string[]
}

export interface DoctorAspect {
  readonly name: string
  readonly description: string
  readonly level: Level
  readonly detect: (ctx: DoctorContext) => Effect.Effect<DoctorFinding[], never>
}

// ── Helpers ──────────────────────────────────────────────────────────

const finding = (
  aspect: string,
  level: Level,
  message: string,
  fixable: boolean,
  fix?: () => Effect.Effect<string, unknown>,
): DoctorFinding => {
  const base = { aspect, level, message, fixable }
  return fix ? { ...base, fix } : base
}

const checkSymlinkTarget = (target: string) =>
  Effect.tryPromise(async () => {
    const stat = await lstat(target)
    return stat.isDirectory()
  }).pipe(Effect.catchAll(() => Effect.succeed(false)))

// ── Aspects ──────────────────────────────────────────────────────────

const brokenSymlink: DoctorAspect = {
  name: "broken-symlink",
  description: "Outfit symlink target doesn't exist",
  level: "error",
  detect: (ctx) =>
    Effect.gen(function* () {
      const findings: DoctorFinding[] = []
      for (const outfit of [
        { entries: ctx.userOutfit, label: "user", scope: "user" as Lib.Scope },
        { entries: ctx.projectOutfit, label: "project", scope: "project" as Lib.Scope },
      ]) {
        for (const entry of outfit.entries) {
          if (entry.commitment !== "pluggable") continue
          const target = entry.symlinkTarget ?? ""
          if (!target) {
            findings.push(finding(
              "broken-symlink", "error",
              `[${outfit.label}] ${entry.name} — no symlink target`,
              true,
              () => Effect.gen(function* () {
                const linkPath = path.join(Lib.outfitDir(outfit.scope), entry.name)
                yield* Effect.tryPromise(() => unlink(linkPath)).pipe(Effect.catchAll(() => Effect.void))
                return `removed broken symlink: ${entry.name}`
              }),
            ))
            continue
          }
          const exists = yield* checkSymlinkTarget(target)
          if (!exists) {
            findings.push(finding(
              "broken-symlink", "error",
              `[${outfit.label}] ${entry.name} → ${target}`,
              true,
              () => Effect.gen(function* () {
                // Try git rename detection
                const repointed = yield* tryGitRenameRepoint(entry.name, target, outfit.scope)
                if (repointed) return repointed
                // Fallback: remove the broken symlink
                const linkPath = path.join(Lib.outfitDir(outfit.scope), entry.name)
                yield* Effect.tryPromise(() => unlink(linkPath)).pipe(Effect.catchAll(() => Effect.void))
                return `removed broken symlink: ${entry.name}`
              }),
            ))
          }
        }
      }
      return findings
    }),
}

/** Try to detect a git rename and repoint the symlink. */
const tryGitRenameRepoint = (name: string, oldTarget: string, scope: Lib.Scope) =>
  Effect.gen(function* () {
    // Determine the git repo root for the old target
    const { execSync } = yield* Effect.tryPromise(() => import("node:child_process"))
    const repoRoot = yield* Effect.try(() =>
      execSync("git rev-parse --show-toplevel", { cwd: path.dirname(oldTarget), encoding: "utf-8" }).trim(),
    ).pipe(Effect.catchAll(() => Effect.succeed("")))
    if (!repoRoot) return null
    // Check committed renames
    const relOld = path.relative(repoRoot, oldTarget)
    const renameOutput = yield* Effect.try(() =>
      execSync(`git log -1 --diff-filter=R --find-renames --format="" --name-status -- "${relOld}/SKILL.md"`, {
        cwd: repoRoot, encoding: "utf-8",
      }).trim(),
    ).pipe(Effect.catchAll(() => Effect.succeed("")))
    if (renameOutput) {
      // Parse: R100\told/path\tnew/path
      const parts = renameOutput.split("\t")
      if (parts.length >= 3) {
        const newRelPath = parts[2]!.replace(/\/SKILL\.md$/, "")
        const newAbsPath = path.join(repoRoot, newRelPath)
        const newExists = yield* checkSymlinkTarget(newAbsPath)
        if (newExists) {
          const linkPath = path.join(Lib.outfitDir(scope), name)
          yield* Effect.tryPromise(() => unlink(linkPath)).pipe(Effect.catchAll(() => Effect.void))
          yield* Effect.tryPromise(() => symlink(newAbsPath, linkPath))
          return `repointed ${name} → ${newAbsPath} (git rename detected)`
        }
      }
    }
    return null
  })

const stateDrift: DoctorAspect = {
  name: "state-drift",
  description: "current state doesn't match filesystem",
  level: "warning",
  detect: (ctx) =>
    Effect.gen(function* () {
      const findings: DoctorFinding[] = []
      for (const [scopeKey, scopeState] of Object.entries(ctx.state.current)) {
        const resolvedScope: Lib.Scope = scopeKey === "global" ? "user" : "project"
        const outfitDir = scopeKey === "global"
          ? Lib.outfitDir("user")
          : scopeKey === "project"
            ? Lib.outfitDir("project")
            : path.join(scopeKey, ".claude/skills")
        for (const flatName of scopeState.installs) {
          const linkPath = path.join(outfitDir, flatName)
          const exists = yield* Effect.tryPromise(() => lstat(linkPath)).pipe(
            Effect.catchAll(() => Effect.succeed(null)),
          )
          if (!exists) {
            findings.push(finding(
              "state-drift", "warning",
              `${flatName} in state[${scopeKey}] but no symlink`,
              true,
              () => Effect.gen(function* () {
                // Try to recreate from library
                const libraryDirs = Lib.librarySearchOrder(resolvedScope)
                for (const libDir of libraryDirs) {
                  // Reverse-resolve flat name to library path
                  const resolved = yield* findLibraryByFlatName(flatName, libDir)
                  if (resolved) {
                    yield* Effect.tryPromise(() => mkdir(path.dirname(linkPath), { recursive: true }))
                    yield* Effect.tryPromise(() => symlink(resolved, linkPath))
                    return `restored symlink: ${flatName} (${scopeKey})`
                  }
                }
                // Can't recreate — remove from state
                return `removed from state: ${flatName} (${scopeKey})`
              }),
            ))
          }
        }
      }
      return findings
    }),
}

/** Find a library entry by its flattened name. */
const findLibraryByFlatName = (flatName: string, libDir: string) =>
  Effect.gen(function* () {
    // Try direct path (flat name → replace _ with /)
    const relPath = flatName.replaceAll("_", "/")
    const candidate = path.join(libDir, relPath)
    const exists = yield* checkSymlinkTarget(candidate)
    if (exists) return candidate
    // Also try the flat name directly as a directory
    const direct = path.join(libDir, flatName)
    const directExists = yield* checkSymlinkTarget(direct)
    if (directExists) return direct
    return null
  })

const orphanedRouter: DoctorAspect = {
  name: "orphaned-router",
  description: "Generated router with no child skills equipped",
  level: "warning",
  detect: (ctx) =>
    Effect.gen(function* () {
      const findings: DoctorFinding[] = []
      for (const outfit of [
        { entries: ctx.userOutfit, scope: "user" as Lib.Scope, label: "user" },
        { entries: ctx.projectOutfit, scope: "project" as Lib.Scope, label: "project" },
      ]) {
        const routers = yield* Lib.detectGeneratedRouters(outfit.scope)
        for (const router of routers) {
          const prefix = router + "_"
          const hasChildren = outfit.entries.some(
            (e) => e.commitment === "pluggable" && e.name.startsWith(prefix),
          )
          if (!hasChildren) {
            const routerPath = path.join(Lib.outfitDir(outfit.scope), router)
            findings.push(finding(
              "orphaned-router", "warning",
              `[${outfit.label}] ${router}/ — no child skills equipped`,
              true,
              () => Effect.gen(function* () {
                yield* Effect.tryPromise(() => rm(routerPath, { recursive: true, force: true }))
                return `removed orphaned router: ${router} (${outfit.label})`
              }),
            ))
          }
        }
      }
      return findings
    }),
}

const staleGitignore: DoctorAspect = {
  name: "stale-gitignore",
  description: "Gitignore entries for unequipped skills",
  level: "info",
  detect: (ctx) =>
    Effect.gen(function* () {
      const findings: DoctorFinding[] = []
      const projectPluggableNames = new Set(
        ctx.projectOutfit.filter((e) => e.commitment === "pluggable").map((e) => e.name),
      )
      const projectRouters = yield* Lib.detectGeneratedRouters("project")
      const projectRouterNames = new Set(projectRouters)

      for (const entry of ctx.gitignoreEntries) {
        const name = entry.replace(".claude/skills/", "")
        if (!projectPluggableNames.has(name) && !projectRouterNames.has(name)) {
          findings.push(finding(
            "stale-gitignore", "info",
            `${entry} — skill not equipped at project level`,
            true,
            () => Effect.gen(function* () {
              yield* Lib.manageGitignoreRemove(process.cwd(), [entry])
              return `removed from gitignore: ${entry}`
            }),
          ))
        }
      }
      return findings
    }),
}

const frontmatterMismatch: DoctorAspect = {
  name: "frontmatter-mismatch",
  description: "Skill frontmatter name doesn't match directory",
  level: "error",
  detect: (ctx) =>
    Effect.gen(function* () {
      const findings: DoctorFinding[] = []
      for (const skill of ctx.library) {
        if (!skill.frontmatter) {
          findings.push(finding(
            "frontmatter-mismatch", "error",
            `${skill.colonName} — missing frontmatter`,
            false,
          ))
          continue
        }
        if (skill.frontmatter.name !== skill.colonName) {
          findings.push(finding(
            "frontmatter-mismatch", "error",
            `${skill.colonName} — name="${skill.frontmatter.name}" (expected "${skill.colonName}")`,
            false,
          ))
        }
      }
      return findings
    }),
}

const nameConflict: DoctorAspect = {
  name: "name-conflict",
  description: "Library skill collides with core skill in outfit",
  level: "error",
  detect: (ctx) =>
    Effect.gen(function* () {
      const findings: DoctorFinding[] = []
      const userCoreNames = new Set(ctx.userOutfit.filter((e) => e.commitment === "core").map((e) => e.name))
      const projectCoreNames = new Set(ctx.projectOutfit.filter((e) => e.commitment === "core").map((e) => e.name))

      for (const skill of ctx.library) {
        const flat = Lib.flattenName(skill.libraryRelPath)
        if (userCoreNames.has(flat)) {
          findings.push(finding(
            "name-conflict", "error",
            `"${skill.colonName}" (→ ${flat}) collides with user core skill`,
            false,
          ))
        }
        if (projectCoreNames.has(flat)) {
          findings.push(finding(
            "name-conflict", "error",
            `"${skill.colonName}" (→ ${flat}) collides with project core skill`,
            false,
          ))
        }
      }
      return findings
    }),
}

const duplicateName: DoctorAspect = {
  name: "duplicate-name",
  description: "Multiple library paths produce same flattened name",
  level: "error",
  detect: (ctx) =>
    Effect.gen(function* () {
      const findings: DoctorFinding[] = []
      const flatNames = new Map<string, string[]>()
      for (const skill of ctx.library) {
        const flat = Lib.flattenName(skill.libraryRelPath)
        const existing = flatNames.get(flat) ?? []
        existing.push(skill.colonName)
        flatNames.set(flat, existing)
      }
      for (const [flat, names] of flatNames) {
        if (names.length > 1) {
          findings.push(finding(
            "duplicate-name", "error",
            `"${flat}" produced by: ${names.join(", ")}`,
            false,
          ))
        }
      }
      return findings
    }),
}

const orphanedScope: DoctorAspect = {
  name: "orphaned-scope",
  description: "Project path in state doesn't exist on disk",
  level: "info",
  detect: (ctx) =>
    Effect.gen(function* () {
      const findings: DoctorFinding[] = []
      for (const key of Object.keys(ctx.state.history)) {
        if (key === "global") continue
        const pathExists = yield* Effect.tryPromise(async () => {
          const stat = await lstat(key)
          return stat.isDirectory()
        }).pipe(Effect.catchAll(() => Effect.succeed(false)))
        if (!pathExists) {
          findings.push(finding(
            "orphaned-scope", "info",
            `state references: ${key}`,
            true,
            () => Effect.gen(function* () {
              const state = yield* Lib.loadState()
              delete state.history[key]
              if (state.current[key]) delete state.current[key]
              yield* Lib.saveState(state)
              return `pruned scope: ${key}`
            }),
          ))
        }
      }
      return findings
    }),
}

const shadow: DoctorAspect = {
  name: "shadow",
  description: "Project library skill shadows user library skill",
  level: "info",
  detect: (ctx) =>
    Effect.gen(function* () {
      const findings: DoctorFinding[] = []
      const projLibDir = Lib.projectLibraryDir()
      const projLibExists = yield* Effect.tryPromise(async () => {
        const stat = await lstat(projLibDir)
        return stat.isDirectory()
      }).pipe(Effect.catchAll(() => Effect.succeed(false)))
      if (!projLibExists) return findings

      for (const skill of ctx.library) {
        if (skill.libraryDir === projLibDir) continue // only check user library skills
        // Check if project library has same relative path
        const projPath = path.join(projLibDir, skill.libraryRelPath)
        const projExists = yield* checkSymlinkTarget(projPath)
        if (projExists) {
          findings.push(finding(
            "shadow", "info",
            `${skill.colonName} — project library shadows user library`,
            false,
          ))
        }
      }
      return findings
    }),
}

const staleShadow: DoctorAspect = {
  name: "stale-shadow",
  description: "Symlink points to user library when project library has same name",
  level: "warning",
  detect: (ctx) =>
    Effect.gen(function* () {
      const findings: DoctorFinding[] = []
      const projLibDir = Lib.projectLibraryDir()

      for (const entry of ctx.projectOutfit) {
        if (entry.commitment !== "pluggable" || !entry.symlinkTarget) continue
        // If this symlink points to user library, check if project library has it
        if (!entry.symlinkTarget.startsWith(Lib.LIBRARY_DIR)) continue
        const relPath = entry.symlinkTarget.slice(Lib.LIBRARY_DIR.length + 1)
        const projPath = path.join(projLibDir, relPath)
        const projExists = yield* checkSymlinkTarget(projPath)
        if (projExists) {
          const linkPath = path.join(ctx.projectOutfitDir, entry.name)
          findings.push(finding(
            "stale-shadow", "warning",
            `[project] ${entry.name} → user library (project library has same skill)`,
            true,
            () => Effect.gen(function* () {
              yield* Effect.tryPromise(() => unlink(linkPath)).pipe(Effect.catchAll(() => Effect.void))
              yield* Effect.tryPromise(() => symlink(projPath, linkPath))
              return `repointed: ${entry.name} → project library`
            }),
          ))
        }
      }
      return findings
    }),
}

const crossScopeInstall: DoctorAspect = {
  name: "cross-scope-install",
  description: "User outfit symlink points into project library",
  level: "error",
  detect: (ctx) =>
    Effect.gen(function* () {
      const findings: DoctorFinding[] = []
      for (const entry of ctx.userOutfit) {
        if (entry.commitment !== "pluggable" || !entry.symlinkTarget) continue
        // Check if target is inside any project library (not user library)
        if (entry.symlinkTarget.startsWith(Lib.LIBRARY_DIR)) continue // correct: user → user library
        // If it starts with a path that looks like a project library, flag it
        if (entry.symlinkTarget.includes(".claude/skills-library/")) {
          const linkPath = path.join(Lib.outfitDir("user"), entry.name)
          findings.push(finding(
            "cross-scope-install", "error",
            `[user] ${entry.name} → ${entry.symlinkTarget}`,
            true,
            () => Effect.gen(function* () {
              yield* Effect.tryPromise(() => unlink(linkPath)).pipe(Effect.catchAll(() => Effect.void))
              return `removed cross-scope symlink: ${entry.name}`
            }),
          ))
        }
      }
      return findings
    }),
}

const newLeaf: DoctorAspect = {
  name: "new-leaf",
  description: "Installed group has new leaf skills not yet symlinked",
  level: "warning",
  detect: (ctx) =>
    Effect.gen(function* () {
      const findings: DoctorFinding[] = []
      for (const outfit of [
        { entries: ctx.userOutfit, scope: "user" as Lib.Scope, label: "user" },
        { entries: ctx.projectOutfit, scope: "project" as Lib.Scope, label: "project" },
      ]) {
        // Find all installed group prefixes
        const installedNames = new Set(
          outfit.entries.filter((e) => e.commitment === "pluggable").map((e) => e.name),
        )

        // For each library skill, check if its parent group is installed but this leaf isn't
        for (const skill of ctx.library) {
          const flat = Lib.flattenName(skill.libraryRelPath)
          if (installedNames.has(flat)) continue // already installed

          // Check if any parent group prefix is installed
          const parts = flat.split("_")
          for (let depth = 1; depth < parts.length; depth++) {
            const groupPrefix = parts.slice(0, depth).join("_")
            // Check if a sibling of this skill is installed (meaning the group was turned on)
            const siblingPrefix = groupPrefix + "_"
            const hasSibling = [...installedNames].some(
              (n) => n.startsWith(siblingPrefix) && n !== flat,
            )
            if (hasSibling) {
              const linkPath = path.join(Lib.outfitDir(outfit.scope), flat)
              const relPath = skill.libraryRelPath
              const libPath = path.join(skill.libraryDir, relPath)
              findings.push(finding(
                "new-leaf", "warning",
                `[${outfit.label}] ${skill.colonName} — group has siblings installed`,
                true,
                () => Effect.gen(function* () {
                  yield* Effect.tryPromise(() => mkdir(path.dirname(linkPath), { recursive: true }))
                  yield* Effect.tryPromise(() => symlink(libPath, linkPath))
                  return `symlinked new leaf: ${skill.colonName} (${outfit.label})`
                }),
              ))
              break
            }
          }
        }
      }
      return findings
    }),
}

const staleRouter: DoctorAspect = {
  name: "stale-router",
  description: "Auto-generated router child list outdated",
  level: "warning",
  detect: (ctx) =>
    Effect.gen(function* () {
      const findings: DoctorFinding[] = []
      for (const outfit of [
        { scope: "user" as Lib.Scope, label: "user" },
        { scope: "project" as Lib.Scope, label: "project" },
      ]) {
        const routers = yield* Lib.detectGeneratedRouters(outfit.scope)
        for (const routerName of routers) {
          const routerDir = path.join(Lib.outfitDir(outfit.scope), routerName)
          const skillMdPath = path.join(routerDir, "SKILL.md")
          const currentContent = yield* Effect.tryPromise(() =>
            readFile(skillMdPath, "utf-8"),
          ).pipe(Effect.catchAll(() => Effect.succeed("")))
          if (!currentContent) continue

          // Get current library children for this group
          const groupPrefix = routerName + ":"
          const children = ctx.library.filter((s) =>
            s.colonName.startsWith(groupPrefix),
          )
          const expected = Lib.generateRouter(routerName, children)

          if (currentContent !== expected) {
            findings.push(finding(
              "stale-router", "warning",
              `[${outfit.label}] ${routerName}/ — children changed`,
              true,
              () => Effect.gen(function* () {
                yield* Effect.tryPromise(() => writeFile(skillMdPath, expected))
                return `regenerated router: ${routerName} (${outfit.label})`
              }),
            ))
          }
        }
      }
      return findings
    }),
}

// ── Registry ─────────────────────────────────────────────────────────

export const ALL_ASPECTS: readonly DoctorAspect[] = [
  brokenSymlink,
  stateDrift,
  newLeaf,
  orphanedRouter,
  staleGitignore,
  orphanedScope,
  frontmatterMismatch,
  nameConflict,
  duplicateName,
  shadow,
  staleShadow,
  crossScopeInstall,
  staleRouter,
]

// ── Exports for readlink ─────────────────────────────────────────────

export { readlink }
