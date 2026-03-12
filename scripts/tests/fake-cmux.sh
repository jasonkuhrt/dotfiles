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

while (($#)); do
    case "${1:-}" in
        --id-format)
            shift 2
            ;;
        *)
            break
            ;;
    esac
done

if [ "${1:-}" = "--json" ]; then
    shift
    json=1
else
    json=0
fi

cmd="${1:-}"
shift || true

case "$cmd" in
    current-workspace)
        workspace_json "$(current_workspace_ref)"
        ;;
    list-workspaces)
        printf '[{"workspace_id":"%s","workspace_ref":"workspace:1"},{"workspace_id":"%s","workspace_ref":"workspace:2"},{"workspace_id":"%s","workspace_ref":"workspace:3"}]\n' \
            "$workspace_uuid" "$workspace_two_uuid" "$workspace_three_uuid"
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
        if [ -f "$state" ]; then
            cat "$state"
        else
            printf '[{"surface_id":"%s","surface_ref":"surface:1"}]\n' "$surface_one_uuid"
        fi
        ;;
    new-split)
        printf '[{"surface_id":"%s","surface_ref":"surface:1"},{"surface_id":"%s","surface_ref":"surface:2"}]\n' \
            "$surface_one_uuid" "$surface_two_uuid" > "$state"
        ;;
    send|send-key|close-surface|focus-pane|resize-pane|break-pane|join-pane|rename-tab)
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
