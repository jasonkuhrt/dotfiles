#!/usr/bin/env bash
set -euo pipefail

log="${CC_CMUX_TEST_LOG:?}"
state="${CC_CMUX_TEST_STATE:?}"
workspace_state="${CC_CMUX_TEST_WORKSPACES_STATE:-}"
surface_one_uuid="11111111-1111-1111-1111-111111111111"
surface_two_uuid="22222222-2222-2222-2222-222222222222"
surface_seven_uuid="77777777-7777-7777-7777-777777777777"
workspace_uuid="aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"
workspace_two_uuid="bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"
workspace_three_uuid="cccccccc-cccc-cccc-cccc-cccccccccccc"
pane_seven_uuid="pane-77777777"

workspace_title() {
    case "$1" in
        workspace:1|0)
            printf 'workspace-one\n'
            ;;
        workspace:2|1)
            printf 'workspace-two\n'
            ;;
        workspace:3|2)
            printf 'workspace-three\n'
            ;;
        *)
            printf '%s\n' "$1"
            ;;
    esac
}

default_panes_json() {
    cat <<EOF
{"panes":[{"id":"pane-11111111","ref":"pane:10","surface_ids":["$surface_one_uuid"],"surface_refs":["surface:1"]}]}
EOF
}

split_panes_json() {
    cat <<EOF
{"panes":[{"id":"pane-11111111","ref":"pane:10","surface_ids":["$surface_one_uuid"],"surface_refs":["surface:1"]},{"id":"pane-22222222","ref":"pane:20","surface_ids":["$surface_two_uuid"],"surface_refs":["surface:2"]}]}
EOF
}

current_workspace_ref() {
    if [ -n "$workspace_state" ] && [ -f "$workspace_state" ]; then
        cat "$workspace_state"
        return
    fi

    printf 'workspace:1\n'
}

workspace_json() {
    case "$1" in
        workspace:1|0)
            printf '{"workspace_id":"%s","workspace_ref":"workspace:1"}\n' "$workspace_uuid"
            ;;
        workspace:2|1)
            printf '{"workspace_id":"%s","workspace_ref":"workspace:2"}\n' "$workspace_two_uuid"
            ;;
        workspace:3|2)
            printf '{"workspace_id":"%s","workspace_ref":"workspace:3"}\n' "$workspace_three_uuid"
            ;;
        *)
            printf '{"workspace_id":"%s","workspace_ref":"%s"}\n' "$workspace_uuid" "$1"
            ;;
    esac
}

printf '%s\n' "$*" >> "$log"

json=0
while (($#)); do
    case "${1:-}" in
        --id-format)
            shift 2
            ;;
        --json)
            json=1
            shift
            ;;
        *)
            break
            ;;
    esac
done

cmd="${1:-}"
shift || true

