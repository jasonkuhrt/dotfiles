import { createHash, randomUUID } from "node:crypto"
import { createReadStream } from "node:fs"
import {
  chmod,
  copyFile,
  lstat,
  mkdir,
  readdir,
  readlink,
  realpath,
  rm,
  symlink,
} from "node:fs/promises"
import path from "node:path"

import { run } from "./util.mjs"

const gitEnvironment = {
  GIT_PAGER: "cat",
  LC_ALL: "C",
}

const gitResult = (cwd, args, options = {}) =>
  run(
    "git",
    ["-c", "core.hooksPath=/dev/null", "-C", cwd, ...args],
    {
      cwd,
      env: { ...gitEnvironment, ...options.env },
      input: options.input,
      allowFailure: options.allowFailure,
    },
  )

const gitOutput = async (cwd, args, options = {}) => {
  const result = await gitResult(cwd, args, options)
  if (result.code !== 0 && !options.allowFailure) {
    throw new Error(
      `git ${args[0] ?? "command"} failed (${result.code}): ${result.stderr.trim()}`,
    )
  }
  return result
}

const hashText = (value) =>
  createHash("sha256").update(value).digest("hex")

const hashFile = (file) =>
  new Promise((resolve, reject) => {
    const hash = createHash("sha256")
    const stream = createReadStream(file)
    stream.on("error", reject)
    stream.on("data", (chunk) => hash.update(chunk))
    stream.on("end", () => resolve(hash.digest("hex")))
  })

const splitNul = (value) => {
  if (value.length === 0) return []
  const fields = value.split("\0")
  if (fields.at(-1) === "") fields.pop()
  return fields
}

const normalizedRoot = async (directory) => {
  const resolved = await realpath(directory)
  return path.resolve(resolved)
}

const resolveInside = (root, relative) => {
  if (
    relative.length === 0 ||
    path.isAbsolute(relative) ||
    relative.includes("\0")
  ) {
    throw new Error(`Unsafe Git path: ${JSON.stringify(relative)}`)
  }

  const resolved = path.resolve(root, relative)
  const relation = path.relative(root, resolved)
  if (relation === ".." || relation.startsWith(`..${path.sep}`)) {
    throw new Error(`Git path escapes its worktree: ${JSON.stringify(relative)}`)
  }
  return resolved
}

const mode = (stat) => stat.mode & 0o777

const snapshotNode = async (root, relative, records) => {
  const absolute = resolveInside(root, relative)
  const stat = await lstat(absolute)

  if (stat.isSymbolicLink()) {
    records.push({
      path: relative,
      type: "symlink",
      mode: mode(stat),
      target: await readlink(absolute),
    })
    return
  }

  if (stat.isFile()) {
    records.push({
      path: relative,
      type: "file",
      mode: mode(stat),
      size: stat.size,
      sha256: await hashFile(absolute),
    })
    return
  }

  if (stat.isDirectory()) {
    records.push({ path: relative, type: "directory", mode: mode(stat) })
    const entries = await readdir(absolute)
    entries.sort((left, right) => left.localeCompare(right))
    for (const entry of entries) {
      await snapshotNode(root, path.join(relative, entry), records)
    }
    return
  }

  throw new Error(
    `Unsupported untracked entry type at ${JSON.stringify(relative)}`,
  )
}

const minimalRoots = (paths) => {
  const sorted = [...new Set(paths)].sort((left, right) =>
    left.localeCompare(right),
  )
  const roots = []
  for (const candidate of sorted) {
    if (
      roots.some(
        (root) =>
          candidate === root || candidate.startsWith(`${root}${path.sep}`),
      )
    ) {
      continue
    }
    roots.push(candidate)
  }
  return roots
}

const snapshotUntracked = async (root, paths) => {
  const roots = minimalRoots(paths)
  const result = []
  for (const untrackedRoot of roots) {
    const records = []
    await snapshotNode(root, untrackedRoot, records)
    result.push({ root: untrackedRoot, records })
  }
  return result
}

const copyNode = async (sourceRoot, destinationRoot, relative) => {
  const source = resolveInside(sourceRoot, relative)
  const destination = resolveInside(destinationRoot, relative)
  const stat = await lstat(source)

  if (stat.isSymbolicLink()) {
    await mkdir(path.dirname(destination), { recursive: true })
    await symlink(await readlink(source), destination)
    return
  }

  if (stat.isFile()) {
    await mkdir(path.dirname(destination), { recursive: true })
    await copyFile(source, destination, 0)
    await chmod(destination, mode(stat))
    return
  }

  if (stat.isDirectory()) {
    await mkdir(destination, { recursive: false, mode: mode(stat) })
    const entries = await readdir(source)
    entries.sort((left, right) => left.localeCompare(right))
    for (const entry of entries) {
      await copyNode(
        sourceRoot,
        destinationRoot,
        path.join(relative, entry),
      )
    }
    await chmod(destination, mode(stat))
    return
  }

  throw new Error(
    `Unsupported untracked entry type at ${JSON.stringify(relative)}`,
  )
}

