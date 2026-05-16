import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';
import {FloatingToy, DataOrb, MoneyDrain} from '../../components/3d';
import {
  StatHammer,
  MarketShareDonut,
  Timeline,
  LBOStructure,
  AmazonDealDiagram,
  RevenueDebtChart,
} from '../../components/motion-graphics';
import {CaptionEmphasis, LowerThird, SourceTag} from '../../components/captions';
import {BrollPlaceholder, SfxMarker} from '../../components/placeholders';
import {CrossDissolve, WhipPan, BlurFade, MatchCut, GlitchCut, LightLeak, ZoomThrough} from '../../components/transitions';
import {KenBurns, cueStart, cueEnd} from '../../lib/scene-utils';
import {COLORS, TYPE} from '../../lib/design-tokens';
import {sec} from '../../lib/motion-tokens';

const Broll: React.FC<{
  label: string;
  description: string;
  panX?: number;
  panY?: number;
  kind?: 'broll' | 'still';
}> = ({label, description, panX = -30, panY = 0, kind = 'broll'}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const op = interpolate(
    frame,
    [0, 12, durationInFrames - 12, durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  return (
    <AbsoluteFill style={{opacity: op}}>
      <KenBurns scaleFrom={1.0} scaleTo={1.1} panX={panX} panY={panY}>
        <BrollPlaceholder
          description={description}
          assetPath={`public/broll/act1/${label}.${kind === 'still' ? 'jpg' : 'mp4'}`}
          durationSeconds={durationInFrames / 30}
          kind={kind}
        />
      </KenBurns>
    </AbsoluteFill>
  );
};

const TextBeat: React.FC<{
  text: string;
  size?: 'hero' | 'display' | 'title' | 'body';
  color?: string;
  background?: string;
}> = ({text, size = 'display', color = COLORS.text, background = '#050507'}) => {
  const {durationInFrames} = useVideoConfig();
  return (
    <AbsoluteFill style={{background}}>
      <CaptionEmphasis
        text={text}
        entryFrame={6}
        exitFrame={durationInFrames - 8}
        size={size}
        color={color}
      />
    </AbsoluteFill>
  );
};

const AmazonHint: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const op = interpolate(
    frame,
    [0, 16, durationInFrames - 14, durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const flicker = interpolate(
    frame % 20,
    [0, 5, 8, 14, 20],
    [1, 0.85, 1, 0.9, 1],
  );
  return (
    <AbsoluteFill
      style={{
        opacity: op,
        background: '#050507',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <DataOrb />
      <AbsoluteFill style={{pointerEvents: 'none', justifyContent: 'center', alignItems: 'center'}}>
        <div
          style={{
            fontFamily: TYPE.display,
            fontSize: 110,
            fontWeight: 800,
            color: COLORS.text,
            letterSpacing: '-0.02em',
            textShadow: '0 0 60px rgba(220,38,38,0.4)',
            opacity: flicker,
          }}
        >
          Amazon killed Toys R Us.
        </div>
        <div
          style={{
            marginTop: 32,
            fontFamily: TYPE.body,
            fontSize: 26,
            color: COLORS.textDim,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            opacity: interpolate(frame, [40, 60], [0, 0.7], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          The convenient explanation
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const WallStreetReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const op = interpolate(
    frame,
    [0, 16, durationInFrames - 14, durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const strikeT = spring({
    frame: frame - 24,
    fps,
    config: {damping: 200, stiffness: 110, mass: 0.5},
  });
  const strikeWidth = interpolate(strikeT, [0, 1], [0, 100]);

  return (
    <AbsoluteFill style={{opacity: op, background: '#050507'}}>
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '0 100px',
        }}
      >
        <div
          style={{
            fontFamily: TYPE.display,
            fontSize: 76,
            fontWeight: 700,
            color: COLORS.textDim,
            position: 'relative',
            letterSpacing: '-0.01em',
          }}
        >
          Amazon killed Toys R Us
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              width: `${strikeWidth}%`,
              height: 6,
              background: COLORS.accent,
              transform: 'translateY(-50%)',
              boxShadow: `0 0 20px ${COLORS.accent}`,
            }}
          />
        </div>
        <div
          style={{
            marginTop: 60,
            fontFamily: TYPE.display,
            fontSize: 110,
            fontWeight: 800,
            color: COLORS.text,
            textAlign: 'center',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            opacity: interpolate(frame, [38, 60], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          Three Wall Street firms did.
        </div>
        <div
          style={{
            marginTop: 28,
            fontFamily: TYPE.display,
            fontSize: 46,
            color: COLORS.accent,
            fontWeight: 700,
            fontVariantNumeric: 'tabular-nums',
            opacity: interpolate(frame, [60, 84], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          $5,000,000,000 in debt.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const LazarusDeathBeat: React.FC = () => {
  const {durationInFrames} = useVideoConfig();
  const frame = useCurrentFrame();
  const op = interpolate(
    frame,
    [0, 16, durationInFrames - 14, durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  return (
    <AbsoluteFill style={{opacity: op}}>
      <KenBurns scaleFrom={1.0} scaleTo={1.08} panX={-20}>
        <BrollPlaceholder
          description="Black-and-white portrait of Charles Lazarus · Time Magazine archive style"
          assetPath="public/stills/lazarus-portrait.jpg"
          durationSeconds={durationInFrames / 30}
          kind="still"
        />
      </KenBurns>
      <LowerThird
        name="Charles Lazarus"
        role="Founder, 1923 — 2018"
        entryFrame={20}
        exitFrame={durationInFrames - 12}
      />
    </AbsoluteFill>
  );
};

const YearMarker: React.FC<{year: string; subtitle?: string}> = ({year, subtitle}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const t = spring({
    frame,
    fps,
    config: {damping: 200, stiffness: 60, mass: 1.1},
  });
  const scale = interpolate(t, [0, 1], [1.3, 1]);
  const op = interpolate(
    frame,
    [0, 16, durationInFrames - 14, durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  return (
    <AbsoluteFill
      style={{
        background: 'radial-gradient(ellipse at center, #1a1408 0%, #050507 80%)',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: op,
      }}
    >
      <div
        style={{
          fontFamily: TYPE.display,
          fontSize: 320,
          fontWeight: 800,
          color: COLORS.accentGold,
          letterSpacing: '-0.04em',
          transform: `scale(${scale})`,
          fontVariantNumeric: 'tabular-nums',
          textShadow: '0 0 80px rgba(212,175,55,0.25)',
        }}
      >
        {year}
      </div>
      {subtitle && (
        <div
          style={{
            marginTop: 24,
            fontFamily: TYPE.body,
            fontSize: 26,
            color: COLORS.textDim,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            opacity: interpolate(frame, [20, 40], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          {subtitle}
        </div>
      )}
    </AbsoluteFill>
  );
};

const ToySupermarketReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const op = interpolate(
    frame,
    [0, 18, durationInFrames - 14, durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  return (
    <AbsoluteFill style={{opacity: op}}>
      <FloatingToy variant="blocks" />
      <CaptionEmphasis
        text="The toy supermarket."
        entryFrame={20}
        exitFrame={durationInFrames - 12}
        size="display"
        position={{top: 140, left: 100}}
        align="left"
      />
      <CaptionEmphasis
        text="Massive stores. Lower prices. Infinite choice."
        entryFrame={48}
        exitFrame={durationInFrames - 12}
        size="body"
        color={COLORS.textDim}
        position={{bottom: 160, left: 100}}
        align="left"
      />
    </AbsoluteFill>
  );
};

// Act I covers cues 20-225 of part 1 (~0:51-6:22 narration)
export const Act1Empire: React.FC = () => {
  // Section A: The false Amazon explanation (cues 20-25, ~0:51-1:05)
  const amazonHintStart = cueStart(20) - 8;
  const amazonHintEnd = cueEnd(25) + 8;
  const amazonHintDur = amazonHintEnd - amazonHintStart;

  // Section B: "But the real story is darker" (cues 26-29, ~1:05-1:15)
  const realStoryStart = cueStart(26) - 8;
  const realStoryEnd = cueEnd(27) + 6;
  const realStoryDur = realStoryEnd - realStoryStart;

  // Section C: Wall Street reveal (cues 28-29, ~1:13-1:16)
  const wallStreetStart = cueStart(28) - 8;
  const wallStreetEnd = cueEnd(29) + 14;
  const wallStreetDur = wallStreetEnd - wallStreetStart;

  // Section D: Debt slowly drained (cues 30-34, ~1:15-1:30)
  const debtDrainStart = cueStart(30) - 8;
  const debtDrainEnd = cueEnd(34) + 8;
  const debtDrainDur = debtDrainEnd - debtDrainStart;

  // Section E: $400M interest stat (cues 32-34, ~1:21-1:30)
  // Embedded above; transition into the next.

  // Section F: "The company wasn't collapsing because people stopped buying" (cues 35-39, ~1:30-1:40)
  const stillSellingStart = cueStart(35) - 8;
  const stillSellingEnd = cueEnd(39) + 8;
  const stillSellingDur = stillSellingEnd - stillSellingStart;

  // Section G: "But Toys R Us had become something else" (cues 40-42, ~1:40-1:51)
  const becameDebtServiceStart = cueStart(40) - 8;
  const becameDebtServiceEnd = cueEnd(42) + 8;
  const becameDebtServiceDur = becameDebtServiceEnd - becameDebtServiceStart;

  // Section H: Lazarus dies, liquidation week (cues 43-51, ~1:51-2:11)
  const lazarusDeathStart = cueStart(43) - 8;
  const lazarusDeathEnd = cueEnd(51) + 12;
  const lazarusDeathDur = lazarusDeathEnd - lazarusDeathStart;

  // Section I: "This is not just the story of a company that failed" (cues 52-57, ~2:11-2:25)
  const thesisStart = cueStart(52) - 8;
  const thesisEnd = cueEnd(57) + 12;
  const thesisDur = thesisEnd - thesisStart;

  // Section J: "Act 1 the empire" + Lazarus origin (cues 58-62, ~2:24-2:36)
  const empireIntroStart = cueStart(58) - 8;
  const empireIntroEnd = cueEnd(62) + 8;
  const empireIntroDur = empireIntroEnd - empireIntroStart;

  // Section K: 1948, baby furniture store (cues 63-66, ~2:36-2:43)
  const year1948Start = cueStart(63) - 8;
  const year1948End = cueEnd(66) + 8;
  const year1948Dur = year1948End - year1948Start;

  // Section L: Baby boom, suburbs, cribs (cues 67-70, ~2:43-2:54)
  const babyBoomStart = cueStart(67) - 8;
  const babyBoomEnd = cueEnd(70) + 8;
  const babyBoomDur = babyBoomEnd - babyBoomStart;

  // Section M: "Lazarus realized... once children outgrew those products, spending stopped. Toys were different" (cues 71-78)
  const toysDifferentStart = cueStart(71) - 8;
  const toysDifferentEnd = cueEnd(78) + 8;
  const toysDifferentDur = toysDifferentEnd - toysDifferentStart;

  // Section N: "At the time toys were not sold the way we think... seasonal" (cues 79-83)
  const seasonalStart = cueStart(79) - 8;
  const seasonalEnd = cueEnd(83) + 8;
  const seasonalDur = seasonalEnd - seasonalStart;

  // Section O: Toy supermarket pioneered (cues 84-91, ~3:24-3:50)
  const supermarketStart = cueStart(84) - 8;
  const supermarketEnd = cueEnd(91) + 8;
  const supermarketDur = supermarketEnd - supermarketStart;

  // Section P: Walking into Toys R Us in 1970s/80s — fantasy world (cues 92-102)
  const fantasyWorldStart = cueStart(92) - 8;
  const fantasyWorldEnd = cueEnd(102) + 8;
  const fantasyWorldDur = fantasyWorldEnd - fantasyWorldStart;

  // Section Q: Scale advantage, expansion (cues 103-108, ~4:17-4:32)
  const scaleStart = cueStart(103) - 8;
  const scaleEnd = cueEnd(108) + 8;
  const scaleDur = scaleEnd - scaleStart;

  // Section R: Manufacturers depended on Toys R Us (cues 109-118, ~4:32-4:55)
  const manufacturersStart = cueStart(109) - 8;
  const manufacturersEnd = cueEnd(118) + 8;
  const manufacturersDur = manufacturersEnd - manufacturersStart;

  // Section S: 1990s peak (cues 119-126)
  const ninetiesPeakStart = cueStart(119) - 8;
  const ninetiesPeakEnd = cueEnd(126) + 8;
  const ninetiesPeakDur = ninetiesPeakEnd - ninetiesPeakStart;

  // Section T: Times Square flagship (cues 127-132)
  const timesSquareStart = cueStart(127) - 8;
  const timesSquareEnd = cueEnd(132) + 8;
  const timesSquareDur = timesSquareEnd - timesSquareStart;

  // Section U: Peak revenue, dominance (cues 133-139)
  const peakRevenueStart = cueStart(133) - 8;
  const peakRevenueEnd = cueEnd(139) + 8;
  const peakRevenueDur = peakRevenueEnd - peakRevenueStart;

  // Section V: Then Amazon appeared (cues 140-150)
  const amazonAppearedStart = cueStart(140) - 8;
  const amazonAppearedEnd = cueEnd(150) + 8;
  const amazonAppearedDur = amazonAppearedEnd - amazonAppearedStart;

  // Section W: "Act 2 the Amazon deal" intro (cues 151-155, ~6:18-6:30)
  const amazonDealIntroStart = cueStart(151) - 8;
  const amazonDealIntroEnd = cueEnd(155) + 8;
  const amazonDealIntroDur = amazonDealIntroEnd - amazonDealIntroStart;

  // Section X: Internet terrified retailers, Toys R Us had a problem (cues 156-166, ~6:30-6:54)
  const internetProblemStart = cueStart(156) - 8;
  const internetProblemEnd = cueEnd(166) + 8;
  const internetProblemDur = internetProblemEnd - internetProblemStart;

  // Section Y: Amazon expanding aggressively, Bezos (cues 167-171)
  const bezosExpandsStart = cueStart(167) - 8;
  const bezosExpandsEnd = cueEnd(171) + 8;
  const bezosExpandsDur = bezosExpandsEnd - bezosExpandsStart;

  // Section Z: 2000 exclusivity agreement (cues 172-184)
  const deal2000Start = cueStart(172) - 8;
  const deal2000End = cueEnd(184) + 8;
  const deal2000Dur = deal2000End - deal2000Start;

  // Section AA: Partnership assumption (cues 185-197)
  const partnershipStart = cueStart(185) - 8;
  const partnershipEnd = cueEnd(197) + 8;
  const partnershipDur = partnershipEnd - partnershipStart;

  // Section AB: Relationship breaks down, lawsuit (cues 198-208)
  const lawsuitStart = cueStart(198) - 8;
  const lawsuitEnd = cueEnd(208) + 8;
  const lawsuitDur = lawsuitEnd - lawsuitStart;

  // Section AC: Damage done, Amazon evolved (cues 209-216)
  const evolvedStart = cueStart(209) - 8;
  const evolvedEnd = cueEnd(216) + 8;
  const evolvedDur = evolvedEnd - evolvedStart;

  // Section AD: Still alive but problems (cues 217-224)
  const stillAliveStart = cueStart(217) - 8;
  const stillAliveEnd = cueEnd(224) + 8;
  const stillAliveDur = stillAliveEnd - stillAliveStart;

  // Section AE: "Then Wall Street arrived and everything changed" (cue 225)
  const wallStreetArrivedStart = cueStart(225) - 8;
  const wallStreetArrivedEnd = cueEnd(225) + 24;
  const wallStreetArrivedDur = wallStreetArrivedEnd - wallStreetArrivedStart;

  return (
    <AbsoluteFill>
      <Sequence from={amazonHintStart} durationInFrames={amazonHintDur}>
        <CrossDissolve durationInFrames={18}>
          <AmazonHint />
        </CrossDissolve>
        <SfxMarker filename="low-rumble-loop.wav" triggerFrame={0} />
      </Sequence>

      <Sequence from={realStoryStart} durationInFrames={realStoryDur}>
        <CrossDissolve durationInFrames={14}>
          <Broll
            label="dark-boardroom"
            description="Empty boardroom · long table · single overhead light · noir grade"
            panX={20}
          />
        </CrossDissolve>
        <CaptionEmphasis
          text="The real story is darker."
          entryFrame={20}
          exitFrame={realStoryDur - 14}
          size="title"
          position={{top: 140, left: 100}}
          align="left"
        />
      </Sequence>

      <Sequence from={wallStreetStart} durationInFrames={wallStreetDur}>
        <ZoomThrough durationInFrames={18}>
          <WallStreetReveal />
        </ZoomThrough>
        <SfxMarker filename="whoosh-impact.wav" triggerFrame={0} />
        <SfxMarker filename="deep-impact.wav" triggerFrame={36} />
      </Sequence>

      <Sequence from={debtDrainStart} durationInFrames={debtDrainDur}>
        <CrossDissolve durationInFrames={16}>
          <MoneyDrain coinCount={50} />
        </CrossDissolve>
        <CaptionEmphasis
          text="The debt drained the company."
          entryFrame={20}
          exitFrame={debtDrainDur - 14}
          size="title"
          position={{top: 140, left: 100}}
          align="left"
          color={COLORS.text}
        />
        <SfxMarker filename="coin-drop.wav" triggerFrame={40} />
        <SfxMarker filename="coin-drop.wav" triggerFrame={120} />
      </Sequence>

      <Sequence from={stillSellingStart} durationInFrames={stillSellingDur}>
        <CrossDissolve durationInFrames={14}>
          <Broll
            label="kids-playing"
            description="Children playing with toys · home interior · warm tone"
          />
        </CrossDissolve>
        <CaptionEmphasis
          text="Toys were still selling."
          entryFrame={36}
          exitFrame={stillSellingDur - 14}
          size="title"
          position={{bottom: 160, left: 100}}
          align="left"
        />
      </Sequence>

      <Sequence from={becameDebtServiceStart} durationInFrames={becameDebtServiceDur}>
        <CrossDissolve durationInFrames={16}>
          <AbsoluteFill style={{background: '#050507'}}>
            <CaptionEmphasis
              text="A company that existed to service debt."
              entryFrame={20}
              exitFrame={becameDebtServiceDur - 14}
              size="display"
              color={COLORS.accent}
            />
          </AbsoluteFill>
        </CrossDissolve>
        <SfxMarker filename="deep-impact.wav" triggerFrame={4} />
      </Sequence>

      <Sequence from={lazarusDeathStart} durationInFrames={lazarusDeathDur}>
        <BlurFade durationInFrames={20}>
          <LazarusDeathBeat />
        </BlurFade>
        <SourceTag source="ARCHIVE · 2018" entryFrame={28} />
      </Sequence>

      <Sequence from={thesisStart} durationInFrames={thesisDur}>
        <CrossDissolve durationInFrames={16}>
          <Broll
            label="wall-street-night"
            description="Wall Street skyline · night · slow drift · cinematic"
            panX={-40}
          />
        </CrossDissolve>
        <CaptionEmphasis
          text="A retailer became a financial instrument."
          entryFrame={32}
          exitFrame={thesisDur - 16}
          size="title"
          position={{bottom: 160, left: 100}}
          align="left"
          color={COLORS.text}
        />
      </Sequence>

      <Sequence from={empireIntroStart} durationInFrames={empireIntroDur}>
        <WhipPan durationInFrames={10}>
          <Broll
            label="lazarus-young"
            description="Black-and-white Lazarus standing in early store · 1950s · Life magazine style"
            kind="still"
          />
        </WhipPan>
        <CaptionEmphasis
          text="He never set out to build a toy empire."
          entryFrame={24}
          exitFrame={empireIntroDur - 14}
          size="title"
          position={{bottom: 160, left: 100}}
          align="left"
        />
      </Sequence>

      <Sequence from={year1948Start} durationInFrames={year1948Dur}>
        <MatchCut durationInFrames={14}>
          <YearMarker year="1948" subtitle="Washington, D.C." />
        </MatchCut>
        <SfxMarker filename="paper-rustle.wav" triggerFrame={4} />
      </Sequence>

      <Sequence from={babyBoomStart} durationInFrames={babyBoomDur}>
        <CrossDissolve durationInFrames={16}>
          <Broll
            label="post-war-america"
            description="Post-WW2 suburbia · returning soldiers · baby boom newsreels"
            kind="still"
          />
        </CrossDissolve>
        <LowerThird
          name="The Baby Boom"
          role="76 million children born 1946 — 1964"
          entryFrame={36}
          exitFrame={babyBoomDur - 14}
        />
      </Sequence>

      <Sequence from={toysDifferentStart} durationInFrames={toysDifferentDur}>
        <CrossDissolve durationInFrames={16}>
          <AbsoluteFill style={{background: '#050507'}}>
            <CaptionEmphasis
              text="Toys were different."
              entryFrame={20}
              exitFrame={50}
              size="hero"
              color={COLORS.accentGold}
            />
            <CaptionEmphasis
              text="Children always wanted more."
              entryFrame={60}
              exitFrame={toysDifferentDur - 14}
              size="title"
              color={COLORS.text}
            />
          </AbsoluteFill>
        </CrossDissolve>
      </Sequence>

      <Sequence from={seasonalStart} durationInFrames={seasonalDur}>
        <CrossDissolve durationInFrames={14}>
          <Broll
            label="department-store-1950s"
            description="1950s department store toy aisle · seasonal Christmas display"
            kind="still"
          />
        </CrossDissolve>
        <CaptionEmphasis
          text="Toys were seasonal. Until they weren't."
          entryFrame={28}
          exitFrame={seasonalDur - 14}
          size="body"
          position={{bottom: 160, left: 100}}
          align="left"
          color={COLORS.textDim}
        />
      </Sequence>

      <Sequence from={supermarketStart} durationInFrames={supermarketDur}>
        <BlurFade durationInFrames={18}>
          <ToySupermarketReveal />
        </BlurFade>
      </Sequence>

      <Sequence from={fantasyWorldStart} durationInFrames={fantasyWorldDur}>
        <CrossDissolve durationInFrames={16}>
          <Broll
            label="seventies-store-interior"
            description="1970s toy store interior · wide aisles · bright packaging · 16mm"
          />
        </CrossDissolve>
        <CaptionEmphasis
          text="A fantasy world."
          entryFrame={50}
          exitFrame={fantasyWorldDur - 14}
          size="display"
          position={{top: 140, left: 100}}
          align="left"
          color={COLORS.text}
        />
      </Sequence>

      <Sequence from={scaleStart} durationInFrames={scaleDur}>
        <CrossDissolve durationInFrames={14}>
          <Broll
            label="store-exterior-1980s"
            description="Toy store exterior · suburban strip mall · sodium parking lot glow"
          />
        </CrossDissolve>
      </Sequence>

      <Sequence from={manufacturersStart} durationInFrames={manufacturersDur}>
        <CrossDissolve durationInFrames={14}>
          <Broll
            label="factory-conveyor"
            description="Toy factory conveyor · generic boxes · industrial · 1980s archive"
          />
        </CrossDissolve>
        <CaptionEmphasis
          text="Manufacturers needed them to survive."
          entryFrame={36}
          exitFrame={manufacturersDur - 14}
          size="title"
          position={{bottom: 160, left: 100}}
          align="left"
          color={COLORS.text}
        />
      </Sequence>

      <Sequence from={ninetiesPeakStart} durationInFrames={ninetiesPeakDur}>
        <ZoomThrough durationInFrames={20}>
          <YearMarker year="1990s" subtitle="The absolute peak" />
        </ZoomThrough>
        <SfxMarker filename="whoosh-impact.wav" triggerFrame={0} />
      </Sequence>

      <Sequence from={timesSquareStart} durationInFrames={timesSquareDur}>
        <CrossDissolve durationInFrames={16}>
          <Broll
            label="times-square-flagship"
            description="Massive flagship store · Times Square · Ferris wheel · 2001-era archive"
            panY={-20}
          />
        </CrossDissolve>
        <LowerThird
          name="Times Square Flagship"
          role="New York City · Opened 2001"
          entryFrame={32}
          exitFrame={timesSquareDur - 14}
        />
      </Sequence>

      <Sequence from={peakRevenueStart} durationInFrames={peakRevenueDur}>
        <CrossDissolve durationInFrames={16}>
          <MarketShareDonut percent={35} label="Market share · 1990s" caption="One company. One brand. The whole American toy market." />
        </CrossDissolve>
        <SfxMarker filename="deep-impact.wav" triggerFrame={20} />
      </Sequence>

      <Sequence from={amazonAppearedStart} durationInFrames={amazonAppearedDur}>
        <BlurFade durationInFrames={20}>
          <Broll
            label="early-internet"
            description="CRT monitor · 1995 dial-up modem · green-on-black terminal · CRT scanlines"
            kind="still"
          />
        </BlurFade>
        <CaptionEmphasis
          text="Then something else began growing quietly."
          entryFrame={32}
          exitFrame={amazonAppearedDur - 14}
          size="title"
          position={{bottom: 160, left: 100}}
          align="left"
          color={COLORS.textDim}
        />
      </Sequence>

      <Sequence from={amazonDealIntroStart} durationInFrames={amazonDealIntroDur}>
        <GlitchCut durationInFrames={8}>
          <Broll
            label="bezos-1999"
            description="Jeff Bezos in early Amazon warehouse · 1999 · brand-neutral archive"
            kind="still"
          />
        </GlitchCut>
        <SfxMarker filename="glass-shatter.wav" triggerFrame={0} />
        <LowerThird
          name="Jeff Bezos"
          role="Amazon · Former hedge fund executive"
          entryFrame={24}
          exitFrame={amazonDealIntroDur - 14}
        />
      </Sequence>

      <Sequence from={internetProblemStart} durationInFrames={internetProblemDur}>
        <CrossDissolve durationInFrames={16}>
          <DataOrb />
        </CrossDissolve>
        <CaptionEmphasis
          text="Toys R Us dominated stores."
          entryFrame={20}
          exitFrame={120}
          size="title"
          position={{top: 140, left: 100}}
          align="left"
        />
        <CaptionEmphasis
          text="Online, it was struggling."
          entryFrame={140}
          exitFrame={internetProblemDur - 14}
          size="title"
          position={{bottom: 160, left: 100}}
          align="left"
          color={COLORS.accent}
        />
      </Sequence>

      <Sequence from={bezosExpandsStart} durationInFrames={bezosExpandsDur}>
        <CrossDissolve durationInFrames={14}>
          <AbsoluteFill style={{background: '#050507'}}>
            <CaptionEmphasis
              text="Bezos didn't want a bookstore."
              entryFrame={20}
              exitFrame={90}
              size="title"
            />
            <CaptionEmphasis
              text="He wanted the everything store."
              entryFrame={100}
              exitFrame={bezosExpandsDur - 14}
              size="display"
              color={COLORS.accentGold}
            />
          </AbsoluteFill>
        </CrossDissolve>
      </Sequence>

      <Sequence from={deal2000Start} durationInFrames={deal2000Dur}>
        <ZoomThrough durationInFrames={20}>
          <YearMarker year="2000" subtitle="The exclusivity deal" />
        </ZoomThrough>
        <SfxMarker filename="whoosh-impact.wav" triggerFrame={0} />
      </Sequence>

      <Sequence from={partnershipStart} durationInFrames={partnershipDur}>
        <CrossDissolve durationInFrames={16}>
          <AmazonDealDiagram shatterAtFrame={partnershipDur - 60} />
        </CrossDissolve>
      </Sequence>

      <Sequence from={lawsuitStart} durationInFrames={lawsuitDur}>
        <CrossDissolve durationInFrames={14}>
          <Broll
            label="courtroom"
            description="Courtroom · documents stack · gavel · neutral · cinematic"
            kind="still"
          />
        </CrossDissolve>
        <CaptionEmphasis
          text="Toys R Us sued. And won."
          entryFrame={36}
          exitFrame={lawsuitDur - 14}
          size="title"
          position={{bottom: 160, left: 100}}
          align="left"
        />
      </Sequence>

      <Sequence from={evolvedStart} durationInFrames={evolvedDur}>
        <CrossDissolve durationInFrames={14}>
          <Broll
            label="amazon-warehouse-modern"
            description="Modern Amazon warehouse · conveyor · robots · neutral"
            panX={40}
          />
        </CrossDissolve>
        <CaptionEmphasis
          text="By then, the damage was done."
          entryFrame={32}
          exitFrame={evolvedDur - 14}
          size="title"
          position={{top: 140, left: 100}}
          align="left"
          color={COLORS.accent}
        />
      </Sequence>

      <Sequence from={stillAliveStart} durationInFrames={stillAliveDur}>
        <CrossDissolve durationInFrames={16}>
          <Broll
            label="toys-r-us-2004-store"
            description="Toys R Us store interior · 2004 · still busy · daylight"
          />
        </CrossDissolve>
        <CaptionEmphasis
          text="Still huge. Still profitable. Still alive."
          entryFrame={36}
          exitFrame={stillAliveDur - 14}
          size="body"
          position={{bottom: 160, left: 100}}
          align="left"
          color={COLORS.textDim}
        />
      </Sequence>

      <Sequence from={wallStreetArrivedStart} durationInFrames={wallStreetArrivedDur}>
        <ZoomThrough durationInFrames={24}>
          <AbsoluteFill
            style={{
              background: 'radial-gradient(ellipse at center, #1a0a14 0%, #000 80%)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CaptionEmphasis
              text="Then Wall Street arrived."
              entryFrame={10}
              exitFrame={wallStreetArrivedDur - 12}
              size="hero"
              color={COLORS.text}
            />
          </AbsoluteFill>
        </ZoomThrough>
        <SfxMarker filename="cinematic-riser-long.wav" triggerFrame={0} />
        <SfxMarker filename="boom-final.wav" triggerFrame={32} />
      </Sequence>
    </AbsoluteFill>
  );
};
