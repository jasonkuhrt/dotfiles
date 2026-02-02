import { describe, expect, test } from "bun:test"
import { DateTime, Effect } from "effect"
import { copyFile, unlink } from "node:fs/promises"
import { join } from "node:path"
import * as Chrome from "./chrome.js"
import * as Patch from "./patch.js"
import * as Schema from "./schema/__.js"

// -- Test helpers --

const BOOKMARKS_PATH = join(
  process.env["HOME"]!,
  "Library/Application Support/Google/Chrome/Default/Bookmarks",
)
const run = <A>(effect: Effect.Effect<A, Error>) => Effect.runPromise(effect)
const now = DateTime.unsafeNow()

// -- Timestamp conversion --

describe("chromeTimestampToUnixMs", () => {
  test("converts a known Chrome timestamp to a reasonable date", () => {
    // 13410289672995717 should decode to approximately 2025-12-15
    const unixMs = Chrome.chromeTimestampToUnixMs("13410289672995717")
    const date = new Date(unixMs)
    expect(date.getFullYear()).toBeGreaterThanOrEqual(2020)
    expect(date.getFullYear()).toBeLessThanOrEqual(2030)
  })

  test("zero returns zero", () => {
    expect(Chrome.chromeTimestampToUnixMs("0")).toBe(0)
  })

  test("round-trips through unixMsToChromeTimestamp within 1 second", () => {
    const original = Date.now()
    const chromeTs = Chrome.unixMsToChromeTimestamp(original)
    const roundTripped = Chrome.chromeTimestampToUnixMs(chromeTs)
    // Precision loss is sub-second due to microsecond → second → microsecond
    expect(Math.abs(original - roundTripped)).toBeLessThan(1000)
  })
})

describe("unixMsToChromeTimestamp", () => {
  test("produces a large numeric string (Windows epoch microseconds)", () => {
    const ts = Chrome.unixMsToChromeTimestamp(Date.now())
    expect(ts.length).toBeGreaterThan(15)
    expect(Number(ts)).toBeGreaterThan(13_000_000_000_000_000)
  })
})

// -- Checksum --

describe("calculateChecksum", () => {
  test("matches the stored checksum in the real Chrome bookmarks file", async () => {
    const text = await Bun.file(BOOKMARKS_PATH).text()
    const file = JSON.parse(text)
    const calculated = Chrome.calculateChecksum(file.roots)
    expect(calculated).toBe(file.checksum)
  })

  test("produces a 32-character hex string", async () => {
    const text = await Bun.file(BOOKMARKS_PATH).text()
    const file = JSON.parse(text)
    const checksum = Chrome.calculateChecksum(file.roots)
    expect(checksum).toMatch(/^[0-9a-f]{32}$/)
  })
})

// -- readBookmarks --

