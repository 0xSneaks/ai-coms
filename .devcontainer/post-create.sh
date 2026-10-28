#!/usr/bin/env bash
# Runs once when the codespace is created. Never writes secrets: keys come
# from Codespaces secrets (github.com/settings/codespaces) as env vars.
set -euo pipefail

npm install -g @anthropic-ai/claude-code @openai/codex opencode-ai

mkdir -p "$HOME/work"
cat <<'MSG'

Sneaks devbox ready.
  claude      Claude Code   (first run: /login)
  codex       Codex CLI     (first run: sign in with ChatGPT)
  opencode    OpenCode
  gh repo clone 0xSneaks/<repo> ~/work/<repo>
  bash devkit/solana.sh          # Solana CLI + Anchor (~10 min, optional)
MSG
