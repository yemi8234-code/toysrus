import React from 'react';
import { useCurrentFrame } from 'remotion';
import captionData from '../captions.json';
import { palette, fonts } from '../theme.js';

const FPS = 30;

function getActivePhrase(t) {
  for (const phrase of captionData) {
    if (t >= phrase.start && t < phrase.end + 0.5) return phrase;
  }
  return null;
}

function getActiveWords(phrase, t) {
  if (!phrase) return [];
  return phrase.words.map(w => ({
    ...w,
    active: t >= w.s,
  }));
}

export const CaptionBar = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;

  const phrase = getActivePhrase(t);
  if (!phrase) return null;

  const words = getActiveWords(phrase, t);
  // Group into lines of ~6 words
  const LINE_SIZE = 6;
  const lines = [];
  for (let i = 0; i < words.length; i += LINE_SIZE) {
    lines.push(words.slice(i, i + LINE_SIZE));
  }

  // Show only the line that contains the currently-active word
  const activeIdx = words.findLastIndex(w => w.active);
  const activeLine = Math.floor(Math.max(0, activeIdx) / LINE_SIZE);
  const visibleLine = lines[activeLine] || lines[lines.length - 1] || [];

  return (
    <div style={{
      position: 'absolute',
      bottom: 140,
      left: 60,
      right: 60,
      textAlign: 'center',
      zIndex: 100,
    }}>
      <div style={{
        fontFamily: fonts.sans,
        fontSize: 46,
        fontWeight: 600,
        lineHeight: 1.25,
        letterSpacing: '-0.01em',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '0 14px',
      }}>
        {visibleLine.map((w, i) => (
          <span
            key={i}
            style={{
              color: w.active ? palette.ink : 'rgba(30,28,25,0.28)',
              transition: 'color 0.07s ease',
              textShadow: w.active
                ? `0 1px 0 rgba(255,255,255,0.6), 0 -1px 0 rgba(255,255,255,0.4)`
                : 'none',
              // strip punctuation from display but keep the word
            }}
          >
            {w.w}
          </span>
        ))}
      </div>
    </div>
  );
};
