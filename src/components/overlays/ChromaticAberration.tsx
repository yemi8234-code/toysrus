import React from 'react';
import {AbsoluteFill} from 'remotion';

export const ChromaticAberration: React.FC<{strength?: number}> = ({
  strength = 1,
}) => {
  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        boxShadow: `inset ${strength}px 0 0 rgba(255,0,0,0.06), inset -${strength}px 0 0 rgba(0,180,255,0.06)`,
        mixBlendMode: 'screen',
      }}
    />
  );
};
