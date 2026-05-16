import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

export const BlurFade: React.FC<{
  durationInFrames?: number;
  children: React.ReactNode;
}> = ({durationInFrames = 14, children}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const blur = interpolate(frame, [0, durationInFrames], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill style={{opacity, filter: `blur(${blur}px)`}}>
      {children}
    </AbsoluteFill>
  );
};
