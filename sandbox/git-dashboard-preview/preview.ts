#!/usr/bin/env bun
// Preview of the git dashboard end state described in
// docs/superpowers/specs/2026-09-13-git-dashboard-rewrite-design.md (revision 2).
// Throwaway: renders fixed scenarios with the spec's layout, colour and symbols. Not the tool.
import { existsSync } from "node:fs"

const REPO = "/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles"
const TTY = process.stdout.isTTY === true
const W = Math.max(64, (process.stdout.columns ?? 80) - 2)
const COLOR = !process.env.NO_COLOR && (TTY || Boolean(process.env.FORCE_COLOR))
const LINKS = COLOR && TTY

type Style =
  | "plain" | "dim" | "bold" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan"
  | "boldRed" | "boldYellow" | "boldMagenta"

const SGR: Record<Style, string> = {
  plain: "", dim: "2", bold: "1", red: "31", green: "32", yellow: "33", blue: "34",
  magenta: "35", cyan: "36", boldRed: "1;31", boldYellow: "1;33", boldMagenta: "1;35",
}

interface Seg { readonly text: string; readonly style: Style; readonly href?: string | undefined }
const seg = (text: string, style: Style = "plain", href?: string): Seg => ({ text, style, href })

const paint = ({ text, style, href }: Seg) => {
  const styled = COLOR && style !== "plain" ? `\x1b[${SGR[style]}m${text}\x1b[0m` : text
  return LINKS && href ? `\x1b]8;;${href}\x1b\\${styled}\x1b]8;;\x1b\\` : styled
}
const widthOf = (segs: readonly Seg[]) => Bun.stringWidth(segs.map((x) => x.text).join(""))

const lines: string[] = []
const put = (left: readonly Seg[], right: readonly Seg[] = []) => {
  const gap = right.length > 0 ? Math.max(2, W - widthOf(left) - widthOf(right)) : 0
  lines.push(left.map(paint).join("") + " ".repeat(gap) + right.map(paint).join(""))
}
const blank = () => lines.push("")
const title = (text: string) => {
  const head = `── ${text} `
  put([seg(head + "─".repeat(Math.max(0, W - Bun.stringWidth(head))), "dim")])
}

// ── changes ────────────────────────────────────────────────────────────────

const compact = (n: number) =>
  n >= 10_000 ? `${Math.round(n / 1000)}K` : n >= 1000 ? `${(n / 1000).toFixed(1)}K` : `${n}`

const numstat = (added = 0, deleted = 0): Seg[] => [
  ...(added ? [seg(`+${compact(added)}`, "green")] : []),
  ...(added && deleted ? [seg(" ")] : []),
  ...(deleted ? [seg(`−${compact(deleted)}`, "red")] : []),
]

const STATUS_STYLE: Record<string, Style> = {
  A: "green", M: "yellow", D: "red", R: "cyan", C: "cyan", T: "magenta", "?": "dim",
}

const pathSegs = (path: string): Seg[] => {
  const cut = path.replace(/\/$/, "").lastIndexOf("/")
  const abs = `${REPO}/${path}`
  const href = existsSync(abs) ? `file://${abs}` : undefined
  return [seg(path.slice(0, cut + 1), "dim", href), seg(path.slice(cut + 1), "plain", href)]
}

const group = (name: string, count: number, style: Style, totals: Seg[] = []) =>
  put([seg(name, style), seg(` ${count}`, "dim")], totals)

const change = (
  status: string,
  path: string | Seg[],
  { note, added, deleted }: { note?: string; added?: number; deleted?: number } = {},
) => {
  const left = [
    seg("  "), seg(status, STATUS_STYLE[status] ?? "boldRed"), seg(" "),
    ...(typeof path === "string" ? pathSegs(path) : path),
    ...(note ? [seg(`  ${note}`, "dim")] : []),
  ]
  put(left, numstat(added, deleted))
}

// ── commits ────────────────────────────────────────────────────────────────

interface Commit { readonly prefix: string; readonly rest: string; readonly at: number; readonly subject: string }

