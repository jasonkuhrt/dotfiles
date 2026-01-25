#!/usr/bin/env fish
#
# analyze-shortcuts-actions.fish
# Discover all Shortcuts actions available on this Mac, including third-party apps.
# Source: ~/Library/Shortcuts/ToolKit/Tools-*.sqlite
#

set -g db (find ~/Library/Shortcuts/ToolKit -name "Tools-prod.*.sqlite" | head -1)

if test -z "$db"
    echo "Error: Shortcuts ToolKit database not found"
    exit 1
end

function help
    echo "Usage: analyze-shortcuts-actions.fish [command] [args]"
    echo ""
    echo "Commands:"
    echo "  vendors           List all third-party app vendors with action counts"
    echo "  apps              List all third-party apps with Shortcuts support"
    echo "  actions <app>     List all actions for an app (e.g., 'actions raycast')"
    echo "  params <action>   Show parameters for an action (e.g., 'params GlobalVariables')"
    echo "  search <term>     Search for actions by name"
    echo "  all               Export all third-party actions to stdout"
    echo "  stats             Show database statistics"
    echo "  doc [file]        Generate markdown doc (default: SHORTCUTS_ACTIONS.md)"
    echo ""
    echo "Examples:"
    echo "  analyze-shortcuts-actions.fish vendors"
    echo "  analyze-shortcuts-actions.fish actions com.raycast"
    echo "  analyze-shortcuts-actions.fish params GlobalVariablesIntent"
    echo "  analyze-shortcuts-actions.fish search clipboard"
    echo "  analyze-shortcuts-actions.fish doc"
end

function vendors
    echo "Third-party app vendors with Shortcuts actions:"
    echo ""
    sqlite3 $db "
        SELECT
            CASE
                WHEN id LIKE 'is.workflow.%' THEN 'is.workflow (Shortcuts built-in)'
                ELSE substr(id, 1, instr(substr(id, instr(id, '.') + 1), '.') + instr(id, '.'))
            END as vendor,
            COUNT(*) as actions
        FROM Tools
        WHERE id NOT LIKE 'com.apple.%'
        GROUP BY vendor
        ORDER BY actions DESC;
    " | while read -l line
        set -l parts (string split '|' $line)
        printf "  %-45s %s actions\n" $parts[1] $parts[2]
    end
end

function apps
    echo "Third-party apps with Shortcuts support:"
    echo ""
    sqlite3 $db "
        SELECT DISTINCT
            substr(id, 1, length(id) - length(substr(id, instr(id, (SELECT substr(id, instr(id, '.', instr(id, '.') + 1) + 1) FROM Tools WHERE rowId = t.rowId))))) as app_id,
            COUNT(*) as action_count
        FROM Tools t
        WHERE id NOT LIKE 'com.apple.%'
          AND id NOT LIKE 'is.workflow.%'
        GROUP BY substr(id, 1, instr(substr(id, instr(id, '.') + 1), '.') + instr(id, '.') + instr(substr(id, instr(substr(id, instr(id, '.') + 1), '.') + instr(id, '.') + 1), '.'))
        ORDER BY action_count DESC
        LIMIT 50;
    " | while read -l line
        set -l parts (string split '|' $line)
        printf "  %-50s (%s actions)\n" $parts[1] $parts[2]
    end
end

function actions
    set -l app_filter $argv[1]
    if test -z "$app_filter"
        echo "Usage: actions <app-identifier>"
        echo "Example: actions com.raycast"
        return 1
    end

    echo "Actions for apps matching '$app_filter':"
    echo ""
    sqlite3 $db "
        SELECT id FROM Tools
        WHERE id LIKE '%$app_filter%'
        ORDER BY id;
    " | while read -l action
        echo "  $action"
    end
end

function search_actions
    set -l term $argv[1]
    if test -z "$term"
        echo "Usage: search <term>"
        return 1
    end

    echo "Actions matching '$term':"
    echo ""
    sqlite3 $db "
        SELECT id FROM Tools
        WHERE id LIKE '%$term%'
          AND id NOT LIKE 'com.apple.%'
        ORDER BY id
        LIMIT 50;
    " | while read -l action
        echo "  $action"
    end
end

