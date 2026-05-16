import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, TYPE} from '../../lib/design-tokens';

const EVENTS = [
  {date: 'SEPT 2017', label: 'Chapter 11', detail: 'Bankruptcy protection filed'},
  {date: 'MAR 2018', label: 'Liquidation', detail: 'US operations announced shutting down'},
  {date: 'JUN 2018', label: 'The last store', detail: 'Final US location closes its doors'},
];

export const BankruptcyTimeline: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill style={{padding: '0 100px', justifyContent: 'center'}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 60}}>
        {EVENTS.map((e, i) => {
          const enter = 8 + i * 28;
          const t = spring({
            frame: frame - enter,
            fps,
            config: {damping: 200, stiffness: 100, mass: 0.5},
          });
          const op = interpolate(t, [0, 1], [0, 1]);
          const x = interpolate(t, [0, 1], [-40, 0]);
          const slam = spring({
            frame: frame - enter,
            fps,
            config: {damping: 200, stiffness: 140, mass: 0.4},
          });
          const slamScale = interpolate(slam, [0, 1], [1.15, 1]);

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 60,
                opacity: op,
                transform: `translateX(${x}px)`,
              }}
            >
              <div
                style={{
                  fontFamily: TYPE.display,
                  fontSize: 84,
                  fontWeight: 800,
                  color: COLORS.accent,
                  letterSpacing: '-0.01em',
                  fontVariantNumeric: 'tabular-nums',
                  width: 360,
                  transform: `scale(${slamScale})`,
                  transformOrigin: 'left center',
                  textShadow: `0 0 30px ${COLORS.accent}55`,
                }}
              >
                {e.date}
              </div>
              <div
                style={{
                  width: 3,
                  height: 100,
                  background: `linear-gradient(180deg, ${COLORS.accent}, transparent)`,
                }}
              />
              <div>
                <div
                  style={{
                    fontFamily: TYPE.display,
                    fontSize: 56,
                    fontWeight: 700,
                    color: COLORS.text,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {e.label}
                </div>
                <div
                  style={{
                    fontFamily: TYPE.body,
                    fontSize: 24,
                    color: COLORS.textDim,
                    marginTop: 8,
                    letterSpacing: '0.04em',
                  }}
                >
                  {e.detail}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
