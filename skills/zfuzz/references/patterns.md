# Zfuzz patterns (recipes)

## Pre-edit / per-file safety check

```bash
zfuzz scan "$FILE" --format json --quiet || true
# parse stdout; surface only severity >= high to keep noise low
```

## CI quality gate (GitHub Actions, GitLab, any CI)

```bash
# Fail the pipeline on any high+ finding
zfuzz gate --fail-on high
```
Or, for full coverage incl. IaC + MCP configs:
```bash
zfuzz scan-all --ci          # exit 1 on critical/high
```

## Pre-commit hook

```bash
# .git/hooks/pre-commit (or via pre-commit framework)
zfuzz scan --format json --quiet > /tmp/zf.json || true
python3 -c "import json,sys; f=json.load(open('/tmp/zf.json')); \
  hi=[x for x in f if x['severity'] in ('Critical','High')]; \
  sys.exit(1 if hi else 0)"
```

## Audit an MCP server before trusting it

```bash
zfuzz agent-scan --format json --quiet || true   # prompt-injection, tool-poisoning, SSRF, path-traversal
```

## SBOM in CI

```bash
zfuzz sbom --format cyclonedx -o sbom.cdx.json
zfuzz sbom --format spdx -o sbom.spdx.json
```

## Sealed Vault bootstrap (agent never sees cleartext)

```bash
zfuzz vault init
zfuzz vault export-env            # import existing .env as sealed entries (empty allow-lists)
# then, per key, add allowed URLs, and call out:
zfuzz fetch --vault-key stripe --bearer --url https://api.stripe.com/v1/charges --method POST --body-stdin
```

## Threat model a service

```bash
zfuzz threat-model ./src --framework stride --format json --quiet
zfuzz threat-model ./src --framework mitre  --format json --quiet
```