const statusHasUnmergedEntries = (status) =>
  splitNul(status).some((record) => record.startsWith("u "))

const statusHasDirtySubmodule = (status) =>
  splitNul(status).some((record) => {
    if (!record.startsWith("1 ") && !record.startsWith("2 ")) return false
    const fields = record.split(" ")
    return fields[2]?.startsWith("S") === true
  })

const capture = async (worktree) => {
  const branchResult = await gitOutput(
    worktree,
    ["symbolic-ref", "--quiet", "--short", "HEAD"],
    { allowFailure: true },
  )
  if (branchResult.code !== 0 && branchResult.code !== 1) {
    throw new Error(`Cannot read main branch: ${branchResult.stderr.trim()}`)
  }

  const [headResult, statusResult, stagedResult, unstagedResult, untrackedResult] =
    await Promise.all([
      gitOutput(worktree, ["rev-parse", "HEAD"]),
      gitOutput(worktree, [
        "status",
        "--porcelain=v2",
        "-z",
        "--untracked-files=all",
        "--ignore-submodules=none",
      ]),
      gitOutput(worktree, [
        "diff",
        "--cached",
        "--binary",
        "--full-index",
        "--no-ext-diff",
        "--no-textconv",
        "--no-renames",
        "--",
      ]),
      gitOutput(worktree, [
        "diff",
        "--binary",
        "--full-index",
        "--no-ext-diff",
        "--no-textconv",
        "--no-renames",
        "--",
      ]),
      gitOutput(worktree, [
        "ls-files",
        "--others",
        "--exclude-standard",
        "-z",
        "--",
      ]),
    ])

  const root = await normalizedRoot(worktree)
  const status = statusResult.stdout
  const untrackedPaths = splitNul(untrackedResult.stdout)
  const untracked = await snapshotUntracked(root, untrackedPaths)
  const stagedPatch = stagedResult.stdout
  const unstagedPatch = unstagedResult.stdout
  const head = headResult.stdout.trim()
  const branch = branchResult.code === 0 ? branchResult.stdout.trim() : null
  const worktreeState = JSON.stringify({
    status,
    stagedPatch,
    unstagedPatch,
    untracked,
  })

  return {
    root,
    branch,
    head,
    status,
    stagedPatch,
    unstagedPatch,
    untrackedPaths,
    untracked,
    dirty: status.length > 0,
    unmerged: statusHasUnmergedEntries(status),
    dirtySubmodule: statusHasDirtySubmodule(status),
    stateFingerprint: hashText(worktreeState),
    fingerprint: hashText(JSON.stringify({ branch, head, worktreeState })),
  }
}

const publicSnapshot = (snapshot) => ({
  branch: snapshot.branch,
  head: snapshot.head,
  dirty: snapshot.dirty,
  statusFingerprint: snapshot.stateFingerprint,
  fingerprint: snapshot.fingerprint,
})

const sameWorktreeState = (left, right) =>
  left.status === right.status &&
  left.stagedPatch === right.stagedPatch &&
  left.unstagedPatch === right.unstagedPatch &&
  JSON.stringify(left.untracked) === JSON.stringify(right.untracked)

const sameMainSnapshot = (left, right) =>
  left.branch === right.branch &&
  left.head === right.head &&
  sameWorktreeState(left, right)

const applyPatch = async (worktree, args, patch) => {
  if (patch.length === 0) return
  const result = await gitOutput(worktree, [...args, "-"], {
    input: patch,
    allowFailure: true,
  })
  if (result.code !== 0) {
    throw new Error(`git apply failed (${result.code}): ${result.stderr.trim()}`)
  }
}

const parseWorktreeList = (porcelain) => {
  const records = []
  let current = null
  for (const field of porcelain.split("\0")) {
    if (field.length === 0) {
      if (current !== null) records.push(current)
      current = null
      continue
    }
    const separator = field.indexOf(" ")
    const key = separator === -1 ? field : field.slice(0, separator)
    const value = separator === -1 ? true : field.slice(separator + 1)
    if (key === "worktree") current = { path: value }
    else if (current !== null) current[key] = value
  }
  if (current !== null) records.push(current)
  return records
}

