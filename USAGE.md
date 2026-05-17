# Toys R Us Documentary — Build Guide

A 17:52 documentary on the fall of Toys R Us, built in Remotion. Magnates-Media-style: cinematic 3D + 2D motion graphics, narration-driven, with visual emphasis on hard numbers and emotional beats.

## What's built

- **17:52 / 32,173 frames @ 1920×1080 @ 30fps** — duration auto-derived from the two SRT files
- **75+ scene sequences** anchored to SRT cue timestamps
- **Reusable design system**: 7 transitions, 9 motion graphics, 6 3D scenes, 5 cinematic overlays
- **Cinematic polish layer**: film grain, vignette, color grade, chromatic aberration, optional letterbox
- **IP-safe**: generic letterforms, brand-neutral 3D primitives, no real logos modeled

## Getting started

```bash
npm install
npm run dev        # Remotion Studio at http://localhost:3000
```

Preview / render commands:

```bash
# 30-second preview
npm run preview

# Full 17:52 doc, h264, YouTube-ready
npm run build

# Specific frame ranges
npx remotion render src/index.ts ToysRUsDoc out/section.mp4 --frames=1500-3000
```

## Dropping in assets

All assets are **optional** — the doc renders end-to-end with labeled placeholders, so you can sequence and time everything before sourcing media.

### Audio (the priority)

Drop into `public/audio/`:

| File | Purpose |
|------|---------|
| `narrator-leo-part1.mp3` | First TTS stem (cold open through Act I) |
| `narrator-leo-part2.mp3` | Second TTS stem (Act II + Act III) |
| `music/act1.mp3` | Underscore for cold open + Act I |
| `music/act2.mp3` | Underscore for Act II |
| `music/act3.mp3` | Underscore for Act III |
| `music/act4.mp3` | End-card music tail |

Music vendors: Artlist, Epidemic Sound, Musicbed. Aim for cinematic underscore with sub-bass presence.

When files are in place, flip the relevant flag in `src/lib/assets-manifest.ts`:

```ts
export const ASSETS = {
  audio: {
    narratorLeoPart1: true,  // ← flip these as you drop files
    narratorLeoPart2: true,
    musicAct1: true,
    ...
  },
  ...
};
```

### B-roll & stills

Placeholders show you exactly what to source. Each placeholder is labeled with:
- The **description** (what the shot should be)
- The exact **asset path** to drop the file at
- The intended **duration**

Look for the pulsing dashed border in the studio preview — every placeholder shows the path it expects, e.g. `public/broll/act1/fluorescent-aisle.mp4`.

Drop locations:
- `public/broll/act1/` — childhood/empire content
- `public/broll/act2/` — Wall Street / buyout / decline content
- `public/broll/act3/` — bankruptcy / liquidation content
- `public/stills/` — archival photos (Lazarus, baby boom, etc.)

Once dropped, replace the corresponding `<BrollPlaceholder>` invocation with `<OffthreadVideo src={staticFile('broll/act1/fluorescent-aisle.mp4')} />` or `<Img src={staticFile('stills/lazarus-portrait.jpg')} />` — wrapped in `<KenBurns>`.

### Sound effects

