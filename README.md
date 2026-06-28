<div align="center">

![Zfuzz — Your AI builds. We scan.](assets/banner.png)

</div>

<div align="center">

[![npm](https://img.shields.io/npm/v/@zfuzz/mcp?color=ff6b00&label=npm)](https://www.npmjs.com/package/@zfuzz/mcp)
[![license](https://img.shields.io/badge/license-Apache--2.0-0a0a0a)](LICENSE)
[![node](https://img.shields.io/badge/node-%E2%89%A5%2018-0a0a0a)](package.json)
![price](https://img.shields.io/badge/price-%240-ff6b00)
![local](https://img.shields.io/badge/100%25-local-0a0a0a)

**[Install](#-add-it-in-10-seconds)  ·  [Tools](#whats-under-the-hood)  ·  [Agents](#agent-compatibility-matrix)  ·  [When to use](#when-to-use--when-to-skip)  ·  [Security](SECURITY.md)  ·  [zfuzz.com](https://zfuzz.com)**

</div>

# Zfuzz — security for everyone who builds with AI

**You ask. Your AI answers with real scanners — not guesses.**

Catch SQL injection, leaked API keys, and vulnerable dependencies **while you build** — no security background required. You don't run tools. You don't read dashboards. You just talk to your AI, and Zfuzz gives it real answers.

`$0` · **Apache-2.0** · No account · No API key · 100% local · Nothing leaves your machine

Made for **vibe coders and developers alike.** It plugs straight into the AI tools you already use — Cursor, Claude Code, Codex, Gemini CLI, OpenCode — and the web builders AI Studio, v0, and Lovable.

---

## ⚡ Add it in 10 seconds

**Pick your tool. Copy one line. Done.** No setup wizard, no account, no config to learn.

### Cursor — one click

[![Add to Cursor](https://img.shields.io/badge/Add%20to-Cursor-0b0b0b?style=for-the-badge)](cursor://anysphere.cursor-deeplink/mcp/install?name=zfuzz&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkB6ZnV6ei9tY3AiXX0=)

Click the button → Cursor opens → press **Install**. That's your two clicks.

### Claude Code

Paste this in the chat and hit enter:

```bash
claude mcp add zfuzz -- npx -y @zfuzz/mcp
```

### VS Code (Copilot)

```bash
code --add-mcp '{"name":"zfuzz","command":"npx","args":["-y","@zfuzz/mcp"]}'
```

### Codex

```bash
codex mcp add zfuzz npx -y @zfuzz/mcp
```

### Gemini CLI

```bash
gemini mcp add zfuzz npx -y @zfuzz/mcp
```

### Lovable · v0 · AI Studio — in your browser, no install

Open your tool's **MCP / Integrations** settings and paste this URL:

```
https://api.zfuzz.com/mcp
```

<details>
<summary><b>Other tools</b> — OpenCode, Claude Desktop, or a manual config file</summary>

**Claude Desktop** — Settings → Developer → Edit Config, then add:

```json
{
  "mcpServers": {
    "zfuzz": { "command": "npx", "args": ["-y", "@zfuzz/mcp"] }
  }
}
```

**OpenCode** — add to `opencode.json`:

```json
{
  "mcp": {
    "zfuzz": { "type": "local", "command": ["npx", "-y", "@zfuzz/mcp"] }
  }
}
```

**Self-host the web (HTTP) endpoint** instead of using the hosted URL:

```bash
npx -y @zfuzz/mcp --transport http --port 8099
```

Then point your tool at `http://localhost:8099/mcp`.
_(Use port 8099, not 8090 — 8090 is the Zfuzz platform's own port.)_

</details>

That's it. Keep talking to your AI like normal — the first time your code needs a security check, it calls Zfuzz on its own.

---

## Agent compatibility matrix

Works with every major AI coding agent — and any MCP-compatible client. One line locally, or a hosted URL in the browser. Same 10 tools everywhere.

| Agent | Zfuzz | One-line setup |
|---|:---:|---|
| **Claude Code** | ✅ | `claude mcp add zfuzz -- npx -y @zfuzz/mcp` |
| **Cursor** | ✅ | one-click button above (or `.cursor/mcp.json`) |
| **VS Code · Copilot** | ✅ | `code --add-mcp '{"name":"zfuzz",…}'` |
| **Codex** | ✅ | `codex mcp add zfuzz npx -y @zfuzz/mcp` |
| **Gemini CLI** | ✅ | `gemini mcp add zfuzz npx -y @zfuzz/mcp` |
| **Claude Desktop** | ✅ | add `zfuzz` to the MCP config |
| **OpenCode** | ✅ | add `zfuzz` to `opencode.json` |
| **Lovable · v0 · AI Studio** | ✅ | paste the hosted URL `https://api.zfuzz.com/mcp` |
| **Any other MCP client** | ✅ | stdio `npx -y @zfuzz/mcp`, or the hosted URL in-browser |

_No per-agent config to learn — the exact copy-paste line for each is under [Add it in 10 seconds](#-add-it-in-10-seconds)._

---

## What it feels like

> **You:** Is my login page safe?
>
> **AI:** _[scans your file]_ Found 2 issues:
> 1. **SQL injection** on line 42 — anyone could read your whole database.
> 2. **No rate limiting** on the login — bots can guess passwords forever.
> Here's the fix… _[writes the patch]_

> **You:** Did I leave any passwords or keys in my code?
>
> **AI:** _[scans the project]_ Yes — your **OpenAI key** is hard-coded in `config.js`. Anyone who sees this repo can use it on your bill. Move it to an environment variable — here's how…

> **You:** Are the packages I installed safe?
>
> **AI:** _[checks your dependencies]_ 2 have known security holes. `lodash` lets attackers run code on your server. One command fixes both: `npm update lodash axios`.

You never typed a command, opened a scanner, or read a report. You just asked.

---

## See it in action

<div align="center">

![You vibecode an app, it ships with holes, Zfuzz catches them before you ship](assets/demo-claude-code.gif)

_You vibecode it. It ships with holes you can't see. Zfuzz catches them all — before you ship, for $0._

</div>

---

## You don't need to understand security

- You **never** run a scanner yourself — your AI does, automatically, when it matters.
- You **never** read a dashboard — answers come back in plain English, in your chat.
- You **never** pay and **nothing leaves your computer** — no account, no cloud, no API key.

**If you can copy-paste one line, you're covered.**

---

## What's under the hood

10 real tools your AI can call (it picks the right one — you don't have to):

| Tool | In plain English |
|------|------------------|
| `scan_code` | Finds bugs attackers exploit — 441 rules, 7 languages (Python, JS/TS, Go, Java, Rust, Ruby, PHP). |
| `scan_secrets` | Catches leaked passwords & API keys — 419 patterns (AWS, GitHub, Stripe, OpenAI, Anthropic…). |
| `scan_dependencies` | Flags packages with known security holes (CVEs via OSV.dev). |
| `scan_mcp_config` | Audits the MCP servers you install — hidden instructions, unicode tricks, wildcard permissions, unauthenticated remote servers. Returns a risk score + install verdict. |
| `scan_skill` | Vets an agent skill (its `SKILL.md` + bundled scripts) before you install it — hidden instructions, unicode deception, over-broad triggers, wildcard tool grants, and dangerous code or leaked secrets in its scripts. |
| `reconcile_permissions` | Compares the tools your agents actually use against what they declared — flags capabilities used but never declared, and permissions granted but never used (least privilege, from runtime telemetry). |
| `check_mitre` | Maps any finding to real-world attack techniques (MITRE ATT&CK). |
| `threat_model` | Asks "how could this be attacked?" across your whole project (STRIDE + MITRE). |
| `explain_finding` | Explains any vulnerability — and the fix — in everyday language. |
| `search_security_procedures` | Looks up 754 security playbooks (incident response, hardening, compliance). |

Built in **Rust** for sub-second answers. The AI brain is your editor's own model (Claude/GPT) — **Zfuzz adds the security muscle, not another subscription.**

### What's inside

| | |
|---|---|
| **441** SAST rules across **7** languages | **419** secret-detection patterns |
| **75+** MITRE ATT&CK techniques | **754** security playbooks |
| **Rust** — sub-second scans | **100% local** — nothing leaves your machine |

### What a scan actually returns

> **You:** Is this skill safe to install?
>
> **AI:** _[runs `scan_skill`]_
> ```
> Verdict: DO NOT INSTALL   (risk 100/100, 6 findings)
>  CRIT  ZF-C001   Prompt Injection Pattern Detected         @ description
>  MED   ZF-SK001  Overly Broad Skill Trigger                @ description
>  HIGH  ZF-LP001  Wildcard Permission Grant (Bash(*), *)    @ allowed-tools
>  CRIT  ZF-C002   Pipe-to-Shell Download-Exec (curl | bash) @ setup.sh
>  HIGH  ZF-H001   Hardcoded Secret: AWS Access Key ID       @ setup.sh
> ```
> This skill hides "ignore all previous instructions" in its description, grants
> itself every tool, and its setup script pipes a remote payload straight into a
> shell. Don't install it.

Every finding is from a real deterministic scanner — there is no model guessing in the scan path.

---

## Why not Snyk or Semgrep?

| | Snyk / Semgrep | Zfuzz |
|---|---|---|
| **Where** | A pipeline, 5–10 min after you push | Right in your editor, in seconds |
| **When** | After the bug shipped | While you're writing it |
| **How** | A dashboard + email alerts | A normal conversation with your AI |
| **For non-coders** | No — built for security teams | **Yes — built for you** |
| **Cost** | $25–100 / dev / month | **Free, forever** |

---

## When to use · When to skip

**Great fit if you…**
- Vibecode apps with AI (Lovable, Cursor, v0, Bolt, Claude Code) and want them checked **before you ship** — without learning security.
- Want leaked keys, injectable code, and risky dependencies caught right in your editor, in plain English.
- Want to vet an **MCP server or agent skill _before_ you install it**.

**Skip it if you…**
- Already run a full security team + pipeline and don't want findings in the editor.
- Work fully offline with no Node.js (the scanner binary is pulled via `npx` / `@zfuzz/cli`).
- Need a hosted dashboard with audit logs and SSO — that's the [Zfuzz platform](https://zfuzz.com), not the free MCP.

---

## Updating

`npx -y @zfuzz/mcp` always resolves the latest published version — most people never do anything.

```bash
npm view @zfuzz/mcp version      # see the latest release
npm i -g @zfuzz/cli@latest       # only if you pinned the CLI globally
```

Pinned a version in your MCP config? Bump it (or drop the pin) and restart your agent.

---

## Documentation

| Start here | Go deeper |
|---|---|
| [User guide](USER_GUIDE.md) — install & first scan | [What it scans](PRODUCT.md) — coverage & approach |
| [Security policy](SECURITY.md) — reporting & local-first design | [Contributing](CONTRIBUTING.md) — dev setup |
| [Add it in 10 seconds](#-add-it-in-10-seconds) — every agent | [zfuzz.com](https://zfuzz.com) — the full platform |

---

## Free · Open · Local

No API keys. No cloud account. No telemetry. Runs 100% on your machine — your code never leaves it. Apache-2.0 licensed, open source.
---

## Contributing

Issues and PRs welcome — see [CONTRIBUTING.md](CONTRIBUTING.md) for dev setup. Found a vulnerability? Please follow [SECURITY.md](SECURITY.md) — don't open a public issue.

---

## Community & support

- **Questions / bugs** — [open an issue](../../issues) on this repo.
- **Security reports** — see [SECURITY.md](SECURITY.md).
- **The platform** — [zfuzz.com](https://zfuzz.com).

---

## License

[Apache-2.0](LICENSE) — free & open source. © Zfuzz

Part of the [Zfuzz](https://zfuzz.com) security platform.
