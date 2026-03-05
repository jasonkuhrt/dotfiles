# Ghostty Integration

Ghostty opens shell directly by default - no automatic tmux integration.

## How It Works

```
Ghostty window → shell (no tmux)
```

## Manual Workflows

| Approach           | Command                       |
| ------------------ | ----------------------------- |
| New session        | `tmux new -s myproject`       |
| Attach to existing | `tmux attach -t project-name` |
| List sessions      | `tmux ls`                     |

## Cross-App Workflow

1. Start working in Zed → terminal creates tmux session "myapp"
2. Want a bigger terminal? Open Ghostty
3. Run `tmux attach -t myapp` → same session, same running processes
4. Both Zed and Ghostty now show the same tmux session

## Optional Auto-Attach

Add to Ghostty config if you want same behavior as Zed:

```
command = fish -c 'tmux new-session -A -s "$(basename $PWD)"'
```

Note: Less useful for Ghostty since you often open it without a specific project context.

## Keybinding Integration

See research doc for approaches: `dotfiles/research/ghostty-tmux-integration.md`

Key mechanisms:
- `text:` - Send raw bytes (e.g., `\x02` = Ctrl-B)
- `csi:` - Send CSI escape sequences (bypasses Ghostty's logical mapping)
- `unbind` - Remove default binding before rebinding

---

## Appendix

### Articles & Posts

Sorted by date (newest first).

| Date       | Title                                                | Link                                                                                                                 |
| ---------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| 2025-11-12 | Ghostty + tmux uniform copy and paste                | [mwolson.org](https://mwolson.org/blog/2025-11-12-ghostty-tmux-uniform-copy-paste/)                                  |
| 2025-10-25 | A Minimal Ghostty Config (That Actually Makes Sense) | [samuellawrentz.com](https://samuellawrentz.com/blog/minimal-ghostty-config/)                                        |
| 2025-07-15 | Dev Terminal Setup with Ghostty + Tmux + Neovim      | [darren.sh](https://darren.sh/cli/dev-term-setup/)                                                                   |
| 2025-02-12 | Tmux & Ghostty                                       | [mansoorbarri.com](https://mansoorbarri.com/tmux-ghostty/)                                                           |
| 2024-12-27 | Show and Tell: Ghostty and Fzf love!                 | [GitHub Discussion #3527](https://github.com/ghostty-org/ghostty/discussions/3527)                                   |
| 2024-12-04 | Ghostty on macOS                                     | [fredrikaverpil.github.io](https://fredrikaverpil.github.io/blog/2024/12/04/ghostty-on-macos/)                       |
| 2024-10-15 | Mastering Tmux                                       | [mikebian.co](https://mikebian.co/mastering-tmux)                                                                    |
| ?          | My perfect Ghostty + Tmux + Nvim configuration       | [Reddit r/Ghostty](https://www.reddit.com/r/Ghostty/comments/1hoi3id/my_perfect_ghostty_tmux_nvim_configuration_on/) |

### Videos

| Title                  | Link                                                   |
| ---------------------- | ------------------------------------------------------ |
| (tmux + ghostty video) | [YouTube](https://www.youtube.com/watch?v=u56ViYVJlfw) |

### Community Configs

| Repo                                                        | Description                                                                                                                                                     |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Gunpy/ghostty_tmux](https://github.com/Gunpy/ghostty_tmux) | Ghostty + tmux combo config (via [LinkedIn post](https://www.linkedin.com/posts/oklokov_ghostty-tmux-on-macos-why-i-stopped-activity-7406347384022278144-PINm)) |
| [tmux-like keybinds gist](https://gist.github.com/jamesbarnett/48e94226b7e03a3bc1cd62d851f5fdfa) | Ghostty keybinds mimicking tmux |

### Living Issues to Track

| Status      | Title                                              | Link                                                             |
| ----------- | -------------------------------------------------- | ---------------------------------------------------------------- |
| in progress | Feature: Support for tmux's Control Mode           | [#1935](https://github.com/ghostty-org/ghostty/issues/1935)      |
| resolved    | Default cmd+number keybindings break tmux workflow | [#8756](https://github.com/ghostty-org/ghostty/discussions/8756) |
| open        | Binding keys to tmux sequences                     | [#3309](https://github.com/ghostty-org/ghostty/discussions/3309) |
| closed      | Cmd keys not working in tmux                       | [#5525](https://github.com/ghostty-org/ghostty/discussions/5525) |
