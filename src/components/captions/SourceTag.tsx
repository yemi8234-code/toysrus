import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {COLORS, TYPE} from '../../lib/design-tokens';

export const SourceTag: React.FC<{
  source: string;
  entryFrame?: number;
}> = ({source, entryFrame = 0}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - entryFrame, [0, 12], [0, 0.7], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div
        style={{
          position: 'absolute',
          right: 60,
          bottom: 50,
          opacity,
          fontFamily: TYPE.mono,
          fontSize: 18,
          color: COLORS.textDim,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        {source}
      </div>
    </AbsoluteFill>
  );
};
