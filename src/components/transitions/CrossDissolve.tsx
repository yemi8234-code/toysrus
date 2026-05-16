import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

export const CrossDissolve: React.FC<{
  durationInFrames?: number;
  children: React.ReactNode;
}> = ({durationInFrames = 18, children}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{opacity}}>{children}</AbsoluteFill>;
};

export const FadeOut: React.FC<{
  durationInFrames?: number;
  startFrame: number;
  children: React.ReactNode;
}> = ({durationInFrames = 18, startFrame, children}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + durationInFrames],
    [1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  return <AbsoluteFill style={{opacity}}>{children}</AbsoluteFill>;
};
