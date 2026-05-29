import React from 'react';
import { Composition } from 'remotion';
import { ToysRUsDoc } from './Composition.jsx';

const FPS = 30;
const DURATION_S = 67.187;

export const RemotionRoot = () => (
  <Composition
    id="ToysRUsDoc"
    component={ToysRUsDoc}
    durationInFrames={Math.ceil(DURATION_S * FPS)}
    fps={FPS}
    width={1080}
    height={1920}
  />
);
