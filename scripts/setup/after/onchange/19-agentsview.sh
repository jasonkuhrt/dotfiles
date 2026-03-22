#!/bin/bash
set -euo pipefail

source "$DOTFILES_ROOT/scripts/lib/helpers.sh"

header "agentsview"

version_file="$DOTFILES_ROOT/scripts/data/agentsview-version.txt"
if [ ! -f "$version_file" ]; then
    warn "Pinned version file missing: $version_file"
    exit 0
fi

version="$(tr -d '[:space:]' < "$version_file")"
if [ -z "$version" ]; then
    warn "Pinned agentsview version is empty"
    exit 0
fi

case "$(uname -s)" in
    Darwin) os="darwin" ;;
    Linux) os="linux" ;;
    *)
        skip "agentsview (unsupported OS: $(uname -s))"
        exit 0
        ;;
esac

case "$(uname -m)" in
    x86_64 | amd64) arch="amd64" ;;
    arm64 | aarch64) arch="arm64" ;;
    *)
        warn "Unsupported architecture: $(uname -m)"
        exit 0
        ;;
esac

install_root="$HOME/.local/share/agentsview"
install_dir="$install_root/bin"
binary_path="$install_dir/agentsview"
legacy_toml_config="$HOME/.agentsview/config.toml"
json_config="$HOME/.agentsview/config.json"

cleanup_legacy_config() {
    if [ -f "$json_config" ] && [ -f "$legacy_toml_config" ] && [ ! -s "$legacy_toml_config" ]; then
        rm -f "$legacy_toml_config"
        task "Removed unused ~/.agentsview/config.toml placeholder"
    fi
}

current_version=""
if [ -x "$binary_path" ]; then
    current_version="$("$binary_path" version 2>/dev/null | grep -Eo 'v[0-9]+\.[0-9]+\.[0-9]+' | head -n 1 || true)"
fi

if [ "$current_version" = "$version" ]; then
    cleanup_legacy_config
    skip "agentsview $version"
    exit 0
fi

filename="agentsview_${version#v}_${os}_${arch}.tar.gz"
base_url="https://github.com/wesm/agentsview/releases/download/$version"
tmpdir="$(mktemp -d)"
trap 'rm -rf "$tmpdir"' EXIT

info "Installing $version for $os/$arch"
curl -fsSL "$base_url/$filename" -o "$tmpdir/release.tar.gz"
curl -fsSL "$base_url/SHA256SUMS" -o "$tmpdir/SHA256SUMS"

expected_checksum="$(awk -v f="$filename" '{gsub(/^\*/, "", $2); if ($2 == f) { print $1; exit }}' "$tmpdir/SHA256SUMS")"
if [ -z "$expected_checksum" ]; then
    warn "Could not find checksum for $filename"
    exit 1
fi

if command -v sha256sum >/dev/null 2>&1; then
    actual_checksum="$(sha256sum "$tmpdir/release.tar.gz" | awk '{print $1}')"
else
    actual_checksum="$(shasum -a 256 "$tmpdir/release.tar.gz" | awk '{print $1}')"
fi

if [ "$expected_checksum" != "$actual_checksum" ]; then
    warn "Checksum mismatch for $filename"
    exit 1
fi

mkdir -p "$install_dir"
tar -xzf "$tmpdir/release.tar.gz" -C "$tmpdir"

if [ ! -f "$tmpdir/agentsview" ]; then
    warn "Downloaded archive did not contain agentsview"
    exit 1
fi

mv "$tmpdir/agentsview" "$binary_path"
chmod +x "$binary_path"

if [ "$os" = "darwin" ]; then
    codesign -s - "$binary_path" >/dev/null 2>&1 || true
fi

cleanup_legacy_config
task "agentsview $version installed to $binary_path"
