#!/Users/jasonkuhrt/.vite-plus/bin/bun

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title Heartbeat: My Pull Requests
// @raycast.mode fullOutput

// Optional parameters:
// @raycast.icon 🫀
// @raycast.packageName Jason's Workbench
// @raycast.description Show my open Heartbeat pull requests with CI and review state.

const gh = "/opt/homebrew/bin/gh"
const repository = "heartbeat-chat/Heartbeat"

const run = async (command) => {
  const process = Bun.spawn(command, { stdout: "pipe", stderr: "pipe" })
  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(process.stdout).text(),
    new Response(process.stderr).text(),
    process.exited,
  ])

  if (exitCode !== 0) {
    throw new Error(stderr.trim() || `Command exited with status ${exitCode}`)
  }

  return stdout
}

const checkState = (checks) => {
  const counts = {
    failed: 0,
    passed: 0,
    running: 0,
    skipped: 0,
    unknown: 0,
  }

  for (const check of checks) {
    if (check.__typename === "StatusContext") {
      if (check.state === "SUCCESS") counts.passed += 1
      else if (["ERROR", "FAILURE"].includes(check.state)) counts.failed += 1
      else if (["EXPECTED", "PENDING"].includes(check.state)) counts.running += 1
      else counts.unknown += 1
      continue
    }

    if (check.status !== "COMPLETED") counts.running += 1
    else if (check.conclusion === "SUCCESS") counts.passed += 1
    else if (["NEUTRAL", "SKIPPED"].includes(check.conclusion)) counts.skipped += 1
    else if (
      ["ACTION_REQUIRED", "CANCELLED", "FAILURE", "STALE", "STARTUP_FAILURE", "TIMED_OUT"].includes(
        check.conclusion,
      )
    ) {
      counts.failed += 1
    } else counts.unknown += 1
  }

  if (checks.length === 0) return "no CI"

  const summary = [
    counts.failed > 0 ? `${counts.failed} failed` : null,
    counts.running > 0 ? `${counts.running} running` : null,
    counts.unknown > 0 ? `${counts.unknown} unknown` : null,
    counts.passed > 0 ? `${counts.passed} passed` : null,
    counts.skipped > 0 ? `${counts.skipped} skipped` : null,
  ].filter(Boolean)

  return `CI: ${summary.join(", ")}`
}

const reviewState = (decision) => {
  if (decision === "APPROVED") return "approved"
  if (decision === "CHANGES_REQUESTED") return "changes requested"
  if (decision === "REVIEW_REQUIRED") return "review required"
  return "review open"
}

try {
  const fields = [
    "number",
    "title",
    "url",
    "isDraft",
    "reviewDecision",
    "statusCheckRollup",
    "headRefName",
  ].join(",")
  const pullRequests = JSON.parse(
    await run([
      gh,
      "pr",
      "list",
      "--repo",
      repository,
      "--author",
      "@me",
      "--state",
      "open",
      "--limit",
      "30",
      "--json",
      fields,
    ]),
  )

  console.log(`Heartbeat · ${pullRequests.length} open pull request${pullRequests.length === 1 ? "" : "s"}`)

  if (pullRequests.length === 0) {
    console.log("\nNo open pull requests authored by you.")
  }

  for (const pullRequest of pullRequests) {
    const state = [
      pullRequest.isDraft ? "draft" : "open",
      checkState(pullRequest.statusCheckRollup),
      reviewState(pullRequest.reviewDecision),
    ]

    console.log(`\n#${pullRequest.number}  ${pullRequest.title}`)
    console.log(`  ${state.join(" · ")}`)
    console.log(`  ${pullRequest.headRefName}`)
    console.log(`  ${pullRequest.url}`)
  }
} catch (error) {
  console.error("Could not read Heartbeat pull requests.")
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
}
