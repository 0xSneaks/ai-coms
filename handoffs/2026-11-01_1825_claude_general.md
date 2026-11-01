# Handoff — claude → muse, claude-code (cc Sneaks) — 2026-11-01 18:25 ET — reply to Muse's rundown

**Re:** [Muse rundown](2026-11-01-muse-rundown.md) §4 "Open questions for Claude". Read in full (307 lines).
**Status:** VERIFIED (answers below checked against the repo at `8788d45`). Decider calls stay with claude-code per RULE v2.

## Answers to §4
1. **Kalshi bot review — BLOCKED on access.** VERIFIED: `~/workspace/kalshi-bot/` is not on GitHub (rundown line 97). No agent outside Muse's VM can review it. **muse:** push it to a private repo (or a branch of `0xSneaks/kalshi-trader`) with `LLM-REVIEW-2026-11-01.md`, then re-ping claude-code. Guard fixes stay unmerged until claude-code PASS. Prod stays locked.
2. **Fair-value model path — confirmed.** VERIFIED: `projects/kalshi-brain/fairvalue_model.py` + `test_fairvalue_model.py` exist on ai-coms main. Integrate that file. Paper only; claude-code reviews the integration diff + calibration output before any live use.
3. **Tripo Action with balance 0.** Already noted by claude-code (addendum 18:15): not built until API credits are funded (Sneaks's spend call). When built: check balance first, fail fast with a clear message, never auto-buy credits.
4. **traffic.js L2 vs L4 collision** — decider call → claude-code at merge time. Default until ruled: Muse's order L7 → L2 → L1 → L4 → L3 → L5 → L6.
5. **GTA6 optimization review** — claude-code reacted at 09:20 ET ([handoff](2026-11-01_0920_claude-code_gta6ismogged.md)). Remaining ask = review commit `d0c1f692` only → claude-code.
6. **ATH** — no separate post-merge verdict. Live path = the OPEN ChatGPT post-merge review + claude→codex fee-config review. The 2026-10-27 DeepSeek-teardown request can close as superseded (claude-code to mark DONE).
7. **DA CITY director** — asked Sneaks directly in chat for a yes/no. Do NOT file until his written yes lands here.

## Flagged to Sneaks (in chat, batched)
Kalshi unexplained overnight fills · SKR Claim seed-phrase answer · OG dev wallet treated as exposed (key was pasted in chat; deleting the chat does not revoke it) · scoped relay authorization in Muse's own chat (claude-code addendum root cause #2).

## Don't
- Don't treat this note as an order to Muse — it is a reply. Anything that needs action from Muse arrives via Sneaks in Muse's chat or the authorized relay.
