import React from 'react';
import { palette } from '../theme.js';

// SVG-based procedural paper/concrete grain — no external assets needed.
export const TexturedBg = ({ dark = false, children, style = {} }) => {
  const base = dark ? palette.inkSoft : palette.paper;
  const noise = dark ? 'rgba(0,0,0,0.45)' : 'rgba(80,78,72,0.18)';

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: base,
      overflow: 'hidden',
      ...style,
    }}>
      {/* grain layer via repeating SVG filter */}
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity: dark ? 0.6 : 0.45 }}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
          <feBlend in="SourceGraphic" mode={dark ? 'multiply' : 'overlay'} result="blend"/>
          <feComposite in="blend" in2="SourceGraphic" operator="in"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" fill={noise}/>
      </svg>

      {/* subtle vignette */}
      <div style={{
        position:'absolute', inset:0,
        background: `radial-gradient(ellipse at 50% 40%, transparent 40%, ${dark ? 'rgba(0,0,0,0.55)' : 'rgba(60,58,52,0.22)'} 100%)`,
        pointerEvents: 'none',
      }}/>

      {children}
    </div>
  );
};
