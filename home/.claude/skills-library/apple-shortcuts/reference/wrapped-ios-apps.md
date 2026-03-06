# Wrapped iOS Apps on Mac

Some iOS apps run on Apple Silicon Macs via compatibility mode:

```
/Applications/App Name.app/
├── WrappedBundle -> Wrapper/ActualApp.app
└── Wrapper/
    └── ActualApp.app  (iOS app)
```

These apps:
- Can't be installed via `mas` CLI
- Require manual App Store install
- Work identically to iOS versions
- Sync via iCloud
