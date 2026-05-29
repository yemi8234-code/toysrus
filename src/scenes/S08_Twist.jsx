// 53.36 → 61.61s — "And the three firms that killed it? They walked away richer...
//                   Through fees and dividends, they pulled out more than they put in."
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { TexturedBg } from '../components/TexturedBg.jsx';
import { OctagonFrame } from '../components/OctagonFrame.jsx';
import { LineWork } from '../components/LineWork.jsx';
import { EditorialCallout } from '../components/EditorialCallout.jsx';
import { CoinStack } from '../components/Obj3D.jsx';
import { palette } from '../theme.js';
import { easeOut, ease, sec } from '../lib/utils.js';

const FirmCard = ({ name }) => (
  <div style={{
    width:'100%', height:'100%',
    background:`linear-gradient(160deg, ${palette.paperDark} 0%, #666 100%)`,
    display:'flex', alignItems:'center', justifyContent:'center',
  }}>
    <span style={{
      fontFamily:"'Helvetica Neue',Helvetica,Arial,sans-serif",
      fontWeight:900, fontSize:36, letterSpacing:'0.1em',
      color:'rgba(200,196,188,0.7)', textTransform:'lowercase',
    }}>{name}</span>
  </div>
);

const FIRMS = ['bain', 'kkr', 'vornado'];

export const S08_Twist = () => {
  const f = useCurrentFrame();

  const firmIns = FIRMS.map((_, i) =>
    easeOut(f, i*8, i*8+20, 120, 0)
  );
  const coinsIn = easeOut(f, sec(1.5), sec(2.5), 60, 0);
  const coinsFade = easeOut(f, sec(1.5), sec(2.5), 0, 1);
  const arrowW   = ease(f, sec(2.0), sec(3.5), 0, 1);
  const textIn   = easeOut(f, sec(5.0), sec(6.0), 30, 0);
  const textFade = easeOut(f, sec(5.0), sec(6.0), 0, 1);

  return (
    <TexturedBg dark={true}>
      {/* flowing-coins lines pointing into firm frames */}
      <LineWork
        lines={[
          [0.5, 0.72, 0.18, 0.28],
          [0.5, 0.72, 0.5,  0.22],
          [0.5, 0.72, 0.82, 0.28],
        ]}
        opacity={arrowW * 0.6}
        color={palette.lightGrey}
      />

      {/* firm frames top row */}
      {FIRMS.map((name, i) => (
        <div key={name} style={{
          position:'absolute',
          top:'20%',
          left: `${50 + (i-1) * 31}%`,
          transform:`translate(-50%, -50%) translateY(${firmIns[i]}px)`,
        }}>
          <OctagonFrame
            width={200} height={180}
            label={name}
            borderColor={palette.midGrey}
            labelColor={palette.lightGrey}
          >
            <FirmCard name={name}/>
          </OctagonFrame>
        </div>
      ))}

      {/* ruined store — small, dark, bottom */}
      <div style={{
        position:'absolute',
        bottom:'30%', left:'50%',
        transform:'translate(-50%, 0)',
        opacity:0.4,
      }}>
        <EditorialCallout
          text="toys r us"
          size={42}
          align="center"
          color={palette.midGrey}
        />
      </div>

      {/* coins flowing up to firms */}
      <div style={{
        position:'absolute',
        top:'54%', left:'50%',
        transform:'translate(-50%, -50%)',
        opacity: coinsFade,
      }}>
        <CoinStack size={100} big={false} style={{ transform:`translateY(${coinsIn}px)` }}/>
      </div>

      {/* callout: "richer than they started" */}
      <div style={{
        position:'absolute',
        bottom:'22%', left:50, right:50,
        opacity: textFade,
        transform:`translateY(${textIn}px)`,
      }}>
        <EditorialCallout
          text="richer than they started."
          size={58}
          align="center"
          color={palette.lightGrey}
        />
      </div>
    </TexturedBg>
  );
};
