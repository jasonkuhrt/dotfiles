{
  description = "Sandbox nix-darwin macOS settings for jasonkuhrt/dotfiles";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    nix-darwin.url = "github:nix-darwin/nix-darwin/master";
    nix-darwin.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs = inputs@{ nix-darwin, ... }: {
    darwinConfigurations."Jasons-MacBook-Pro-M5" = nix-darwin.lib.darwinSystem {
      system = "aarch64-darwin";
      modules = [
        ./hosts/Jasons-MacBook-Pro-M5/default.nix
      ];
      specialArgs = {
        inherit inputs;
      };
    };
  };
}
