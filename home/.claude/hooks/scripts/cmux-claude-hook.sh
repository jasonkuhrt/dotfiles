#!/usr/bin/env bash
# Shape Claude hook events into compact cmux sidebar status and notifications.
# De-duplicate repeated notifications so blocked/waiting states do not spam.
#
# Known cmux-side limitations (not fixable from this hook):
#
# WORKAROUND(cmux): Claude Code calls `cmux claude-hook notification` natively,
#   generating "Claude is waiting for your input" in the sidebar. Verified by piping
#   JSON to `cmux claude-hook notification` directly. The `sidebarShowNotificationMessage`
#   macOS default (confirmed in cmux#1612) can suppress this:
#     defaults write com.cmuxterm.app sidebarShowNotificationMessage -bool false
#   See also: cmux#923 (Claude Code popup notifications), cmux#1022 (sidebar config).
#
# WORKAROUND(cmux): Sidebar cwd is rendered natively. The speculative default
#   `sidebarShowCwd` follows the `sidebarShowPorts` naming pattern but is unverified:
#     defaults write com.cmuxterm.app sidebarShowCwd -bool false
#   Tracked: cmux#1022 (make sidebar items configurable).
#
# TODO(cmux): Status entries (set-status) are workspace-scoped. Multiple Claude
#   sessions in the same workspace overwrite each other's status keys. State files
#   are now surface-keyed (fixed), but status display still fights.
#   Tracked: cmux#1338 (richer sidebar metadata with surface-level scoping).

set -euo pipefail

hook_subcommand="${1:-}"
case "$hook_subcommand" in
  notification|stop|session-start|session-end|precompact|user-prompt-submit|subagent-stop)
    ;;
  *)
    printf 'usage: %s <notification|stop|session-start|session-end|precompact|user-prompt-submit|subagent-stop>\n' "${0##*/}" >&2
    exit 64
    ;;
esac

input="$(cat)"
cmux_bin="${CC_CMUX_CMUX_BIN:-cmux}"
fallback_script="$HOME/.claude/hooks/scripts/notify-ghostty.sh"
workspace_id="${CMUX_WORKSPACE_ID:-${CC_CMUX_WORKSPACE_ID:-}}"
surface_id="${CMUX_SURFACE_ID:-${CC_CMUX_SURFACE_ID:-}}"

workspace_args=()
surface_args=()
if [[ -n "$workspace_id" ]]; then
  workspace_args=(--workspace "$workspace_id")
fi
if [[ -n "$surface_id" ]]; then
  surface_args=(--surface "$surface_id")
fi

json_value() {
  local filter="$1"
  printf '%s\n' "$input" | jq -r "$filter // empty" 2>/dev/null || true
}

normalize_text() {
  printf '%s' "$1" | tr '\n\r\t' '   ' | tr -s ' ' | sed 's/^ //; s/ $//'
}

