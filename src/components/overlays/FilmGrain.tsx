import React from 'react';
import {AbsoluteFill, useCurrentFrame, random} from 'remotion';

export const FilmGrain: React.FC<{opacity?: number}> = ({opacity = 0.03}) => {
  const frame = useCurrentFrame();
  const seed = Math.floor(frame / 2);

  const noise = React.useMemo(() => {
    const cells = 80;
    const arr: {x: number; y: number; v: number}[] = [];
    for (let i = 0; i < cells; i++) {
      for (let j = 0; j < cells; j++) {
        arr.push({x: i, y: j, v: random(`grain-${seed}-${i}-${j}`)});
      }
    }
    return arr;
  }, [seed]);

  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        mixBlendMode: 'screen',
        opacity,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 80 80"
        preserveAspectRatio="none"
        style={{filter: 'contrast(1.4)'}}
      >
        {noise.map((n, i) => (
          <rect
            key={i}
            x={n.x}
            y={n.y}
            width={1}
            height={1}
            fill={`rgba(255,255,255,${n.v})`}
          />
        ))}
      </svg>
    </AbsoluteFill>
  );
};
