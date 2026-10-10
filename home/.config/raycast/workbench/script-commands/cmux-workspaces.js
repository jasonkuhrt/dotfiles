#!/Users/jasonkuhrt/.vite-plus/bin/bun

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title cmux Workspaces
// @raycast.mode fullOutput

// Optional parameters:
// @raycast.icon 🪟
// @raycast.packageName Jason's Workbench
// @raycast.description Show every cmux window, workspace, and active terminal.

const cmux = "/opt/homebrew/bin/cmux"

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

try {
  const tree = JSON.parse(await run([cmux, "tree", "--all", "--json"]))
  const workspaceCount = tree.windows.reduce(
    (count, window) => count + window.workspaces.length,
    0,
  )

  console.log(
    `cmux · ${tree.windows.length} window${tree.windows.length === 1 ? "" : "s"} · ${workspaceCount} workspace${workspaceCount === 1 ? "" : "s"}`,
  )

  for (const window of tree.windows) {
    const windowState = window.current ? " · CURRENT" : ""
    console.log(`\nWindow ${window.index + 1}${windowState}`)

    for (const workspace of window.workspaces) {
      const surfaceCount = workspace.panes.reduce(
        (count, pane) => count + pane.surfaces.length,
        0,
      )
      const marker = workspace.active ? "●" : workspace.selected ? "○" : " "
      const details = [
        `${workspace.panes.length} pane${workspace.panes.length === 1 ? "" : "s"}`,
        `${surfaceCount} surface${surfaceCount === 1 ? "" : "s"}`,
        workspace.pinned ? "pinned" : null,
      ].filter(Boolean)

      console.log(`  ${marker} ${workspace.title}  ·  ${details.join(" · ")}`)

      const selectedTitles = workspace.panes
        .flatMap((pane) => pane.surfaces)
        .filter((surface) => surface.selected && surface.title)
        .map((surface) => surface.title)

      if (selectedTitles.length > 0) {
        console.log(`      ${selectedTitles.join(" / ")}`)
      }
    }
  }

  console.log("\n● active workspace   ○ selected workspace")
} catch (error) {
  console.error("Could not read cmux workspaces.")
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
}
