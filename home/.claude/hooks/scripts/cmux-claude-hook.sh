#!/usr/bin/env bash
# Shape Claude hook events into compact cmux notifications plus persistent
# workspace status. De-duplicate repeated notifications so blocked/waiting
# states do not spam the notification tray.

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

  printf '%s...' "${text:0:$((max - 3))}"
}

join_with_pipe() {
  local left="$1"
  local right="$2"

  if [[ -n "$left" && -n "$right" ]]; then
    printf '%s | %s' "$left" "$right"
  elif [[ -n "$left" ]]; then
    printf '%s' "$left"
  else
    printf '%s' "$right"
  fi
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

  printf '%s' "$(truncate_text 72 "$summary")"
}

current_notification_type="$(normalize_text "$(json_value '.notification_type')")"
current_message="$(normalize_text "$(json_value '.message')")"
current_title="$(normalize_text "$(json_value '.title')")"
current_prompt="$(json_value '.prompt')"
current_source="$(normalize_text "$(json_value '.source')")"
current_trigger="$(normalize_text "$(json_value '.trigger')")"
current_reason="$(normalize_text "$(json_value '.reason')")"
current_session_id="$(normalize_text "$(json_value '.session_id')")"
raw_json="$(printf '%s\n' "$input" | jq -c . 2>/dev/null || printf '%s' "$input")"

cwd_value="$(json_value '.cwd')"
project_name=""
if [[ -n "$cwd_value" ]]; then
  project_name="$(normalize_text "$(basename "$cwd_value")")"
fi

state_dir="$HOME/.claude/.cmux-hook-state"
state_key_source="$workspace_id"
if [[ -z "$state_key_source" ]]; then
  state_key_source="${surface_id:-global}"
fi
state_file="$state_dir/$(sanitize_key "$state_key_source").json"

last_notify_signature=""
last_status_signature=""
last_prompt_summary=""
last_session_id=""
if [[ -f "$state_file" ]]; then
  last_notify_signature="$(jq -r '.last_notify_signature // empty' "$state_file" 2>/dev/null || true)"
  last_status_signature="$(jq -r '.last_status_signature // empty' "$state_file" 2>/dev/null || true)"
  last_prompt_summary="$(jq -r '.last_prompt_summary // empty' "$state_file" 2>/dev/null || true)"
  last_session_id="$(jq -r '.last_session_id // empty' "$state_file" 2>/dev/null || true)"
fi

effective_session_id="$current_session_id"
if [[ -z "$effective_session_id" ]]; then
  effective_session_id="$last_session_id"
fi

session_short=""
if [[ -n "$effective_session_id" ]]; then
  session_short="${effective_session_id:0:7}"
fi

subtitle_base="$(join_with_pipe "$project_name" "${session_short:+session $session_short}")"
if [[ -z "$subtitle_base" ]]; then
  subtitle_base="Claude Code"
fi

save_state() {
  mkdir -p "$state_dir"
  jq -n \
    --arg last_notify_signature "$last_notify_signature" \
    --arg last_status_signature "$last_status_signature" \
    --arg last_prompt_summary "$last_prompt_summary" \
    --arg last_session_id "$effective_session_id" \
    '{
      last_notify_signature: $last_notify_signature,
      last_status_signature: $last_status_signature,
      last_prompt_summary: $last_prompt_summary,
      last_session_id: $last_session_id
    }' > "$state_file"
}

remove_state() {
  rm -f "$state_file"
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
    else
      status_only=1
    fi
    ;;
  stop:*)
    main_status_value="ready"
    main_status_icon="checkmark.circle"
    main_status_color="#34C759"
    detail_status_value=""
    event_title="Claude finished"
    if [[ -n "$last_prompt_summary" ]]; then
      event_body="$last_prompt_summary"
    else
      event_body="Ready for next prompt"
    fi
    notify_enabled=1
    should_clear_progress=1
    ;;
  notification:permission_prompt)
    permission_detail="$(extract_permission_detail "$current_message")"
    main_status_value="blocked"
    main_status_icon="hand.raised"
    main_status_color="#FF9F0A"
    detail_status_value="$permission_detail"
    event_title="Permission required"
    event_body="$(truncate_text 96 "$permission_detail")"
    notify_enabled=1
    flash_enabled=1
    should_clear_progress=1
    ;;
  notification:elicitation_dialog)
    input_detail="$(truncate_text 72 "${current_message:-Claude is waiting for your answer}")"
    main_status_value="input"
    main_status_icon="questionmark.circle"
    main_status_color="#0A84FF"
    detail_status_value="$input_detail"
    event_title="Claude needs input"
    event_body="$input_detail"
    notify_enabled=1
    flash_enabled=1
    should_clear_progress=1
    ;;
  notification:idle_prompt)
    main_status_value="waiting"
    main_status_icon="ellipsis.bubble"
    main_status_color="#0A84FF"
    detail_status_value=""
    should_clear_progress=1
    ;;
  notification:*)
    detail_status_value="$(truncate_text 72 "${current_message:-Needs attention}")"
    main_status_value="attention"
    main_status_icon="bell"
    main_status_color="#0A84FF"
    event_title="${current_title:-Claude notification}"
    event_body="$detail_status_value"
    notify_enabled=1
    flash_enabled=1
    should_clear_progress=1
    ;;
  session-start:*)
    start_source="${current_source:-startup}"
    main_status_value="ready"
    main_status_icon="checkmark.circle"
    main_status_color="#34C759"
    detail_status_value=""
    should_clear_progress=1
    last_notify_signature=""
    cmux_log_event info "session-start:${start_source} ${raw_json}"
    ;;
  precompact:*)
    compact_trigger="${current_trigger:-${current_source:-auto}}"
    main_status_value="compacting"
    main_status_icon="arrow.clockwise.circle"
    main_status_color="#FF9F0A"
    detail_status_value="$(truncate_text 48 "${compact_trigger} compact")"
    should_clear_progress=1
    cmux_log_event info "precompact:${compact_trigger} ${raw_json}"
    ;;
  session-end:*)
    end_reason="${current_reason:-other}"
    should_clear_statuses=1
    should_clear_progress=1
    cmux_log_event info "session-end:${end_reason} ${raw_json}"
    ;;
  subagent-stop:*)
    cmux_log_event info "subagent-stop ${raw_json}"
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

if [[ "$hook_subcommand" != "session-start" && "$hook_subcommand" != "precompact" && "$hook_subcommand" != "session-end" && "$hook_subcommand" != "subagent-stop" ]]; then
  cmux_log_event info "${hook_subcommand}:${current_notification_type:-main} ${raw_json}"
fi

save_state
exit 0
