# Handoff — muse · muse-socials (Farcaster Phase 1) · 2026-10-25 11:08 ET

## Did
- VERIFIED: Muse's own Farcaster account is LIVE — **@museagent**, FID **3356746**, display name "Muse", bio states AI agent plainly. Profile: https://farcaster.xyz/museagent
- VERIFIED: first cast posted and confirmed on the network: https://farcaster.xyz/~/conversations/0x5d748caf3f6c2a7beeaa853b5ea8d3ee3473820a
- VERIFIED funding chain: Sneaks approved the Base-gas bridge in chat (10:16 ET) and chose the programmatic route over his app-only referral code (10:20 ET). Study wallet → Relay SOL→ETH on Base, tx 2GbNUW6Sbh91KB3bCNc5ftMaCR7HEFSk45WufCx47wQJ2hjabBkUJADAToUpk3Y31ARUJDYdQG3mkfprwumisTaA (0.008377 SOL → 0.000351 ETH); USDC swap output unwrapped from WETH (tx 0x166917af…); Relay Base→Optimism deposit tx 0xc81db813d38616e836c7fe20373ce25d92b85659f4c13ddce6534f2c954f2ebf (0.001041 ETH landed on OP).
- VERIFIED on-chain: FID registration tx 0x6dc0c376b6c7d9b1139281ef17a2d5cdebfb02d65f26638da952511aba1dc12a (price 0.0000848 ETH); active signer added tx 0x56409011fac2356c5b315ce1212a35f7de6fc9bd122fd7dc41477ef224fbc35e; fname @museagent activated (fname transfer 1459362).

## State + proof
- Custody: burner 0xaBDA1E75c7A5AC7F0088780905A650Abd8f2A46E. Credentials at ~/.config/muse-socials/farcaster-credentials.json (mode 600). NEVER run the skill's credentials.js `get` (prints keys).
- Balances left: Base ETH 0.000121 · OP ETH 0.000956 · Base USDC 0.00. Study wallet remainder 890,880 lamports (rent-exempt; sweep-back default stands).
- Hub writes via Neynar x402 cost 0.01 USDC each — USDC is at 0, so further casts/follows pause until a small USDC top-up (Sneaks's funding call) or a free public-hub submit path is wired.
- Skill defects found and worked around (vendored farcaster-agent): (1) Across depositV3 called with inputToken address(0) reverts for native ETH — bypassed by bridging via Relay; (2) USDC→ETH swap leaves WETH unwrapped — unwrapped manually; (3) Neynar x402 terms stale (payTo + 0.001 USDC) — config.js patched 2026-10-25 to the server's current terms (0.01 USDC).
- OPEN ITEM (security hygiene, low risk): the skill's add-signer logging printed signer #1's private key once inside Muse's own session log. Signer was rotated — signer #2 is the active credential — but KeyGateway.remove() for signer #1 reverts on-chain (KeyRegistry still shows it Added). It was never published anywhere; closing it needs a different removal path or an account reset, Sneaks's call.

## Decided
- Referral code J56-ZIU (Sneaks's) was NOT used for the signup — app-only mechanic; Sneaks chose the programmatic route 2026-10-25 10:20 ET. Code saved in the Halfmoon referral registry (entry 7).
- Next per Sneaks (10:21 ET): build a real presence, gather ecosystem intel, report alpha vs bullshit back to him, and work referrals from the account — all inside Phase 1 content rules (verified achievements only, AI agent stated, no bulk follows/likes, no first-move DMs).

## Don't
- No Phase 2 (X/IG/TikTok/YouTube/Facebook) until Sneaks creates those accounts and hands over API keys via secure input.
- No trades from this account, ever — content only.
