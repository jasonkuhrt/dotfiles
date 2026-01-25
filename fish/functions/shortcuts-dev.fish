function shortcuts-dev --description "Shortcuts development workflow"
    set -l cmd $argv[1]
    set -l file $argv[2]
    set -l shortcuts_dir "$HOME/projects/jasonkuhrt/dotfiles/shortcuts"

    switch $cmd
        case compile c
            if test -z "$file"
                echo "Usage: shortcuts-dev compile <file.cherri>"
                return 1
            end
            echo "Compiling $file..."
            cherri "$file"
            and echo "✓ Compiled successfully"
            or echo "✗ Compilation failed"

        case run r
            if test -z "$file"
                echo "Usage: shortcuts-dev run <file.cherri>"
                return 1
            end
            echo "Compiling $file..."
            if cherri "$file"
                # Extract shortcut name from #define name or filename
                set -l shortcut_name (basename "$file" .cherri | string replace -a '-' ' ' | string replace -a '_' ' ')
                # Try to find the generated .shortcut file
                set -l shortcut_file (find . -maxdepth 1 -name "*.shortcut" -newer "$file" | head -1)
                if test -n "$shortcut_file"
                    echo "Opening $shortcut_file..."
                    open "$shortcut_file"
                else
                    echo "✓ Compiled. Look for .shortcut file to import."
                end
            else
                echo "✗ Compilation failed"
            end

        case check
            if test -z "$file"
                echo "Usage: shortcuts-dev check <file.cherri>"
                return 1
            end
            echo "Syntax check (unsigned)..."
            cherri "$file" --skip-sign
            and echo "✓ Syntax OK"
            or echo "✗ Syntax errors"

        case params p
            if test -z "$file"
                echo "Usage: shortcuts-dev params <action-name>"
                return 1
            end
            "$shortcuts_dir/analyze-shortcuts-actions.fish" params "$file"

        case actions a
            if test -z "$file"
                echo "Usage: shortcuts-dev actions <app-name>"
                return 1
            end
            "$shortcuts_dir/analyze-shortcuts-actions.fish" actions "$file"

        case vendors v
            "$shortcuts_dir/analyze-shortcuts-actions.fish" vendors

        case examples e
            echo "Example shortcuts in $shortcuts_dir/examples/:"
            ls -1 "$shortcuts_dir/examples/"*.cherri 2>/dev/null | while read -l f
                echo "  "(basename "$f")
            end

        case '' help -h --help
            echo "Usage: shortcuts-dev <command> [args]"
            echo ""
            echo "Development:"
            echo "  compile <file>    Compile and sign .cherri file"
            echo "  run <file>        Compile, sign, and open shortcut"
            echo "  check <file>      Syntax check only (no signing)"
            echo ""
            echo "Discovery:"
            echo "  params <action>   Show parameters for an action"
            echo "  actions <app>     List actions for an app"
            echo "  vendors           List all apps with Shortcuts actions"
            echo ""
            echo "Reference:"
            echo "  examples          List example .cherri files"
            echo ""
            echo "Aliases: c=compile, r=run, p=params, a=actions, v=vendors, e=examples"

        case '*'
            echo "Unknown command: $cmd"
            shortcuts-dev help
            return 1
    end
end
