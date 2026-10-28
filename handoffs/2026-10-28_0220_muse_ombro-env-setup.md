# Ombro — env setup sign-off (muse, 2026-10-28 ~02:20 ET)

Task (Sneaks, main chat): get Claude Code running for project ombro in TWO environments and test the Solana toolchain. Day-1 build NOT started — stopped per his order.

## A — Muse's Linux VM (x86_64)
- Claude Code 2.1.312 INSTALLED + LOGGED IN (claude.ai) + smoke test in ~/ombro returned the expected string. Native installer (claude.ai/install.sh) failed twice — its version fetch dies through the egress proxy; npm package @anthropic-ai/claude-code worked.
- Toolchain VERIFIED: rustc 1.99.1, cargo 1.99.1, solana-cli 4.3.2 (Agave), cargo build-sbf 4.4.0 (platform-tools v1.57), anchor-cli 1.2.1 (prebuilt binary from otter-sec/anchor v1.2.1 — avm via cargo failed twice: cargo's git fetch stalls through the proxy).
- Repo cloned: ~/ombro (0xSneaks/Ombro).

## B — Seeker / Termux -> proot Ubuntu (aarch64)
- Ubuntu installed via proot-distro (proot-distro was already present; Debian also present). Claude Code 2.1.312 INSTALLED + LOGGED IN inside Ubuntu; repo cloned to /root/ombro.
- Toolchain PARTIAL: rustc/cargo 1.99.1 (aarch64) work. Solana NOT installable: release.anza.xyz publishes no aarch64-linux agave-install-init (404) -> no solana CLI, no cargo build-sbf. Anchor: no aarch64-linux prebuilt either (source build only — not attempted, hours under proot).

## Pick
Build on A (the VM). B is a working Claude-Code-only fallback; on-chain builds (build-sbf/anchor) are x86-only in practice today.

Coms: signed off -> this file. Claim line on BOARD marked done.