Drop into `public/sfx/`. The studio shows yellow `SFX: filename @ frame N` tags wherever sound effects should fire. Source from:
- [freesound.org](https://freesound.org) (free, CC)
- [zapsplat.com](https://zapsplat.com) (free, account)
- Envato cinematic SFX pack (~$30)

Required library:
- `whoosh-soft.wav` — cross-dissolves
- `whoosh-impact.wav` — whip pans / zoom-throughs
- `deep-impact.wav` — stat hammer slams
- `paper-rustle.wav` — chapter cards
- `chime-soft.wav` — lower thirds
- `low-rumble-loop.wav` — Act II buyout sequence
- `glass-shatter.wav` — Amazon deal break, era-end
- `cinematic-riser-long.wav` — Act III build
- `coin-drop.wav` — money-drain particles
- `boom-final.wav` — end-card slam

Once dropped, replace the `<SfxMarker>` invocations in scenes with `<Audio src={staticFile('sfx/whoosh-soft.wav')} />` inside the relevant Sequence.

## Folder layout

```
src/
├── Root.tsx                        # registers the ToysRUsDoc composition
├── index.ts                        # remotion entry
├── compositions/ToysRUsDoc.tsx     # top-level composition
├── scenes/
│   ├── act0/Act0ColdOpen.tsx       # cues 1-19, ~0:00-0:50
│   ├── act1/Act1Empire.tsx         # cues 20-225, ~0:50-9:21
│   ├── act2/Act2WallStreet.tsx     # part2 cues 1-94, ~9:21-13:30
│   └── act3/Act3Fall.tsx           # part2 cues 95-195 + end card
├── components/
│   ├── 3d/                         # TitleCard3D, FloatingToy, DebtCrushBoxes,
│   │                               # MoneyDrain, StoreCollapse, DataOrb
│   ├── motion-graphics/            # StatHammer, Timeline, MarketShareDonut,
│   │                               # RevenueDebtChart, LBOStructure, etc.
│   ├── transitions/                # CrossDissolve, WhipPan, ZoomThrough,
│   │                               # MatchCut, LightLeak, BlurFade, GlitchCut
│   ├── overlays/                   # FilmGrain, Vignette, ColorGrade,
│   │                               # ChromaticAberration, Letterbox
│   ├── captions/                   # CaptionEmphasis, LowerThird, SourceTag
│   ├── audio/                      # NarrationBed, MusicBed (with ducking)
│   └── placeholders/               # BrollPlaceholder, SfxMarker
├── lib/
│   ├── design-tokens.ts            # colors, type, sizes
│   ├── motion-tokens.ts            # springs, timing constants
│   ├── srt-parser.ts               # SRT → frame-accurate cues
│   ├── timing.ts                   # merged cue table + act boundaries
│   ├── scene-utils.tsx             # KenBurns helper, cueStart/cueEnd
│   └── assets-manifest.ts          # toggle flags when assets are dropped
└── data/srt/                       # source SRT files as .ts modules
```

## Scene timing primer

Every scene anchors to SRT cue boundaries via `cueStart(N)` / `cueEnd(N)`, where N is the 1-based index into the merged cue list. The first 225 cues are part 1 (cold open + Act I), and `225 + N` is the part-2 lookup (offset stored as `P2 = 225` inside scene files).

To shift a beat, just adjust the entry/exit cue indices or the +/- frame pad — everything downstream re-anchors automatically.

## Tuning the doc

**Cut faster** — drop the `+8` / `-8` pads on cue boundaries to make scenes cut harder on cue starts.

**Add a beat** — insert a new `<Sequence from={...} durationInFrames={...}>...</Sequence>` in the relevant act file. Use `cueStart(X)` for absolute anchoring.

**Change a transition** — wrap the inner content in a different transition component from `src/components/transitions/`.

**Modify a 3D scene** — see `src/components/3d/`. Each scene includes a slow camera dolly or orbit driven by `useCurrentFrame` so motion is intrinsic.

**Adjust music ducking** — see `MusicBed` in `src/components/audio/NarrationBed.tsx`. Volume is a function of frame; extend it to read narration presence via `findCueAtFrame(ALL_CUES, frame)`.

## Render quality

Default `--crf=18` is YouTube-ready. For sharper master:

```bash
npx remotion render src/index.ts ToysRUsDoc out/master.mp4 --codec=h264 --crf=14
```

For maximum quality (ProRes):

```bash
npx remotion render src/index.ts ToysRUsDoc out/master.mov --codec=prores --prores-profile=4444
```

## Known production gaps

These need user action:

1. **Audio stems** — TTS narration MP3s aren't checked in. The two SRT files are; flip `assets-manifest` flags once you drop the MP3s.
2. **B-roll footage** — every scene shows a labeled placeholder describing what to source.
3. **Music beds** — four cues needed (Act I, II, III, end card tail). Sourced from any cinematic library.
4. **SFX library** — 10 files listed above. Drop and wire into `<Audio>` mounts.
5. **Narration extension** — the SRTs cover ~14:50. The spec called for 15-20 min total. If you extend the narration, add more SRT cues and the scene composition will auto-extend; you'll just need new scenes for any new content blocks.

## IP safety

This documentary is built to be safe for fair-use documentary release. Specifically:
- The Toys R Us **name** is used (documentary subject — fair use)
- No real Toys R Us **logo** is modeled (3D primitives only)
- Geoffrey the Giraffe is **referenced** ("the mascot in the crate") but not **rendered**
- Investor names (Bain, KKR, Vornado) are stated in 2D type — documentary fact, no logos modeled
- Amazon and Bezos are similarly referenced verbally / typographically only
- All b-roll placeholders explicitly call for "brand-neutral" footage

Replace any user-sourced assets that depict real branded products with neutral alternatives.
