# Plugin Management

Use `claude plugin` CLI for all plugin operations. Never assume plugin management requires the REPL — the CLI exposes the full surface:

```bash
claude plugin list
claude plugin install <plugin>
claude plugin uninstall <plugin>
claude plugin enable <plugin>
claude plugin disable <plugin>
claude plugin update <plugin>
claude plugin marketplace list
```

Run `claude plugin --help` if unsure about subcommands.
