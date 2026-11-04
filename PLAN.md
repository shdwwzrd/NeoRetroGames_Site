# Plan

Last updated: 2026-11-04

## Goal
Self-hosted GitHub Pages site at https://neoretro.games with (1) a list of all NeoRetro games, (2) buy/download links, (3) in-browser playable demo via emulator.

## Phase 0: Repo setup
- [x] Create local repo `NeoRetroGames_Site` as sibling of game folders, branch `main`
- [x] Add `CNAME` (neoretro.games), `.nojekyll`, `README.md`
- [x] Create GitHub remote and push (https://github.com/shdwwzrd/NeoRetroGames_Site, done by owner)
- [x] Enable Pages: Settings > Pages > Deploy from branch `main` / root

## Phase 1: Storefront skeleton
- [x] `index.html`, `style.css`, `app.js` (retro look, responsive), layout modeled on https://neoretrogames.itch.io/ (no itch header)
- [x] `games.json` schema: id, title, genre, blurb, platforms, cover, price, buyUrl, downloadUrl, demoUrl (+ studio and featured blocks)
- [x] Render game cards from `games.json`
- [x] Index split into "Available" / "In Development" sections, grouped by platform; card shows platform tags
- [ ] Tiles (GBC, in development): add blurb/cover; price and links when released
- [x] Initial cards added (all "In Development", no covers/blurbs yet): Rayne the Rogue 2 (GBA, GBC, GB, Game Gear), Omega Horizon (GBA), Leanna the Lion (GB)
- [x] Playdate cards added (In Development, no covers/blurbs): CR8ZY, Spades, Omega Horizon, Rayne the Rogue 2. CR8ZY and Spades are Card
- [x] Old itch.io games removed from `games.json`; they'll be re-added later as new ports (with platforms)
- [ ] Cover images for each card: owner is collecting them (drop in `img/`, then set `cover` in `games.json`)
- [ ] Blurbs for each card; Discord URL
- [x] Pushed; site live on the github.io URL (404 gone)

## Phase 2: Browser demo
- [x] Self-host EmulatorJS v4.2.3 under `play/emulatorjs/` (no CDN dependency; cores: GB/GBC, GBA, Game Gear; ~7 MB)
- [x] Shared player `play/player.html?id=<game-id>` (replaces per-game index.html); reads `demo` from `games.json`
- [ ] Untested with a real ROM (no demo ROM yet). Test once the first demo build exists
- [ ] Add a `demo` entry per game: `"demo": { "system": "gb", "rom": "play/<id>/<file>" }` (`gb` runs GB and GBC)
- [ ] Playdate demos: EmulatorJS has no Playdate core; needs another approach
- [ ] Demo builds for each title (owner is working on these; limited content, distinct from the paid ROM); place in `play/<game-id>/`. Start with Tiles (GBC)
- [x] "Play demo" button on the game page opens the player (appears when the game has `demo`)

## Phase 3: Domain (deferred: running on default github.io URL until the domain is ready; CNAME file removed, re-add it then)
- [ ] DNS at registrar: 4 A records (185.199.108-111.153), optional AAAA, `www` CNAME to `<user>.github.io`
- [ ] Set custom domain in Pages settings, wait for DNS, tick Enforce HTTPS

## Phase 4: Selling
- [ ] Pick payment/delivery platform (see DECISIONS.md, open)
- [ ] Add buy links per game; keep full ROMs off this repo

## Phase 5: More games
- [ ] Add remaining games from sibling folders (Spades, Rayne 2 Ports, Pico-8 titles, OmegaHorizon, CR8ZY, ...) and their per-console ports
