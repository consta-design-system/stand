import { Space } from '@consta/uikit/MixSpace';
import { TextPropSize, textPropSize } from '@consta/uikit/Text';
import { Atom, atom } from '@reatom/core';

import { Breakpoint, lastBreakpointAtom } from '##/modules/breakpoints';

type Gap = Exclude<Space, 0 | 'auto'>;

const gapSizeMMap: Record<Gap, Gap> = {
  '3xs': '3xs',
  '2xs': '2xs',
  'xs': 'xs',
  's': 's',
  'm': 'm',
  'l': 'l',
  'xl': 'xl',
  '2xl': '2xl',
  '3xl': '3xl',
  '4xl': '4xl',
  '5xl': '5xl',
  '6xl': '6xl',
};

const gapSizeSMap: Record<Gap, Gap> = {
  '3xs': '3xs',
  '2xs': '3xs',
  'xs': '2xs',
  's': 'xs',
  'm': 's',
  'l': 'm',
  'xl': 'l',
  '2xl': 'xl',
  '3xl': '2xl',
  '4xl': '3xl',
  '5xl': '4xl',
  '6xl': '5xl',
};

const textSizeMMap: Record<TextPropSize, TextPropSize> = {
  '2xs': '2xs',
  'xs': 'xs',
  's': 's',
  'm': 'm',
  'l': 'l',
  'xl': 'xl',
  '2xl': '2xl',
  '3xl': '3xl',
  '4xl': '4xl',
  '5xl': '5xl',
  '6xl': '6xl',
};

const textSizeSMap: Record<TextPropSize, TextPropSize> = {
  '2xs': '2xs',
  'xs': 'xs',
  's': 'xs',
  'm': 's',
  'l': 'm',
  'xl': 'l',
  '2xl': 'xl',
  '3xl': '2xl',
  '4xl': '3xl',
  '5xl': '4xl',
  '6xl': '5xl',
};

const sizeMap: Record<Breakpoint, Record<TextPropSize, TextPropSize>> = {
  s: textSizeSMap,
  m: textSizeMMap,
  l: textSizeMMap,
};

const gapMap: Record<Breakpoint, Record<Gap, Gap>> = {
  s: gapSizeSMap,
  m: gapSizeMMap,
  l: gapSizeMMap,
};

const getSpaceFromDimension = (space: Space, breakpoint: Breakpoint): Space => {
  if (space === 'auto' || space === 0) {
    return space;
  }
  return gapMap[breakpoint][space];
};

const createGapMap = (breakpoint: Breakpoint) => {
  const gapMap: Record<string, string> = {};
  Object.keys(gapSizeMMap).forEach((key) => {
    const copyKey = key as Gap;
    gapMap[`--lazy-docs-gap-${copyKey}`] = `var(--space-${getSpaceFromDimension(
      copyKey,
      breakpoint,
    )})`;
  });
  return gapMap;
};

export const gapMapAtom = atom((ctx) => {
  const breakpoint = ctx.spy(lastBreakpointAtom);
  return createGapMap(breakpoint || 's');
});

const createSizeAtomMapFabric = () => {
  const map = {} as Record<TextPropSize, Atom<TextPropSize>>;
  for (let index = 0; index < textPropSize.length; index++) {
    const size = textPropSize[index];
    map[size] = atom((ctx) => {
      const breakpoint = ctx.spy(lastBreakpointAtom);
      return sizeMap[breakpoint || 's'][size];
    });
  }
  return map;
};

const createSpaceAtomMapFabric = () => {
  const map = {} as Record<Gap, Atom<Gap>>;
  const gaps = [
    'm',
    '3xs',
    '2xs',
    'xs',
    's',
    'l',
    'xl',
    '2xl',
    '3xl',
    '4xl',
    '5xl',
    '6xl',
  ] as const;
  for (let index = 0; index < gaps.length; index++) {
    const gap = gaps[index];
    map[gap] = atom((ctx) => {
      const breakpoint = ctx.spy(lastBreakpointAtom);
      return gapMap[breakpoint || 's'][gap];
    });
  }
  return map;
};

export const sizeAtomMapFabric = createSizeAtomMapFabric();
export const gapAtomMapFabric = createSpaceAtomMapFabric();
