---
name: zfuzz
description: "Deterministic security scanning for code, dependencies, secrets, and MCP configs, plus STRIDE/MITRE threat modeling, SBOM generation, and a Sealed Vault that keeps secret cleartext away from the agent. Use when asked to scan code for vulnerabilities, check dependencies for CVEs, find hardcoded secrets/API keys, audit an MCP server or AI-agent config for prompt-injection / tool-poisoning, threat-model a codebase, generate an SBOM (CycloneDX/SPDX), gate CI on findings, or store secrets so the agent only ever sees opaque ${vault:KEY} references. Free, open source (Apache-2.0), Rust-native, sub-second, runs 100% locally — no API key, no cloud, no telemetry."
license: Apache-2.0
metadata:
  version: 0.1.0
  homepage: https://zfuzz.com
---

# Zfuzz

Deterministic, local security tooling for AI coding agents. Real Rust scanners —
not generic LLM guesses. Every finding is reproducible and machine-parseable.

## When to use

- "Is this code/file/repo safe?" → `zfuzz scan`
- "Do my dependencies have known CVEs?" → `zfuzz scan` (SCA is included)
- "Are there hardcoded secrets / leaked API keys?" → `zfuzz scan` (secrets included)
- "Audit this MCP server / AI-agent config" → `zfuzz agent-scan`
- "Threat-model this code" (STRIDE or MITRE) → `zfuzz threat-model`
- "Generate an SBOM" → `zfuzz sbom`
- "Fail CI if there are findings" → `zfuzz gate`
- "Store/use a secret without exposing it to the agent" → `zfuzz vault` + `zfuzz fetch`

## When NOT to use

- Formatting/linting style issues — that's a linter's job, not Zfuzz.
- Anything beyond static scanning, agent-config audit, threat-modeling, SBOM, gate, and the vault — out of scope here.
- Anything requiring cleartext of a vaulted secret — by design you cannot get it.

## Prerequisites

No Rust toolchain needed. The binary is fetched per-platform via npm:

```bash
npx @zfuzz/cli scan .            # one-off, zero install
# or install once:
npm install -g @zfuzz/cli        # provides `zfuzz` and `zfuzz-mcp`
```

MCP server (so the agent can call tools directly):

```bash
claude mcp add zfuzz -- npx -y @zfuzz/mcp
```

## Agent rules (read before running)

1. **Always machine-parse with** `--format json --quiet`. The `--quiet` flag strips
   the banner/timing so stdout is clean JSON. (`scan`, `scan-all`, `agent-scan`
   support `table|json|sarif`; `threat-model` supports `table|json`.)
2. **Exit codes are SIGNALS, not errors.** `zfuzz scan` exits `0` = clean,
   `1` = critical present, `2` = high present. In shell pipelines append `|| true`
   so a finding does not abort the script; read the JSON, not the exit code.
3. **For CI gating, use `zfuzz gate`** — `--fail-on <critical|high|medium|low>`
   and `--max-findings <N>` (exit 1 when exceeded). Don't hand-roll thresholds.
4. **Never run servers/watchers in a one-shot step.** `zfuzz mcp-serve` and
   `zfuzz monitor` block forever — only launch them as background services.
5. **Sealed Vault: you must NEVER ask for, print, log, or echo a secret's cleartext.**
   Refer to secrets only as `${vault:KEY}`. To make an authenticated outbound call,
   use `zfuzz fetch --vault-key KEY --url ...` (the cleartext is injected at send
   time and never returned to you) or the MCP `vault_resolve_for_url` capability
   token. `zfuzz vault list` shows KEYS only, never values.

## Commands

| Command | Purpose | Key flags |
|---|---|---|
| `zfuzz scan [PATH]` | SAST + SCA + Secrets on code | `--format table\|json\|sarif`, `--quiet` |
| `zfuzz scan-all [PATH]` | scan + IaC + agent/MCP configs | `--format …`, `--ci` |
| `zfuzz agent-scan` | audit AI-agent / MCP server configs | `--path`, `--format …`, `--ci` |
| `zfuzz gate` | CI quality gate (exit 1 on threshold) | `--fail-on <sev>`, `--max-findings <N>` |
| `zfuzz fix` | auto-fix findings | `--auto`, `--critical-only` |
| `zfuzz threat-model [PATH]` | STRIDE/MITRE model | `--framework stride\|mitre`, `--format`, `--quiet` |
| `zfuzz sbom` | Software Bill of Materials | `--format cyclonedx\|spdx`, `-o <file>` |
| `zfuzz vault <sub>` | Sealed Vault (init/set/list/get-ref/delete/rotate/export-env) | — |
| `zfuzz fetch` | outbound HTTP injecting a vaulted secret | `--vault-key`, `--url`, `--bearer`, `--header` |
| `zfuzz mcp-serve` | MCP server (stdio/http) — background only | `--transport`, `--port` |

Full flags + JSON shape: see `references/cli-reference.md`.

## MCP tools (10)

When the `@zfuzz/mcp` server is connected, prefer these over shelling out:
`scan_code`, `scan_secrets`, `scan_dependencies`, `scan_mcp_config`, `scan_skill`,
`reconcile_permissions`, `check_mitre`, `threat_model`, `explain_finding`,
`search_security_procedures`.

## Sealed Vault — the secret never reaches you

```bash
zfuzz vault init                                   # master key in OS keychain
zfuzz vault set openai                             # cleartext via hidden stdin
zfuzz vault get-ref openai                         # -> ${vault:openai}
# allow-list the URLs this key may be sent to, then call out WITHOUT seeing cleartext:
zfuzz fetch --vault-key openai --bearer --url https://api.openai.com/v1/models
```
You handle only `${vault:openai}`. The cleartext is resolved at send time and
never returns to the agent. This is why Sealed Vault survives prompt injection.

## Common workflows

```bash
# Pre-edit safety check on one file (clean JSON)
zfuzz scan src/auth.py --format json --quiet || true

# CI gate: fail the build on any high+ finding
zfuzz gate --fail-on high

# Audit MCP configs before trusting a server
zfuzz agent-scan --format json --quiet || true
```

See `references/gotchas.md` (WRONG vs CORRECT) and `references/patterns.md`
(CI, pre-commit, vault recipes).
