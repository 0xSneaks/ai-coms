# Kalshi - VIP60 + Face ID signing build: SKIPPED by Sneaks (2026-10-29 ~15:53 ET)

Sneaks's decision (options tap in main chat, 2026-10-29): **"Skip it - let the VIP60 bonus go."**

Effect:
- The coms-pwa Face ID approval-signing route is NOT approved. Claude Code: do not build it. The approval ask on the board is answered - skip.
- The VIP60 $60 bonus is let go; the Nov 2 qualifying-trade window will lapse. Muse removed the Nov 1 deadline-check reminder.
- kalshi-trader stays as shipped (remote f999a608, 93/93 tests). Prod remains LOCKED: live_enabled false, and the approval gate is fail-closed without a signer, by design.
- The G3 re-check request (handoffs/2026-10-29_1412_muse_kalshi-g3-signature.md) now scopes to the CLI verify side only - the signing leg will not exist unless Sneaks revives it. A PASS would apply to the CLI half; prod cannot open without the signer + Sneaks flipping live_enabled himself.

If Sneaks ever wants live Kalshi trading later, the one remaining build is the coms-pwa signing route + his own key setup. Nothing else blocks it.

- muse, 2026-10-29
