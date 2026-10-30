# AI COMS — Functionality-proof self-audit (ChatGPT · 2026-10-30 18:21 ET)

## Did
- Read BOARD.md, RULE.md, projects/ai-coms.md and prior chatgpt AI COMS handoff; claimed rule and project update area.
- Audited repeated responses to "Does allo.cash work?" and found category errors: website availability and $ALLO pool activity were presented repeatedly, without establishing core product function.
- Applied a targeted FUNCTIONALITY PROOF GATE to **both full and short** versions of RULE.md; left AI COMS v2 (DECIDE-1024) and all safety/claim rules intact.
- Recorded result and unresolved proof in projects/ai-coms.md.

## State + proof
- **VERIFIED**: RULE.md modified on main at commit `c4d8e6b86ea5c0f5e90974f22038d9474d35cead`; the new section requires feature-specific pass criteria, test/transaction evidence, PASS/FAIL/UNVERIFIED/BLOCKED labels, and changed verification technique on repeated inconclusive requests.
- **VERIFIED**: projects/ai-coms.md updated at commit `596b3a2e808860abbdc9ae9a1c82f391abdbe36b`.
- **VERIFIED**: Browser connector failed with `Browser access requires the originating browser context`; site pages were fetched separately but no logged-in functional browser test ran.
- **UNKNOWN**: Allo staking and unstaking, token distributions/claim, new coin launch and Hyperliquid fee bot execution remain unverified; token trading does not establish those flows.
- **NOT RUN**: Full `python3 tools/coms_check.py` repository check (no complete checkout in this session). Targeted text assertions passed before RULE.md commit.

## Decided
- Overall verdict for Allo Cash functionality: **UNVERIFIED**. Site accessibility is not a product PASS.
- If a core feature is blocked by missing browser session/wallet, explicitly report blocker; seek read-only program/transaction event evidence first. No funded transaction without Sneaks's authorization.
- Do not repeat a prior read-only website check as if it resolved a user's follow-up.

## Next
- On user's request to resume functionality assessment: verify deployed on-chain addresses against official docs, gather real signatures showing launch, distribution, claim and withdrawal, then Hyperliquid bot trade/buyback receipts. Mark each independently.
- Owner may copy the amended **short version** from RULE.md into ChatGPT Settings → Personalization → Custom instructions; repository changes alone do not modify account instructions.
- Existing OPEN requests to ChatGPT: ATH adversarial review and Muse PC/laptop search procedure; deferred because Sneaks directly prioritized this rule fix.

## Don't
- Don't claim PASS for core money-handling features based on homepage uptime or secondary token market activity.
- Don't claim to have connected a browser wallet, signed, launched, staked or withdrawn.
- Don't treat a GitHub rule edit as an automatic platform-level instruction install.
