import { afterEach, describe, expect, test } from "bun:test"
import { chmodSync, lstatSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, unlinkSync, writeFileSync, existsSync } from "node:fs"
import os from "node:os"
import path from "node:path"

import { createRuntimeContext } from "./env.js"
import { renderExplain } from "./explain.js"
import { healOnce } from "./heal.js"
import { writeJsonFile } from "./json.js"
import { renderHealPlist } from "./launchd.js"
import type { Manifest } from "./manifest.js"

const originalEnv = { ...process.env }

afterEach(() => {
  for (const key of Object.keys(process.env)) {
    if (!(key in originalEnv)) delete process.env[key]
  }
  for (const [key, value] of Object.entries(originalEnv)) {
    process.env[key] = value
  }
})

const makeTempRoot = (): string => mkdtempSync(path.join(os.tmpdir(), "dotctl-"))

const installFakeChezmoi = (binDir: string): string => {
  const scriptPath = path.join(binDir, "chezmoi")
  writeFileSync(
    scriptPath,
    `#!/usr/bin/env bun
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
const args = process.argv.slice(2);
const command = args[0];
const mapping = JSON.parse(readFileSync(process.env.FAKE_CHEZMOI_MAP, "utf8"));
const getTargetArg = () => [...args].reverse().find((arg) => !arg.startsWith("-"));
const target = getTargetArg();
if (command === "managed") {
  const payload = Object.fromEntries(Object.entries(mapping).map(([absolute, sourceAbsolute], index) => [String(index), { absolute, sourceAbsolute }]));
  console.log(JSON.stringify(payload));
  process.exit(0);
}
if (command === "cat" && args[1] === "--mode" && args[2] === "symlink") {
  console.log(mapping[target]);
  process.exit(0);
}
if (command === "re-add") {
  copyFileSync(target, mapping[target]);
  process.exit(0);
}
if (command === "apply") {
  const source = mapping[target];
  rmSync(target, { recursive: true, force: true });
  mkdirSync(path.dirname(target), { recursive: true });
  symlinkSync(source, target);
  process.exit(0);
}
if (command === "state") {
  process.exit(0);
}
if (command === "source-path") {
  console.log(mapping[target] ?? "");
  process.exit(mapping[target] ? 0 : 1);
}
if (command === "edit") {
  process.exit(0);
}
if (command === "execute-template") {
  const input = await new Response(Bun.stdin.stream()).text();
  process.stdout.write(input);
  process.exit(0);
}
console.error("unsupported fake chezmoi command", args.join(" "));
process.exit(1);
`,
    "utf8",
  )
  chmodSync(scriptPath, 0o755)
  return scriptPath
}

const writeSingleEntryManifest = (
  ctx: ReturnType<typeof createRuntimeContext>,
  targetAbs: string,
  sourceAbs: string,
  capturePolicy: "capture" | "relinkOnly" | "ignore",
): void => {
  const manifest: Manifest = {
    version: 1,
    generatedAt: new Date().toISOString(),
    repoRoot: ctx.repoRoot,
    homeDir: ctx.homeDir,
    trueDirs: [],
    fileEntries: [
      {
        lane: "fileSymlink",
        targetAbs,
        targetRel: path.relative(ctx.homeDir, targetAbs).split(path.sep).join("/"),
        targetDisplay: `~/${path.relative(ctx.homeDir, targetAbs).split(path.sep).join("/")}`,
        sourceAbs,
        sourceRel: path.relative(ctx.repoRoot, sourceAbs).split(path.sep).join("/"),
        expectedShape: "symlinkFile",
        capturePolicy,
      },
    ],
    promotionCandidates: [],
  }
  writeJsonFile(ctx.manifestPath, manifest)
}

describe("true-dir semantics", () => {
  test("edits and new files are instantly shared through a directory symlink", () => {
    const root = makeTempRoot()
    const repoDir = path.join(root, "repo")
    const homeDir = path.join(root, "home")
    const repoTarget = path.join(repoDir, "symlink-roots", "config", "dprint")
    const liveTarget = path.join(homeDir, ".config", "dprint")

    mkdirSync(repoTarget, { recursive: true })
    mkdirSync(path.dirname(liveTarget), { recursive: true })
    writeFileSync(path.join(repoTarget, "dprint.json"), "{\"lineWidth\":80}\n", "utf8")
    symlinkSync(repoTarget, liveTarget)

    writeFileSync(path.join(liveTarget, "local.json"), "{\"from\":\"home\"}\n", "utf8")
    expect(readFileSync(path.join(repoTarget, "local.json"), "utf8")).toContain("home")

    writeFileSync(path.join(repoTarget, "dprint.json"), "{\"lineWidth\":100}\n", "utf8")
    expect(readFileSync(path.join(liveTarget, "dprint.json"), "utf8")).toContain("100")

    unlinkSync(path.join(repoTarget, "local.json"))
    expect(existsSync(path.join(liveTarget, "local.json"))).toBe(false)

    rmSync(root, { recursive: true, force: true })
  })
})

