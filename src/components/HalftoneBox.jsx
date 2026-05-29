import React from 'react';

// Halftone dot overlay rendered as a CSS radial-gradient grid.
// Apply over any image/element to get the printed-newspaper dot pattern.
export const HalftoneBox = ({
  dotSize = 3.5,
  spacing = 7,
  opacity = 0.55,
  style = {},
  children,
}) => {
  const dot = `radial-gradient(circle, rgba(0,0,0,${opacity}) ${dotSize * 0.5}px, transparent ${dotSize * 0.5}px)`;
  return (
    <div style={{ position: 'relative', ...style }}>
      {children}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: dot,
          backgroundSize: `${spacing}px ${spacing}px`,
          pointerEvents: 'none',
          mixBlendMode: 'multiply',
        }}
      />
    </div>
  );
};
