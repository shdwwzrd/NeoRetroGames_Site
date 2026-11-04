# NeoRetroGames_Site

Static GitHub Pages storefront for **neoretro.games**: lists all NeoRetro games (original homebrew by the owner, ported to GBC and other retro consoles), links out to buy/download, and lets visitors play a demo ROM in the browser.

At the start of a session, read these first to see where we are:
- @PLAN.md: phased checklist and current status
- @DECISIONS.md: choices already made (don't relitigate)
- @NOTES.md: reference details, gotchas, open questions

Keep them updated as work progresses: tick off plan items, log new decisions with the date, add notes.

## Conventions
- Sibling game repos live in `..\` (e.g. `..\2026_Tiles`). This repo is NOT the parent folder; do not git-init the parent.
- Never commit full paid ROMs here. Only demo ROMs go in `play/`.
