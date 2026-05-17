import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {Scene3D} from './Scene3D';

const Ring: React.FC<{
  radius: number;
  tube: number;
  rotation: [number, number, number];
  color: string;
  speed: number;
}> = ({radius, tube, rotation, color, speed}) => {
  const frame = useCurrentFrame();
  return (
    <mesh
      rotation={[
        rotation[0] + frame * speed * 0.5,
        rotation[1] + frame * speed,
        rotation[2],
      ]}
    >
      <torusGeometry args={[radius, tube, 12, 64]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.6}
        roughness={0.3}
        emissive={color}
        emissiveIntensity={0.25}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
};

export const DataOrb: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const orbit = interpolate(frame, [0, durationInFrames], [-0.15, 0.15]);
  const camX = Math.sin(orbit) * 6;
  const camZ = Math.cos(orbit) * 6;

  return (
    <Scene3D cameraPosition={[camX, 0.5, camZ]}>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={1.2} color="#dc2626" />
      <pointLight position={[3, 3, 3]} intensity={0.6} color="#d4af37" />
      <hemisphereLight args={['#dc2626', '#050507', 0.3]} />

      <mesh>
        <icosahedronGeometry args={[1.0, 1]} />
        <meshPhysicalMaterial
          color="#0f1418"
          metalness={0.9}
          roughness={0.15}
          emissive="#dc2626"
          emissiveIntensity={0.6}
          wireframe
        />
      </mesh>

      <mesh>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshPhysicalMaterial
          color="#dc2626"
          metalness={0.95}
          roughness={0.1}
          emissive="#dc2626"
          emissiveIntensity={0.4}
        />
      </mesh>

      <Ring radius={1.8} tube={0.02} rotation={[0, 0, 0]} color="#d4af37" speed={0.018} />
      <Ring radius={2.3} tube={0.02} rotation={[Math.PI / 3, 0, 0]} color="#dc2626" speed={-0.013} />
      <Ring radius={2.8} tube={0.018} rotation={[0, 0, Math.PI / 4]} color="#f5f5f7" speed={0.009} />

      <fog attach="fog" args={['#050507', 4, 14]} />
    </Scene3D>
  );
};
