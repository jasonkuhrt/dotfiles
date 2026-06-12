#!/usr/bin/env bun

import { existsSync } from "node:fs"
import { readdir, readFile, stat } from "node:fs/promises"
import path from "node:path"

type JsonObject = Record<string, unknown>

type PackageJson = {
  name?: string
  version?: string
  private?: boolean
  type?: string
  main?: string
  module?: string
  source?: unknown
  exports?: unknown
  types?: string
  typings?: string
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
  optionalDependencies?: Record<string, string>
  scripts?: Record<string, string>
  os?: string[]
  cpu?: string[]
  bin?: unknown
}

type WorkspacePackage = {
  directory: string
  relativeDirectory: string
  packageJsonPath: string
  packageJson: PackageJson
}

type Usage = {
  files: number
  references: number
  examples: string[]
}

type PackageQuality = {
  installedVersion?: string
  installedPackagePath?: string
  esmNative: boolean | null
  bundledTypes: boolean | null
  definitelyTyped: boolean
  tsSourceFiles: number | null
  runtimeLoc: number | null
  installScripts: string[]
  platformSpecific: boolean
  directDependencyCount: number | null
  peerDependencies: Record<string, string>
  ecosystemWarnings: string[]
}

type RegistryInfo = {
  latestVersion?: string
  latestPublishedAt?: string
  releaseAgeDays?: number
  error?: string
}

type Candidate = {
  name: string
  range: string
  usage: Usage
  quality: PackageQuality
  registry?: RegistryInfo
  score: number
  signals: string[]
  suggestedAction: string
}

type CliOptions = {
  repo: string
  app?: string
  registry: boolean
  json: boolean
  top: number
}

const ignoredDirectories = new Set([
  ".git",
  ".next",
  ".turbo",
  ".vercel",
  "coverage",
  "dist",
  "build",
  "node_modules",
  "tmp",
])

const sourceExtensions = new Set([
  ".cjs",
  ".cts",
  ".js",
  ".jsx",
  ".mjs",
  ".mts",
  ".ts",
  ".tsx",
])

const packageAreaPrefixes = [
  "apps/",
  "cloudflare-workers/",
  "configs/",
  "libs/",
  "parts/",
  "tools/",
]

const appAreaPrefixes = ["apps/", "cloudflare-workers/"]

const help = `Usage:
  bun score-deps.ts --repo <heartbeat-root> [--registry] [--app <name-or-path>] [--top <n>] [--json]

Examples:
  bun /Users/jasonkuhrt/.codex/skills/heartbeat-dep-gardener/scripts/score-deps.ts --repo . --registry
  bun /Users/jasonkuhrt/.codex/skills/heartbeat-dep-gardener/scripts/score-deps.ts --repo . --app apps/heartbeat --json
`

const parseArgs = (argv: string[]): CliOptions => {
  const options: CliOptions = {
    repo: process.cwd(),
    registry: false,
    json: false,
    top: 12,
  }

  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index]
    if (arg === "--help" || arg === "-h") {
      console.log(help)
      process.exit(0)
    }
    if (arg === "--repo") {
      options.repo = path.resolve(argv[++index] ?? "")
      continue
    }
    if (arg === "--app") {
      options.app = argv[++index]
      continue
    }
    if (arg === "--registry") {
      options.registry = true
      continue
    }
    if (arg === "--json") {
      options.json = true
      continue
    }
    if (arg === "--top") {
      options.top = Number.parseInt(argv[++index] ?? "12", 10)
      continue
    }
    throw new Error(`Unknown argument: ${arg}`)
  }

  return options
}

const readJson = async <T>(filePath: string): Promise<T> => {
  return JSON.parse(await readFile(filePath, "utf8")) as T
}

const toPosix = (value: string): string => value.split(path.sep).join("/")

const isPackageArea = (relativeDirectory: string): boolean => {
  if (relativeDirectory === "") return true
  const posix = toPosix(relativeDirectory)
  return packageAreaPrefixes.some((prefix) => posix === prefix.slice(0, -1) || posix.startsWith(prefix))
}

const isAppPackage = (workspacePackage: WorkspacePackage): boolean => {
  const relativeDirectory = toPosix(workspacePackage.relativeDirectory)
  return appAreaPrefixes.some((prefix) => relativeDirectory.startsWith(prefix))
}

