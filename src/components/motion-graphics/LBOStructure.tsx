import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, random} from 'remotion';
import {COLORS, TYPE} from '../../lib/design-tokens';

const InvestorBox: React.FC<{
  name: string;
  enterFrame: number;
  x: number;
}> = ({name, enterFrame, x}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = spring({
    frame: frame - enterFrame,
    fps,
    config: {damping: 200, stiffness: 80, mass: 0.6},
  });
  const op = interpolate(t, [0, 1], [0, 1]);
  const y = interpolate(t, [0, 1], [-30, 0]);

  return (
    <g transform={`translate(${x}, ${100 + y})`} opacity={op}>
      <rect
        x={-100}
        y={-50}
        width={200}
        height={100}
        rx={8}
        fill="rgba(255,255,255,0.05)"
        stroke={COLORS.text}
        strokeWidth={2}
      />
      <text
        x={0}
        y={6}
        textAnchor="middle"
        fill={COLORS.text}
        fontFamily={TYPE.display}
        fontSize={28}
        fontWeight={700}
      >
        {name}
      </text>
    </g>
  );
};

export const LBOStructure: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const buyoutT = spring({
    frame: frame - 70,
    fps,
    config: {damping: 200, stiffness: 80, mass: 0.6},
  });
  const buyoutOp = interpolate(buyoutT, [0, 1], [0, 1]);

  const debtT = spring({
    frame: frame - 110,
    fps,
    config: {damping: 200, stiffness: 60, mass: 1.0},
  });
  const debtScale = interpolate(debtT, [0, 1], [0, 1]);

  const compressT = spring({
    frame: frame - 140,
    fps,
    config: {damping: 200, stiffness: 50, mass: 1.2},
  });
  const compress = interpolate(compressT, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{padding: '60px 100px'}}>
      <div
        style={{
          fontFamily: TYPE.body,
          fontSize: 22,
          color: COLORS.textDim,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          opacity: interpolate(frame, [0, 14], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        2005 · The leveraged buyout
      </div>
      <svg width="100%" height={920} viewBox="0 0 1720 920" style={{marginTop: 32}}>
        <InvestorBox name="BAIN" enterFrame={0} x={460} />
        <InvestorBox name="KKR" enterFrame={12} x={860} />
        <InvestorBox name="VORNADO" enterFrame={24} x={1260} />

        {[460, 860, 1260].map((x, i) => {
          const lineT = spring({
            frame: frame - (40 + i * 6),
            fps,
            config: {damping: 200, stiffness: 70, mass: 0.7},
          });
          const draw = interpolate(lineT, [0, 1], [0, 1]);
          return (
            <line
              key={x}
              x1={x}
              y1={150}
              x2={x + (860 - x) * draw}
              y2={150 + (300 - 150) * draw}
              stroke={COLORS.text}
              strokeWidth={2}
              opacity={0.6}
            />
          );
        })}

        <g transform="translate(860, 360)" opacity={buyoutOp}>
          <rect
            x={-260}
            y={-70}
            width={520}
            height={140}
            rx={10}
            fill="rgba(212,175,55,0.08)"
            stroke={COLORS.accentGold}
            strokeWidth={3}
          />
          <text
            x={0}
            y={-10}
            textAnchor="middle"
            fill={COLORS.textDim}
            fontFamily={TYPE.body}
            fontSize={20}
            letterSpacing="0.32em"
          >
            BUYOUT
          </text>
          <text
            x={0}
            y={40}
            textAnchor="middle"
            fill={COLORS.accentGold}
            fontFamily={TYPE.display}
            fontSize={56}
            fontWeight={800}
            style={{fontVariantNumeric: 'tabular-nums'}}
          >
            $6.6 BILLION
          </text>
        </g>

        <g transform={`translate(860, ${520 + compress * 14})`}>
          <rect
            x={-300 + compress * 12}
            y={-60 + compress * 8}
            width={600 - compress * 24}
            height={120 - compress * 16}
            rx={10}
            fill={COLORS.accent}
            opacity={0.18}
            stroke={COLORS.accent}
            strokeWidth={3}
          />
          <text
            x={0}
            y={12}
            textAnchor="middle"
            fill={COLORS.text}
            fontFamily={TYPE.display}
            fontSize={48}
            fontWeight={800}
            letterSpacing="-0.01em"
          >
            TOYS R US
          </text>
        </g>

        <g transform={`translate(860, 720)`} opacity={debtScale}>
          <rect
            x={-380 * debtScale}
            y={-50}
            width={760 * debtScale}
            height={80}
            rx={6}
            fill={COLORS.accent}
            opacity={0.85}
          />
          <text
            x={0}
            y={6}
            textAnchor="middle"
            fill={COLORS.text}
            fontFamily={TYPE.display}
            fontSize={36}
            fontWeight={800}
            letterSpacing="0.02em"
          >
            $5 BILLION IN DEBT
          </text>
          <text
            x={0}
            y={68}
            textAnchor="middle"
            fill={COLORS.textDim}
            fontFamily={TYPE.body}
            fontSize={20}
            letterSpacing="0.18em"
          >
            $400M / YEAR IN INTEREST
          </text>
        </g>

        {compress > 0 &&
          Array.from({length: 14}).map((_, i) => {
            const driftT = ((frame - 150) * 2 + i * 13) % 200;
            const y = 760 + driftT;
            const x = 540 + i * 50 + random(`coin-${i}`) * 20;
            const op = interpolate(driftT, [0, 100, 200], [0, 0.7, 0]);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={5}
                fill={COLORS.accentGold}
                opacity={op * compress}
              />
            );
          })}
      </svg>
    </AbsoluteFill>
  );
};
