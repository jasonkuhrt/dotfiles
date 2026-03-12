{ ... }:
{
  system.activationScripts.userScreenshotsDir.text = ''
    install -d -m 755 /Users/jasonkuhrt/Pictures/Screenshots
  '';

  system.defaults.screencapture.location = "/Users/jasonkuhrt/Pictures/Screenshots";
}
