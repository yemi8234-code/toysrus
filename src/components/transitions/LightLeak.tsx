import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, random} from 'remotion';

export const LightLeak: React.FC<{
  durationInFrames?: number;
  children: React.ReactNode;
}> = ({durationInFrames = 15, children}) => {
  const frame = useCurrentFrame();
  const flash = interpolate(
    frame,
    [0, durationInFrames / 3, (durationInFrames * 2) / 3, durationInFrames],
    [0, 0.95, 0.5, 0],
    {extrapolateRight: 'clamp'},
  );
  const childOpacity = interpolate(
    frame,
    [durationInFrames / 3, durationInFrames],
    [0, 1],
    {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'},
  );
  const grainSeed = Math.floor(frame / 1);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{opacity: childOpacity}}>{children}</AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${20 + random(`leak-${grainSeed}`) * 60}% ${30 + random(`leak2-${grainSeed}`) * 40}%, rgba(255,240,200,${flash}), rgba(255,255,255,${flash * 0.4}) 30%, transparent 70%)`,
          mixBlendMode: 'screen',
        }}
      />
    </AbsoluteFill>
  );
};