describe("heal policies", () => {
  test("capture policy ingests changed bytes and restores symlink shape", () => {
    const root = makeTempRoot()
    const repoRoot = path.join(root, "repo")
    const homeDir = path.join(root, "home")
    const binDir = path.join(root, "bin")
    mkdirSync(repoRoot, { recursive: true })
    mkdirSync(homeDir, { recursive: true })
    mkdirSync(binDir, { recursive: true })

    const sourceAbs = path.join(repoRoot, "home", "dot_vimrc")
    const targetAbs = path.join(homeDir, ".vimrc")
    mkdirSync(path.dirname(sourceAbs), { recursive: true })
    mkdirSync(path.dirname(targetAbs), { recursive: true })
    writeFileSync(sourceAbs, "old\n", "utf8")
    symlinkSync(sourceAbs, targetAbs)
    rmSync(targetAbs, { force: true })
    writeFileSync(targetAbs, "new\n", "utf8")

    const mappingPath = path.join(root, "mapping.json")
    writeFileSync(mappingPath, JSON.stringify({ [targetAbs]: sourceAbs }), "utf8")
    installFakeChezmoi(binDir)

    process.env["HOME"] = homeDir
    process.env["DOTFILES_REPO_ROOT"] = repoRoot
    process.env["DOTFILES_CHEZMOI_BIN"] = path.join(binDir, "chezmoi")
    process.env["FAKE_CHEZMOI_MAP"] = mappingPath
    process.env["PATH"] = `${binDir}:${originalEnv["PATH"] ?? ""}`

    const ctx = createRuntimeContext()
    writeSingleEntryManifest(ctx, targetAbs, sourceAbs, "capture")

    const summary = healOnce(ctx, { background: false, strict: true })

    expect(summary.healed).toBe(1)
    expect(readFileSync(sourceAbs, "utf8")).toBe("new\n")
    expect(lstatSync(targetAbs).isSymbolicLink()).toBe(true)
    expect(readFileSync(ctx.capturesPath, "utf8")).toContain("capture")

    rmSync(root, { recursive: true, force: true })
  })

  test("capture policy also restores same-byte atomic replacements", () => {
    const root = makeTempRoot()
    const repoRoot = path.join(root, "repo")
    const homeDir = path.join(root, "home")
    const binDir = path.join(root, "bin")
    mkdirSync(repoRoot, { recursive: true })
    mkdirSync(homeDir, { recursive: true })
    mkdirSync(binDir, { recursive: true })

    const sourceAbs = path.join(repoRoot, "home", "dot_gitconfig")
    const targetAbs = path.join(homeDir, ".gitconfig")
    mkdirSync(path.dirname(sourceAbs), { recursive: true })
    writeFileSync(sourceAbs, "same\n", "utf8")
    symlinkSync(sourceAbs, targetAbs)
    rmSync(targetAbs, { force: true })
    writeFileSync(targetAbs, "same\n", "utf8")

    const mappingPath = path.join(root, "mapping.json")
    writeFileSync(mappingPath, JSON.stringify({ [targetAbs]: sourceAbs }), "utf8")
    installFakeChezmoi(binDir)

    process.env["HOME"] = homeDir
    process.env["DOTFILES_REPO_ROOT"] = repoRoot
    process.env["DOTFILES_CHEZMOI_BIN"] = path.join(binDir, "chezmoi")
    process.env["FAKE_CHEZMOI_MAP"] = mappingPath
    process.env["PATH"] = `${binDir}:${originalEnv["PATH"] ?? ""}`

    const ctx = createRuntimeContext()
    writeSingleEntryManifest(ctx, targetAbs, sourceAbs, "capture")

    const summary = healOnce(ctx, { background: false, strict: true })

    expect(summary.healed).toBe(1)
    expect(readFileSync(sourceAbs, "utf8")).toBe("same\n")
    expect(lstatSync(targetAbs).isSymbolicLink()).toBe(true)

    rmSync(root, { recursive: true, force: true })
  })

  test("relinkOnly restores symlink shape without changing source bytes", () => {
    const root = makeTempRoot()
    const repoRoot = path.join(root, "repo")
    const homeDir = path.join(root, "home")
    const binDir = path.join(root, "bin")
    mkdirSync(repoRoot, { recursive: true })
    mkdirSync(homeDir, { recursive: true })
    mkdirSync(binDir, { recursive: true })

    const sourceAbs = path.join(repoRoot, "home", "dot_npmrc")
    const targetAbs = path.join(homeDir, ".npmrc")
    mkdirSync(path.dirname(sourceAbs), { recursive: true })
    writeFileSync(sourceAbs, "source\n", "utf8")
    symlinkSync(sourceAbs, targetAbs)
    rmSync(targetAbs, { force: true })
    writeFileSync(targetAbs, "runtime\n", "utf8")

    const mappingPath = path.join(root, "mapping.json")
    writeFileSync(mappingPath, JSON.stringify({ [targetAbs]: sourceAbs }), "utf8")
    installFakeChezmoi(binDir)

    process.env["HOME"] = homeDir
    process.env["DOTFILES_REPO_ROOT"] = repoRoot
    process.env["DOTFILES_CHEZMOI_BIN"] = path.join(binDir, "chezmoi")
    process.env["FAKE_CHEZMOI_MAP"] = mappingPath
    process.env["PATH"] = `${binDir}:${originalEnv["PATH"] ?? ""}`

    const ctx = createRuntimeContext()
    writeSingleEntryManifest(ctx, targetAbs, sourceAbs, "relinkOnly")

    const summary = healOnce(ctx, { background: false, strict: true })

    expect(summary.healed).toBe(1)
    expect(readFileSync(sourceAbs, "utf8")).toBe("source\n")
    expect(lstatSync(targetAbs).isSymbolicLink()).toBe(true)

    rmSync(root, { recursive: true, force: true })
  })

  test("ignore leaves drift alone", () => {
    const root = makeTempRoot()
    const repoRoot = path.join(root, "repo")
    const homeDir = path.join(root, "home")
    const binDir = path.join(root, "bin")
    mkdirSync(repoRoot, { recursive: true })
    mkdirSync(homeDir, { recursive: true })
    mkdirSync(binDir, { recursive: true })

    const sourceAbs = path.join(repoRoot, "home", "dot_toolrc")
    const targetAbs = path.join(homeDir, ".toolrc")
    mkdirSync(path.dirname(sourceAbs), { recursive: true })
    writeFileSync(sourceAbs, "source\n", "utf8")
    symlinkSync(sourceAbs, targetAbs)
    rmSync(targetAbs, { force: true })
    writeFileSync(targetAbs, "runtime\n", "utf8")

    const mappingPath = path.join(root, "mapping.json")
    writeFileSync(mappingPath, JSON.stringify({ [targetAbs]: sourceAbs }), "utf8")
    installFakeChezmoi(binDir)

    process.env["HOME"] = homeDir
    process.env["DOTFILES_REPO_ROOT"] = repoRoot
    process.env["DOTFILES_CHEZMOI_BIN"] = path.join(binDir, "chezmoi")
    process.env["FAKE_CHEZMOI_MAP"] = mappingPath
    process.env["PATH"] = `${binDir}:${originalEnv["PATH"] ?? ""}`

    const ctx = createRuntimeContext()
    writeSingleEntryManifest(ctx, targetAbs, sourceAbs, "ignore")

    const summary = healOnce(ctx, { background: true, strict: false })

    expect(summary.healed).toBe(0)
    expect(readFileSync(sourceAbs, "utf8")).toBe("source\n")
    expect(lstatSync(targetAbs).isSymbolicLink()).toBe(false)

    rmSync(root, { recursive: true, force: true })
  })
})

