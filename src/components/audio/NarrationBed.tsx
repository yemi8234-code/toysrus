import React from 'react';
import {Audio, Sequence, staticFile} from 'remotion';
import {PART1_AUDIO_START_FRAME, PART2_AUDIO_START_FRAME} from '../../lib/timing';
import {ASSETS, AUDIO_PATHS} from '../../lib/assets-manifest';

export const NarrationBed: React.FC = () => {
  return (
    <>
      {ASSETS.audio.narratorLeoPart1 && (
        <Sequence from={PART1_AUDIO_START_FRAME}>
          <Audio src={staticFile(AUDIO_PATHS.narratorLeoPart1)} volume={1.0} />
        </Sequence>
      )}
      {ASSETS.audio.narratorLeoPart2 && (
        <Sequence from={PART2_AUDIO_START_FRAME}>
          <Audio src={staticFile(AUDIO_PATHS.narratorLeoPart2)} volume={1.0} />
        </Sequence>
      )}
    </>
  );
};

export const MusicBed: React.FC<{
  act: 1 | 2 | 3 | 4;
  baseVolume?: number;
  startFrame: number;
  endFrame: number;
}> = ({act, baseVolume = 0.18, startFrame, endFrame}) => {
  const flag = ASSETS.audio[`musicAct${act}` as keyof typeof ASSETS.audio];
  if (!flag) return null;
  const path = AUDIO_PATHS[`musicAct${act}` as keyof typeof AUDIO_PATHS];

  return (
    <Sequence from={startFrame} durationInFrames={endFrame - startFrame}>
      <Audio src={staticFile(path)} volume={baseVolume} />
    </Sequence>
  );
};
