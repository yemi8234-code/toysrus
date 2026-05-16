import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';
import {StoreCollapse, MoneyDrain, TitleCard3D} from '../../components/3d';
import {
  StatHammer,
  ChapterCard,
  BankruptcyTimeline,
  EndCard,
} from '../../components/motion-graphics';
import {CaptionEmphasis, LowerThird, SourceTag} from '../../components/captions';
import {BrollPlaceholder, SfxMarker} from '../../components/placeholders';
import {CrossDissolve, WhipPan, BlurFade, ZoomThrough, LightLeak} from '../../components/transitions';
import {KenBurns, cueStart, cueEnd} from '../../lib/scene-utils';
import {COLORS, TYPE} from '../../lib/design-tokens';
import {sec} from '../../lib/motion-tokens';
import {NARRATION_END_FRAME, TOTAL_DURATION_FRAMES} from '../../lib/timing';

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
          assetPath={`public/broll/act3/${label}.${kind === 'still' ? 'jpg' : 'mp4'}`}
          durationSeconds={durationInFrames / 30}
          kind={kind}
        />
      </KenBurns>
    </AbsoluteFill>
  );
};

const DateMarker: React.FC<{date: string; subtitle?: string}> = ({date, subtitle}) => {
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
          fontSize: 200,
          fontWeight: 800,
          color: COLORS.accent,
          letterSpacing: '-0.02em',
          transform: `scale(${scale})`,
          textShadow: `0 0 80px ${COLORS.accent}55`,
          textAlign: 'center',
        }}
      >
        {date}
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

