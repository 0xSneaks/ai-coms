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
- Countries you do not serve: Cuba, Iran, North Korea pre-locked ("Cherry already blocks … for every app") + search to add more → apps no longer need their own CU/IR/KP geoblock code; host enforces it.
- Age rating: Everyone | 13+ | 18+ ("Pick 18+ for gambling-like mechanics, real-money games or mature content.")
Entered: Solana · no extra countries · 18+ (real-money memecoin launches).

## Screen 6 — step 4/7 · How you make money — OBSERVED 03:43 ET
"Cherry takes 10% of what your app earns. Earn nothing, pay nothing."
Options (single pick): Sales (10% of what users pay) · Commission (10% of your share; badge "Fits Launchpads apps"; PRESELECTED for Launchpads category) · Other (10% of your share, describe) · Free (0%, "Your app makes no money on-chain. Nothing to pay.")
- The share you keep: __ % (for Commission/Other; "Of every $100 users move through your app, how much stays with you?")
How you pay (VERIFIED on screen; differs from SDK README which said weekly): monthly bill — on the 1st you state last month's revenue through Cherry and pay 10%; wrong amount → enter the right one + why; 7 days to pay in USDC, then app pauses until paid; custom terms → team@cherry.fun.
Entered: OTHER, share 10 % (owner ruling 03:50: 10% of Pump creator fees via on-chain split; earlier plan was Free). Watch: category Launchpads auto-selects Commission — must switch.

## Format rule for the skill update (Sneaks 2026-11-09 03:34)
Every value Sneaks types goes in its own code block (one tap to copy), field name above it in bold. No values inline in prose.
