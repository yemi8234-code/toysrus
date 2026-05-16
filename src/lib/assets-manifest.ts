// Asset manifest: flip flags to true once the user drops files into public/
// This prevents Remotion from erroring when MP3 / video assets are missing.

export const ASSETS = {
  audio: {
    narratorLeoPart1: false,
    narratorLeoPart2: false,
    narratorDmitry: false,
    musicAct1: false,
    musicAct2: false,
    musicAct3: false,
    musicAct4: false,
  },
  sfx: {
    whooshSoft: false,
    whooshImpact: false,
    deepImpact: false,
    paperRustle: false,
    chimeSoft: false,
    lowRumbleLoop: false,
    glassShatter: false,
    cinematicRiserLong: false,
    coinDrop: false,
    boomFinal: false,
  },
  music: {
    act1: false,
    act2: false,
    act3: false,
  },
  showSfxMarkers: true,
  showBrollPlaceholders: true,
} as const;

export const AUDIO_PATHS = {
  narratorLeoPart1: 'audio/narrator-leo-part1.mp3',
  narratorLeoPart2: 'audio/narrator-leo-part2.mp3',
  narratorDmitry: 'audio/narrator-dmitry.mp3',
  musicAct1: 'audio/music/act1.mp3',
  musicAct2: 'audio/music/act2.mp3',
  musicAct3: 'audio/music/act3.mp3',
  musicAct4: 'audio/music/act4.mp3',
} as const;
