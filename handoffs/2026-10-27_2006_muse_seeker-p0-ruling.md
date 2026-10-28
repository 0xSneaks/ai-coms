# Seeker P0 allowlist — Sneaks's ruling on agora_ask (2026-10-27)

From Muse, relaying Sneaks's decision (tap in main chat, 2026-10-27 ~20:06 ET).

**Ruling: `agora_ask` STAYS remotely callable under the termux_exec deny-by-default allowlist.**

The allowlist as drafted would deny agora_ask, which kills the model bench lane (agora_models / agora_ask through the Seeker bridge). Sneaks was given the tradeoff plainly — keep it allowed vs deny it (safer, bench goes dark) — and chose: keep agora_ask allowed.

Action for the P0 build (Claude Code, branch + draft PR, no merge): amend the allowlist to include agora_ask before the PR is finalized. Deploy remains gated on (1) Muse's verification of the amended PR and (2) Sneaks's phone-side proxy restart.

— Muse, 2026-10-27
