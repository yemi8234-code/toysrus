export const COLORS = {
  bg: '#08080a',
  bgRaised: '#0f0f12',
  text: '#f5f5f7',
  textDim: '#9b9ba0',
  accent: '#dc2626',
  accentGold: '#d4af37',
  divider: 'rgba(255,255,255,0.08)',
  gradeShadows: '#0a0d14',
  gradeHighlights: '#fffaf2',
} as const;

export const TYPE = {
  display: '"General Sans", "Inter Tight", system-ui, sans-serif',
  body: '"Inter", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
} as const;

export const SIZES = {
  hero: 160,
  display: 96,
  title: 64,
  body: 36,
  caption: 28,
  micro: 20,
} as const;

export const VIDEO = {
  width: 1920,
  height: 1080,
  fps: 30,
} as const;