const realCommits = (rev: string, count: number): Commit[] =>
  Bun.spawnSync(["git", "-C", REPO, "log", "-z", "--abbrev=4", `-n${count}`, "--format=%h%x1f%H%x1f%at%x1f%s", rev])
    .stdout.toString().split("\0").filter(Boolean)
    .map((record) => {
      const [short, full, at, subject] = record.split("\x1f") as [string, string, string, string]
      return { prefix: short, rest: full.slice(short.length, 7), at: Number(at), subject }
    })

const fake = (hash: string, now: number, hoursAgo: number, subject: string): Commit =>
  ({ prefix: hash.slice(0, 4), rest: hash.slice(4, 7), at: now - hoursAgo * 3600, subject })

const conventional = (subject: string) => {
  const match = /^(\w+)(?:\(([^)]+)\))?(!)?:\s*(.*)$/.exec(subject)
  return match
    ? { type: match[1]! + (match[3] ?? ""), scope: match[2] ?? "", breaking: Boolean(match[3]), text: match[4]! }
    : { type: "", scope: "", breaking: false, text: subject }
}

const TYPE_STYLE: Record<string, Style> = {
  feat: "green", fix: "red", refactor: "blue", docs: "cyan", perf: "magenta", test: "yellow",
}

const age = (now: number, at: number) => {
  const s = now - at
  if (s < 60) return "now"
  const m = Math.floor(s / 60); if (m < 60) return `${m}m`
  const h = Math.floor(m / 60); if (h < 24) return `${h}h`
  const d = Math.floor(h / 24); if (d < 14) return `${d}d`
  if (d < 56) return `${Math.floor(d / 7)}w`
  const mo = Math.floor(d / 30)
  return mo < 24 ? `${mo}mo` : `${Math.floor(d / 365)}y`
}

const truncate = (text: string, max: number) => {
  if (Bun.stringWidth(text) <= max) return text
  const cut = text.slice(0, max - 1)
  const space = cut.lastIndexOf(" ")
  return (space > max * 0.6 ? cut.slice(0, space) : cut).replace(/[ ,]+$/, "") + "…"
}

type Marker = "unpushed" | "pushed" | "anchor" | "context" | "incoming"
const MARKER: Record<Marker, Seg> = {
  unpushed: seg("●", "green"), pushed: seg("●", "dim"), anchor: seg("◆", "blue"),
  context: seg("○", "dim"), incoming: seg("◇", "dim"),
}

type RailRow =
  | { readonly marker: Marker; readonly commit: Commit; readonly label?: Seg }
  | { readonly hidden: string }

const rail = (now: number, rows: readonly RailRow[]) => {
  const commits = rows.flatMap((row) => ("commit" in row ? [conventional(row.commit.subject)] : []))
  const typeWidth = Math.max(0, ...commits.map((c) => c.type.length))
  const scopeWidth = Math.max(0, ...commits.map((c) => c.scope.length))
  for (const row of rows) {
    if ("hidden" in row) { put([seg(`┆ ${row.hidden}`, "dim")]); continue }
    const { marker, commit, label } = row
    const cc = conventional(commit.subject)
    const quiet = marker === "context" || marker === "incoming"
    const typeStyle: Style = cc.breaking ? "boldRed" : quiet ? "dim" : TYPE_STYLE[cc.type] ?? "dim"
    const left: Seg[] = [
      MARKER[marker], seg(" "),
      seg(commit.prefix, quiet ? "dim" : "bold"), seg(commit.rest, "dim"), seg("  "),
      seg(cc.type.padEnd(typeWidth), typeStyle), seg(" "), seg(cc.scope.padEnd(scopeWidth), "dim"), seg("  "),
    ]
    const right: Seg[] = [...(label ? [label, seg("  ")] : []), seg(age(now, commit.at).padStart(3), "dim")]
    const room = W - widthOf(left) - 2 - widthOf(right)
    put([...left, seg(truncate(cc.text, room).padEnd(room), quiet ? "dim" : "plain")], right)
  }
}

const branch = (name: string) => seg(name, "boldMagenta")
const sep = seg(" · ", "dim")
const trunk = (up: number, down: number) => [seg(`↑${up} ↓${down} `), seg("main", "magenta")]

