#!/usr/bin/env bash
# Refresh tmux man pages split into semantic files
# Run when tmux is updated to get latest docs

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT_DIR="$SCRIPT_DIR/man-pages"
TMP_FILE="/tmp/tmux-man.txt"

echo "Extracting man tmux..."
man tmux | col -b > "$TMP_FILE"

echo "Clearing old .txt files..."
find "$OUT_DIR" -name "*.txt" -delete

echo "Ensuring directory structure..."
mkdir -p "$OUT_DIR"/{1-concepts,2-config,3-commands,4-syntax,5-internals}

echo "Splitting into semantic files..."
awk '
BEGIN {
    outdir = "'"$OUT_DIR"'"
    current_file = ""
}

/^[A-Z][A-Z]/ && !/^[A-Z][a-z]/ && !/^     / {
    header = $0
    gsub(/[^A-Za-z ]/, "", header)
    gsub(/ +/, "-", header)
    header = tolower(header)

    # 1-concepts: understand tmux (numbered for reading order)
    if (header ~ /^name|^synopsis|^description/) { dir = "1-concepts"; filename = "1-overview" }
    else if (header ~ /^command-parsing|^parsing/) { dir = "1-concepts"; filename = "2-parsing" }
    else if (header ~ /^examples/) { dir = "1-concepts"; filename = "3-examples" }

    # 2-config: set things up
    else if (header ~ /^options/) { dir = "2-config"; filename = "options" }
    else if (header ~ /^key-bindings/) { dir = "2-config"; filename = "keybindings" }
    else if (header ~ /^default-key/) { dir = "2-config"; filename = "default-keybindings" }
    else if (header ~ /^styles/) { dir = "2-config"; filename = "styles" }
    else if (header ~ /^hooks/) { dir = "2-config"; filename = "hooks" }
    else if (header ~ /^mouse/) { dir = "2-config"; filename = "mouse" }

    # 3-commands: do things (intro numbered, rest are peers)
    else if (header ~ /^commands$/) { dir = "3-commands"; filename = "1-commands" }
    else if (header ~ /^clients/) { dir = "3-commands"; filename = "clients-sessions" }
    else if (header ~ /^windows/) { dir = "3-commands"; filename = "windows-panes" }
    else if (header ~ /^buffers/) { dir = "3-commands"; filename = "buffers" }
    else if (header ~ /^status/) { dir = "3-commands"; filename = "status-line" }

    # 4-syntax: lookup tables
    else if (header ~ /^formats/) { dir = "4-syntax"; filename = "formats" }
    else if (header ~ /^names/) { dir = "4-syntax"; filename = "names-titles" }

    # 5-internals: deep dives
    else if (header ~ /^control/) { dir = "5-internals"; filename = "control-mode" }
    else if (header ~ /^terminfo/) { dir = "5-internals"; filename = "terminfo" }
    else if (header ~ /^global.*environment/) { dir = "5-internals"; filename = "session-environment" }
    else if (header ~ /^environment$/) { dir = "5-internals"; filename = "environment" }
    else if (header ~ /^miscellaneous/) { dir = "5-internals"; filename = "misc" }
    else if (header ~ /^exit/) { dir = "5-internals"; filename = "exit-messages" }
    else if (header ~ /^files/) { dir = "5-internals"; filename = "files" }
    else if (header ~ /^see-also|^authors/) { dir = "5-internals"; filename = "meta" }

    else { dir = ""; filename = "" }

    if (filename != "" && (dir "/" filename) != current_file) {
        current_file = dir "/" filename
    }
}

current_file != "" {
    print >> (outdir "/" current_file ".txt")
}
' "$TMP_FILE"

rm "$TMP_FILE"

echo ""
echo "Done. Structure:"
find "$OUT_DIR" -name "*.txt" | wc -l | xargs echo "  Total files:"
for dir in 1-concepts 2-config 3-commands 4-syntax 5-internals; do
    count=$(find "$OUT_DIR/$dir" -name "*.txt" 2>/dev/null | wc -l | tr -d ' ')
    echo "  $dir/: $count files"
done
