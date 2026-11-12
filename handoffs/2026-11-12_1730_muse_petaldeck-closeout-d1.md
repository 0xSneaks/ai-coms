# SIGN-OFF — PETALDECK CLOSE-OUT: D1 DRAFT POSTED, D3 CONFIRMED — muse → all — 2026-11-12 17:30 ET

Per the close-out order (2026-11-12_1630_claude_cherry-closeout-holdem-petaldeck.md). Muse leads PetalDeck.

## D1 — partner email draft: DONE (draft below, also filed at muse's workspace `launch-room/draft-cherry-partner-tier.md`)
D2 is Sneaks's: send from his Cherry dev account, then post "SENT + date" on the board.

---
To: team@cherry.fun
Subject: PetalDeck (App 52e41534…) — please apply Partner tier so Pump launches can sign

Hi Cherry team,

I'm John Tedesco (0xSneaks), developer of PetalDeck (portal name "Launch Room"), App ID 52e41534-4c7b-4237-9a16-ec8ea7a3c9dc, Project ID app_b22266243fde. PetalDeck lets users launch Pump.fun coins from a Cherry chat.

My developer account has passed identity verification in the Cherry Developer Portal (the checkmark on my sneaks.skr profile), and I understand I'm a Cherry Partner — but the server-verified launch token for this app still reads `tier: verified`, not partner, and that is blocking us completely:

- Your policy makes token launches / launchpads Partner apps only, which I understand.
- Every Pump.fun `create_v2` launch transaction includes SPL Token `SetAuthority` (mint authority → null) and a metadata-authority revoke. Those instructions are required by Pump on every launch — there is nothing on our side we can strip or change.
- Below partner tier those authority changes are refused, so every sign test came back `DANGEROUS_INSTRUCTION`, even with a funded signing wallet and a transaction that simulates cleanly.

What I'm asking for:

1. Apply partner tier to app 52e41534-4c7b-4237-9a16-ec8ea7a3c9dc.
2. Confirm that partner tier permits Pump's mint-authority revoke instructions, or tell me what else has to change on the transaction.
3. If a written partner agreement or a licensing step is still missing on my side for the launch category, tell me exactly what you need and I'll get it done.

Meanwhile the listing stays private and we've stopped all sign testing, so no refused transactions pile up against the app.

Thanks,
John (0xSneaks)
---

## D3 — listing stays PRIVATE: CONFIRMED
VERIFIED from project record: the app was never published (portal publication step never completed; the registered portal URL is the spike preview and the standing order is do-not-publish). No A–H taps since the 2026-11-09 funded re-run. Nothing to unpublish.

## D6 — tier watch: STANDING, with a limit stated plainly
The `tier` claim is only readable from a server-verified launch token inside a live Cherry session, so there is no VM-side daily probe. Muse checks it whenever a Cherry session is live and will post "TIER PARTNER" the moment a read shows `partner`. If Sneaks opens the app in Cherry, the spike page shows the tier line — a screenshot settles it instantly.

## Still open, owners named in the order
- D4 (codex / claude-code): non-signing finish work — banner fix, room feed, share card, ALLOWED_ORIGINS lock on /api/metadata + /api/rpc, hide Vercel toolbar on Preview.
- D5 (claude-code): ⚠️ money-path review + independent Opus cross-check (K-11).
- Fallback clock: if Cherry hasn't answered 7 days after D2 is sent, Sneaks picks wait / pivot / park.

## Claims
- Draft text above: VERIFIED (this handoff is the board copy).
- Listing never published: VERIFIED (project file + portal record, 2026-11-09).
- "tier: verified" as of last read: VERIFIED (server-verified launch token, 2026-11-09 13:57 ET read on the board).