describe("readBookmarks", () => {
  test("reads actual Chrome bookmarks and produces a Schema.BookmarkTree", async () => {
    const tree = await run(Chrome.readBookmarks(BOOKMARKS_PATH))
    expect(tree).toBeInstanceOf(Schema.BookmarkTree)
  })

  test("favorites_bar contains bookmarks from bookmark_bar", async () => {
    const tree = await run(Chrome.readBookmarks(BOOKMARKS_PATH))
    expect(tree.favorites_bar).toBeDefined()
    expect(tree.favorites_bar!.length).toBeGreaterThan(0)
  })

  test("leaf nodes have name and url", async () => {
    const tree = await run(Chrome.readBookmarks(BOOKMARKS_PATH))
    // Find a leaf somewhere in the tree
    const findLeaf = (nodes: readonly (Schema.BookmarkLeaf | Schema.BookmarkFolder)[]): Schema.BookmarkLeaf | undefined => {
      for (const n of nodes) {
        if (Schema.BookmarkLeaf.is(n)) return n
        if (Schema.BookmarkFolder.is(n)) {
          const found = findLeaf(n.children as readonly (Schema.BookmarkLeaf | Schema.BookmarkFolder)[])
          if (found) return found
        }
      }
      return undefined
    }
    const leaf = findLeaf(tree.favorites_bar ?? [])
    expect(leaf).toBeDefined()
    expect(leaf!.name).toBeTruthy()
    expect(leaf!.url).toMatch(/^https?:\/\//)
  })

  test("folder nodes have name and children", async () => {
    const tree = await run(Chrome.readBookmarks(BOOKMARKS_PATH))
    const folder = tree.favorites_bar?.find(
      (n): n is Schema.BookmarkFolder => Schema.BookmarkFolder.is(n),
    )
    expect(folder).toBeDefined()
    expect(folder!.name).toBeTruthy()
    expect(Array.isArray(folder!.children)).toBe(true)
  })
})

// -- applyPatches --

describe("applyPatches", () => {
  const tmpBookmarks = join(
    process.env["HOME"]!,
    "Library/Application Support/Google/Chrome/Default/Bookmarks.test-copy",
  )

  const setupCopy = async () => {
    await copyFile(BOOKMARKS_PATH, tmpBookmarks)
    return tmpBookmarks
  }

  const cleanup = async () => {
    try {
      await unlink(tmpBookmarks)
    } catch {
      /* ignore */
    }
  }

  test("Add patch inserts a new leaf", async () => {
    const path = await setupCopy()
    try {
      const testUrl = "https://test-chrome-add.example.com/"
      const testName = "Test Chrome Add Bookmark"

      await run(
        Chrome.applyPatches(path, [
          Patch.Add({ url: testUrl, name: testName, path: "favorites_bar", date: now }),
        ]),
      )

      const tree = await run(Chrome.readBookmarks(path))
      const found = (tree.favorites_bar ?? []).find(
        (n): n is Schema.BookmarkLeaf => Schema.BookmarkLeaf.is(n) && n.url === testUrl,
      )
      expect(found).toBeDefined()
      expect(found!.name).toBe(testName)
    } finally {
      await cleanup()
    }
  })

  test("Add patch preserves valid checksum", async () => {
    const path = await setupCopy()
    try {
      await run(
        Chrome.applyPatches(path, [
          Patch.Add({
            url: "https://test-checksum.example.com/",
            name: "Checksum Test",
            path: "favorites_bar",
            date: now,
          }),
        ]),
      )

      const text = await Bun.file(path).text()
      const file = JSON.parse(text)
      const calculated = Chrome.calculateChecksum(file.roots)
      expect(calculated).toBe(file.checksum)
    } finally {
      await cleanup()
    }
  })

  test("Remove patch deletes a leaf", async () => {
    const path = await setupCopy()
    try {
      const treeBefore = await run(Chrome.readBookmarks(path))
      // Find a leaf to remove
      const findLeaf = (
        nodes: readonly (Schema.BookmarkLeaf | Schema.BookmarkFolder)[],
      ): Schema.BookmarkLeaf | undefined => {
        for (const n of nodes) {
          if (Schema.BookmarkLeaf.is(n)) return n
          if (Schema.BookmarkFolder.is(n)) {
            const found = findLeaf(n.children as readonly (Schema.BookmarkLeaf | Schema.BookmarkFolder)[])
            if (found) return found
          }
        }
        return undefined
      }
      const target = findLeaf(treeBefore.favorites_bar ?? [])
      expect(target).toBeDefined()

      await run(
        Chrome.applyPatches(path, [
          Patch.Remove({ url: target!.url, path: "favorites_bar", date: now }),
        ]),
      )

      const treeAfter = await run(Chrome.readBookmarks(path))
      const allUrls: string[] = []
      const collectUrls = (nodes: readonly (Schema.BookmarkLeaf | Schema.BookmarkFolder)[]): void => {
        for (const n of nodes) {
          if (Schema.BookmarkLeaf.is(n)) allUrls.push(n.url)
          if (Schema.BookmarkFolder.is(n))
            collectUrls(n.children as readonly (Schema.BookmarkLeaf | Schema.BookmarkFolder)[])
        }
      }
      collectUrls(treeAfter.favorites_bar ?? [])
      expect(allUrls).not.toContain(target!.url)
    } finally {
      await cleanup()
    }
  })

  test("Rename patch updates a leaf's name", async () => {
    const path = await setupCopy()
    try {
      const treeBefore = await run(Chrome.readBookmarks(path))
      const findLeaf = (
        nodes: readonly (Schema.BookmarkLeaf | Schema.BookmarkFolder)[],
      ): Schema.BookmarkLeaf | undefined => {
        for (const n of nodes) {
          if (Schema.BookmarkLeaf.is(n)) return n
          if (Schema.BookmarkFolder.is(n)) {
            const found = findLeaf(n.children as readonly (Schema.BookmarkLeaf | Schema.BookmarkFolder)[])
            if (found) return found
          }
        }
        return undefined
      }
      const target = findLeaf(treeBefore.favorites_bar ?? [])
      expect(target).toBeDefined()
      const newName = "RENAMED_CHROME_TEST_BOOKMARK"

      await run(
        Chrome.applyPatches(path, [
          Patch.Rename({ url: target!.url, oldName: target!.name, newName, date: now }),
        ]),
      )

      const treeAfter = await run(Chrome.readBookmarks(path))
      const findByUrl = (
        nodes: readonly (Schema.BookmarkLeaf | Schema.BookmarkFolder)[],
        url: string,
      ): Schema.BookmarkLeaf | undefined => {
        for (const n of nodes) {
          if (Schema.BookmarkLeaf.is(n) && n.url === url) return n
          if (Schema.BookmarkFolder.is(n)) {
            const found = findByUrl(n.children as readonly (Schema.BookmarkLeaf | Schema.BookmarkFolder)[], url)
            if (found) return found
          }
        }
        return undefined
      }
      const found = findByUrl(treeAfter.favorites_bar ?? [], target!.url)
      expect(found).toBeDefined()
      expect(found!.name).toBe(newName)
    } finally {
      await cleanup()
    }
  })

  test("Move patch relocates a leaf to a different section", async () => {
    const path = await setupCopy()
    try {
      const treeBefore = await run(Chrome.readBookmarks(path))
      const findLeaf = (
        nodes: readonly (Schema.BookmarkLeaf | Schema.BookmarkFolder)[],
      ): Schema.BookmarkLeaf | undefined => {
        for (const n of nodes) {
          if (Schema.BookmarkLeaf.is(n)) return n
          if (Schema.BookmarkFolder.is(n)) {
            const found = findLeaf(n.children as readonly (Schema.BookmarkLeaf | Schema.BookmarkFolder)[])
            if (found) return found
          }
        }
        return undefined
      }
      const target = findLeaf(treeBefore.favorites_bar ?? [])
      expect(target).toBeDefined()

      await run(
        Chrome.applyPatches(path, [
          Patch.Move({
            url: target!.url,
            fromPath: "favorites_bar",
            toPath: "other",
            date: now,
          }),
        ]),
      )

      const treeAfter = await run(Chrome.readBookmarks(path))

      // Gone from favorites_bar
      const favUrls: string[] = []
      const collectUrls = (nodes: readonly (Schema.BookmarkLeaf | Schema.BookmarkFolder)[]): void => {
        for (const n of nodes) {
          if (Schema.BookmarkLeaf.is(n)) favUrls.push(n.url)
          if (Schema.BookmarkFolder.is(n))
            collectUrls(n.children as readonly (Schema.BookmarkLeaf | Schema.BookmarkFolder)[])
        }
      }
      collectUrls(treeAfter.favorites_bar ?? [])
      expect(favUrls).not.toContain(target!.url)

      // Present in other
      const collectOtherUrls = (nodes: readonly (Schema.BookmarkLeaf | Schema.BookmarkFolder)[]): string[] => {
        const urls: string[] = []
        for (const n of nodes) {
          if (Schema.BookmarkLeaf.is(n)) urls.push(n.url)
          if (Schema.BookmarkFolder.is(n))
            urls.push(
              ...collectOtherUrls(n.children as readonly (Schema.BookmarkLeaf | Schema.BookmarkFolder)[]),
            )
        }
        return urls
      }
      const foundInOther = collectOtherUrls(treeAfter.other ?? [])
      expect(foundInOther).toContain(target!.url)
    } finally {
      await cleanup()
    }
  })

  test("Add patch into nested folder path creates folders as needed", async () => {
    const path = await setupCopy()
    try {
      const testUrl = "https://test-chrome-nested-add.example.com/"
      const testName = "Nested Chrome Add Test"

      await run(
        Chrome.applyPatches(path, [
          Patch.Add({
            url: testUrl,
            name: testName,
            path: "other/NewFolder/SubFolder",
            date: now,
          }),
        ]),
      )

      const tree = await run(Chrome.readBookmarks(path))
      // Navigate: other -> NewFolder -> SubFolder -> leaf
      const newFolder = (tree.other ?? []).find(
        (n): n is Schema.BookmarkFolder => Schema.BookmarkFolder.is(n) && n.name === "NewFolder",
      )
      expect(newFolder).toBeDefined()
      const subFolder = newFolder!.children.find(
        (n): n is Schema.BookmarkFolder => Schema.BookmarkFolder.is(n) && n.name === "SubFolder",
      )
      expect(subFolder).toBeDefined()
      const leaf = subFolder!.children.find(
        (n): n is Schema.BookmarkLeaf => Schema.BookmarkLeaf.is(n) && n.url === testUrl,
      )
      expect(leaf).toBeDefined()
      expect(leaf!.name).toBe(testName)
    } finally {
      await cleanup()
    }
  })
})
