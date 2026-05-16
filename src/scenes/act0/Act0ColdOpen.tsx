import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';
import {TitleCard3D, FloatingToy, DataOrb} from '../../components/3d';
import {StatHammer, ChapterCard} from '../../components/motion-graphics';
import {CaptionEmphasis} from '../../components/captions';
import {BrollPlaceholder, SfxMarker} from '../../components/placeholders';
import {CrossDissolve, WhipPan, BlurFade, LightLeak} from '../../components/transitions';
import {KenBurns, cueStart, cueEnd, cueSpan} from '../../lib/scene-utils';
import {COLORS, TYPE} from '../../lib/design-tokens';
import {sec} from '../../lib/motion-tokens';
import {ALL_CUES} from '../../lib/timing';

const Year2018Beat: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const t = spring({
    frame,
    fps,
    config: {damping: 200, stiffness: 60, mass: 1.2},
  });
  const scale = interpolate(t, [0, 1], [1.4, 1]);
  const op = interpolate(frame, [0, 18], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const exitOp = interpolate(
    frame,
    [durationInFrames - 14, durationInFrames],
    [1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  return (
    <AbsoluteFill
      style={{
        background: 'radial-gradient(ellipse at center, #15080a 0%, #050507 80%)',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: Math.min(op, exitOp),
      }}
    >
      <div
        style={{
          fontFamily: TYPE.display,
          fontSize: 380,
          fontWeight: 800,
          color: COLORS.text,
          letterSpacing: '-0.04em',
          transform: `scale(${scale})`,
          fontVariantNumeric: 'tabular-nums',
          textShadow: '0 0 100px rgba(220,38,38,0.3)',
        }}
      >
        2018
      </div>
    </AbsoluteFill>
  );
};

const BrollBeat: React.FC<{
  label: string;
  description: string;
  panX?: number;
  panY?: number;
}> = ({label, description, panX = -30, panY = 0}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const op = interpolate(
    frame,
    [0, 14, durationInFrames - 14, durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  return (
    <AbsoluteFill style={{opacity: op}}>
      <KenBurns scaleFrom={1.0} scaleTo={1.1} panX={panX} panY={panY}>
        <BrollPlaceholder
          description={description}
          assetPath={`public/broll/act1/${label}.mp4`}
          durationSeconds={durationInFrames / 30}
          kind="broll"
        />
      </KenBurns>
    </AbsoluteFill>
  );
};

const GoneBeat: React.FC = () => {
  const {durationInFrames} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <CaptionEmphasis
        text="Gone."
        entryFrame={6}
        exitFrame={durationInFrames - 6}
        size="hero"
        color={COLORS.accent}
      />
    </AbsoluteFill>
  );
};

const ChildhoodCallout: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const op = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exitOp = interpolate(frame, [durationInFrames - 12, durationInFrames], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill style={{opacity: Math.min(op, exitOp)}}>
      <KenBurns scaleFrom={1.0} scaleTo={1.08} panX={-20}>
        <BrollPlaceholder
          description="Wide shot · 1990s store interior · soft saturated stock"
          assetPath="public/broll/act1/store-interior-wide.mp4"
          durationSeconds={durationInFrames / 30}
          kind="broll"
        />
      </KenBurns>
      <CaptionEmphasis
        text="It was childhood."
        entryFrame={18}
        exitFrame={durationInFrames - 14}
        size="display"
        color={COLORS.text}
        position={{bottom: 160, left: 100}}
        align="left"
      />
    </AbsoluteFill>
  );
};

const ScaleHint: React.FC = () => {
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
      <DataOrb />
      <CaptionEmphasis
        text="35% of the market."
        entryFrame={20}
        exitFrame={durationInFrames - 12}
        size="title"
        color={COLORS.accentGold}
        position={{top: 140, left: 100}}
        align="left"
      />
      <CaptionEmphasis
        text="One company. The whole industry."
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

// Act 0 cold open: cues 1-19 (~0:00-0:51 narration; with 2s breath, ~frames 0-1530)
export const Act0ColdOpen: React.FC = () => {
  // Use cue indices from ALL_CUES (1-based via cueStart helper)
  // We START scenes a bit before the cue (lead-in) and END after (exit).

  const titleStart = 0;
  const titleEnd = cueStart(3); // ends just as "For decades" begins
  const titleDur = titleEnd - titleStart;

  const yearStart = cueStart(1) - 8; // overlap a touch with title fade
  const yearEnd = cueEnd(2) + 14;
  const yearDur = yearEnd - yearStart;

  const childhoodStart = cueStart(3) - 8;
  const childhoodEnd = cueEnd(4) + 14;
  const childhoodDur = childhoodEnd - childhoodStart;

  const fluorescentStart = cueStart(5) - 8;
  const fluorescentEnd = cueEnd(6) + 6;
  const fluorescentDur = fluorescentEnd - fluorescentStart;

  const aislesStart = cueStart(7) - 6;
  const aislesEnd = cueEnd(8) + 6;
  const aislesDur = aislesEnd - aislesStart;

  const bikesStart = cueStart(9) - 6;
  const bikesEnd = cueEnd(9) + 12;
  const bikesDur = bikesEnd - bikesStart;

  const beggedStart = cueStart(10) - 8;
  const beggedEnd = cueEnd(10) + 14;
  const beggedDur = beggedEnd - beggedStart;

  const peakStart = cueStart(11) - 8;
  const peakEnd = cueEnd(12) + 14;
  const peakDur = peakEnd - peakStart;

  const dominanceStart = cueStart(13) - 8;
  const dominanceEnd = cueEnd(15) + 14;
  const dominanceDur = dominanceEnd - dominanceStart;

  const goneIntroStart = cueStart(16) - 8;
  const goneIntroEnd = cueEnd(16) + 8;
  const goneIntroDur = goneIntroEnd - goneIntroStart;

  const stat33kStart = cueStart(17) - 6;
  const stat33kEnd = cueEnd(18) + 12;
  const stat33kDur = stat33kEnd - stat33kStart;

  const stat1800Start = stat33kEnd - 14;
  const stat1800Dur = sec(2.8);

  const goneFinalStart = stat1800Start + stat1800Dur - 8;
  const goneFinalEnd = cueEnd(19) + 18;
  const goneFinalDur = goneFinalEnd - goneFinalStart;

  const chapterStart = goneFinalEnd - 6;
  const chapterDur = sec(3.5);

  return (
    <AbsoluteFill>
      <Sequence from={titleStart} durationInFrames={titleDur}>
        <BlurFade durationInFrames={28}>
          <TitleCard3D text="TOYS" dollyDirection="in" />
        </BlurFade>
        <SfxMarker filename="cinematic-riser-long.wav" triggerFrame={0} />
      </Sequence>

      <Sequence from={yearStart} durationInFrames={yearDur}>
        <CrossDissolve durationInFrames={18}>
          <Year2018Beat />
        </CrossDissolve>
        <SfxMarker filename="deep-impact.wav" triggerFrame={6} />
      </Sequence>

      <Sequence from={childhoodStart} durationInFrames={childhoodDur}>
        <CrossDissolve durationInFrames={16}>
          <ChildhoodCallout />
        </CrossDissolve>
      </Sequence>

      <Sequence from={fluorescentStart} durationInFrames={fluorescentDur}>
        <CrossDissolve durationInFrames={14}>
          <BrollBeat
            label="fluorescent-aisle"
            description="Fluorescent lights · polished tile · empty aisle · 35mm grain"
          />
        </CrossDissolve>
        <SfxMarker filename="whoosh-soft.wav" triggerFrame={0} />
      </Sequence>

      <Sequence from={aislesStart} durationInFrames={aislesDur}>
        <CrossDissolve durationInFrames={14}>
          <BrollBeat
            label="action-figures-shelf"
            description="Wall of action figures · child POV upward tilt · saturated color"
            panX={20}
          />
        </CrossDissolve>
        <SfxMarker filename="whoosh-soft.wav" triggerFrame={0} />
      </Sequence>

      <Sequence from={bikesStart} durationInFrames={bikesDur}>
        <CrossDissolve durationInFrames={14}>
          <BrollBeat
            label="bikes-overhead"
            description="Bicycles hanging overhead · Nerf wall · video game endcap"
            panY={20}
          />
        </CrossDissolve>
      </Sequence>

      <Sequence from={beggedStart} durationInFrames={beggedDur}>
        <CrossDissolve durationInFrames={14}>
          <BrollBeat
            label="kid-begging"
            description="Child pulling parent's sleeve · checkout line · super-8 look"
          />
        </CrossDissolve>
      </Sequence>

      <Sequence from={peakStart} durationInFrames={peakDur}>
        <BlurFade durationInFrames={18}>
          <ScaleHint />
        </BlurFade>
        <SfxMarker filename="deep-impact.wav" triggerFrame={20} />
      </Sequence>

      <Sequence from={dominanceStart} durationInFrames={dominanceDur}>
        <CrossDissolve durationInFrames={16}>
          <BrollBeat
            label="manufacturer-needed"
            description="Toy factory line · Mattel / Hasbro packaging · neutral brand"
          />
        </CrossDissolve>
      </Sequence>

      <Sequence from={goneIntroStart} durationInFrames={goneIntroDur}>
        <CrossDissolve durationInFrames={12}>
          <BrollBeat
            label="empty-store-liquidation"
            description="Empty shelves · liquidation sale signs · 2018"
          />
        </CrossDissolve>
        <SfxMarker filename="low-rumble-loop.wav" triggerFrame={0} />
      </Sequence>

      <Sequence from={stat33kStart} durationInFrames={stat33kDur}>
        <CrossDissolve durationInFrames={10}>
          <StatHammer
            value={33000}
            label="Jobs lost"
            highlight="red"
            durationInFrames={stat33kDur}
          />
        </CrossDissolve>
        <SfxMarker filename="deep-impact.wav" triggerFrame={2} />
      </Sequence>

      <Sequence from={stat1800Start} durationInFrames={stat1800Dur}>
        <CrossDissolve durationInFrames={10}>
          <StatHammer
            value={1800}
            label="US stores"
            highlight="gold"
            durationInFrames={stat1800Dur}
          />
        </CrossDissolve>
        <SfxMarker filename="deep-impact.wav" triggerFrame={2} />
      </Sequence>

      <Sequence from={goneFinalStart} durationInFrames={goneFinalDur}>
        <GoneBeat />
        <SfxMarker filename="boom-final.wav" triggerFrame={6} />
      </Sequence>

      <Sequence from={chapterStart} durationInFrames={chapterDur}>
        <WhipPan durationInFrames={10}>
          <ChapterCard roman="I" title="The Empire" subtitle="1948 — 2004" />
        </WhipPan>
        <SfxMarker filename="whoosh-impact.wav" triggerFrame={0} />
        <SfxMarker filename="paper-rustle.wav" triggerFrame={12} />
      </Sequence>
    </AbsoluteFill>
  );
};

export const ACT0_END_CUE_INDEX = 19;