// ── 1 · your repo as captured ──────────────────────────────────────────────

const CAPTURE = new Date("2026-09-11T12:13:00").getTime() / 1000
const NOW = Date.now() / 1000

title("1 · trunk, dirty, 43 unpushed — this repo as captured on 2026-09-11")
blank()
put([branch("main"), seg(" "), seg("⇡43", "green"), seg(" "), seg("origin/main", "dim"), seg(" · 2 stashes", "dim")])
blank()
group("Staged", 1, "bold", numstat(4))
change("A", "home/.config/fish/conf.d/node-options.fish", { added: 4 })
blank()
group("Unstaged", 48, "bold", numstat(312, 3418))
change("M", "docs/cli-tools.md", { added: 1, deleted: 1 })
change("M", "docs/worktrunk.md", { added: 33, deleted: 20 })
change("M", "home/.claude/settings.json", { added: 55, deleted: 48 })
change("M", "home/.claude/skills-library/effect/CHECKS.quality.md", { deleted: 94 })
change("D", "home/.claude/skills-library/hunk-review/SKILL.md", { deleted: 214 })
change("D", "home/.claude/skills-library/linear/", { note: "28 files", deleted: 2595 })
change("D", "home/.claude/skills/linear", { deleted: 1 })
change("D", "home/.claude/skills/linear-managing-issues", { deleted: 1 })
change("M", "home/.codex/AGENTS.md", { added: 1, deleted: 1 })
change("M", "home/.config/fish/completions/grok.fish", { added: 117, deleted: 111 })
change("M", "home/.config/fish/config.fish", { added: 1 })
change("M", "home/.config/fish/functions/wt.fish", { added: 8 })
change("M", "home/.config/hunk/config.toml", { added: 85, deleted: 8 })
change("M", "home/.config/hunk/extensions/hunk-agent-dispatch/index.ts", { added: 9, deleted: 1 })
change("M", "home/.config/hunk/state.json", { added: 2, deleted: 1 })
change("D", "packages/linear/", { note: "6 files", deleted: 322 })
blank()
group("Untracked", 11, "bold")
change("?", "archive/linear/")
change("?", "example.txt")
change("?", "home/.claude/commands/hunk-watch.md")
change("?", "home/.claude/skills-library/hunk-review")
change("?", "home/.claude/skills/heartbeat-dev-login/")
change("?", "home/.claude/skills/heartbeat-visual-parity/")
change("?", "home/.config/hunk/extensions/", { note: "5 entries" })
blank()
const [originMain] = realCommits("d0af6d11", 1)
rail(CAPTURE, [
  ...realCommits("50badf4a", 7).map((commit) => ({ marker: "unpushed" as const, commit })),
  { hidden: "36 more" },
  { marker: "anchor", commit: originMain!, label: seg("origin/main", "dim") },
])

// ── 2 · clean and in sync ──────────────────────────────────────────────────

blank()
title("2 · trunk, clean, in sync")
blank()
put([branch("main"), seg(" "), seg("origin/main", "dim")])
blank()
put([seg("✓", "green"), seg(" nothing to commit", "dim")])
blank()
const [tip, ...older] = realCommits("d0af6d11", 5)
rail(NOW, [
  { marker: "anchor", commit: tip!, label: seg("origin/main", "dim") },
  ...older.map((commit) => ({ marker: "context" as const, commit })),
])

// ── 3 · feature branch diverged from its upstream ──────────────────────────

