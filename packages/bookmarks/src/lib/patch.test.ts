import { describe, expect, test } from "bun:test"
import { DateTime, Effect, HashMap, Option } from "effect"
import { BookmarkLeaf, BookmarkFolder, BookmarkTree } from "./schema.js"
import * as Patch from "./patch.js"

// -- Test helpers --

const leaf = (name: string, url: string) => new BookmarkLeaf({ name, url })
const folder = (name: string, children: Array<BookmarkLeaf | BookmarkFolder>) =>
  new BookmarkFolder({ name, children })

const emptyTree = () => new BookmarkTree({})

const run = <A>(effect: Effect.Effect<A, Error>) =>
  Effect.runPromise(effect)

// -- flatten --

describe("flatten", () => {
  test("empty tree produces empty index", () => {
    const result = Patch.flatten(emptyTree())
    expect(HashMap.size(result.index)).toBe(0)
    expect(result.warnings).toEqual([])
  })

  test("flattens leaves across sections", () => {
    const tree = new BookmarkTree({
      favorites_bar: [leaf("A", "https://a.com")],
      other: [leaf("B", "https://b.com")],
    })
    const result = Patch.flatten(tree)
    expect(HashMap.size(result.index)).toBe(2)

    const a = HashMap.get(result.index, "https://a.com")
    expect(Option.isSome(a)).toBe(true)
    if (Option.isSome(a)) {
      expect(a.value.name).toBe("A")
      expect(a.value.path).toBe("favorites_bar")
    }
  })

  test("flattens nested folders with correct path", () => {
    const tree = new BookmarkTree({
      favorites_bar: [
        folder("AI", [
          folder("Tools", [leaf("ChatGPT", "https://chat.openai.com")]),
        ]),
      ],
    })
    const result = Patch.flatten(tree)
    const entry = HashMap.get(result.index, "https://chat.openai.com")
    expect(Option.isSome(entry)).toBe(true)
    if (Option.isSome(entry)) {
      expect(entry.value.path).toBe("favorites_bar/AI/Tools")
    }
  })

  test("duplicate URLs: first wins, produces warning", () => {
    const tree = new BookmarkTree({
      favorites_bar: [leaf("First", "https://dup.com")],
      other: [leaf("Second", "https://dup.com")],
    })
    const result = Patch.flatten(tree)
    expect(HashMap.size(result.index)).toBe(1)
    expect(result.warnings.length).toBe(1)
    expect(result.warnings[0]).toContain("Duplicate URL")

    const entry = HashMap.get(result.index, "https://dup.com")
    if (Option.isSome(entry)) {
      expect(entry.value.name).toBe("First")
    }
  })
})

// -- toTrie / fromTrie round-trip --

describe("toTrie / fromTrie", () => {
  test("round-trip preserves single leaf", () => {
    const tree = new BookmarkTree({
      favorites_bar: [leaf("A", "https://a.com")],
    })
    const result = Patch.fromTrie(Patch.toTrie(tree))
    expect(result.favorites_bar).toBeDefined()
    expect(result.favorites_bar!.length).toBe(1)
    const node = result.favorites_bar![0] as BookmarkLeaf
    expect(node.name).toBe("A")
    expect(node.url).toBe("https://a.com")
  })

  test("round-trip preserves nested folders", () => {
    const tree = new BookmarkTree({
      favorites_bar: [
        folder("AI", [
          leaf("GPT", "https://gpt.com"),
          folder("Research", [leaf("Papers", "https://papers.com")]),
        ]),
      ],
      other: [leaf("News", "https://news.com")],
    })
    const result = Patch.fromTrie(Patch.toTrie(tree))

    expect(result.favorites_bar).toBeDefined()
    expect(result.other).toBeDefined()
    expect(result.reading_list).toBeUndefined()
    expect(result.mobile).toBeUndefined()

    // Check nested structure
    const aiFolder = result.favorites_bar!.find(
      (n) => n instanceof BookmarkFolder && n.name === "AI",
    ) as BookmarkFolder
    expect(aiFolder).toBeDefined()
    expect(aiFolder.children.length).toBe(2)
  })

  test("round-trip with empty tree", () => {
    const tree = emptyTree()
    const result = Patch.fromTrie(Patch.toTrie(tree))
    expect(result.favorites_bar).toBeUndefined()
    expect(result.other).toBeUndefined()
  })
})

