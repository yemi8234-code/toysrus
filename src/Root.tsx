import React from 'react';
import {Composition} from 'remotion';
import {ToysRUsDoc} from './compositions/ToysRUsDoc';
import {TOTAL_DURATION_FRAMES} from './lib/timing';
import {VIDEO} from './lib/design-tokens';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ToysRUsDoc"
        component={ToysRUsDoc}
        durationInFrames={TOTAL_DURATION_FRAMES}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
      />
    </>
  );
};
