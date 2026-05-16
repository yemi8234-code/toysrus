import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, TYPE} from '../../lib/design-tokens';

export const StatHammer: React.FC<{
  value: number;
  label: string;
  unit?: string;
  prefix?: string;
  formatThousands?: boolean;
  decimals?: number;
  highlight?: 'gold' | 'red' | 'white';
  durationInFrames?: number;
}> = ({
  value,
  label,
  unit,
  prefix,
  formatThousands = true,
  decimals = 0,
  highlight = 'white',
  durationInFrames = 90,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const slamT = spring({
    frame,
    fps,
    config: {damping: 200, stiffness: 110, mass: 0.5},
  });
  const scale = interpolate(slamT, [0, 1], [1.6, 1]);
  const blur = interpolate(slamT, [0, 1], [16, 0]);
  const numOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const countT = spring({
    frame: frame - 4,
    fps,
    config: {damping: 200, stiffness: 60, mass: 1.0},
  });
  const displayValue = interpolate(countT, [0, 1], [0, value]);

  const labelOpacity = interpolate(frame, [12, 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const labelY = interpolate(frame, [12, 22], [12, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const highlightColor =
    highlight === 'gold'
      ? COLORS.accentGold
      : highlight === 'red'
        ? COLORS.accent
        : COLORS.text;

  const formatted = formatThousands
    ? Math.round(displayValue).toLocaleString('en-US')
    : displayValue.toFixed(decimals);

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        opacity: exitOpacity,
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          filter: `blur(${blur}px)`,
          opacity: numOpacity,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: TYPE.display,
            fontSize: 240,
            fontWeight: 800,
            color: highlightColor,
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
            fontVariantNumeric: 'tabular-nums',
            textShadow: '0 8px 60px rgba(0,0,0,0.7)',
          }}
        >
          {prefix}
          {formatted}
          {unit && (
            <span style={{fontSize: 100, marginLeft: 8, color: COLORS.textDim}}>
              {unit}
            </span>
          )}
        </div>
      </div>
      <div
        style={{
          marginTop: 30,
          opacity: labelOpacity,
          transform: `translateY(${labelY}px)`,
          fontFamily: TYPE.body,
          fontSize: 32,
          color: COLORS.textDim,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </AbsoluteFill>
  );
};
