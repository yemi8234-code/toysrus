import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate, random} from 'remotion';
import {Scene3D} from './Scene3D';

const Coin: React.FC<{seed: number}> = ({seed}) => {
  const frame = useCurrentFrame();
  const x = (random(`coin-x-${seed}`) - 0.5) * 2.5;
  const z = (random(`coin-z-${seed}`) - 0.5) * 2.5;
  const fallSpeed = 0.06 + random(`coin-s-${seed}`) * 0.04;
  const phase = (random(`coin-p-${seed}`) * 200) % 200;
  const y = 4 - ((frame * fallSpeed + phase) % 14);
  const rot = frame * 0.12 + seed;

  return (
    <mesh position={[x, y, z]} rotation={[Math.PI / 2, 0, rot]}>
      <cylinderGeometry args={[0.18, 0.18, 0.04, 24]} />
      <meshPhysicalMaterial
        color="#d4af37"
        metalness={0.9}
        roughness={0.18}
        emissive="#d4af37"
        emissiveIntensity={0.25}
      />
    </mesh>
  );
};

const DrainHole: React.FC = () => {
  return (
    <group position={[0, -3, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.6, 1.4, 32]} />
        <meshBasicMaterial color="#dc2626" transparent opacity={0.3} />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.6, 0.2, 1.5, 24]} />
        <meshBasicMaterial color="#000" />
      </mesh>
    </group>
  );
};

export const MoneyDrain: React.FC<{
  coinCount?: number;
}> = ({coinCount = 60}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();

  const orbit = interpolate(frame, [0, durationInFrames], [-0.15, 0.15]);
  const camX = Math.sin(orbit) * 7;
  const camZ = Math.cos(orbit) * 7;

  return (
    <Scene3D cameraPosition={[camX, 2.5, camZ]}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 4]} intensity={1.1} color="#fffaf2" />
      <pointLight position={[0, -2, 0]} intensity={0.8} color="#dc2626" />
      <pointLight position={[0, 3, 2]} intensity={0.6} color="#d4af37" />
      <hemisphereLight args={['#fffaf2', '#0a0a12', 0.4]} />

      {Array.from({length: coinCount}).map((_, i) => (
        <Coin key={i} seed={i} />
      ))}
      <DrainHole />

      <fog attach="fog" args={['#0a0a12', 8, 18]} />
    </Scene3D>
  );
};
