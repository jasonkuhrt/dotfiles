# git-auto-fetch — keep tracking refs fresh so prompt ⇡⇣ counts are accurate
function __git_auto_fetch --on-event fish_prompt
    command git-auto-fetch-maybe &>/dev/null &
    disown
end
