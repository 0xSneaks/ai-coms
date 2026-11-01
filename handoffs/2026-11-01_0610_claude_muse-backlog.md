# Handoff — claude → muse — 2026-11-01 06:10 ET — backlog run: finish what's left

**Session goal:** Sneaks (main chat, 06:01 ET): "tune Muse up and have it complete whatever is left on the board." INTENT.
**Status:** HANDING OFF — order for muse. Nothing built in this session.

## Standing mode (from now until the list is empty)
- Work the list below top-down. One item at a time; sign off each with evidence (VERIFIED) before the next.
- Anything already done → mark the board line DONE with a receipt link. Stale/superseded → strike it with the reason (don't delete).
- Need Sneaks? Don't stop. Park the item, keep going, and add it to ONE batched "Sneaks asks" line at the end (logins/codes, funding, identity accounts, HIGH-RISK yes/no only).
- Rules unchanged: paper only, no live orders, no cap/gate/credential changes, no secrets on the board. Cheap/overflow models don't touch signing, custody or funds paths.

## Do now (priority order)
1. **moonboy-vps — host changed by Sneaks 05:59 ET.** Cancel Hetzner (create nothing there). Use **Google Cloud e2-micro, us-east1, Ubuntu 24.04, 30 GB standard disk** (always-free compute in us-east1/us-central1/us-west1 only). Before creating: report the console $/mo incl. external IPv4; set a $1 budget alert; STOP at any card step (Sneaks enters it). systemd unit: `Restart=always`, `MemoryMax=512M`, `CPUQuota=50%`; SQLite on the persistent disk. DONE = /start replies after a reboot. Fallbacks: Oracle Always Free ARM → Hetzner EU. Box runs HLBOTV2 only — kalshi-trader stays on a US IP and does not move here without review.
2. **kalshi-brain.** Integrate `projects/kalshi-brain/fairvalue_model.py` behind the contract (no interface change). Run the historical calibration (model prob vs settled hourly KXBTCD outcomes) → post the table. Then request claude's review of the integrated brain. Paper only.
3. **stonkfunbot — Sneaks says "done supposedly."** Board evidence says: Mogz provider verified on `muse/mogz-provider` @ `97681fca` (981 passed), NOT merged; live signing refused by construction; PR #76 unsigned-only. Post a one-line verdict: DONE (what exactly is done, with proof) vs NOT DONE (what's missing for a live launch). No merge, no deploy.
4. **Quick closes (minutes each):** commit the OpenCode Go atlas to `research/`; re-push full `CLEAN-SLATE.md`; push REAL OR BS branch `e97046f` as a PR (per the claude → muse ai-coms line).
5. **SOLANA PAPER DESK RUN** (order 2026-10-25, open 7 days): run it end to end on paper and report, or strike it with the reason.
6. **musepad:** devnet deploy of `projects/musepad-protocol` (build-sbf) for codex's adversarial review; post the receipts/ledger codex asked for. No posting/publishing without Sneaks's go.
7. **mogz:** sign-in fix / blue-mogz status — report or strike.
8. **inside-the-block, narrative-ops, linkedin-review, apply-all/Cardano:** report status per line; close what's done.

## Close as superseded (strike with reason)
- ROLL CALL lines (10-26, 10-28), COMS-app test send, "Is all work done?" (×2) — answered by the 10-29 ranked worklist.
- MusePad REVIEW + REACT duplicates (10-26 01:36) and the museinu review — decided.
- "Make a VPN for muse" — fold into the fomo-monitor IP line, one owner.

## Sneaks asks — already known (batch these, don't re-ask one by one)
- Kalshi gate (a): demo account + demo API key, secure entry on the VM. ⚠️ HIGH-RISK
- Kalshi gate (b): set `bot_cap_usd`. ⚠️ HIGH-RISK (his trading rule: max 1% risk per trade)
- GCP card step (only if the console shows a charge).

## FYI
- Sneaks is launching **OG on Flywheel** himself; ChatGPT posts about it. Muse: no action unless asked. Posts = facts only, no price/return claims.

## Don't
- Don't re-litigate decided items (see Established in each project file).
- Don't start new builds outside this list.
