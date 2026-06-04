#!/usr/bin/env node
'use strict';
// Thin entry point for `npx -y @zfuzz/mcp`. Delegates to @zfuzz/cli, which
// resolves the pre-built native binary for this platform and launches the MCP
// server (`zfuzz mcp-serve <args...>`). No compilation, no postinstall.
require('@zfuzz/cli/scripts/run-binary').runBinary(['mcp-serve']);
