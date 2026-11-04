# The Just Mog It Bot — Plan & Explanation

*Written 2026-11-04. Status: designed, rehearsed by hand, not yet built. Owner decisions marked ⚖️.*

## 1. What it is

**Just Mog It** is a public launch bot on X. Anyone can tag **@justmogit_bot**, say **"just mog it"** (ideally quote-posting the tweet, image, or idea they want coined), and the bot does the rest: it creates the coin on **pump.fun**, then replies under the request with the contract address (CA). No forms, no website, no wallet connect for the requester — the post *is* the order form.

The model is Bankr-style — a bot people summon in public — with one structural twist that makes it an actual business instead of a cost center: **the bot is the creator of every coin it launches, so it earns the creator fees on every trade, and those fees are recycled to pay for the next launches.** A coin that catches pays for the coins that don't. The fee loop works at portfolio level: running coins fund quiet ones.

The concept is already proven end-to-end by hand: on 2026-11-04 Sneaks posted "just mog it" over a live coin, the launch was executed manually, the CA reply was posted, and the position was later sold flat. The bot simply automates a loop that already worked once in public.

## 2. How one launch flows

1. **Listen.** The bot polls its mentions and quote-posts through the X API (owned-mention reads cost $0.001 each). Only posts that address the bot count — it never scans strangers' timelines and never replies uninvited.
2. **Understand the request.** From the triggering post (and the post it quotes) the bot extracts: coin name, ticker, and image. If the quoted post carries the art and the name, those are used as-is.
3. **Validate.** Before any money moves, the request passes the gates in §5: trigger policy, duplicate check, hard-skip screen, cooldowns, daily caps, bankroll check. A request that fails a gate gets a short public reply saying why — silence is never the answer to a person who asked.
4. **Launch.** The bot's own wallet creates the coin on pump.fun via PumpPortal (the same route proven on the Downald pump.fun launch), with name, ticker, art, and the source tweet linked in the metadata.
5. **Reply with the CA.** The bot replies under the request with the CA as **plain text, no link**. This is deliberate and financial: a post containing a URL bills at $0.20 on the X API; a plain post bills $0.015.
6. **Record.** Every launch is written to a ledger: requester, source tweet, name/ticker, mint, launch tx, cost, fees claimed to date. If it isn't in the ledger, it didn't happen.
7. **Sweep fees.** On a schedule, the bot claims accumulated creator fees from all its coins through PumpPortal's `collectCreatorFee` (proven live on Downald) and returns them to the launch bankroll.

## 3. Why pump.fun (decided 2026-11-04, Sneaks's call)

- **Creator fees are claimable by API.** PumpPortal's collect-fee call runs from a script — proven on Downald. A bot can harvest its own revenue with no human in a UI.
- **Mogz fails exactly here.** Mogz creator fees are claimable only through the website UI; ~$0.26 of our own fees from the POLY / Daywalker / Downald launches is still sitting there unclaimed because no API route exists. A bot cannot run a business on revenue it cannot collect.
- Pump.fun is also where the audience already is, and its multi-quote support means the same launcher can later pair coins in wXMR or other quotes without a rebuild.

## 4. The money

**Cost per launch**
- X API: ≈ **$0.03–0.05** all-in (mention reads at $0.001, the CA reply at $0.015, lookups in between). Pay-per-use, no subscription.
- Chain: pump.fun creation is network fees only (~0.005–0.02 SOL); the optional dev buy is a separate, capped decision (⚖️ §8).
- Working scale from the design session: **1 SOL ≈ 5 launches, 5 SOL ≈ 25 launches**, before fee recycling stretches it further.

**Revenue**
- A cut of every trade on every coin the bot has ever launched, accruing to the bot's creator wallet, claimable by API at any time.
- The bankroll rule: claimed fees go back into the launch pot. The bot trends toward self-funding; outside money is the seed, not the fuel.

**Current balances (verified 2026-11-04)**
- X API credits: **$2.83** — enough to build and test, not enough to run live for long. The up-to-$70 new-account promo (card save + first auto-recharge match) is unclaimed; any top-up is Sneaks's call, never automatic.
- Launch bankroll: **$0 until the paycheck lands** — launches are staged, not fired, per launch doctrine.

