function shortcuts-config --description "Manage Shortcuts config in iCloud"
    set -l config "$HOME/Library/Mobile Documents/com~apple~CloudDocs/dotfiles/shortcuts/config.json"
    set -l cmd $argv[1]
    set -l key $argv[2]
    set -l val $argv[3]

    if not test -f "$config"
        echo '{}' > "$config"
    end

    switch $cmd
        case get
            if test -z "$key"
                jq '.' "$config"
            else
                jq -r ".$key // empty" "$config"
            end

        case set
            if test -z "$key" -o -z "$val"
                echo "Usage: shortcuts-config set <key> <value>"
                return 1
            end
            # Handle JSON values vs strings
            if string match -qr '^[\[\{"]' -- "$val"
                # Looks like JSON, use as-is
                set -l tmp (mktemp)
                jq ".$key = $val" "$config" > "$tmp" && mv "$tmp" "$config"
            else
                # Plain string
                set -l tmp (mktemp)
                jq ".$key = \"$val\"" "$config" > "$tmp" && mv "$tmp" "$config"
            end
            echo "Set $key"

        case del delete
            if test -z "$key"
                echo "Usage: shortcuts-config del <key>"
                return 1
            end
            set -l tmp (mktemp)
            jq "del(.$key)" "$config" > "$tmp" && mv "$tmp" "$config"
            echo "Deleted $key"

        case edit
            $EDITOR "$config"

        case path
            echo "$config"

        case '' help
            echo "Usage: shortcuts-config <get|set|del|edit|path> [args]"
            echo ""
            echo "Commands:"
            echo "  get [key]        Get value (entire config if no key)"
            echo "  set <key> <val>  Set value (nested: 'projects.foo.path')"
            echo "  del <key>        Delete key"
            echo "  edit             Open in \$EDITOR"
            echo "  path             Print config file path"
            echo ""
            echo "Config: $config"

        case '*'
            echo "Unknown command: $cmd"
            return 1
    end
end
