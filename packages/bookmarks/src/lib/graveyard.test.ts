import { describe, expect, test } from "bun:test"
import { DateTime, Duration, Effect, Option, TestClock, TestContext } from "effect"
import * as Graveyard from "./graveyard.js"
import * as Patch from "./patch.js"
import { BookmarkFolder, BookmarkLeaf, BookmarkTree } from "./schema/__.js"

// -- Test helpers --

const leaf = (name: string, url: string) => BookmarkLeaf.make({ name, url })
const folder = (name: string, children: Array<BookmarkLeaf | BookmarkFolder>) =>
  BookmarkFolder.make({ name, children })

const emptyTree = () => BookmarkTree.make({})

const run = <A>(effect: Effect.Effect<A, Error>) =>
  Effect.runPromise(
    effect.pipe(Effect.provide(TestContext.TestContext)),
  )

const mkDate = (iso: string): DateTime.Utc => DateTime.unsafeMake(iso) as DateTime.Utc

const mkAddPatch = (url: string, name: string, path: string, date: DateTime.Utc): Patch.BookmarkPatch =>
  Patch.Add({ url, name, path, date })

const mkRemovePatch = (url: string, path: string, date: DateTime.Utc): Patch.BookmarkPatch =>
  Patch.Remove({ url, path, date })

// -- parseEventFolderName --

describe("parseEventFolderName", () => {
  test("parses a valid graveyard folder name", () => {
    const result = Graveyard.parseEventFolderName("2025-01-15_safari_conflict")
    expect(Option.isSome(result)).toBe(true)
    if (Option.isSome(result)) {
      expect(result.value.source).toBe("safari")
      expect(result.value.reason).toBe("conflict")
    }
  })

  test("returns None for invalid folder name", () => {
    expect(Option.isNone(Graveyard.parseEventFolderName("not-a-graveyard-folder"))).toBe(true)
  })

  test("returns None for partial match", () => {
    expect(Option.isNone(Graveyard.parseEventFolderName("2025-01-15_safari"))).toBe(true)
  })

  test("returns None for empty string", () => {
    expect(Option.isNone(Graveyard.parseEventFolderName(""))).toBe(true)
  })
})

// -- makeEventFolderName --

describe("makeEventFolderName", () => {
  test("formats date, source, and reason into folder name", () => {
    const date = mkDate("2025-03-20")
    const name = Graveyard.makeEventFolderName(date, "safari", "conflict")
    expect(name).toBe("2025-03-20_safari_conflict")
  })

  test("round-trips through parse", () => {
    const date = mkDate("2025-06-15")
    const name = Graveyard.makeEventFolderName(date, "chrome-personal", "reorganized")
    const parsed = Graveyard.parseEventFolderName(name)
    expect(Option.isSome(parsed)).toBe(true)
    if (Option.isSome(parsed)) {
      expect(parsed.value.source).toBe("chrome-personal")
      expect(parsed.value.reason).toBe("reorganized")
    }
  })
})

// -- addToGraveyard --