const walkPackageJsons = async (repo: string, current: string, output: string[]): Promise<void> => {
  const entries = await readdir(current, { withFileTypes: true })
  const relativeCurrent = path.relative(repo, current)

  if (!isPackageArea(relativeCurrent)) return

  for (const entry of entries) {
    const fullPath = path.join(current, entry.name)
    const relativePath = toPosix(path.relative(repo, fullPath))

    if (entry.isDirectory()) {
      if (ignoredDirectories.has(entry.name)) continue
      if (relativePath.includes("__tests__/fixtures/")) continue
      await walkPackageJsons(repo, fullPath, output)
      continue
    }

    if (entry.isFile() && entry.name === "package.json") {
      output.push(fullPath)
    }
  }
}

const loadWorkspacePackages = async (repo: string): Promise<WorkspacePackage[]> => {
  const packageJsonPaths: string[] = []
  await walkPackageJsons(repo, repo, packageJsonPaths)

  const packages = await Promise.all(
    packageJsonPaths.map(async (packageJsonPath) => {
      const directory = path.dirname(packageJsonPath)
      return {
        directory,
        relativeDirectory: path.relative(repo, directory),
        packageJsonPath,
        packageJson: await readJson<PackageJson>(packageJsonPath),
      }
    }),
  )

  return packages.sort((left, right) => left.relativeDirectory.localeCompare(right.relativeDirectory))
}

const directDependencies = (packageJson: PackageJson): Record<string, string> => packageJson.dependencies ?? {}

const isWorkspaceDependency = (name: string, range: string, workspaceNames: Set<string>): boolean => {
  return workspaceNames.has(name) || range.startsWith("workspace:") || range.startsWith("link:") || range.startsWith("file:")
}

const externalProductionDependencies = (
  packageJson: PackageJson,
  workspaceNames: Set<string>,
): Record<string, string> => {
  return Object.fromEntries(
    Object.entries(directDependencies(packageJson)).filter(
      ([name, range]) => !isWorkspaceDependency(name, range, workspaceNames),
    ),
  )
}

const selectApp = (
  packages: WorkspacePackage[],
  workspaceNames: Set<string>,
  requestedApp?: string,
): WorkspacePackage => {
  const apps = packages.filter(isAppPackage)

  if (requestedApp) {
    const normalizedRequest = toPosix(requestedApp)
    const found = apps.find((app) => {
      return (
        app.packageJson.name === requestedApp ||
        toPosix(app.relativeDirectory) === normalizedRequest ||
        toPosix(app.directory).endsWith(normalizedRequest)
      )
    })
    if (!found) throw new Error(`Could not find app package: ${requestedApp}`)
    return found
  }

  const ranked = apps
    .map((app) => {
      const externalDeps = externalProductionDependencies(app.packageJson, workspaceNames)
      const allProductionDeps = directDependencies(app.packageJson)
      return {
        app,
        externalProductionCount: Object.keys(externalDeps).length,
        allProductionCount: Object.keys(allProductionDeps).length,
        devCount: Object.keys(app.packageJson.devDependencies ?? {}).length,
      }
    })
    .sort((left, right) => {
      return (
        right.externalProductionCount - left.externalProductionCount ||
        right.allProductionCount - left.allProductionCount ||
        right.devCount - left.devCount ||
        left.app.relativeDirectory.localeCompare(right.app.relativeDirectory)
      )
    })

  const selected = ranked[0]?.app
  if (!selected) throw new Error("No app packages found under apps/ or cloudflare-workers/")
  return selected
}

const escapeRegex = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

const walkSourceFiles = async (directory: string, output: string[]): Promise<void> => {
  const entries = await readdir(directory, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      if (ignoredDirectories.has(entry.name)) continue
      await walkSourceFiles(fullPath, output)
      continue
    }
    if (!entry.isFile()) continue

    const extension = path.extname(entry.name)
    if (!sourceExtensions.has(extension)) continue
    if (entry.name.endsWith(".d.ts")) continue
    output.push(fullPath)
  }
}

