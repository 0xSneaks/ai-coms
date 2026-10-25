# COMS PWA

## Now
- VERIFIED: artwork completed on PR #5 / `34f2ab1`: bright first-person glass room, all nine roster bots with distinct animated personalities, foreground console with one input and three buttons.
- VERIFIED: Grok handoff [2026-10-24_2109_grok_coms-pwa-art.md](../handoffs/2026-10-24_2109_grok_coms-pwa-art.md).
- VERIFIED: reference SVG in 0xSneaks/the-boiler-room, public/boiler-bot-avatar.svg.
~~- UNKNOWN: existing COMS PWA source repo/branch; no matching repo found in connected GitHub search or ai-coms tree.~~ (Vercel project coms-pwa found 2026-10-24 23:12 ET)
~~- VERIFIED: Vercel team access returns 403; authorization link delivered in chat. Existing URL reaches Vercel login.~~ (access works 23:12 ET)
- INTENT: stage reusable visual/PWA files in apps/coms-pwa; integrate with existing source once located, preserving existing behavior.
- ⚠️ HIGH-RISK: production deployment requested explicitly by Sneaks in this session; team grant requires owner action.

## Next
- INTENT: authorize Vercel team access, inspect coms-pwa project linkage, finish source integration and verify install/actions before deployment.
- UNKNOWN: original three-button dispatch behavior; do not invent agent activity or claim dispatch succeeded.

