// 19.49 → 32.81s — "In 2005, three private equity firms — Bain, KKR, Vornado —
//                    bought Toys R Us... They borrowed... And then they made TRU pay..."
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { TexturedBg } from '../components/TexturedBg.jsx';
import { OctagonFrame } from '../components/OctagonFrame.jsx';
import { LineWork } from '../components/LineWork.jsx';
import { EditorialCallout } from '../components/EditorialCallout.jsx';
import { CoinStack } from '../components/Obj3D.jsx';
import { palette } from '../theme.js';
import { easeOut, ease, sec } from '../lib/utils.js';

const FirmLogo = ({ name, size = 200 }) => (
  <div style={{
    width:'100%', height:'100%',
    background:`linear-gradient(145deg, ${palette.paperDark} 0%, #888 100%)`,
    display:'flex', alignItems:'center', justifyContent:'center',
    flexDirection:'column',
  }}>
    <div style={{
      fontFamily:"'Helvetica Neue',Helvetica,Arial,sans-serif",
      fontWeight:900, fontSize: size*0.22,
      color:'rgba(20,18,14,0.7)',
      letterSpacing:'0.08em',
      textTransform:'lowercase',
    }}>{name}</div>
    {/* abstract logo mark */}
    <svg width={size*0.4} height={size*0.15} style={{marginTop:8}}>
      <rect x={0} y={4} width={size*0.12} height={size*0.08} fill="rgba(20,18,14,0.35)" rx="1"/>
      <rect x={size*0.14} y={0} width={size*0.12} height={size*0.12} fill="rgba(20,18,14,0.35)" rx="1"/>
      <rect x={size*0.28} y={4} width={size*0.12} height={size*0.08} fill="rgba(20,18,14,0.35)" rx="1"/>
    </svg>
  </div>
);

const FIRMS = ['bain', 'kkr', 'vornado'];
const OFFSETS = [-1, 0, 1]; // horizontal spread

export const S04_ThreeFirms = () => {
  const f = useCurrentFrame();

  const firmSize = 220;
  const slideIns = FIRMS.map((_, i) =>
    easeOut(f, i * 8 + 2, i * 8 + 22, 100, 0)
  );

  // debt/money visual appears after "six point six billion"
  const coinsIn  = easeOut(f, sec(5.5), sec(6.5), 60, 0);
  const debtShow = f > sec(8.5); // "they borrowed the rest"
  const arrowW   = ease(f, sec(8.5), sec(9.8), 0, 360);

  const linesIn  = easeOut(f, 6, 24, 0, 1);

  return (
    <TexturedBg>
      <LineWork
        lines={[
          [0.1, 0.46, 0.5, 0.72],
          [0.9, 0.46, 0.5, 0.72],
          [0.08, 0.46, 0.92, 0.46],
        ]}
        opacity={linesIn * 0.45}
      />

      {/* three firm frames */}
      {FIRMS.map((name, i) => (
        <div key={name} style={{
          position:'absolute',
          top:'18%',
          left:`${50 + OFFSETS[i] * 31}%`,
          transform:`translate(-50%, -50%) translateY(${slideIns[i]}px)`,
        }}>
          <OctagonFrame width={firmSize} height={firmSize * 0.85} label={name}>
            <FirmLogo name={name} size={firmSize}/>
          </OctagonFrame>
        </div>
      ))}

      {/* small stack (what they put in) vs debt label */}
      <div style={{
        position:'absolute',
        bottom:'28%', left:'24%',
        transform:`translateY(${coinsIn}px)`,
        opacity: Math.max(0, 1 - coinsIn/60),
      }}>
        <CoinStack size={80} big={false}/>
        <EditorialCallout text="their money" size={30} color={palette.midGrey} style={{marginTop:6, textAlign:'center'}}/>
      </div>

      {/* big debt pile */}
      <div style={{
        position:'absolute',
        bottom:'22%', right:'18%',
        transform:`translateY(${coinsIn}px)`,
        opacity: Math.max(0, 1 - coinsIn/60),
      }}>
        <CoinStack size={80} big={true}/>
        <EditorialCallout text="the debt" size={30} color={palette.ink} style={{marginTop:6, textAlign:'center'}}/>
      </div>

      {/* arrow connecting firms → TRU */}
      {debtShow && (
        <svg style={{position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none'}}>
          <defs>
            <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill={palette.ink} fillOpacity="0.6"/>
            </marker>
          </defs>
          <line
            x1={540} y1={600}
            x2={540 - arrowW/2 + arrowW} y2={900}
            stroke={palette.ink} strokeWidth={2.5} strokeOpacity={0.55}
            markerEnd="url(#arr)"
          />
        </svg>
      )}

      {/* callout: "$6.6B deal" */}
      <EditorialCallout
        text="$6.6 billion"
        size={60}
        align="center"
        color={palette.ink}
        style={{
          position:'absolute',
          top:'44%', left:60, right:60,
          opacity: easeOut(f, 14, 28, 0, 1),
        }}
      />
    </TexturedBg>
  );
};