const countUsage = async (appDirectory: string, dependencyName: string): Promise<Usage> => {
  const files: string[] = []
  await walkSourceFiles(appDirectory, files)

  const escaped = escapeRegex(dependencyName)
  const importPattern = new RegExp(
    String.raw`(?:from\s*["']|import\s*\(\s*["']|require\s*\(\s*["']|export\s+[^"']*from\s*["'])${escaped}(?=["'/])`,
    "g",
  )

  let references = 0
  const matchedFiles: string[] = []

  for (const file of files) {
    const content = await readFile(file, "utf8")
    const matches = content.match(importPattern)
    if (!matches) continue
    references += matches.length
    matchedFiles.push(file)
  }

  return {
    files: matchedFiles.length,
    references,
    examples: matchedFiles.slice(0, 5).map((file) => toPosix(path.relative(appDirectory, file))),
  }
}

const dependencyPathParts = (dependencyName: string): string[] => dependencyName.split("/")

const findInstalledPackagePath = (repo: string, appDirectory: string, dependencyName: string): string | undefined => {
  const parts = dependencyPathParts(dependencyName)
  const candidates = [
    path.join(repo, "node_modules", ...parts),
    path.join(appDirectory, "node_modules", ...parts),
  ]
  return candidates.find((candidate) => existsSync(path.join(candidate, "package.json")))
}

const definitelyTypedName = (dependencyName: string): string => {
  if (dependencyName.startsWith("@")) {
    const [scope, name] = dependencyName.slice(1).split("/")
    return `@types/${scope}__${name}`
  }
  return `@types/${dependencyName}`
}

const hasExportKey = (value: unknown, key: string): boolean => {
  if (!value || typeof value !== "object") return false
  if (Array.isArray(value)) return value.some((item) => hasExportKey(item, key))
  const object = value as JsonObject
  if (Object.hasOwn(object, key)) return true
  return Object.values(object).some((item) => hasExportKey(item, key))
}

const hasImportExport = (value: unknown): boolean => hasExportKey(value, "import")

const hasRequireExportOnly = (value: unknown): boolean => {
  return hasExportKey(value, "require") && !hasExportKey(value, "import")
}

const hasTypeExport = (value: unknown): boolean => hasExportKey(value, "types") || hasExportKey(value, "typings")

const walkFilesLimited = async (
  directory: string,
  shouldInclude: (file: string) => boolean,
  shouldSkipDirectory: (name: string) => boolean,
  limit: number,
  output: string[],
): Promise<void> => {
  if (output.length >= limit) return

  const entries = await readdir(directory, { withFileTypes: true }).catch(() => [])
  for (const entry of entries) {
    if (output.length >= limit) return
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      if (shouldSkipDirectory(entry.name)) continue
      await walkFilesLimited(fullPath, shouldInclude, shouldSkipDirectory, limit, output)
      continue
    }
    if (entry.isFile() && shouldInclude(fullPath)) {
      output.push(fullPath)
    }
  }
}

const countRuntimeLoc = async (packageDirectory: string): Promise<number> => {
  const files: string[] = []
  await walkFilesLimited(
    packageDirectory,
    (file) => {
      const extension = path.extname(file)
      const basename = path.basename(file)
      if (!sourceExtensions.has(extension)) return false
      if (basename.endsWith(".d.ts")) return false
      if (basename.includes(".min.")) return false
      return true
    },
    (name) => ignoredDirectories.has(name) || name === "docs" || name === "test" || name === "tests" || name === "__tests__",
    300,
    files,
  )

  let loc = 0
  for (const file of files) {
    const content = await readFile(file, "utf8").catch(() => "")
    loc += content.split(/\r?\n/).filter((line) => line.trim() !== "").length
  }
  return loc
}

const countTsSourceFiles = async (packageDirectory: string): Promise<number> => {
  const files: string[] = []
  await walkFilesLimited(
    packageDirectory,
    (file) => {
      const extension = path.extname(file)
      const basename = path.basename(file)
      return (extension === ".ts" || extension === ".tsx") && !basename.endsWith(".d.ts")
    },
    (name) => ignoredDirectories.has(name) || name === "docs",
    50,
    files,
  )
  return files.length
}

const detectReactMajor = (packages: WorkspacePackage[]): number | undefined => {
  for (const workspacePackage of packages) {
    const range =
      workspacePackage.packageJson.dependencies?.react ??
      workspacePackage.packageJson.devDependencies?.react ??
      workspacePackage.packageJson.peerDependencies?.react
    if (!range) continue
    const match = range.match(/(\d+)\./)
    if (match) return Number.parseInt(match[1]!, 10)
  }
  return undefined
}

