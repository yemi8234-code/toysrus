import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, TYPE} from '../../lib/design-tokens';

export const MarketShareDonut: React.FC<{
  percent: number;
  label?: string;
  caption?: string;
}> = ({percent, label = 'Market share', caption = 'Toys R Us, peak 1990s'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const drawT = spring({
    frame,
    fps,
    config: {damping: 200, stiffness: 50, mass: 1.2},
  });
  const drawn = interpolate(drawT, [0, 1], [0, percent]);

  const numT = spring({
    frame: frame - 6,
    fps,
    config: {damping: 200, stiffness: 60, mass: 1.0},
  });
  const num = interpolate(numT, [0, 1], [0, percent]);

  const R = 220;
  const STROKE = 56;
  const C = 2 * Math.PI * R;
  const dash = (drawn / 100) * C;

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        gap: 60,
        flexDirection: 'row',
      }}
    >
      <svg width={620} height={620} viewBox="-310 -310 620 620">
        <circle
          r={R}
          cx={0}
          cy={0}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={STROKE}
        />
        <circle
          r={R}
          cx={0}
          cy={0}
          fill="none"
          stroke={COLORS.accent}
          strokeWidth={STROKE}
          strokeDasharray={`${dash} ${C}`}
          strokeDashoffset={C / 4}
          transform="rotate(-90)"
          strokeLinecap="round"
          style={{filter: `drop-shadow(0 0 24px ${COLORS.accent})`}}
        />
        <text
          x={0}
          y={6}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={COLORS.text}
          fontFamily={TYPE.display}
          fontSize={140}
          fontWeight={800}
          style={{fontVariantNumeric: 'tabular-nums'}}
        >
          {Math.round(num)}%
        </text>
      </svg>
      <div style={{maxWidth: 480}}>
        <div
          style={{
            fontFamily: TYPE.body,
            fontSize: 22,
            color: COLORS.textDim,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            marginBottom: 16,
            opacity: interpolate(frame, [16, 28], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: TYPE.display,
            fontSize: 44,
            fontWeight: 700,
            color: COLORS.text,
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
            opacity: interpolate(frame, [22, 36], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          {caption}
        </div>
      </div>
    </AbsoluteFill>
  );
};
