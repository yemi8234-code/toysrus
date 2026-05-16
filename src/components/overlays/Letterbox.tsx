import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig} from 'remotion';

export const Letterbox: React.FC<{
  active?: boolean;
  barHeight?: number;
  enterFrame?: number;
}> = ({active = true, barHeight = 90, enterFrame = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = spring({
    frame: frame - enterFrame,
    fps,
    config: {damping: 200, stiffness: 80, mass: 0.8},
  });
  const h = active ? barHeight * t : 0;

  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: h,
          background: '#000',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: h,
          background: '#000',
        }}
      />
    </AbsoluteFill>
  );
};
