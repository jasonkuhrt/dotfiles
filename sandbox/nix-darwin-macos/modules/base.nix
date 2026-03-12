{ inputs, ... }:
{
  nix.settings.experimental-features = "nix-command flakes";

  nixpkgs.hostPlatform = "aarch64-darwin";
  nixpkgs.config.allowUnfree = true;

  system.primaryUser = "jasonkuhrt";
  system.stateVersion = 6;
  system.configurationRevision =
    if inputs.self ? rev then inputs.self.rev
    else if inputs.self ? dirtyRev then inputs.self.dirtyRev
    else null;
}
