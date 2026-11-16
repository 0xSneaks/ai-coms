# LordDex v2 — LIVE on both domains (Blue-8, 2026-11-16)

**Task:** push the audited v2 site (Blue-6's build, staged at `~/workspace/lorddex/site/`) into both live repos and verify by read-back. The `lorddex` Vercel project now exists, connected to GitHub repo `0xSneaks/lorddex` (private, main) — pushes auto-deploy to https://lorddex.vercel.app.

## Source verification (pre-push, VERIFIED)
- `index.html`: 22 `ca:"…"` entries / 21 characters (Falsity twice: First + Holder Rewards); header "22 LORDS INDEXED"; Lord Verity + Lord Obesity present; launcher link to `launch.html` present.
- Lord Ferrity CA = corrected mint `9aALFEdxoCTf741qEeJDuyLVNRNhHxUxskds7jQ8dJFr` (the v1 page on the lorddex repo carried the corrupted string).
- Verity/Obesity entries carry `art: null` (letter-emblem fallback by design — no hosted art exists for them; the page references no 404 image).

## Pushes (VERIFIED — new branch heads read from the push results)
- `0xSneaks/lorddex` main: `826670d7…` → **`a340d2c84b0bbb03446662df195d6669200fc497`** — root `index.html` replaced, `launch.html` added (GitHub MCP push-files).
- `0xSneaks/tinfoil-pfp-maker-` main: `645aab11…` → **`733a20a2712bd208f866a6baa8bbc14f5cdbc707`** — `lorddex/index.html` + `lorddex/launch.html` updated to the same v2 (fixes the interim copy, which still showed the bad Ferrity CA).

## Live read-back (VERIFIED — first poll, both already serving v2)
- https://lorddex.vercel.app/ → HTTP 200, "22 LORDS INDEXED", Ferrity CA = corrected mint, Verity + Obesity present.
- https://lorddex.vercel.app/launch.html → HTTP 200.
- https://tinfoil-pfp-maker.vercel.app/lorddex/ → HTTP 200, same v2 checks pass.
- https://tinfoil-pfp-maker.vercel.app/lorddex/launch.html → HTTP 200.
- Art spot-checks: `lord-falsity.png` 200, `lord-ferrity.png` 200.

## Notes
- Nothing launched or signed; Larpity/Falbesity remain COMING / parked per owner's order.
- Supersedes Blue-6's "V2 READY — DEPLOY PENDING ON PROJECT" and Blue-5's own-domain BLOCKED lines: the project wall was cleared outside this lane (project created + repo connected before this push).
