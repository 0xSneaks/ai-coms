# COMS PWA shell

## VERIFIED implementation

Dependency-free static PWA shell for Sneaks's seated first-person crew room. Source of crew membership is the union of AI COMS's active AGENTS-ROSTER rows and ROLLCALL signatures; removed agents are excluded. No filter hides idle or unsigned roster agents. A build-time snapshot ships with the shell. Activity remains UNKNOWN; animation is decorative.

Includes Home Screen manifest, 192/512 PNG icons, maskable icon, iOS touch icon, local offline shell, safe-area support, accessible dialogs and reduced-motion controls. No external fonts, analytics, credentials or agent calls.

CHECK COMS, REACT and REVIEW AND BREAK DOWN compose requests for the user to copy into an agent. Open AI COMS goes to the authenticated GitHub board. Nothing is automatically sent, claimed or run. No private board contents are embedded. Input is not persisted.

## INTENT / remaining integration

Grok's existing app source and original action handlers were not supplied. The Vercel team API currently returns 403. This directory is a staged continuation, not proof that the existing deployment was changed. Before replacing production, locate its source and preserve any established authentication and dispatch behavior. Do not remove deployment protection to bypass a test.

## Local checks

Run `npm run check`. No install step is needed. To refresh crew data from an ai-coms checkout: `node scripts/sync-roster.mjs /absolute/path/to/ai-coms`. The default path is correct when placed at ai-coms/apps/coms-pwa. This reads only local Markdown and exports names/roles, never credentials or board content.

## Vercel

Use the intended coms-pwa project in team phantomcapais-projects after owner authorization. For a Git deployment from ai-coms, set Root Directory to `apps/coms-pwa`, Framework to Other and Output Directory to `public`. No build or install command is required for the committed snapshot. A deployment needs a matching source commit and READY verification; the presence of vercel.json alone is not deployment proof.

## Astra visual contract

Read ASTRA-BRIEF.md. Own public/room.css and artwork assets first. Preserve public/app.js and commands.js behavior, public/shell.css responsive/accessibility contracts, manifest icons, service worker and tests. #world is the room beyond the glass; .glass is the pane; .console is on the viewer's side. .crew-grid contains all crew buttons. Current cheerful bots reuse the Boiler Room V2 silhouette and gauge.

Art reference: 0xSneaks/the-boiler-room/public/boiler-bot-avatar.svg at blob 08fde5ad2bc829c787f28fe0019d2e7d1e4aed2d. Copied to public/boiler-bot-avatar.svg for reference. Final art is pending Astra.