const worktreeForBranch = async (repo, branch) => {
  const result = await gitOutput(repo, ["worktree", "list", "--porcelain", "-z"])
  const fullRef = `refs/heads/${branch}`
  const item = parseWorktreeList(result.stdout).find(
    (candidate) => candidate.branch === fullRef,
  )
  return item?.path ?? null
}

const sanitizedRunId = (runId) => {
  const source = String(runId ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32)
  return source || new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14)
}

const uniqueReviewBranch = async (repo, runId) => {
  const prefix = `codex/main-review-${sanitizedRunId(runId)}`
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const suffix = randomUUID().slice(0, 8)
    const branch = `${prefix}-${suffix}`
    const exists = await gitOutput(
      repo,
      ["show-ref", "--verify", "--quiet", `refs/heads/${branch}`],
      { allowFailure: true },
    )
    if (exists.code === 1) return branch
    if (exists.code !== 0) {
      throw new Error(`Cannot test review branch availability: ${exists.stderr}`)
    }
  }
  throw new Error("Could not allocate a unique main-review branch")
}

const markReviewBranch = async (repo, branch, runId, reason) => {
  await gitOutput(repo, [
    "config",
    "--local",
    `branch.${branch}.codex-cleanup-review`,
    "true",
  ])
  await gitOutput(repo, [
    "config",
    "--local",
    `branch.${branch}.codex-cleanup-run-id`,
    String(runId ?? ""),
  ])
  await gitOutput(repo, [
    "config",
    "--local",
    `branch.${branch}.codex-cleanup-review-reason`,
    reason,
  ])
}

const createReviewWorktree = async (repo, mainPath, head, runId) => {
  const branch = await uniqueReviewBranch(repo, runId)
  const result = await run(
    "wt",
    [
      "-C",
      repo,
      "switch",
      "--create",
      "--base",
      head,
      "--no-hooks",
      "--no-cd",
      "--format=json",
      branch,
    ],
    {
      cwd: mainPath,
      allowFailure: true,
      env: {
        GIT_CONFIG_COUNT: "1",
        GIT_CONFIG_KEY_0: "core.hooksPath",
        GIT_CONFIG_VALUE_0: "/dev/null",
      },
    },
  )
  const reviewPath = await worktreeForBranch(repo, branch)
  const review = {
    branch,
    path: reviewPath === null ? null : await normalizedRoot(reviewPath),
    baseHead: head,
    reasons: ["main_dirt"],
    verified: false,
  }
  const fail = (message) => {
    const error = new Error(message)
    error.reviewWorktree = review
    return error
  }

  if (reviewPath === null) {
    const branchExists = await gitOutput(
      repo,
      ["show-ref", "--verify", "--quiet", `refs/heads/${branch}`],
      { allowFailure: true },
    )
    if (branchExists.code === 0) {
      await markReviewBranch(repo, branch, runId, "main-dirt").catch(() => {})
    }
    const detail = result.stderr.trim() || "worktree was not registered"
    throw fail(`Could not create review worktree ${branch}: ${detail}`)
  }

  const created = await capture(review.path)
  if (created.head !== head || created.dirty) {
    throw fail(
      `New review worktree ${branch} did not verify as a clean checkout of ${head}`,
    )
  }
  try {
    await markReviewBranch(repo, branch, runId, "main-dirt")
  } catch (error) {
    throw fail(
      `Review worktree ${branch} was created but could not be marked: ${error.message}`,
    )
  }
  if (result.code !== 0) review.creationWarning = result.stderr.trim()
  return review
}

const createReviewRef = async (repo, head, runId, reason) => {
  const branch = await uniqueReviewBranch(repo, runId)
  await gitOutput(repo, ["branch", branch, head])
  await markReviewBranch(repo, branch, runId, reason)
  return { branch, head, reason }
}

const transferMainDirt = async (source, review) => {
  await applyPatch(
    review.path,
    ["apply", "--index", "--binary", "--whitespace=nowarn"],
    source.stagedPatch,
  )
  await applyPatch(
    review.path,
    ["apply", "--binary", "--whitespace=nowarn"],
    source.unstagedPatch,
  )
  for (const item of source.untracked) {
    await copyNode(source.root, review.path, item.root)
  }

  const copied = await capture(review.path)
  if (copied.head !== source.head || !sameWorktreeState(source, copied)) {
    throw new Error(
      "Review worktree verification failed; main checkout was left unchanged",
    )
  }
  review.verified = true
  review.statusFingerprint = copied.stateFingerprint
  return copied
}

