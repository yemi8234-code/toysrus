import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, random} from 'remotion';
import {COLORS, TYPE} from '../../lib/design-tokens';

const Logo: React.FC<{label: string; sub?: string; color: string}> = ({label, sub, color}) => (
  <div
    style={{
      width: 360,
      height: 220,
      background: 'rgba(255,255,255,0.04)',
      border: `2px solid ${color}`,
      borderRadius: 16,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: `0 0 40px ${color}55`,
    }}
  >
    <div
      style={{
        fontFamily: TYPE.display,
        fontSize: 44,
        fontWeight: 800,
        color: COLORS.text,
        letterSpacing: '-0.02em',
      }}
    >
      {label}
    </div>
    {sub && (
      <div
        style={{
          fontFamily: TYPE.mono,
          fontSize: 16,
          color: COLORS.textDim,
          marginTop: 8,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
        }}
      >
        {sub}
      </div>
    )}
  </div>
);

export const AmazonDealDiagram: React.FC<{
  shatterAtFrame?: number;
}> = ({shatterAtFrame = 110}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const enterT = spring({
    frame,
    fps,
    config: {damping: 200, stiffness: 80, mass: 0.6},
  });
  const boxesIn = interpolate(enterT, [0, 1], [0, 1]);

  const arrowT = spring({
    frame: frame - 18,
    fps,
    config: {damping: 200, stiffness: 60, mass: 1.0},
  });
  const arrowDraw = interpolate(arrowT, [0, 1], [0, 1]);

  const shatter = interpolate(frame, [shatterAtFrame, shatterAtFrame + 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const arrowLineY = 540;
  const arrowStartX = 420;
  const arrowEndX = 1500;
  const currentArrowX = arrowStartX + (arrowEndX - arrowStartX) * arrowDraw;

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-around',
          alignItems: 'center',
          position: 'relative',
          height: 600,
        }}
      >
        <div
          style={{
            opacity: boxesIn,
            transform: `translateX(${interpolate(boxesIn, [0, 1], [-30, 0])}px) translate(${shatter * -40}px, ${shatter * 20}px) rotate(${shatter * -3}deg)`,
          }}
        >
          <Logo label="TOYS R US" sub="EXCLUSIVE SUPPLIER" color={COLORS.accentGold} />
        </div>

        <svg
          width={1100}
          height={120}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
          viewBox="0 0 1100 120"
        >
          <defs>
            <marker
              id="arrowhead-amazon"
              markerWidth="14"
              markerHeight="10"
              refX="12"
              refY="5"
              orient="auto"
            >
              <polygon points="0 0, 14 5, 0 10" fill={COLORS.text} />
            </marker>
          </defs>
          <line
            x1={50}
            y1={60}
            x2={50 + (1000) * arrowDraw * (1 - shatter * 0.3)}
            y2={60 + shatter * 30 * (random('arrow-y') - 0.5)}
            stroke={COLORS.text}
            strokeWidth={3}
            opacity={1 - shatter * 0.7}
            markerEnd="url(#arrowhead-amazon)"
          />
          {shatter > 0 &&
            Array.from({length: 18}).map((_, i) => {
              const rx = random(`shard-x-${i}`);
              const ry = random(`shard-y-${i}`);
              return (
                <line
                  key={i}
                  x1={50 + rx * 1000}
                  y1={60 + (ry - 0.5) * 40}
                  x2={50 + rx * 1000 + (rx - 0.5) * 80 * shatter}
                  y2={60 + (ry - 0.5) * 40 + (ry - 0.5) * 60 * shatter}
                  stroke={COLORS.accent}
                  strokeWidth={2}
                  opacity={(1 - shatter) * shatter * 4}
                />
              );
            })}
        </svg>

        <div
          style={{
            opacity: boxesIn,
            transform: `translateX(${interpolate(boxesIn, [0, 1], [30, 0])}px) translate(${shatter * 40}px, ${shatter * 20}px) rotate(${shatter * 3}deg)`,
          }}
        >
          <Logo label="AMAZON" sub="THE EVERYTHING STORE" color={COLORS.accent} />
        </div>
      </div>

      <div
        style={{
          marginTop: 60,
          fontFamily: TYPE.body,
          fontSize: 24,
          color: COLORS.textDim,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          opacity: interpolate(frame, [shatterAtFrame + 8, shatterAtFrame + 24], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        2004 · The exclusivity broken
      </div>
    </AbsoluteFill>
  );
};
