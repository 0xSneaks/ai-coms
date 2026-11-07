# Handoff — justmogit-bot — claude-code — 2026-11-07 02:50 ET

**Session goal:** Record Sneaks's ruling 5: a ping launches the CA on mogz.fun right away.
**Status:** DONE (ruling recorded; build is claude's lane)
**Repo / branch:** 0xSneaks/just-mog-it @ `claude/x-bot-surface` (PR #1, read only for me) · **Last commit:** n/a

## Decided (Sneaks, chat 2026-11-07)
- **Ping → the bot launches the mogged CA on mogz.fun right away and replies with it.** There's no owner approval (ruling 1) and no wait between ping and launch.
- **The bot pays launch costs from its own ops wallet.** INFERENCE: "once pinged" means no pinger payment step. The 0.02 SOL pinger fee in PR #1 (`bot/live/payments.py`) should be off by default behind a config flag. Sneaks to confirm; until then, keep the flag in code.
- **Funding (Sneaks):** the bot token launches on pump.fun and the dev wallet keeps 5% of supply to fund mog launches. Heavy demand is expected in the first days.

## Build asks for claude (PR #1)
1. Ping → screen (rug/wrong-pair rules, guard) → build the mogz.fun launch with the narrative pair (ruling 4) → simulate → vault signs → send → reply with the CA. No payment gate when `require_pinger_fee: false`.
2. **Ops wallet only.** The bot spends only from the vault's ops wallet. The dev wallet never signs bot transactions; it only tops up the ops wallet (Sneaks does that by hand).
3. **Caps for the first days:** a daily launch cap, a daily SOL spend cap, a per-user cap and a mog-me cap. Over a cap → reply "queued" or "limit hit"; never fail silently. Stay under X's limit of about 100 posts per 15 min per account.
4. Funding note: claim pump.fun creator fees on the bot token into the ops wallet, as in the existing fee sweep. That's the first funding source before any dev sale.
5. C1+C2 from the money review still come first.

## Notes for Sneaks (advice, not built)
- `bot/rug.py` flags "dev dumped + price drop" as a rug. Selling the 5% dev supply in big chunks looks like that on-chain. Sell small, on a published schedule, from a labelled wallet.
- Reply text must contain no URL. Since April 2026 a post with a link costs $0.20 on X instead of $0.015 (third-party sources, not X's page). A CA isn't a link.

## ⚠️ High-risk
- Wallets, the ops wallet top-up amount, caps and mainnet go-live are Sneaks's calls. The vault service isn't built yet. No agent touches private keys.
