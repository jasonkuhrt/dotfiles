import { describe, expect, test } from "bun:test"
import { existsSync, mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from "node:fs"
import os from "node:os"
import path from "node:path"

import type { Manifest, ManifestFileEntry } from "./manifest.js"
import {
  findBrokenTargetEntries,
  findEntriesWithMissingSources,
  findOrphanedRepoSymlinksInPaths,
  findStaleFileEntries,
  pruneStaleFileEntries,
} from "./stale.js"

const makeTempRoot = (): string => mkdtempSync(path.join(os.tmpdir(), "dotctl-stale-"))

const makeFileEntry = (targetAbs: string, sourceAbs: string): ManifestFileEntry => ({
  lane: "fileSymlink",
  targetAbs,
  targetRel: path.basename(targetAbs),
  targetDisplay: targetAbs,
  sourceAbs,
  sourceRel: path.basename(sourceAbs),
  expectedShape: "symlinkFile",
  capturePolicy: "capture",
})

const makeManifest = (fileEntries: readonly ManifestFileEntry[]): Manifest => ({
  version: 1,
  generatedAt: new Date().toISOString(),
  repoRoot: "/repo",
  homeDir: "/home",
  trueDirs: [],
  fileEntries,
  promotionCandidates: [],
})

describe("stale symlink helpers", () => {
  test("findBrokenTargetEntries treats dangling symlinks as broken", () => {
    const root = makeTempRoot()
    const sourceAbs = path.join(root, "repo", "dot_config", "nvim.lua")
    const targetAbs = path.join(root, "home", ".config", "nvim.lua")
    mkdirSync(path.dirname(sourceAbs), { recursive: true })
    mkdirSync(path.dirname(targetAbs), { recursive: true })
    writeFileSync(sourceAbs, "return {}\n", "utf8")
    symlinkSync(sourceAbs, targetAbs)
    rmSync(sourceAbs, { force: true })

    const manifest = makeManifest([makeFileEntry(targetAbs, sourceAbs)])

    expect(findBrokenTargetEntries(manifest).map((entry) => entry.targetAbs)).toEqual([targetAbs])
    expect(findEntriesWithMissingSources(manifest).map((entry) => entry.targetAbs)).toEqual([targetAbs])

    rmSync(root, { recursive: true, force: true })
  })

  test("pruneStaleFileEntries removes stale symlinks that still point to the old source", () => {
    const root = makeTempRoot()
    const sourceAbs = path.join(root, "repo", "dot_config", "orphan.lua")
    const targetAbs = path.join(root, "home", ".config", "orphan.lua")
    mkdirSync(path.dirname(sourceAbs), { recursive: true })
    mkdirSync(path.dirname(targetAbs), { recursive: true })
    writeFileSync(sourceAbs, "return {}\n", "utf8")
    symlinkSync(sourceAbs, targetAbs)
    rmSync(sourceAbs, { force: true })

    const entry = makeFileEntry(targetAbs, sourceAbs)
    const staleEntries = findStaleFileEntries(makeManifest([entry]), makeManifest([]))

    expect(staleEntries).toHaveLength(1)
    expect(pruneStaleFileEntries(staleEntries)).toEqual({ scanned: 1, removed: 1, skipped: 0 })
    expect(existsSync(targetAbs)).toBe(false)

    rmSync(root, { recursive: true, force: true })
  })

  test("pruneStaleFileEntries skips symlinks that no longer point at the previous source", () => {
    const root = makeTempRoot()
    const sourceAbs = path.join(root, "repo", "dot_config", "old.lua")
    const replacementAbs = path.join(root, "repo", "dot_config", "replacement.lua")
    const targetAbs = path.join(root, "home", ".config", "old.lua")
    mkdirSync(path.dirname(sourceAbs), { recursive: true })
    mkdirSync(path.dirname(targetAbs), { recursive: true })
    writeFileSync(sourceAbs, "return {}\n", "utf8")
    writeFileSync(replacementAbs, "return { replacement = true }\n", "utf8")
    symlinkSync(replacementAbs, targetAbs)

    const entry = makeFileEntry(targetAbs, sourceAbs)
    const staleEntries = findStaleFileEntries(makeManifest([entry]), makeManifest([]))

    expect(pruneStaleFileEntries(staleEntries)).toEqual({ scanned: 1, removed: 0, skipped: 1 })
    expect(existsSync(targetAbs)).toBe(true)

    rmSync(root, { recursive: true, force: true })
  })

  test("findOrphanedRepoSymlinksInPaths finds dangling symlinks back into repo home", () => {
    const root = makeTempRoot()
    const repoRoot = path.join(root, "repo")
    const homeDir = path.join(root, "home")
    const orphanSourceAbs = path.join(repoRoot, "home", "dot_config", "nvim", "lua", "config", "cmdline_cli.lua")
    const liveOrphanAbs = path.join(homeDir, ".config", "nvim", "lua", "config", "cmdline_cli.lua")
    const existingSourceAbs = path.join(repoRoot, "home", "dot_config", "nvim", "lua", "config", "options.lua")
    const liveManagedAbs = path.join(homeDir, ".config", "nvim", "lua", "config", "options.lua")
    const externalSourceAbs = path.join(root, "external", "tool.lua")
    const liveExternalAbs = path.join(homeDir, ".config", "nvim", "lua", "config", "external.lua")

    mkdirSync(path.dirname(liveOrphanAbs), { recursive: true })
    mkdirSync(path.dirname(existingSourceAbs), { recursive: true })
    mkdirSync(path.dirname(externalSourceAbs), { recursive: true })
    symlinkSync(orphanSourceAbs, liveOrphanAbs)
    writeFileSync(existingSourceAbs, "return {}\n", "utf8")
    symlinkSync(existingSourceAbs, liveManagedAbs)
    symlinkSync(externalSourceAbs, liveExternalAbs)

    expect(findOrphanedRepoSymlinksInPaths({ repoRoot, homeDir }, [liveOrphanAbs, liveManagedAbs, liveExternalAbs])).toEqual([
      {
        targetAbs: liveOrphanAbs,
        targetDisplay: "~/.config/nvim/lua/config/cmdline_cli.lua",
        sourceAbs: orphanSourceAbs,
      },
    ])

    rmSync(root, { recursive: true, force: true })
  })
})
