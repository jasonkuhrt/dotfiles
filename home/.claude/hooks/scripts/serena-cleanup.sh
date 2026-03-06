#!/bin/bash
# SessionEnd hook - kill Serena MCP process tree to prevent zombie accumulation
# Upstream: https://github.com/oraios/serena/issues/1081

# Read hook input from stdin (required even if unused)
cat > /dev/null

kill_tree() {
  local pid=$1
  for child in $(pgrep -P "$pid" 2>/dev/null); do
    kill_tree "$child"
  done
  kill "$pid" 2>/dev/null
}

# Find the TTY this session is running on
my_tty=$(ps -p $$ -o tty= 2>/dev/null | tr -d ' ')
[[ -z "$my_tty" || "$my_tty" == "?" ]] && exit 0

# Kill Serena processes on our TTY (and their child language servers)
ps -eo pid,tty,args | awk -v tty="$my_tty" '$2 == tty && /serena start-mcp-server/ && !/awk/ {print $1}' | while read -r pid; do
  kill_tree "$pid"
done
