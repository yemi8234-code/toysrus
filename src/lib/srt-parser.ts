import {FPS} from './motion-tokens';

export type SrtCue = {
  index: number;
  startFrame: number;
  endFrame: number;
  startSeconds: number;
  endSeconds: number;
  text: string;
};

const parseTimestamp = (ts: string): number => {
  const [h, m, rest] = ts.split(':');
  const [s, ms] = rest.split(',');
  return (
    parseInt(h, 10) * 3600 +
    parseInt(m, 10) * 60 +
    parseInt(s, 10) +
    parseInt(ms, 10) / 1000
  );
};

export const parseSrt = (raw: string, offsetSeconds = 0): SrtCue[] => {
  const blocks = raw
    .replace(/\r\n/g, '\n')
    .split(/\n\n+/)
    .map((b) => b.trim())
    .filter(Boolean);

  const cues: SrtCue[] = [];
  for (const block of blocks) {
    const lines = block.split('\n');
    if (lines.length < 2) continue;
    const indexLine = lines[0];
    const timeLine = lines[1];
    const text = lines.slice(2).join(' ').trim();
    const m = timeLine.match(
      /(\d{2}:\d{2}:\d{2},\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2},\d{3})/,
    );
    if (!m) continue;
    const startSeconds = parseTimestamp(m[1]) + offsetSeconds;
    const endSeconds = parseTimestamp(m[2]) + offsetSeconds;
    cues.push({
      index: parseInt(indexLine, 10) || cues.length + 1,
      startFrame: Math.round(startSeconds * FPS),
      endFrame: Math.round(endSeconds * FPS),
      startSeconds,
      endSeconds,
      text,
    });
  }
  return cues;
};

export const mergeCues = (parts: SrtCue[][]): SrtCue[] => {
  let offsetFrames = 0;
  let offsetSeconds = 0;
  const merged: SrtCue[] = [];
  for (const part of parts) {
    for (const cue of part) {
      merged.push({
        ...cue,
        index: merged.length + 1,
        startFrame: cue.startFrame + offsetFrames,
        endFrame: cue.endFrame + offsetFrames,
        startSeconds: cue.startSeconds + offsetSeconds,
        endSeconds: cue.endSeconds + offsetSeconds,
      });
    }
    if (part.length > 0) {
      const last = part[part.length - 1];
      offsetFrames += last.endFrame + Math.round(0.5 * FPS);
      offsetSeconds += last.endSeconds + 0.5;
    }
  }
  return merged;
};

export const findCueAtFrame = (cues: SrtCue[], frame: number): SrtCue | null => {
  for (const cue of cues) {
    if (frame >= cue.startFrame && frame <= cue.endFrame) return cue;
  }
  return null;
};

export const isNarrationActiveAt = (cues: SrtCue[], frame: number): boolean => {
  return findCueAtFrame(cues, frame) !== null;
};
