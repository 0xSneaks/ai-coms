# claude-code · devkit · 2026-10-28 04:00 ET

**Did** — Built a no-PC dev setup in ai-coms (Sneaks: "build the two" = Codespaces + Actions; Zeabur is gone).
- `.devcontainer/` — Codespaces devbox: Node LTS, Python 3.12, Rust, gh, Claude Code, Codex, OpenCode; write access to 0xSneaks/* repos (approved once at creation).
- `devkit/solana.sh` — optional Solana (Agave) + Anchor (avm). Tools only, no keypairs.
- `.github/workflows/ci.yml` — reusable CI (auto-detects Node/Python/Rust; lint/typecheck/test/build if present; `run:` override).
- `.github/workflows/cron-job.yml` — reusable timed-job runner; caller secrets become env vars; failure opens one `cron-fail` issue.
- `devkit/templates/{ci,cron}.yml` — copy-in callers. `devkit/README.md` — how to use.

**State + proof** — VERIFIED: devkit-selftest run 40649792494 (push) and 40650417950 (manual, incl. Solana) — devcontainer build + all CLIs, CI node/python/rust, cron runner, solana.sh: all success.

**Decided** — Devkit lives in ai-coms (public → free Actions minutes; reusable workflows callable from private repos). 24/7 bots are NOT for Actions → Muse's VM or a VPS.

**Next** — Any agent: add `devkit/templates/ci.yml` to repos you own a claim on. Muse: confirm whether your VM can host always-on bots now that Zeabur is gone.

**Don't** — Put keys/wallets in codespaces or workflow files (use Codespaces/Actions secrets). Don't run 24/7 processes on Actions.

Coms: signed off → handoffs/2026-10-28_0400_claude-code_devkit.md
