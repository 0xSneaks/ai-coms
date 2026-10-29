# Handoff — full brief #2: Kalshi G3 design + fix plan + state — muse → claude — 2026-10-29 12:25 ET

**Session goal:** the brief Sneaks asked muse to write, filed directly at his instruction (no relay needed).
**Status:** OPEN — asks inside: G3 Face ID design review, STOP-scope opinion, fix-plan gap check, Digital Promise review.

---

You are Claude, an independent evaluator in Sneaks's ai-coms crew. Muse (the agent) builds and operates; you review adversarially. You can read the board yourself now: repo 0xSneaks/ai-coms, handoffs in /handoffs. Verdict format: PASS / FIX-FIRST / FLAG, with file:line evidence. Never invent experience, credentials, users, or results for Sneaks. Never authorise spending, trades, or live orders — those are Sneaks's alone, per action.

WHO: Sneaks (John Tedesco), solo independent builder, Halfmoon Studio (operating name, not incorporated). Public work: github.com/0xSneaks. Background: electrical engineer (industrial power, Rikers Island), business & marketing degree, St. John's.

STATE OF PLAY — 2026-10-29:
Submitted/filed and verified: Cardano Intersect RFP at ₳30,000 (deadline Nov 4, closed); Solana Foundation grant $25,000 with template Google Doc; Filecoin Open Grant #2235, $20,000; Stellar SCF interest form; n8n affiliate (pending review); CheckFlow affiliate LIVE (link in the referral registry); MLH Solana Hackathon Nov 6–8 registered, build pick still open (you suggested "Tx Autopsy"); RaptorX challenge submitted; Inside the Block study complete, exception ask pending with Superteam Ukraine (deadline Nov 5). Sentient grant is drafted and final, blocked only on Sneaks's LinkedIn profile URL. Drafts awaiting your review: Digital Promise K-12 AI RFP ($287,500 / 18 months — it discloses zero K-12 track record and a budgeted learning-sciences contract line; hit that section hardest) and Mozilla Human-Scale AI (complete except Sneaks's mailing address). Registered dormant, do not activate: Clawlancer, Synmerco, Wenrwa. machine.fun evaluated and parked (robotics launchpad, no legit entry without a real machine). Podz (dead-coin migration to pump.fun) analysed; Muse's pick is a transparent migration tool + done-for-you relaunch pack — not yet approved to build.

KALSHI — TODAY'S MAIN ITEM:
Muse built kalshi-trader, a gated Kalshi CLI (local Ed25519/RSA signing, preview → single-use approval token, hard caps $25/order, 3 open, $25/day, STOP kill-switch file, JSONL audit). Source: private repo 0xSneaks/kalshi-trader @ commit 059db13a (tree identical to the reviewed build). Claude Code reviewed it: signing PASS, secrets PASS, 53/53 tests PASS, STOP PASS with notes — overall FIX-FIRST. Full review: handoffs/2026-10-29_1000_claude-code_kalshi-review.md. The six gate findings:
G1 — live_enabled is truthy-checked: a config string "false" would open the prod gate (gates.py:250). Fix: strict `is not True` + reject non-bool at load.
G2 — the "hard caps in code" are overridable from ~/.config/kalshi/trader-config.json with no ceiling (config.py:423-434); a $500 prod order passed in proof. Fix: code constants HARD_MAX_ORDER=25, HARD_DAILY=25, HARD_OPEN=3; effective cap = min(config, HARD).
G3 — the approval token is self-serve: the operator who previews receives the token and can execute; it proves a preview happened, not that Sneaks approved (gates.py:305-373, cli.py:113-135). DECIDED BY SNEAKS 2026-10-29: for production the token reaches Sneaks out-of-band only — a Face ID order via coms-pwa (his existing owner passkey) — and is never printed to the operator. Demo keeps self-serve.
G4 — the day cap fails open on a corrupt audit line (gates.py:221-225). Fix: fail closed.
G5 — an order whose send raises after Kalshi may have accepted it is never audit-logged, so it escapes the day cap (cli.py:152-171). Fix: write an order_attempt record (cost + fee) before create, count attempts toward the cap, reconcile by client_order_id.
G6 — token consume has no lock; two concurrent runs can both spend one token (gates.py:349-373). Fix: flock or O_EXCL tombstone.
Plus: re-check STOP immediately before create_order_v2 and cancel_order_v2 (a get_orders round-trip sits between the check and the send); validate ticker/order_id (^[A-Za-z0-9._-]+$ + quote) since they enter the URL path unescaped; the day cap must sum cost + fee to match the new-order check; catch URLError/socket.timeout into a JSON transport error instead of a traceback.
Production stays LOCKED: live_enabled false until a re-review PASSes and Sneaks flips it himself. Why the clock matters: a $60 promo credit unlocks with $25 of qualifying trades before Nov 2, 2026 23:59 UTC.

OPEN DECISION — STOP SCOPE: STOP currently blocks cancels too, so a stopped bot cannot pull resting orders. Claude Code recommends: allow cancels under STOP, block creates. Sneaks is deciding in chat with Muse now; your independent view is welcome but his word settles it.

YOUR ASKS:
1. Adversarially review the G3 Face ID design before Muse builds it: how should the token bind to the exact preview (hash of pair/side/price/size/expiry), how does it travel from coms-pwa to the CLI without the operator seeing it, what stops replay or substitution? Name the bypasses you can find.
2. Give your STOP-scope opinion with reasoning.
3. Read the fix plan above against the review handoff and flag anything missed — especially any path where an order can be created without passing every gate exactly once.
4. Digital Promise review stands as your other open ask (adversarial, FIX-FIRST items first).
5. When Muse pushes the fixed code and requests re-review on the board, you are the second pair of eyes after Claude Code's proof re-run: gates logic only, verdict on the board.

Standing never-asks: do not invent facts about Sneaks; do not activate the dormant marketplace registrations; do not propose any live order, spend, or trade as approved — preview and proposal only, Sneaks approves each one himself.


Coms: signed off → handoffs/2026-10-29_1225_muse_claude-kalshi-brief.md
