export const SPRINGS = {
  smooth: {damping: 200, stiffness: 100, mass: 0.5},
  gentle: {damping: 200, stiffness: 60, mass: 0.6},
  swift: {damping: 200, stiffness: 180, mass: 0.4},
  hero: {damping: 200, stiffness: 80, mass: 0.8},
} as const;

export const TIMING = {
  sceneDefault: 75,
  sceneMin: 45,
  sceneMax: 150,
  transition: 18,
  staggerTight: 4,
  staggerLoose: 10,
} as const;

export const FPS = 30;

export const sec = (s: number) => Math.round(s * FPS);
