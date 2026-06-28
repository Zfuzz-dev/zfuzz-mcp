# @zfuzz/mcp — User Guide

Real security tools inside your AI agent: it scans code, dependencies, secrets, and MCP configs, threat-models, and explains findings — using **real scanners, not guesses**. Local, free, no account.

## 1. Requirements

- **Node.js ≥ 18.** That's it — the scanner binary is pulled per-platform via `@zfuzz/cli` (no Rust, no compiler).

## 2. Install — pick your agent

**Claude Code**
```bash
claude mcp add zfuzz -- npx -y @zfuzz/mcp
```

**Codex**
```bash
codex mcp add zfuzz npx -y @zfuzz/mcp
```

**Cursor** — `.cursor/mcp.json`
```json
{ "mcpServers": { "zfuzz": { "command": "npx", "args": ["-y", "@zfuzz/mcp"] } } }
```

**Gemini CLI**
```bash
gemini mcp add zfuzz npx -y @zfuzz/mcp
```

**Claude Desktop** — `claude_desktop_config.json`
```json
{ "mcpServers": { "zfuzz": { "command": "npx", "args": ["-y", "@zfuzz/mcp"] } } }
```

**Web agents (AI Studio, v0, Lovable)** — paste the hosted URL `https://api.zfuzz.com/mcp`, or self-host:
```bash
npx -y @zfuzz/mcp --transport http --port 8099
# then point the client at http://localhost:8099/mcp
```
> Use port **8099**, not 8090 (8090 is the Zfuzz platform's own port).

## 3. The 10 tools your agent can call

`scan_code` · `scan_dependencies` · `scan_secrets` · `scan_mcp_config` · `scan_skill` · `reconcile_permissions` · `check_mitre` · `threat_model` · `explain_finding` · `search_security_procedures`

You never call these yourself — just ask naturally:
- *"Is this login endpoint safe?"* → `scan_code`
- *"Do my deps have known CVEs?"* → `scan_dependencies`
- *"Threat-model my API"* → `threat_model`
- *"Audit this MCP server config"* → `scan_mcp_config`
- *"Is this skill safe to install?"* → `scan_skill`
- *"Are my agents using more than they declared?"* → `reconcile_permissions`

## 4. Check it's connected

- In Claude Code, `/mcp` lists `zfuzz` and its 8 tools.
- Ask *"scan this file for vulnerabilities"* — the agent should call a tool, not answer from memory.

## 5. Troubleshooting

- **Tools don't show up** → restart the agent after adding it; confirm Node ≥ 18.
- **"address already in use" (HTTP)** → change `--port` (avoid 8090).
- **Binary errors** → `npm i -g @zfuzz/cli`, or set `ZFUZZ_BIN` to a local `zfuzz` build.

## 6. Remove

- Claude Code: `claude mcp remove zfuzz`
- Others: delete the `zfuzz` entry from the client's MCP config.

---

Part of the [Zfuzz](https://zfuzz.com) security platform. Apache-2.0.
