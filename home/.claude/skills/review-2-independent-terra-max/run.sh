#!/usr/bin/env bash
# Two independent Terra reviews of one brief, with full access.
# Usage: run.sh <brief.md> <dir> [count]
#   <brief.md>  the review brief, read by each reviewer from disk
#   <dir>       the directory each run starts in (the repository under review)
#   [count]     how many runs (default 2; 1 replaces a run that didn't count)
# Each call writes to a fresh folder beside the brief, terra-<timestamp>/:
# terra-N.md (report), terra-N.jsonl (Codex events), terra-N.err (stderr).
# A run counts only when Codex's own records show Terra at max and full
# access were selected, its own sub-agents were off, and the turn completed
# with no reroute or native sub-agent call: its event
# stream (not the reviewer's output) and its session rollout file. A reroute
# is caught only when the server reports its model, so the record proves the
# selection, not which model served each response. Full access means only
# the brief keeps a reviewer from changing files or starting an agent through
# a shell; the script reports when <dir>'s HEAD, staged diff or tracked
# working-tree diff changed while the reviews ran, or that it could not
# compare them (a non-Git <dir>). Untracked and ignored files aren't compared,
# and in a shared checkout the change can be another session's.
set -uo pipefail

brief=$(cd "$(dirname "$1")" && pwd)/$(basename "$1")
dir=$2
count=${3:-2}
runs=$(seq 1 "$count")
sessions=${CODEX_HOME:-$HOME/.codex}/sessions
out=$(dirname "$brief")/terra-$(date +%Y%m%d-%H%M%S)
model=gpt-6.1-terra
effort=max
mkdir "$out" || exit 1

fingerprint() {
  git -C "$dir" rev-parse HEAD 2>/dev/null || { echo unavailable; return; }
  git -C "$dir" diff --cached HEAD | shasum -a 256
  git -C "$dir" diff | shasum -a 256
}
before=$(fingerprint)

pids=()
for n in $runs; do
  codex exec --json -C "$dir" --skip-git-repo-check --sandbox danger-full-access \
    -c "model=\"$model\"" -c "model_reasoning_effort=\"$effort\"" \
    -c 'features.multi_agent_v2=false' -c 'agents.enabled=false' \
    -o "$out/terra-$n.md" \
    "Read the review brief at $brief and follow it. You are one of two reviewers working independently: change no file, spawn no sub-agent, and never read another reviewer's report, event log or session record, or anything in any terra-* folder beside the brief." \
    </dev/null >"$out/terra-$n.jsonl" 2>"$out/terra-$n.err" &
  pids+=($!)
done

thread() { jq -r 'select(.type=="thread.started") | .thread_id' "$1" 2>/dev/null | head -1; }
rerouted() {
  jq -e 'select(.type=="item.completed" and .item.type=="error"
    and (.item.message | startswith("model rerouted")))' "$1" >/dev/null 2>&1
}

# Watch both runs: a reroute stops that run at once; a slow start is reported
# for diagnosis (the startup can legitimately wait on MCP servers), not killed.
warned=() killed=()
start=$SECONDS
alive() { for p in "${pids[@]}"; do kill -0 "$p" 2>/dev/null && return 0; done; return 1; }
while alive; do
  for n in $runs; do
    pid=${pids[$((n - 1))]}
    kill -0 "$pid" 2>/dev/null || continue
    if rerouted "$out/terra-$n.jsonl"; then
      echo "terra-$n: model rerouted; stopping it" >&2
      kill "$pid" 2>/dev/null
      killed[n]=1
    elif ((SECONDS - start > 30)) && [[ -z ${warned[n]:-} && -z $(thread "$out/terra-$n.jsonl") ]]; then
      echo "terra-$n: no thread after 30s; check $out/terra-$n.err" >&2
      warned[n]=1
    fi
  done
  sleep 5
done

status=0
for n in $runs; do
  wait "${pids[$((n - 1))]}"
  code=$?
  events=$out/terra-$n.jsonl
  sid=$(thread "$events")
  last=$(jq -r 'select(.type | startswith("turn.")) | .type' "$events" 2>/dev/null | tail -1)
  bad=()
  ((code == 0)) || bad+=("exit $code")
  [[ $last == turn.completed ]] || bad+=("last turn event '${last:-none}'")
  { [[ -n ${killed[n]:-} ]] || rerouted "$events"; } && bad+=("model rerouted")
  rollout=$([[ -n $sid ]] && fd -a -g "*$sid.jsonl" "$sessions" | head -1)
  selected=$([[ -n $rollout ]] && jq -r 'select(.type=="turn_context") | .payload | "\(.model)/\(.effort)/\(.multi_agent_version)/\(.sandbox_policy.type)"' "$rollout" | sort -u | paste -sd, -)
  [[ $selected == "$model/$effort/disabled/danger-full-access" ]] || bad+=("selected '${selected:-unknown}'")
  jq -e 'select(.item.type? == "collab_tool_call")' "$events" >/dev/null 2>&1 &&
    bad+=("used a sub-agent")
  [[ -s $out/terra-$n.md ]] || bad+=("empty report")
  if ((${#bad[@]})); then
    echo "terra-$n: does not count (${bad[*]}); see $out/terra-$n.err" >&2
    status=1
  fi
  echo "terra-$n selected=${selected:-unknown} session=$sid report=$out/terra-$n.md"
done
if [[ $before == unavailable ]]; then
  echo "$dir is not a Git checkout: nothing was compared; compare the files the reviewers were given" >&2
elif [[ $(fingerprint) != "$before" ]]; then
  echo "$dir changed while the reviews ran (HEAD, staged diff or tracked diff): find out what changed" >&2
fi
exit $status
