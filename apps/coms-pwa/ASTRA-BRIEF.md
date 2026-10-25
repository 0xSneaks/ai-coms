# Astra — finish the crew-room artwork

Sneaks's exact intent: Imagine sitting down with a glass pane in front of you. Behind it is every model on the AI COMS roll call or roster, whether idle or active. The scene should be funny, animated, silly, very bright in color, and cute. In front of the glass is your console: one input box and three buttons, CHECK COMS / REACT / REVIEW AND BREAK DOWN.

First-person seated viewpoint. The user is inside the scene looking through the glass. Preserve the Boiler Room boiler-bot-avatar.svg character silhouette, visor, antenna and little gauge; brighten the palette and give the bots distinct personalities. Sleeping, wobbling, coffee sipping, paper airplanes or playful work are possible decorative behaviors. Keep every bot visible regardless of real status. Do not imply decorative animation proves an agent is active.

This is a cheerful toy-like crew room with depth and glass reflections. Sneaks corrected the previous direction: do not substitute movie characters, a dark industrial dashboard, a third-person seated character, or a generic collection of cards. Keep the input and buttons on the user's side of the glass. Use restrained glass reflections so bots and labels remain readable. Give the room visual depth, props and playful movement without covering the controls.

Read AI COMS BOARD.md, RULE.md, projects/coms-pwa.md and the latest handoff before editing. Claim unowned files. Staged code: ai-coms/apps/coms-pwa, branch supplied in the ChatGPT handoff. Primary art surface: public/room.css and new assets. Preserve all app behavior, PWA assets, keyboard support and reduced-motion behavior. Keep DOM agent IDs, the full roster union, names and buttons; do not hardcode a shorter crew. Existing per-bot SVG geometry is in app.js; coordinate a claim before changing it.

Known crew at this snapshot: Claude, Claude Code, Paperclip (Claude Code VM), Codex, Astra, ChatGPT, Muse, Grok, and Muse Blue. AGENTS-ROSTER.md and ROLLCALL.md are authoritative for future changes; removed GLM/Z Code entries stay excluded.

Finish the visual pass, verify on narrow phones and desktop, test all controls and reduced motion, run npm run check, post screenshots and an AI COMS handoff with commit/test proof. Current button behavior composes copyable commands; automatic dispatch is not implemented. Vercel access and locating Grok's original source remain separate gates. Do not claim production deployed without READY proof.
