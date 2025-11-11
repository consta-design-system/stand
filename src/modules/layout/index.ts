import { action, atom } from '@reatom/core';
import { onUpdate } from '@reatom/hooks';
import { reatomBoolean } from '@reatom/primitives';
import React from 'react';

import { breakpointsAtom } from '##/modules/breakpoints';

export const openLeftSideAtom = reatomBoolean();
export const openRightSideAtom = reatomBoolean();

export const headerHeightAtom = atom(0);
export const headerHeightAtomSet = action((ctx, value: number) =>
  headerHeightAtom(ctx, value),
);

export const leftSideScrollPositionAtom = atom(0);
export const leftSideDistanceToSearchAtom = atom(0);
export const leftSideFixedSearchFieldAtom = atom((ctx) => {
  const scrollPosition = ctx.spy(leftSideScrollPositionAtom);
  const distance = ctx.get(leftSideDistanceToSearchAtom);

  return scrollPosition > distance;
});
export const leftSideSearchFieldHeightAtom = atom(0);
export const leftSideDistanceHelperHeightAtom = atom((ctx) => {
  const fixed = ctx.spy(leftSideFixedSearchFieldAtom);
  const heihgt = ctx.get(leftSideSearchFieldHeightAtom);

  return fixed ? heihgt : 0;
});

export const leftSideElAtom = atom<HTMLDivElement | null>(null);

export const leftSideScrollContainerAtom = atom<HTMLDivElement | null>(null);

export const leftSideScrollContainerScrollTopAtom = atom(0);

export const leftSideScrollContainerScrollTopSetAction = action((ctx) => {
  const scrollContainer = ctx.get(leftSideScrollContainerAtom);
  if (scrollContainer) {
    const value = scrollContainer.scrollTop;
    leftSideScrollContainerScrollTopAtom(ctx, value);
  } else {
    leftSideScrollContainerScrollTopAtom(ctx, 0);
  }
});

onUpdate(breakpointsAtom, (ctx, breakpoints) => {
  if (breakpoints.m) {
    openLeftSideAtom.setFalse(ctx);
  }
});

onUpdate(breakpointsAtom, (ctx, breakpoints) => {
  if (breakpoints.l) {
    openRightSideAtom.setTrue(ctx);
  } else {
    openRightSideAtom.setFalse(ctx);
  }
});
