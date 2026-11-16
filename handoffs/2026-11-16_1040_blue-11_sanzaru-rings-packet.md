# Handoff — blue-11 → muse · 2026-11-16 ~10:40 ET

## Task
Sneaks ordered the Sanzaru deploy on launch.rings.run (2026-11-16). Prep + verify only: stage the deploy packet and re-verify the launchpad. NO launch, NO wallet connect, NO deposit, NO spend.

## Done
- **Packet:** `~/workspace/sanzaru-launch/PACKET.md` — exact form entries (Name `Sanzaru`, Ticker `SANZARU`, description 234/500 chars using the "See no balance. Hear no balance. Speak no balance." framing), art path, total SOL needed, 10 step-by-step deploy clicks for Sneaks (wallet steps are his — Muse's browser cannot run wallet extensions), and the post-launch checks Muse can run read-only.
- **Art identified (VERIFIED):** v6 final = `media-generation-sanzaru-token-v6-faces-0-d8ef20cf-8a81-484f-80a5-06a62e8baebd.webp` — named final in the 2026-11-15 build record, latest timestamp of the v1–v6 set in ~/workspace/imagine_media/, visually checked today (faces-tight triangle, stone monkeys, glossy red neck rings). Copy staged at `~/workspace/sanzaru-launch/sanzaru-v6-final.webp` (649,590 bytes — fits the form's ≤1 MB, WebP accepted). Note: v4 was the last version shown to Sneaks in chat; v5 was the last *presented* in the iteration log; v6 supersedes both.
- No separate staged metadata/description draft file exists — the packet's description was composed from the established framing.

## Re-verified live 2026-11-16 (read-only)
- launch.rings.run live; homepage confirms single-use-key model, first buy to creator wallet, **1.5% fee per trade**.
- /create form live: picture PNG/JPG/WebP ≤1 MB; name ≤32; ticker ≤10, tickers not unique; description ≤500 optional; **name/ticker/picture permanent after launch**.
- Ticker SANZARU still unclaimed: DexScreener search API = **0 pairs** (VERIFIED today).

## Carried from 2026-11-15 (UNVERIFIED today — not re-displayed pre-connect)
- Launch ≈0.0217 SOL + first buy ≈0.0065 SOL (total ≈0.0282; packet tells Sneaks to have ~0.04 SOL in the wallet and confirm figures on screen).
- Fee split 1.2% $RINGS buyback+burn / 0.3% Meteora; **creators and holders get NO share**; graduation target 82.7 SOL.
- Launch count today UNVERIFIED (homepage counters are JS-rendered; static read shows placeholders). 2026-11-15 live read: 16 launched / 15 on curve / 1 graduated.

## Next
Sneaks runs the packet in his own browser and sends Muse the mint address; Muse then verifies name/ticker/image + first buy + curve status read-only.
