import { describe, expect, test } from "bun:test"
import { DateTime, Effect } from "effect"
import { BookmarkFolder, BookmarkLeaf, BookmarkTree } from "./schema/__.js"
import * as Patch from "./patch.js"
import * as Sync from "./sync.js"

// -- Test helpers --

const leaf = (name: string, url: string) => new BookmarkLeaf({ name, url })

const emptyTree = () => new BookmarkTree({})

const run = <A>(effect: Effect.Effect<A, Error>) =>
  Effect.runPromise(effect)

const makeDate = (iso: string): DateTime.Utc =>
  DateTime.unsafeMake(iso)

// -- resolveConflicts --

describe("resolveConflicts", () => {
  test("non-overlapping patches: all applied, none graveyarded", async () => {
    const yamlPatches = [Patch.Add({ url: "https://a.com", name: "A", path: "favorites_bar", date: makeDate("2025-01-01") })]
    const browserPatches = [Patch.Add({ url: "https://b.com", name: "B", path: "favorites_bar", date: makeDate("2025-01-01") })]

    const result = await run(Sync.resolveConflicts(yamlPatches, browserPatches))
    expect(result.apply.length).toBe(2)
    expect(result.graveyard.length).toBe(0)
  })

  test("conflicting URL: newest wins", async () => {
    const older = makeDate("2025-01-01")
    const newer = makeDate("2025-06-01")

    const yamlPatches = [Patch.Add({ url: "https://conflict.com", name: "YAML Version", path: "favorites_bar", date: older })]
    const browserPatches = [Patch.Add({ url: "https://conflict.com", name: "Browser Version", path: "favorites_bar", date: newer })]

    const result = await run(Sync.resolveConflicts(yamlPatches, browserPatches))
    expect(result.apply.length).toBe(1)
    expect(result.graveyard.length).toBe(1)

    // Browser is newer → browser wins
    const applied = result.apply[0]!
    expect(Patch.$is("Add")(applied)).toBe(true)
    if (Patch.$is("Add")(applied)) {
      expect(applied.name).toBe("Browser Version")
    }
    const graveyarded = result.graveyard[0]!
    if (Patch.$is("Add")(graveyarded)) {
      expect(graveyarded.name).toBe("YAML Version")
    }
  })

  test("tie-break: YAML wins when dates are equal", async () => {
    const sameDate = makeDate("2025-03-15")

    const yamlPatches = [Patch.Add({ url: "https://tie.com", name: "YAML", path: "favorites_bar", date: sameDate })]
    const browserPatches = [Patch.Add({ url: "https://tie.com", name: "Browser", path: "favorites_bar", date: sameDate })]

    const result = await run(Sync.resolveConflicts(yamlPatches, browserPatches))
    expect(result.apply.length).toBe(1)
    expect(result.graveyard.length).toBe(1)
    const applied = result.apply[0]!
    if (Patch.$is("Add")(applied)) {
      expect(applied.name).toBe("YAML")
    }
  })

  test("empty inputs produce empty results", async () => {
    const result = await run(Sync.resolveConflicts([], []))
    expect(result.apply.length).toBe(0)
    expect(result.graveyard.length).toBe(0)
  })

  test("one side empty: all from other side applied", async () => {
    const patches = [
      Patch.Add({ url: "https://a.com", name: "A", path: "favorites_bar", date: makeDate("2025-01-01") }),
      Patch.Remove({ url: "https://b.com", path: "favorites_bar", date: makeDate("2025-01-01") }),
    ]
    const result = await run(Sync.resolveConflicts(patches, []))
    expect(result.apply.length).toBe(2)
    expect(result.graveyard.length).toBe(0)
  })
})

// -- applyPatches --

