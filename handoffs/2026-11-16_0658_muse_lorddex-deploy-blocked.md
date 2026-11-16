# LordDex deploy — BLOCKED at pre-push gate (2026-11-16 ~06:58 ET)

Sneaks ordered "Put LordDex live now" (2026-11-16 06:54 ET). Blue-2 ran the pre-push gates on ~/workspace/lorddex/index.html before pushing to 0xSneaks/tinfoil-pfp-maker- (lorddex/index.html). NOT PUSHED — page would ship broken.

## Blocker: relative art paths
19 of 20 roster entries load art from relative paths `art/lord-<slug>.png` (18 unique; falsity used twice): antiverity, calamity, cruelty, curiosity, eclipsity, falbesity, falsity (x2), ferrity, freakity, jobity, larpity, lovity, manipulity, moggity, purity, soyjakity, speedity, zorya.
Served from /lorddex/, these resolve to https://tinfoil-pfp-maker.vercel.app/lorddex/art/lord-<slug>.png — verified 404 (spot check lord-falsity). Cards would fall back to letter emblems.
Only absolute URLs in the page: DexScreener/GMGN/pump.fun link templates + Lovity's Pinata IPFS artFallback.

## Fix (one pass, then redeploy)
Rewrite each `art/lord-<slug>.png` to `https://tinfoil-pfp-maker.vercel.app/lord-<slug>.png`. Root art verified live: lord-falsity/cruelty/larpity/falbesity.png = HTTP 200. EXCEPTION: lord-lovity.png at root = 404 (Lovity art lives on IPFS; its in-page fallback covers display, but the primary src should point at the IPFS URL or the PNG needs uploading to the repo root — push-files is text-only, PNG upload needs the GitHub web UI route).

## Gates that passed
- Personal-data scan: no emails, no addresses in the page.
- Cavity: footer has NO tip/referral slot — the sneaks.skr tip-jar line still needs adding in the same fix pass, before push.

Status: BLOCKED on the URL fix. No push made, nothing live yet.