// -- generatePatches --

describe("generatePatches", () => {
  test("first run (empty lastSync) produces only Add patches", async () => {
    const lastSync = emptyTree()
    const current = new BookmarkTree({
      favorites_bar: [leaf("A", "https://a.com"), leaf("B", "https://b.com")],
    })
    const patches = await run(Patch.generatePatches(lastSync, current, "yaml"))
    expect(patches.length).toBe(2)
    expect(patches.every(Patch.$is("Add"))).toBe(true)
  })

  test("removed bookmarks produce Remove patches", async () => {
    const lastSync = new BookmarkTree({
      favorites_bar: [leaf("A", "https://a.com"), leaf("B", "https://b.com")],
    })
    const current = new BookmarkTree({
      favorites_bar: [leaf("A", "https://a.com")],
    })
    const patches = await run(Patch.generatePatches(lastSync, current, "yaml"))
    const removes = patches.filter(Patch.$is("Remove"))
    expect(removes.length).toBe(1)
    expect(removes[0]!.url).toBe("https://b.com")
  })

  test("renamed bookmark produces Rename patch", async () => {
    const lastSync = new BookmarkTree({
      favorites_bar: [leaf("Old Name", "https://a.com")],
    })
    const current = new BookmarkTree({
      favorites_bar: [leaf("New Name", "https://a.com")],
    })
    const patches = await run(Patch.generatePatches(lastSync, current, "yaml"))
    const renames = patches.filter(Patch.$is("Rename"))
    expect(renames.length).toBe(1)
    expect(renames[0]!.oldName).toBe("Old Name")
    expect(renames[0]!.newName).toBe("New Name")
  })

  test("moved bookmark produces Move patch", async () => {
    const lastSync = new BookmarkTree({
      favorites_bar: [leaf("A", "https://a.com")],
    })
    const current = new BookmarkTree({
      other: [leaf("A", "https://a.com")],
    })
    const patches = await run(Patch.generatePatches(lastSync, current, "yaml"))
    const moves = patches.filter(Patch.$is("Move"))
    expect(moves.length).toBe(1)
    expect(moves[0]!.fromPath).toBe("favorites_bar")
    expect(moves[0]!.toPath).toBe("other")
  })

  test("moved + renamed in one produces both patches", async () => {
    const lastSync = new BookmarkTree({
      favorites_bar: [leaf("Old", "https://a.com")],
    })
    const current = new BookmarkTree({
      other: [leaf("New", "https://a.com")],
    })
    const patches = await run(Patch.generatePatches(lastSync, current, "yaml"))
    expect(patches.filter(Patch.$is("Move")).length).toBe(1)
    expect(patches.filter(Patch.$is("Rename")).length).toBe(1)
  })

  test("no changes produces empty patches", async () => {
    const tree = new BookmarkTree({
      favorites_bar: [leaf("A", "https://a.com")],
    })
    const patches = await run(Patch.generatePatches(tree, tree, "yaml"))
    expect(patches.length).toBe(0)
  })

  test("all patches have DateTime.Utc dates", async () => {
    const lastSync = emptyTree()
    const current = new BookmarkTree({
      favorites_bar: [leaf("A", "https://a.com")],
    })
    const patches = await run(Patch.generatePatches(lastSync, current, "yaml"))
    for (const p of patches) {
      expect(DateTime.isDateTime(p.date)).toBe(true)
    }
  })
})
