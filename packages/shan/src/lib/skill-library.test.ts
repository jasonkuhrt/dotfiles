import { describe, expect, test } from "bun:test"
import { Effect } from "effect"
import { mkdir, rm, writeFile } from "node:fs/promises"
import * as path from "node:path"
import * as Lib from "./skill-library.js"

const run = <A>(effect: Effect.Effect<A>) => Effect.runPromise(effect)

// ── Helpers ──────────────────────────────────────────────────────

const tmpBase = path.join(import.meta.dir, "__test_tmp__")

const createSkill = async (libraryDir: string, relPath: string, content = "") => {
  const skillDir = path.join(libraryDir, relPath)
  await mkdir(skillDir, { recursive: true })
  await writeFile(
    path.join(skillDir, "SKILL.md"),
    content || `---\ndescription: "Test skill ${relPath}"\n---\nTest skill`,
  )
}

// ── listLibrary ──────────────────────────────────────────────────

describe("listLibrary", () => {
  test("finds skills in user library", async () => {
    const userLib = path.join(tmpBase, "user-lib-1")
    try {
      await createSkill(userLib, "alpha")

      const results = await run(Lib.listLibrary([userLib]))
      const names = results.map((r) => r.colonName)
      expect(names).toContain("alpha")
    } finally {
      await rm(userLib, { recursive: true, force: true })
    }
  })

  test("finds skills in project library", async () => {
    const projectLib = path.join(tmpBase, "proj-lib-1")
    try {
      await createSkill(projectLib, "beta")

      const results = await run(Lib.listLibrary([projectLib]))
      const names = results.map((r) => r.colonName)
      expect(names).toContain("beta")
    } finally {
      await rm(projectLib, { recursive: true, force: true })
    }
  })

  test("finds skills across both user and project libraries", async () => {
    const userLib = path.join(tmpBase, "user-lib-2")
    const projectLib = path.join(tmpBase, "proj-lib-2")
    try {
      await createSkill(userLib, "alpha")
      await createSkill(projectLib, "beta")

      const results = await run(Lib.listLibrary([userLib, projectLib]))
      const names = results.map((r) => r.colonName)
      expect(names).toContain("alpha")
      expect(names).toContain("beta")
    } finally {
      await rm(userLib, { recursive: true, force: true })
      await rm(projectLib, { recursive: true, force: true })
    }
  })

  test("deduplicates skills present in both libraries (user wins)", async () => {
    const userLib = path.join(tmpBase, "user-lib-3")
    const projectLib = path.join(tmpBase, "proj-lib-3")
    try {
      await createSkill(userLib, "shared")
      await createSkill(projectLib, "shared")

      const results = await run(Lib.listLibrary([userLib, projectLib]))
      const shared = results.filter((r) => r.colonName === "shared")
      expect(shared).toHaveLength(1)
      expect(shared[0]!.libraryDir).toBe(userLib)
    } finally {
      await rm(userLib, { recursive: true, force: true })
      await rm(projectLib, { recursive: true, force: true })
    }
  })

  test("handles nonexistent library dirs gracefully", async () => {
    const results = await run(Lib.listLibrary(["/nonexistent/path"]))
    expect(results).toEqual([])
  })
})
