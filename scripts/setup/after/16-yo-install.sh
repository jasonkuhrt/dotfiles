#!/bin/bash
set -euo pipefail

source "$DOTFILES_ROOT/scripts/lib/helpers.sh"

if [[ "$OSTYPE" != darwin* ]]; then
    exit 0
fi

header "yo (Notification Tool)"

# 2.0.2 has no upstream binary asset. Build its exact official source commit.
YO_VERSION="2.0.2"
YO_COMMIT="ed87afc9e03079cb793efc9c9ee43ef862c8451d"
YO_SHA256="7e351d37c38c5863bd3f4b15e230573cbcea77f87b394062a6da471e8698691f"
YO_APP="$HOME/Applications/yo.app"

current_version=""
if [ -f "$YO_APP/Contents/Info.plist" ]; then
    current_version="$(/usr/libexec/PlistBuddy -c 'Print :CFBundleShortVersionString' "$YO_APP/Contents/Info.plist")"
fi
if [ "$current_version" = "$YO_VERSION" ]; then
    skip "yo $YO_VERSION (persistent notifications)"
    exit 0
fi

if ! has_cmd xcodebuild; then
    warn "Xcode is required to build yo $YO_VERSION"
    exit 1
fi

tmpdir="$(mktemp -d)"
stage_root=""
trap 'rm -rf "$tmpdir"; if [ -n "$stage_root" ]; then rm -rf "$stage_root"; fi' EXIT

info "Downloading official yo $YO_VERSION source"
curl -fsSL "https://github.com/sheagcraig/yo/archive/$YO_COMMIT.tar.gz" -o "$tmpdir/source.tar.gz"
actual_sha256="$(shasum -a 256 "$tmpdir/source.tar.gz" | awk '{print $1}')"
if [ "$actual_sha256" != "$YO_SHA256" ]; then
    warn "Checksum mismatch for yo $YO_VERSION source"
    exit 1
fi

mkdir "$tmpdir/source"
tar -xzf "$tmpdir/source.tar.gz" -C "$tmpdir/source" --strip-components=1

info "Building yo $YO_VERSION for $(uname -m)"
if ! xcodebuild -project "$tmpdir/source/yo.xcodeproj" -scheme yo \
    -configuration Release -derivedDataPath "$tmpdir/build" \
    CODE_SIGNING_ALLOWED=NO MACOSX_DEPLOYMENT_TARGET=12.0 "ARCHS=$(uname -m)" \
    build >"$tmpdir/build.log" 2>&1; then
    tail -40 "$tmpdir/build.log" >&2
    exit 1
fi

app="$tmpdir/build/Build/Products/Release/yo.app"
built_version="$(/usr/libexec/PlistBuddy -c 'Print :CFBundleShortVersionString' "$app/Contents/Info.plist")"
if [ "$built_version" != "$YO_VERSION" ]; then
    warn "Built yo version $built_version does not match $YO_VERSION"
    exit 1
fi

# A local ad-hoc signature seals the app built from the verified source.
codesign --force --deep --sign - "$app"
codesign --verify --deep --strict "$app"

mkdir -p "$HOME/Applications"
stage_root="$(mktemp -d "$HOME/Applications/.yo-update.XXXXXX")"
cp -R "$app" "$stage_root/yo.app"
if [ -e "$YO_APP" ]; then
    backup_dir="$HOME/.local/state/tooling-upgrades/yo-$(date +%Y%m%d-%H%M%S)"
    (
        umask 077
        mkdir -p "$backup_dir"
    )
    mv "$YO_APP" "$backup_dir/yo.app"
    chmod -R go-rwx "$backup_dir"
    info "Previous app saved to $backup_dir/yo.app"
fi
mv "$stage_root/yo.app" "$YO_APP"

task "yo $YO_VERSION installed to ~/Applications"
