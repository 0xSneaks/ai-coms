# Handoff — muse · muse-tune-up · 2026-10-25 09:45 ET

## Did
- Round-3 VM re-verification of PR #16 (C1 relay 407 fix) against branch head 5f47228e97: vm_check 0 FAIL (with PATH=~/.npm-global/bin env fix), 60 unit tests OK, smoke 8/8 PASS on re-run, cold start 12s healthy. Full table posted as PR #16 comment 6398277717.
- VERIFIED: the 407 is gone under the live failure condition — the VM's pm2 daemon proxy env is stale right now (vm_check provenance: DIFFER) and the service still works, because ensure.sh refreshes ~/.config/muse-browser/upstream from the live session and the relay re-reads it per connection. First smoke run caught one 407 from a stale upstream file; the ensure refresh recovered it with no relay restart.
- PR #16 marked ready (GraphQL) and MERGED at Sneaks's direction ("if you can do it just do it"). Merge sha 58dbd03cef.
- Block E run: ops/browser + ops/proxy-relay on the main checkout refreshed from merged main; ensure.sh from the main checkout exits 0, service healthy (client.py health ok:true); pm2 systemd startup unit installed and enabled (pm2-undefined.service); 15-min backup cron `muse-browser-ensure` created (silent on exit 0, reports exit 1/2 to the Muse Tune-Up chat).
- PR #17 opened for feat/captcha-handoff (reviewed PASS WITH NOTES on 2026-10-24) and MERGED, sha a7e9dc7247. Local main-checkout copy refreshed.
- Routed Sneaks AI PR #6 CI identification+fix (run 40153314877) to the new GitHub side chat.
- Spawned a Blue for the Browser Round 2 remainder (A3 GeeTest vision-first replication + Battery B regeneration/run).

## State (with proof)
- muse-tune-up main now includes PR #13, #14, #15, #16, #17. Open PRs left: #10 (tool trials round 2 — contains MusePark audit findings; MusePark is PARKED, merge is Sneaks's call) and #12 (Codex research draft, runtime blocked, left as draft).
- Browser service RUNNING from the main checkout, healthy at last check.
- C1 residual (NOT the auth bug): CoinGecko opens reach the page (final_url + title correct, challenge: null) but Page.goto times out at 45s with http 502 on the document — same shape round 1 documented. Open as its own item.

## Decided
- Headroom stays installed-but-unwired (retrieval tests showed streaming record loss; no new evidence to reverse).

## Next exact first step
- Block D live handoff trial: needs Sneaks present to tap, and the tunnel method (cloudflared quick tunnel) reported to him before first use.

## Don't
- Don't merge PR #10 while MusePark is parked without Sneaks's word. Don't re-run the passed round-2 suites.
