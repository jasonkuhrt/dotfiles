#!/usr/bin/env bash

DASHBOARD_FLAG="--enable-web-dashboard"
if [[ "${SERENA_DASHBOARD:-false}" == "true" ]]; then
  DASHBOARD_VALUE="true"
else
  DASHBOARD_VALUE="false"
fi

exec uvx \
  --from "git+https://github.com/oraios/serena" \
  serena \
  start-mcp-server \
  --context claude-code \
  --project-from-cwd \
  $DASHBOARD_FLAG "$DASHBOARD_VALUE"
