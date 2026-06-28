# Contributing to `@zfuzz/mcp`

Thanks for helping make security scanning accessible to everyone who builds with
AI. This guide covers how the package is wired and how to land a change.

## How this package fits together

`@zfuzz/mcp` is a **thin wrapper**. It does not contain the scanner:

```
@zfuzz/mcp  (this repo, Node ≥18)
   └─ bin/run.js        → MCP server entry point
        └─ @zfuzz/cli    → resolves a per-platform prebuilt Rust binary
             └─ zfuzz / zfuzz-agent-scan   ← the actual detection engine (Rust)
```

That means:

- **Bugs in the wrapper, transport, install, or tool plumbing** → fix them here.
- **Detection rules / new scan capabilities** (new SAST rule, secret pattern, MCP
  config check) → these live in the Rust engine behind `@zfuzz/cli`, not here.
  Open an issue describing the detection you want and we'll route it.

## Prerequisites

- **Node.js ≥ 18** (matches `engines` in `package.json`).
- No Rust toolchain needed — the binary is pulled per-platform via `@zfuzz/cli`.
- For local testing against an unreleased engine, set `ZFUZZ_BIN=/path/to/zfuzz`.

## Local setup

```bash
git clone https://github.com/zfuzz-dev/zfuzz-mcp
cd zfuzz-mcp
npm install
# stdio transport (what agents use):
node bin/run.js
# HTTP transport (avoid port 8090 — that's the platform's own port):
node bin/run.js --transport http --port 8099
```

Verify it speaks MCP: add it to a client (`claude mcp add zfuzz -- node ./bin/run.js`)
and confirm `/mcp` lists the 8 tools, or send a `tools/list` over the chosen transport.

## Making a change

1. **Open an issue first** for anything beyond a typo — it saves you rework.
2. Branch from `main`. Keep the change **surgical**: touch only what the change
   requires, match the surrounding style.
3. **No new runtime dependency** without discussion — this wrapper stays minimal.
4. Test the path you touched (see below). State clearly what you verified.
5. Open a PR with a clear description: what, why, and how you tested it.

## Testing

- Wrapper/transport changes: exercise both stdio and HTTP, and at least one real
  tool call (e.g. `scan_secrets` on a file with a fake key).
- Keep tests deterministic and offline — no network, no API key. That's a product
  invariant, not just a test convenience.

## Coding standards

- Plain, dependency-light JavaScript. Prefer clarity over cleverness.
- Don't fabricate output. If a value is unavailable, surface an honest empty/error
  state — never a placeholder that simulates a result.
- Errors returned over MCP must set `isError` and a human-readable message.

## Commit & PR hygiene

- One logical change per PR. Small PRs review faster.
- Sign off your commits (`git commit -s`) — by doing so you certify the
  [Developer Certificate of Origin](https://developercertificate.org/).
- By contributing, you agree your contribution is licensed under **Apache-2.0**,
  the license of this project.

## Reporting security issues

Do **not** use issues or PRs for vulnerabilities — see [SECURITY.md](SECURITY.md).

---

Part of the [Zfuzz](https://zfuzz.com) security platform. Apache-2.0.
