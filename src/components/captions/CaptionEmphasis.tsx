import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, TYPE, SIZES} from '../../lib/design-tokens';

export const CaptionEmphasis: React.FC<{
  text: string;
  entryFrame?: number;
  exitFrame?: number;
  durationInFrames?: number;
  size?: 'hero' | 'display' | 'title' | 'body';
  color?: string;
  align?: 'center' | 'left' | 'right';
  position?: {top?: string | number; left?: string | number; bottom?: string | number; right?: string | number};
}> = ({
  text,
  entryFrame = 0,
  exitFrame,
  durationInFrames = 90,
  size = 'display',
  color = COLORS.text,
  align = 'center',
  position,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const localFrame = frame - entryFrame;

  const enterT = spring({
    frame: localFrame,
    fps,
    config: {damping: 200, stiffness: 100, mass: 0.5},
  });
  const scale = interpolate(enterT, [0, 1], [0.94, 1]);
  const opIn = interpolate(localFrame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const finalExit = exitFrame ?? entryFrame + durationInFrames;
  const opOut = interpolate(frame, [finalExit - 10, finalExit], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const drift = interpolate(frame, [finalExit - 10, finalExit], [0, -5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const fontSize = SIZES[size];
  const positionStyle: React.CSSProperties = position
    ? {position: 'absolute', ...position}
    : {};

  return (
    <AbsoluteFill
      style={{
        justifyContent: position ? 'flex-start' : 'center',
        alignItems: position ? 'flex-start' : 'center',
        opacity: Math.min(opIn, opOut),
      }}
    >
      <div
        style={{
          ...positionStyle,
          transform: `scale(${scale}) translateY(${drift}px)`,
          fontFamily: TYPE.display,
          fontSize,
          fontWeight: 800,
          color,
          textAlign: align,
          letterSpacing: '-0.02em',
          lineHeight: 1.05,
          textShadow: '0 2px 24px rgba(0,0,0,0.6)',
          padding: '0 80px',
          maxWidth: '90%',
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