blank()
title("3 · feature branch, diverged from upstream, trunk moved (illustrative)")
blank()
put([branch("feat/login"), seg(" "), seg("⇡1", "green"), seg(" "), seg("⇣2", "red"), seg(" "), seg("origin/feat/login", "dim"), sep, ...trunk(3, 5)])
blank()
group("Staged", 1, "bold", numstat(2, 2))
change("R", [seg("src/auth/", "dim"), seg("{login.ts → signin.ts}")], { added: 2, deleted: 2 })
blank()
group("Unstaged", 1, "bold", numstat(12, 3))
change("M", [seg("src/auth/", "dim"), seg("token.ts")], { added: 12, deleted: 3 })
blank()
rail(NOW, [
  { marker: "unpushed", commit: fake("9c1e2ab", NOW, 2, "feat(auth): add login endpoint") },
  { marker: "pushed", commit: fake("4d5f6a7", NOW, 3, "fix(auth): handle token expiry") },
  { marker: "pushed", commit: fake("1a2b3c4", NOW, 5, "test(auth): cover refresh edge cases") },
  { marker: "anchor", commit: fake("8e9f0a1", NOW, 72, "chore(deps): bump effect to 4.2"), label: seg("forked from main", "dim") },
])
blank()
put([seg("⇣ 2", "red"), seg(" on origin/feat/login not here", "dim")])
rail(NOW, [
  { marker: "incoming", commit: fake("7b8c9d0", NOW, 1, "fix(auth): rotate signing key on refresh") },
  { marker: "incoming", commit: fake("6a7b8c9", NOW, 1, "docs(auth): document token lifetimes") },
])

// ── 4 · rebase stopped on a conflict ───────────────────────────────────────

blank()
title("4 · rebase stopped on a conflict (illustrative)")
blank()
put([seg("▲ REBASING", "boldYellow"), seg(" "), branch("feat/login"), seg(" onto ", "dim"), seg("main", "magenta"), seg(" · step 3/4 · ", "dim"), seg("1 conflict", "boldRed")])
put([seg("  git rebase --continue · --skip · --abort", "dim")])
blank()
put([branch("feat/login")])
blank()
group("Conflicts", 1, "boldRed")
put([seg("  "), seg("UU", "boldRed"), seg(" "), seg("src/auth/", "dim"), seg("token.ts")], [seg("both modified", "dim")])
blank()
rail(NOW, [
  { hidden: "1 remaining" },
  { marker: "unpushed", commit: fake("4d5f6a7", NOW, 3, "fix(auth): handle token expiry") },
  { marker: "unpushed", commit: fake("9c1e2ab", NOW, 5, "feat(auth): add login endpoint") },
  { marker: "anchor", commit: fake("8e9f0a1", NOW, 1, "chore(deps): bump effect to 4.2"), label: seg("main", "magenta") },
])

// ── 5 · every header state ─────────────────────────────────────────────────

blank()
title("5 · every header state")
blank()
const caption = (text: string) => [seg(text, "dim")]
put([branch("main"), seg(" "), seg("origin/main", "dim")], caption("in sync"))
put([branch("main"), seg(" "), seg("⇡43", "green"), seg(" "), seg("origin/main", "dim"), seg(" · 2 stashes", "dim")], caption("ahead of upstream"))
put([branch("feat/x"), seg(" "), seg("⇡1", "green"), seg(" "), seg("⇣2", "red"), seg(" "), seg("origin/feat/x", "dim"), sep, ...trunk(3, 5)], caption("diverged; trunk moved"))
put([branch("feat/x"), seg(" · no upstream · ", "dim"), seg("↑3 "), seg("main", "magenta")], caption("never pushed"))
put([branch("feat/x"), sep, seg("origin/feat/x gone", "red"), sep, ...trunk(3, 1)], caption("upstream deleted"))
put([seg("detached at ", "dim"), seg("50ba", "bold"), seg("df4", "dim"), sep, ...trunk(2, 5)], caption("detached HEAD"))
put([branch("main"), seg(" · no commits yet", "dim")], caption("fresh repo"))

// ── legend ─────────────────────────────────────────────────────────────────

blank()
title("legend")
blank()
put([MARKER.unpushed, seg(" not on upstream   "), MARKER.pushed, seg(" on upstream   "), MARKER.anchor, seg(" merge-base anchor   "), MARKER.context, seg(" context")])
put([MARKER.incoming, seg(" not in HEAD   "), seg("◎", "dim"), seg(" merge   "), seg("┆", "dim"), seg(" hidden rows   "), seg("▲", "boldYellow"), seg(" operation in progress")])
put([seg("⇡⇣", "green"), seg(" vs upstream   "), seg("↑↓"), seg(" vs trunk   "), seg("paths are cmd-clickable where the file exists", "dim")])
blank()

console.log(lines.join("\n"))
