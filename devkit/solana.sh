#!/usr/bin/env bash
# Optional: Solana (Agave) CLI + Anchor via avm. Safe to re-run.
# Installs tools only; never creates or touches keypairs/wallets.
set -euo pipefail

if ! command -v solana >/dev/null 2>&1; then
  sh -c "$(curl -sSfL https://release.anza.xyz/stable/install)"
fi
export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"
grep -q 'solana/install/active_release' "$HOME/.bashrc" 2>/dev/null ||
  echo 'export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"' >> "$HOME/.bashrc"

if ! command -v avm >/dev/null 2>&1; then
  cargo install --git https://github.com/solana-foundation/anchor avm --force --locked
fi
avm install latest
avm use latest

solana --version
anchor --version
