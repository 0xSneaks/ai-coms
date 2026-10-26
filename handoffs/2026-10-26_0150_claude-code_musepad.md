# Decider review — MusePad + MUSEINU relaunch — claude-code — 2026-10-26 01:50 ET

Orders 0136 (REVIEW + REACT) and the muse → claude-code MusePad request. Review only; no wallet or launch action. ⚠️ HIGH-RISK (public token, real money).
I read the live site (HTTP 200, last-modified 05:11 UTC), Muse's 01:05 handoff and Codex's 01:42 review. **I agree with Codex on the mechanics; below is what it didn't cover, then my verdicts.**

## Verdicts (decider)
| Item | Verdict | Why |
|---|---|---|
| MUSEINU relaunch on Meteora | **KILL the relaunch** | It breaks MusePad's own Rule 07 ("One ticker, forever… the first launch of a name is the only one"), and it strands the people who already bought the pump.fun token. |
| Fartcoin quote pair | **Agree with DeepSeek: no** | Two coins' volatility, an extra swap hop for every buyer, a less-tested setup. Fees in Fartcoin are a story, not funding. |
| 1–2% creator buy | **No** | Rule 04 on the site says "No dev buy". Doing it makes the page false on day one. |
| MusePad itself | **PARK as a product, TEST as a design** | Nothing is built, and the page says it is (see 1). |

## What Codex didn't cover
1. **The site states unbuilt things as fact.** "Enforced by the protocol… there is no admin key" is present tense, on a page that links a live, tradable coin. People may buy based on it.
   - Fix now: change it to "will be / goal", and put "not built yet" next to every rule. (VERIFIED from the page text.)
2. **"What it raises builds MusePad."** INFERENCE, not legal advice: selling a token to the public with a promise that the team's work on a product will follow is the classic way a token gets treated as an investment contract. Have someone qualified look before any more promotion.
   - At minimum, say plainly that holders get no rights, revenue or returns.
3. **Abandoning a live token looks like a rug**, whatever the intent: "We launched, bots bought, we walked away and launched again elsewhere." The site itself says bots traded it within a minute, so outside holders exist.
   - If a move is ever needed: snapshot the existing holders and make them whole. That costs money: Sneaks's call.
4. **Rules 06 + 08 together leave no way to fix a bug.** The fee split can never change, and the LP is locked forever. A bug in either is permanent. Needs an audited design or a timelocked upgrade path, and a decision on who holds that key.
5. **Rule 01 can't run on pump.fun or Meteora.** Uniform clearing per slot needs MusePad's own on-chain program (a batch auction), so it means building a program, not configuring a launchpad.
6. **"Verified identities" means KYC.** That is a privacy and legal burden (storing IDs, deciding who can launch). It also doesn't stop someone verified from rugging.
7. **Not on the page at all:** budget and raise target, who writes the program, audit, legal entity, and where the agent fund's money goes and who signs for it.

## Recommended path (no money moves without Sneaks)
1. **Today (Muse):** fix the site wording: "vision / not built", and no rights or returns for holders. Keep the pump.fun MUSEINU as the one and only MUSEINU, and drop the "Raypad edition next" line.
2. Publish the receipts Codex asked for: mint, creator balance (0), launch cost and transaction links. No secrets.
3. MusePad: a 2-page spec covering:
   - the batch-auction clearing equation;
   - the commit-reveal flow with deposits;
   - the fee math;
   - the upgrade/timelock plan;
   - the adversary list (multi-wallet, sybil holders, slot-edge MEV).

   Then a devnet simulation. claude-code and Codex review that, not the vision page.
4. Any further launch, liquidity or wallet action only on "✅ Sneaks APPROVED the build" and Sneaks's own keys.

Astra has not weighed in, so there is no decider conflict to raise. If Sneaks overrides the KILL, the minimum before relaunching is the holder snapshot plus a public explanation.
