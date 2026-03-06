#!/usr/bin/env bash
set -euo pipefail

# waves.sh — compute dependency waves for parallel execution
#
# Usage: waves.sh <epic-id>
#
# Reads the epic's dependency graph via `bd graph --json` and computes
# execution waves: groups of beads that can run in parallel, ordered by
# dependency layers. Closed beads are treated as satisfied dependencies,
# so their dependents shift to earlier waves.
#
# Output: JSON object:
#   {
#     "epic": "<epic-id>",
#     "waves": [
#       { "number": 1, "beads": [{ "id", "title", "status", "priority", "assignee", "labels" }] },
#       ...
#     ],
#     "total_beads": <int>,
#     "unresolvable": ["<id>", ...]   // beads stuck in dep cycles (should be empty)
#   }

epic_id="${1:?Usage: waves.sh <epic-id>}"

# ---------------------------------------------------------------------------
# 1. Get the full dependency graph
# ---------------------------------------------------------------------------

graph_json=$(bd graph "$epic_id" --json 2>/dev/null)

if [[ -z "$graph_json" ]]; then
  echo '{"epic":"'"$epic_id"'","waves":[],"total_beads":0,"unresolvable":[]}'
  exit 0
fi

# ---------------------------------------------------------------------------
# 2. Extract nodes, filter, compute waves — all in one jq pass
# ---------------------------------------------------------------------------

echo "$graph_json" | jq --arg epic "$epic_id" '
  .layout as $layout |

  # Extract non-closed children (exclude the epic root node itself)
  [$layout.Nodes | to_entries[] |
    select(.key | . == $epic | not) |
    .value |
    select(.Issue.status | . == "closed" | not)
  ] as $children |

  # Early exit: no actionable children
  if ($children | length) == 0 then
    {epic: $epic, waves: [], total_beads: 0, unresolvable: []}
  else
    # Build ID set for filtering deps to only intra-set references
    [$children[].Issue.id] as $child_ids |

    # Build bead records with filtered deps (only deps still in our set)
    [$children[] | {
      id: .Issue.id,
      title: .Issue.title,
      status: .Issue.status,
      priority: .Issue.priority,
      assignee: (.Issue.assignee // null),
      labels: (.Issue.labels // []),
      deps: [(.DependsOn // [])[] | select(. as $d | $child_ids | index($d) | type == "number")]
    }] as $beads |

    # Recursive wave computation
    # Wave N: beads whose remaining deps are all assigned to waves < N
    def compute_waves:
      if (.remaining | length) == 0 then .
      else
        (.waves | length) + 1 as $wn |
        .assigned as $asgn |
        [.remaining[] | select(
          [.deps[] | select($asgn[.] == true | not)] | length == 0
        )] as $ready |
        if ($ready | length) == 0 then .
        else
          .waves += [{
            number: $wn,
            beads: [$ready[] | del(.deps)]
          }] |
          .assigned = reduce ($ready[].id) as $rid (.assigned; . + {($rid): true}) |
          .remaining = [.remaining[] |
            .id as $rid |
            if ([$ready[].id] | index($rid) | type == "number") then empty else . end
          ] |
          compute_waves
        end
      end;

    {assigned: {}, waves: [], remaining: $beads} | compute_waves |
    {
      epic: $epic,
      waves: .waves,
      total_beads: ([.waves[].beads[]] | length),
      unresolvable: [.remaining[].id]
    }
  end
'
