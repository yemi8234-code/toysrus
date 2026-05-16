import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig} from 'remotion';

export const MatchCut: React.FC<{
  durationInFrames?: number;
  children: React.ReactNode;
}> = ({durationInFrames = 12, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = spring({
    frame,
    fps,
    durationInFrames,
    config: {damping: 200, stiffness: 100, mass: 0.5},
  });
  const scale = interpolate(t, [0, 1], [1.15, 1]);
  const opacity = interpolate(frame, [0, durationInFrames * 0.6], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{opacity, transform: `scale(${scale})`}}>
      {children}
    </AbsoluteFill>
  );
};
