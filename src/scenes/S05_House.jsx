// 32.81 → 37.98s — "It's like buying a house, and forcing the house to pay the mortgage."
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { TexturedBg } from '../components/TexturedBg.jsx';
import { LineWork } from '../components/LineWork.jsx';
import { House, WeightChain } from '../components/Obj3D.jsx';
import { EditorialCallout } from '../components/EditorialCallout.jsx';
import { palette } from '../theme.js';
import { easeOut, ease, sec } from '../lib/utils.js';

export const S05_House = () => {
  const f = useCurrentFrame();

  const houseIn   = easeOut(f, 0, 18, 80, 0);
  const weightDrop= ease(f, sec(2.0), sec(2.9), -300, 0); // weight drops from above
  const crushed   = f > sec(3.2);
  const labelIn   = easeOut(f, sec(2.5), sec(3.2), 20, 0);
  const analogyIn = easeOut(f, 2, 22, 30, 0);

  return (
    <TexturedBg>
      <LineWork
        lines={[[0.5, 0.1, 0.5, 0.85], [0.15, 0.6, 0.85, 0.6]]}
        opacity={0.35}
      />

      {/* the house */}
      <div style={{
        position:'absolute',
        top:'42%', left:'50%',
        transform:`translate(-50%, -50%) translateY(${houseIn}px)`,
        zIndex: 1,
      }}>
        <House size={260} crushed={crushed}/>
      </div>

      {/* the debt weight drops down */}
      <div style={{
        position:'absolute',
        top:'20%', left:'50%',
        transform:`translate(-50%, 0) translateY(${weightDrop}px)`,
        zIndex: 2,
      }}>
        <WeightChain size={150}/>
      </div>

      {/* "pay the mortgage" label */}
      <div style={{
        position:'absolute',
        bottom:'26%', left:60, right:60,
        transform:`translateY(${labelIn}px)`,
        opacity: Math.max(0, 1 - labelIn/20),
      }}>
        <EditorialCallout
          text="pay the mortgage."
          size={76}
          align="center"
          color={palette.ink}
          highlight="the"
        />
      </div>

      {/* analogy callout at top */}
      <div style={{
        position:'absolute',
        top:'7%', left:60, right:60,
        opacity: Math.max(0, 1 - analogyIn/30),
      }}>
        <EditorialCallout
          text="it's like this."
          size={44}
          align="left"
          color={palette.midGrey}
        />
      </div>
    </TexturedBg>
  );
};
