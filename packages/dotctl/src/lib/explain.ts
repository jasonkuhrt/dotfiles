import type { RuntimeContext } from "./env.js"
import { resolveManifest, findExplainEntry } from "./manifest.js"

export const renderExplain = (ctx: RuntimeContext, target: string): string => {
  const manifest = resolveManifest(ctx)
  const entry = findExplainEntry(ctx, manifest, target)
  if (!entry) throw new Error(`target is not managed or promoted: ${target}`)

  if (entry.lane === "trueDir") {
    return [
      `target: ~/${entry.targetRel}`,
      "lane: trueDir",
      `repo path: ${entry.repoAbs}`,
      "expected live shape: symlink directory",
      "capture policy: ignore",
      "up behavior: chezmoi maintains the directory symlink; child file edits are instant on both sides.",
      "healer behavior: none; true-dir roots do not use per-file heal actions.",
    ].join("\n")
  }

  const healer =
    entry.capturePolicy === "capture"
      ? "capture live bytes into source with chezmoi re-add, then relink"
      : entry.capturePolicy === "relinkOnly"
        ? "discard live bytes after backup and restore source symlink"
        : "leave drift alone and report it"

  return [
    `target: ${entry.targetDisplay}`,
    `lane: ${entry.lane}`,
    `source path: ${entry.sourceAbs}`,
    `expected live shape: ${entry.expectedShape === "symlinkFile" ? "symlink file" : "managed non-symlink file"}`,
    `capture policy: ${entry.capturePolicy}`,
    `up behavior: applies chezmoi, then heals this target when it is expected to be a symlink and drifted out of shape.`,
    `healer behavior: ${healer}.`,
  ].join("\n")
}
