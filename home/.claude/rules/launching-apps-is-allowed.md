# Launching Apps Is Allowed — Launch ≠ Quit

Opening or launching an application — or opening a file/URL in one — on the
user's machine is a benign, reversible action. **Just do it.** Never refuse to
launch a closed app, and never ask permission to launch one, citing a "don't
touch the user's apps" / "never auto-restart" caution. Those cautions are about
DISRUPTING a running app, not starting a closed one.

## The distinction that matters

| Action | Approval needed? | Why |
|---|---|---|
| **Launch / open** a closed app (`open -a "Google Chrome"`), open a file, open a URL | **No — just do it** | Reversible, non-destructive, loses no state |
| **Quit / kill / restart** an app the user is running | **Yes — per-occurrence** | Destroys unsaved state, interrupts the user / other agents |
| Force-kill a process you don't own | **Never** | Not yours (see `process-isolation-across-worktrees`) |

## Why this rule exists

A closed Chrome blocked a browser task. The agent told the user "I won't
auto-launch your browser" — citing the `feedback_chrome_restart_requires_approval`
memory — and asked the user to open Chrome himself. The user, correctly: *"makes
no sense, u can launch apps on my mac."* That memory is about *quitting/restarting*
Chrome (which loses the user's tabs/session); it says nothing against *launching*
a closed one. Refusing to launch was over-applied caution that offloaded a
one-command action (`open -a "Google Chrome"`) onto the user.

The same logic covers `chrome-debug connect` failing because Chrome is closed:
the fix is to launch Chrome first (`open -a "Google Chrome"`), not to ask the
user to do it.

## How this composes

- `build-observability-not-ask-user`: making the user perform a gesture you
  could run yourself is the failure. Launching an app is squarely yours to run.
- `feedback_chrome_restart_requires_approval` (memory): QUIT-scoped, not
  launch-scoped. Launching a closed Chrome is exempt; only quitting/restarting a
  running Chrome needs per-occurrence approval.
- `acal` / `claude-in-chrome` / `dev-browser` / `computer-use`: all assume you
  can bring the needed app up yourself.

## The tell

If you're about to write "I won't launch/open `<app>` for you" or "please open
`<app>` and tell me when it's running" — stop. Run `open -a "<app>"` (or the
tool equivalent) yourself. The only app actions that need the user are
QUITTING, killing, or restarting something they're actively using.
