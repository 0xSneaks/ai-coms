# Handoff — justmogit-bot — claude-code — 2026-11-07 16:18 ET

**Session goal:** Render review of Sneaks's first "mog me" test results (3 pfps, night of 2026-11-06) and the fixes they call for.
**Status:** DONE (review; the build is claude's lane)
**Repo / branch:** 0xSneaks/just-mog-it (read only for me) · **Last commit:** n/a

## Results (Sneaks shared the images in chat; VERIFIED by viewing them)
| # | Input | Result | Tries |
|---|---|---|---|
| 1 | Anime girl, glitch art | PASS: shades fit, style intact, "GET MOGGED" tag bottom-right | 1 |
| 2 | Pepe in a cap and chain | PASS: shades + gold styling, Pepe still recognizable; tag "MOGGED BY BRAINROT LABS" | 3 (Sneaks) |
| 3 | Small low-res cartoon/3D avatar | FAIL (Sneaks): two flat magenta rectangles pasted over the eyes, no restyle | — |

INFERENCE on #3: a low-res cartoon input gives the model too little to work with, or the output came from the old local renderer rather than Gemini. Not verified.

## Cost from this run
5+ Gemini calls for 2 passes, so about $0.10 of Gemini per good mog, plus about $0.03 of X: **about $0.13 per good mog**. The $5/day budget is about 38 good mogs a day at this hit rate, not 72. The rate should improve after the fixes below.

## Fix asks for claude
1. **Style references:** send 2–3 owner-approved mogs (start with #1 and #2) as reference images with every edit call, in `/api/mog` on `pfp-changer`.
2. **Upscale small inputs:** fetch the full-size avatar (already done) and upscale anything under about 512 px before the edit.
3. **"No change" check:** if the output is nearly identical to the input outside the eye area (a simple pixel diff), treat it as a fail and retry. Allow at most 2 retries, then a polite text reply, then the queue. Every try counts against the $5/day budget.
4. **Reject reasons:** approve and reject take a short reason, saved with the item, to build the training set.
5. **One tag:** #1 and #2 use different tags. Sneaks picks one.

## Sneaks to decide
- The tag text: "GET MOGGED" or "MOGGED BY BRAINROT LABS".
- "PIT VIPER" text on the shades (both passes have it). That's a real brand's trademark on every image the bot posts. I recommend "MOG" or the bot's own mark. Sneaks's call.

## Update 16:25 ET — Sneaks on the shades
- **Ruling (Sneaks):** the "PIT VIPER" text isn't required. What matters is the **style**: wraparound shield sport shades, and the glasses must **match the pfp's art style and fit the face**.
- Prompt ask for claude (in `/api/mog`): wraparound shield shades drawn in the same art style as the input (anime stays anime, cartoon stays cartoon, 3D stays 3D). Sized to the face, centered on the eyes, following the head's angle and tilt, with the arms going behind the ears/hair. **No brand names or text on the frames** (that avoids the trademark issue). Frame colours pick up the pfp's palette.
- Reject reasons to capture: "wrong size", "off the eyes", "wrong angle", "style mismatch", "flat overlay".
- Still open: Sneaks picks one tag ("GET MOGGED" or "MOGGED BY BRAINROT LABS").

## Update 16:28 ET — Sneaks on the tag
- **Ruling (Sneaks):** the tag doesn't need to be on the pfp; it can be random. Claude's build adds "GET MOGGED" every time, so this changes it.
- Ask for claude: make the tag optional. Each mog randomly gets no tag or one from a short owner-approved list (start with "GET MOGGED" and "MOGGED BY BRAINROT LABS"). The list lives in config, not code, so Sneaks can add lines. Keep tags short with no URLs, prices, tickers or other brands, and keep the face and shades clear.
- With this, the review has no open owner calls left.

## Update 16:45 ET — later Sneaks rulings (recorded by claude in projects/justmogit-bot.md)
- These supersede parts of this note: PIT VIPER lettering on the frames is now a **random NFT-style trait** (some mogs have it, some don't); the $5/day budget stays active with a **$10/day ceiling**; the main quality bar is **colours and placement matching the picture**.
- claude-code re-ran bot `efaab7e` independently: 364 passed, `daily_budget_usd` 5.00, autopost false. VERIFIED.
- The trademark concern about PIT VIPER was raised with Sneaks once; it's his call and is now decided.
