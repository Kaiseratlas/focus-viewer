import { TextStyle } from 'pixi.js';

export const focusNameStyle = new TextStyle({
  align: 'center',
  fontFamily: '"Ubuntu", serif',
  fontSize: 12,
  fontWeight: '500',
  fill: ['#ffffff', '#b4b4b4'],
  wordWrap: true,
  wordWrapWidth: 120,
});

export const focusNameStyle2 = new TextStyle({
  align: 'center',
  fontFamily: '"Ubuntu", serif',
  fontSize: 12,
  fontWeight: '500',
  fill: ['#ffffff', '#c7c7c7'],
  wordWrap: true,
  wordWrapWidth: 120,
  dropShadow: true,
  dropShadowBlur: 30,
  dropShadowDistance: 0,
  dropShadowAlpha: 0.5,
  dropShadowColor: '#ffffff',
});

export const debugCoordsStyle = new TextStyle({
  fontFamily: '"Ubuntu", serif',
  fontSize: 12,
  fill: ['#ff00ff'],
});