truncate_text() {
  local max="$1"
  local text="$2"

  if (( ${#text} <= max )); then
    printf '%s' "$text"
    return 0
  fi

  if (( max <= 3 )); then
    printf '%.*s' "$max" "$text"
    return 0
  fi

  # Truncate at word boundary when possible
  local trimmed="${text:0:$((max - 3))}"
  if [[ "$trimmed" =~ ^(.*[[:space:]])[^[:space:]]+$ ]]; then
    printf '%s...' "${BASH_REMATCH[1]% }"
  else
    printf '%s...' "$trimmed"
  fi
}

# Format seconds into compact human-readable duration
format_duration() {
  local secs="$1"
  if (( secs < 60 )); then
    printf '%ds' "$secs"
  elif (( secs < 3600 )); then
    printf '%dm %ds' $((secs / 60)) $((secs % 60))
  else
    printf '%dh %dm' $((secs / 3600)) $(( (secs % 3600) / 60 ))
  fi
}

# Strip common filler words from prompts for shorter card summaries
strip_filler() {
  printf '%s' "$1" | sed -E \
    -e 's/^([Pp]lease |[Cc]an you |[Cc]ould you |[Ii] want you to |[Ii] need you to |[Gg]o ahead and )//' \
    -e 's/ (how we can|how to|of my|of the|of our) / /g' \
    -e 's/ (further|also|just|really|actually|basically) / /g' \
    -e 's/ (the|a|an) / /g' \
    -e 's/  +/ /g' \
    -e 's/^ //; s/ $//'
}

sanitize_key() {
  printf '%s' "$1" | tr -c '[:alnum:]._-=' '_'
}

cmux_available() {
  command -v "$cmux_bin" >/dev/null 2>&1 && [[ -n "$workspace_id" || -n "$surface_id" ]]
}

cmux_run() {
  "$cmux_bin" "$@" >/dev/null 2>&1
}

cmux_log_event() {
  local level="$1"
  local message="$2"
  local cmd=(log --level "$level" --source claude-hook)
  cmd+=("${workspace_args[@]}")
  cmd+=(-- "$message")
  cmux_run "${cmd[@]}" || true
}

set_status() {
  local key="$1"
  local value="$2"
  local icon="$3"
  local color="$4"
  local cmd=(set-status "$key" "$value")
  if [[ -n "$icon" ]]; then
    cmd+=(--icon "$icon")
  fi
  if [[ -n "$color" ]]; then
    cmd+=(--color "$color")
  fi
  cmd+=("${workspace_args[@]}")
  cmux_run "${cmd[@]}" || true
}

clear_status() {
  local key="$1"
  local cmd=(clear-status "$key")
  cmd+=("${workspace_args[@]}")
  cmux_run "${cmd[@]}" || true
}

clear_progress() {
  local cmd=(clear-progress)
  cmd+=("${workspace_args[@]}")
  cmux_run "${cmd[@]}" || true
}

notify_event() {
  local title="$1"
  local subtitle="$2"
  local body="$3"
  local cmd=(notify --title "$title" --subtitle "$subtitle" --body "$body")
  cmd+=("${workspace_args[@]}")
  cmd+=("${surface_args[@]}")
  cmux_run "${cmd[@]}"
}

flash_event() {
  local cmd=(trigger-flash)
  cmd+=("${workspace_args[@]}")
  cmd+=("${surface_args[@]}")
  cmux_run "${cmd[@]}" || true
}

extract_permission_detail() {
  local message="$1"
  if [[ "$message" =~ use[[:space:]]+([^[:space:]]+) ]]; then
    printf '%s permission' "${BASH_REMATCH[1]}"
  else
    printf 'Permission required'
  fi
}

summarize_prompt() {
  local prompt="$1"
  local summary

  summary="$(normalize_text "$prompt")"
  summary="${summary#> }"
  if [[ "$summary" == /rename* ]]; then
    printf ''
    return 0
  fi

  summary="$(strip_filler "$summary")"
  printf '%s' "$(truncate_text 28 "$summary")"
}

# --- Elapsed timer (background updater) ---

_elapsed_pid_file() {
  printf '%s/elapsed-pid-%s' "$state_dir" "$(sanitize_key "$state_key_source")"
}

_kill_elapsed_updater() {
  local pid_file
  pid_file="$(_elapsed_pid_file)"
  if [[ -f "$pid_file" ]]; then
    local pid
    pid=$(cat "$pid_file" 2>/dev/null || true)
    if [[ -n "$pid" ]]; then
      kill "$pid" 2>/dev/null || true
    fi
    rm -f "$pid_file"
  fi
}

_start_elapsed_updater() {
  _kill_elapsed_updater
  local start_ts pid_file
  start_ts=$(date +%s)
  pid_file="$(_elapsed_pid_file)"
  mkdir -p "$state_dir"
  (
    trap 'exit 0' TERM INT
    while true; do
      sleep 30
      now=$(date +%s)
      elapsed=$((now - start_ts))
      label="working $(format_duration "$elapsed")"
      "$cmux_bin" set-status claude "$label" --icon gearshape.2 --color "#0A84FF" \
        ${workspace_id:+--workspace "$workspace_id"} 2>/dev/null || break
    done
  ) </dev/null >/dev/null 2>&1 &
  disown $! 2>/dev/null || true
  echo $! > "$pid_file"
}

# --- Parse hook input ---

current_notification_type="$(normalize_text "$(json_value '.notification_type')")"
current_message="$(normalize_text "$(json_value '.message')")"
current_title="$(normalize_text "$(json_value '.title')")"
current_prompt="$(json_value '.prompt')"
current_source="$(normalize_text "$(json_value '.source')")"
current_trigger="$(normalize_text "$(json_value '.trigger')")"
current_reason="$(normalize_text "$(json_value '.reason')")"
current_session_id="$(normalize_text "$(json_value '.session_id')")"

cwd_value="$(json_value '.cwd')"
project_name=""
if [[ -n "$cwd_value" ]]; then
  project_name="$(normalize_text "$(basename "$cwd_value")")"
fi

state_dir="$HOME/.claude/.cmux-hook-state"
# Key state by surface, not workspace — multiple Claude sessions can share a workspace
# and must not stomp each other's prompt summaries, working_since, or signatures.
state_key_source="${surface_id:-${workspace_id:-global}}"
state_file="$state_dir/$(sanitize_key "$state_key_source").json"

last_notify_signature=""
last_status_signature=""
last_prompt_summary=""
last_session_id=""
working_since=""
if [[ -f "$state_file" ]]; then
  last_notify_signature="$(jq -r '.last_notify_signature // empty' "$state_file" 2>/dev/null || true)"
  last_status_signature="$(jq -r '.last_status_signature // empty' "$state_file" 2>/dev/null || true)"
  last_prompt_summary="$(jq -r '.last_prompt_summary // empty' "$state_file" 2>/dev/null || true)"
  last_session_id="$(jq -r '.last_session_id // empty' "$state_file" 2>/dev/null || true)"
  working_since="$(jq -r '.working_since // empty' "$state_file" 2>/dev/null || true)"
fi

effective_session_id="$current_session_id"
if [[ -z "$effective_session_id" ]]; then
  effective_session_id="$last_session_id"
fi

# Notification subtitle: project name only — no session IDs
subtitle_base="${project_name:-Claude Code}"

save_state() {
  mkdir -p "$state_dir"
  jq -n \
    --arg last_notify_signature "$last_notify_signature" \
    --arg last_status_signature "$last_status_signature" \
    --arg last_prompt_summary "$last_prompt_summary" \
    --arg last_session_id "$effective_session_id" \
    --arg working_since "$working_since" \
    '{
      last_notify_signature: $last_notify_signature,
      last_status_signature: $last_status_signature,
      last_prompt_summary: $last_prompt_summary,
      last_session_id: $last_session_id,
      working_since: $working_since
    }' > "$state_file"
}

remove_state() {
  rm -f "$state_file"
  _kill_elapsed_updater
}

main_status_value=""
main_status_icon=""
main_status_color=""
detail_status_value=""
detail_status_icon="text.bubble"
detail_status_color="#8E8E93"
event_title=""
event_body=""
notify_enabled=0
flash_enabled=0
status_only=0
should_clear_statuses=0
should_clear_progress=0
should_clear_agent_status=0

case "$hook_subcommand:$current_notification_type" in
  user-prompt-submit:*)
    prompt_summary="$(summarize_prompt "$current_prompt")"
    if [[ -n "$prompt_summary" ]]; then
      last_prompt_summary="$prompt_summary"
      last_notify_signature=""
      main_status_value="working"
      main_status_icon="gearshape.2"
      main_status_color="#0A84FF"
      detail_status_value="$prompt_summary"
      working_since="$(date +%s)"
    else
      status_only=1
    fi
    ;;
  stop:*)
    _kill_elapsed_updater
    duration_label=""
    if [[ -n "$working_since" && "$working_since" =~ ^[0-9]+$ ]]; then
      now_ts=$(date +%s)
      elapsed_secs=$((now_ts - working_since))
      duration_label=" ($(format_duration "$elapsed_secs"))"
      working_since=""
    fi
    # Absence of status = ready (implicit)
    event_title="Done${duration_label}"
    if [[ -n "$last_prompt_summary" && ${#last_prompt_summary} -ge 4 ]]; then
      event_body="$last_prompt_summary"
    else
      event_body="Ready for next prompt"
    fi
    notify_enabled=1
    should_clear_progress=1
    should_clear_agent_status=1
    ;;
  notification:permission_prompt)
    _kill_elapsed_updater
    permission_detail="$(extract_permission_detail "$current_message")"
    main_status_value="blocked"
    main_status_icon="hand.raised"
    main_status_color="#FF9F0A"
    detail_status_value="$(truncate_text 28 "$permission_detail")"
    event_title="Permission required"
    event_body="$(truncate_text 48 "$permission_detail")"
    notify_enabled=1
    flash_enabled=1
    should_clear_progress=1
    ;;
  notification:elicitation_dialog)
    _kill_elapsed_updater
    input_detail="$(truncate_text 28 "${current_message:-Waiting for answer}")"
    main_status_value="input"
    main_status_icon="questionmark.circle"
    main_status_color="#0A84FF"
    detail_status_value="$input_detail"
    event_title="Claude needs input"
    event_body="$(truncate_text 48 "${current_message:-Waiting for your answer}")"
    notify_enabled=1
    flash_enabled=1
    should_clear_progress=1
    ;;
  notification:idle_prompt)
    _kill_elapsed_updater
    # Absence of status = idle (implicit)
    should_clear_progress=1
    should_clear_agent_status=1
    working_since=""
    ;;
  notification:*)
    _kill_elapsed_updater
    detail_status_value="$(truncate_text 28 "${current_message:-Needs attention}")"
    main_status_value="attention"
    main_status_icon="bell"
    main_status_color="#0A84FF"
    event_title="${current_title:-Notification}"
    event_body="$(truncate_text 48 "${current_message:-Needs attention}")"
    notify_enabled=1
    flash_enabled=1
    should_clear_progress=1
    ;;
  session-start:*)
    start_source="${current_source:-startup}"
    # Absence of status = ready (implicit)
    should_clear_progress=1
    should_clear_agent_status=1
    last_notify_signature=""
    working_since=""
    case "$start_source" in
      resume) cmux_log_event info "Session resumed" ;;
      *)      cmux_log_event info "Session started" ;;
    esac
    ;;
  precompact:*)
    _kill_elapsed_updater
    main_status_value="compacting"
    main_status_icon="arrow.clockwise.circle"
    main_status_color="#FF9F0A"
    detail_status_value=""
    should_clear_progress=1
    cmux_log_event info "Context compacted"
    ;;
  session-end:*)
    _kill_elapsed_updater
    should_clear_statuses=1
    should_clear_progress=1
    working_since=""
    cmux_log_event info "Session ended"
    ;;
  subagent-stop:*)
    agent_type="$(json_value '.agent_type')"
    cmux_log_event info "Subagent done: ${agent_type:-unknown}"
    status_only=1
    ;;