## Technical shell sign-off — 2026-10-24 21:34 ET
- VERIFIED: [PR #5](https://github.com/0xSneaks/ai-coms/pull/5), branch `chatgpt/coms-pwa-shell-2026-10-24`, commit `0449e20c2c11508406478be0ab9392cc6e3a5f97`; all 22 remote file hashes match.
- VERIFIED: npm check 3/3 + syntax; browser crew/commands/motion/install-help; full coms_check 0 errors/warnings.
- VERIFIED: all 9 crew rendered from roster union. Commands are copyable drafts, not agent dispatch.
- INTENT: Astra owns next art pass after claiming. Latest direction: bright, cute, funny, silly, animated crew BEHIND GLASS, console on user's side; all idle/active models visible.
- UNKNOWN: original app integration, mobile install/HTTPS offline, final art and production READY. Vercel team API blocked (403); owner consent required.
- Handoff / Note for Astra: [2026-10-24_2134_chatgpt_coms-pwa.md](../handoffs/2026-10-24_2134_chatgpt_coms-pwa.md).

## Artwork sign-off — 2026-10-24 22:54 ET
- VERIFIED: [commit 34f2ab1](https://github.com/0xSneaks/ai-coms/commit/34f2ab1880916ae16fcf1f86afad4443333a8e21) on PR #5; all ten art/evidence files match remote hashes.
- VERIFIED: npm check 3/3 + syntax; Chromium six viewport QA, keyboard/commands, pause/reduced motion, localhost offline reload and future-agent fixture pass. Three screenshots and JSON report in apps/coms-pwa/docs/art-* on the PR branch.
- VERIFIED: artwork portion of Astra/Codex requests complete; claimed files released. Roster membership, accessibility and command-draft behavior preserved. No new dependencies or spending.
- UNKNOWN: original-app integration, physical installation/Safari and production HTTPS/READY remain separate; no deployment attempted here.
- Next: inspect intended Vercel source linkage after access is available, then integrate and run physical installation QA.
- Handoff: [2026-10-24_2254_codex_coms-pwa.md](../handoffs/2026-10-24_2254_codex_coms-pwa.md).

## Production — 2026-10-24 23:12 ET
- VERIFIED: production deployment dpl_G7KbweSxtYpXa9tb4kUU8T4RgQhF READY (Astra, 23:06 ET) at https://coms-pwa.vercel.app; 15/15 static files SHA-1 match 34f2ab1; live 200 on index/sw/manifest/crew.json with CSP headers.
- VERIFIED: Vercel Authentication on *.vercel.app domains (ssoProtection all_except_custom_domains).
- UNKNOWN: origin of extra `api/board.js` (public BOARD.md proxy, unused by app); physical phone install.
- VERIFIED: PR #5 merged to main as 23854c3 (2026-10-24 23:14 ET); main app files = deployed files.
- To do: phone install QA; decide protection vs public.
- Handoff: [2026-10-24_2312_claude_coms-pwa.md](../handoffs/2026-10-24_2312_claude_coms-pwa.md).
- VERIFIED 2026-10-24 23:13 ET: hardened redeploy dpl_9dXtZ3aTo1XMYma2TrFBcKtS8PPj (main 7782e17): X-Frame-Options DENY, COOP/CORP same-origin, Permissions-Policy live; stray `api/board.js` gone (/api/board → 404). Still behind Vercel login until Sneaks says public.
- VERIFIED 2026-10-24 23:37 ET: coms-pwa.vercel.app loads without login (Sneaks changed protection). INTENT: stays public; no separate repo for now (source = ai-coms/apps/coms-pwa, private).
- VERIFIED 2026-10-24 23:40 ET: production dpl_5RuRintrnRLi3xxpRNuvYNrpP9oE = main cdbe390 (adds owner X/GitHub footer links). INTENT: public source repo 0xSneaks/coms-pwa (created by Sneaks 23:38 ET); muse migrating → [note](../handoffs/2026-10-24_2345_claude_coms-pwa-repo.md).

**2026-10-24 · muse:** source moved to **0xSneaks/coms-pwa** — edit there. `ai-coms/apps/coms-pwa` stays in place until Sneaks OKs removing it.

## Locked Send — 2026-10-25 00:45 ET · claude
- INTENT (Sneaks decided): "Send to crew" button locked by Face ID passkey; orders readable on the board (not ciphertext); GitHub token as Sensitive Vercel env only.
- VERIFIED: claude-code check-in scheduled task now hourly. Muse 10-min order poll requested.
- Next: claude-code builds on a PR in 0xSneaks/coms-pwa → adversarial review → Sneaks yes for env vars + prod. Spec: [handoff](../handoffs/2026-10-25_0045_claude_coms-pwa-send.md).

## Locked Send security review — 2026-10-25 01:38 ET · chatgpt
- VERIFIED: [draft PR #1](https://github.com/0xSneaks/coms-pwa/pull/1) @ `0a457a9`, independent [adversarial review](https://github.com/0xSneaks/coms-pwa/pull/1#issuecomment-6393989642), verdict **CHANGES REQUESTED**; owner-only HIGH-RISK setup remains gated.
- VERIFIED BLOCKER: signed challenge nonce reused with *current* minute in order filename → valid assertion replay after minute rollover creates a second order within TTL (`lib/challenge-token.mjs:16`, `lib/order.mjs:55-57`, `lib/handlers.mjs:176`). Add replay test across minute/date boundaries and tie replay key to signed issuance time or nonce-only sentinel.
- VERIFIED HIGH: malformed nonempty `OWNER_PASSKEY` may leave registration available while `SETUP_CODE` remains; fail closed on raw owner env presence, add regression test.
- VERIFIED MEDIUM: failed BOARD.md update leaves orphan order with no replay-repair path; pending 10-min poll cannot be assumed. VERIFIED LOW: request body is fully buffered before checking 16KiB limit.
- VERIFIED: Vercel's automatic PR preview is READY at matching SHA; Node.js `api/*.js` method handlers are documented as supported with `"type":"module"`. UNKNOWN: preview handler invocation, physical iPhone/passkey, live GitHub write. No reviewer deploy or env edits.
- NEXT: Claude Code corrects PR blockers with tests → reviewer rechecks → Sneaks explicitly authorizes merge, production deploy, token/env changes and passkey registration as separate actions. [Handoff](../handoffs/2026-10-25_0138_chatgpt_coms-pwa.md).

## Locked Send re-review / isolated hardening — 2026-10-25 02:02 ET · chatgpt
- VERIFIED: Claude Code fixed the four earlier PR #1 findings in `a55e919`; GitHub Actions [check 40166746095](https://github.com/0xSneaks/coms-pwa/actions/runs/40166746095) SUCCESS. Vercel automatic preview READY at this SHA (build only).
- VERIFIED NEW finding: `lib/order.mjs` treated any GitHub create-file 422/409 as an existing file, risking orphan BOARD request if a validation 422 occurred. ChatGPT isolated fix + two regression tests in **draft [PR #2](https://github.com/0xSneaks/coms-pwa/pull/2)** (`chatgpt/order-collision-guard-2026-10-25` @ `3f4c6fb`, base **`claude/locked-send`**). Check [40167607279](https://github.com/0xSneaks/coms-pwa/actions/runs/40167607279) SUCCESS.
- VERIFIED: [PR #1 re-review](https://github.com/0xSneaks/coms-pwa/pull/1#issuecomment-6394184562) posted; no source pushed to Claude Code's branch.
- NEXT: Claude Code/Astra reviews and incorporates PR #2 into PR #1's branch, verify merged PR #1 head and safe function routing. Sneaks alone authorizes production merge/deploy/passkey enrollment. Saving narrow `GITHUB_TOKEN` in Vercel Sensitive Production env is safe setup; no agent has read or changed it.
- UNKNOWN: physical iPhone, real GitHub write, Vercel invocation of `api/*.js`, production Send.
- Handoff: [2026-10-25_0202_chatgpt_coms-pwa.md](../handoffs/2026-10-25_0202_chatgpt_coms-pwa.md).

## Owner guidance only — 2026-10-25 02:03 ET · chatgpt
- VERIFIED: user directed Claude Code to finish all application PR/code work; ChatGPT's role is now exclusively stepwise owner setup. Code claim released. No merges or production deployments by ChatGPT.
- VERIFIED (user-reported): GITHUB_TOKEN saved in Vercel, no value known or copied. UNKNOWN: SESSION_SECRET/SETUP_CODE/OWNER_PASSKEY; confirm stepwise with owner.
- Verified evidence: [PR #1 review](https://github.com/0xSneaks/coms-pwa/pull/1#issuecomment-6394184562), [PR #2 hardening draft](https://github.com/0xSneaks/coms-pwa/pull/2). Follow [handoff](../handoffs/2026-10-25_0203_chatgpt_coms-pwa-owner.md).

## Owner setup handoff — 2026-10-25 02:03 ET
- VERIFIED: user directed Claude Code to finish all COMS PWA code and PR work; ChatGPT now assists only with owner Vercel setup. Code claim released. No deployments or merges by ChatGPT.
- VERIFIED (user-reported): GITHUB_TOKEN saved in Vercel. UNKNOWN: SESSION_SECRET, SETUP_CODE, OWNER_PASSKEY status. Handoff: [2026-10-25_0203_chatgpt_coms-pwa-owner.md](../handoffs/2026-10-25_0203_chatgpt_coms-pwa-owner.md).
