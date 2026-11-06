# Game copy

Write the card/page text here, then double-click `tools\apply-copy.bat` to copy it into `games.json`.

Rules (so the script can read this file):
- Each game starts with `## <game-id>`. The id must match `games.json` exactly. Don't rename these lines.
- Under it, write `### blurb` and/or `### description`.
- **blurb**: 1-2 sentences, shown on the card and at the top of the game page. Plain text on one line (or several lines; they're joined).
- **description**: longer text for the game page. Separate paragraphs with a blank line.
- Leave a section empty to leave that game's existing text alone. Text you write replaces what's in `games.json`.
- Formatting in a **description** (the blurb is plain text):
  - A blank line starts a new paragraph. Lines with no blank line between them are joined into one paragraph.
  - `## Heading` on its own line makes a subheading.
  - Lines starting with `- ` make a bullet list (keep the bullets together, no blank lines between them).
  - `**bold**` makes bold text.
  - A leading `> ` on lines is ignored, so text pasted from a quoted block still works.
- Quotes and accents are fine.
- `<!-- comments like this -->` are ignored.

---

## tiles-gbc
<!-- Tiles (GBC) -->
### blurb

### description


## rayne-the-rogue-2-gba
<!-- Rayne the Rogue 2 (GBA) -->
### blurb

### description


## rayne-the-rogue-2-gbc
<!-- Rayne the Rogue 2 (GBC) -->
### blurb

### description


## rayne-the-rogue-2-gb
<!-- Rayne the Rogue 2 (GB) -->
### blurb
A maze-chase action roguelike for the original Game Boy. Die, spend your coins in the shop, and try again until you reach the magic lamp.
### description
After barely escaping the dragon's lairs, Rayne travelled the world in search of the next big adventure. Then came a rumour of a magic lamp hidden deep in a castle, guarded by vicious creatures that hunt down any interloper. Help Rayne find a way through the castle and avoid the beasts to reach the lamp.

Rayne the Rogue 2 is a fast, Pac-Man-style maze chase wrapped in a roguelike. You start each run with very little. Collect the treasure on every level, dodge the four castle wolves, and push as deep as you can. When you fall, you go back to the shop and spend the coins you collected on new skills, so your next run goes further. The goal is level 20, where the magic lamp is waiting.

## Features
- **Four castle wolves**, each with its own way of hunting you: one chases, one ambushes, one flanks, one keeps its distance. They scatter, chase and flee in waves, and get faster as the levels climb.
- **Potions**: fire (scares and burns the wolves), invisibility, speed and illusion (a decoy that pulls the wolves away).
- **Rings** you find and equip, with a few charges each: invisibility, illusion, speed and fire.
- **Traps** from level 5 on: cold traps slow you, freeze traps stop you in place, bomb traps hurt. Sense and disarm them with the right skill.
- **The shop**: spend coins on Magic Shield, Luck, Resistance and Sense and Disarm.
- **Treasure** on every level, with pearls, rubies and amethysts when your luck is high.
- **Relics**: the harp, the candelabra, the diamond, the dragon egg and the four magic rings. Each one can only be found once, so hunt them all down.
- **Three save files** kept in the cartridge's battery-backed RAM. Your coins, upgrades and relics carry over between runs.

## Now on Game Boy

This is the full story mode on the original Game Boy (DMG): the same castle, shop and 20 levels, drawn in the four shades of the Game Boy screen. It is a 128 KB ROM with battery-backed saves.

- **Original Game Boy**: play it on a flash cart (EverDrive, EMS, GB Flash...). It was tested on a real DMG from the first level to the lamp.
- **Emulators**: mGBA, SameBoy, BGB, Emulicious and other Game Boy emulators.
- It should also run on Game Boy Pocket, Color and Advance (not tested yet).
- Story mode only: there is no separate arcade mode in this version.

## Controls
- **D-pad**: move (Rayne keeps going in the last direction)
- **A**: left ring / confirm
- **B**: right ring / back
- **START**: pause
- **SELECT**: delete a save file on the file list


## rayne-the-rogue-2-arcade-gb
<!-- Rayne the Rogue 2: Arcade Version (GB) -->
### blurb

### description


## rayne-the-rogue-2-gg
<!-- Rayne the Rogue 2 (Game Gear) -->
### blurb

### description


## rayne-the-rogue-2-playdate
<!-- Rayne the Rogue 2 (Playdate) -->
### blurb

### description


## omega-horizon-gba
<!-- Omega Horizon (GBA) -->
### blurb

### description


## omega-horizon-playdate
<!-- Omega Horizon (Playdate) -->
### blurb

### description


## cr8zy-playdate
<!-- CR8ZY (Playdate) -->
### blurb

### description


## spades-playdate
<!-- Spades (Playdate) -->
### blurb

### description


## leanna-the-lion-gb
<!-- Leanna the Lion (GB) -->
### blurb
Leanna may be a lion, but she knows what she wants: fresh meat from her favorite restaurant. The zoo had to close!
### description
> Run through the restaurant, eat everything that walks past and don't get eaten, trampled, caged or tranquilized.
> Short, fast arcade rounds for when you have a few minutes. Beat your best score and put your initials on the board.
>
> ## Now on Game Boy
>
> The Game Boy (DMG) version is a full 4-lane port with a title screen, a story intro, a saved top 8 with 3-letter
> initials like an old arcade cabinet, and sound on/off. It is a 32 KB ROM.
>
> - **Original Game Boy**: play it on a flash cart (EverDrive, EMS, GB Flash...). It was tested on a real DMG.
> - **Emulators**: mGBA, SameBoy, BGB, Emulicious and other Game Boy emulators.
> - It should also run on Game Boy Color and Advance in compatibility mode (not tested yet).


