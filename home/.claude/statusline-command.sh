#!/usr/bin/env bash
# Claude Code status line — Tokyo Night theme

input=$(cat)

# ── Error handling ────────────────────────────────────────────
# Wrap in subshell: capture stderr, show inline on crash.
# Expected-to-fail commands use `|| true` to avoid tripping set -e.
_err_file=$(mktemp)
trap 'rm -f "$_err_file"' EXIT

_render() {
set -eE
trap '_statusline_trap $LINENO "$BASH_COMMAND"' ERR
_statusline_trap() {
    printf " \033[1;31m⚠ line:%s\033[0m \033[2m%s\033[0m" "$1" "$2"
}

# ── Directory (repo-rooted, truncated to 3 levels) ──────────
cwd=$(echo "$input" | jq -r '.cwd')
git-auto-fetch-maybe "$cwd" &>/dev/null &
dir="${cwd/#$HOME/~}"

git_root=$(git -C "$cwd" rev-parse --show-toplevel 2>/dev/null || true)
if [ -n "$git_root" ]; then
    repo_name=$(basename "$git_root")
    rel="${cwd#$git_root}"
    rel="${rel#/}"
    if [ -n "$rel" ]; then
        parts=$(echo "$rel" | awk -F/ '{
            n=NF; start=(n>2)?n-1:1;
            out=""; for(i=start;i<=n;i++){out=out"/"$i}; print out
        }')
        dir="${repo_name}${parts}"
    else
        dir="${repo_name}"
    fi
fi

printf "\033[1;34m%s\033[0m" "$dir"

# ── Git branch (show with icon when not in a worktree) ────
branch=$(git -C "$cwd" rev-parse --abbrev-ref HEAD 2>/dev/null || true)
if [ -n "$branch" ]; then
    git_dir=$(cd "$cwd" && git rev-parse --git-dir 2>/dev/null || true)
    git_common=$(cd "$cwd" && git rev-parse --git-common-dir 2>/dev/null || true)
    is_worktree=false
    if [ -n "$git_dir" ] && [ -n "$git_common" ]; then
        resolved_git=$(cd "$cwd" && cd "$git_dir" 2>/dev/null && pwd)
        resolved_common=$(cd "$cwd" && cd "$git_common" 2>/dev/null && pwd)
        [ "$resolved_git" != "$resolved_common" ] && is_worktree=true
    fi
    if [ "$is_worktree" = false ]; then
        printf " \033[2m\033[0m \033[1;35m%s\033[0m" "$branch"
    fi
fi

# ── Git dirty + unpushed ──────────────────────────────────────
if [ -n "$branch" ]; then
    dirty=$(git -C "$cwd" status --porcelain 2>/dev/null | wc -l | tr -d ' ')
    [ "$dirty" -gt 0 ] 2>/dev/null && printf " \033[1;33m%s△\033[0m" "$dirty"
    unpushed=$(git -C "$cwd" rev-list @{upstream}..HEAD --count 2>/dev/null || true)
    [ "${unpushed:-0}" -gt 0 ] 2>/dev/null && printf " \033[1;32m%s⇡\033[0m" "$unpushed"
fi

# ── Linear issue ID (extracted from branch name) ──────────────
if [ -n "$branch" ]; then
    issue_id=$(echo "$branch" | grep -oE '[A-Z]+-[0-9]+' | head -1 || true)
    if [ -n "$issue_id" ]; then
        printf " \033[2m%s\033[0m" "$issue_id"
    fi
fi

# ── PR status (single GraphQL call: merge state, CI, reviews, comments) ──
if [ -n "$branch" ]; then
    nwo=$(git -C "$cwd" remote get-url origin 2>/dev/null | sed -E 's#.*[:/]([^/]+/[^/]+?)(\.git)?$#\1#' || true)
    owner="${nwo%/*}"
    repo_gh="${nwo#*/}"
    if [ -n "$owner" ] && [ -n "$repo_gh" ]; then
        gql=$(GIT_OPTIONAL_LOCKS=0 gh api graphql -f query="
          query {
            repository(owner: \"$owner\", name: \"$repo_gh\") {
              pullRequests(headRefName: \"$branch\", first: 1, states: OPEN) {
                nodes {
                  baseRefName
                  mergeStateStatus
                  commits(last: 1) {
                    nodes {
                      commit {
                        statusCheckRollup {
                          state
                          contexts(first: 100) {
                            nodes {
                              ... on CheckRun { conclusion }
                              ... on StatusContext { state }
                            }
                          }
                        }
                      }
                    }
                  }
                  reviewThreads(first: 100) {
                    nodes { isResolved }
                  }
                  comments(first: 100) {
                    nodes { author { login } }
                  }
                }
              }
            }
          }" 2>"$_err_file" || true)
        pr_node=$(echo "$gql" | jq -r '.data.repository.pullRequests.nodes[0] // empty' 2>/dev/null || true)
        if [ -n "$pr_node" ] && [ "$pr_node" != "null" ]; then
            printf " \033[2m│\033[0m"
            # Merge state
            merge_status=$(echo "$pr_node" | jq -r '.mergeStateStatus // empty')
            base_ref=$(echo "$pr_node" | jq -r '.baseRefName // empty')
            if [ "$merge_status" = "BEHIND" ]; then
                printf "  \033[1;33m⇣behind %s\033[0m" "$base_ref"
            else
                # CI status
                rollup_state=$(echo "$pr_node" | jq -r '.commits.nodes[0].commit.statusCheckRollup.state // empty')
                case "$rollup_state" in
                    FAILURE|ERROR)
                        fail_count=$(echo "$pr_node" | jq '[.commits.nodes[0].commit.statusCheckRollup.contexts.nodes[] | select(.conclusion == "FAILURE" or .conclusion == "ACTION_REQUIRED" or .state == "FAILURE" or .state == "ERROR")] | length')
                        printf "  \033[1;31m✗ CI(%s)\033[0m" "$fail_count" ;;
                    PENDING)
                        printf "  \033[1;33m◌ CI\033[0m" ;;
                    SUCCESS)
                        printf "  \033[1;32m✓ CI\033[0m" ;;
                esac
            fi
            # Unresolved review threads
            unresolved=$(echo "$pr_node" | jq '[.reviewThreads.nodes[] | select(.isResolved == false)] | length')
            [ "${unresolved:-0}" -gt 0 ] 2>/dev/null && printf "  \033[1;31m%s✎\033[0m" "$unresolved"
            # Human PR comments (exclude bots)
            human_comments=$(echo "$pr_node" | jq '[.comments.nodes[] | select(.author.login | test("\\[bot\\]$|^greptile|^flightcontrol") | not)] | length')
            [ "${human_comments:-0}" -gt 0 ] 2>/dev/null && printf "  \033[1;36m%s💬\033[0m" "$human_comments"
        elif [ -s "$_err_file" ]; then
            # GraphQL call failed — show error
            printf " \033[2m│\033[0m"
            printf "  \033[1;31m⚠ gh: %s\033[0m" "$(head -1 "$_err_file" | cut -c1-60)"
        fi
    fi
