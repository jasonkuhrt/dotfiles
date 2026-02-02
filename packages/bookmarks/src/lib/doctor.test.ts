import { describe, expect, test } from "bun:test"
import { Effect } from "effect"
import * as Doctor from "./doctor.js"

// -- Test helpers --

const run = <A, E>(effect: Effect.Effect<A, E>) => Effect.runPromise(effect)

// -- DoctorCheck / DoctorResult types --

describe("DoctorCheck", () => {
  test("has required shape with passing check", () => {
    const check: Doctor.DoctorCheck = {
      name: "test",
      passed: true,
      message: "all good",
    }
    expect(check.name).toBe("test")
    expect(check.passed).toBe(true)
    expect(check.message).toBe("all good")
    expect(check.fix).toBeUndefined()
  })

  test("has optional fix for failing check", () => {
    const check: Doctor.DoctorCheck = {
      name: "test",
      passed: false,
      message: "not good",
      fix: "do this",
    }
    expect(check.passed).toBe(false)
    expect(check.fix).toBe("do this")
  })
})

describe("DoctorResult", () => {
  test("allPassed is true when all checks pass", () => {
    const result: Doctor.DoctorResult = {
      checks: [
        { name: "a", passed: true, message: "ok" },
        { name: "b", passed: true, message: "ok" },
      ],
      allPassed: true,
    }
    expect(result.allPassed).toBe(true)
  })

  test("allPassed is false when any check fails", () => {
    const result: Doctor.DoctorResult = {
      checks: [
        { name: "a", passed: true, message: "ok" },
        { name: "b", passed: false, message: "fail", fix: "fix it" },
      ],
      allPassed: false,
    }
    expect(result.allPassed).toBe(false)
  })
})

// -- formatReport --

describe("formatReport", () => {
  test("uses checkmark for passing checks", () => {
    const result: Doctor.DoctorResult = {
      checks: [{ name: "Full Disk Access", passed: true, message: "granted" }],
      allPassed: true,
    }
    const report = Doctor.formatReport(result)
    expect(report).toContain("\u2713 Full Disk Access: granted")
    expect(report).toContain("All checks passed.")
  })

  test("uses cross for failing checks with fix", () => {
    const result: Doctor.DoctorResult = {
      checks: [
        {
          name: "Safari plist exists",
          passed: false,
          message: "not found",
          fix: "Launch Safari once.",
        },
      ],
      allPassed: false,
    }
    const report = Doctor.formatReport(result)
    expect(report).toContain("\u2717 Safari plist exists: not found")
    expect(report).toContain("Fix: Launch Safari once.")
    expect(report).toContain("Some checks failed.")
  })

  test("mixed pass/fail report", () => {
    const result: Doctor.DoctorResult = {
      checks: [
        { name: "A", passed: true, message: "ok" },
        { name: "B", passed: false, message: "bad", fix: "do X" },
        { name: "C", passed: true, message: "fine" },
      ],
      allPassed: false,
    }
    const report = Doctor.formatReport(result)
    expect(report).toContain("\u2713 A: ok")
    expect(report).toContain("\u2717 B: bad")
    expect(report).toContain("Fix: do X")
    expect(report).toContain("\u2713 C: fine")
  })

  test("failing check without fix omits Fix line", () => {
    const result: Doctor.DoctorResult = {
      checks: [
        { name: "X", passed: false, message: "broken" },
      ],
      allPassed: false,
    }
    const report = Doctor.formatReport(result)
    expect(report).toContain("\u2717 X: broken")
    expect(report).not.toContain("Fix:")
  })
})

// -- runDiagnostics --

describe("runDiagnostics", () => {
  test("returns a DoctorResult with all expected checks", async () => {
    const result = await run(Doctor.runDiagnostics())
    expect(result.checks.length).toBeGreaterThanOrEqual(6)
    expect(typeof result.allPassed).toBe("boolean")

    const names = result.checks.map((c) => c.name)
    expect(names).toContain("Full Disk Access")
    expect(names).toContain("Safari plist exists")
    expect(names).toContain("Chrome default profile exists")
    expect(names).toContain("YAML source of truth")
    expect(names).toContain("Safari not running")
    expect(names).toContain("Google Chrome not running")
  })

  test("each check has required fields", async () => {
    const result = await run(Doctor.runDiagnostics())
    for (const check of result.checks) {
      expect(typeof check.name).toBe("string")
      expect(typeof check.passed).toBe("boolean")
      expect(typeof check.message).toBe("string")
      if (check.fix !== undefined) {
        expect(typeof check.fix).toBe("string")
      }
    }
  })
})
