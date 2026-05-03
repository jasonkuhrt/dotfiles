#!/usr/bin/env bun

import { existsSync } from "node:fs"
import { readdir, readFile, realpath, stat } from "node:fs/promises"
import { join, relative } from "node:path"

type SessionStartEvent = {
  cwd?: string
}

type RuleFile = {
  absolutePath: string
  label: string
}

const readEvent = async (): Promise<SessionStartEvent> => {
  const chunks: string[] = []

  for await (const chunk of Bun.stdin.stream()) {
    chunks.push(Buffer.from(chunk).toString("utf8"))
  }

  if (chunks.length === 0) return {}

  try {
    return JSON.parse(chunks.join("")) as SessionStartEvent
  } catch {
    return {}
  }
}

const resolveGitRoot = async (cwd?: string): Promise<string | null> => {
  if (!cwd) return null

  const proc = Bun.spawn(["git", "-C", cwd, "rev-parse", "--show-toplevel"], {
    stdout: "pipe",
    stderr: "ignore",
  })

  const stdout = await new Response(proc.stdout).text()
  const exitCode = await proc.exited

  if (exitCode !== 0) return null

  const root = stdout.trim()
  return root.length > 0 ? root : null
}

const resolvePathIfPossible = async (path?: string): Promise<string | null> => {
  if (!path) return null

  try {
    return await realpath(path)
  } catch {
    return path
  }
}

const isRegularFile = async (path: string): Promise<boolean> => {
  try {
    return (await stat(path)).isFile()
  } catch {
    return false
  }
}

const collectMarkdownFilesRecursive = async (
  dir: string,
  labelRoot: string,
  seenDirRealPaths: Set<string>,
): Promise<RuleFile[]> => {
  try {
    if (!(await stat(dir)).isDirectory()) return []
  } catch {
    return []
  }

  const resolvedDir = await realpath(dir)
  if (seenDirRealPaths.has(resolvedDir)) return []
  seenDirRealPaths.add(resolvedDir)

  const entries = (await readdir(dir)).sort()
  const files: RuleFile[] = []

  for (const name of entries) {
    const path = join(dir, name)

    try {
      const entryStat = await stat(path)

      if (entryStat.isDirectory()) {
        files.push(
          ...(await collectMarkdownFilesRecursive(
            path,
            `${labelRoot}/${name}`,
            seenDirRealPaths,
          )),
        )
      } else if (entryStat.isFile() && name.endsWith(".md")) {
        files.push({
          absolutePath: path,
          label: `${labelRoot}/${name}`,
        })
      }
    } catch {
      // Ignore broken links or racing filesystem changes.
    }
  }

  return files
}

const encodeClaudeProjectPath = (path: string): string => path.replaceAll("/", "-")

