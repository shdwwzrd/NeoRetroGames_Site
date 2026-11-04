# Plan

Last updated: 2026-11-04

## Goal
Self-hosted GitHub Pages site at https://neoretro.games with (1) a list of all NeoRetro games, (2) buy/download links, (3) in-browser playable demo via emulator.

## Phase 0: Repo setup
- [x] Create local repo `NeoRetroGames_Site` as sibling of game folders, branch `main`
- [x] Add `CNAME` (neoretro.games), `.nojekyll`, `README.md`
- [x] Create GitHub remote and push (https://github.com/shdwwzrd/NeoRetroGames_Site, done by owner)
- [ ] Enable Pages: Settings > Pages > Deploy from branch `main` / root

## Phase 1: Storefront skeleton
- [x] `index.html`, `style.css`, `app.js` (retro look, responsive), layout modeled on https://neoretrogames.itch.io/ (no itch header)
- [x] `games.json` schema: id, title, genre, blurb, platforms, cover, price, buyUrl, downloadUrl, demoUrl (+ studio and featured blocks)
- [x] Render game cards from `games.json`
- [ ] First entry: 2026 Tiles (confirm title/blurb/price; currently a placeholder with no links)
- [ ] Add cover images, blurbs, platforms for the 8 itch.io games; Discord URL
- [ ] Push and verify the 404 is gone on the github.io URL

## Phase 2: Browser demo
- [ ] Self-host EmulatorJS under `play/emulatorjs/` (no CDN dependency)
- [ ] `play/<game-id>/index.html` loads emulator + demo ROM
- [ ] Build a distinct demo ROM (limited content) for 2026 Tiles; place in `play/tiles/`
- [ ] "Play demo" button on card opens player (iframe/modal)

## Phase 3: Domain (deferred: running on default github.io URL until the domain is ready; CNAME file removed, re-add it then)
- [ ] DNS at registrar: 4 A records (185.199.108-111.153), optional AAAA, `www` CNAME to `<user>.github.io`
- [ ] Set custom domain in Pages settings, wait for DNS, tick Enforce HTTPS

## Phase 4: Selling
- [ ] Pick payment/delivery platform (see DECISIONS.md, open)
- [ ] Add buy links per game; keep full ROMs off this repo

## Phase 5: More games
- [ ] Add remaining games from sibling folders (Spades, Rayne 2 Ports, Pico-8 titles, OmegaHorizon, CR8ZY, ...) and their per-console ports
