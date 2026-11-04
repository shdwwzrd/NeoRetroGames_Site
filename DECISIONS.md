# Decisions

## 2026-11-04
- **Hosting:** GitHub Pages (static), custom domain `neoretro.games`, served from repo root. 
- **Repo location:** `NeoRetroGames_Site`, a sibling of the game folders inside `NeoRetroGames_2026\`. The parent is not a git repo and stays that way, so existing game repos aren't nested.
- **Catalog:** data-driven via `games.json`, rendered client-side by `app.js`. No build step / framework.
- **Demo player:** in-browser emulator (EmulatorJS preferred, self-hosted). Games are ROMs (GBC and other retro consoles), so engine web exports don't apply.
- **ROM policy:** all games are the owner's original homebrew (rights are clear). Only distinct, limited **demo ROMs** are public in this repo; full paid ROMs are delivered via checkout, never committed here.
- **Purchase/download:** external links, since Pages can't process payments or gate files.

## Open
- Payment/delivery platform: itch.io (easiest) vs Stripe Payment Link / Gumroad / Lemon Squeezy.
- GitHub repo name/remote (proposed `NeoRetroGames_Site`) and whether `gh` gets installed.
- Which game is first on the site (assumed 2026_Tiles) and its demo ROM.