const removeVerifiedUntracked = async (source) => {
  for (const expected of source.untracked) {
    const current = await snapshotUntracked(source.root, [expected.root])
    if (JSON.stringify(current) !== JSON.stringify([expected])) {
      throw new Error(
        `Untracked path changed during evacuation: ${JSON.stringify(expected.root)}`,
      )
    }
    await rm(resolveInside(source.root, expected.root), {
      recursive: true,
      force: false,
    })
  }
}

const clearTransferredDirt = async (source) => {
  await applyPatch(
    source.root,
    ["apply", "--reverse", "--binary", "--whitespace=nowarn"],
    source.unstagedPatch,
  )
  await gitOutput(source.root, ["update-index", "--refresh"])
  await applyPatch(
    source.root,
    [
      "apply",
      "--reverse",
      "--index",
      "--binary",
      "--whitespace=nowarn",
    ],
    source.stagedPatch,
  )
  await removeVerifiedUntracked(source)
}

const addReason = (reviewWorktree, reason) => {
  if (reviewWorktree !== null && !reviewWorktree.reasons.includes(reason)) {
    reviewWorktree.reasons.push(reason)
  }
}

const repair = (base, code, error, extra = {}) => ({
  ...base,
  ...extra,
  status: "repair_required",
  repair: {
    code,
    message: error instanceof Error ? error.message : String(error),
  },
})

const isAncestor = async (repo, ancestor, descendant) => {
  const result = await gitOutput(
    repo,
    ["merge-base", "--is-ancestor", ancestor, descendant],
    { allowFailure: true },
  )
  if (result.code === 0) return true
  if (result.code === 1) return false
  throw new Error(`Cannot compare Git history: ${result.stderr.trim()}`)
}

export const snapshotMainCheckout = async (mainPath) =>
  publicSnapshot(await capture(mainPath))

