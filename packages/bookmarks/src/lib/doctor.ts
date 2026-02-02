/**
 * Doctor — pre-flight diagnostics for bookmark sync.
 *
 * Runs independent checks (Full Disk Access, plist paths, Chrome paths,
 * YAML validity, browser processes) and produces a checklist-style report.
 * Read-only — no side effects.
 */

import { Effect } from "effect"
import { homedir } from "node:os"
import { join } from "node:path"
import * as Permissions from "./permissions.js"
import * as YamlModule from "./yaml.js"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface DoctorCheck {
  readonly name: string
  readonly passed: boolean
  readonly message: string
  readonly fix?: string | undefined
}

export interface DoctorResult {
  readonly checks: readonly DoctorCheck[]
  readonly allPassed: boolean
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SAFARI_PLIST_PATH = join(homedir(), "Library/Safari/Bookmarks.plist")

const CHROME_DEFAULT_BOOKMARKS = join(
  homedir(),
  "Library/Application Support/Google/Chrome/Default/Bookmarks",
)

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const pass = (name: string, message: string): DoctorCheck => ({
  name,
  passed: true,
  message,
})

const fail = (name: string, message: string, fix: string): DoctorCheck => ({
  name,
  passed: false,
  message,
  fix,
})

// ---------------------------------------------------------------------------
// Individual checks
// ---------------------------------------------------------------------------

const checkFullDiskAccess = (): Effect.Effect<DoctorCheck> =>
  Effect.map(Permissions.checkFullDiskAccess(), (ok) =>
    ok
      ? pass("Full Disk Access", "Terminal has Full Disk Access — can read Safari plist")
      : fail(
          "Full Disk Access",
          "Terminal lacks Full Disk Access",
          "Open System Settings > Privacy & Security > Full Disk Access and enable your terminal app.",
        ),
  )

const checkSafariPlist = (): Effect.Effect<DoctorCheck> =>
  Effect.map(Permissions.checkTargetAvailable(SAFARI_PLIST_PATH), (ok) =>
    ok
      ? pass("Safari plist exists", `Found Safari plist at ${SAFARI_PLIST_PATH}`)
      : fail(
          "Safari plist exists",
          `Safari plist not found at ${SAFARI_PLIST_PATH}`,
          "Ensure Safari has been launched at least once so the plist is created.",
        ),
  )

const checkChromeProfile = (): Effect.Effect<DoctorCheck> =>
  Effect.map(Permissions.checkTargetAvailable(CHROME_DEFAULT_BOOKMARKS), (ok) =>
    ok
      ? pass("Chrome default profile exists", `Found Chrome bookmarks at ${CHROME_DEFAULT_BOOKMARKS}`)
      : fail(
          "Chrome default profile exists",
          `Chrome bookmarks not found at ${CHROME_DEFAULT_BOOKMARKS}`,
          "Ensure Google Chrome has been launched at least once so the Default profile is created.",
        ),
  )

const checkYamlValid = (yamlPath: string): Effect.Effect<DoctorCheck> =>
  YamlModule.load(yamlPath).pipe(
    Effect.map(() => pass("YAML source of truth", `bookmarks.yaml is valid at ${yamlPath}`)),
    Effect.catchAll((e) =>
      Effect.succeed(
        fail(
          "YAML source of truth",
          `bookmarks.yaml invalid: ${e.message}`,
          "Run 'bookmarks validate' for detailed errors, then fix bookmarks.yaml.",
        ),
      ),
    ),
  )

const checkBrowserNotRunning = (browser: string): Effect.Effect<DoctorCheck> =>
  Effect.map(Permissions.checkBrowserRunning(browser), (running) =>
    running
      ? fail(
          `${browser} not running`,
          `${browser} is currently running`,
          `Close ${browser} before syncing to avoid data corruption.`,
        )
      : pass(`${browser} not running`, `${browser} is not running`),
  )

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Run all diagnostic checks and return a structured result.
 * Each check is independent — all run even if some fail.
 */
export const runDiagnostics = (yamlPath?: string): Effect.Effect<DoctorResult> => {
  const resolvedYamlPath = yamlPath ?? join(process.cwd(), "bookmarks/bookmarks.yaml")

  return Effect.all(
    [
      checkFullDiskAccess(),
      checkSafariPlist(),
      checkChromeProfile(),
      checkYamlValid(resolvedYamlPath),
      checkBrowserNotRunning("Safari"),
      checkBrowserNotRunning("Google Chrome"),
    ],
    { concurrency: "unbounded" },
  ).pipe(
    Effect.map((checks): DoctorResult => ({
      checks,
      allPassed: checks.every((c) => c.passed),
    })),
  )
}

/**
 * Format a DoctorResult as a human-readable checklist string.
 */
export const formatReport = (result: DoctorResult): string => {
  const lines = result.checks.map((c) => {
    const icon = c.passed ? "\u2713" : "\u2717"
    const line = `${icon} ${c.name}: ${c.message}`
    if (!c.passed && c.fix) {
      return `${line}\n  Fix: ${c.fix}`
    }
    return line
  })

  const summary = result.allPassed
    ? "\nAll checks passed."
    : "\nSome checks failed. See fix instructions above."

  return [...lines, summary].join("\n")
}
