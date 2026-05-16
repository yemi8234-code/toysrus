import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {COLORS, TYPE} from '../../lib/design-tokens';

export const BrollPlaceholder: React.FC<{
  description: string;
  assetPath: string;
  durationSeconds?: number;
  kind?: 'broll' | 'still' | 'sfx' | 'music';
}> = ({description, assetPath, durationSeconds, kind = 'broll'}) => {
  const frame = useCurrentFrame();
  const pulse = interpolate(
    frame % 60,
    [0, 30, 60],
    [0.35, 0.85, 0.35],
  );
  const ken = interpolate(frame, [0, 90], [1, 1.04], {
    extrapolateRight: 'clamp',
  });

  const kindColors: Record<string, [string, string]> = {
    broll: ['#2a1810', '#dc2626'],
    still: ['#0f1a2a', '#d4af37'],
    sfx: ['#1a0f1f', '#a855f7'],
    music: ['#0d1f1a', '#10b981'],
  };
  const [bg, accent] = kindColors[kind];

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, ${bg} 0%, #050507 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
        transform: `scale(${ken})`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 60,
          border: `2px dashed ${accent}`,
          borderRadius: 8,
          opacity: pulse,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          textAlign: 'center',
          fontFamily: TYPE.mono,
          color: COLORS.text,
          padding: '0 100px',
        }}
      >
        <div
          style={{
            fontSize: 22,
            color: accent,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            marginBottom: 24,
            fontWeight: 700,
          }}
        >
          [{kind.toUpperCase()}]
        </div>
        <div
          style={{
            fontFamily: TYPE.display,
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.text,
            marginBottom: 28,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
          }}
        >
          {description}
        </div>
        <div
          style={{
            fontSize: 18,
            color: COLORS.textDim,
            letterSpacing: '0.08em',
            marginBottom: 8,
          }}
        >
          {assetPath}
        </div>
        {durationSeconds && (
          <div
            style={{
              fontSize: 18,
              color: COLORS.textDim,
              letterSpacing: '0.08em',
            }}
          >
            {durationSeconds.toFixed(1)}s
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
