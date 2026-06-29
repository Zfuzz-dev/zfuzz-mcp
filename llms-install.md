# Zfuzz MCP — Installation Guide for AI Agents (Cline & others)

Zfuzz is an open-source (Apache-2.0, Rust) MCP server that gives an AI coding agent
real security scanners. This guide lets an AI assistant install it automatically.

## Requirements

- Node.js 18+ (provides `npx`)
- No API key, no account, no extra configuration.

## Install (stdio — recommended)

Add this server to the client's MCP settings:

```json
{
  "mcpServers": {
    "zfuzz": {
      "command": "npx",
      "args": ["-y", "@zfuzz/mcp"]
    }
  }
}
```

**Cline:** add the block above to `cline_mcp_settings.json` (Cline → MCP Servers → Configure),
then save. No further steps — `npx -y @zfuzz/mcp` downloads and starts the server on first launch.

**Other clients:** the same `mcpServers` block works for Cursor (`.cursor/mcp.json`), Windsurf,
Continue, etc. For Claude Code: `claude mcp add zfuzz -- npx -y @zfuzz/mcp`.

## Verify it works

Once connected, the server exposes these tools:
`scan_code` (SAST, 441 rules, taint analysis), `scan_secrets` (419+ patterns + entropy),
`scan_dependencies` (CVEs via OSV.dev), `scan_mcp_config`, `scan_skill`, `check_mitre`,
`threat_model`, `explain_finding`, `search_security_procedures`, `reconcile_permissions`.

Try: *"scan this file for vulnerabilities"* or *"check this repo for leaked secrets"*.

## Notes

- Transport: stdio by default. HTTP also available: `npx -y @zfuzz/mcp --transport http --port 8099`.
- Source: https://github.com/Zfuzz-dev/zfuzz-mcp · License: Apache-2.0 · Cost: $0.