const AmazonStrike: React.FC = () => {
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
          Amazon killed Toys R Us.
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
            marginTop: 56,
            fontFamily: TYPE.display,
            fontSize: 88,
            fontWeight: 800,
            color: COLORS.text,
            textAlign: 'center',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            opacity: interpolate(frame, [40, 64], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          $5 billion in debt did.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const WallStreetVsChildhood: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#050507'}}>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: 1,
          background: 'rgba(255,255,255,0.1)',
        }}
      />
      <AbsoluteFill
        style={{
          left: 0,
          right: '50%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{textAlign: 'center', padding: '0 60px'}}>
          <div
            style={{
              fontFamily: TYPE.body,
              fontSize: 22,
              color: COLORS.textDim,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              marginBottom: 24,
              opacity: interpolate(frame, [14, 30], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            Wall Street
          </div>
          <div
            style={{
              fontFamily: TYPE.display,
              fontSize: 72,
              fontWeight: 800,
              color: COLORS.accent,
              letterSpacing: '-0.01em',
              opacity: interpolate(frame, [24, 46], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            Balance sheet
          </div>
        </div>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: '50%',
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{textAlign: 'center', padding: '0 60px'}}>
          <div
            style={{
              fontFamily: TYPE.body,
              fontSize: 22,
              color: COLORS.textDim,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              marginBottom: 24,
              opacity: interpolate(frame, [38, 54], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            Millions of children
          </div>
          <div
            style={{
              fontFamily: TYPE.display,
              fontSize: 72,
              fontWeight: 800,
              color: COLORS.accentGold,
              letterSpacing: '-0.01em',
              opacity: interpolate(frame, [50, 70], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            Childhood
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const TheTimingFeltUnreal: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const op = interpolate(
    frame,
    [0, 16, durationInFrames - 14, durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  return (
    <AbsoluteFill style={{background: '#050507', opacity: op}}>
      <KenBurns scaleFrom={1.0} scaleTo={1.06} panX={-15}>
        <BrollPlaceholder
          description="Sun setting behind closed Toys R Us facade · final week · 35mm"
          assetPath="public/broll/act3/sunset-closed-store.mp4"
          durationSeconds={durationInFrames / 30}
          kind="broll"
        />
      </KenBurns>
      <CaptionEmphasis
        text="One week after liquidation, Charles Lazarus died."
        entryFrame={40}
        exitFrame={durationInFrames - 14}
        size="title"
        position={{bottom: 160, left: 100}}
        align="left"
        color={COLORS.text}
      />
    </AbsoluteFill>
  );
};

// Act III covers part 2 cues 95-195 (ALL_CUES 320-420)
export const Act3Fall: React.FC = () => {
  const P2 = 225;

  // Chapter card
  const chapterStart = cueStart(P2 + 95) - sec(2);
  const chapterDur = sec(3.5);

  // Section A: September 2017 bankruptcy (cues 95-99, ALL 320-324)
  const sept2017Start = chapterStart + chapterDur - 8;
  const sept2017Dur = sec(5);

  // Section B: Plan was to restructure (cues 100-102, ALL 325-327)
  const restructurePlanStart = sept2017Start + sept2017Dur - 8;
  const restructurePlanEnd = cueEnd(P2 + 102) + 8;
  const restructurePlanDur = restructurePlanEnd - restructurePlanStart;

  // Section C: Confidence collapsed (cues 103-110, ALL 328-335)
  const confidenceCollapsedStart = cueStart(P2 + 103) - 8;
  const confidenceCollapsedEnd = cueEnd(P2 + 110) + 8;
  const confidenceCollapsedDur = confidenceCollapsedEnd - confidenceCollapsedStart;

  // Section D: 2017 Christmas catastrophic (cues 111-115, ALL 336-340)
  const christmasStart = cueStart(P2 + 111) - 8;
  const christmasEnd = cueEnd(P2 + 115) + 8;
  const christmasDur = christmasEnd - christmasStart;

  // Section E: March 2018 liquidation announcement (cues 116-119, ALL 341-344)
  const march2018Start = cueStart(P2 + 116) - 8;
  const march2018Dur = sec(5);

  // Section F: 33,000 jobs callback (cues 119, ALL 344)
  const jobsLostStart = march2018Start + march2018Dur - 8;
  const jobsLostDur = sec(4);

  // Section G: Empty stores closing (cues 120-127, ALL 345-352)
  const emptyStoresStart = jobsLostStart + jobsLostDur - 8;
  const emptyStoresEnd = cueEnd(P2 + 127) + 8;
  const emptyStoresDur = emptyStoresEnd - emptyStoresStart;

  // Section H: Generic giraffe / mascot packed away (cues 128-137, ALL 353-362)
  const mascotStart = cueStart(P2 + 128) - 8;
  const mascotEnd = cueEnd(P2 + 137) + 8;
  const mascotDur = mascotEnd - mascotStart;

  // Section I: Lazarus died one week later (cues 138-145, ALL 363-370)
  const lazarusDeathStart = cueStart(P2 + 138) - 8;
  const lazarusDeathEnd = cueEnd(P2 + 145) + 8;
  const lazarusDeathDur = lazarusDeathEnd - lazarusDeathStart;

  // Section J: People said Amazon killed it (cues 146-149, ALL 371-374)
  const amazonNarrativeStart = cueStart(P2 + 146) - 8;
  const amazonNarrativeEnd = cueEnd(P2 + 149) + 8;
  const amazonNarrativeDur = amazonNarrativeEnd - amazonNarrativeStart;

  // Section K: It leaves something out, survived for decades (cues 150-155, ALL 375-380)
  const survivedDecadesStart = cueStart(P2 + 150) - 8;
  const survivedDecadesEnd = cueEnd(P2 + 155) + 8;
  const survivedDecadesDur = survivedDecadesEnd - survivedDecadesStart;

  // Section L: What it could not survive was the weight (cues 156-157, ALL 381-382)
  const weightStart = cueStart(P2 + 156) - 8;
  const weightEnd = cueEnd(P2 + 157) + 8;
  const weightDur = weightEnd - weightStart;

  // Section M: Every missed renovation... the debt sat behind all of it (cues 158-162)
  const everyMissedStart = cueStart(P2 + 158) - 8;
  const everyMissedEnd = cueEnd(P2 + 162) + 8;
  const everyMissedDur = everyMissedEnd - everyMissedStart;

  // Section N: Wall Street thesis recap (cues 163-173, ALL 388-398)
  const thesisRecapStart = cueStart(P2 + 163) - 8;
  const thesisRecapEnd = cueEnd(P2 + 173) + 8;
  const thesisRecapDur = thesisRecapEnd - thesisRecapStart;

  // Section O: Childhood vs balance sheet (cues 174-177, ALL 399-402)
  const childhoodVsBSStart = cueStart(P2 + 174) - 8;
  const childhoodVsBSEnd = cueEnd(P2 + 177) + 8;
  const childhoodVsBSDur = childhoodVsBSEnd - childhoodVsBSStart;

  // Section P: Toys never disappeared (cues 178-184, ALL 403-409)
  const toysNeverDisappearedStart = cueStart(P2 + 178) - 8;
  const toysNeverDisappearedEnd = cueEnd(P2 + 184) + 8;
  const toysNeverDisappearedDur = toysNeverDisappearedEnd - toysNeverDisappearedStart;

  // Section Q: Jeffrey symbol of larger thing (cues 185-191, ALL 410-416)
  const jeffreyEnd = cueEnd(P2 + 191) + 8;
  const jeffreySymbolStart = cueStart(P2 + 185) - 8;
  const jeffreySymbolDur = jeffreyEnd - jeffreySymbolStart;

  // Section R: Final "$5 billion in debt" beat (cues 192-195, ALL 417-420)
  const finalDebtStart = cueStart(P2 + 192) - 8;
  const finalDebtEnd = cueEnd(P2 + 195) + 12;
  const finalDebtDur = finalDebtEnd - finalDebtStart;

  // End card after narration ends
  const endCardStart = NARRATION_END_FRAME;
  const endCardDur = TOTAL_DURATION_FRAMES - NARRATION_END_FRAME;

  return (
    <AbsoluteFill>
      <Sequence from={chapterStart} durationInFrames={chapterDur}>
        <WhipPan durationInFrames={10}>
          <ChapterCard roman="III" title="The Fall" subtitle="2017 — 2018" />
        </WhipPan>
        <SfxMarker filename="whoosh-impact.wav" triggerFrame={0} />
        <SfxMarker filename="paper-rustle.wav" triggerFrame={14} />
      </Sequence>

      <Sequence from={sept2017Start} durationInFrames={sept2017Dur}>
        <ZoomThrough durationInFrames={20}>
          <DateMarker date="SEPT 2017" subtitle="Chapter 11" />
        </ZoomThrough>
        <SfxMarker filename="deep-impact.wav" triggerFrame={4} />
      </Sequence>

      <Sequence from={restructurePlanStart} durationInFrames={restructurePlanDur}>
        <CrossDissolve durationInFrames={16}>
          <Broll
            label="bankruptcy-papers"
            description="Bankruptcy filing papers · executive signing · 2017 archive style"
            kind="still"
          />
        </CrossDissolve>
        <CaptionEmphasis
          text="The plan was to restructure."
          entryFrame={28}
          exitFrame={restructurePlanDur - 14}
          size="title"
          position={{bottom: 160, left: 100}}
          align="left"
        />
      </Sequence>

      <Sequence from={confidenceCollapsedStart} durationInFrames={confidenceCollapsedDur}>
        <CrossDissolve durationInFrames={14}>
          <Broll
            label="vendor-warehouse-empty"
            description="Vendor warehouse · half-empty shelves · hesitation · cold lighting"
          />
        </CrossDissolve>
        <CaptionEmphasis
          text="Confidence collapsed."
          entryFrame={30}
          exitFrame={confidenceCollapsedDur - 14}
          size="display"
          color={COLORS.accent}
          position={{top: 120, left: 100}}
          align="left"
        />
      </Sequence>

      <Sequence from={christmasStart} durationInFrames={christmasDur}>
        <CrossDissolve durationInFrames={16}>
          <Broll
            label="empty-christmas-store"
            description="Christmas tree in half-empty Toys R Us · sparse shoppers · 2017"
            panY={-15}
          />
        </CrossDissolve>
        <CaptionEmphasis
          text="2017 Christmas. Catastrophic."
          entryFrame={32}
          exitFrame={christmasDur - 14}
          size="title"
          position={{bottom: 160, left: 100}}
          align="left"
          color={COLORS.accent}
        />
      </Sequence>

      <Sequence from={march2018Start} durationInFrames={march2018Dur}>
        <ZoomThrough durationInFrames={20}>
          <DateMarker date="MARCH 2018" subtitle="Liquidation announced" />
        </ZoomThrough>
        <SfxMarker filename="boom-final.wav" triggerFrame={4} />
      </Sequence>

      <Sequence from={jobsLostStart} durationInFrames={jobsLostDur}>
        <CrossDissolve durationInFrames={14}>
          <StatHammer
            value={33000}
            label="US employees laid off"
            highlight="red"
            durationInFrames={jobsLostDur}
          />
        </CrossDissolve>
        <SfxMarker filename="deep-impact.wav" triggerFrame={2} />
      </Sequence>

      <Sequence from={emptyStoresStart} durationInFrames={emptyStoresDur}>
        <CrossDissolve durationInFrames={16}>
          <Broll
            label="liquidation-signs"
            description="LIQUIDATION SALE signs in windows · empty aisles · 35mm grain"
            panX={-30}
          />
        </CrossDissolve>
        <CaptionEmphasis
          text="Hundreds of stores. The final week."
          entryFrame={36}
          exitFrame={emptyStoresDur - 14}
          size="title"
          position={{bottom: 160, left: 100}}
          align="left"
          color={COLORS.textDim}
        />
      </Sequence>

      <Sequence from={mascotStart} durationInFrames={mascotDur}>
        <CrossDissolve durationInFrames={18}>
          <StoreCollapse />
        </CrossDissolve>
        <CaptionEmphasis
          text="The mascot packed into a crate."
          entryFrame={40}
          exitFrame={mascotDur - 14}
          size="title"
          position={{top: 140, left: 100}}
          align="left"
          color={COLORS.textDim}
        />
        <CaptionEmphasis
          text="The burial of an era."
          entryFrame={mascotDur - 100}
          exitFrame={mascotDur - 14}
          size="title"
          position={{bottom: 160, left: 100}}
          align="left"
          color={COLORS.accent}
        />
        <SfxMarker filename="cinematic-riser-long.wav" triggerFrame={0} />
        <SfxMarker filename="glass-shatter.wav" triggerFrame={120} />
      </Sequence>

      <Sequence from={lazarusDeathStart} durationInFrames={lazarusDeathDur}>
        <BlurFade durationInFrames={20}>
          <TheTimingFeltUnreal />
        </BlurFade>
        <LowerThird
          name="Charles Lazarus"
          role="1923 — 2018"
          entryFrame={60}
          exitFrame={lazarusDeathDur - 14}
        />
      </Sequence>

      <Sequence from={amazonNarrativeStart} durationInFrames={amazonNarrativeDur}>
        <CrossDissolve durationInFrames={14}>
          <AmazonStrike />
        </CrossDissolve>
        <SfxMarker filename="glass-shatter.wav" triggerFrame={32} />
      </Sequence>

      <Sequence from={survivedDecadesStart} durationInFrames={survivedDecadesDur}>
        <CrossDissolve durationInFrames={14}>
          <Broll
            label="seventies-store-busy"
            description="1970s busy toy store · happy families · saturated archive"
            kind="still"
          />
        </CrossDissolve>
        <CaptionEmphasis
          text="It survived Walmart. Recessions. Generations."
          entryFrame={32}
          exitFrame={survivedDecadesDur - 14}
          size="body"
          position={{bottom: 160, left: 100}}
          align="left"
          color={COLORS.textDim}
        />
      </Sequence>

      <Sequence from={weightStart} durationInFrames={weightDur}>
        <CrossDissolve durationInFrames={14}>
          <AbsoluteFill style={{background: '#050507'}}>
            <CaptionEmphasis
              text="What it couldn't survive—"
              entryFrame={14}
              exitFrame={70}
              size="title"
              color={COLORS.textDim}
            />
            <CaptionEmphasis
              text="—was the weight placed on top of it."
              entryFrame={75}
              exitFrame={weightDur - 14}
              size="display"
              color={COLORS.accent}
            />
          </AbsoluteFill>
        </CrossDissolve>
        <SfxMarker filename="deep-impact.wav" triggerFrame={75} />
      </Sequence>

      <Sequence from={everyMissedStart} durationInFrames={everyMissedDur}>
        <CrossDissolve durationInFrames={16}>
          <MoneyDrain coinCount={80} />
        </CrossDissolve>
        <CaptionEmphasis
          text="Every missed renovation."
          entryFrame={30}
          exitFrame={80}
          size="title"
          position={{top: 100, left: 100}}
          align="left"
        />
        <CaptionEmphasis
          text="Every delayed upgrade."
          entryFrame={80}
          exitFrame={130}
          size="title"
          position={{top: 100, left: 100}}
          align="left"
        />
        <CaptionEmphasis
          text="The debt sat behind all of it."
          entryFrame={140}
          exitFrame={everyMissedDur - 14}
          size="display"
          color={COLORS.accent}
          position={{bottom: 160, left: 100}}
          align="left"
        />
        <SfxMarker filename="coin-drop.wav" triggerFrame={40} />
        <SfxMarker filename="coin-drop.wav" triggerFrame={100} />
      </Sequence>

      <Sequence from={thesisRecapStart} durationInFrames={thesisRecapDur}>
        <CrossDissolve durationInFrames={14}>
          <Broll
            label="wall-street-rise"
            description="Wall Street buildings rising · long lens · dawn · cinematic"
            panY={-30}
          />
        </CrossDissolve>
        <CaptionEmphasis
          text="Businesses stopped being valued for what they built."
          entryFrame={30}
          exitFrame={thesisRecapDur - 60}
          size="title"
          position={{top: 140, left: 100}}
          align="left"
        />
        <CaptionEmphasis
          text="They were valued for what could be extracted."
          entryFrame={thesisRecapDur - 80}
          exitFrame={thesisRecapDur - 14}
          size="title"
          position={{bottom: 160, left: 100}}
          align="left"
          color={COLORS.accent}
        />
      </Sequence>

      <Sequence from={childhoodVsBSStart} durationInFrames={childhoodVsBSDur}>
        <CrossDissolve durationInFrames={14}>
          <WallStreetVsChildhood />
        </CrossDissolve>
      </Sequence>

      <Sequence from={toysNeverDisappearedStart} durationInFrames={toysNeverDisappearedDur}>
        <CrossDissolve durationInFrames={16}>
          <Broll
            label="kids-toys-2020"
            description="Children playing with toys at home · 2020 · soft daylight"
          />
        </CrossDissolve>
        <CaptionEmphasis
          text="The toys never disappeared."
          entryFrame={30}
          exitFrame={toysNeverDisappearedDur - 14}
          size="display"
          color={COLORS.text}
          position={{bottom: 200, left: 0, right: 0}}
          align="center"
        />
      </Sequence>

      <Sequence from={jeffreySymbolStart} durationInFrames={jeffreySymbolDur}>
        <CrossDissolve durationInFrames={18}>
          <Broll
            label="abandoned-store-flickering"
            description="Abandoned Toys R Us interior · flickering fluorescent · single mascot crate · long lens"
            panX={20}
          />
        </CrossDissolve>
        <CaptionEmphasis
          text="The mascot in the crate became a symbol."
          entryFrame={40}
          exitFrame={jeffreySymbolDur - 60}
          size="title"
          position={{top: 140, left: 100}}
          align="left"
          color={COLORS.textDim}
        />
        <CaptionEmphasis
          text="The end of an era when stores were built to create wonder first."
          entryFrame={jeffreySymbolDur - 100}
          exitFrame={jeffreySymbolDur - 14}
          size="body"
          position={{bottom: 160, left: 100}}
          align="left"
          color={COLORS.text}
        />
      </Sequence>

      <Sequence from={finalDebtStart} durationInFrames={finalDebtDur}>
        <CrossDissolve durationInFrames={16}>
          <AbsoluteFill style={{background: '#000'}}>
            <CaptionEmphasis
              text="None of it was enough"
              entryFrame={20}
              exitFrame={80}
              size="display"
            />
            <CaptionEmphasis
              text="to survive $5 billion in debt."
              entryFrame={90}
              exitFrame={finalDebtDur - 14}
              size="display"
              color={COLORS.accent}
              position={{top: 540, left: 0, right: 0}}
              align="center"
            />
          </AbsoluteFill>
        </CrossDissolve>
        <SfxMarker filename="boom-final.wav" triggerFrame={90} />
      </Sequence>

      <Sequence from={endCardStart} durationInFrames={endCardDur}>
        <CrossDissolve durationInFrames={24}>
          <EndCard />
        </CrossDissolve>
        <SfxMarker filename="boom-final.wav" triggerFrame={0} />
      </Sequence>
    </AbsoluteFill>
  );
};
