import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, TYPE} from '../../lib/design-tokens';

export type TimelineEvent = {
  year: string | number;
  label: string;
  highlight?: boolean;
};

export const Timeline: React.FC<{
  events: TimelineEvent[];
  startYear?: number;
  endYear?: number;
  title?: string;
}> = ({events, title}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const drawT = spring({
    frame,
    fps,
    config: {damping: 200, stiffness: 40, mass: 1.5},
  });
  const lineProgress = interpolate(drawT, [0, 1], [0, 100]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 120px',
      }}
    >
      {title && (
        <div
          style={{
            position: 'absolute',
            top: 140,
            left: 120,
            fontFamily: TYPE.display,
            fontSize: 28,
            color: COLORS.textDim,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            opacity: interpolate(frame, [0, 18], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          {title}
        </div>
      )}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 280,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: `${lineProgress}%`,
            height: 2,
            background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentGold})`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: '100%',
            height: 2,
            background: 'rgba(255,255,255,0.08)',
            zIndex: -1,
          }}
        />
        {events.map((e, i) => {
          const t = events.length > 1 ? i / (events.length - 1) : 0.5;
          const eventFrame = 8 + i * 14;
          const eventT = spring({
            frame: frame - eventFrame,
            fps,
            config: {damping: 200, stiffness: 120, mass: 0.4},
          });
          const eventOp = interpolate(eventT, [0, 1], [0, 1]);
          const scale = interpolate(eventT, [0, 1], [0.7, 1]);
          const dotColor = e.highlight ? COLORS.accent : COLORS.accentGold;

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: '50%',
                left: `${t * 100}%`,
                transform: `translate(-50%, -50%) scale(${scale})`,
                opacity: eventOp,
              }}
            >
              <div
                style={{
                  width: e.highlight ? 28 : 18,
                  height: e.highlight ? 28 : 18,
                  background: dotColor,
                  borderRadius: '50%',
                  boxShadow: `0 0 24px ${dotColor}`,
                  margin: '0 auto',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: i % 2 === 0 ? -100 : 40,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                <div
                  style={{
                    fontFamily: TYPE.display,
                    fontSize: 42,
                    fontWeight: 700,
                    color: COLORS.text,
                    fontVariantNumeric: 'tabular-nums',
                    lineHeight: 1,
                  }}
                >
                  {e.year}
                </div>
                <div
                  style={{
                    fontFamily: TYPE.body,
                    fontSize: 20,
                    color: COLORS.textDim,
                    marginTop: 6,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {e.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
