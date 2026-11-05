# Notes

## Environment
- Windows 11, VS Code, PowerShell. GitHub user: `shdwwzrd`. `gh` CLI is NOT installed (as of 2026-11-04).
- Sibling folders in `..\`: 2020_OmegaHorizon, 2022_OmegaHorizon2, 2023_CR8ZY, 202601_Yatzy_Pico8, 202603_OmegaHorizon1_Pico8, 202604_RayneTheRogue_Pico8, 202605_PirateDice_Pico8, 2026_Rayne_2_Ports, 2026_Spades, 2026_Tiles, Piskel-0.14.0 (sprite tool).

## itch.io reference (neoretrogames.itch.io, fetched 2026-11-04)
- Layout: studio header + Follow, platform tagline, Discord banner, featured "Games for Thumby" bundle ($2), grid of 8 cards (cover, title, genre).
- Games: Rayne the Rogue 2, Rayne the Rogue, Yatzy (play in browser), Omega Horizon, Leanna the Lion, Siege, Cutie Critters, Kooky Kookies.
- Colors/fonts/prices/platforms per game weren't retrievable; the site's theme is our own dark retro style.

## GitHub Pages facts
- Static only. Limits: 1 GB site, 100 MB per file. GBC ROMs are tiny, so not a concern.
- Custom domain DNS: A records 185.199.108.153, .109.153, .110.153, .111.153; AAAA 2606:50c0:8000-8003::153; `www` CNAME to `<user>.github.io`. Re-check GitHub docs, IPs can change.
- `CNAME` file must stay in repo root or the domain setting resets on deploy.
- Pages can't set custom headers, so avoid emulator builds that need COOP/COEP (threaded WASM). Use the single-thread build or the `coi-serviceworker.js` shim.

## Emulator notes
- EmulatorJS: self-host the `data/` folder; configure core per console (gb/gbc, gba, nes, snes, ...). Pico-8 titles are different: use Pico-8's own HTML export instead of an emulator.
- Binjgb / WasmBoy are lighter GBC-only alternatives.

## Sketch: games.json entry
```json
{
  "id": "tiles",
  "title": "Tiles",
  "status": "development",  // "available" (default) or "development"
  "blurb": "",
  "platforms": ["GBC"],
  "cover": "img/tiles.png",
  "price": "",
  "buyUrl": "",
  "downloadUrl": "",
  "demoUrl": "play/tiles/"
}
```

## Copy workflow
- Write each game's `blurb` (card + top of page) and `description` (game page, paragraphs separated by a blank line) in `COPY.md`, then run `tools\apply-copy.bat`. It writes them into `games.json` (keeps the one-line-per-game layout, validates JSON before saving) and adds a stub section to COPY.md for any game in `games.json` that has none. Empty sections are skipped, so existing text is never blanked.
- Description formatting: blank line = new paragraph, `## Heading`, `- ` bullet lists, `**bold**`. Stored in `games.json` as an array of blocks (paragraph string, `"## Heading"`, or `"- a\n- b"` list); `game.js` renders them with DOM nodes (no innerHTML).
- Screenshots: put images in `img/shots/<game-id>/` (names: letters, digits, `_ . -` only; sorted numerically, so `1_title.png`, `2_story.png`, ...). `tools\apply-copy.bat` lists them in each game's `screenshots` array; the game page shows them as a gallery (click to open full size).