**Hard caps (Sneaks's standing rules, enforced in code, not by intention)**
- Max **1 SOL** per launch · max **3 launches/day** · **stop at 50% bankroll drawdown**.
- A software kill switch halts all launching instantly; fee *claiming* stays allowed while halted.

## 5. The gates (every request, in order)

1. **Trigger policy** ⚖️ — open to anyone, or allowlist only (§8). Until decided, default at build time is allowlist (Sneaks + named testers) for the shakedown period.
2. **Duplicate / copycat check** — if the same source post or near-identical name+ticker was already mogged, the bot does not launch a twin. Recommended reply: "already mogged" + the existing CA (⚖️ §8).
3. **Hard-skip screen** — the standing narrative-ops skips apply unchanged: deaths, violence, politics fights, kids, real private people, scam bait, impersonation of real brands/people. A skip gets a one-line refusal reply, not a launch.
4. **Cooldown** — one active request per requester at a time; repeat pings don't stack launches.
5. **Caps & bankroll** — the §4 caps checked against the live wallet balance and the day's ledger. Insufficient bankroll = a reply saying launches are paused, never a half-funded launch.

## 6. Holding & exit rule (proposal on the table ⚖️)

The bot ends up holding whatever dev-buy position it took at creation. Proposed rule, pending Sneaks's ruling:

- If **only we hold it** (no outside holders), a full unwind is allowed — the position was never really public.
- Once **outside holders hold a real share**, exits are **ladder-only**, and **no single sale exceeds 0.5% of supply** — the bot never dumps on the people who answered its own launch.
- The bot never buys other people's coins, never uses leverage, and never trades outside its own launches.

## 7. Compliance & account hygiene

- **"Automated by @heySneaks" label: SET** (2026-11-04, in the bot's own X settings, @heySneaks confirmed as managing account). ✅
- **Bio disclosure: still owed.** X's developer guidelines want the bio itself to state the account is a bot and who runs it. One line to add at build time.
- **Posting as the bot: one consent step remains.** The developer app ("Justmogit", id 33606516) is reconnected and verified live, but its current grant acts as @heySneaks. Before launch, **@justmogit_bot must authorize the app itself** so the bot posts under its own name.
- **Automation rules shape.** The bot only responds to people who addressed it, honors "stop" opt-outs immediately and permanently, and never bulk-replies, follows, or likes. That is the compliant shape for an automation account.
- **One item to verify before go-live:** current X developer-guideline wording on whether reply-bots need any prior policy approval. To be checked against docs.x.com at build time — flagged here so it is never assumed either way.

## 8. Decisions Sneaks owes (nothing builds past Phase 1 without them)

1. ⚖️ **Trigger policy:** open to anyone vs allowlist.
2. ⚖️ **Exit rule:** adopt the §6 ladder proposal, amend it, or replace it.
3. ⚖️ **Copycat reply:** "already mogged" + existing CA (recommended) vs refuse silently vs launch anyway.
4. ⚖️ **Dev buy:** fixed small amount per launch, a % of the launch budget, or none.
5. ⚖️ **Seed bankroll:** amount, arriving with the paycheck.

## 9. Build phases

- **Phase 0 — Account finish (minutes, Sneaks + Muse).** Bot authorizes the app; bio line added; read-back verification that the bot can post as itself.
- **Phase 1 — Listener in dry-run.** Bot reads mentions, runs all §5 gates, and *would-launch* logs + draft replies — but posts and launches nothing. Acceptance: a full day of dry-run logs with zero gate misses on seeded test pings.
- **Phase 2 — Launch engine, test scale.** Real launches at minimum size for allowlisted testers only. Acceptance: three end-to-end launches (ping → coin → CA reply → ledger entry → fee claim) with every tx and post read back.
- **Phase 3 — Live.** Trigger policy flips to Sneaks's §8 ruling; caps armed in code; fee sweep on schedule; weekly report (launches, spend, fees claimed, bankroll) joins the narrative-ops weekly review.

## 10. What already exists

- ✅ @justmogit_bot account (created by Sneaks)
- ✅ Developer app "Justmogit" (33606516), Read + Write, Web App/Bot type — after being deleted by mistake and rebuilt the same night
- ✅ Connector `custom.x-justmogit-bot` verified live (API reads return 200 for both @heySneaks and @justmogit_bot)
- ✅ "Automated by @heySneaks" label set
- ✅ Manual end-to-end rehearsal ($USA) — the loop works when a human runs it
- ✅ PumpPortal launch + fee-claim routes proven live (Downald, both venues)
- ⬜ Bot-side app authorization, bio line, and the code itself — Phases 0–2
