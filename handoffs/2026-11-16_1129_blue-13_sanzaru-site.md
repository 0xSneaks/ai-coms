# SANZARU companion site — build handoff (Blue-13 → Muse)

Date: 2026-11-16 ~11:29 ET · Order: Sneaks, 2026-11-16 ~11:22 ET ("a vercel to go with the deployment… take their swap and put it on our page")

## What was built — VERIFIED locally
Deploy-ready static site at **`~/workspace/sanzaru-site/`** (3 files, no build step, LordDex house pattern):
- `index.html` — single page: hero (SANZARU, tagline "See no balance. Hear no balance. Speak no balance.", v6 art large), **Swap section** (Jupiter Terminal, integrated mode), The Three (Kikazaru/Mizaru/Iwazaru), Token Facts (Rings · Meteora DBC, SOL pair, 1.5% Rings trade fee, single-use-key launch note, 82.7 SOL graduation), Links, footer. Dark stone/black theme, glossy red-collar accent.
- `sanzaru.webp` — v6 final art, copied byte-identical (sha256 ae7d2912… matches `~/workspace/sanzaru-launch/`).
- `README.md` — the wiring + deploy notes.

## The one-line CA wiring
`index.html`, config script at the bottom (line ~255), clearly banner-commented:
```js
const MINT = "";  // ← SANZARU MINT ADDRESS GOES HERE
```
Setting a valid mint flips, all derived from that one constant: status pill → "Live on Rings", contract row + Copy button, DexScreener (`dexscreener.com/solana/<MINT>`) and Jupiter (`jup.ag/swap/SOL-<MINT>`) links, and the swap panel → live Jupiter Terminal (SOL → SANZARU, `fixedOutputMint: true`, public mainnet RPC — `RPC_ENDPOINT` sits next to MINT if a dedicated RPC is ever wanted).

## Verification (local preview, headless Chromium)
- **Pre-launch state** (MINT empty): art renders (hero + swap panel), launching panel shown, terminal hidden, **Jupiter script never loaded**, CA row "Revealed at launch", 0 page errors. Screenshot: `~/workspace/sanzaru-launch/site-proof/site-pre-launch.png`.
- **Live state** (throwaway copy, test mint): gating flips correctly — launching panel hidden, terminal container shown, CA row live, links derived correctly, 0 page errors. Screenshot: `~/workspace/sanzaru-launch/site-proof/site-live-gating-test.png`.
- **UNVERIFIED:** the Jupiter widget actually mounting — this VM's Chromium cannot reach terminal.jup.ag through the egress proxy (`ERR_TUNNEL_CONNECTION_FAILED`; curl reaches it fine, HTTP 200, bundle main-4.5.8). The embed is Jupiter's documented standard snippet (`https://terminal.jup.ag/main-v4.js` + `window.Jupiter.init`). Hardening added: if the terminal is still empty 9s after load, the swap box falls back to a direct "Trade SOL → SANZARU on Jupiter" link — never an empty box.

## Blockers (both need Sneaks, neither is a build problem)
1. **GitHub repo `0xSneaks/sanzaru` not created** — PAT repo-create returns 403 "Resource not accessible by personal access token" (known PAT limit). Needs creation in the GitHub web UI; after that the files can be pushed via the API and the repo linked.
2. **Vercel deploy not run** — the connector session is connected but lacks the `phantomcapais-projects` team scope: `list_projects` → 403, team `team_4T9nErrDGecNcX5d212vAWhQ`. Recovery is Sneaks approving team access (authorize_team_access link — not exposed as a tool in this connector, so the parent must surface it). After approval, deploy = `create_project` + `upload_file` ×3 + `create_deployment` via the same connector, or CLI deploy of the folder.

## Remaining steps, in order
1. SANZARU launches on Rings → CA lands.
2. Set `MINT` (one line, above) in `~/workspace/sanzaru-site/index.html`.
3. Sneaks unblocks either the repo (web UI) or Vercel team access.
4. Deploy the folder; confirm the live URL renders + the widget mounts in a normal browser; report URL.
