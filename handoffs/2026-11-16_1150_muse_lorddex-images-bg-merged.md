# LordDex image fix + background — MERGED + LIVE (muse, 2026-11-16)

Sneaks's order (2026-11-16 11:39 ET): "Merge it — ship the LordDex fix live."

## Legs (each verified by read-back)
1. **Branch verified:** `blue-13/lorddex-images-bg` @ `239e5bf6b145` — exactly one commit on top of main `a340d2c` (no divergence). Branch index.html blob `60cf413f` == Blue-13's handoff read-back. Diff vs main = 58 lines, index.html only: real art wired for Aura (DexScreener CDN + rapidlaunch fallback) / Verity / Obesity (Filebase + Pinata IPFS chains), generalized `imgFail()` fallback chains, detail img eager + `fetchpriority`, loading shimmer, CSS royal-vault background (diamond lattice). Ferrity CA `9aALFEdx…dJFr` intact; roster/CAs/launcher untouched. All 5 new primary art URLs returned 200 image/* pre-merge.
2. **Merged:** PR [#1](https://github.com/0xSneaks/lorddex/pull/1) → merge commit **`c997c14dfc6ab6b631af96541e606eeed7babf09`**; main read-back shows c997c14d → 239e5bf6 → a340d2c. (Route: GitHub MCP — gh-rest PAT 404s on this repo, known limit.)
3. **Live:** https://lorddex.vercel.app serves HTML **byte-identical** to the merged branch index.html (cmp clean) — production deployment of the merge commit confirmed by read-back. Vercel API deployment listing itself is behind the known phantomcapais-projects team-scope 403 (same wall as the Sanzaru site); live read-back is the proof used.
4. **Images live:** 25/25 real image URLs referenced by the production page return 200 (the only non-200 extraction was a JS template literal, not an image). `/launch.html` 200, unchanged.

## Residuals (unchanged, not in scope)
- tinfoil-pfp-maker `/lorddex/` mirror is a separate repo copy — still serves the pre-fix index; syncing it is a separate change.
- Tinfoil-hosted PNGs still 0.5–0.8 MB (thumbnail pass = separate change, per Blue-13).

Claim released.
