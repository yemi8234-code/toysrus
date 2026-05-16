import React from 'react';
import {AbsoluteFill} from 'remotion';
import '../styles.css';

import {Act0ColdOpen} from '../scenes/act0/Act0ColdOpen';
import {Act1Empire} from '../scenes/act1/Act1Empire';
import {Act2WallStreet} from '../scenes/act2/Act2WallStreet';
import {Act3Fall} from '../scenes/act3/Act3Fall';

import {NarrationBed, MusicBed} from '../components/audio/NarrationBed';
import {CinematicOverlays} from '../components/overlays';
import {COLORS} from '../lib/design-tokens';
import {ACT_BOUNDARIES, TOTAL_DURATION_FRAMES, NARRATION_END_FRAME} from '../lib/timing';

export const ToysRUsDoc: React.FC = () => {
  return (
    <AbsoluteFill style={{background: COLORS.bg}}>
      <Act0ColdOpen />
      <Act1Empire />
      <Act2WallStreet />
      <Act3Fall />

      <NarrationBed />
      <MusicBed act={1} startFrame={0} endFrame={ACT_BOUNDARIES.act1End} baseVolume={0.16} />
      <MusicBed
        act={2}
        startFrame={ACT_BOUNDARIES.act1End}
        endFrame={ACT_BOUNDARIES.act2End}
        baseVolume={0.18}
      />
      <MusicBed
        act={3}
        startFrame={ACT_BOUNDARIES.act2End}
        endFrame={NARRATION_END_FRAME}
        baseVolume={0.18}
      />
      <MusicBed
        act={4}
        startFrame={NARRATION_END_FRAME}
        endFrame={TOTAL_DURATION_FRAMES}
        baseVolume={0.22}
      />

      <CinematicOverlays />
    </AbsoluteFill>
  );
};
