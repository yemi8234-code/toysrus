import {parseSrt, type SrtCue} from './srt-parser';
import {FPS} from './motion-tokens';

import leoPart1Raw from '../data/srt/leo-part1';
import leoPart2Raw from '../data/srt/leo-part2';

const OPENING_BREATH_FRAMES = Math.round(2 * FPS);
const END_CARD_FRAMES = Math.round(4 * FPS);
const GAP_BETWEEN_PARTS_FRAMES = Math.round(0.5 * FPS);

const part1Cues = parseSrt(leoPart1Raw);
const part2Cues = parseSrt(leoPart2Raw);

const part1End =
  part1Cues.length > 0 ? part1Cues[part1Cues.length - 1].endFrame : 0;

const part1Shifted: SrtCue[] = part1Cues.map((c) => ({
  ...c,
  startFrame: c.startFrame + OPENING_BREATH_FRAMES,
  endFrame: c.endFrame + OPENING_BREATH_FRAMES,
  startSeconds: c.startSeconds + 2,
  endSeconds: c.endSeconds + 2,
}));

const part2Offset = OPENING_BREATH_FRAMES + part1End + GAP_BETWEEN_PARTS_FRAMES;
const part2Shifted: SrtCue[] = part2Cues.map((c) => ({
  ...c,
  startFrame: c.startFrame + part2Offset,
  endFrame: c.endFrame + part2Offset,
  startSeconds: c.startSeconds + part2Offset / FPS,
  endSeconds: c.endSeconds + part2Offset / FPS,
}));

export const ALL_CUES: SrtCue[] = [...part1Shifted, ...part2Shifted].map(
  (c, i) => ({...c, index: i + 1}),
);

export const PART1_AUDIO_START_FRAME = OPENING_BREATH_FRAMES;
export const PART2_AUDIO_START_FRAME = part2Offset;

const lastCue = ALL_CUES[ALL_CUES.length - 1];
export const NARRATION_END_FRAME = lastCue ? lastCue.endFrame : 0;
export const TOTAL_DURATION_FRAMES = NARRATION_END_FRAME + END_CARD_FRAMES;
export const TOTAL_DURATION_SECONDS = TOTAL_DURATION_FRAMES / FPS;

export const ACT_BOUNDARIES = {
  act0End: OPENING_BREATH_FRAMES + Math.round(50 * FPS),
  act1End: OPENING_BREATH_FRAMES + part1End,
  act2End:
    part2Offset +
    (part2Cues.find((c) => c.text.toLowerCase().includes('act 3 the b'))
      ?.startFrame ?? Math.round(50 * FPS)),
  act3End: NARRATION_END_FRAME,
} as const;
