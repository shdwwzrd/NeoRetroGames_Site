# EmulatorJS (self-hosted)

- Source: https://github.com/EmulatorJS/EmulatorJS, stable v4.2.3, files fetched from https://cdn.emulatorjs.org/stable/data/ on 2026-11-04.
- Included: `loader.js`, `emulator.min.js/.css`, `compression/`, `localization/en-US.json`, and three cores (normal + `-legacy` WebGL1 builds, single-threaded):
  - `gambatte` (GB / GBC, system `gb`)
  - `mgba` (GBA, system `gba`)
  - `genesis_plus_gx` (Game Gear, system `segaGG`)
- To add a system, download its `cores/<core>-wasm.data` (and `<core>-legacy-wasm.data`) from the same CDN path into `data/cores/`.
- Licenses: EmulatorJS is GPL-3.0. Each core has its own license (e.g. Genesis Plus GX has a non-commercial clause; review before relying on it for a commercial site).
- Used via `play/player.html?id=<game-id>`.
