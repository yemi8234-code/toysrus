import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, random, useVideoConfig, spring} from 'remotion';
import {COLORS, TYPE} from '../../lib/design-tokens';

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const t = spring({
    frame,
    fps,
    config: {damping: 200, stiffness: 30, mass: 1.6},
  });
  const titleOp = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const yearsOp = interpolate(frame, [40, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scale = interpolate(t, [0, 1], [1.05, 1]);

  return (
    <AbsoluteFill
      style={{
        background: '#050507',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {Array.from({length: 60}).map((_, i) => {
        const px = random(`p-x-${i}`) * 1920;
        const baseY = random(`p-y-${i}`) * 1080;
        const drift = ((frame * 0.4 + i * 27) % 400) - 200;
        const py = baseY + drift;
        const size = 1 + random(`p-s-${i}`) * 2;
        const op = 0.15 + random(`p-o-${i}`) * 0.4;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: px,
              top: py,
              width: size,
              height: size,
              borderRadius: '50%',
              background: '#fffaf2',
              opacity: op,
              filter: 'blur(0.5px)',
            }}
          />
        );
      })}

      <div
        style={{
          textAlign: 'center',
          transform: `scale(${scale})`,
        }}
      >
        <div
          style={{
            fontFamily: TYPE.display,
            fontSize: 140,
            fontWeight: 800,
            color: COLORS.text,
            letterSpacing: '-0.03em',
            opacity: titleOp,
            lineHeight: 1,
            textShadow: '0 0 100px rgba(212,175,55,0.2)',
          }}
        >
          TOYS R US
        </div>
        <div
          style={{
            marginTop: 40,
            fontFamily: TYPE.display,
            fontSize: 56,
            fontWeight: 400,
            color: COLORS.accentGold,
            letterSpacing: '0.32em',
            opacity: yearsOp,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          1948 — 2018
        </div>
        <div
          style={{
            marginTop: 80,
            width: 200,
            height: 1,
            background: COLORS.accent,
            marginLeft: 'auto',
            marginRight: 'auto',
            opacity: interpolate(frame, [70, 100], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        />
        <div
          style={{
            marginTop: 32,
            fontFamily: TYPE.body,
            fontSize: 20,
            color: COLORS.textDim,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            opacity: interpolate(frame, [80, 110], [0, 0.7], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          A documentary
        </div>
      </div>
    </AbsoluteFill>
  );
};
