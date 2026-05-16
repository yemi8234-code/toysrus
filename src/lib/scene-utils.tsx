import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Sequence} from 'remotion';
import {ALL_CUES} from './timing';
import {FPS} from './motion-tokens';

// Returns the start frame for an SRT cue at a given (1-based) index.
export const cueStart = (idx: number): number => {
  const c = ALL_CUES[idx - 1];
  return c ? c.startFrame : 0;
};

// Returns end frame of a cue.
export const cueEnd = (idx: number): number => {
  const c = ALL_CUES[idx - 1];
  return c ? c.endFrame : 0;
};

// Span of cues from start index to end index inclusive.
export const cueSpan = (startIdx: number, endIdx: number): {start: number; duration: number} => {
  const start = cueStart(startIdx);
  const end = cueEnd(endIdx);
  return {start, duration: end - start};
};

export const KenBurns: React.FC<{
  children: React.ReactNode;
  scaleFrom?: number;
  scaleTo?: number;
  panX?: number;
  panY?: number;
}> = ({children, scaleFrom = 1.0, scaleTo = 1.12, panX = 0, panY = 0}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const t = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const scale = interpolate(t, [0, 1], [scaleFrom, scaleTo]);
  const px = interpolate(t, [0, 1], [0, panX]);
  const py = interpolate(t, [0, 1], [0, panY]);

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale}) translate(${px}px, ${py}px)`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export const SceneFrame: React.FC<{
  from: number;
  durationInFrames: number;
  children: React.ReactNode;
}> = ({from, durationInFrames, children}) => {
  return (
    <Sequence from={from} durationInFrames={durationInFrames}>
      {children}
    </Sequence>
  );
};
