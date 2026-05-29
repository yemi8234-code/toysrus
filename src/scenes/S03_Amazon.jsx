// 15.20 → 19.49s — "Most people blame Amazon. They're wrong."
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { TexturedBg } from '../components/TexturedBg.jsx';
import { LineWork } from '../components/LineWork.jsx';
import { EditorialCallout } from '../components/EditorialCallout.jsx';
import { palette } from '../theme.js';
import { easeOut, ease, sec } from '../lib/utils.js';

const AmazonBox = ({ size = 120 }) => (
  <div style={{
    width: size, height: size * 0.72,
    background:`linear-gradient(145deg, ${palette.lightGrey} 0%, ${palette.midGrey} 100%)`,
    boxShadow:'0 16px 40px rgba(0,0,0,0.32)',
    position:'relative',
    borderRadius:4,
  }}>
    {/* tape stripe */}
    <div style={{
      position:'absolute', top:'35%', left:0, right:0, height:'8%',
      background:'rgba(80,78,72,0.3)',
    }}/>
    {/* amazon smile */}
    <svg style={{position:'absolute', inset:0, width:'100%', height:'100%'}}>
      <path d={`M ${size*0.3} ${size*0.52} Q ${size*0.5} ${size*0.62} ${size*0.7} ${size*0.52}`}
        stroke="rgba(20,18,14,0.45)" strokeWidth="2.5" fill="none"/>
    </svg>
    {/* label */}
    <div style={{
      position:'absolute', bottom:6, left:0, right:0, textAlign:'center',
      fontFamily:"'Helvetica Neue',Helvetica,Arial,sans-serif",
      fontWeight:700, fontSize:14, letterSpacing:'0.08em',
      color:'rgba(20,18,14,0.45)',
    }}>amazon</div>
  </div>
);

export const S03_Amazon = () => {
  const f = useCurrentFrame();

  const boxIn    = easeOut(f,  0, 16, -60, 0);
  const wrongIn  = easeOut(f, sec(1.4), sec(1.4)+20, 40, 0);
  const strikeW  = ease(f, sec(1.7), sec(2.2), 0, 300);

  return (
    <TexturedBg>
      <LineWork
        lines={[[0.1, 0.5, 0.9, 0.5]]}
        opacity={0.3}
      />

      {/* tiny Amazon box — dwarfed in negative space */}
      <div style={{
        position:'absolute',
        top:'40%', left:'50%',
        transform:`translate(-50%, -50%) translateY(${boxIn}px)`,
      }}>
        <AmazonBox size={130}/>
      </div>

      {/* "they're wrong." — large, confident */}
      <div style={{
        position:'absolute',
        bottom:'24%', left:60, right:60,
        transform:`translateY(${wrongIn}px)`,
        opacity: Math.max(0, 1 - wrongIn/40),
      }}>
        <EditorialCallout
          text="they're wrong."
          size={104}
          align="center"
          color={palette.ink}
        />
      </div>

      {/* strike through the Amazon box */}
      {f > sec(1.7) && (
        <svg style={{position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none'}}>
          <line
            x1={540 - strikeW/2} y1={700}
            x2={540 - strikeW/2 + strikeW} y2={760}
            stroke={palette.ink} strokeWidth={4} strokeOpacity={0.65}
          />
        </svg>
      )}
    </TexturedBg>
  );
};
