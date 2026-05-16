import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, TYPE} from '../../lib/design-tokens';

export const LowerThird: React.FC<{
  name: string;
  role?: string;
  entryFrame?: number;
  exitFrame?: number;
}> = ({name, role, entryFrame = 0, exitFrame}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const localFrame = frame - entryFrame;

  const enterT = spring({
    frame: localFrame,
    fps,
    config: {damping: 200, stiffness: 100, mass: 0.5},
  });
  const x = interpolate(enterT, [0, 1], [-60, 0]);
  const opIn = interpolate(localFrame, [0, 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opOut = exitFrame
    ? interpolate(frame, [exitFrame - 12, exitFrame], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 1;

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div
        style={{
          position: 'absolute',
          left: 100,
          bottom: 130,
          opacity: Math.min(opIn, opOut),
          transform: `translateX(${x}px)`,
        }}
      >
        <div
          style={{
            background: 'linear-gradient(90deg, rgba(220,38,38,0.95), rgba(220,38,38,0))',
            height: 3,
            width: 280,
            marginBottom: 14,
          }}
        />
        <div
          style={{
            fontFamily: TYPE.display,
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.text,
            letterSpacing: '-0.01em',
            textShadow: '0 2px 12px rgba(0,0,0,0.7)',
          }}
        >
          {name}
        </div>
        {role && (
          <div
            style={{
              fontFamily: TYPE.body,
              fontSize: 24,
              color: COLORS.textDim,
              marginTop: 6,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              textShadow: '0 1px 8px rgba(0,0,0,0.7)',
            }}
          >
            {role}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