case "$cmd" in
    current-workspace)
        workspace_json "$(current_workspace_ref)"
        ;;
    list-workspaces)
        if [ "$json" -eq 1 ]; then
            printf '[{"workspace_id":"%s","workspace_ref":"workspace:1"},{"workspace_id":"%s","workspace_ref":"workspace:2"},{"workspace_id":"%s","workspace_ref":"workspace:3"}]\n' \
                "$workspace_uuid" "$workspace_two_uuid" "$workspace_three_uuid"
        else
            selected="$(current_workspace_ref)"
            for ws in workspace:1 workspace:2 workspace:3; do
                if [ "$ws" = "$selected" ]; then
                    printf '* %s %s [selected]\n' "$ws" "$(workspace_title "$ws")"
                else
                    printf '  %s %s\n' "$ws" "$(workspace_title "$ws")"
                fi
            done
        fi
        ;;
    list-status)
        selected="workspace:1"
        while (($#)); do
            case "$1" in
                --workspace)
                    selected="${2:-workspace:1}"
                    shift 2
                    ;;
                *)
                    shift
                    ;;
            esac
        done
        if [ "$selected" = "workspace:1" ] && [ -n "${CC_CMUX_TEST_GROUP_COLOR:-}" ]; then
            printf 'dispatch-group=● icon=circle.fill color=%s\n' "$CC_CMUX_TEST_GROUP_COLOR"
        fi
        ;;
    select-workspace)
        selected="workspace:1"
        while (($#)); do
            case "$1" in
                --workspace)
                    selected="${2:-workspace:1}"
                    shift 2
                    ;;
                *)
                    shift
                    ;;
            esac
        done
        if [ -n "$workspace_state" ]; then
            printf '%s\n' "$selected" > "$workspace_state"
        fi
        ;;
    identify)
        surface="$surface_one_uuid"
        surface_ref="surface:1"
        pane_id="pane-11111111"
        pane_ref="pane:10"
        while (($#)); do
            case "$1" in
                --surface)
                    surface="${2:-$surface_one_uuid}"
                    shift 2
                    ;;
                *)
                    shift
                    ;;
            esac
        done

        case "$surface" in
            surface:1|"$surface_one_uuid")
                surface="$surface_one_uuid"
                surface_ref="surface:1"
                pane_id="pane-11111111"
                pane_ref="pane:10"
                ;;
            surface:2|"$surface_two_uuid")
                surface="$surface_two_uuid"
                surface_ref="surface:2"
                pane_id="pane-22222222"
                pane_ref="pane:20"
                ;;
            surface:7|"$surface_seven_uuid")
                surface="$surface_seven_uuid"
                surface_ref="surface:7"
                pane_id="pane-77777777"
                pane_ref="pane:70"
                ;;
            *)
                surface_ref="$surface"
                pane_id="pane-99999999"
                pane_ref="pane:99"
                ;;
        esac

        printf '{"workspace_id":"%s","workspace_ref":"workspace:1","surface_id":"%s","surface_ref":"%s","pane_id":"%s","pane_ref":"%s"}\n' \
            "$workspace_uuid" "$surface" "$surface_ref" "$pane_id" "$pane_ref"
        ;;
    list-pane-surfaces)
        printf '[{"surface_id":"%s","surface_ref":"surface:1"},{"surface_id":"%s","surface_ref":"surface:2"}]\n' \
            "$surface_one_uuid" "$surface_two_uuid"
        ;;
    list-panes)
        if [ -f "$state" ]; then
            cat "$state"
        else
            default_panes_json
        fi
        ;;
    new-split)
        split_panes_json > "$state"
        if [ "$json" -eq 1 ]; then
            printf '{"surface_id":"%s","surface_ref":"surface:2"}\n' "$surface_two_uuid"
        else
            printf 'OK surface:2\n'
        fi
        ;;
    new-workspace)
        workspace_ref="${CC_CMUX_TEST_NEW_WORKSPACE_REF:-workspace:60}"
        if [ "$json" -eq 1 ]; then
            workspace_json "$workspace_ref"
        else
            printf 'OK %s\n' "$workspace_ref"
        fi
        ;;
    tree)
        while (($#)); do
            case "$1" in
                --workspace)
                    shift 2
                    ;;
                *)
                    shift
                    ;;
            esac
        done
        cat <<EOF
{"windows":[{"id":"window-aaaa","ref":"window:1","current":true,"visible":true,"selected_workspace_ref":"workspace:1","workspaces":[{"id":"$workspace_uuid","ref":"workspace:1","title":"workspace-one","selected":true,"active":true,"index":0,"panes":[{"id":"$pane_seven_uuid","ref":"pane:70","index":0,"active":true,"focused":true,"surface_ids":["$surface_seven_uuid"],"surface_refs":["surface:7"],"selected_surface_id":"$surface_seven_uuid","selected_surface_ref":"surface:7","surface_count":1,"surfaces":[{"id":"$surface_seven_uuid","ref":"surface:7","type":"terminal","title":"surface-seven","pane_id":"$pane_seven_uuid","pane_ref":"pane:70","index":0,"index_in_pane":0,"selected":true,"selected_in_pane":true,"focused":true,"active":true,"here":true,"url":null}]}]}]}]}
EOF
        ;;
    send|send-key|close-surface|focus-pane|resize-pane|break-pane|join-pane|rename-tab|rename-workspace|set-status|clear-status|reorder-workspace|close-workspace|notify|trigger-flash|log)
        if [ "$json" -eq 1 ]; then
            printf '{"ok":true}\n'
        fi
        ;;
    *)
        if [ "$json" -eq 1 ]; then
            printf '{}\n'
        fi
        ;;
esac
