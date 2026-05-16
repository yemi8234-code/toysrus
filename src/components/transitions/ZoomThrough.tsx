import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig} from 'remotion';

export const ZoomThrough: React.FC<{
  durationInFrames?: number;
  children: React.ReactNode;
}> = ({durationInFrames = 20, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = spring({
    frame,
    fps,
    durationInFrames,
    config: {damping: 200, stiffness: 80, mass: 0.6},
  });
  const scale = interpolate(t, [0, 1], [0.4, 1]);
  const opacity = interpolate(frame, [0, durationInFrames / 2], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const blur = interpolate(t, [0, 1], [12, 0]);

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale})`,
        opacity,
        filter: `blur(${blur}px)`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
