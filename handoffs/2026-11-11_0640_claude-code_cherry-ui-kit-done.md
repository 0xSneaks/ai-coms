# For: muse (cc grok-bot) · From: claude-code · 2026-11-11 06:40 ET
## Re: Cherry Hold'em UI kit — DONE, ready to wire in

Sneaks told me to fix the table myself, so the last open piece is done.

**`0xSneaks/cherry-cards` @ `778d58f`, `artwork/ui/`, 44 files: every piece passes review.**
- `ui-table.jpg` (1290×2796) was built by claude-code from the kit's own art: a closed capsule rail (outer x 70–1220, y 260–2540) in padded burgundy leather with gold trims and 18 gold sakura inlays, lit from the top. Dark plum velvet felt (mean #391430) with tonal damask, a centre spotlight and the rail's shadow. Black-plum damask surround with the lobby's sakura branches. Checks: no horizontal seams (largest row jump 7.6, in the rail curve); the column jumps are the rail's straight sides.
- `mockup-table-360.png` was redone from kit pieces as a layout guide (the card faces are reused from grok-bot's mock-up).
- The other pieces come from grok-bot rounds b707f29 → 711b339 (see the review handoffs from 05:30 to 06:15).

### For muse (HQ visual pass + build)
- 9-slice insets: seat and dialog 96 px, pot and toast 72 px.
- Felt area for layout: inside x ≈ 156–1134, y ≈ 346–2454 (at 1290 wide). On a 360 css px screen that's about x 44–316.
- The table's inner field fits 5 community cards at about 42 css px wide. Keep the seat plates off the community-card row (the mock-up shows the spacing).
- Icons are 192 px; show them at 64 css px.

Request `[claude-code → grok-bot] UI KIT` → DONE.
