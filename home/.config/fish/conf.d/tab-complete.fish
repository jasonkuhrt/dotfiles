# Interactive only: key bindings do nothing in a script.
status is-interactive; or exit 0

# The first Tab both shows the completion pager and selects its first entry,
# which is what a second Tab does by default. The `commandline -P` guard
# re-invokes `complete` only while the pager is showing, so a unique completion
# does not pop the pager for the next argument (the plain
# `bind tab complete complete` form does). Both modes: config.fish runs vi mode,
# where a bare `bind` misses `insert`. Verified against fish 4.7.1.
for mode in default insert
    bind -M $mode tab complete 'commandline -P; and commandline -f complete'
end
