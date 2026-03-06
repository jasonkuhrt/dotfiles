export type Lane = "trueDir" | "fileSymlink" | "special"
export type CapturePolicy = "capture" | "relinkOnly" | "ignore"
export type ExpectedShape = "symlinkDir" | "symlinkFile" | "managedOther"

export interface TrueDirEntry {
  readonly targetRel: string
  readonly repoRel: string
  readonly note?: string
}

export interface PromotionCandidate {
  readonly targetRel: string
  readonly kind: "trueDir" | "fileSymlink"
  readonly note: string
}

export interface Exclusion {
  readonly targetRel: string
  readonly reason: string
}

export interface PolicyOverride {
  readonly targetRel: string
  readonly policy: CapturePolicy
  readonly note: string
}

export const CUTOVER_VERSION = 4
export const HEAL_INTERVAL_SECONDS = 300
export const LOG_ROTATE_MAX_BYTES = 256 * 1024

export const TRUE_DIRS: readonly TrueDirEntry[] = [
  { targetRel: ".bookmarks", repoRel: "home/.bookmarks" },
  { targetRel: ".config/bat", repoRel: "home/.config/bat" },
  { targetRel: ".config/direnv", repoRel: "home/.config/direnv" },
  { targetRel: ".config/dprint", repoRel: "home/.config/dprint", note: "Promoted in dotctl wave" },
  { targetRel: ".config/ghostty", repoRel: "home/.config/ghostty" },
  { targetRel: ".config/git", repoRel: "home/.config/git" },
  { targetRel: ".config/lazygit", repoRel: "home/.config/lazygit" },
  { targetRel: ".config/libra", repoRel: "home/.config/libra" },
  { targetRel: ".config/lsd", repoRel: "home/.config/lsd" },
  { targetRel: ".config/nvim", repoRel: "home/.config/nvim", note: "Single repo-backed Neovim config tree." },
  { targetRel: ".config/perles", repoRel: "home/.config/perles" },
  { targetRel: ".config/ripgrep", repoRel: "home/.config/ripgrep" },
  { targetRel: ".claude/checks", repoRel: "home/.claude/checks" },
  { targetRel: ".claude/commands", repoRel: "home/.claude/commands" },
  { targetRel: ".claude/rules", repoRel: "home/.claude/rules" },
  { targetRel: ".claude/schemas", repoRel: "home/.claude/schemas" },
] as const

export const FILE_SYMLINK_ROOTS = [
  ".config/vim",
  ".config/starship.toml",
  ".claude/hooks",
] as const

export const PROMOTION_CANDIDATES = [
  {
    targetRel: ".config/dprint",
    kind: "trueDir",
    note: "Now promoted after removing the old chezmoi include coupling.",
  },
  {
    targetRel: ".config/starship.toml",
    kind: "fileSymlink",
    note: "Single-file config. Already optimized by global symlink mode; true-dir rubric does not apply.",
  },
] as const satisfies readonly PromotionCandidate[]

export const EXCLUSIONS = [
  { targetRel: ".config/fish", reason: "Mixed runtime/plugin-managed tree." },
  { targetRel: ".config/gh", reason: "Tool-authored auth/runtime state mixes with config." },
  { targetRel: ".config/kitty", reason: "Keep in file-symlink lane until audited." },
  { targetRel: ".config/lnav", reason: "Mixed state and config under one root." },
  { targetRel: ".config/zed", reason: "Executable and settings mix; keep file-level policy." },
  { targetRel: ".claude/hooks", reason: "Exact/executable child metadata keeps it out of true-dir lane." },
  { targetRel: ".claude/skills", reason: "Exact managed subtree; not a true-dir candidate." },
  { targetRel: ".claude/skills-library", reason: "Exact managed subtree; not a true-dir candidate." },
  { targetRel: ".serena", reason: "Mixed mutable state and config." },
  { targetRel: ".ssh", reason: "Permission-sensitive and not promoted." },
] as const satisfies readonly Exclusion[]

export const FILE_SYMLINK_POLICY_OVERRIDES = [
  {
    targetRel: ".config/starship.toml",
    policy: "capture",
    note: "Single-file config remains capture-driven like the rest of the symlink lane.",
  },
] as const satisfies readonly PolicyOverride[]

export const DEFAULT_FILE_SYMLINK_POLICY: CapturePolicy = "capture"

export const findTrueDirEntry = (targetRel: string): TrueDirEntry | undefined =>
  TRUE_DIRS.find((entry) => targetRel === entry.targetRel || targetRel.startsWith(`${entry.targetRel}/`))

export const resolveCapturePolicy = (targetRel: string, lane: Lane): CapturePolicy => {
  if (lane !== "fileSymlink") return "ignore"
  return FILE_SYMLINK_POLICY_OVERRIDES.find(
    (entry) => targetRel === entry.targetRel || targetRel.startsWith(`${entry.targetRel}/`),
  )?.policy ?? DEFAULT_FILE_SYMLINK_POLICY
}
