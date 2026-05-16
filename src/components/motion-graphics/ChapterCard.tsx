import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, TYPE} from '../../lib/design-tokens';

export const ChapterCard: React.FC<{
  roman: string;
  title: string;
  subtitle?: string;
}> = ({roman, title, subtitle}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const romanT = spring({
    frame,
    fps,
    config: {damping: 200, stiffness: 60, mass: 1.0},
  });
  const romanScale = interpolate(romanT, [0, 1], [1.15, 1]);
  const romanOp = interpolate(frame, [0, 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleT = spring({
    frame: frame - 12,
    fps,
    config: {damping: 200, stiffness: 80, mass: 0.7},
  });
  const titleY = interpolate(titleT, [0, 1], [20, 0]);
  const titleOp = interpolate(frame, [12, 32], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: '#050507',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          maxWidth: 1400,
        }}
      >
        <div
          style={{
            fontFamily: TYPE.display,
            fontSize: 320,
            fontWeight: 800,
            color: COLORS.text,
            letterSpacing: '-0.04em',
            lineHeight: 0.85,
            opacity: romanOp,
            transform: `scale(${romanScale})`,
            textShadow: `0 0 80px rgba(220,38,38,0.15)`,
          }}
        >
          {roman}
        </div>
        <div
          style={{
            marginTop: 56,
            fontFamily: TYPE.display,
            fontSize: 58,
            fontWeight: 600,
            color: COLORS.textDim,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            opacity: titleOp,
            transform: `translateY(${titleY}px)`,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              marginTop: 24,
              fontFamily: TYPE.body,
              fontSize: 22,
              color: COLORS.textDim,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              opacity: interpolate(frame, [24, 44], [0, 0.7], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            {subtitle}
          </div>
        )}
        <div
          style={{
            marginTop: 56,
            width: interpolate(frame, [22, 60], [0, 280], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            height: 2,
            background: `linear-gradient(90deg, transparent, ${COLORS.accent}, transparent)`,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