describe("addToGraveyard", () => {
  test("creates _graveyard folder under other when none exists", async () => {
    const tree = emptyTree()
    const patch = mkAddPatch("https://example.com", "Example", "favorites_bar/Tools", mkDate("2025-01-01"))

    const result = await run(
      Graveyard.addToGraveyard(tree, patch, "safari", "conflict"),
    )

    expect(result.other).toBeDefined()
    const graveyardFolder = result.other!.find(
      (n): n is BookmarkFolder => BookmarkFolder.is(n) && n.name === "_graveyard",
    )
    expect(graveyardFolder).toBeDefined()
    expect(graveyardFolder!.children.length).toBe(1)
  })

  test("preserves original path as nested folders", async () => {
    const tree = emptyTree()
    const patch = mkAddPatch("https://chat.openai.com", "ChatGPT", "favorites_bar/AI/Tools", mkDate("2025-01-01"))

    const result = await run(
      Graveyard.addToGraveyard(tree, patch, "safari", "conflict"),
    )

    const graveyardFolder = result.other!.find(
      (n): n is BookmarkFolder => BookmarkFolder.is(n) && n.name === "_graveyard",
    )!
    // Event folder is the first child
    const eventFolder = graveyardFolder.children[0] as BookmarkFolder
    expect(eventFolder.name).toMatch(/^\d{4}-\d{2}-\d{2}_safari_conflict$/)

    // Path should be: favorites_bar/AI/Tools/ChatGPT (leaf)
    const pathRoot = eventFolder.children[0] as BookmarkFolder
    expect(pathRoot.name).toBe("favorites_bar")
    const aiFolder = pathRoot.children[0] as BookmarkFolder
    expect(aiFolder.name).toBe("AI")
    const toolsFolder = aiFolder.children[0] as BookmarkFolder
    expect(toolsFolder.name).toBe("Tools")
    const leafNode = toolsFolder.children[0] as BookmarkLeaf
    expect(leafNode.name).toBe("ChatGPT")
    expect(leafNode.url).toBe("https://chat.openai.com")
  })

  test("preserves existing other content", async () => {
    const tree = BookmarkTree.make({
      other: [leaf("Existing", "https://existing.com")],
    })
    const patch = mkAddPatch("https://example.com", "Example", "other", mkDate("2025-01-01"))

    const result = await run(
      Graveyard.addToGraveyard(tree, patch, "safari", "conflict"),
    )

    expect(result.other!.length).toBe(2) // existing leaf + _graveyard folder
    const existingLeaf = result.other!.find(
      (n): n is BookmarkLeaf => BookmarkLeaf.is(n) && n.name === "Existing",
    )
    expect(existingLeaf).toBeDefined()
  })

  test("handles Remove patch", async () => {
    const tree = emptyTree()
    const patch = mkRemovePatch("https://removed.com", "favorites_bar/Old", mkDate("2025-01-01"))

    const result = await run(
      Graveyard.addToGraveyard(tree, patch, "safari", "deleted"),
    )

    const graveyardFolder = result.other!.find(
      (n): n is BookmarkFolder => BookmarkFolder.is(n) && n.name === "_graveyard",
    )!
    expect(graveyardFolder.children.length).toBe(1)
    const eventFolder = graveyardFolder.children[0] as BookmarkFolder
    expect(eventFolder.name).toMatch(/^\d{4}-\d{2}-\d{2}_safari_deleted$/)
  })
})

// -- addGraveyardEntries --

describe("addGraveyardEntries", () => {
  test("adds multiple patches to graveyard", async () => {
    const tree = emptyTree()
    const patches = [
      mkAddPatch("https://a.com", "A", "favorites_bar", mkDate("2025-01-01")),
      mkAddPatch("https://b.com", "B", "other/Tools", mkDate("2025-01-01")),
    ]

    const result = await run(
      Graveyard.addGraveyardEntries(tree, patches, "safari", "conflict"),
    )

    const graveyardFolder = result.other!.find(
      (n): n is BookmarkFolder => BookmarkFolder.is(n) && n.name === "_graveyard",
    )!
    // Both patches should share the same event folder (same date, source, reason)
    const eventFolder = graveyardFolder.children[0] as BookmarkFolder
    expect(eventFolder.children.length).toBe(2)
  })

  test("returns tree unchanged for empty patches array", async () => {
    const tree = emptyTree()
    const result = await run(
      Graveyard.addGraveyardEntries(tree, [], "safari", "conflict"),
    )
    expect(result.other).toBeUndefined()
  })
})

// -- gc --

