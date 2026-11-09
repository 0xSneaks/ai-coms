# Handoff — claude — cherry-launch-room — portal done to 6/7 + agent blocks — 2026-11-09 04:05 ET

## Did
- Walked Sneaks through the Cherry portal, steps 1–6 of 7. App created: App ID `52e41534-4c7b-4237-9a16-ec8ea7a3c9dc`, Project ID `app_b22266243fde`. Log → [PORTAL-LOG-launch-room.md](../skills/cherry-messenger-creator/PORTAL-LOG-launch-room.md).
- Portal's generated integration prompt saved verbatim → 0xSneaks/cherry-launch-room `docs/CHERRY_INTEGRATION.md` (604e6d3).
- Owner rulings: 5% of Pump.fun creator fees via Pump fee sharing (user 95 / app 5), portal money = Other, share empty; age 18+; individual operator; Cherry standard Terms/Privacy.
- Skill `cherry-messenger-creator` updated with the real portal map + copy-box rule.

## State
Portal parked at 6/7 (no URL, checks not run). No code yet. Spike not run.

## Next — paste blocks

### claude-code
```text
CLAUDE-CODE — Launch Room (Cherry) — spike + money/auth path ⚠️ HIGH-RISK

Check coms. Read:
- ai-coms projects/cherry-launch-room.md
- ai-coms handoffs/2026-11-09_0330_claude_cherry-launch-room.md (spike spec, variants A–D)
- repo 0xSneaks/cherry-launch-room docs/CHERRY_INTEGRATION.md (Cherry's generated spec — it wins on conflicts)
Claim it on BOARD.md.

1. Re-verify against current @pump-fun/pump-sdk (4.3.1 seen 2026-11-09; pump-deck pinned 4.0.0): create_v2 args, create+buy, updateFeeShares (SOL-quoted, set once only).
2. Build the sign-only spike on branch spike/sign-only, App ID 52e41534-4c7b-4237-9a16-ec8ea7a3c9dc:
   A create-only · B + reference key on a 0-lamport self transfer · C + 0.01 SOL buy · D + fee-sharing setup (user 9500 / app 500 bps; test recipients the tester controls).
   cherry.wallet.signTransaction only. NEVER send. Drop signed bytes. Log: variant, result/policyCode, bytes.
3. Post a results table on the board. Variant A refused (FORBIDDEN_INSTRUCTION / DANGEROUS_INSTRUCTION / UNSTATED_ROLE) = KILL → tell Sneaks.
4. Spike passes → Step 3: /api/auth/cherry with verifyLaunchToken (reject wrong aud/iss/expired), session in memory + Authorization header; CherryWalletAdapter into pump-deck send.ts; labels with real amounts; reference key on our own instruction; fee-share split in the launch flow with the 95/5 disclosure before signing; tier cap from the live tier claim; SDK error table → plain messages. Tests for each.
5. Hand codex the adversarial review of step 4.

Don't: broadcast anything, deploy production, touch pump-deck, put any secret in the repo.
Bring Sneaks only: the spike tap link (one approve, nothing sent).
```

### codex
```text
CODEX — Launch Room (Cherry) — scaffold + room feed

Check coms. Read:
- ai-coms projects/cherry-launch-room.md
- ai-coms handoffs/2026-11-09_0330_claude_cherry-launch-room.md (Steps 2 + 4)
- repo 0xSneaks/cherry-launch-room docs/CHERRY_INTEGRATION.md (Cherry's spec — it wins)
Claim it on BOARD.md. Start Step 2 now; Step 4 after claude-code posts spike PASS.

Step 2 (branch codex/scaffold):
- Vite + React from pump-deck @ 1d8cb58 (copy src/launch, shared, server with a provenance note; do not edit pump-deck).
- CherryMiniAppProvider on first render, isInsideCherry() hides the connect button, skeleton first frame, 360px dark, 44px targets.
- vercel.json frame-ancestors header, no X-Frame-Options; public/.well-known/cherry-app.json = {"appId":"52e41534-4c7b-4237-9a16-ec8ea7a3c9dc"}.
- Footer links: Cherry-hosted Terms + Privacy (URLs in docs/CHERRY_INTEGRATION.md §9) + "Unofficial. Not affiliated with Pump.fun."
- In-app block for CU/IR/KP (x-vercel-ip-country).
- Screens: room feed · details · buy · review · launching · done + Share to room.
Step 4: Neon tables + POST /api/launches (verify on-chain before insert: success, Pump create_v2, mint + creator match session; idempotent on signature) + GET /api/rooms/:id/launches; key users by cherry_id ?? sub.
Then: adversarial review of claude-code's Step 3 when asked.

Don't: touch src/launch signing/send logic or auth (claude-code owns them), broadcast, deploy production, write secrets.
Done = typecheck + tests + build green, posted with output on the board.
```

### muse
```text
MUSE — Launch Room (Cherry) — deploy + checks

Check coms. Read ai-coms projects/cherry-launch-room.md + docs/CHERRY_INTEGRATION.md in the app repo.

1. Vercel PREVIEW project cherry-launch-room (team phantomcapais-projects), Neon connected. Env NAMES on the target: PINATA_JWT, SOLANA_RPC_URL, CHERRY_APP_ID, DATABASE_URL. Reuse existing values where they exist; list what Sneaks must set. Names only on the board.
2. When codex's scaffold lands: deploy Preview, then paste evidence — /api/health, /.well-known/cherry-app.json 200 JSON with the right appId, frame-ancestors header on /, 360px screenshot.
3. Post the preview URL for Sneaks to paste into portal step 6/7 → Add → Run checks → Run the test.
4. Email team@cherry.fun (read-only question, from Sneaks's side only if he approves the wording): does a share of Pump.fun creator fees earned off-app count as "revenue that came through Cherry"? Draft it; Sneaks sends.
5. Send Sneaks the spike link when claude-code posts it.

Don't: production deploy, mainnet launch, edit money/auth code, write secret values.
Bring Sneaks only: secrets he must set, the spike tap, the preview URL for the portal.
```

## Sneaks-only (batched)
1. Wallet for the 5% fee share — default sneaks.skr, confirm or give another.
2. Spike tap (when muse sends the link) — ⚠️ signing, nothing sent.
3. Paste Muse's preview URL in portal 6/7 → Add → Run checks → Run the test.

## Don't
No broadcast, no production, no edits to 0xSneaks/pump-deck.
