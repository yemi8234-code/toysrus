// 37.98 → 47.03s — "Overnight... five billion... $400M/year vanished... could have saved..."
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { TexturedBg } from '../components/TexturedBg.jsx';
import { LineWork } from '../components/LineWork.jsx';
import { EditorialCallout } from '../components/EditorialCallout.jsx';
import { CoinStack } from '../components/Obj3D.jsx';
import { palette } from '../theme.js';
import { easeOut, ease, sec } from '../lib/utils.js';

export const S06_Drain = () => {
  const f = useCurrentFrame();

  const overnightIn = easeOut(f, 0, 18, 40, 0);
  const bigDebtIn   = easeOut(f, sec(0.5), sec(1.5), 60, 0);
  const arrowIn     = ease(f, sec(2.0), sec(3.2), 0, 1);
  const drainIn     = easeOut(f, sec(2.8), sec(4.0), 30, 0);

  // Animate repeating "drain" pulses after $400M intro
  const drainPulse  = f > sec(3.5) ? (f % 30) / 30 : 0;

  return (
    <TexturedBg>
      {/* diagonal drain arrows */}
      <LineWork
        lines={[
          [0.5, 0.52, 0.08, 0.82],
          [0.5, 0.52, 0.92, 0.82],
          [0.5, 0.52, 0.5,  0.88],
        ]}
        opacity={arrowIn * 0.55}
      />

      {/* "overnight" */}
      <div style={{
        position:'absolute',
        top:'8%', left:60,
        transform:`translateY(${overnightIn}px)`,
        opacity: Math.max(0, 1 - overnightIn/40),
      }}>
        <EditorialCallout text="overnight," size={54} color={palette.inkSoft}/>
      </div>

      {/* $5B debt pile */}
      <div style={{
        position:'absolute',
        top:'24%', left:'50%',
        transform:`translate(-50%, 0) translateY(${bigDebtIn}px)`,
        opacity: Math.max(0, 1 - bigDebtIn/60),
        textAlign:'center',
      }}>
        <CoinStack size={120} big={true}/>
        <EditorialCallout
          text="$5 billion in debt"
          size={58}
          align="center"
          color={palette.ink}
          style={{ marginTop: 18 }}
        />
      </div>

      {/* drain counter */}
      <div style={{
        position:'absolute',
        bottom:'22%', left:60, right:60,
        transform:`translateY(${drainIn}px)`,
        opacity: Math.max(0, 1 - drainIn/30),
      }}>
        <EditorialCallout
          text="$400m / year"
          size={84}
          align="center"
          color={palette.ink}
        />
        <EditorialCallout
          text="into interest."
          size={44}
          align="center"
          color={palette.midGrey}
          style={{ marginTop: 8 }}
        />
      </div>

      {/* drain pulse indicator */}
      {f > sec(3.5) && (
        <div style={{
          position:'absolute',
          bottom:'8%', left:'50%',
          transform:'translateX(-50%)',
          opacity: 1 - drainPulse,
          width: 60 + drainPulse * 20,
          height: 60 + drainPulse * 20,
          borderRadius:'50%',
          border:`2px solid ${palette.ink}`,
          marginLeft: -(30 + drainPulse*10),
        }}/>
      )}
    </TexturedBg>
  );
};