const collectRuleFiles = async (
  projectRoot: string | null,
  sessionCwd: string | null,
  gitRoot: string | null,
): Promise<RuleFile[]> => {
  const seenRealPaths = new Set<string>()
  const seenDirRealPaths = new Set<string>()
  const files: RuleFile[] = []

  const pushUnique = async (path: string, label: string): Promise<void> => {
    if (!(await isRegularFile(path))) return

    const resolvedPath = await realpath(path)
    if (seenRealPaths.has(resolvedPath)) return

    seenRealPaths.add(resolvedPath)
    files.push({
      absolutePath: path,
      label,
    })
  }

  const homeDir = process.env.HOME
  const userClaudeDir = homeDir ? join(homeDir, ".claude") : null

  if (userClaudeDir && existsSync(userClaudeDir)) {
    await pushUnique(join(userClaudeDir, "CLAUDE.md"), "~/.claude/CLAUDE.md")
    await pushUnique(join(userClaudeDir, "CLAUDE.local.md"), "~/.claude/CLAUDE.local.md")
    await pushUnique(
      join(userClaudeDir, "CLAUDE.worktree.local.md"),
      "~/.claude/CLAUDE.worktree.local.md",
    )

    const userLocalRuleNames = (await readdir(userClaudeDir))
      .filter(
        (name) =>
          name.endsWith(".local.md") &&
          name !== "CLAUDE.local.md" &&
          name !== "CLAUDE.worktree.local.md",
      )
      .sort()

    for (const name of userLocalRuleNames) {
      await pushUnique(join(userClaudeDir, name), `~/.claude/${name}`)
    }

    const eagerUserRuleFiles = await collectMarkdownFilesRecursive(
      join(userClaudeDir, "rules"),
      "~/.claude/rules",
      seenDirRealPaths,
    )

    for (const file of eagerUserRuleFiles) {
      await pushUnique(file.absolutePath, file.label)
    }

    const projectScopedTargets = [sessionCwd, gitRoot]
      .filter((value): value is string => value !== null)
      .filter((value, index, values) => values.indexOf(value) === index)

    for (const target of projectScopedTargets) {
      const encoded = encodeClaudeProjectPath(target)
      await pushUnique(
        join(userClaudeDir, "projects", encoded, "CLAUDE.local.md"),
        `~/.claude/projects/${encoded}/CLAUDE.local.md`,
      )
    }
  }

  if (!projectRoot) return files

  const rootPrimary = join(projectRoot, "CLAUDE.md")
  const rootLocal = join(projectRoot, "CLAUDE.local.md")
  await pushUnique(rootPrimary, "CLAUDE.md")
  await pushUnique(rootLocal, "CLAUDE.local.md")

  const claudeDir = join(projectRoot, ".claude")
  if (!existsSync(claudeDir)) return files

  await pushUnique(join(claudeDir, "CLAUDE.md"), ".claude/CLAUDE.md")
  await pushUnique(
    join(claudeDir, "CLAUDE.worktree.local.md"),
    ".claude/CLAUDE.worktree.local.md",
  )

  const localRuleNames = (await readdir(claudeDir))
    .filter(
      (name) =>
        name.endsWith(".local.md") &&
        name !== "CLAUDE.worktree.local.md",
    )
    .sort()

  for (const name of localRuleNames) {
    await pushUnique(join(claudeDir, name), `.claude/${name}`)
  }

  const eagerRuleFiles = await collectMarkdownFilesRecursive(
    join(claudeDir, "rules"),
    ".claude/rules",
    seenDirRealPaths,
  )

  for (const file of eagerRuleFiles) {
    await pushUnique(file.absolutePath, file.label)
  }

  return files
}

const buildAdditionalContext = async (
  sessionCwd: string | null,
  projectRoot: string | null,
  gitRoot: string | null,
  files: RuleFile[],
): Promise<string> => {
  const sections = [
    "Loaded user-level Claude rules plus project Claude rules resolved from the session cwd and project root in deterministic order. Treat this content as already-read startup context.",
  ]

  if (sessionCwd) {
    sections.push(`Session cwd: ${sessionCwd}`)
  }

  if (projectRoot) {
    sections.push(`Project root: ${projectRoot}`)
  }

  if (gitRoot) {
    sections.push(`Git root: ${gitRoot}`)
  }

  for (const file of files) {
    const content = (await readFile(file.absolutePath, "utf8")).replace(/\s+$/, "")
    sections.push(`--- BEGIN ${file.label} ---\n${content}\n--- END ${file.label} ---`)
  }

  return sections.join("\n\n")
}

const main = async (): Promise<void> => {
  const event = await readEvent()
  const sessionCwd = await resolvePathIfPossible(event.cwd)
  const gitRoot = await resolveGitRoot(sessionCwd ?? event.cwd)
  const projectRoot = gitRoot ?? sessionCwd

  const files = await collectRuleFiles(projectRoot, sessionCwd, gitRoot)
  if (files.length === 0) return

  const payload = {
    hookSpecificOutput: {
      hookEventName: "SessionStart",
      additionalContext: await buildAdditionalContext(
        sessionCwd,
        projectRoot,
        gitRoot,
        files,
      ),
    },
  }

  process.stdout.write(`${JSON.stringify(payload)}\n`)
}

await main()
