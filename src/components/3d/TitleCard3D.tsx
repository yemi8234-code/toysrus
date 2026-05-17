import React, {useMemo} from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, random} from 'remotion';
import {Float} from '@react-three/drei';
import {Scene3D} from './Scene3D';
import {COLORS, TYPE} from '../../lib/design-tokens';

const FloatingShard: React.FC<{seed: number}> = ({seed}) => {
  const frame = useCurrentFrame();
  const x = (random(`tc-x-${seed}`) - 0.5) * 8;
  const y = (random(`tc-y-${seed}`) - 0.5) * 4;
  const z = (random(`tc-z-${seed}`) - 0.5) * 5 - 1;
  const rotSpeed = 0.005 + random(`tc-r-${seed}`) * 0.01;
  const float = Math.sin((frame + seed * 12) * 0.02) * 0.15;

  return (
    <mesh
      position={[x, y + float, z]}
      rotation={[
        frame * rotSpeed + seed,
        frame * rotSpeed * 1.3,
        seed * 0.4,
      ]}
    >
      <boxGeometry args={[0.18, 0.18, 0.18]} />
      <meshPhysicalMaterial
        color={seed % 3 === 0 ? '#dc2626' : seed % 3 === 1 ? '#d4af37' : '#f5f5f7'}
        metalness={0.7}
        roughness={0.2}
        emissive={seed % 3 === 0 ? '#dc2626' : '#000'}
        emissiveIntensity={seed % 3 === 0 ? 0.3 : 0}
      />
    </mesh>
  );
};

const HoveringBlocks: React.FC = () => {
  const frame = useCurrentFrame();
  const positions = useMemo(
    () =>
      Array.from({length: 5}).map((_, i) => ({
        x: (i - 2) * 1.6,
        y: 0,
      })),
    [],
  );

  return (
    <Float speed={0.6} rotationIntensity={0.08} floatIntensity={0.15}>
      <group>
        {positions.map((p, i) => {
          const off = Math.sin((frame + i * 18) * 0.025) * 0.12;
          return (
            <mesh key={i} position={[p.x, p.y + off, 0]} castShadow>
              <boxGeometry args={[1.05, 1.4, 0.55]} />
              <meshPhysicalMaterial
                color="#0f0f14"
                metalness={0.9}
                roughness={0.15}
                clearcoat={0.8}
                clearcoatRoughness={0.05}
                envMapIntensity={1.3}
              />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
};

const Title3DBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const dollyZ = interpolate(frame, [0, durationInFrames], [13, 9], {
    extrapolateRight: 'clamp',
  });

  return (
    <Scene3D cameraPosition={[0, 0, dollyZ]}>
      <ambientLight intensity={0.18} />
      <directionalLight position={[8, 10, 8]} intensity={1.4} color="#fffaf2" castShadow />
      <directionalLight position={[-8, -4, 4]} intensity={0.8} color="#dc2626" />
      <pointLight position={[0, 0, 6]} intensity={0.7} color="#d4af37" />
      <pointLight position={[5, 4, 3]} intensity={0.5} color="#fffaf2" />
      <hemisphereLight args={['#fffaf2', '#0a0d14', 0.35]} />

      <HoveringBlocks />

      {Array.from({length: 40}).map((_, i) => (
        <FloatingShard key={i} seed={i} />
      ))}

      <fog attach="fog" args={['#050507', 7, 22]} />
    </Scene3D>
  );
};

export const TitleCard3D: React.FC<{
  text?: string;
  dollyDirection?: 'in' | 'out';
}> = ({text = 'TOYS "R" US'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const textT = spring({
    frame: frame - 12,
    fps,
    config: {damping: 200, stiffness: 60, mass: 1.2},
  });
  const textScale = interpolate(textT, [0, 1], [0.92, 1]);
  const textOp = interpolate(frame, [12, 36], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const subOp = interpolate(frame, [40, 72], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rule = interpolate(frame, [60, 96], [0, 200], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{background: '#050507'}}>
      <Title3DBackground />
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            transform: `scale(${textScale})`,
            opacity: textOp,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: TYPE.display,
              fontSize: 220,
              fontWeight: 800,
              color: COLORS.text,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              textShadow: '0 0 80px rgba(0,0,0,0.9), 0 0 200px rgba(220,38,38,0.25)',
              mixBlendMode: 'screen',
            }}
          >
            {text}
          </div>
          <div
            style={{
              width: rule,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${COLORS.accent}, transparent)`,
              margin: '40px auto 0',
            }}
          />
          <div
            style={{
              marginTop: 32,
              fontFamily: TYPE.display,
              fontSize: 36,
              color: COLORS.accentGold,
              letterSpacing: '0.42em',
              textTransform: 'uppercase',
              opacity: subOp,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            1948 — 2018
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
