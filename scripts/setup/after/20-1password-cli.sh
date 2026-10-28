#!/bin/bash
set -euo pipefail

source "$DOTFILES_ROOT/scripts/lib/helpers.sh"

header "1Password CLI"

mode="${1:---install-if-missing}"
case "$mode" in
    --install-if-missing | --update | --check) ;;
    *)
        warn "Usage: $0 [--install-if-missing|--update|--check]"
        exit 1
        ;;
esac

if [[ "$OSTYPE" != darwin* ]]; then
    skip "1Password CLI (unsupported OS: $OSTYPE)"
    exit 0
fi

if [ "$mode" = "--install-if-missing" ] && has_cmd op; then
    skip "1Password CLI $(op --version 2>/dev/null || true)"
    exit 0
fi

case "$(uname -m)" in
    arm64) arch="arm64" ;;
    x86_64) arch="amd64" ;;
    *)
        warn "Unsupported architecture for 1Password CLI: $(uname -m)"
        exit 0
        ;;
esac

if ! has_cmd jq; then
    warn "jq is required to resolve 1Password CLI metadata"
    exit 1
fi

metadata_url="https://formulae.brew.sh/api/cask/1password-cli.json"
tmpdir="$(mktemp -d)"
trap 'rm -rf "$tmpdir"' EXIT

info "Resolving latest official 1Password CLI metadata"
curl -fsSL "$metadata_url" -o "$tmpdir/cask.json"

version="$(jq -r '.version' "$tmpdir/cask.json")"
url="$(jq -r '.url' "$tmpdir/cask.json")"
sha256="$(jq -r '.sha256' "$tmpdir/cask.json")"

current_version="$(op --version 2>/dev/null || true)"
info "Installed: ${current_version:-none}; available: $version"
if [ "$mode" = "--check" ]; then
    exit 0
fi

target="$HOME/.local/bin/op"
target_version=""
if [ -x "$target" ]; then
    target_version="$("$target" --version 2>/dev/null || true)"
fi
if [ "$target_version" = "$version" ]; then
    skip "1Password CLI $version"
    exit 0
fi

case "$url" in
    *"op_darwin_${arch}_"*.zip) ;;
    *)
        warn "Resolved 1Password CLI URL does not match darwin/${arch}: $url"
        exit 1
        ;;
esac

info "Installing 1Password CLI $version"
curl -fsSL "$url" -o "$tmpdir/op.zip"

actual_sha256="$(shasum -a 256 "$tmpdir/op.zip" | awk '{print $1}')"
if [ "$actual_sha256" != "$sha256" ]; then
    warn "Checksum mismatch for 1Password CLI $version"
    exit 1
fi

unzip -q "$tmpdir/op.zip" -d "$tmpdir/op"

if [ ! -f "$tmpdir/op/op" ]; then
    warn "Downloaded 1Password CLI archive did not contain op"
    exit 1
fi

mkdir -p "$HOME/.local/bin"
if [ -e "$target" ]; then
    backup_dir="$HOME/.local/state/tooling-upgrades/op-$(date +%Y%m%d-%H%M%S)"
    (
        umask 077
        mkdir -p "$backup_dir"
        cp -p "$target" "$backup_dir/op"
    )
    chmod -R go-rwx "$backup_dir"
    info "Previous binary saved to $backup_dir/op"
fi

staged_binary="$(mktemp "$HOME/.local/bin/.op-update.XXXXXX")"
trap 'rm -rf "$tmpdir"; rm -f "${staged_binary:-}"' EXIT
install -m 755 "$tmpdir/op/op" "$staged_binary"
mv -f "$staged_binary" "$target"

task "1Password CLI $version installed to ~/.local/bin/op"
