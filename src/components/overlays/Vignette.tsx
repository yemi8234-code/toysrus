import React from 'react';
import {AbsoluteFill} from 'remotion';

export const Vignette: React.FC<{strength?: number}> = ({strength = 0.25}) => {
  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        background: `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,${strength}) 100%)`,
      }}
    />
  );
};
