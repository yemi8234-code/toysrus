// 47.03 → 53.36s — "By 2018, every store closed. 735. 33,000 jobs. Founder died."
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { TexturedBg } from '../components/TexturedBg.jsx';
import { LineWork } from '../components/LineWork.jsx';
import { OctagonFrame } from '../components/OctagonFrame.jsx';
import { EditorialCallout } from '../components/EditorialCallout.jsx';
import { palette } from '../theme.js';
import { easeOut, ease, sec } from '../lib/utils.js';

const ClosedStore = () => (
  <div style={{
    width:'100%', height:'100%',
    background:`linear-gradient(180deg, #5a5850 0%, #2a2820 100%)`,
    position:'relative',
    overflow:'hidden',
  }}>
    {/* boarded windows */}
    {[0,1].map(i => (
      <div key={i} style={{
        position:'absolute',
        left:`${15 + i*45}%`, top:'25%',
        width:'35%', height:'35%',
        background:'rgba(10,8,4,0.7)',
        border:'3px solid rgba(80,78,70,0.5)',
      }}>
        <svg width="100%" height="100%">
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="rgba(80,78,70,0.5)" strokeWidth="3"/>
          <line x1="100%" y1="0" x2="0" y2="100%" stroke="rgba(80,78,70,0.5)" strokeWidth="3"/>
        </svg>
      </div>
    ))}
    {/* CLOSED sign */}
    <div style={{
      position:'absolute', top:'6%', left:0, right:0, textAlign:'center',
      fontFamily:"'Helvetica Neue',Helvetica,Arial,sans-serif",
      fontWeight:900, fontSize:32, letterSpacing:'0.2em',
      color:'rgba(200,196,188,0.7)', textTransform:'uppercase',
    }}>closed</div>
    {/* halftone overlay via pseudo-stripes */}
    <div style={{
      position:'absolute', inset:0,
      backgroundImage:'repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 8px)',
    }}/>
  </div>
);

// Portrait placeholder for Charles Lazarus
const FounderPortrait = () => (
  <div style={{
    width:'100%', height:'100%',
    background:`linear-gradient(145deg, ${palette.paperDark} 0%, #888 60%, #555 100%)`,
    display:'flex', alignItems:'center', justifyContent:'center',
    flexDirection:'column', gap: 12,
  }}>
    {/* silhouette head */}
    <div style={{
      width:'45%', height:'45%',
      borderRadius:'50%',
      background:'rgba(20,18,14,0.5)',
      marginTop:'10%',
    }}/>
    <div style={{
      width:'55%', height:'25%',
      borderRadius:'40% 40% 0 0',
      background:'rgba(20,18,14,0.35)',
    }}/>
    <div style={{
      fontFamily:"'Helvetica Neue',Helvetica,Arial,sans-serif",
      fontWeight:700, fontSize:24, letterSpacing:'0.1em',
      color:'rgba(200,196,188,0.6)',
      textTransform:'lowercase',
      marginTop:8,
    }}>charles lazarus</div>
  </div>
);

export const S07_Collapse = () => {
  const f = useCurrentFrame();

  const storeIn     = easeOut(f, 0, 20, 80, 0);
  const n735In      = easeOut(f, sec(0.6), sec(1.4), 40, 0);
  const n33kIn      = easeOut(f, sec(1.6), sec(2.4), 40, 0);
  const founderIn   = easeOut(f, sec(3.5), sec(4.5), 100, 0);
  const founderFade = easeOut(f, sec(3.5), sec(4.5), 0, 1);
  const darkOverlay = ease(f, sec(3.2), sec(4.0), 0, 0.45);

  return (
    <TexturedBg>
      <LineWork
        lines={[[0.08, 0.35, 0.5, 0.58], [0.92, 0.35, 0.5, 0.58]]}
        opacity={0.35}
      />

      {/* closed store */}
      <div style={{
        position:'absolute',
        top:'20%', left:'50%',
        transform:`translate(-50%, -50%) translateY(${storeIn}px)`,
      }}>
        <OctagonFrame width={440} height={360}>
          <ClosedStore/>
        </OctagonFrame>
      </div>

      {/* 735 stores */}
      <div style={{
        position:'absolute',
        top:'46%', left:60,
        transform:`translateY(${n735In}px)`,
        opacity: Math.max(0, 1 - n735In/40),
      }}>
        <EditorialCallout text="735 stores." size={96} color={palette.ink}/>
      </div>

      {/* 33,000 jobs */}
      <div style={{
        position:'absolute',
        top:'60%', left:60,
        transform:`translateY(${n33kIn}px)`,
        opacity: Math.max(0, 1 - n33kIn/40),
      }}>
        <EditorialCallout text="33,000 jobs." size={72} color={palette.midGrey}/>
      </div>

      {/* darkness falls */}
      <div style={{
        position:'absolute', inset:0,
        background:`rgba(0,0,0,${darkOverlay})`,
        pointerEvents:'none',
      }}/>

      {/* founder portrait — appears last, in near-silence */}
      <div style={{
        position:'absolute',
        bottom:'12%', left:'50%',
        transform:`translate(-50%, 0) translateY(${founderIn}px)`,
        opacity: founderFade,
      }}>
        <OctagonFrame width={320} height={380}>
          <FounderPortrait/>
        </OctagonFrame>
        <EditorialCallout
          text="the founder died one week later."
          size={34}
          align="center"
          color={palette.lightGrey}
          style={{ marginTop: 50, width: 380, marginLeft: -30 }}
        />
      </div>
    </TexturedBg>
  );
};
