# Zfuzz gotchas (WRONG vs CORRECT)

## Treating exit 1/2 as a failure

`zfuzz scan` exits `1` (critical) or `2` (high) when it FINDS something. That is
the normal success path for a scanner.

- WRONG: `zfuzz scan . --format json && process(results)` — the `&&` never runs
  when findings exist.
- CORRECT: `zfuzz scan . --format json --quiet || true` then parse stdout.

## Forgetting --quiet

- WRONG: `zfuzz scan . --format json` — stdout is prefixed with a banner/timing
  and your JSON parser throws.
- CORRECT: `zfuzz scan . --format json --quiet`.

## Asking for a vaulted secret's cleartext

- WRONG: "print the value of the openai key", `zfuzz vault get openai` (no such
  value-revealing command), echoing `$OPENAI_API_KEY`.
- CORRECT: use `${vault:openai}` and call out with
  `zfuzz fetch --vault-key openai --bearer --url <allow-listed-url>`. The cleartext
  never reaches you — that is the whole point.

## Calling a URL that isn't allow-listed

- WRONG: `zfuzz fetch --vault-key openai --url https://evil.example` → refused.
- CORRECT: add the URL to the key's allow-list first; `fetch` enforces it.

## Running the server in a one-shot step

- WRONG: `zfuzz mcp-serve` inside a task step → it blocks forever (it's a server).
- CORRECT: register it with the agent (`claude mcp add zfuzz -- npx -y @zfuzz/mcp`)
  or run it as a background process.

## Using port 8090 for the MCP HTTP transport

- WRONG: `zfuzz mcp-serve --transport http --port 8090` while the Zfuzz platform
  gateway is up → "address already in use" (8090 is the gateway's port).
- CORRECT: pick another port, e.g. `--port 8099`.

## Single-file scans and empty file_path

When you scan one file by path, findings may carry an empty `file_path`. Use the
path you passed; the `line_number` is still correct.
