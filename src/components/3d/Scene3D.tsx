import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {ThreeCanvas} from '@remotion/three';

export const Scene3D: React.FC<{
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  background?: string;
}> = ({children, cameraPosition = [0, 0, 8], background = '#050507'}) => {
  const {width, height} = useVideoConfig();

  return (
    <AbsoluteFill style={{background}}>
      <ThreeCanvas
        width={width}
        height={height}
        camera={{position: cameraPosition, fov: 35, near: 0.1, far: 200}}
        gl={{antialias: true, alpha: true}}
      >
        {children}
      </ThreeCanvas>
    </AbsoluteFill>
  );
};

export const useDriveFrame = () => {
  const frame = useCurrentFrame();
  return frame;
};
