import { describe, expect, test } from "bun:test"
import { DateTime, Effect } from "effect"
import { copyFile, unlink } from "node:fs/promises"
import { join } from "node:path"
import * as Patch from "./patch.js"
import { BookmarkFolder, BookmarkLeaf, BookmarkTree } from "./schema/__.js"
import * as Safari from "./safari.js"

// -- Test helpers --

const PLIST_PATH = join(process.env["HOME"]!, "Library/Safari/Bookmarks.plist")
const run = <A>(effect: Effect.Effect<A, Error>) => Effect.runPromise(effect)
const now = DateTime.unsafeNow()

// -- readBookmarks --

describe("readBookmarks", () => {
  test("reads actual Safari plist and produces a BookmarkTree", async () => {
    const tree = await run(Safari.readBookmarks(PLIST_PATH))
    expect(tree).toBeInstanceOf(BookmarkTree)
  })

  test("favorites_bar contains folders from BookmarksBar", async () => {
    const tree = await run(Safari.readBookmarks(PLIST_PATH))
    expect(tree.favorites_bar).toBeDefined()
    expect(tree.favorites_bar!.length).toBeGreaterThan(0)
    const firstItem = tree.favorites_bar![0]!
    expect(firstItem).toBeInstanceOf(BookmarkFolder)
  })

  test("reading_list contains leaves from com.apple.ReadingList", async () => {
    const tree = await run(Safari.readBookmarks(PLIST_PATH))
    expect(tree.reading_list).toBeDefined()
    expect(tree.reading_list!.length).toBeGreaterThan(0)
    const firstItem = tree.reading_list![0]!
    expect(firstItem).toBeInstanceOf(BookmarkLeaf)
    expect((firstItem as BookmarkLeaf).url).toMatch(/^https?:\/\//)
  })

  test("other section collects root-level folders and BookmarksMenu content", async () => {
    const tree = await run(Safari.readBookmarks(PLIST_PATH))
    expect(tree.other).toBeDefined()
    expect(tree.other!.length).toBeGreaterThan(0)
  })

  test("History proxy is excluded", async () => {
    const tree = await run(Safari.readBookmarks(PLIST_PATH))
    const allNames = [
      ...(tree.favorites_bar ?? []),
      ...(tree.other ?? []),
      ...(tree.reading_list ?? []),
    ].map((n) => ("name" in n ? n.name : ""))
    expect(allNames).not.toContain("History")
  })

  test("leaf nodes have name and url", async () => {
    const tree = await run(Safari.readBookmarks(PLIST_PATH))
    const leaf = tree.reading_list![0]! as BookmarkLeaf
    expect(leaf.name).toBeTruthy()
    expect(leaf.url).toBeTruthy()
    expect(leaf.url).toMatch(/^https?:\/\//)
  })

  test("folder nodes have name and children", async () => {
    const tree = await run(Safari.readBookmarks(PLIST_PATH))
    const folder = tree.favorites_bar![0]! as BookmarkFolder
    expect(folder.name).toBeTruthy()
    expect(Array.isArray(folder.children)).toBe(true)
  })
})

// -- applyPatches --

describe("applyPatches", () => {
  const tmpPlist = join(process.env["HOME"]!, "Library/Safari/Bookmarks.plist.test-copy")

  const setupCopy = async () => {
    await copyFile(PLIST_PATH, tmpPlist)
    return tmpPlist
  }

  const cleanup = async () => {
    try { await unlink(tmpPlist) } catch { /* ignore */ }
  }

  test("Add patch inserts a new leaf", async () => {
    const path = await setupCopy()
    try {
      const testUrl = "https://test-bookmark-add.example.com/"
      const testName = "Test Add Bookmark"

      await run(Safari.applyPatches(path, [
        Patch.Add({ url: testUrl, name: testName, path: "favorites_bar", date: now }),
      ]))

      const tree = await run(Safari.readBookmarks(path))
      const found = (tree.favorites_bar ?? []).find(
        (n): n is BookmarkLeaf => BookmarkLeaf.is(n) && n.url === testUrl,
      )
      expect(found).toBeDefined()
      expect(found!.name).toBe(testName)
    } finally {
      await cleanup()
    }
  })

  test("Remove patch deletes a leaf", async () => {
    const path = await setupCopy()
    try {
      const treeBefore = await run(Safari.readBookmarks(path))
      const target = treeBefore.reading_list![0]! as BookmarkLeaf

      await run(Safari.applyPatches(path, [
        Patch.Remove({ url: target.url, path: "reading_list", date: now }),
      ]))

      const treeAfter = await run(Safari.readBookmarks(path))
      const remainingUrls = (treeAfter.reading_list ?? [])
        .filter((n): n is BookmarkLeaf => BookmarkLeaf.is(n))
        .map((n) => n.url)
      expect(remainingUrls).not.toContain(target.url)
    } finally {
      await cleanup()
    }
  })

  test("Rename patch updates a leaf's title", async () => {
    const path = await setupCopy()
    try {
      const treeBefore = await run(Safari.readBookmarks(path))
      const target = treeBefore.reading_list![0]! as BookmarkLeaf
      const newName = "RENAMED_TEST_BOOKMARK"

      await run(Safari.applyPatches(path, [
        Patch.Rename({ url: target.url, oldName: target.name, newName, date: now }),
      ]))

      const treeAfter = await run(Safari.readBookmarks(path))
      const found = (treeAfter.reading_list ?? []).find(
        (n): n is BookmarkLeaf => BookmarkLeaf.is(n) && n.url === target.url,
      )
      expect(found).toBeDefined()
      expect(found!.name).toBe(newName)
    } finally {
      await cleanup()
    }
  })

  test("Move patch relocates a leaf to a different section", async () => {
    const path = await setupCopy()
    try {
      const treeBefore = await run(Safari.readBookmarks(path))
      const target = treeBefore.reading_list![0]! as BookmarkLeaf

      await run(Safari.applyPatches(path, [
        Patch.Move({ url: target.url, fromPath: "reading_list", toPath: "favorites_bar", date: now }),
      ]))

      const treeAfter = await run(Safari.readBookmarks(path))

      // Gone from reading_list
      const remainingUrls = (treeAfter.reading_list ?? [])
        .filter((n): n is BookmarkLeaf => BookmarkLeaf.is(n))
        .map((n) => n.url)
      expect(remainingUrls).not.toContain(target.url)

      // Present in favorites_bar
      const found = (treeAfter.favorites_bar ?? []).find(
        (n): n is BookmarkLeaf => BookmarkLeaf.is(n) && n.url === target.url,
      )
      expect(found).toBeDefined()
      expect(found!.name).toBe(target.name)
    } finally {
      await cleanup()
    }
  })

  test("Add patch into nested folder path creates folders as needed", async () => {
    const path = await setupCopy()
    try {
      const testUrl = "https://test-nested-add.example.com/"
      const testName = "Nested Add Test"

      await run(Safari.applyPatches(path, [
        Patch.Add({ url: testUrl, name: testName, path: "other/NewFolder/SubFolder", date: now }),
      ]))

      const tree = await run(Safari.readBookmarks(path))
      // Navigate: other → NewFolder → SubFolder → leaf
      const newFolder = (tree.other ?? []).find(
        (n): n is BookmarkFolder => BookmarkFolder.is(n) && n.name === "NewFolder",
      )
      expect(newFolder).toBeDefined()
      const subFolder = newFolder!.children.find(
        (n): n is BookmarkFolder => BookmarkFolder.is(n) && n.name === "SubFolder",
      )
      expect(subFolder).toBeDefined()
      const leaf = subFolder!.children.find(
        (n): n is BookmarkLeaf => BookmarkLeaf.is(n) && n.url === testUrl,
      )
      expect(leaf).toBeDefined()
      expect(leaf!.name).toBe(testName)
    } finally {
      await cleanup()
    }
  })
})
