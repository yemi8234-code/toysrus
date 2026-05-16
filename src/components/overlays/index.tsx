import React from 'react';
import {ColorGrade} from './ColorGrade';
import {Vignette} from './Vignette';
import {FilmGrain} from './FilmGrain';
import {ChromaticAberration} from './ChromaticAberration';
import {Letterbox} from './Letterbox';

export {FilmGrain, Vignette, ColorGrade, ChromaticAberration, Letterbox};

export const CinematicOverlays: React.FC<{
  letterboxActive?: boolean;
  letterboxEnterFrame?: number;
}> = ({letterboxActive = false, letterboxEnterFrame = 0}) => {
  return (
    <>
      <ColorGrade />
      <Vignette strength={0.28} />
      <FilmGrain opacity={0.035} />
      <ChromaticAberration strength={1} />
      <Letterbox active={letterboxActive} enterFrame={letterboxEnterFrame} />
    </>
  );
};
