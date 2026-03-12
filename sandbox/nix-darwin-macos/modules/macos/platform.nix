{ ... }:
{
  # These domains are native macOS state but not all are first-class nix-darwin
  # options, so they live under CustomUserPreferences instead of shell scripts.
  system.defaults.LaunchServices.LSQuarantine = false;

  system.defaults.CustomUserPreferences = {
    "com.apple.desktopservices" = {
      DSDontWriteNetworkStores = true;
      DSDontWriteUSBStores = true;
    };
  };
}