function params
    set -l action_filter $argv[1]
    if test -z "$action_filter"
        echo "Usage: params <action-name>"
        echo "Example: params GlobalVariablesIntent"
        return 1
    end

    # First find matching actions
    set -l matching (sqlite3 $db "SELECT id FROM Tools WHERE id LIKE '%$action_filter%' LIMIT 5;")

    if test -z "$matching"
        echo "No actions found matching '$action_filter'"
        return 1
    end

    for action_id in $matching
        echo "═══════════════════════════════════════════════════════════"
        echo "Action: $action_id"
        echo "═══════════════════════════════════════════════════════════"
        echo ""

        # Get localized name and description
        sqlite3 $db "
            SELECT '  Name: ' || name, '  Description: ' || COALESCE(descriptionSummary, '(none)')
            FROM ToolLocalizations
            WHERE toolId = (SELECT rowId FROM Tools WHERE id = '$action_id')
              AND locale = 'en'
            LIMIT 1;
        " | while read -l line
            echo $line
        end
        echo ""

        echo "Parameters:"
        echo "───────────────────────────────────────────────────────────"

        set -l has_params 0
        sqlite3 -separator '|' $db "
            SELECT p.key, COALESCE(pl.name, p.key), COALESCE(pl.description, '')
            FROM Parameters p
            LEFT JOIN ParameterLocalizations pl
                ON p.toolId = pl.toolId AND p.key = pl.key AND pl.locale = 'en'
            WHERE p.toolId = (SELECT rowId FROM Tools WHERE id = '$action_id')
            ORDER BY p.sortOrder;
        " | while read -l line
            set has_params 1
            set -l parts (string split '|' $line)
            set -l key $parts[1]
            set -l name $parts[2]
            set -l desc $parts[3]

            printf "  %-25s %s\n" $key $name
            if test -n "$desc"
                printf "  %-25s   └─ %s\n" "" $desc
            end
        end

        if test $has_params -eq 0
            echo "  (no parameters)"
        end
        echo ""
    end
end

function export_all
    echo "# Third-Party Shortcuts Actions"
    echo "# Generated: $(date)"
    echo "# Source: $db"
    echo ""
    sqlite3 $db "
        SELECT id FROM Tools
        WHERE id NOT LIKE 'com.apple.%'
          AND id NOT LIKE 'is.workflow.%'
        ORDER BY id;
    "
end

function stats
    echo "Shortcuts ToolKit Database Statistics"
    echo "======================================"
    echo ""
    echo "Database: $db"
    echo ""

    set -l total (sqlite3 $db "SELECT COUNT(*) FROM Tools;")
    set -l apple (sqlite3 $db "SELECT COUNT(*) FROM Tools WHERE id LIKE 'com.apple.%';")
    set -l workflow (sqlite3 $db "SELECT COUNT(*) FROM Tools WHERE id LIKE 'is.workflow.%';")
    set -l thirdparty (sqlite3 $db "SELECT COUNT(*) FROM Tools WHERE id NOT LIKE 'com.apple.%' AND id NOT LIKE 'is.workflow.%';")

    echo "Total actions:        $total"
    echo "Apple actions:        $apple"
    echo "Shortcuts built-in:   $workflow"
    echo "Third-party actions:  $thirdparty"
end

function generate_doc
    set -l output "$argv[1]"
    if test -z "$output"
        set output "SHORTCUTS_ACTIONS.md"
    end

    echo "Generating $output..."

    echo "# Available Shortcuts Actions" > $output
    echo "" >> $output
    echo "Generated: $(date)" >> $output
    echo "" >> $output
    echo "Machine: $(hostname)" >> $output
    echo "" >> $output

    # Stats
    set -l total (sqlite3 $db "SELECT COUNT(*) FROM Tools;")
    set -l apple (sqlite3 $db "SELECT COUNT(*) FROM Tools WHERE id LIKE 'com.apple.%';")
    set -l thirdparty (sqlite3 $db "SELECT COUNT(*) FROM Tools WHERE id NOT LIKE 'com.apple.%' AND id NOT LIKE 'is.workflow.%';")

    echo "## Summary" >> $output
    echo "" >> $output
    echo "| Category | Count |" >> $output
    echo "|----------|-------|" >> $output
    echo "| Total actions | $total |" >> $output
    echo "| Apple actions | $apple |" >> $output
    echo "| Third-party actions | $thirdparty |" >> $output
    echo "" >> $output

    # Third-party by vendor
    echo "## Third-Party Actions by App" >> $output
    echo "" >> $output

    set -g current_app ""

    # Get unique app prefixes and their actions
    sqlite3 $db "
        SELECT id FROM Tools
        WHERE id NOT LIKE 'com.apple.%'
          AND id NOT LIKE 'is.workflow.%'
        ORDER BY id;
    " | while read -l action
        # Extract app identifier (first 3 parts of reverse domain)
        set -l parts (string split '.' $action)
        if test (count $parts) -ge 3
            set -l app_id "$parts[1].$parts[2].$parts[3]"
            set -l action_name (string replace "$app_id." "" $action)

            # Track current app for headers
            if test "$app_id" != "$current_app"
                set -g current_app $app_id
                echo "" >> $output
                echo "### $app_id" >> $output
                echo "" >> $output
                echo "| Action | Cherri Identifier |" >> $output
                echo "|--------|-------------------|" >> $output
            end

            echo "| $action_name | \`$action\` |" >> $output
        end
    end

    echo "" >> $output
    echo "---" >> $output
    echo "" >> $output
    echo "*Use these identifiers in Cherri with raw actions or check if Cherri has built-in support.*" >> $output

    echo "Done: $output"
end

# Main dispatch
switch $argv[1]
    case vendors
        vendors
    case apps
        apps
    case actions
        actions $argv[2]
    case params
        params $argv[2]
    case search
        search_actions $argv[2]
    case all
        export_all
    case stats
        stats
    case doc
        generate_doc $argv[2]
    case help -h --help ''
        help
    case '*'
        echo "Unknown command: $argv[1]"
        help
        exit 1
end
