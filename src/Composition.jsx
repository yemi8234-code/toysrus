import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { CaptionBar } from './components/CaptionBar.jsx';
import { S01_Hook }      from './scenes/S01_Hook.jsx';
import { S02_Establish } from './scenes/S02_Establish.jsx';
import { S03_Amazon }    from './scenes/S03_Amazon.jsx';
import { S04_ThreeFirms }from './scenes/S04_ThreeFirms.jsx';
import { S05_House }     from './scenes/S05_House.jsx';
import { S06_Drain }     from './scenes/S06_Drain.jsx';
import { S07_Collapse }  from './scenes/S07_Collapse.jsx';
import { S08_Twist }     from './scenes/S08_Twist.jsx';
import { S09_Sting }     from './scenes/S09_Sting.jsx';
import { S10_CTA }       from './scenes/S10_CTA.jsx';

// All times in seconds; converted to frames at 30fps inline.
const FPS = 30;
const f = s => Math.round(s * FPS);

// Scene cuts — derived from phrase/silence map
const SCENES = [
  { C: S01_Hook,      start: 0.0,   end: 4.756  },
  { C: S02_Establish, start: 4.756, end: 15.202  },
  { C: S03_Amazon,    start: 15.202,end: 19.487  },
  { C: S04_ThreeFirms,start: 19.487,end: 32.810  },
  { C: S05_House,     start: 32.810,end: 37.982  },
  { C: S06_Drain,     start: 37.982,end: 47.027  },
  { C: S07_Collapse,  start: 47.027,end: 53.360  },
  { C: S08_Twist,     start: 53.360,end: 61.610  },
  { C: S09_Sting,     start: 61.610,end: 66.854  },
  { C: S10_CTA,       start: 66.854,end: 67.187  },
];

export const ToysRUsDoc = () => {
  return (
    <AbsoluteFill>
      {/* VO audio */}
      <Audio src={staticFile('vo.mp3')} volume={1}/>

      {/* scenes */}
      {SCENES.map(({ C, start, end }, i) => (
        <Sequence
          key={i}
          from={f(start)}
          durationInFrames={f(end) - f(start)}
        >
          <AbsoluteFill>
            <C/>
          </AbsoluteFill>
        </Sequence>
      ))}

      {/* caption bar — always on top */}
      <CaptionBar/>
    </AbsoluteFill>
  );
};
