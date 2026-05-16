import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, TYPE} from '../../lib/design-tokens';

export const RevenueDebtChart: React.FC<{
  width?: number;
  height?: number;
}> = ({width = 1300, height = 580}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const drawT = spring({
    frame,
    fps,
    config: {damping: 200, stiffness: 32, mass: 1.6},
  });
  const progress = interpolate(drawT, [0, 1], [0, 1]);

  const years = Array.from({length: 13}, (_, i) => 2005 + i);
  const revenueValues = [13.0, 13.2, 13.5, 13.7, 13.5, 13.6, 13.7, 13.5, 13.3, 12.5, 11.8, 11.5, 11.1];
  const debtServiceValues = [350, 380, 410, 430, 440, 440, 440, 430, 420, 410, 400, 400, 400];

  const padding = {l: 100, r: 80, t: 80, b: 100};
  const chartW = width - padding.l - padding.r;
  const chartH = height - padding.t - padding.b;

  const xScale = (i: number) => padding.l + (i / (years.length - 1)) * chartW;
  const revenueY = (v: number) => padding.t + chartH - ((v - 10) / 5) * chartH;
  const debtY = (v: number) => padding.t + chartH - ((v - 300) / 200) * chartH;

  const pathRev = revenueValues
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${revenueY(v)}`)
    .join(' ');
  const pathDebt = debtServiceValues
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${debtY(v)}`)
    .join(' ');

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{position: 'relative'}}>
        <div
          style={{
            position: 'absolute',
            top: -60,
            left: padding.l,
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
          Revenue holds. Debt service eats it.
        </div>

        <svg width={width} height={height}>
          {[0, 1, 2, 3].map((i) => (
            <line
              key={i}
              x1={padding.l}
              x2={width - padding.r}
              y1={padding.t + (i / 3) * chartH}
              y2={padding.t + (i / 3) * chartH}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={1}
            />
          ))}

          <path
            d={pathRev}
            fill="none"
            stroke={COLORS.text}
            strokeWidth={3}
            strokeDasharray={2000}
            strokeDashoffset={2000 - progress * 2000}
            opacity={0.85}
          />
          <path
            d={pathDebt}
            fill="none"
            stroke={COLORS.accent}
            strokeWidth={interpolate(progress, [0, 1], [3, 7])}
            strokeDasharray={2000}
            strokeDashoffset={2000 - progress * 2000}
            style={{filter: `drop-shadow(0 0 8px ${COLORS.accent})`}}
          />

          {years.map((y, i) => (
            <text
              key={y}
              x={xScale(i)}
              y={height - padding.b + 32}
              textAnchor="middle"
              fill={COLORS.textDim}
              fontFamily={TYPE.mono}
              fontSize={16}
              opacity={progress > i / years.length ? 0.6 : 0}
            >
              {y}
            </text>
          ))}

          <text
            x={xScale(years.length - 1) - 20}
            y={revenueY(revenueValues[revenueValues.length - 1]) - 14}
            textAnchor="end"
            fill={COLORS.text}
            fontFamily={TYPE.body}
            fontSize={20}
            fontWeight={600}
            opacity={progress}
          >
            Revenue
          </text>
          <text
            x={xScale(years.length - 1) - 20}
            y={debtY(debtServiceValues[debtServiceValues.length - 1]) + 28}
            textAnchor="end"
            fill={COLORS.accent}
            fontFamily={TYPE.body}
            fontSize={20}
            fontWeight={700}
            opacity={progress}
          >
            Interest payments
          </text>
        </svg>
      </div>
    </AbsoluteFill>
  );
};
