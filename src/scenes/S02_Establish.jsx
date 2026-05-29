// 4.76 → 15.20s — "Toys R Us. It defined childhood for an entire generation. By 1998..."
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { TexturedBg } from '../components/TexturedBg.jsx';
import { OctagonFrame } from '../components/OctagonFrame.jsx';
import { LineWork, LINES } from '../components/LineWork.jsx';
import { EditorialCallout } from '../components/EditorialCallout.jsx';
import { palette } from '../theme.js';
import { easeOut, ease } from '../lib/utils.js';

// Placeholder graphic for the Toys R Us store interior
const StoreGraphic = () => (
  <div style={{
    width:'100%', height:'100%',
    background:`linear-gradient(160deg, #c8c6c0 0%, #9a9890 40%, #6a6860 100%)`,
    position:'relative',
    overflow:'hidden',
  }}>
    {/* aisle shelves abstracted */}
    {[0,1,2,3].map(i => (
      <div key={i} style={{
        position:'absolute',
        left: `${10 + i*22}%`, top:'20%', bottom:'5%', width:'3%',
        background:'rgba(30,28,25,0.3)',
      }}/>
    ))}
    {/* shelves horizontal */}
    {[0,1,2,3,4].map(i => (
      <div key={i} style={{
        position:'absolute',
        left:'5%', right:'5%',
        top:`${22 + i*15}%`, height:'2%',
        background:'rgba(30,28,25,0.18)',
      }}/>
    ))}
    {/* "TOYS R US" lettering */}
    <div style={{
      position:'absolute', top:'6%', left:0, right:0,
      textAlign:'center',
      fontFamily:"'Helvetica Neue',Helvetica,Arial,sans-serif",
      fontWeight:900, fontSize:42, letterSpacing:'0.15em',
      color:'rgba(20,18,14,0.55)',
      textTransform:'uppercase',
    }}>toys⭑r⭑us</div>
  </div>
);

export const S02_Establish = () => {
  const f = useCurrentFrame();

  const frameIn   = easeOut(f,  0, 24, 80, 0);   // frame slides right→center
  const linesIn   = easeOut(f,  8, 28, 0, 1);
  const label1In  = easeOut(f, 18, 36, 20, 0);
  const label2In  = easeOut(f, 30, 50, 20, 0);

  return (
    <TexturedBg>
      <LineWork lines={LINES.cornerConnectors} opacity={linesIn * 0.45}/>

      {/* main framed image */}
      <div style={{
        position:'absolute',
        top:'28%', left:'50%',
        transform:`translate(-50%, -50%) translateX(${frameIn}px)`,
      }}>
        <OctagonFrame width={480} height={540} label="toys r us">
          <StoreGraphic/>
        </OctagonFrame>
      </div>

      {/* callout: "1 in 5 toys" */}
      <div style={{
        position:'absolute',
        top:'72%', left:60,
        transform:`translateY(${label1In}px)`,
        opacity: Math.max(0, 1 - label1In/20),
      }}>
        <EditorialCallout text="1 in 5 toys" size={82} color={palette.ink}/>
        <EditorialCallout text="in america" size={40} color={palette.midGrey} style={{marginTop:4}}/>
      </div>

      {/* callout: "by 1998" */}
      <div style={{
        position:'absolute',
        top:'80%', right:60,
        transform:`translateY(${label2In}px)`,
        opacity: Math.max(0, 1 - label2In/20),
      }}>
        <EditorialCallout text="by 1998" size={46} align="right" color={palette.inkSoft}/>
      </div>
    </TexturedBg>
  );
};
