# Security Policy

`@zfuzz/mcp` is a security tool, so we hold its own posture to a high bar. This
document explains how to report a vulnerability and what to expect in return.

## Reporting a vulnerability

**Do not open a public issue for security reports.**

Use either channel:

1. **GitHub private vulnerability reporting** (preferred) — on
   [`zfuzz-dev/zfuzz-mcp`](https://github.com/zfuzz-dev/zfuzz-mcp), go to the
   **Security** tab → **Report a vulnerability**. This opens a private advisory
   visible only to you and the maintainers.
2. **Email** — `security@zfuzz.dev`. Encrypt with our PGP key if your report is
   sensitive (key fingerprint published on the Security tab).

Please include, where possible:

- the package version (`npm ls @zfuzz/mcp` / `@zfuzz/cli`) and OS/arch;
- the AI client and transport (stdio or `--transport http`);
- a minimal reproduction (a config snippet, a crafted input, or a failing scan);
- the impact you believe it has, and any suggested fix.

## Our commitment

| Stage | Target |
|---|---|
| Acknowledge your report | within **48 hours** |
| Initial assessment + severity | within **5 business days** |
| Fix or mitigation plan | depends on severity; we keep you updated |
| Public disclosure | coordinated, after a fix ships — credit given unless you opt out |

We follow **coordinated disclosure**. We ask for a reasonable window to release a
fix before public details; we will not pursue good-faith research (see safe harbor).

## Scope

In scope — issues in this package and its execution path:

- the MCP server wrapper (`bin/`) and how it resolves/launches the `@zfuzz/cli`
  binary (binary-resolution hijack, `ZFUZZ_BIN` abuse, PATH injection);
- the HTTP transport (`--transport http`): unauthenticated exposure, SSRF, request
  handling, port binding;
- **scanner correctness as a security property**: a crafted input that causes a
  *false negative* (a real vulnerability the scanner fails to surface) or a
  resource-exhaustion / crash (e.g. an MCP config that OOMs or hangs the scan);
- supply-chain integrity of what we publish (tampered binary, unpinned transitive
  dependency, install-time code execution).

Out of scope:

- vulnerabilities in **third-party MCP servers** you scan (report those to their
  authors — finding them is what this tool is *for*);
- issues that require a already-compromised host (root, keylogger, malicious OS);
- missing detections for attack classes we explicitly do not claim to cover
  (see the README "what's under the hood" table) — these are **feature requests**,
  not vulnerabilities, unless we advertised the coverage;
- social-engineering, physical access, or DoS via unrealistic input volume.

## Design properties that reduce attack surface

- **100% local, no network, no API key.** The scanner does not phone home; your
  code never leaves your machine. There is no cloud account to compromise.
- **No AI/LLM inside the scanner.** Detection is deterministic Rust — no prompt to
  inject, no model to jailbreak in the scan path itself.
- **Least privilege.** The server reads files and config; it does not need, and
  should not be granted, elevated privileges.

## Supported versions

We support the latest published minor of `@zfuzz/mcp`. Security fixes land on the
latest release line; older lines are upgraded, not back-patched, unless a fix is
trivial and the line is widely deployed.

| Version | Supported |
|---|---|
| `0.2.x` | ✅ |
| `< 0.2` | ❌ (please upgrade) |

## Safe harbor

We consider good-faith security research to be authorized conduct. We will not
initiate legal action for research that respects this policy: no privacy
violations, no data destruction, no degradation of others' services, and reports
made privately through the channels above. If in doubt, ask first at
`security@zfuzz.dev`.

---

Part of the [Zfuzz](https://zfuzz.dev) security platform. Apache-2.0.