esac

if ! cmux_available; then
  if (( notify_enabled == 1 )) && [[ -x "$fallback_script" ]]; then
    jq -cn \
      --arg cwd "$cwd_value" \
      --arg session_id "$effective_session_id" \
      --arg title "$event_title" \
      --arg message "$event_body" \
      --arg notification_type "$current_notification_type" \
      '{
        cwd: $cwd,
        session_id: $session_id,
        title: $title,
        message: $message,
        notification_type: $notification_type
      }' | "$fallback_script" >/dev/null 2>&1 || true
  fi
  exit 0
fi

if (( should_clear_progress == 1 )); then
  clear_progress
fi

if (( should_clear_statuses == 1 )); then
  clear_status "claude"
  clear_status "claude-detail"
  remove_state
  exit 0
fi

if (( status_only == 1 )); then
  save_state
  exit 0
fi

if (( should_clear_agent_status == 0 )); then
  desired_status_signature="${main_status_value}|${detail_status_value}|${effective_session_id}"
  if [[ "$desired_status_signature" != "$last_status_signature" ]]; then
    set_status "claude" "$main_status_value" "$main_status_icon" "$main_status_color"
    if [[ -n "$detail_status_value" ]]; then
      set_status "claude-detail" "$detail_status_value" "$detail_status_icon" "$detail_status_color"
    else
      clear_status "claude-detail"
    fi
    last_status_signature="$desired_status_signature"
  fi
fi

if (( notify_enabled == 1 )); then
  current_notify_signature="${event_title}|${subtitle_base}|${event_body}|${effective_session_id}"
  if [[ "$current_notify_signature" != "$last_notify_signature" ]]; then
    notify_event "$event_title" "$subtitle_base" "$event_body" || true
    if (( flash_enabled == 1 )); then
      flash_event
    fi
    last_notify_signature="$current_notify_signature"
  fi
fi

# Clear agent status for implicit states (ready/idle — absence = no activity)
if (( should_clear_agent_status == 1 )); then
  clear_status "claude"
  clear_status "claude-detail"
  last_status_signature=""
fi

# Start elapsed timer AFTER setting initial "working" status
if [[ "$hook_subcommand" == "user-prompt-submit" && -n "${main_status_value:-}" ]]; then
  _start_elapsed_updater
fi

save_state
exit 0