describe("public contract helpers", () => {
  test("renderExplain describes true-dir and file-symlink targets", () => {
    const root = makeTempRoot()
    const repoRoot = path.join(root, "repo")
    const homeDir = path.join(root, "home")
    mkdirSync(path.join(repoRoot, "symlink-roots", "config", "dprint"), { recursive: true })
    mkdirSync(path.join(repoRoot, "home"), { recursive: true })
    mkdirSync(homeDir, { recursive: true })

    process.env["HOME"] = homeDir
    process.env["DOTFILES_REPO_ROOT"] = repoRoot
    const ctx = createRuntimeContext()

    const manifest: Manifest = {
      version: 1,
      generatedAt: new Date().toISOString(),
      repoRoot: ctx.repoRoot,
      homeDir: ctx.homeDir,
      trueDirs: [],
      fileEntries: [
        {
          lane: "fileSymlink",
          targetAbs: path.join(homeDir, ".vimrc"),
          targetRel: ".vimrc",
          targetDisplay: "~/.vimrc",
          sourceAbs: path.join(repoRoot, "home", "dot_vimrc"),
          sourceRel: "home/dot_vimrc",
          expectedShape: "symlinkFile",
          capturePolicy: "capture",
        },
      ],
      promotionCandidates: [],
    }
    writeJsonFile(ctx.manifestPath, manifest)

    expect(renderExplain(ctx, "~/.config/dprint")).toContain("lane: trueDir")
    expect(renderExplain(ctx, "~/.vimrc")).toContain("capture policy: capture")

    rmSync(root, { recursive: true, force: true })
  })

  test("renderHealPlist points launchd at dotctl background heal", () => {
    const root = makeTempRoot()
    const repoRoot = path.join(root, "repo")
    const homeDir = path.join(root, "home")
    mkdirSync(repoRoot, { recursive: true })
    mkdirSync(homeDir, { recursive: true })

    process.env["HOME"] = homeDir
    process.env["DOTFILES_REPO_ROOT"] = repoRoot
    const ctx = createRuntimeContext()
    const plist = renderHealPlist(ctx)

    expect(plist).toContain("packages/dotctl/src/bin/dotctl.ts")
    expect(plist).toContain("<string>heal</string>")
    expect(plist).toContain("<string>--background</string>")

    rmSync(root, { recursive: true, force: true })
  })
})
