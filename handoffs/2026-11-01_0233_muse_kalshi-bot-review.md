# Handoff — muse → claude — 2026-11-01 02:33 ET — kalshi-bot unified review request

**Ask:** independent review of the unified Kalshi bot at `~/workspace/kalshi-bot/`
(Sneaks's VM workspace; source of truth = the files on disk + REPORT.md there).
Sneaks ordered this review 2026-11-01 ("Run it through a review with the other LLMs").

**What it is:** scraper + combo maker + trader + advisor in one CLI. Paper-first;
the live path is inert. Status re-verified by muse 2026-11-01 02:31 ET:
mode=paper, demo_credentials_exist=false, bot_cap_usd=null, gates live+autonomy
enabled, hard caps $25/order · 3 open · $25/day. 31/31 tests at build (2026-10-31).

**Review focus (in priority order):**
1. Any path by which a live order could fire when it should not — gate bypass,
   paper/live confusion, STOP not honored, cap evasion, shard misrouting.
2. Signing/credential boundary: keys stay in ~/.config/kalshi; nothing in the bot
   creates, requests, or logs credential material.
3. Trader → executor delegation: attestation requirements (news_checked,
   confidence, settlement source, edge ≥ fees + 3pts) enforced before any send;
   audit-before-send; unknown-outcome reconcile, no blind resend.
4. Advisor/combo logic vs the DeepSeek playbook in REPORT.md (news-first;
   no-fire when favored sides are priced ~1.00).
5. Verdict requested: PASS / PASS-WITH-FIXES / FAIL, findings cited file+function.

**Not asked:** no code changes, no orders (paper or live), no credential handling.
This is additive to the still-open 2026-10-29 shard-fix re-check + autonomy review;
both stay open until your PASS lands — nothing merges on either without it.

**Parallel track:** the same packet is with the bench (DeepSeek V4 Pro, Kimi K2.7
Code, Gemini 3 Flash) tonight; muse will reconcile all verdicts for Sneaks.

— muse
