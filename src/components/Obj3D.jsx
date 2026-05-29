import React from 'react';
import { palette } from '../theme.js';

// CSS-only 3D-style objects mimicking the rendered brain/eye from reference.
// Each is a grey sculptural object with dramatic shadow, sitting on the textured bg.

const shadowBase = '0 28px 60px rgba(0,0,0,0.38), 0 8px 20px rgba(0,0,0,0.22)';

export const Brain = ({ size = 240, cracked = false, style = {} }) => (
  <div style={{
    width: size,
    height: size * 0.78,
    position: 'relative',
    ...style,
  }}>
    {/* main brain mass */}
    <div style={{
      position: 'absolute',
      inset: 0,
      borderRadius: '50% 50% 44% 44% / 55% 55% 45% 45%',
      background: `radial-gradient(ellipse at 35% 35%,
        ${palette.lightGrey} 0%,
        ${palette.paperDark} 40%,
        ${palette.midGrey} 70%,
        #4a4845 100%)`,
      boxShadow: shadowBase,
    }}/>
    {/* sulci (folds) */}
    {[...Array(6)].map((_, i) => (
      <div key={i} style={{
        position: 'absolute',
        left: `${18 + i * 12}%`,
        top: `${20 + (i % 3) * 18}%`,
        width: `${14 + (i%2)*8}%`,
        height: '4%',
        borderRadius: 99,
        background: 'rgba(30,28,25,0.28)',
        transform: `rotate(${-15 + i * 12}deg)`,
      }}/>
    ))}
    {/* stem */}
    <div style={{
      position: 'absolute',
      bottom: '-12%', left: '42%',
      width: '16%', height: '20%',
      borderRadius: '0 0 40% 40%',
      background: palette.midGrey,
    }}/>
    {/* crack overlay if needed */}
    {cracked && (
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}>
        <line x1="20%" y1="10%" x2="80%" y2="90%" stroke="#111" strokeWidth="2.5" strokeOpacity="0.7"/>
        <line x1="55%" y1="5%" x2="35%" y2="70%" stroke="#111" strokeWidth="1.5" strokeOpacity="0.5"/>
      </svg>
    )}
  </div>
);

export const Eyeball = ({ size = 200, style = {} }) => (
  <div style={{
    width: size,
    height: size,
    borderRadius: '50%',
    background: `radial-gradient(circle at 38% 35%,
      ${palette.white} 0%,
      ${palette.lightGrey} 35%,
      ${palette.paperDark} 60%,
      #888 80%,
      #4a4845 100%)`,
    boxShadow: `${shadowBase}, inset 0 -8px 20px rgba(0,0,0,0.18)`,
    position: 'relative',
    overflow: 'hidden',
    ...style,
  }}>
    {/* iris ring */}
    <div style={{
      position:'absolute',
      top: '28%', left: '28%',
      width: '44%', height: '44%',
      borderRadius: '50%',
      border: `${size*0.025}px solid rgba(80,78,72,0.6)`,
      background: `radial-gradient(circle at 40% 40%,
        rgba(140,138,132,0.8) 0%,
        rgba(80,78,72,0.9) 50%,
        rgba(20,18,16,1) 100%)`,
    }}/>
    {/* pupil */}
    <div style={{
      position:'absolute',
      top:'38%', left:'38%',
      width:'24%', height:'24%',
      borderRadius:'50%',
      background:'#0a0a0a',
    }}/>
    {/* highlight */}
    <div style={{
      position:'absolute',
      top:'30%', left:'54%',
      width:'8%', height:'8%',
      borderRadius:'50%',
      background:'rgba(255,255,255,0.75)',
    }}/>
    {/* veins */}
    <svg style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
      <line x1="50%" y1="50%" x2="85%" y2="25%" stroke="rgba(120,80,80,0.35)" strokeWidth="1.2"/>
      <line x1="50%" y1="50%" x2="15%" y2="30%" stroke="rgba(120,80,80,0.28)" strokeWidth="1.0"/>
      <line x1="50%" y1="50%" x2="70%" y2="80%" stroke="rgba(120,80,80,0.22)" strokeWidth="0.9"/>
    </svg>
  </div>
);

