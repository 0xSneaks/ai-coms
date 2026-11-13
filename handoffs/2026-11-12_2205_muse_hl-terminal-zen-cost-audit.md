# Muse → Sneaks / ChatGPT: HL terminal — OpenCode Zen credit cost audit — 2026-11-12 22:05 ET

Read-only cost estimate per Sneaks's brief. $0 new spend; this audit made NO paid inference calls (the /models GET is free). No build started, no implementation claimed, no other agent's lane touched.

## Account facts (checked 2026-11-12 evening)
- Provider: BOTH exist on the account — OpenCode Go subscription (active to Nov 25, 2026, renewal cancelled) AND Zen pay-as-you-go. The API key's completions bill the Zen prepaid balance: a one-token probe at 21:56 ET (run under Sneaks's earlier "do we have open code" request, before this audit) returned billing_source: balance, cost $0.0000592. VERIFIED.
- Enabled models on the key: 47 (free GET /zen/v1/models), including deepseek-v4-pro, deepseek-v4.1-flash, gpt-6-luna, gpt-6.1-sol, glm-5.3, minimax-m3, kimi-k3, kimi-k2.7-code, qwen3.6-plus, gpt-5.3-codex, claude-opus-5-5 / sonnet-5-5 / haiku-5-5, plus several *-free models.
- Existing credits: $10 Zen credit recorded at setup (2026-11-10 era). CURRENT remaining balance: UNKNOWN — no read-only API route exposes it; panel sweeps and probes since setup drew it down by an unmeasured amount. Check: opencode.ai/console → workspace → Billing.
- Auto-recharge: UNKNOWN (same console Billing page). Workspace spending limits: UNKNOWN (same).

## Rates used (official Zen pay-as-you-go, https://opencode.ai/docs/zen, pulled 2026-11-12; cross-checked vs /console/models)
USD per 1M tokens, input / output / cached-read:
- deepseek-v4.1-flash $0.30 / $1.20 / $0.006 (a $0 free variant also exists)
- deepseek-v4-pro $1.74 / $3.48 / $0.145
- gpt-6-luna $0.10 / $0.50 / $0.01 (≤272K tier; cache-write $0.125)
- glm-5.3-flash $0.15 / $0.50 / $0.03 · minimax-m3 $0.30 / $1.20 / $0.06 · kimi-k2.7-code $0.95 / $4.00 / $0.19
- gpt-5.3-codex $1.75 / $14.00 (no cache rate in the pulled table — priced with zero cache discount, conservative)
- claude-opus-5-5 $4.00 / $20.00 / $0.20 · claude-sonnet-5-5 $2.00 / $10.00 (cache-read $0.10 docs vs $0.20 console — discrepancy noted, does not affect picks)
Go subscription rates were NOT mixed into any figure.

## Estimate (assumptions stated; formula: (in×rate + out×rate + cached×cache-rate) / 1M)
Assumptions: finished app ≈ 8–12k lines TS (Pass 1 = 12 files already drafted free); per-phase token envelopes below include repo-context re-reads, tool output, debug iterations and failed attempts; cached-read share of input 40% LOW / 55% EXPECTED / 35% HIGH; cache-write charges excluded (one-off, cents at these volumes); free DeepSeek app drafting charged $0 everywhere; Codex review and Claude final run on their existing access in Options A/B ($0 Zen, not double-counted) and are priced on Zen only in Option C.

| Phase | Model (Zen) | LOW | EXPECTED | HIGH |
|---|---|---|---|---|
| A import + setup | v4.1-flash | $0.04 | $0.09 | $0.22 |
| B Pass 1 defect fixes | v4-pro | $1.08 | $2.34 | $6.57 |
| C HL WS/REST integration | v4.1-flash | $0.75 | $1.56 | $3.98 |
| D PWA UI + notifications | v4.1-flash | $0.82 | $1.85 | $4.74 |
| E MOONBOYHL / WSB adapters | v4.1-flash | $0.35 | $0.81 | $2.01 |
| F tests + bug-fix loops | v4.1-flash | $0.60 | $1.43 | $3.82 |
| G Codex review (if on Zen) | gpt-5.3-codex | $3.50 | $8.05 | $18.20 |
| H Claude final (if on Zen) | claude-opus-5-5 | $2.84 | $6.29 | $15.68 |
| **Option C — Zen-primary total** | | **$9.99** | **$22.43** | **$55.21** |
| **Option B — Hybrid total** (Zen covers B, C in full; A 50%, E 50%, F 75%, D 25%; G/H $0 on existing access) | | **$2.68** | **$5.89** | **$15.71** |
| **Option A — Free-first total** | | **$0** | **$0** | **$0** |

Token envelopes behind the table (input/output, millions): A .10–.50/.02–.10 · B .60–3.50/.12–.70 · C 1.50–8.00/.40–2.00 · D 1.20–7.00/.50–2.80 · E .60–3.50/.20–1.10 · F 1.00–6.00/.35–2.20 · G .80–4.00/.15–.80 · H .50–2.50/.08–.45. A gpt-6-luna bulk variant of Option C prices ~15% lower (EXPECTED $19.00) — not recommended as primary: V4.1 Flash's cached reads are near-free on big repo contexts and it matches the drafting model's family; Luna is the fallback if Flash quality disappoints on mechanical work.

## Recommendation
- Best mix: DeepSeek free app keeps drafting (files, UI, tests) → Zen spends ONLY where a repo-context agent beats manual paste loops: Pass 1 defect fixes on deepseek-v4-pro (financial logic deserves the strong model), WS/REST integration + test/debug loops on deepseek-v4.1-flash → Codex review on Codex's own access → Claude final on Claude's own access.
- Reviews are 64% of the Zen-primary EXPECTED cost — putting them on Zen is the single most wasteful move available; they are already paid for elsewhere.
- Can existing credits cover the hybrid? UNKNOWN (balance unverified). Hybrid EXPECTED $5.89 ($7.36 with 25% contingency) fits inside the recorded $10 IF most of it remains — Sneaks checks the console balance before any authorization.
- Proposed spending ceiling (proposal only, NOT authorized): $20 — covers hybrid HIGH + 25% contingency ($19.64).
- Verdict: USE ZEN — hybrid only. Not USE FREE (pure manual paste loops will burn more owner hours on integration/debug than the ~$6 expected Zen spend is worth, and defect-fix quality on financial code matters), not WAIT (nothing about the estimate improves with time; rates and scope are known now).

## Next
Sneaks: (1) read the Zen balance + auto-recharge state at opencode.ai/console → Billing and report the balance; (2) if authorizing, name a specific cap. Muse starts no paid work before that.
