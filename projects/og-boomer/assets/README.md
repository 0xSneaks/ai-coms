# OG ($OG) Ethereum — art sources for Muse

**Owner instruction (2026-11-01):** Gather visual references from [@og_eth_cto](https://x.com/og_eth_cto?s=11) *as well as* the existing OG site and [Telegram](https://t.me/OGonETH), and make them available to Muse. The original OG BOOMER / Flywheel / Robinhood prelaunch direction is **superseded** by the already-existing Ethereum token.

## Token identity (VERIFIED from owner's contract + matching site/channel)
- Ticker: **$OG**; network: **Ethereum mainnet** (not Robinhood Chain).
- Contract: `0x69420654E8274107a0d455A6E9B08B497F435444`.
- Website whose published contract matches: https://ogmode.vip/
- Telegram supplied by owner; its public preview repeats the contract: https://t.me/OGonETH
- X supplied by owner: https://x.com/og_eth_cto?s=11
- **Important discrepancy:** site's own X footer links to `https://x.com/ogonethcto`, which is not the same literal handle. Do not merge the accounts or assign artwork to either without checking post identity. There is also a separate `@OG_on_ETH` profile; do not conflate it.

## 21 site images — SOURCE LINKS VERIFIED (not yet copied into GitHub)
Source vault: https://ogmode.vip/#meme-vault

The site lists Meme 1 through Meme 21 as images. Its gallery links use `https://ogmode.vip/memeN.jpg` (N = 1..21); endpoints 1, 2, 3 and 21 were individually opened and visually verified during this research. Use the script below to verify **all 21 live responses** and download to Muse's local workspace.

Example original art:
- https://ogmode.vip/meme1.jpg — OG pointing in a neighborhood
- https://ogmode.vip/meme2.jpg — OG with fishing rod
- https://ogmode.vip/meme3.jpg — OG with rings and pendant
- https://ogmode.vip/meme21.jpg — OG at arcade machine

## Download into Muse's VM (works from existing AI COMS repo; no new GitHub repository required)

```bash
cd ~/workspace/ai-coms   # or the location of your ai-coms clone
git pull --ff-only
python3 projects/og-boomer/assets/fetch_vault.py
```

Output: `projects/og-boomer/assets/meme-vault/meme01.jpg` through `meme21.jpg`, plus `manifest.json` with SHA-256, byte counts, original URL, and any failures. **A listed URL is not proof of a saved file**: inspect that manifest and source previews before selecting anything. Keep raw source images in the VM for curation rather than automatically committing third-party files publicly. Check reuse rights before publishing the artwork.

## X media collection: NOT YET COMPLETE (BLOCKED from this ChatGPT environment)

- Direct browser fetch of https://x.com/og_eth_cto returned a disabled/403-style access failure; alternative public mirror endpoints were not retrievable. Search produced no individually attributable images or source post IDs for this exact handle.
- **Zero X-specific images were independently acquired in this handoff.** Do not represent the 21 website files as a complete X feed or substitute generic OG/Wojak images.
- Muse should open the exact owner-supplied X profile in its authorized browser, use Media view, collect public photo/video URLs and original post permalink/date (only content actually available), download authorized copies into a separate local `x-media/` folder, and produce a manifest with per-file SHA-256, source post URL, and rights/attribution note. Never export browser cookies, automate login, bypass restrictions or touch wallets. If still blocked, report the precise blocker and a count of 0; do not claim completion.

## Site correction for Muse

- Old staging preview said **OG BOOMER / Robinhood Chain / not launched / Flywheel**. That is NOT the user's current reference token.
- Replace with **OG ($OG), Ethereum mainnet, EXISTING ERC-20 contract**, not an unlaunched Robinhood coin. Make the source identity obvious; the project's site refers to **OG TICKET**. Avoid false claims of ownership/official affiliation or token creator identity.
- Use owner-provided X and Telegram as referenced community profiles; verify them before labeling official.
- Preserve the owner's preferred gold-rim hero art until the owner approves any replacement; make a curated gallery for new imagery, not wholesale unsourced assets.
- Stage + test only. **No token deployment, trading, liquidity changes, ownership claims, wallet handling, signing, payment, domain purchase, production deployment or new spend.** Show verified on-chain contract as text, but any swap link needs a separate destination/chain check.
- Deliver the corrected preview, screenshot, list of selected verified source files, live download count, and blocked/verified X post count.

**Provenance:** user-supplied exact X and CA; directly inspected https://ogmode.vip/ (21 named image anchors, matching CA); https://t.me/OGonETH (matching CA); and individual /meme1.jpg, /meme2.jpg, /meme3.jpg, /meme21.jpg. No unverified image has been presented as pulled from X.
