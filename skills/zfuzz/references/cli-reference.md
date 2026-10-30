# Zfuzz CLI reference

All commands run locally via the `zfuzz` binary (`npx @zfuzz/cli` or a global
install). Machine consumers should pass `--format json --quiet`.

## scan / scan-all / agent-scan — finding output

`zfuzz scan [PATH] --format json --quiet` prints a JSON **array** of findings:

```json
[
  {
    "title": "Unchecked Process Spawning",
    "description": "…\n\nLocation: `:3`\n\nCode snippet:\n```\n…\n```",
    "severity": "Critical|High|Medium|Low|Info",
    "confidence": "High|Medium|Low",
    "category": "Sast|Sca|Secret|Iac|Container|...",
    "file_path": "src/auth.py",
    "line_number": 42,
    "package_name": null,
    "cwe_ids": [78],
    "cve_ids": [],
    "cvss_score": null,
    "fix_available": false
  }
]
```

- `file_path` may be empty when a single file is scanned by absolute path —
  use the path you passed in that case.
- Exit codes: `0` clean, `1` critical present, `2` high present. Treat as a
  signal; append `|| true` in pipelines and read the JSON.

Flags: `--format table|json|sarif`, `--quiet`, `--upload`, `--api-key`
(only with `--upload`). `scan-all` adds `--ci` (exit 1 on critical/high).
`agent-scan` adds `--path <file>` and `--ci`.

## gate — CI quality gate

```bash
zfuzz gate --fail-on high --max-findings 0
```
`--fail-on critical|high|medium|low` (default critical), `--max-findings <N>`
(default 0). Exit 1 when findings exceed the threshold.

## threat-model

```bash
zfuzz threat-model [PATH] --framework stride|mitre --format json --quiet
```
Same deterministic engine as the MCP `threat_model` tool. `--format table|json`.

## sbom

```bash
zfuzz sbom --format cyclonedx|spdx -o sbom.json
```

## fix

```bash
zfuzz fix --auto            # applies fixes, creates git commits
zfuzz fix --critical-only   # only critical+high
```

## Sealed Vault — vault & fetch

```bash
zfuzz vault init            # creates master key in the OS keychain
zfuzz vault set <key>       # cleartext from --value or hidden stdin
zfuzz vault list            # KEYS only (never values)
zfuzz vault get-ref <key>   # prints ${vault:<key>}
zfuzz vault rotate <key>    # rotate in place
zfuzz vault delete <key>
zfuzz vault export-env      # import a .env (each KEY → sealed entry, empty allow-list)
```

```bash
zfuzz fetch --vault-key <key> --url <url> \
  [--method GET] [--bearer] [--header "X-API-Key: ${vault:<key>}"] \
  [--body-stdin] [--vault-token <one-shot-token>]
```
- `--url` MUST be in the key's allow-list or the call is refused.
- Response body is redacted for secret patterns by default (`--no-redact-output`
  to disable, debug only).
- The cleartext is injected at send time and **never** returned to the caller.

## mcp-serve (background service only)

```bash
zfuzz mcp-serve                                   # stdio (default)
zfuzz mcp-serve --transport http --port 8099      # HTTP (avoid 8090: gateway port)
```
