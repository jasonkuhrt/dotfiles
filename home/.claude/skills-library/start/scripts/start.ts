#!/usr/bin/env bun

import { spawn, spawnSync } from "node:child_process"
import { existsSync, mkdirSync, openSync, readFileSync, realpathSync, writeFileSync } from "node:fs"
import { homedir } from "node:os"
import path from "node:path"

type ParsedArgs = {
  positionals: string[]
  values: Record<string, string>
  flags: Set<string>
}

const parseArgs = (argv: string[]): ParsedArgs => {
  const positionals: string[] = []
  const values: Record<string, string> = {}
  const flags = new Set<string>()

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]

    if (!arg.startsWith("--")) {
      positionals.push(arg)
      continue
    }

    const raw = arg.slice(2)
    const equalsIndex = raw.indexOf("=")

    if (equalsIndex !== -1) {
      values[raw.slice(0, equalsIndex)] = raw.slice(equalsIndex + 1)
      continue
    }

    const next = argv[index + 1]
    if (next && !next.startsWith("--")) {
      values[raw] = next
      index += 1
      continue
    }

    flags.add(raw)
  }

  return { positionals, values, flags }
}

const fail = (message: string): never => {
  console.error(message)
  process.exit(1)
}

const run = (
  command: string,
  args: string[],
  options: { cwd?: string; inherit?: boolean } = {},
) => {
  const result = spawnSync(command, args, {
    cwd: options.cwd,
    encoding: "utf8",
    stdio: options.inherit ? "inherit" : "pipe",
  })

  if (result.status !== 0) {
    const detail = [result.stdout, result.stderr].filter(Boolean).join("\n")
    fail(`Command failed: ${command} ${args.join(" ")}\n${detail}`)
  }

  return typeof result.stdout === "string" ? result.stdout.trim() : ""
}

const status = (command: string, args: string[], cwd?: string) =>
  spawnSync(command, args, { cwd, stdio: "ignore" }).status ?? 1

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64)

const parse = parseArgs(Bun.argv.slice(2))
const command = parse.positionals[0] ?? "start"

if (parse.flags.has("help") || command !== "start") {
  console.log(`Usage:
  start --issue HEA-1234 --slug short-slug --repo /path/to/repo --prompt-file /path/to/prompt.md

Options:
  --worktree PATH     Reuse or create this worktree path
  --branch NAME       Branch name, defaults to codex/<issue>-<slug>
  --base NAME         Base branch, defaults to develop
  --foreground        Wait for the launched agent
  --no-open           Skip codex app <worktree>
  --no-send           Skip agent launch
  --dry-run           Print plan only
`)
  process.exit(command === "start" ? 0 : 1)
}

const issue = parse.values.issue?.toUpperCase() ?? fail("--issue is required")
const slug = slugify(parse.values.slug ?? issue.toLowerCase())
const repoArg = parse.values.repo ?? process.cwd()
const repoRoot = realpathSync(run("git", ["-C", repoArg, "rev-parse", "--show-toplevel"]))
const repoName = path.basename(repoRoot)
const base = parse.values.base ?? "develop"
const branch = parse.values.branch ?? `codex/${issue.toLowerCase()}-${slug}`
const worktree =
  parse.values.worktree ??
  path.resolve(path.dirname(repoRoot), `${repoName}-${issue.toLowerCase()}-${slug}`)
const promptFile = parse.values["prompt-file"]
const dryRun = parse.flags.has("dry-run")
const foreground = parse.flags.has("foreground")
const shouldOpen = !parse.flags.has("no-open")
const shouldSend = !parse.flags.has("no-send")

const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
const runDir = path.join(homedir(), ".codex", "agent-start", `${timestamp}-${issue.toLowerCase()}-${slug}`)
const logFile = path.join(runDir, "agent.log")
const promptCopy = path.join(runDir, "prompt.md")

const plan = {
  issue,
  repoRoot,
  base,
  branch,
  worktree,
  runDir,
  logFile,
  promptFile: promptFile ? path.resolve(promptFile) : null,
  foreground,
  shouldOpen,
  shouldSend,
}

if (dryRun) {
  console.log(JSON.stringify({ ok: true, dryRun: true, plan }, null, 2))
  process.exit(0)
}

mkdirSync(runDir, { recursive: true })

if (promptFile) {
  writeFileSync(promptCopy, readFileSync(promptFile, "utf8"))
}

if (!existsSync(worktree)) {
  run("git", ["-C", repoRoot, "fetch", "origin", base], { inherit: true })
  const branchExists = status("git", ["-C", repoRoot, "show-ref", "--verify", "--quiet", `refs/heads/${branch}`]) === 0

  if (branchExists) {
    run("git", ["-C", repoRoot, "worktree", "add", worktree, branch], { inherit: true })
  } else {
    run("git", ["-C", repoRoot, "worktree", "add", "-b", branch, worktree, `origin/${base}`], {
      inherit: true,
    })
  }
}

const actualBranch = run("git", ["-C", worktree, "branch", "--show-current"])

if (shouldOpen) {
  run("codex", ["app", worktree], { inherit: true })
}

let pid: number | null = null

if (shouldSend) {
  if (!promptFile) fail("--prompt-file is required unless --no-send is passed")

  const prompt = readFileSync(promptFile, "utf8")

  if (foreground) {
    run("codex", ["debug", "app-server", "send-message-v2", prompt], {
      cwd: worktree,
      inherit: true,
    })
  } else {
    const out = openSync(logFile, "a")
    const err = openSync(logFile, "a")
    const child = spawn("codex", ["debug", "app-server", "send-message-v2", prompt], {
      cwd: worktree,
      detached: true,
      stdio: ["ignore", out, err],
    })

    pid = child.pid ?? null
    child.unref()
  }
}

console.log(
  JSON.stringify(
    {
      ok: true,
      issue,
      worktree,
      branch,
      actualBranch,
      pid,
      logFile,
      promptCopy: promptFile ? promptCopy : null,
    },
    null,
    2,
  ),
)
