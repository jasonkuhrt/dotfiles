#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
plugin_root="$(cd "$script_dir/../.." && pwd)"
config_root="$(cd "$plugin_root/../../.." && pwd)"
cache_dir="$(mktemp -d)"
trap 'rm -rf "$cache_dir"' EXIT

CMD_UX_TEST="${CMD_UX_TEST:-1}" XDG_CONFIG_HOME="$config_root" XDG_CACHE_HOME="$cache_dir" nvim -u NONE --headless \
  --cmd "set runtimepath^=$plugin_root" \
  "+lua require('cmd_ux').setup()" \
  "+lua local p=require('cmd_ux.index').cache_path(); assert(vim.uv.fs_stat(p), 'missing cache after boot1')" \
  +qa

CMD_UX_TEST="${CMD_UX_TEST:-1}" XDG_CONFIG_HOME="$config_root" XDG_CACHE_HOME="$cache_dir" nvim -u NONE --headless \
  "+lua vim.api.nvim_create_user_command('BeforeSetupCmd', function() end, {})" \
  --cmd "set runtimepath^=$plugin_root" \
  "+lua require('cmd_ux').setup()" \
  "+lua assert(require('cmd_ux.index').has('BeforeSetupCmd'), 'stale cache hid BeforeSetupCmd')" \
  +qa
