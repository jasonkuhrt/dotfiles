import type * as React from "react"

/**
 * Node — THE structural unit; nodes all the way down. Lane/Thread dissolved
 * (2026-07-17): they were names for depths, not concepts.
 *
 * Storage spec: a node IS a directory (under `.session/`); its contents are
 * file(s) in that dir. The map is a projection of that dir tree.
 *
 * Execution: at any node, an execution can be requested for what that
 * node-and-down LOCKS — ratchet-approve one vertical while sibling branches
 * stay dirty.
 *
 * State rolls up, truth stays put: Signal derives from the subtree (authored
 * signal = fallback/leaf input only); Spec is the node's own standing truth
 * and never aggregates.
 */
export interface Node {
  id: string
  title: string
  /** small label above the title: "worktree", "speculative", "executing", … */
  kicker?: string
  /** closed → recedes on the map (low opacity, off the flow); never gone */
  state?: "open" | "closed"
  /** authored signal — leaf input / fallback; interior nodes derive */
  signal?: { variant: "run" | "you" | "done" | "wait"; label?: string }
  /**
   * Decision — the first reified input: a choice awaiting the user at this
   * node. Deriving: an open decision IS a you-signal (label = options
   * joined). Responding happens in the detail panel; the recorded payload
   * reaches the agent (transport: clipboard today; connector later).
   */
  decision?: { prompt?: string; options: string[] }
  /** closed nodes: how much was encoded into an ancestor's Spec */
  encoded?: "fully" | "partly" | "none"
  /** live strip: what's flying at this node, next up, awaiting-you */
  flights?: React.ReactNode
  /** rule-shaped part of the Spec */
  canon?: React.ReactNode
  /** the node's standing truth (locked content) */
  spec?: React.ReactNode
  /** dirty one-liner — current position of thinking at this node */
  position?: React.ReactNode
  /** dirty working material (evidence, sketchpads, spitball) */
  body?: React.ReactNode
  /** where this node's dir/files live */
  address?: React.ReactNode
  children?: Node[]
}

export interface WorkbenchContent {
  /** UL — the vocabulary. [term, definition] */
  ul: Array<[string, React.ReactNode]>
  /** the root node = the worktree */
  root: Node
}
