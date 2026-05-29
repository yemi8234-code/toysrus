// 61.61 → 66.85s — "Toys R Us didn't die. It got killed. And the killers got paid."
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { TexturedBg } from '../components/TexturedBg.jsx';
import { EditorialCallout } from '../components/EditorialCallout.jsx';
import { palette } from '../theme.js';
import { easeOut, ease, sec } from '../lib/utils.js';

const LINE_TIMINGS = [
  { text: "it didn't die.",     startSec: 0.0 },
  { text: "it got killed.",     startSec: 1.1 },
  { text: "and the killers",    startSec: 2.8 },
  { text: "got paid.",          startSec: 3.6 },
];

export const S09_Sting = () => {
  const f = useCurrentFrame();

  return (
    <TexturedBg>
      {/* final draw-line across center */}
      <svg style={{position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none'}}>
        <line
          x1={60} y1={960}
          x2={Math.min(60 + (f/6) * 40, 1020)} y2={960}
          stroke={palette.ink}
          strokeWidth={1.2}
          strokeOpacity={0.3}
        />
      </svg>

      {/* stacked lines build one by one */}
      <div style={{
        position:'absolute',
        top:'30%', left:60, right:60,
      }}>
        {LINE_TIMINGS.map(({ text, startSec }, i) => {
          const lineF = f - startSec * 30;
          const lineIn = easeOut(Math.max(0, lineF), 0, 22, 60, 0);
          const lineFade = easeOut(Math.max(0, lineF), 0, 22, 0, 1);
          return (
            <div
              key={i}
              style={{
                transform:`translateY(${lineIn}px)`,
                opacity: lineFade,
                marginBottom: i === 1 ? 48 : 16, // extra gap before "got killed"
              }}
            >
              <EditorialCallout
                text={text}
                size={i < 2 ? 100 : 86}
                align="left"
                color={i === 1 ? palette.ink : (i >= 2 ? palette.inkSoft : palette.midGrey)}
                weight={i === 1 ? 900 : 700}
              />
            </div>
          );
        })}
      </div>
    </TexturedBg>
  );
};