describe("applyPatches", () => {
  test("add to empty tree creates section and leaf", async () => {
    const tree = emptyTree()
    const patches = [
      Patch.Add({ url: "https://a.com", name: "A", path: "favorites_bar", date: makeDate("2025-01-01") }),
    ]
    const result = await run(Sync.applyPatches(tree, patches))
    expect(result.favorites_bar).toBeDefined()
    expect(result.favorites_bar!.length).toBe(1)
    const node = result.favorites_bar![0] as BookmarkLeaf
    expect(node.name).toBe("A")
    expect(node.url).toBe("https://a.com")
  })

  test("add to nested folder path creates folders", async () => {
    const tree = emptyTree()
    const patches = [
      Patch.Add({ url: "https://gpt.com", name: "ChatGPT", path: "favorites_bar/AI/Tools", date: makeDate("2025-01-01") }),
    ]
    const result = await run(Sync.applyPatches(tree, patches))
    expect(result.favorites_bar).toBeDefined()

    const aiFolder = result.favorites_bar!.find(
      (n) => BookmarkFolder.is(n) && n.name === "AI",
    ) as BookmarkFolder
    expect(aiFolder).toBeDefined()

    const toolsFolder = aiFolder.children.find(
      (n) => BookmarkFolder.is(n) && n.name === "Tools",
    ) as BookmarkFolder
    expect(toolsFolder).toBeDefined()

    const gpt = toolsFolder.children.find(
      (n) => BookmarkLeaf.is(n) && n.url === "https://gpt.com",
    ) as BookmarkLeaf
    expect(gpt).toBeDefined()
    expect(gpt.name).toBe("ChatGPT")
  })

  test("remove deletes leaf from tree", async () => {
    const tree = new BookmarkTree({
      favorites_bar: [leaf("A", "https://a.com"), leaf("B", "https://b.com")],
    })
    const patches = [
      Patch.Remove({ url: "https://a.com", path: "favorites_bar", date: makeDate("2025-01-01") }),
    ]
    const result = await run(Sync.applyPatches(tree, patches))
    expect(result.favorites_bar).toBeDefined()
    expect(result.favorites_bar!.length).toBe(1)
    const remaining = result.favorites_bar![0] as BookmarkLeaf
    expect(remaining.url).toBe("https://b.com")
  })

  test("remove last leaf prunes empty section", async () => {
    const tree = new BookmarkTree({
      favorites_bar: [leaf("A", "https://a.com")],
      other: [leaf("B", "https://b.com")],
    })
    const patches = [
      Patch.Remove({ url: "https://a.com", path: "favorites_bar", date: makeDate("2025-01-01") }),
    ]
    const result = await run(Sync.applyPatches(tree, patches))
    expect(result.favorites_bar).toBeUndefined()
    expect(result.other).toBeDefined()
  })

  test("rename changes leaf name, preserves URL and position", async () => {
    const tree = new BookmarkTree({
      favorites_bar: [leaf("Old Name", "https://a.com")],
    })
    const patches = [
      Patch.Rename({ url: "https://a.com", oldName: "Old Name", newName: "New Name", date: makeDate("2025-01-01") }),
    ]
    const result = await run(Sync.applyPatches(tree, patches))
    expect(result.favorites_bar).toBeDefined()
    const node = result.favorites_bar!.find(
      (n) => BookmarkLeaf.is(n) && n.url === "https://a.com",
    ) as BookmarkLeaf
    expect(node).toBeDefined()
    expect(node.name).toBe("New Name")
  })

  test("move relocates leaf between sections", async () => {
    const tree = new BookmarkTree({
      favorites_bar: [leaf("A", "https://a.com")],
    })
    const patches = [
      Patch.Move({ url: "https://a.com", fromPath: "favorites_bar", toPath: "other", date: makeDate("2025-01-01") }),
    ]
    const result = await run(Sync.applyPatches(tree, patches))
    expect(result.favorites_bar).toBeUndefined()
    expect(result.other).toBeDefined()
    const node = result.other!.find(
      (n) => BookmarkLeaf.is(n) && n.url === "https://a.com",
    ) as BookmarkLeaf
    expect(node).toBeDefined()
    expect(node.name).toBe("A")
  })

  test("multiple patches applied in correct order", async () => {
    const tree = new BookmarkTree({
      favorites_bar: [leaf("ToRemove", "https://remove.com"), leaf("ToRename", "https://rename.com")],
    })
    const patches = [
      Patch.Remove({ url: "https://remove.com", path: "favorites_bar", date: makeDate("2025-01-01") }),
      Patch.Rename({ url: "https://rename.com", oldName: "ToRename", newName: "Renamed", date: makeDate("2025-01-01") }),
      Patch.Add({ url: "https://new.com", name: "New", path: "favorites_bar", date: makeDate("2025-01-01") }),
    ]
    const result = await run(Sync.applyPatches(tree, patches))
    expect(result.favorites_bar).toBeDefined()

    const urls = result.favorites_bar!
      .filter((n): n is BookmarkLeaf => BookmarkLeaf.is(n))
      .map((n) => n.url)

    expect(urls).toContain("https://rename.com")
    expect(urls).toContain("https://new.com")
    expect(urls).not.toContain("https://remove.com")

    const renamed = result.favorites_bar!.find(
      (n) => BookmarkLeaf.is(n) && n.url === "https://rename.com",
    ) as BookmarkLeaf
    expect(renamed.name).toBe("Renamed")
  })

  test("empty patches returns tree unchanged", async () => {
    const tree = new BookmarkTree({
      favorites_bar: [leaf("A", "https://a.com")],
    })
    const result = await run(Sync.applyPatches(tree, []))
    expect(result.favorites_bar).toBeDefined()
    expect(result.favorites_bar!.length).toBe(1)
  })
})
