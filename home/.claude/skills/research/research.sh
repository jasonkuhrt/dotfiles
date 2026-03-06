#!/bin/bash
# @describe Research file management
# @flag --project Use project-level research directory
# @env RESEARCH_PROJECT_LEVEL If set, use project-level research directory

set -e

# Directory setup — runs before any subcommand
_setup_dirs() {
  if [[ -n "${argc_project:-}" ]] || [[ -n "${RESEARCH_PROJECT_LEVEL:-}" ]]; then
    RESEARCH_DIR="$(git rev-parse --show-toplevel)/.claude/research"
  else
    RESEARCH_DIR="$HOME/.claude/research"
  fi
  ARCHIVE_DIR="$RESEARCH_DIR/older-than-30"
  mkdir -p "$RESEARCH_DIR"
}

# Process a single file (called by format-gh-links, can run in parallel)
_format_gh_links_file() {
  local file="$1"
  local tmp=$(mktemp)
  cp "$file" "$tmp"
  local count=0

  # Find GitHub URLs: issues, pulls, discussions
  local urls=$(grep -oE 'https://github\.com/[^/]+/[^/]+/(issues|pull|discussions)/[0-9]+' "$file" | sort -u)

  for url in $urls; do
    local org_repo=$(echo "$url" | sed -E 's|https://github\.com/([^/]+/[^/]+)/.*|\1|')
    local url_type=$(echo "$url" | sed -E 's|.*/([^/]+)/[0-9]+.*|\1|')
    local num=$(echo "$url" | sed -E 's|.*/([0-9]+).*|\1|')

    # Skip org-level discussions (github.com/orgs/NAME/discussions/N)
    if [[ "$org_repo" == orgs/* ]]; then
      continue
    fi

    local created="" closed="" link_text=""

    case "$url_type" in
      issues|pull)
        local cmd="issue"
        [ "$url_type" = "pull" ] && cmd="pr"
        local json=$(gh $cmd view "$url" --json createdAt,closedAt 2>/dev/null || echo "")
        if [ -z "$json" ]; then
          echo "  SKIP: $url (fetch failed)" >&2
          continue
        fi
        created=$(echo "$json" | jq -r '.createdAt[:10]')
        closed=$(echo "$json" | jq -r '.closedAt // empty')
        if [ -n "$closed" ] && [ "$closed" != "null" ]; then
          closed="${closed:0:10}"
          local c_year="${created:0:4}" c_month="${created:5:2}"
          local x_year="${closed:0:4}" x_month="${closed:5:2}" x_day="${closed:8:2}"
          local closed_short
          if [ "$c_year" = "$x_year" ] && [ "$c_month" = "$x_month" ]; then
            closed_short="$x_day"
          elif [ "$c_year" = "$x_year" ]; then
            closed_short="${x_month}-${x_day}"
          else
            closed_short="$closed"
          fi
          link_text="${org_repo}#${num} (${created} → ${closed_short})"
        else
          link_text="${org_repo}#${num} (${created})"
        fi
        ;;
      discussions)
        local owner=$(echo "$org_repo" | cut -d/ -f1)
        local repo=$(echo "$org_repo" | cut -d/ -f2)
        local json=$(gh api "repos/${org_repo}/discussions/${num}" 2>/dev/null || echo "")
        if [ -z "$json" ]; then
          echo "  SKIP: $url (fetch failed)" >&2
          continue
        fi
        created=$(echo "$json" | jq -r '.created_at[:10]')
        link_text="${org_repo}#d${num} (${created})"
        ;;
    esac

    sed -i '' -E "s|\[[^]]*\]\(${url}\)|\[${link_text}\](${url})|g" "$tmp"
    ((count++)) || true
  done

  if [ $count -gt 0 ]; then
    mv "$tmp" "$file"
    echo "$file: $count link(s)"
  else
    rm "$tmp"
  fi
}

# Resolve target aliases to file paths
_resolve_targets() {
  local files=()

  for target in "$@"; do
    case "$target" in
      current|latest)
        # Most recent by filename date
        local newest=$(ls -1 "$RESEARCH_DIR"/*.md 2>/dev/null | sort -r | head -1)
        [ -n "$newest" ] && files+=("$newest")
        ;;
      all)
        files+=("$RESEARCH_DIR"/*.md)
        ;;
      all-including-old)
        files+=("$RESEARCH_DIR"/*.md)
        [ -d "$ARCHIVE_DIR" ] && files+=("$ARCHIVE_DIR"/*.md)
        ;;
      diff|dirty)
        local git_root=$(git rev-parse --show-toplevel)
        while IFS= read -r f; do
          [[ "$f" == .claude/research/*.md ]] && files+=("$git_root/$f")
        done < <(git diff --name-only HEAD 2>/dev/null)
        ;;
      *)
        files+=("$target")
        ;;
    esac
  done

  for f in "${files[@]}"; do
    [ -f "$f" ] && echo "$f"
  done
}

# @cmd Show current research files
# @meta default-subcommand
list() {
  _setup_dirs
  echo "=== Current Research ==="
  cd "$RESEARCH_DIR"
  ls -1 *.md 2>/dev/null | sort -r | while read f; do
    echo "  $f"
  done

  if [ -d "$ARCHIVE_DIR" ] && [ "$(ls -A "$ARCHIVE_DIR" 2>/dev/null)" ]; then
    echo ""
    echo "=== Archived ==="
    ls -1 "$ARCHIVE_DIR"/*.md 2>/dev/null | sort -r | while read f; do
      echo "  $(basename "$f")"
    done
  fi
}

# @cmd Create new research file
# @arg topic! <TOPIC> kebab-case topic (e.g. nx-upgrade-blockers)
new() {
  _setup_dirs
  cleanup
  echo ""

  local timestamp=$(date -u "+%Y-%m-%d-%H%M")
  local filename="${timestamp}-${argc_topic}.md"

  cat > "$RESEARCH_DIR/$filename" << EOF
# ${argc_topic//-/ }

Date: $(date -u "+%Y-%m-%d")
Context:

## Current State



## What Was Tried



## Blockers / Failures



## Recommendation



## References

-
EOF

  echo "=== Created ==="
  echo "$RESEARCH_DIR/$filename"
}

# @cmd Import existing file into research
# @arg file! <FILE> Path to file to import
# @arg topic Topic override (extracted from filename if omitted)
import() {
  _setup_dirs
  if [ ! -f "$argc_file" ]; then
    echo "Error: File not found: $argc_file"
    exit 1
  fi

  local topic="${argc_topic:-}"
  if [ -z "$topic" ]; then
    topic=$(basename "$argc_file" .md | sed -E 's/^[0-9]{4}-[0-9]{2}-[0-9]{2}(-[0-9]{4})?-//')
    if [ -z "$topic" ]; then
      echo "Error: Could not extract topic from filename. Please provide topic explicitly."
      exit 1
    fi
  fi

  echo "=== Import ==="
  cleanup
  echo ""

  local timestamp=$(date -u "+%Y-%m-%d-%H%M")
  local filename="${timestamp}-${topic}.md"

  mv "$argc_file" "$RESEARCH_DIR/$filename"

  echo "=== Imported ==="
  echo "$argc_file -> $RESEARCH_DIR/$filename"
  echo ""

  echo "=== Post-processing ==="
  _format_gh_links_file "$RESEARCH_DIR/$filename"
}

# @cmd Archive old files (>30 days)
cleanup() {
  _setup_dirs
  echo "=== Cleanup ==="

  mkdir -p "$ARCHIVE_DIR"
  local archived=0
  cd "$RESEARCH_DIR"

  for f in *.md; do
    [ -f "$f" ] || continue
    if [ "$(find "$f" -mtime +30 2>/dev/null)" ]; then
      mv "$f" "$ARCHIVE_DIR/$f"
      echo "Archived: $f -> older-than-30/$f"
      ((archived++)) || true
    fi
  done
  [ $archived -eq 0 ] && echo "No files to archive (none >30 days old)"
}

# @cmd Enrich GitHub links with dates and metadata
# @arg targets+ Target: current, latest, all, all-including-old, diff, dirty, or paths
format_gh_links() {
  _setup_dirs
  export -f _format_gh_links_file

  echo "=== Enriching GitHub Links ==="
  _resolve_targets "${argc_targets[@]}" | xargs -P 4 -I {} bash -c '_format_gh_links_file "$@"' _ {}
  echo "Done."
}

eval "$(argc --argc-eval "$0" "$@")"
