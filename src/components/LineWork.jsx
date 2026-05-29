import React from 'react';
import { palette } from '../theme.js';

// Thin geometric line work — diagonal connectors, circles, spotlight shapes.
// All coords are 0-1 fractions of the 1080x1920 canvas.
export const LineWork = ({ lines = [], circles = [], opacity = 1, strokeWidth = 1.2, color = palette.line }) => (
  <svg
    viewBox="0 0 1080 1920"
    style={{
      position: 'absolute', inset: 0,
      width: '100%', height: '100%',
      pointerEvents: 'none',
      opacity,
    }}
  >
    {lines.map(([x1, y1, x2, y2], i) => (
      <line
        key={i}
        x1={x1 * 1080} y1={y1 * 1920}
        x2={x2 * 1080} y2={y2 * 1920}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeOpacity={0.55}
      />
    ))}
    {circles.map(([cx, cy, r], i) => (
      <circle
        key={i}
        cx={cx * 1080} cy={cy * 1920}
        r={r * 1080}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeOpacity={0.35}
      />
    ))}
  </svg>
);

// Pre-built line configs for common layouts
export const LINES = {
  xCross: [
    [0.05, 0.38, 0.95, 0.62],
    [0.05, 0.62, 0.95, 0.38],
  ],
  triptychH: [
    [0.0, 0.42, 1.0, 0.42],
    [0.0, 0.65, 1.0, 0.65],
  ],
  diagonal3: [
    [0.1, 0.3, 0.5, 0.7],
    [0.5, 0.7, 0.9, 0.3],
    [0.3, 0.1, 0.7, 0.9],
  ],
  spotBeam: [
    [0.28, 0.0, 0.5, 0.48],
    [0.72, 0.0, 0.5, 0.48],
  ],
  cornerConnectors: [
    [0.08, 0.35, 0.92, 0.35],
    [0.08, 0.65, 0.92, 0.65],
    [0.5, 0.2, 0.5, 0.8],
  ],
};
