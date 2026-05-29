import React from 'react';
import { palette } from '../theme.js';
import { HalftoneBox } from './HalftoneBox.jsx';

// Beveled/octagonal photo frame — matches the trading-card style from reference.
export const OctagonFrame = ({
  width = 340,
  height = 400,
  label = '',
  children,
  style = {},
  borderColor = palette.midGrey,
  labelColor = palette.inkSoft,
}) => {
  const cut = Math.min(width, height) * 0.09;
  const clip = `polygon(
    ${cut}px 0%, calc(100% - ${cut}px) 0%,
    100% ${cut}px, 100% calc(100% - ${cut}px),
    calc(100% - ${cut}px) 100%, ${cut}px 100%,
    0% calc(100% - ${cut}px), 0% ${cut}px
  )`;

  return (
    <div style={{ position: 'relative', width, height, ...style }}>
      {/* outer border */}
      <div style={{
        position: 'absolute', inset: 0,
        clipPath: clip,
        background: borderColor,
      }}/>
      {/* inner content */}
      <HalftoneBox style={{
        position: 'absolute',
        inset: 3,
        clipPath: `polygon(
          ${cut-2}px 0%, calc(100% - ${cut-2}px) 0%,
          100% ${cut-2}px, 100% calc(100% - ${cut-2}px),
          calc(100% - ${cut-2}px) 100%, ${cut-2}px 100%,
          0% calc(100% - ${cut-2}px), 0% ${cut-2}px
        )`,
        overflow: 'hidden',
        background: palette.paperDark,
      }}>
        {/* greyscale filter on children via CSS */}
        <div style={{ filter: 'grayscale(1) contrast(1.08)', width: '100%', height: '100%' }}>
          {children}
        </div>
      </HalftoneBox>
      {/* label beneath */}
      {label && (
        <div style={{
          position: 'absolute',
          bottom: -36,
          left: 0, right: 0,
          textAlign: 'center',
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontWeight: 700,
          fontSize: 22,
          letterSpacing: '0.12em',
          textTransform: 'lowercase',
          color: labelColor,
        }}>
          {label}
        </div>
      )}
    </div>
  );
};
