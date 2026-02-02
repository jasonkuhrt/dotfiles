import { describe, expect, test } from "bun:test"
import { DateTime, Duration, Option } from "effect"
import * as Daemon from "./daemon.js"

// -- generatePlist --

describe("generatePlist", () => {
  const config: Daemon.DaemonConfig = {
    interval: Duration.hours(1),
    logDir: "/tmp/test-logs",
    workingDir: "/tmp/test-workdir",
    bunPath: "/usr/local/bin/bun",
  }

  test("produces valid XML with correct preamble", () => {
    const plist = Daemon.generatePlist(config)
    expect(plist).toStartWith(`<?xml version="1.0" encoding="UTF-8"?>`)
    expect(plist).toContain(`<!DOCTYPE plist PUBLIC`)
    expect(plist).toContain(`<plist version="1.0">`)
  })

  test("contains correct Label", () => {
    const plist = Daemon.generatePlist(config)
    expect(plist).toContain(`<key>Label</key>`)
    expect(plist).toContain(`<string>com.jasonkuhrt.bookmarks-sync</string>`)
  })

  test("contains ProgramArguments with bun path", () => {
    const plist = Daemon.generatePlist(config)
    expect(plist).toContain(`<key>ProgramArguments</key>`)
    expect(plist).toContain(`<string>/usr/local/bin/bun</string>`)
    expect(plist).toContain(`<string>run</string>`)
    expect(plist).toContain(`<string>bookmarks</string>`)
    expect(plist).toContain(`<string>sync</string>`)
  })

  test("contains WorkingDirectory", () => {
    const plist = Daemon.generatePlist(config)
    expect(plist).toContain(`<key>WorkingDirectory</key>`)
    expect(plist).toContain(`<string>/tmp/test-workdir</string>`)
  })

  test("contains log paths under logDir", () => {
    const plist = Daemon.generatePlist(config)
    expect(plist).toContain(`<key>StandardOutPath</key>`)
    expect(plist).toContain(`<string>/tmp/test-logs/bookmarks-sync.log</string>`)
    expect(plist).toContain(`<key>StandardErrorPath</key>`)
    expect(plist).toContain(`<string>/tmp/test-logs/bookmarks-sync.error.log</string>`)
  })
})

// -- Duration -> StartInterval conversion --

describe("Duration to StartInterval", () => {
  test("1 hour converts to 3600 seconds", () => {
    const config: Daemon.DaemonConfig = {
      interval: Duration.hours(1),
      logDir: "/tmp/logs",
      workingDir: "/tmp",
      bunPath: "/usr/local/bin/bun",
    }
    const plist = Daemon.generatePlist(config)
    expect(plist).toContain(`<key>StartInterval</key>`)
    expect(plist).toContain(`<integer>3600</integer>`)
  })

  test("30 minutes converts to 1800 seconds", () => {
    const config: Daemon.DaemonConfig = {
      interval: Duration.minutes(30),
      logDir: "/tmp/logs",
      workingDir: "/tmp",
      bunPath: "/usr/local/bin/bun",
    }
    const plist = Daemon.generatePlist(config)
    expect(plist).toContain(`<integer>1800</integer>`)
  })

  test("2 hours converts to 7200 seconds", () => {
    const config: Daemon.DaemonConfig = {
      interval: Duration.hours(2),
      logDir: "/tmp/logs",
      workingDir: "/tmp",
      bunPath: "/usr/local/bin/bun",
    }
    const plist = Daemon.generatePlist(config)
    expect(plist).toContain(`<integer>7200</integer>`)
  })
})

// -- DaemonStatus type uses Option<DateTime.Utc> --

describe("DaemonStatus", () => {
  test("lastRun and nextRun use Option<DateTime.Utc>", () => {
    const status: Daemon.DaemonStatus = {
      running: false,
      lastRun: Option.none(),
      nextRun: Option.none(),
      plistPath: "/tmp/test.plist",
    }
    expect(Option.isNone(status.lastRun)).toBe(true)
    expect(Option.isNone(status.nextRun)).toBe(true)
  })

  test("lastRun can hold a DateTime.Utc value", () => {
    const dt = DateTime.unsafeMake("2025-01-15T10:30:00Z")
    const status: Daemon.DaemonStatus = {
      running: true,
      lastRun: Option.some(dt),
      nextRun: Option.some(DateTime.addDuration(dt, Duration.hours(1))),
      plistPath: "/tmp/test.plist",
    }
    expect(Option.isSome(status.lastRun)).toBe(true)
    expect(Option.isSome(status.nextRun)).toBe(true)
  })
})