describe("gc", () => {
  const buildGraveyardTree = (eventFolderNames: string[]): BookmarkTree => {
    const eventFolders = eventFolderNames.map(
      (name) => folder(name, [leaf("bookmark", "https://example.com")]),
    )
    const graveyardFolder = folder("_graveyard", eventFolders)
    return BookmarkTree.make({ other: [graveyardFolder] })
  }

  test("removes entries older than maxAge", async () => {
    const tree = buildGraveyardTree([
      "2024-01-01_safari_conflict", // old
      "2025-12-01_safari_conflict", // recent
    ])

    const result = await run(
      Effect.gen(function* () {
        // Set clock to 2026-01-01
        yield* TestClock.setTime(DateTime.unsafeMake("2026-01-01").epochMillis)
        return yield* Graveyard.gc(tree, Duration.days(90))
      }),
    )

    const graveyardFolder = result.other!.find(
      (n): n is BookmarkFolder => BookmarkFolder.is(n) && n.name === "_graveyard",
    )!
    expect(graveyardFolder.children.length).toBe(1)
    expect((graveyardFolder.children[0] as BookmarkFolder).name).toBe("2025-12-01_safari_conflict")
  })

  test("removes graveyard folder when all entries are expired", async () => {
    const tree = buildGraveyardTree([
      "2024-01-01_safari_conflict",
      "2024-02-01_chrome-personal_reorganized",
    ])

    const result = await run(
      Effect.gen(function* () {
        yield* TestClock.setTime(DateTime.unsafeMake("2026-01-01").epochMillis)
        return yield* Graveyard.gc(tree, Duration.days(90))
      }),
    )

    // Graveyard folder should be removed entirely
    const graveyardFolder = result.other!.find(
      (n): n is BookmarkFolder => BookmarkFolder.is(n) && n.name === "_graveyard",
    )
    expect(graveyardFolder).toBeUndefined()
  })

  test("keeps all entries when none are expired", async () => {
    const tree = buildGraveyardTree([
      "2025-12-01_safari_conflict",
      "2025-12-15_safari_deleted",
    ])

    const result = await run(
      Effect.gen(function* () {
        yield* TestClock.setTime(DateTime.unsafeMake("2026-01-01").epochMillis)
        return yield* Graveyard.gc(tree, Duration.days(90))
      }),
    )

    const graveyardFolder = result.other!.find(
      (n): n is BookmarkFolder => BookmarkFolder.is(n) && n.name === "_graveyard",
    )!
    expect(graveyardFolder.children.length).toBe(2)
  })

  test("returns tree unchanged when no graveyard folder exists", async () => {
    const tree = BookmarkTree.make({ other: [leaf("A", "https://a.com")] })

    const result = await run(
      Effect.gen(function* () {
        yield* TestClock.setTime(DateTime.unsafeMake("2026-01-01").epochMillis)
        return yield* Graveyard.gc(tree, Duration.days(90))
      }),
    )

    expect(result.other!.length).toBe(1)
  })

  test("returns tree unchanged when other section is absent", async () => {
    const tree = emptyTree()

    const result = await run(
      Effect.gen(function* () {
        yield* TestClock.setTime(DateTime.unsafeMake("2026-01-01").epochMillis)
        return yield* Graveyard.gc(tree, Duration.days(90))
      }),
    )

    expect(result.other).toBeUndefined()
  })

  test("preserves non-graveyard content in other section", async () => {
    const existingLeaf = leaf("MyBookmark", "https://keep.com")
    const eventFolders = [folder("2024-01-01_safari_conflict", [leaf("old", "https://old.com")])]
    const graveyardFolder = folder("_graveyard", eventFolders)
    const tree = BookmarkTree.make({ other: [existingLeaf, graveyardFolder] })

    const result = await run(
      Effect.gen(function* () {
        yield* TestClock.setTime(DateTime.unsafeMake("2026-01-01").epochMillis)
        return yield* Graveyard.gc(tree, Duration.days(90))
      }),
    )

    // Graveyard removed (all entries expired), but existing leaf kept
    expect(result.other!.length).toBe(1)
    const kept = result.other![0] as BookmarkLeaf
    expect(kept.name).toBe("MyBookmark")
    expect(kept.url).toBe("https://keep.com")
  })

  test("keeps unparseable folder names", async () => {
    const tree = BookmarkTree.make({
      other: [
        folder("_graveyard", [
          folder("not-a-valid-name", [leaf("x", "https://x.com")]),
          folder("2024-01-01_safari_conflict", [leaf("old", "https://old.com")]),
        ]),
      ],
    })

    const result = await run(
      Effect.gen(function* () {
        yield* TestClock.setTime(DateTime.unsafeMake("2026-01-01").epochMillis)
        return yield* Graveyard.gc(tree, Duration.days(90))
      }),
    )

    const graveyardFolder = result.other!.find(
      (n): n is BookmarkFolder => BookmarkFolder.is(n) && n.name === "_graveyard",
    )!
    // Only the unparseable folder should remain
    expect(graveyardFolder.children.length).toBe(1)
    expect((graveyardFolder.children[0] as BookmarkFolder).name).toBe("not-a-valid-name")
  })
})
