import React, {useMemo} from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {Environment, Float} from '@react-three/drei';
import * as THREE from 'three';
import {Scene3D} from './Scene3D';

const Letter: React.FC<{
  char: string;
  position: [number, number, number];
}> = ({char, position}) => {
  const frame = useCurrentFrame();
  const float = Math.sin((frame + position[0] * 8) * 0.04) * 0.08;

  return (
    <mesh position={[position[0], position[1] + float, position[2]]} castShadow>
      <boxGeometry args={[1.0, 1.4, 0.5]} />
      <meshPhysicalMaterial
        color="#f5f5f7"
        metalness={0.6}
        roughness={0.25}
        clearcoat={0.7}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
};

export const TitleCard3D: React.FC<{
  text?: string;
  dollyDirection?: 'in' | 'out';
}> = ({text = 'TOYS', dollyDirection = 'in'}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();

  const dollyZ = interpolate(
    frame,
    [0, durationInFrames],
    dollyDirection === 'in' ? [12, 6] : [6, 12],
    {extrapolateRight: 'clamp'},
  );

  const positions = useMemo(() => {
    const total = text.length;
    const spacing = 1.4;
    return text.split('').map((char, i) => ({
      char,
      pos: [(i - (total - 1) / 2) * spacing, 0, 0] as [number, number, number],
    }));
  }, [text]);

  return (
    <Scene3D cameraPosition={[0, 0, dollyZ]}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[8, 10, 8]} intensity={1.4} color="#fffaf2" />
      <directionalLight position={[-8, -4, 4]} intensity={0.7} color="#dc2626" />
      <pointLight position={[0, 0, 6]} intensity={0.6} color="#d4af37" />
      <Environment preset="sunset" />
      <Float speed={1.0} rotationIntensity={0.18} floatIntensity={0.2}>
        {positions.map((p, i) => (
          <Letter key={i} char={p.char} position={p.pos} />
        ))}
      </Float>
      <fog attach="fog" args={['#050507', 6, 22]} />
    </Scene3D>
  );
};
