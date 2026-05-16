import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, random} from 'remotion';

export const GlitchCut: React.FC<{
  durationInFrames?: number;
  children: React.ReactNode;
}> = ({durationInFrames = 6, children}) => {
  const frame = useCurrentFrame();
  const t = frame / durationInFrames;
  const shiftR = (random(`gl-r-${frame}`) - 0.5) * 14 * (1 - t);
  const shiftB = (random(`gl-b-${frame}`) - 0.5) * 14 * (1 - t);
  const opacity = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const skew = (random(`gl-s-${frame}`) - 0.5) * 4 * (1 - t);

  return (
    <AbsoluteFill style={{opacity, transform: `skewX(${skew}deg)`}}>
      <AbsoluteFill
        style={{
          transform: `translateX(${shiftR}px)`,
          mixBlendMode: 'screen',
          filter: 'hue-rotate(0deg) saturate(2)',
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          transform: `translateX(${shiftB}px)`,
          mixBlendMode: 'screen',
          filter: 'hue-rotate(180deg) saturate(2)',
          opacity: 0.5,
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
