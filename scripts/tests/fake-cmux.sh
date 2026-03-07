#!/usr/bin/env bash
set -euo pipefail

log="${CC_CMUX_TEST_LOG:?}"
state="${CC_CMUX_TEST_STATE:?}"

printf '%s\n' "$*" >> "$log"

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
        printf '{"workspace_ref":"workspace:1"}\n'
        ;;
    identify)
        surface="surface:1"
        while (($#)); do
            case "$1" in
                --surface)
                    surface="${2:-surface:1}"
                    shift 2
                    ;;
                *)
                    shift
                    ;;
            esac
        done

        case "$surface" in
            surface:1) pane="pane:10" ;;
            surface:2) pane="pane:20" ;;
            surface:7) pane="pane:70" ;;
            *) pane="pane:99" ;;
        esac

        printf '{"workspace_ref":"workspace:1","surface_ref":"%s","pane_ref":"%s"}\n' "$surface" "$pane"
        ;;
    list-pane-surfaces)
        if [ -f "$state" ]; then
            cat "$state"
        else
            printf '[{"surface_ref":"surface:1"}]\n'
        fi
        ;;
    new-split)
        printf '[{"surface_ref":"surface:1"},{"surface_ref":"surface:2"}]\n' > "$state"
        ;;
    send|send-key|close-surface|focus-pane|resize-pane|break-pane|join-pane)
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
