import React from 'react';
import { palette, fonts } from '../theme.js';

export const EditorialCallout = ({
  text,
  size = 72,
  align = 'left',
  style = {},
  color = palette.ink,
  weight = 700,
  highlight = null, // word to make lighter (for the "he play WITH is" style emphasis)
}) => {
  if (!highlight) {
    return (
      <div style={{
        fontFamily: fonts.sans,
        fontWeight: weight,
        fontSize: size,
        lineHeight: 1.08,
        letterSpacing: '-0.025em',
        textTransform: 'lowercase',
        color,
        textAlign: align,
        ...style,
      }}>
        {text}
      </div>
    );
  }

  // split on the highlight word for mixed-weight rendering
  const parts = text.split(new RegExp(`(${highlight})`, 'i'));
  return (
    <div style={{
      fontFamily: fonts.sans,
      fontWeight: weight,
      fontSize: size,
      lineHeight: 1.08,
      letterSpacing: '-0.025em',
      textTransform: 'lowercase',
      textAlign: align,
      ...style,
    }}>
      {parts.map((p, i) =>
        p.toLowerCase() === highlight.toLowerCase()
          ? <span key={i} style={{ color: palette.midGrey, fontWeight: 300 }}>{p}</span>
          : <span key={i} style={{ color }}>{p}</span>
      )}
    </div>
  );
};
