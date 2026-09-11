# The one `git` wrapper. Bare `git` opens the dashboard (git-dashboard.fish);
# interactive shells run every other invocation past the guardrails
# (git-guardrails.fish). Keep this the only module that defines `git`: modules
# load alphabetically, so a second definition silently replaces this one.

function git --wraps git --description "git: dashboard when bare, safety guardrails when interactive"
    if test (count $argv) -eq 0
        _git_dashboard
        return $status
    end

    if status is-interactive; or set -q DOTFILES_GIT_GUARDRAILS_FORCE
        __dotfiles_git_guardrail $argv
        or return $status
    end

    command git $argv
end
