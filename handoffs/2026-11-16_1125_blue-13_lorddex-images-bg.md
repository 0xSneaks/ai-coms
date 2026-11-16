# LordDex image-loading fix + background refresh — Blue-13 sign-off (2026-11-16)

Sneaks (live call ~11:09 ET): "Why aren't all the pictures loading when I pick it" + background "so bland".

## Audit (VERIFIED, live)
- lorddex.vercel.app == tinfoil mirror == repo main blob — one codebase, no drift.
- All 18 referenced image URLs return 200 image/* (no 404, no CORS block). BUT:
  1. **#000 Aura, #001 Verity, #002 Obesity had `art:null`** — letter emblems by design; the first three cards in the dex, incl. the flagship. All three coins have real art on-chain (Helius DAS) — it was never wired in.
  2. **Lovity's fallback was the identical Pinata URL** (no-op); Pinata gateway measured 8.7 s vs ~3 s Vercel — slowest source on the page.
  3. **Detail-view `<img>` was `loading="lazy"`** inside the hidden overlay — the tap-to-view art arrives late/blank.
  4. 17 PNGs at 0.47–0.81 MB each (~10.4 MB) with a black-void art box while loading.
  Full table + evidence: ~/workspace/lorddex/fix-candidate/AUDIT.md.

## Fix — branch only, NOT merged, NOT deployed
- Repo 0xSneaks/lorddex, branch **`blue-13/lorddex-images-bg`** @ **`239e5bf6b1453e73eadf0b71b63e34b868f98b27`** (index.html only; read-back blob `60cf413f` == local hash-object; main untouched at `a340d2c`).
- Real art wired: Aura → DexScreener CDN (456²) + rapidlaunch origin fallback; Verity/Obesity → their on-chain IPFS art via Filebase gateway + Pinata fallback (arts downloaded, viewed, on-style; copies in ~/workspace/lorddex/art/).
- Generalized fallback chains (`fb[]` + `imgFail()`); Lovity gets a real second gateway.
- Detail image eager + `fetchpriority="high"`; loading shimmer on art boxes.
- Background: pure-CSS royal-vault backdrop (gold/violet glows, diamond lattice, dot matte, vignette), card sheen/shadow, panel gold accent. Zero extra requests.

## Verification (VERIFIED)
- Headless Chromium @390×844, live network: **grid 22/22 images loaded; detail views (Aura/Verity/Lovity) loaded; 0 failed requests.**
- Screenshots visually checked: ~/workspace/lorddex/fix-candidate/shot-grid-top.png, shot-grid-mid.png, shot-detail-aura.png. Candidate file: ~/workspace/lorddex/fix-candidate/index.html.

## For Sneaks / parent
- Deploy = merge branch → main (Vercel auto-deploys). The tinfoil /lorddex/ mirror is a separate repo copy — needs the same file to stay in sync.
- Residuals: tinfoil PNGs still heavy (thumbnail pass = tinfoil-app change, out of scope); IPFS-gateway dependence for 3 arts (two-gateway chains mitigate; same-host copies staged for a permanent move).
- Claim released.