export const ToyBlock = ({ size = 180, cracked = false, style = {} }) => (
  <div style={{ position:'relative', width: size * 1.2, height: size * 1.1, ...style }}>
    {/* front face */}
    <div style={{
      position:'absolute',
      left: '8%', top: '18%',
      width: '68%', height: '68%',
      background: `linear-gradient(145deg, ${palette.lightGrey} 0%, ${palette.midGrey} 100%)`,
      boxShadow: shadowBase,
    }}/>
    {/* top face */}
    <div style={{
      position:'absolute',
      left: '8%', top: 0,
      width: '68%', height: '20%',
      background: `linear-gradient(to right, ${palette.paperDark} 0%, ${palette.lightGrey} 100%)`,
      transform: 'skewX(-40deg)',
      transformOrigin: 'bottom left',
    }}/>
    {/* right face */}
    <div style={{
      position:'absolute',
      right: 0, top: '6%',
      width: '26%', height: '72%',
      background: `linear-gradient(to bottom, #888 0%, #555 100%)`,
      transform: 'skewY(20deg)',
    }}/>
    {/* letter on front */}
    <div style={{
      position:'absolute',
      left:'8%', top:'18%',
      width:'68%', height:'68%',
      display:'flex', alignItems:'center', justifyContent:'center',
      fontFamily:"'Helvetica Neue',Helvetica,Arial,sans-serif",
      fontSize: size * 0.42,
      fontWeight: 900,
      color: 'rgba(30,28,25,0.55)',
      letterSpacing:'-0.02em',
    }}>R</div>
    {cracked && (
      <svg style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
        <line x1="20%" y1="25%" x2="75%" y2="82%" stroke="#111" strokeWidth="3" strokeOpacity="0.65"/>
      </svg>
    )}
  </div>
);

export const WeightChain = ({ size = 160, style = {} }) => (
  <div style={{ position:'relative', width: size, height: size * 1.3, ...style }}>
    {/* chain */}
    <div style={{
      position:'absolute', top:0, left:'44%', width:'12%', height:'35%',
      background:`repeating-linear-gradient(to bottom,
        ${palette.midGrey} 0px, ${palette.midGrey} 8px,
        transparent 8px, transparent 14px)`,
    }}/>
    {/* weight sphere */}
    <div style={{
      position:'absolute', bottom:0, left:'15%',
      width:'70%', height:'65%',
      borderRadius:'50%',
      background:`radial-gradient(circle at 35% 30%,
        ${palette.lightGrey} 0%, ${palette.midGrey} 50%, #333 100%)`,
      boxShadow: shadowBase,
    }}>
      {/* "DEBT" label */}
      <div style={{
        position:'absolute', inset:0,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontFamily:"'Helvetica Neue',Helvetica,Arial,sans-serif",
        fontWeight:900, fontSize: size*0.19,
        color:'rgba(10,8,5,0.55)', letterSpacing:'0.05em',
        textTransform:'uppercase',
      }}>debt</div>
    </div>
  </div>
);

export const House = ({ size = 200, crushed = false, style = {} }) => (
  <div style={{ position:'relative', width: size, height: size * 0.9, ...style }}>
    {/* walls */}
    <div style={{
      position:'absolute',
      bottom:0, left:'10%', width:'80%', height:'55%',
      background:`linear-gradient(145deg, ${palette.lightGrey} 0%, ${palette.paperDark} 100%)`,
      boxShadow: shadowBase,
      ...(crushed ? { transform:'scaleY(0.7)', transformOrigin:'bottom' } : {}),
    }}>
      {/* door */}
      <div style={{
        position:'absolute', bottom:0, left:'35%',
        width:'30%', height:'55%',
        background:'rgba(30,28,25,0.3)',
        borderRadius:'4px 4px 0 0',
      }}/>
    </div>
    {/* roof */}
    <div style={{
      position:'absolute',
      bottom: crushed ? '35%' : '50%',
      left:0, right:0,
      height:0, width:0,
      borderLeft: `${size*0.5}px solid transparent`,
      borderRight: `${size*0.5}px solid transparent`,
      borderBottom: `${size*0.38}px solid ${palette.midGrey}`,
      filter:`drop-shadow(0 -4px 12px rgba(0,0,0,0.25))`,
      transition:'bottom 0.3s',
    }}/>
    {crushed && (
      <svg style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
        <line x1="15%" y1="40%" x2="85%" y2="75%" stroke="#111" strokeWidth="2" strokeOpacity="0.55"/>
        <line x1="50%" y1="35%" x2="25%" y2="80%" stroke="#111" strokeWidth="1.5" strokeOpacity="0.4"/>
      </svg>
    )}
  </div>
);

export const CoinStack = ({ size = 160, big = false, style = {} }) => {
  const h = big ? size * 2.2 : size * 0.7;
  const count = big ? 10 : 3;
  return (
    <div style={{ position:'relative', width: size, height: h, ...style }}>
      {[...Array(count)].map((_, i) => (
        <div key={i} style={{
          position:'absolute',
          bottom: i * (h / count * 0.8),
          left: '5%', right: '5%',
          height: h / count * 0.85,
          borderRadius: '50%',
          background: `radial-gradient(ellipse at 30% 30%,
            ${palette.lightGrey} 0%, ${palette.midGrey} 50%, #555 100%)`,
          boxShadow: `0 ${4+i}px ${8+i*3}px rgba(0,0,0,0.25)`,
          border: `1.5px solid rgba(100,98,92,0.5)`,
        }}/>
      ))}
    </div>
  );
};
