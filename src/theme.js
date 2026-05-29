// Monochrome editorial design system.
// Everything is greyscale; "color" is expressed only through value.

export const FPS = 30;
export const DURATION_SECONDS = 67.187;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const palette = {
  paper: '#cfcdc8', // light grey concrete/paper
  paperDark: '#b9b7b1',
  ink: '#111111', // near-black for type and dark fields
  inkSoft: '#2a2a2a',
  midGrey: '#7d7c78',
  lightGrey: '#e4e2dd',
  line: '#1a1a1a',
  white: '#f3f1ec',
};

export const fonts = {
  // Clean Swiss sans — matches the lowercase editorial reference.
  sans: "'Helvetica Neue', Helvetica, Arial, sans-serif",
};

// Shared type styling for the deliberate "callout" text placed in negative space.
export const callout = {
  fontFamily: fonts.sans,
  fontWeight: 700,
  letterSpacing: '-0.02em',
  textTransform: 'lowercase',
  color: palette.ink,
};

export const sec = (s) => Math.round(s * FPS);
