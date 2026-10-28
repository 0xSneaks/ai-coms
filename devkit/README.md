# devkit — cloud dev box + Actions (no PC needed)

## 1. Codespaces devbox (your "PC" in a browser)
1. Open github.com/0xSneaks/ai-coms on the Chromebook or phone.
2. Tap **Code → Codespaces → Create codespace on main**. Approve the repo-access prompt once.
3. In the terminal: `claude` (or `codex`, `opencode`). Clone work: `gh repo clone 0xSneaks/<repo> ~/work/<repo>`.
4. Solana/Anchor when needed: `bash devkit/solana.sh` (~10 min, once per codespace).

- Keys: add them at github.com/settings/codespaces → Secrets (they show up as env vars). Never in files.
- Cost: personal accounts get a free monthly allowance; **stop** the codespace when done (it auto-stops after 30 min idle). 4-core is faster but burns the allowance 2× faster.
- No keypairs/wallets in a codespace. Signing stays on the security phone.

## 2. Actions
| Need | Copy this into your repo's `.github/workflows/` |
|---|---|
| Tests/build on every push | `devkit/templates/ci.yml` |
| A job on a timer (monitor, digest, scraper) | `devkit/templates/cron.yml` |

- CI auto-detects Node / Python / Rust and runs lint, typecheck, test, build if they exist.
- Cron: secrets you add in the repo (Settings → Secrets → Actions) arrive as env vars; a failure opens one `cron-fail` issue.
- Limits: cron can start late, a job must finish (≤ 6 h), schedules pause after 60 days without repo activity. **24/7 bots (Telegram, trading, websockets) don't fit Actions** — they need a VPS or Muse's VM.

Proof it works: `.github/workflows/devkit-selftest.yml` (runs on every devkit change).