export const prepareMain = async (
  repo,
  { mainPath, defaultBranch, remote = "origin", runId } = {},
) => {
  if (!mainPath || !defaultBranch) {
    throw new Error("prepareMain requires mainPath and defaultBranch")
  }

  const repoRoot = await normalizedRoot(repo)
  const mainRoot = await normalizedRoot(mainPath)
  const initial = await capture(mainRoot)
  const result = {
    status: "preparing",
    repo: repoRoot,
    mainPath: mainRoot,
    defaultBranch,
    remote,
    runId: runId ?? null,
    initialMain: publicSnapshot(initial),
    reviewWorktree: null,
    historyBackups: [],
    evacuated: false,
    synchronized: false,
    postCleanMainHead: null,
    postSyncMainHead: null,
  }

  if (initial.unmerged) {
    return repair(
      result,
      "main_has_unmerged_entries",
      new Error("Main has unresolved index entries; no files were changed"),
    )
  }
  if (initial.dirtySubmodule) {
    return repair(
      result,
      "main_has_dirty_submodule",
      new Error(
        "Main has submodule dirt that cannot be represented by the evacuation patches",
      ),
    )
  }

  if (initial.dirty) {
    try {
      result.reviewWorktree = await createReviewWorktree(
        repoRoot,
        mainRoot,
        initial.head,
        runId,
      )
      await transferMainDirt(initial, result.reviewWorktree)
    } catch (error) {
      if (result.reviewWorktree === null && error.reviewWorktree) {
        result.reviewWorktree = error.reviewWorktree
      }
      const mainAfterFailure = await capture(mainRoot).catch(() => null)
      return repair(result, "main_dirt_transfer_failed", error, {
        mainOriginalsRetained: true,
        mainUnchanged:
          mainAfterFailure !== null && sameMainSnapshot(initial, mainAfterFailure),
        mainAfterFailure:
          mainAfterFailure === null ? null : publicSnapshot(mainAfterFailure),
      })
    }

    const beforeClear = await capture(mainRoot)
    if (!sameMainSnapshot(initial, beforeClear)) {
      return repair(
        result,
        "main_changed_during_evacuation",
        new Error(
          "Main changed after its review copy was verified; originals were retained",
        ),
        {
          beforeClear: publicSnapshot(beforeClear),
          mainOriginalsRetained: true,
          mainUnchanged: false,
        },
      )
    }

    try {
      await clearTransferredDirt(initial)
    } catch (error) {
      const afterFailure = await capture(mainRoot).catch(() => null)
      return repair(result, "main_clear_failed", error, {
        mainMayBePartiallyCleared: true,
        mainAfterFailure:
          afterFailure === null ? null : publicSnapshot(afterFailure),
      })
    }

    const clean = await capture(mainRoot)
    if (clean.dirty || clean.head !== initial.head) {
      return repair(
        result,
        "main_not_clean_after_evacuation",
        new Error("Main did not become clean after its verified review transfer"),
        { mainAfterFailure: publicSnapshot(clean) },
      )
    }
    result.evacuated = true
    result.postCleanMainHead = clean.head
  } else {
    result.postCleanMainHead = initial.head
  }

  let current = await capture(mainRoot)
  if (current.branch !== defaultBranch) {
    try {
      if (
        result.reviewWorktree !== null &&
        result.reviewWorktree.baseHead === current.head
      ) {
        addReason(result.reviewWorktree, "non_default_main_branch")
      } else {
        result.historyBackups.push(
          await createReviewRef(
            repoRoot,
            current.head,
            runId,
            "non-default-main-branch",
          ),
        )
      }
    } catch (error) {
      return repair(result, "main_branch_backup_failed", error)
    }
  }

  const remoteRef = `refs/remotes/${remote}/${defaultBranch}`
  const fetch = await gitOutput(
    repoRoot,
    [
      "fetch",
      "--no-tags",
      remote,
      `refs/heads/${defaultBranch}:${remoteRef}`,
    ],
    { allowFailure: true },
  )
  if (fetch.code !== 0) {
    return repair(
      result,
      "main_fetch_failed",
      new Error(fetch.stderr.trim() || `Could not fetch ${remote}/${defaultBranch}`),
    )
  }

  if (current.branch !== defaultBranch) {
    const localDefault = await gitOutput(
      repoRoot,
      ["show-ref", "--verify", "--quiet", `refs/heads/${defaultBranch}`],
      { allowFailure: true },
    )
    const switchArgs =
      localDefault.code === 0
        ? ["switch", defaultBranch]
        : ["switch", "--create", defaultBranch, "--track", `${remote}/${defaultBranch}`]
    if (localDefault.code !== 0 && localDefault.code !== 1) {
      return repair(
        result,
        "main_default_branch_probe_failed",
        new Error(localDefault.stderr.trim()),
      )
    }
    const switched = await gitOutput(mainRoot, switchArgs, { allowFailure: true })
    if (switched.code !== 0) {
      return repair(
        result,
        "main_default_branch_switch_failed",
        new Error(switched.stderr.trim()),
      )
    }
    current = await capture(mainRoot)
  }

  if (current.dirty) {
    return repair(
      result,
      "main_became_dirty_before_sync",
      new Error("Main acquired new tracked or nonignored dirt before sync"),
      { mainBeforeSync: publicSnapshot(current) },
    )
  }

  const remoteHeadResult = await gitOutput(repoRoot, ["rev-parse", remoteRef])
  const remoteHead = remoteHeadResult.stdout.trim()
  if (current.head !== remoteHead) {
    let canFastForward
    try {
      canFastForward = await isAncestor(repoRoot, current.head, remoteHead)
    } catch (error) {
      return repair(result, "main_history_comparison_failed", error)
    }

    if (!canFastForward) {
      try {
        if (
          result.reviewWorktree !== null &&
          result.reviewWorktree.baseHead === current.head
        ) {
          addReason(result.reviewWorktree, "local_default_history")
        } else {
          result.historyBackups.push(
            await createReviewRef(
              repoRoot,
              current.head,
              runId,
              "local-default-history",
            ),
          )
        }
      } catch (error) {
        return repair(result, "main_history_backup_failed", error, {
          remoteHead,
        })
      }
      return repair(
        result,
        "main_history_requires_review",
        new Error(
          `Local ${defaultBranch} cannot fast-forward to ${remote}/${defaultBranch}; its HEAD was preserved for review`,
        ),
        { remoteHead },
      )
    }

    const merged = await gitOutput(
      mainRoot,
      ["merge", "--ff-only", remoteRef],
      { allowFailure: true },
    )
    if (merged.code !== 0) {
      return repair(
        result,
        "main_fast_forward_failed",
        new Error(merged.stderr.trim()),
        { remoteHead },
      )
    }
  }

  const final = await capture(mainRoot)
  if (
    final.branch !== defaultBranch ||
    final.head !== remoteHead ||
    final.dirty
  ) {
    return repair(
      result,
      "main_sync_verification_failed",
      new Error("Main did not verify as clean at the fetched remote default HEAD"),
      { remoteHead, finalMain: publicSnapshot(final) },
    )
  }

  return {
    ...result,
    status: "ready",
    synchronized: true,
    remoteHead,
    postSyncMainHead: final.head,
    finalMain: publicSnapshot(final),
  }
}
