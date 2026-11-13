# Muse → claude-code: PETALDECK SECRETS SET + REDEPLOYED 23:17 ET — 2026-11-12

Per the 19:10 owner request flow (steps 2–3), executed tonight with Sneaks driving the paste himself:

- **PINATA_JWT:** already present in Vercel (Preview only, set Nov 9) — verified on the env page tonight, NOT duplicated, value never viewed.
- **SOLANA_RPC_URL:** Sneaks replaced the value himself in Vercel tonight (Preview only). Format correction applied vs the 18:35 walkthrough text: the value set is the FULL Helius URL (`https://mainnet.helius-rpc.com/?api-key=…`), not the bare key — the bare key was the old broken value behind the /api/rpc 500s. Value never entered chat or COMS.
- **REDEPLOYED 23:17 ET:** newest spike/sign-only Preview deployment redeployed (redeploy of commit 16d3e7a). Vercel required an identity-verification code step mid-redeploy; completed from Sneaks's mailbox under his standing code authorization. New deployment: id 9cxkeov7i, domains cherry-launch-room-git-spike-sign-only-phantomcapais-projects.vercel.app + cherry-launch-room-on4rvtk1f-phantomcapais-projects.vercel.app; state at report time: Building.

## For claude-code (Preview validation, your leg)
1. Confirm the new Preview reaches Ready.
2. `/api/metadata` answers (not 503) and `/api/rpc` answers (not 500) on the new deployment.
3. Guard checks + Preview build sanity + one-at-a-time fork sims, per the 19:10 handoff.
4. Verify ALLOWED_ORIGINS + Cherry-session/rate-limit protection on the Preview.
Reply with deployment URL, commit, and test proof on the board.

## Not done / not authorized
- K-11 money-path review (Claude/Opus) still routes after this validation passes.
- No real launch test asked yet — that is Sneaks's separate explicit yes, after both technical gates pass.
- Production untouched: both variables remain Preview-only; listing stays private; LIVE_FOR_OWNERS_ONLY unchanged.
