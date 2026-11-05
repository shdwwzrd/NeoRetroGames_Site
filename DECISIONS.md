# Decisions

## 2026-11-04
- **Hosting:** GitHub Pages (static), custom domain `neoretro.games`, served from repo root. 
- **Repo location:** `NeoRetroGames_Site`, a sibling of the game folders inside `NeoRetroGames_2026\`. The parent is not a git repo and stays that way, so existing game repos aren't nested.
- **Catalog:** data-driven via `games.json`, rendered client-side by `app.js`. No build step / framework.
- **Demo player:** in-browser emulator (EmulatorJS preferred, self-hosted). Games are ROMs (GBC and other retro consoles), so engine web exports don't apply.
- **ROM policy:** all games are the owner's original homebrew (rights are clear). Only distinct, limited **demo ROMs** are public in this repo; full paid ROMs are delivered via checkout, never committed here.
- **Purchase/download:** external links, since Pages can't process payments or gate files.

- **Interim URL (2026-11-04):** neoretro.games isn't ready to be repointed, so the site runs on the default `https://shdwwzrd.github.io/NeoRetroGames_Site/` for now. `CNAME` removed from the repo; re-add it (plus DNS, Phase 3) when ready. Because it's a project site served from a subpath, use **relative paths** for all assets and links.

- **Per-game pages (2026-11-04):** each card links to `game.html?id=<id>` (one template, rendered from `games.json`, no build step). The page offers Play demo, Download demo, and Buy buttons; each only shows if its URL is set. Buy goes to an external processor that delivers the file to the buyer by email (platform still open below).

- **Index sections (2026-11-04):** games have a `status` ("available" default, or "development"). Index shows Available then In Development, each grouped under platform headings; a multi-platform game appears under each of its platforms. Games with no `platforms` group under "Other". The game is titled "Tiles" (folder is still `2026_Tiles`); first release is GBC. Featured-bundle block was dropped; may return later as its own block.

- **Itch.io games dropped (2026-11-04):** the 8 legacy itch.io listings were removed from `games.json`; they'll return later as new ports. The only entry for now is Tiles (GBC, in development), so the Available section stays hidden until a game ships.

- **Platform filter (2026-11-04):** a button bar under the header ("All" default plus one button per platform found in `games.json`) narrows the index to one platform. Client-side only; resets on reload.

- **One entry per platform port (2026-11-04):** a game released on several platforms gets a separate `games.json` entry per platform (same title, id like `rayne-the-rogue-2-gba`, one platform each) since ports differ in price, demo, download and art. Rayne the Rogue 2 is split into GBA, GBC, GB, Game Gear.

- **Emulator setup (2026-11-04):** EmulatorJS v4.2.3 self-hosted in `play/emulatorjs/data/` with only the cores we need (not the 300 MB full package); single-threaded builds, so no COOP/COEP headers are needed. One shared `play/player.html?id=<id>`; a game opts in with a `demo` object in `games.json`. Demo ROMs live in `play/<id>/`. See `play/emulatorjs/README.md` for licensing caveats.

- **Browser play is optional (2026-11-04):** the downloadable demo is the baseline for every game (customers play it on an emulator, real console or flash cart). In-browser play is a bonus only where the emulator works (GB/GBC/GBA, maybe Game Gear); if a game can't be run in the browser it simply has no Play button. Playdate titles are download-only unless an easy browser option turns up.

## Open
- Payment/delivery platform: itch.io (easiest) vs Stripe Payment Link / Gumroad / Lemon Squeezy.
- GitHub repo name/remote (proposed `NeoRetroGames_Site`) and whether `gh` gets installed.
- Which game is first on the site (assumed 2026_Tiles) and its demo ROM.
