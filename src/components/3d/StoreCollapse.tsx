import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate, spring, random} from 'remotion';
import {Environment} from '@react-three/drei';
import {Scene3D} from './Scene3D';

const Panel: React.FC<{
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  fallFrame: number;
}> = ({position, size, color, fallFrame}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = spring({
    frame: frame - fallFrame,
    fps,
    config: {damping: 30, stiffness: 30, mass: 1.5},
  });
  const fall = interpolate(t, [0, 1], [0, -8]);
  const tilt = interpolate(t, [0, 1], [0, Math.PI / 3]);
  const opacity = interpolate(frame - fallFrame, [40, 80], [1, 0.1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <mesh
      position={[position[0], position[1] + fall, position[2]]}
      rotation={[tilt, 0, tilt * 0.3]}
    >
      <boxGeometry args={size} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.4}
        roughness={0.5}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
};

const FlickerLight: React.FC<{
  position: [number, number, number];
  baseIntensity: number;
}> = ({position, baseIntensity}) => {
  const frame = useCurrentFrame();
  const dropAt = 30;
  const flicker =
    frame > dropAt
      ? random(`fl-${Math.floor(frame / 3)}`) > 0.65
        ? 0.2
        : 0.9
      : 1;
  const fade = interpolate(frame, [90, 150], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <pointLight
      position={position}
      intensity={baseIntensity * flicker * fade}
      color="#fffaf2"
      distance={12}
    />
  );
};

export const StoreCollapse: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();

  const camX = interpolate(frame, [0, durationInFrames], [-2, 6]);
  const camZ = interpolate(frame, [0, durationInFrames], [12, 8]);
  const camY = interpolate(frame, [0, durationInFrames], [2.5, 3.5]);

  return (
    <Scene3D cameraPosition={[camX, camY, camZ]} background="#030305">
      <ambientLight intensity={0.15} />
      <FlickerLight position={[0, 4, 2]} baseIntensity={1.2} />
      <FlickerLight position={[-4, 4, 2]} baseIntensity={0.6} />
      <FlickerLight position={[4, 4, 2]} baseIntensity={0.6} />
      <directionalLight position={[2, 6, 4]} intensity={0.2} color="#fffaf2" />
      <Environment preset="night" />

      <mesh position={[0, -0.5, 0]} receiveShadow>
        <boxGeometry args={[12, 0.2, 4]} />
        <meshPhysicalMaterial color="#1a1a20" roughness={0.9} />
      </mesh>

      <Panel position={[-3, 1, 0]} size={[1.8, 3, 0.2]} color="#2a1820" fallFrame={0} />
      <Panel position={[-1, 1, 0]} size={[1.8, 3, 0.2]} color="#2a1820" fallFrame={20} />
      <Panel position={[1, 1, 0]} size={[1.8, 3, 0.2]} color="#2a1820" fallFrame={40} />
      <Panel position={[3, 1, 0]} size={[1.8, 3, 0.2]} color="#2a1820" fallFrame={60} />

      <Panel position={[0, 3.5, 0]} size={[8, 0.8, 0.3]} color="#0f1418" fallFrame={80} />

      <Panel position={[-3.4, 1, 0.1]} size={[0.1, 2, 0.2]} color="#dc2626" fallFrame={10} />
      <Panel position={[3.4, 1, 0.1]} size={[0.1, 2, 0.2]} color="#dc2626" fallFrame={30} />

      <fog attach="fog" args={['#030305', 6, 22]} />
    </Scene3D>
  );
};
