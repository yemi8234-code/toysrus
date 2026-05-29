// 66.85 → 67.19s — "Follow — I expose the companies behind it."
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { TexturedBg } from '../components/TexturedBg.jsx';
import { EditorialCallout } from '../components/EditorialCallout.jsx';
import { palette } from '../theme.js';
import { easeOut } from '../lib/utils.js';

export const S10_CTA = () => {
  const f = useCurrentFrame();
  const lineW = Math.min(f * 55, 960);
  const textIn = easeOut(f, 4, 22, 30, 0);
  const textFade = easeOut(f, 4, 22, 0, 1);

  return (
    <TexturedBg>
      {/* single confident line drawn across */}
      <svg style={{position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none'}}>
        <line
          x1={60} y1={680}
          x2={60 + lineW} y2={680}
          stroke={palette.ink}
          strokeWidth={2}
          strokeOpacity={0.5}
        />
      </svg>

      <div style={{
        position:'absolute',
        top:'38%', left:60, right:60,
        opacity: textFade,
        transform:`translateY(${textIn}px)`,
      }}>
        <EditorialCallout
          text="follow."
          size={120}
          color={palette.ink}
          weight={900}
        />
        <EditorialCallout
          text="i expose the companies behind it."
          size={46}
          color={palette.midGrey}
          style={{ marginTop: 20, maxWidth: 620 }}
        />
      </div>
    </TexturedBg>
  );
};
