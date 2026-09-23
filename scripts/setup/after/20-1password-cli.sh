#!/bin/bash
set -euo pipefail

source "$DOTFILES_ROOT/scripts/lib/helpers.sh"

header "1Password CLI"

if [[ "$OSTYPE" != darwin* ]]; then
    skip "1Password CLI (unsupported OS: $OSTYPE)"
    exit 0
fi

if has_cmd op; then
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
mv "$tmpdir/op/op" "$HOME/.local/bin/op"
chmod +x "$HOME/.local/bin/op"

task "1Password CLI $version installed to ~/.local/bin/op"
