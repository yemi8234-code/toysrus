import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';
import {Scene3D} from './Scene3D';

const Label: React.FC<{
  text: string;
  position: [number, number, number];
  color: string;
  enterFrame: number;
  size?: [number, number, number];
}> = ({position, color, enterFrame, size = [2.4, 1.0, 2.4]}) => {
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
        color={color}
        metalness={0.5}
        roughness={0.3}
        clearcoat={0.6}
      />
    </mesh>
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
    <Scene3D cameraPosition={[camX, 3, camZ]}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[8, 12, 6]} intensity={1.3} color="#fffaf2" castShadow />
      <directionalLight position={[-6, 4, 8]} intensity={0.5} color="#dc2626" />
      <hemisphereLight args={['#fffaf2', '#0a0a12', 0.45]} />

      <mesh
        position={[0, 0, 0]}
        scale={[baseScaleXZ, baseScaleY, baseScaleXZ]}
        castShadow
      >
        <boxGeometry args={[5.2, 1.0, 5.2]} />
        <meshPhysicalMaterial color="#dc2626" metalness={0.3} roughness={0.5} />
      </mesh>

      <Label
        text="BAIN"
        position={[-2.2, 2.6, 0]}
        color="#f5f5f7"
        enterFrame={0}
      />
      <Label
        text="KKR"
        position={[0, 4.2, 0]}
        color="#f5f5f7"
        enterFrame={20}
      />
      <Label
        text="VORNADO"
        position={[2.2, 2.6, 0]}
        color="#f5f5f7"
        enterFrame={40}
      />

      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <shadowMaterial opacity={0.4} />
      </mesh>

      <fog attach="fog" args={['#0a0a12', 12, 30]} />
    </Scene3D>
  );
};
