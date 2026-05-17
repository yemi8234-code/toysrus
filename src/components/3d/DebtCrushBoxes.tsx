import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';
import {Scene3D} from './Scene3D';
import {COLORS, TYPE} from '../../lib/design-tokens';

type LabeledBox = {
  label: string;
  position: [number, number, number];
  enterFrame: number;
};

const Label3D: React.FC<{
  text: string;
  position: [number, number, number];
  enterFrame: number;
  size?: [number, number, number];
}> = ({position, enterFrame, size = [2.4, 1.0, 2.4]}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = spring({
    frame: frame - enterFrame,
    fps,
    config: {damping: 200, stiffness: 50, mass: 1.4},
  });
  const yOffset = interpolate(t, [0, 1], [10, 0]);

  return (
    <mesh position={[position[0], position[1] + yOffset, position[2]]} castShadow>
      <boxGeometry args={size} />
      <meshPhysicalMaterial
        color="#f5f5f7"
        metalness={0.5}
        roughness={0.3}
        clearcoat={0.6}
      />
    </mesh>
  );
};

const TwoDLabel: React.FC<{
  text: string;
  centerX: string;
  centerY: string;
  enterFrame: number;
  color?: string;
}> = ({text, centerX, centerY, enterFrame, color = COLORS.text}) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [enterFrame + 8, enterFrame + 24], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        position: 'absolute',
        left: centerX,
        top: centerY,
        transform: 'translate(-50%, -50%)',
        fontFamily: TYPE.display,
        fontSize: 44,
        fontWeight: 800,
        color,
        letterSpacing: '-0.01em',
        opacity: op,
        textShadow: '0 4px 24px rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.7)',
        textAlign: 'center',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </div>
  );
};

export const DebtCrushBoxes: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames, fps} = useVideoConfig();

  const orbit = interpolate(frame, [0, durationInFrames], [-0.2, 0.25]);
  const camX = Math.sin(orbit) * 10;
  const camZ = Math.cos(orbit) * 10;

  const crushT = spring({
    frame: frame - 80,
    fps,
    config: {damping: 200, stiffness: 50, mass: 1.4},
  });
  const baseScaleY = interpolate(crushT, [0, 1], [1, 0.7]);
  const baseScaleXZ = interpolate(crushT, [0, 1], [1, 1.08]);

  return (
    <AbsoluteFill style={{background: '#050507'}}>
      <Scene3D cameraPosition={[camX, 3, camZ]}>
        <ambientLight intensity={0.25} />
        <directionalLight position={[8, 12, 6]} intensity={1.3} color="#fffaf2" castShadow />
        <directionalLight position={[-6, 4, 8]} intensity={0.5} color="#dc2626" />
        <pointLight position={[0, 6, 4]} intensity={0.6} color="#d4af37" />
        <hemisphereLight args={['#fffaf2', '#0a0a12', 0.45]} />

        <mesh
          position={[0, 0, 0]}
          scale={[baseScaleXZ, baseScaleY, baseScaleXZ]}
          castShadow
        >
          <boxGeometry args={[5.2, 1.0, 5.2]} />
          <meshPhysicalMaterial color="#dc2626" metalness={0.3} roughness={0.5} />
        </mesh>

        <Label3D text="BAIN" position={[-2.2, 2.6, 0]} enterFrame={0} />
        <Label3D text="KKR" position={[0, 4.2, 0]} enterFrame={20} />
        <Label3D text="VORNADO" position={[2.2, 2.6, 0]} enterFrame={40} />

        <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[40, 40]} />
          <shadowMaterial opacity={0.4} />
        </mesh>

        <fog attach="fog" args={['#0a0a12', 12, 30]} />
      </Scene3D>

      <AbsoluteFill style={{pointerEvents: 'none'}}>
        <TwoDLabel text="BAIN" centerX="32%" centerY="34%" enterFrame={0} />
        <TwoDLabel text="KKR" centerX="50%" centerY="20%" enterFrame={20} />
        <TwoDLabel text="VORNADO" centerX="68%" centerY="34%" enterFrame={40} />
        <TwoDLabel
          text="TOYS R US"
          centerX="50%"
          centerY="68%"
          enterFrame={70}
          color={COLORS.accentGold}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
