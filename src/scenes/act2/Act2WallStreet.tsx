import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';
import {DebtCrushBoxes, MoneyDrain, DataOrb} from '../../components/3d';
import {
  StatHammer,
  ChapterCard,
  LBOStructure,
  RevenueDebtChart,
} from '../../components/motion-graphics';
import {CaptionEmphasis, LowerThird} from '../../components/captions';
import {BrollPlaceholder, SfxMarker} from '../../components/placeholders';
import {CrossDissolve, WhipPan, BlurFade, ZoomThrough, LightLeak} from '../../components/transitions';
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
          assetPath={`public/broll/act2/${label}.${kind === 'still' ? 'jpg' : 'mp4'}`}
          durationSeconds={durationInFrames / 30}
          kind={kind}
        />
      </KenBurns>
    </AbsoluteFill>
  );
};

const YearMarker: React.FC<{year: string; subtitle?: string; color?: string}> = ({
  year,
  subtitle,
  color = COLORS.accent,
}) => {
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
        background: 'radial-gradient(ellipse at center, #1a0a14 0%, #050507 80%)',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: op,
      }}
    >
      <div
        style={{
          fontFamily: TYPE.display,
          fontSize: 340,
          fontWeight: 800,
          color,
          letterSpacing: '-0.04em',
          transform: `scale(${scale})`,
          fontVariantNumeric: 'tabular-nums',
          textShadow: `0 0 80px ${color}55`,
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
            opacity: interpolate(frame, [22, 42], [0, 1], {
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

const HouseOnCreditCardMetaphor: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const op = interpolate(
    frame,
    [0, 16, durationInFrames - 14, durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  return (
    <AbsoluteFill style={{opacity: op, background: '#050507'}}>
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: '0 100px'}}>
        <div
          style={{
            fontFamily: TYPE.display,
            fontSize: 68,
            fontWeight: 700,
            color: COLORS.textDim,
            textAlign: 'center',
            maxWidth: 1400,
            lineHeight: 1.2,
            opacity: interpolate(frame, [10, 30], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          Imagine buying a house
        </div>
        <div
          style={{
            marginTop: 24,
            fontFamily: TYPE.display,
            fontSize: 80,
            fontWeight: 800,
            color: COLORS.text,
            textAlign: 'center',
            maxWidth: 1400,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            opacity: interpolate(frame, [40, 60], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          on someone else's credit card.
        </div>
        <div
          style={{
            marginTop: 60,
            fontFamily: TYPE.display,
            fontSize: 56,
            fontWeight: 700,
            color: COLORS.accent,
            textAlign: 'center',
            opacity: interpolate(frame, [70, 100], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            textShadow: `0 0 30px ${COLORS.accent}55`,
          }}
        >
          Then force the house to pay the bill.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const TrappedBeat: React.FC = () => {
  const {durationInFrames} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <CaptionEmphasis
        text="Trapped."
        entryFrame={6}
        exitFrame={durationInFrames - 6}
        size="hero"
        color={COLORS.accent}
      />
    </AbsoluteFill>
  );
};

// Act II covers part 2 cues 1-94 (ALL_CUES 226-319)
// All cue references below use ALL_CUES indices.
export const Act2WallStreet: React.FC = () => {
  const P2 = 225; // offset: part 2 cue 1 = ALL_CUES[225] = index 226

  // Chapter card
  const chapterStart = cueStart(P2 + 1) - sec(2);
  const chapterDur = sec(3.5);

  // Section A: "Act 2 the Buyout" + 2005 year (cues 1-3, ALL 226-228)
  const yearStart = chapterStart + chapterDur - 8;
  const yearDur = sec(4);

  // Section B: Three firms made an offer (cues 4-8, ALL 229-233)
  const offerStart = yearStart + yearDur - 8;
  const offerEnd = cueEnd(P2 + 8) + 8;
  const offerDur = offerEnd - offerStart;

  // Section C: Underneath the headlines... (cues 10-13, ALL 235-238)
  const beneathStart = cueStart(P2 + 10) - 8;
  const beneathEnd = cueEnd(P2 + 13) + 8;
  const beneathDur = beneathEnd - beneathStart;

  // Section D: The leveraged buyout strategy (cues 14-17, ALL 239-242)
  const lboStratStart = cueStart(P2 + 14) - 8;
  const lboStratEnd = cueEnd(P2 + 17) + 8;
  const lboStratDur = lboStratEnd - lboStratStart;

  // Section E: House-on-credit-card metaphor (cues 18-20, ALL 243-245)
  const metaphorStart = cueStart(P2 + 18) - 8;
  const metaphorEnd = cueEnd(P2 + 20) + 12;
  const metaphorDur = metaphorEnd - metaphorStart;

  // Section F: LBO Structure hero graphic (cues 21-23, ALL 246-248)
  const lboHeroStart = cueStart(P2 + 21) - 8;
  const lboHeroEnd = cueEnd(P2 + 23) + 16;
  const lboHeroDur = lboHeroEnd - lboHeroStart;

  // Section G: Debt boxes 3D (cues 24-27, ALL 249-252)
  const debtCrushStart = cueStart(P2 + 24) - 8;
  const debtCrushEnd = cueEnd(P2 + 27) + 8;
  const debtCrushDur = debtCrushEnd - debtCrushStart;

  // Section H: $400M interest stat hammer (cues 28-31, ALL 253-256)
  const interest400MStart = cueStart(P2 + 28) - 8;
  const interest400MEnd = cueEnd(P2 + 31) + 8;
  const interest400MDur = interest400MEnd - interest400MStart;

  // Section I: Money drain — what that $400M could have done (cues 32-36, ALL 257-261)
  const drainStart = cueStart(P2 + 32) - 8;
  const drainEnd = cueEnd(P2 + 36) + 8;
  const drainDur = drainEnd - drainStart;

  // Section J: But the company DID make revenue (cues 37-44, ALL 262-269)
  const revenueStillStart = cueStart(P2 + 37) - 8;
  const revenueStillEnd = cueEnd(P2 + 44) + 8;
  const revenueStillDur = revenueStillEnd - revenueStillStart;

  // Section K: Modernize while dragging debt (cues 45-47, ALL 270-272)
  const modernizeStart = cueStart(P2 + 45) - 8;
  const modernizeEnd = cueEnd(P2 + 47) + 8;
  const modernizeDur = modernizeEnd - modernizeStart;

  // Section L: Walmart, Target, Amazon competitors (cues 48-52, ALL 273-277)
  const competitorsStart = cueStart(P2 + 48) - 8;
  const competitorsEnd = cueEnd(P2 + 52) + 8;
  const competitorsDur = competitorsEnd - competitorsStart;

  // Section M: Stores frozen in time, aging (cues 53-58, ALL 278-283)
  const agingStart = cueStart(P2 + 53) - 8;
  const agingEnd = cueEnd(P2 + 58) + 8;
  const agingDur = agingEnd - agingStart;

  // Section N: Adaptation cost money (cues 59-62, ALL 284-287)
  const adaptCostStart = cueStart(P2 + 59) - 8;
  const adaptCostEnd = cueEnd(P2 + 62) + 8;
  const adaptCostDur = adaptCostEnd - adaptCostStart;

  // Section O: Trapped (cues 63-67, ALL 288-292)
  const trappedStart = cueStart(P2 + 63) - 8;
  const trappedEnd = cueEnd(P2 + 67) + 8;
  const trappedDur = trappedEnd - trappedStart;

  // Section P: Decline visible (cues 68-73, ALL 293-298)
  const declineStart = cueStart(P2 + 68) - 8;
  const declineEnd = cueEnd(P2 + 73) + 8;
  const declineDur = declineEnd - declineStart;

  // Section Q: Revenue/debt chart hero (cues 74-78, ALL 299-303)
  const chartStart = cueStart(P2 + 74) - 8;
  const chartEnd = cueEnd(P2 + 78) + 8;
  const chartDur = chartEnd - chartStart;

  // Section R: Slow financial suffocation (cues 79-83, ALL 304-308)
  const suffocationStart = cueStart(P2 + 79) - 8;
  const suffocationEnd = cueEnd(P2 + 83) + 8;
  const suffocationDur = suffocationEnd - suffocationStart;

  // Section S: By mid-2010s, retail brutally competitive (cues 84-89, ALL 309-314)
  const mid2010sStart = cueStart(P2 + 84) - 8;
  const mid2010sEnd = cueEnd(P2 + 89) + 8;
  const mid2010sDur = mid2010sEnd - mid2010sStart;

  // Section T: Toys R Us trying to compete (cues 90-94, ALL 315-319)
  const tryingToCompeteStart = cueStart(P2 + 90) - 8;
  const tryingToCompeteEnd = cueEnd(P2 + 94) + 8;
  const tryingToCompeteDur = tryingToCompeteEnd - tryingToCompeteStart;

  return (
    <AbsoluteFill>
      <Sequence from={chapterStart} durationInFrames={chapterDur}>
        <WhipPan durationInFrames={10}>
          <ChapterCard roman="II" title="Wall Street" subtitle="2005 — 2016" />
        </WhipPan>
        <SfxMarker filename="whoosh-impact.wav" triggerFrame={0} />
        <SfxMarker filename="paper-rustle.wav" triggerFrame={14} />
      </Sequence>

      <Sequence from={yearStart} durationInFrames={yearDur}>
        <ZoomThrough durationInFrames={20}>
          <YearMarker year="2005" subtitle="The leveraged buyout" />
        </ZoomThrough>
        <SfxMarker filename="deep-impact.wav" triggerFrame={4} />
      </Sequence>

      <Sequence from={offerStart} durationInFrames={offerDur}>
        <CrossDissolve durationInFrames={16}>
          <Broll
            label="wall-street-boardroom"
            description="Wall Street boardroom · papers spread · 2005 archive · neutral"
          />
        </CrossDissolve>
        <CaptionEmphasis
          text="Three firms. One offer."
          entryFrame={32}
          exitFrame={offerDur - 14}
          size="title"
          position={{bottom: 160, left: 100}}
          align="left"
        />
      </Sequence>

      <Sequence from={beneathStart} durationInFrames={beneathDur}>
        <CrossDissolve durationInFrames={14}>
          <AbsoluteFill style={{background: '#050507'}}>
            <CaptionEmphasis
              text="Something else was happening beneath the headlines."
              entryFrame={20}
              exitFrame={beneathDur - 14}
              size="title"
              color={COLORS.textDim}
            />
          </AbsoluteFill>
        </CrossDissolve>
      </Sequence>

      <Sequence from={lboStratStart} durationInFrames={lboStratDur}>
        <CrossDissolve durationInFrames={14}>
          <AbsoluteFill style={{background: '#050507'}}>
            <CaptionEmphasis
              text="Leveraged buyout."
              entryFrame={14}
              exitFrame={lboStratDur - 14}
              size="display"
              color={COLORS.accentGold}
            />
            <CaptionEmphasis
              text="A financial strategy."
              entryFrame={60}
              exitFrame={lboStratDur - 14}
              size="body"
              position={{bottom: 220, left: 0, right: 0}}
              align="center"
              color={COLORS.textDim}
            />
          </AbsoluteFill>
        </CrossDissolve>
      </Sequence>

      <Sequence from={metaphorStart} durationInFrames={metaphorDur}>
        <BlurFade durationInFrames={18}>
          <HouseOnCreditCardMetaphor />
        </BlurFade>
        <SfxMarker filename="deep-impact.wav" triggerFrame={70} />
      </Sequence>

      <Sequence from={lboHeroStart} durationInFrames={lboHeroDur}>
        <CrossDissolve durationInFrames={20}>
          <LBOStructure />
        </CrossDissolve>
        <SfxMarker filename="deep-impact.wav" triggerFrame={110} />
        <SfxMarker filename="deep-impact.wav" triggerFrame={140} />
      </Sequence>

      <Sequence from={debtCrushStart} durationInFrames={debtCrushDur}>
        <CrossDissolve durationInFrames={18}>
          <DebtCrushBoxes />
        </CrossDissolve>
        <CaptionEmphasis
          text="$5 billion in debt."
          entryFrame={90}
          exitFrame={debtCrushDur - 14}
          size="title"
          position={{bottom: 90, left: 100}}
          align="left"
          color={COLORS.accent}
        />
        <SfxMarker filename="low-rumble-loop.wav" triggerFrame={0} />
        <SfxMarker filename="deep-impact.wav" triggerFrame={80} />
      </Sequence>

      <Sequence from={interest400MStart} durationInFrames={interest400MDur}>
        <CrossDissolve durationInFrames={14}>
          <StatHammer
            value={400}
            prefix="$"
            unit="M / year"
            label="In interest payments alone"
            highlight="red"
            durationInFrames={interest400MDur}
          />
        </CrossDissolve>
        <SfxMarker filename="deep-impact.wav" triggerFrame={4} />
      </Sequence>

      <Sequence from={drainStart} durationInFrames={drainDur}>
        <CrossDissolve durationInFrames={16}>
          <MoneyDrain coinCount={70} />
        </CrossDissolve>
        <CaptionEmphasis
          text="No new stores. No e-commerce. No upgrade."
          entryFrame={36}
          exitFrame={drainDur - 14}
          size="title"
          position={{top: 140, left: 100}}
          align="left"
        />
        <SfxMarker filename="coin-drop.wav" triggerFrame={20} />
        <SfxMarker filename="coin-drop.wav" triggerFrame={80} />
        <SfxMarker filename="coin-drop.wav" triggerFrame={140} />
      </Sequence>

      <Sequence from={revenueStillStart} durationInFrames={revenueStillDur}>
        <CrossDissolve durationInFrames={16}>
          <Broll
            label="kids-toy-aisle-2010"
            description="2010s children in toy aisle · parents pushing carts · daylight"
          />
        </CrossDissolve>
        <CaptionEmphasis
          text="Children still wanted toys."
          entryFrame={32}
          exitFrame={revenueStillDur - 14}
          size="title"
          position={{bottom: 160, left: 100}}
          align="left"
        />
      </Sequence>

      <Sequence from={modernizeStart} durationInFrames={modernizeDur}>
        <CrossDissolve durationInFrames={14}>
          <Broll
            label="store-modernization-cost"
            description="Empty modernized retail interior · 2014 · spotless"
          />
        </CrossDissolve>
        <CaptionEmphasis
          text="They tried to modernize."
          entryFrame={28}
          exitFrame={modernizeDur - 14}
          size="title"
          position={{top: 140, left: 100}}
          align="left"
        />
      </Sequence>

      <Sequence from={competitorsStart} durationInFrames={competitorsDur}>
        <CrossDissolve durationInFrames={14}>
          <Broll
            label="walmart-target-amazon-montage"
            description="Walmart aisle → Target endcap → Amazon warehouse · brand-neutral · 2013"
          />
        </CrossDissolve>
        <CaptionEmphasis
          text="The competition was relentless."
          entryFrame={32}
          exitFrame={competitorsDur - 14}
          size="title"
          position={{bottom: 160, left: 100}}
          align="left"
          color={COLORS.textDim}
        />
      </Sequence>

      <Sequence from={agingStart} durationInFrames={agingDur}>
        <CrossDissolve durationInFrames={16}>
          <Broll
            label="dim-aging-store"
            description="Aging Toys R Us interior · flickering fluorescent · empty endcap · 2015"
            panX={20}
          />
        </CrossDissolve>
        <CaptionEmphasis
          text="The magic faded."
          entryFrame={32}
          exitFrame={agingDur - 14}
          size="title"
          position={{bottom: 160, left: 100}}
          align="left"
          color={COLORS.textDim}
        />
      </Sequence>

      <Sequence from={adaptCostStart} durationInFrames={adaptCostDur}>
        <CrossDissolve durationInFrames={14}>
          <AbsoluteFill style={{background: '#050507'}}>
            <CaptionEmphasis
              text="Adaptation costs money."
              entryFrame={14}
              exitFrame={adaptCostDur - 14}
              size="display"
            />
            <CaptionEmphasis
              text="The debt kept draining it away."
              entryFrame={60}
              exitFrame={adaptCostDur - 14}
              size="title"
              position={{bottom: 220, left: 0, right: 0}}
              align="center"
              color={COLORS.accent}
            />
          </AbsoluteFill>
        </CrossDissolve>
        <SfxMarker filename="deep-impact.wav" triggerFrame={60} />
      </Sequence>

      <Sequence from={trappedStart} durationInFrames={trappedDur}>
        <ZoomThrough durationInFrames={18}>
          <TrappedBeat />
        </ZoomThrough>
        <SfxMarker filename="boom-final.wav" triggerFrame={8} />
      </Sequence>

      <Sequence from={declineStart} durationInFrames={declineDur}>
        <CrossDissolve durationInFrames={16}>
          <Broll
            label="customer-leaving-store"
            description="Single customer walking through empty Toys R Us · long lens · 2016"
            panX={-30}
          />
        </CrossDissolve>
      </Sequence>

      <Sequence from={chartStart} durationInFrames={chartDur}>
        <CrossDissolve durationInFrames={20}>
          <RevenueDebtChart />
        </CrossDissolve>
        <SfxMarker filename="cinematic-riser-long.wav" triggerFrame={0} />
      </Sequence>

      <Sequence from={suffocationStart} durationInFrames={suffocationDur}>
        <CrossDissolve durationInFrames={14}>
          <AbsoluteFill style={{background: '#050507'}}>
            <CaptionEmphasis
              text="Not a sudden collapse."
              entryFrame={14}
              exitFrame={70}
              size="title"
              color={COLORS.textDim}
            />
            <CaptionEmphasis
              text="A slow financial suffocation."
              entryFrame={80}
              exitFrame={suffocationDur - 14}
              size="display"
              color={COLORS.accent}
            />
          </AbsoluteFill>
        </CrossDissolve>
      </Sequence>

      <Sequence from={mid2010sStart} durationInFrames={mid2010sDur}>
        <ZoomThrough durationInFrames={20}>
          <YearMarker year="2016" subtitle="The pressure became unbearable" color={COLORS.accent} />
        </ZoomThrough>
      </Sequence>

      <Sequence from={tryingToCompeteStart} durationInFrames={tryingToCompeteDur}>
        <CrossDissolve durationInFrames={14}>
          <Broll
            label="amazon-prime-truck"
            description="Amazon delivery truck rolling past empty Toys R Us · twilight"
            panX={30}
          />
        </CrossDissolve>
        <CaptionEmphasis
          text="The pressure became too heavy."
          entryFrame={32}
          exitFrame={tryingToCompeteDur - 14}
          size="title"
          position={{bottom: 160, left: 100}}
          align="left"
          color={COLORS.accent}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
