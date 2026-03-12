function __dotfiles_gco_needs_branch --description "Return true when gco is completing its branch argument"
    set -l tokens (commandline -opc)
    test (count $tokens) -le 1
end

complete -c gco -e
complete -f -c gco -s h -l help -d 'Show git checkout help'
complete -f -c gco -n '__dotfiles_gco_needs_branch' -ka '(__dotfiles_gco_checkoutable_branches)'