const qualityForDependency = async (
  repo: string,
  appDirectory: string,
  dependencyName: string,
  allPackagesForReactDetection: WorkspacePackage[],
): Promise<PackageQuality> => {
  const installedPackagePath = findInstalledPackagePath(repo, appDirectory, dependencyName)
  const dtPackagePath = path.join(repo, "node_modules", ...dependencyPathParts(definitelyTypedName(dependencyName)))
  const definitelyTyped = existsSync(path.join(dtPackagePath, "package.json"))

  if (!installedPackagePath) {
    return {
      esmNative: null,
      bundledTypes: null,
      definitelyTyped,
      tsSourceFiles: null,
      runtimeLoc: null,
      installScripts: [],
      platformSpecific: false,
      directDependencyCount: null,
      peerDependencies: {},
      ecosystemWarnings: [],
    }
  }

  const packageJson = await readJson<PackageJson>(path.join(installedPackagePath, "package.json"))
  const shallowFiles = await readdir(installedPackagePath).catch(() => [])
  const bundledTypes =
    Boolean(packageJson.types ?? packageJson.typings) ||
    hasTypeExport(packageJson.exports) ||
    shallowFiles.some((file) => file.endsWith(".d.ts"))
  const esmNative =
    packageJson.type === "module" ||
    Boolean(packageJson.module) ||
    hasImportExport(packageJson.exports) ||
    (!packageJson.main?.endsWith(".cjs") && packageJson.main?.endsWith(".mjs") === true)

  const installScripts = Object.keys(packageJson.scripts ?? {}).filter((script) =>
    ["preinstall", "install", "postinstall", "prepare"].includes(script),
  )
  const peerDependencies = packageJson.peerDependencies ?? {}
  const ecosystemWarnings: string[] = []
  const reactMajor = detectReactMajor(allPackagesForReactDetection)
  const reactPeer = peerDependencies.react
  if (reactMajor && reactMajor >= 19 && reactPeer && !reactPeer.includes("19") && !reactPeer.includes(">=19")) {
    ecosystemWarnings.push(`react peer does not mention React ${reactMajor}: ${reactPeer}`)
  }
  if (hasRequireExportOnly(packageJson.exports)) {
    ecosystemWarnings.push("exports expose require without import")
  }

  return {
    installedVersion: packageJson.version,
    installedPackagePath,
    esmNative,
    bundledTypes,
    definitelyTyped,
    tsSourceFiles: await countTsSourceFiles(installedPackagePath),
    runtimeLoc: await countRuntimeLoc(installedPackagePath),
    installScripts,
    platformSpecific: Boolean(packageJson.os?.length || packageJson.cpu?.length),
    directDependencyCount: Object.keys(packageJson.dependencies ?? {}).length,
    peerDependencies,
    ecosystemWarnings,
  }
}

