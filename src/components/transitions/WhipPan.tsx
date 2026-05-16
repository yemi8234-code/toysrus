import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

export const WhipPan: React.FC<{
  durationInFrames?: number;
  direction?: 'left' | 'right';
  children: React.ReactNode;
}> = ({durationInFrames = 8, direction = 'left', children}) => {
  const frame = useCurrentFrame();
  const x = interpolate(
    frame,
    [0, durationInFrames],
    [direction === 'left' ? 100 : -100, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const blur = interpolate(
    frame,
    [0, durationInFrames / 2, durationInFrames],
    [16, 8, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  return (
    <AbsoluteFill
      style={{
        transform: `translateX(${x}%)`,
        filter: `blur(${blur}px)`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