fi

# ── Context window tokens ─────────────────────────────────────
ctx_pct=$(echo "$input" | jq -r '.context_window.used_percentage // 0')
ctx_usage=$(echo "$input" | jq -r '
    .context_window.current_usage // empty |
    if . then
        ((.input_tokens // 0) + (.output_tokens // 0) + (.cache_creation_input_tokens // 0) + (.cache_read_input_tokens // 0)) |
        if . >= 1000000 then "\(. / 1000000 * 10 | floor / 10)M"
        elif . >= 1000 then "\(. / 1000 | floor)k"
        else "\(.)"
        end
    else empty
    end
')
if [ -n "$ctx_usage" ]; then
    printf " \033[2m│\033[0m"
    if [ "$ctx_pct" -ge 80 ] 2>/dev/null; then
        printf " \033[1;31m%s tok\033[0m" "$ctx_usage"
    elif [ "$ctx_pct" -ge 50 ] 2>/dev/null; then
        printf " \033[1;33m%s tok\033[0m" "$ctx_usage"
    else
        printf " \033[2m%s tok\033[0m" "$ctx_usage"
    fi
fi

# ── Git-agent gates ──────────────────────────────────────────
if command -v git-agent &>/dev/null; then
    git-agent ensure-installed &>/dev/null || true
    agent_json=$(git-agent --json 2>/dev/null || true)
    if [ -n "$agent_json" ]; then
        read -r ga_c ga_p ga_co ga_s ga_prc ga_prd ga_prm <<< \
            "$(echo "$agent_json" | jq -r '[.commit, .push, .checkout, .stash, ."pr-create", ."pr-destroy", ."pr-comment"] | join(" ")')"
        off=0
        for v in "$ga_c" "$ga_p" "$ga_co" "$ga_s" "$ga_prc" "$ga_prd" "$ga_prm"; do
            [ "$v" = "off" ] && ((off++))
        done
        if [ "$off" -eq 0 ]; then
            printf " \033[2m│\033[0m \033[2mgit\033[0m \033[1;32m✓\033[0m"
        elif [ "$off" -eq 7 ]; then
            printf " \033[2m│\033[0m \033[2mgit\033[0m \033[1;31m✗\033[0m"
        else
            printf " \033[2m│\033[0m"
            # Git ops namespace (c, p, co, s)
            git_off=0
            [ "$ga_c"  = "off" ] && ((git_off++))
            [ "$ga_p"  = "off" ] && ((git_off++))
            [ "$ga_co" = "off" ] && ((git_off++))
            [ "$ga_s"  = "off" ] && ((git_off++))
            if [ "$git_off" -eq 4 ]; then
                printf " \033[1;31mgit\033[0m"
            else
                printf " \033[2mgit\033[0m"
                [ "$ga_c"  = "off" ] && printf " \033[1;31mc\033[0m"
                [ "$ga_p"  = "off" ] && printf " \033[1;31mp\033[0m"
                [ "$ga_co" = "off" ] && printf " \033[1;31mco\033[0m"
                [ "$ga_s"  = "off" ] && printf " \033[1;31ms\033[0m"
            fi
            # PR ops namespace (pr.c, pr.d, pr.m)
            pr_off=0
            [ "$ga_prc" = "off" ] && ((pr_off++))
            [ "$ga_prd" = "off" ] && ((pr_off++))
            [ "$ga_prm" = "off" ] && ((pr_off++))
            if [ "$pr_off" -eq 3 ]; then
                printf " \033[1;31mpr\033[0m"
            elif [ "$pr_off" -gt 0 ]; then
                [ "$ga_prc" = "off" ] && printf " \033[1;31mpr.c\033[0m"
                [ "$ga_prd" = "off" ] && printf " \033[1;31mpr.d\033[0m"
                [ "$ga_prm" = "off" ] && printf " \033[1;31mpr.m\033[0m"
            fi
        fi
    fi
fi

printf "\n"
}

# Run render. On hard crash, show error in statusline.
if ! _render 2>>"$_err_file"; then
    err_msg=$(head -1 "$_err_file" | cut -c1-80)
    printf "\033[1;31m⚠ statusline crash \033[2m%s\033[0m\n" "$err_msg"
fi