const fetchRegistryInfo = async (dependencyName: string): Promise<RegistryInfo> => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8_000)
  try {
    const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(dependencyName)}`, {
      signal: controller.signal,
    })
    if (!response.ok) return { error: `registry returned ${response.status}` }
    const json = (await response.json()) as {
      "dist-tags"?: Record<string, string>
      time?: Record<string, string>
    }
    const latestVersion = json["dist-tags"]?.latest
    const latestPublishedAt = latestVersion ? json.time?.[latestVersion] : undefined
    const releaseAgeDays = latestPublishedAt
      ? Math.floor((Date.now() - Date.parse(latestPublishedAt)) / 86_400_000)
      : undefined
    return { latestVersion, latestPublishedAt, releaseAgeDays }
  } catch (error) {
    return { error: error instanceof Error ? error.message : String(error) }
  } finally {
    clearTimeout(timeout)
  }
}

const runLimited = async <T, R>(
  values: T[],
  concurrency: number,
  task: (value: T) => Promise<R>,
): Promise<R[]> => {
  const results: R[] = []
  let nextIndex = 0

  const workers = Array.from({ length: Math.min(concurrency, values.length) }, async () => {
    while (nextIndex < values.length) {
      const index = nextIndex++
      results[index] = await task(values[index]!)
    }
  })
  await Promise.all(workers)
  return results
}

const classifyAction = (usage: Usage, quality: PackageQuality, signals: string[]): string => {
  if (usage.references === 0) return "remove as dead dependency"
  if (usage.files <= 1 && usage.references <= 2 && (quality.runtimeLoc ?? 9999) < 300) {
    return "remove, inline, or internalize tiny concern"
  }
  if (signals.some((signal) => signal.includes("stale") || signal.includes("ecosystem"))) {
    return "update or replace with ecosystem-current package"
  }
  if (signals.some((signal) => signal.includes("not ESM") || signal.includes("types"))) {
    return "replace or isolate behind typed adapter"
  }
  return "manual audit"
}

const scoreCandidate = (name: string, usage: Usage, quality: PackageQuality, registry?: RegistryInfo): Candidate => {
  let score = 0
  const signals: string[] = []

  if (usage.references === 0) {
    score += 8
    signals.push("unused by selected app")
  } else if (usage.files <= 1 && usage.references <= 2) {
    score += 5
    signals.push("trivial usage")
  } else if (usage.files <= 3) {
    score += 3
    signals.push("low usage")
  }

  if (quality.esmNative === false) {
    score += 3
    signals.push("not ESM-native")
  }
  if (quality.bundledTypes === false) {
    score += 3
    signals.push("does not ship dts")
    if (!quality.definitelyTyped) {
      score += 2
      signals.push("no DefinitelyTyped package found")
    }
  }
  if (quality.tsSourceFiles === 0) {
    score += 1
    signals.push("no TS source in published package")
  }
  if (quality.runtimeLoc !== null && quality.runtimeLoc < 300) {
    score += 2
    signals.push(`tiny published runtime surface: ${quality.runtimeLoc} LOC`)
  }
  if (quality.installScripts.length > 0) {
    score += 3
    signals.push(`install scripts: ${quality.installScripts.join(", ")}`)
  }
  if (quality.platformSpecific) {
    score += 2
    signals.push("platform-specific package metadata")
  }
  if ((quality.directDependencyCount ?? 0) >= 10) {
    score += 1
    signals.push(`broad direct dependency surface: ${quality.directDependencyCount}`)
  }
  for (const warning of quality.ecosystemWarnings) {
    score += 3
    signals.push(`ecosystem: ${warning}`)
  }
  if ((registry?.releaseAgeDays ?? 0) > 730) {
    score += 5
    signals.push(`very stale release: ${registry!.releaseAgeDays} days`)
  } else if ((registry?.releaseAgeDays ?? 0) > 365) {
    score += 3
    signals.push(`stale release: ${registry!.releaseAgeDays} days`)
  }

  return {
    name,
    range: "",
    usage,
    quality,
    registry,
    score,
    signals,
    suggestedAction: classifyAction(usage, quality, signals),
  }
}

const formatMaybe = (value: unknown): string => {
  if (value === null || value === undefined || value === "") return "unknown"
  return String(value)
}

const formatSignals = (signals: string[]): string => {
  if (signals.length === 0) return "none"
  return signals.slice(0, 4).join("; ")
}

const markdownReport = (
  repo: string,
  app: WorkspacePackage,
  deps: Record<string, string>,
  candidates: Candidate[],
  registryEnabled: boolean,
  top: number,
): string => {
  const lines: string[] = []
  lines.push("# Heartbeat Dependency Scorecard")
  lines.push("")
  lines.push(`Repo: \`${repo}\``)
  lines.push(`Selected app: \`${app.relativeDirectory}\`${app.packageJson.name ? ` (${app.packageJson.name})` : ""}`)
  lines.push(`Direct external production dependencies: ${Object.keys(deps).length}`)
  lines.push(`Registry enrichment: ${registryEnabled ? "enabled" : "disabled"}`)
  lines.push("")
  lines.push("## Top Candidates")
  lines.push("")
  lines.push("| Rank | Dependency | Score | Usage | Version | Release age | Suggested action | Signals |")
  lines.push("| ---: | --- | ---: | --- | --- | --- | --- | --- |")

  for (const [index, candidate] of candidates.slice(0, top).entries()) {
    const usage =
      candidate.usage.references === 0
        ? "unused"
        : `${candidate.usage.references} refs / ${candidate.usage.files} files`
    const version = candidate.quality.installedVersion
      ? `${candidate.quality.installedVersion}${candidate.registry?.latestVersion ? ` -> ${candidate.registry.latestVersion}` : ""}`
      : "unknown"
    const releaseAge = candidate.registry?.releaseAgeDays !== undefined ? `${candidate.registry.releaseAgeDays}d` : "unknown"
    lines.push(
      `| ${index + 1} | \`${candidate.name}\` | ${candidate.score} | ${usage} | ${version} | ${releaseAge} | ${candidate.suggestedAction} | ${formatSignals(candidate.signals)} |`,
    )
  }

  lines.push("")
  lines.push("## Candidate Details")
  for (const candidate of candidates.slice(0, top)) {
    lines.push("")
    lines.push(`### ${candidate.name}`)
    lines.push("")
    lines.push(`- Range: \`${candidate.range}\``)
    lines.push(`- Installed path: \`${formatMaybe(candidate.quality.installedPackagePath)}\``)
    lines.push(`- Usage examples: ${candidate.usage.examples.map((example) => `\`${example}\``).join(", ") || "none"}`)
    lines.push(`- ESM-native: ${formatMaybe(candidate.quality.esmNative)}`)
    lines.push(`- Bundled types: ${formatMaybe(candidate.quality.bundledTypes)}`)
    lines.push(`- DefinitelyTyped found: ${candidate.quality.definitelyTyped}`)
    lines.push(`- TS source files in published package: ${formatMaybe(candidate.quality.tsSourceFiles)}`)
    lines.push(`- Runtime LOC estimate: ${formatMaybe(candidate.quality.runtimeLoc)}`)
    lines.push(`- Direct dependency count: ${formatMaybe(candidate.quality.directDependencyCount)}`)
    if (candidate.registry?.error) lines.push(`- Registry error: ${candidate.registry.error}`)
  }

  return `${lines.join("\n")}\n`
}

const main = async (): Promise<void> => {
  const options = parseArgs(Bun.argv.slice(2))
  const repo = path.resolve(options.repo)
  const rootPackagePath = path.join(repo, "package.json")

  if (!existsSync(rootPackagePath)) {
    throw new Error(`No package.json found at repo root: ${repo}`)
  }

  const packages = await loadWorkspacePackages(repo)
  const workspaceNames = new Set(packages.map((workspacePackage) => workspacePackage.packageJson.name).filter(Boolean) as string[])
  const app = selectApp(packages, workspaceNames, options.app)
  const deps = externalProductionDependencies(app.packageJson, workspaceNames)

  const dependencyNames = Object.keys(deps).sort()
  const usageEntries = await runLimited(dependencyNames, 12, async (dependencyName) => {
    return [dependencyName, await countUsage(app.directory, dependencyName)] as const
  })
  const qualityEntries = await runLimited(dependencyNames, 8, async (dependencyName) => {
    return [dependencyName, await qualityForDependency(repo, app.directory, dependencyName, packages)] as const
  })
  const registryEntries = options.registry
    ? await runLimited(dependencyNames, 8, async (dependencyName) => {
        return [dependencyName, await fetchRegistryInfo(dependencyName)] as const
      })
    : []

  const usageByName = new Map(usageEntries)
  const qualityByName = new Map(qualityEntries)
  const registryByName = new Map(registryEntries)
  const candidates = dependencyNames
    .map((dependencyName) => {
      const candidate = scoreCandidate(
        dependencyName,
        usageByName.get(dependencyName)!,
        qualityByName.get(dependencyName)!,
        registryByName.get(dependencyName),
      )
      return {
        ...candidate,
        range: deps[dependencyName]!,
      }
    })
    .sort((left, right) => {
      return (
        right.score - left.score ||
        left.usage.references - right.usage.references ||
        left.name.localeCompare(right.name)
      )
    })

  const result = {
    repo,
    selectedApp: {
      name: app.packageJson.name,
      directory: app.directory,
      relativeDirectory: app.relativeDirectory,
      directExternalProductionDependencyCount: dependencyNames.length,
    },
    registryEnabled: options.registry,
    candidates,
  }

  if (options.json) {
    console.log(JSON.stringify(result, null, 2))
    return
  }

  console.log(markdownReport(repo, app, deps, candidates, options.registry, options.top))
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
