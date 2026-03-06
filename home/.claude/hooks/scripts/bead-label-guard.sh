#!/usr/bin/env bash
# bead-label-guard: Warn when bd create is used without labels or with unknown labels
input=$(cat)
command=$(echo "$input" | python3 -c "import sys,json; print(json.load(sys.stdin).get('tool_input',{}).get('command',''))" 2>/dev/null)

# Only relevant for bd create commands
if [[ ! "$command" =~ bd[[:space:]]+create ]]; then
  echo '{}'
  exit 0
fi

# Find project root via git
project_root=$(git rev-parse --show-toplevel 2>/dev/null)
config="$project_root/.beads/labels.yml"

# No config = no enforcement (project hasn't opted in)
if [[ -z "$project_root" ]] || [[ ! -f "$config" ]]; then
  echo '{}'
  exit 0
fi

# Extract known labels from config (keys at indent level 2)
known_labels=$(grep -E '^\s{2}\w[^:]*:' "$config" | sed 's/^[[:space:]]*//' | cut -d: -f1)

# Check if --labels or -l flag is present
if [[ ! "$command" =~ --labels ]] && [[ ! "$command" =~ [[:space:]]-l[[:space:]] ]]; then
  cat <<'EOF'
{"systemMessage": "**[bead-label-guard]**\n`bd create` without `--labels` detected.\n\nEvery bead should have ≥1 label. Check `.beads/labels.yml` for the canonical set.\n\n**Add `--labels \"<label>\"` to your command.**"}
EOF
  exit 0
fi

# Extract provided labels (handles both --labels=x,y and --labels "x,y" and -l x,y)
provided=$(echo "$command" | grep -oE '(--labels[= ]|\ -l )[^ ]*' | sed 's/--labels[= ]//;s/ -l //' | tr -d '"'"'" | tr ',' '\n')

# Validate each label against known set
unknown=""
for label in $provided; do
  if ! echo "$known_labels" | grep -qx "$label"; then
    unknown="$unknown $label"
  fi
done

if [[ -n "$unknown" ]]; then
  unknown_trimmed=$(echo "$unknown" | xargs)
  cat <<EOF
{"systemMessage": "**[bead-label-guard]**\nUnrecognized label(s): \`${unknown_trimmed}\`\n\nCheck \`.beads/labels.yml\` for canonical labels. If this is intentional, add the label to the config first."}
EOF
  exit 0
fi

echo '{}'
