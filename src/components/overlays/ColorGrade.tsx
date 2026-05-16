import React from 'react';
import {AbsoluteFill} from 'remotion';

export const ColorGrade: React.FC = () => {
  return (
    <>
      <AbsoluteFill
        style={{
          pointerEvents: 'none',
          mixBlendMode: 'multiply',
          background:
            'linear-gradient(180deg, rgba(255,250,242,0.06) 0%, rgba(10,13,20,0.18) 100%)',
        }}
      />
      <AbsoluteFill
        style={{
          pointerEvents: 'none',
          mixBlendMode: 'overlay',
          background:
            'radial-gradient(ellipse at center, rgba(255,250,242,0.05) 0%, rgba(10,13,20,0.05) 100%)',
          opacity: 0.5,
        }}
      />
    </>
  );
};
