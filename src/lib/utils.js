import { interpolate, clamp } from 'remotion';

export const ease = (frame, start, end, from = 0, to = 1) =>
  interpolate(frame, [start, end], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: t => t < 0.5 ? 2*t*t : -1+(4-2*t)*t,
  });

export const easeOut = (frame, start, end, from = 0, to = 1) =>
  interpolate(frame, [start, end], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: t => 1 - (1-t)**3,
  });

export const easeIn = (frame, start, end, from = 0, to = 1) =>
  interpolate(frame, [start, end], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: t => t * t * t,
  });

export const sec = s => Math.round(s * 30);
