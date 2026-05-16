import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {COLORS, TYPE} from '../../lib/design-tokens';

export const SfxMarker: React.FC<{
  filename: string;
  triggerFrame: number;
}> = ({filename, triggerFrame}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame - triggerFrame,
    [-5, 0, 12, 24],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  if (opacity <= 0) return null;

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div
        style={{
          position: 'absolute',
          left: 60,
          bottom: 50,
          opacity,
          fontFamily: TYPE.mono,
          fontSize: 14,
          color: '#a855f7',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          background: 'rgba(0,0,0,0.6)',
          padding: '6px 12px',
          borderLeft: '2px solid #a855f7',
        }}
      >
        SFX: {filename} @ f{triggerFrame}
      </div>
    </AbsoluteFill>
  );
};
