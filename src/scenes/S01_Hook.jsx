// 0:00 → 4.76s  — "This company was worth twelve billion dollars. Then three men killed it on purpose."
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { TexturedBg } from '../components/TexturedBg.jsx';
import { LineWork, LINES } from '../components/LineWork.jsx';
import { ToyBlock } from '../components/Obj3D.jsx';
import { EditorialCallout } from '../components/EditorialCallout.jsx';
import { palette } from '../theme.js';
import { easeOut, ease, sec } from '../lib/utils.js';

export const S01_Hook = () => {
  const f = useCurrentFrame();

  const blockIn = easeOut(f, 0, 18, 60, 0);    // drops in from above
  const textIn  = easeOut(f, 20, 38, 30, 0);   // "$12B" slides up
  const cracked = f > sec(3.0);                 // crack on "killed"
  const slashW  = ease(f, sec(3.0), sec(4.4), 0, 1080);
  const linesIn = easeOut(f, 8, 26, 0, 1);

  return (
    <TexturedBg>
      <LineWork lines={LINES.spotBeam} opacity={linesIn * 0.5}/>

      {/* toy block centred */}
      <div style={{
        position:'absolute',
        top: '36%', left: '50%',
        transform: `translate(-50%, -50%) translateY(${blockIn}px)`,
      }}>
        <ToyBlock size={260} cracked={cracked}/>
      </div>

      {/* "twelve billion dollars" — background callout */}
      <div style={{
        position:'absolute',
        bottom: '30%', left: 60, right: 60,
        transform: `translateY(${textIn}px)`,
        opacity: Math.max(0, 1 - textIn/30),
      }}>
        <EditorialCallout
          text="twelve billion dollars."
          size={68}
          align="center"
          color={palette.ink}
        />
      </div>

      {/* slash line across block on "killed" */}
      {cracked && (
        <svg style={{
          position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none',
        }}>
          <line
            x1={540 - slashW/2} y1={600}
            x2={540 - slashW/2 + slashW} y2={820}
            stroke={palette.ink} strokeWidth={3.5} strokeOpacity={0.7}
          />
        </svg>
      )}
    </TexturedBg>
  );
};
