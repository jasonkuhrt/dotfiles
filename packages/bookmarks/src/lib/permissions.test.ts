import { describe, expect, test } from "bun:test"
import { Effect, Exit } from "effect"
import { join } from "node:path"
import * as Permissions from "./permissions.js"

// -- Test helpers --

const run = <A, E>(effect: Effect.Effect<A, E>) => Effect.runPromise(effect)
const runExit = <A, E>(effect: Effect.Effect<A, E>) => Effect.runPromiseExit(effect)

// -- Tagged Error Types --

describe("PermissionDenied", () => {
  test("has _tag PermissionDenied", () => {
    const error = new Permissions.PermissionDenied({
      path: "/some/path",
      reason: "test reason",
    })
    expect(error._tag).toBe("PermissionDenied")
  })

  test("message includes path, reason, and macOS instructions", () => {
    const error = new Permissions.PermissionDenied({
      path: "/some/path",
      reason: "test reason",
    })
    expect(error.message).toContain("/some/path")
    expect(error.message).toContain("test reason")
    expect(error.message).toContain("System Settings")
    expect(error.message).toContain("Privacy & Security")
    expect(error.message).toContain("Full Disk Access")
  })
})

describe("BrowserRunning", () => {
  test("has _tag BrowserRunning", () => {
    const error = new Permissions.BrowserRunning({ browser: "Safari" })
    expect(error._tag).toBe("BrowserRunning")
  })

  test("message includes browser name and close instructions", () => {
    const error = new Permissions.BrowserRunning({ browser: "Safari" })
    expect(error.message).toContain("Safari")
    expect(error.message).toContain("currently running")
    expect(error.message).toContain("close Safari")
  })
})

describe("TargetUnavailable", () => {
  test("has _tag TargetUnavailable", () => {
    const error = new Permissions.TargetUnavailable({
      target: "Chrome",
      path: "/nonexistent/path",
    })
    expect(error._tag).toBe("TargetUnavailable")
  })

  test("message includes target and path", () => {
    const error = new Permissions.TargetUnavailable({
      target: "Chrome",
      path: "/nonexistent/path",
    })
    expect(error.message).toContain("Chrome")
    expect(error.message).toContain("/nonexistent/path")
  })
})

// -- checkFullDiskAccess --

describe("checkFullDiskAccess", () => {
  test("returns a boolean", async () => {
    const result = await run(Permissions.checkFullDiskAccess())
    expect(typeof result).toBe("boolean")
  })
})

// -- checkBrowserRunning --

describe("checkBrowserRunning", () => {
  test("returns false for a process that is not running", async () => {
    const result = await run(Permissions.checkBrowserRunning("__nonexistent_process_12345__"))
    expect(result).toBe(false)
  })

  test("returns a boolean for Safari", async () => {
    const result = await run(Permissions.checkBrowserRunning("Safari"))
    expect(typeof result).toBe("boolean")
  })
})

// -- checkTargetAvailable --

describe("checkTargetAvailable", () => {
  test("returns true for a file that exists", async () => {
    // package.json definitely exists in the project root
    const result = await run(Permissions.checkTargetAvailable(join(process.cwd(), "package.json")))
    expect(result).toBe(true)
  })

  test("returns false for a nonexistent path", async () => {
    const result = await run(Permissions.checkTargetAvailable("/nonexistent/path/bookmarks.plist"))
    expect(result).toBe(false)
  })
})

// -- requireTargetAvailable --

describe("requireTargetAvailable", () => {
  test("succeeds for an existing file", async () => {
    const exit = await runExit(Permissions.requireTargetAvailable("test", join(process.cwd(), "package.json")))
    expect(Exit.isSuccess(exit)).toBe(true)
  })

  test("fails with TargetUnavailable for a nonexistent file", async () => {
    const exit = await runExit(Permissions.requireTargetAvailable("Chrome", "/nonexistent/path"))
    expect(Exit.isFailure(exit)).toBe(true)
    if (Exit.isFailure(exit)) {
      const error = exit.cause
      // The cause should contain a TargetUnavailable error
      expect(error._tag).toBe("Fail")
    }
  })
})

// -- requireBrowserNotRunning --

describe("requireBrowserNotRunning", () => {
  test("succeeds when browser is not running", async () => {
    const exit = await runExit(Permissions.requireBrowserNotRunning("__nonexistent_process_12345__"))
    expect(Exit.isSuccess(exit)).toBe(true)
  })
})
