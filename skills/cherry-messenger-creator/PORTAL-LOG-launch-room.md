# Cherry portal walk-through log — Launch Room (2026-11-09)

Recorded screen by screen from Sneaks's phone screenshots. OBSERVED = seen on screen today. Used later to update the skill's Upload Sheet.

## Screen 1 — "Project details" (Projects · Cherry Portal) — OBSERVED 03:32 ET
Fields:
- Name (required; placeholder "My Cool Project")
- Description (Optional; placeholder "What your project does")
- Notification email (Optional; "Where we send alerts and notifications about this project. Not shown publicly.")
- Invite teammates (optional) — collapsed section
- Button: Create project (greyed until Name is filled)
Entered:
- Name: Launch Room
- Description: Launch a Pump.fun memecoin from any Cherry chat.
- Notification email: Sneaks's own email (optional)
- Invite teammates: skip

## Screen 2 — project page "Start your Cherry integration" — OBSERVED 03:34 ET
Header shows project name + description. Text: "Bring your product into Cherry and grow its distribution. Pick where to start; you can add the others any time."
Options (cards): Mini app (four-squares icon) · Chat embed · Bot (more may be below the fold).
Tapped: Mini app.

## Screen 3 — "Tell us about your app" (Overview) — OBSERVED 03:36 ET
"This is what people see in the Cherry marketplace."
Fields (top part):
- Project (dropdown, preset to the project just made)
- App name (placeholder "Coin Flip")
- One-line pitch (placeholder "Flip a coin with friends, win SOL"; max length not shown)
- Category (single-pick chips): Games · Trading · DeFi · Predictions · Launchpads · NFTs · Payments · Shopping · Rewards · Social · AI · Tools · Education · Other
- Icon (upload box; continues below the fold)
Entered: Project Launch Room · App name Launch Room · Pitch "Launch a Pump.fun coin without leaving the chat." · Category Launchpads · Icon cherry-launch-room-icon.png (= repo assets/logo.png)

## Screen 4 — wizard "List your mini app", step 2/7 · Who runs it — OBSERVED 03:39 ET
(Screen 3 = step 1/7; its lower fields after Icon not captured.)
"Users and app stores see who provides each mini app. Even without verification we need a way to reach you."
- Operated by: A company (default) | An individual
- Company fields: Registered company name · Country of registration (dropdown) · Registration number (Optional. Shown to app stores, not to users.)
- Individual fields: not yet seen
Guidance: individual unless the dev has a REGISTERED company; legal name + country = owner types them, never prefilled by agents.

## Screen 5 — step 3/7 · Where it runs — OBSERVED 03:42 ET
Page header: app name + "No review queue. Answer, integrate, pass the checks, go live." + Delete app.
"Choose chains, audiences and countries. Cherry enforces your blocked countries when someone opens the app."
Notice (VERIFIED on screen): "New apps start Unverified: up to $50 per transaction and $50 per wallet a day. Verify your identity after publishing to raise it to $1,000 and $5,000." → per-APP verification, after publishing; developer verification does not carry over.
- Chains: Solana | EVM (SOON, disabled)
- Countries you do not serve: Cuba, Iran, North Korea pre-locked ("Cherry already blocks … for every app") + search to add more → host enforces it at open; the generated integration prompt still requires blocking them inside the app too (Developer Agreement).
- Age rating: Everyone | 13+ | 18+ ("Pick 18+ for gambling-like mechanics, real-money games or mature content.")
Entered: Solana · no extra countries · 18+ (real-money memecoin launches).

## Screen 6 — step 4/7 · How you make money — OBSERVED 03:43 ET
"Cherry takes 10% of what your app earns. Earn nothing, pay nothing."
Options (single pick): Sales (10% of what users pay) · Commission (10% of your share; badge "Fits Launchpads apps"; PRESELECTED for Launchpads category) · Other (10% of your share, describe) · Free (0%, "Your app makes no money on-chain. Nothing to pay.")
- The share you keep: __ % (for Commission/Other; "Of every $100 users move through your app, how much stays with you?")
How you pay (VERIFIED on screen; differs from SDK README which said weekly): monthly bill — on the 1st you state last month's revenue through Cherry and pay 10%; wrong amount → enter the right one + why; 7 days to pay in USDC, then app pauses until paid; custom terms → team@cherry.fun.
Entered: OTHER (Commission stays preselected — tap Other), share 5 %, description says 5% of creator fees not of volume. Note: the share field's own help text measures share of volume ('Of every $100 users move through your app'); for off-app revenue, use Other + describe. (owner rulings 03:50/03:51: 5% of Pump creator fees via on-chain split, lowered from 10%; earlier plan was Free). Watch: category Launchpads auto-selects Commission — must switch.

## Screen 6b — step 4/7 with Other selected — OBSERVED 03:53 ET
- How your app makes money (text; "Describe it in a sentence or two"; example "a 2% fee on every trade plus paid boosts")
- The share you keep (optional) — "Leave it empty if your revenue doesn't come from what users move. You'll state it on the bill."
Entered: description = 5% of Pump creator fees via on-chain split, users keep 95%, no cut of in-app SOL; share = EMPTY (revenue is off-app creator fees, declared on the monthly bill).

## Screen 7 — step 6/7 · Integrate — OBSERVED 03:55 ET
(Step 5/7 not captured — Sneaks passed it without a screenshot.)
"Paste this prompt into your AI coding agent (Claude Code, Cursor, Codex). It contains everything: SDK, sign-in, wallet, limits, the domain proof and the checks. Deploy, then add the address below and try it in Cherry."
- Tabs: Prompt for your agent · Header and domain proof · Do it by hand
- Copy prompt / Download .md — app-specific integration prompt; contains a "Facts about this app" table with the App ID (52e41534-4c7b-4237-9a16-… visible, rest cut off)
- Where your app runs: URL field + Add ("Staging is fine: add more addresses later and pick the one users get when you go live")
- Automated checks: Run checks ("We load your app and legal pages the way Cherry will. Run them after deploying.")
- Automated test: Run the test ("open your app inside Cherry on a phone, as a signed-in test user… signs them in by itself and never asks to connect a wallet. About a minute. Publishing needs a pass on your current URL.")
- Back / Continue
Done now: Copy prompt → saved verbatim to cherry-launch-room docs/CHERRY_INTEGRATION.md (604e6d3). Prompt holds App ID, Project ID, tier, revenue model, blocked countries, SDK version, hosted Terms/Privacy URLs, self-check. URL / checks / test wait for Muse's preview deploy.
Skill lesson: the portal now GENERATES the integration prompt — agents should build from it (it is app-specific), not from the skill's hand-written contract alone.

## Format rule for the skill update (Sneaks 2026-11-09 03:34)
Every value Sneaks types goes in its own code block (one tap to copy), field name above it in bold. No values inline in prose.
