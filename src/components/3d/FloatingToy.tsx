import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate, random} from 'remotion';
import {Environment} from '@react-three/drei';
import {Scene3D} from './Scene3D';

const BlockStack: React.FC = () => {
  const frame = useCurrentFrame();
  const rot = (frame / 30) * 0.4;

  const blocks = [
    {y: -1.6, color: '#dc2626', label: 'A'},
    {y: -0.4, color: '#d4af37', label: 'B'},
    {y: 0.8, color: '#3b82f6', label: 'C'},
    {y: 2.0, color: '#10b981', label: 'D'},
  ];

  return (
    <group rotation={[0, rot, 0]}>
      {blocks.map((b, i) => (
        <mesh key={i} position={[0, b.y, 0]} castShadow>
          <boxGeometry args={[1.4, 1.0, 1.4]} />
          <meshPhysicalMaterial
            color={b.color}
            metalness={0.1}
            roughness={0.55}
            clearcoat={0.4}
          />
        </mesh>
      ))}
    </group>
  );
};

const RockingHorseSilhouette: React.FC = () => {
  const frame = useCurrentFrame();
  const rock = Math.sin(frame * 0.06) * 0.15;
  const yoff = Math.cos(frame * 0.06) * 0.06;

  return (
    <group rotation={[0, rock * 0.3, rock]} position={[0, yoff, 0]}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[1.8, 0.7, 0.6]} />
        <meshPhysicalMaterial color="#dc2626" roughness={0.6} metalness={0.2} />
      </mesh>
      <mesh position={[0.7, 1.0, 0]} castShadow>
        <boxGeometry args={[0.5, 0.7, 0.5]} />
        <meshPhysicalMaterial color="#dc2626" roughness={0.6} metalness={0.2} />
      </mesh>
      <mesh position={[1.0, 0.4, 0]} castShadow>
        <boxGeometry args={[0.6, 0.2, 0.5]} />
        <meshPhysicalMaterial color="#d4af37" roughness={0.4} metalness={0.5} />
      </mesh>
      <mesh position={[0, -0.4, 0]} rotation={[0, 0, 0]} castShadow>
        <torusGeometry args={[1.3, 0.12, 16, 32, Math.PI]} />
        <meshPhysicalMaterial color="#7c2d12" roughness={0.7} />
      </mesh>
    </group>
  );
};

const ParticleField: React.FC<{count?: number}> = ({count = 80}) => {
  const frame = useCurrentFrame();
  return (
    <group>
      {Array.from({length: count}).map((_, i) => {
        const seed = i;
        const baseX = (random(`px-${seed}`) - 0.5) * 14;
        const baseY = (random(`py-${seed}`) - 0.5) * 8;
        const baseZ = (random(`pz-${seed}`) - 0.5) * 6 - 2;
        const drift = ((frame * 0.5 + i * 11) % 200) / 50;
        const y = baseY + drift - 2;
        return (
          <mesh key={i} position={[baseX, y, baseZ]}>
            <sphereGeometry args={[0.02, 6, 6]} />
            <meshBasicMaterial color="#fffaf2" transparent opacity={0.4} />
          </mesh>
        );
      })}
    </group>
  );
};

export const FloatingToy: React.FC<{
  variant?: 'blocks' | 'horse';
}> = ({variant = 'blocks'}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const orbit = interpolate(frame, [0, durationInFrames], [-0.3, 0.3]);
  const camX = Math.sin(orbit) * 8;
  const camZ = Math.cos(orbit) * 8;
  const camY = interpolate(frame, [0, durationInFrames], [1.5, 0.5]);

  return (
    <Scene3D cameraPosition={[camX, camY, camZ]}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[6, 10, 4]} intensity={1.2} color="#fffaf2" castShadow />
      <directionalLight position={[-6, 2, 6]} intensity={0.5} color="#dc2626" />
      <pointLight position={[0, 4, 5]} intensity={0.8} color="#d4af37" />
      <Environment preset="sunset" />
      {variant === 'blocks' ? <BlockStack /> : <RockingHorseSilhouette />}
      <ParticleField />
      <fog attach="fog" args={['#080810', 8, 24]} />
    </Scene3D>
  );
};
