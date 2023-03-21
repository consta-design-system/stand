import { action, atom } from '@reatom/core';
import { reatomBoolean } from '@reatom/primitives';

export const openLeftSideAtom = reatomBoolean();
export const openRightSideAtom = reatomBoolean();

export const headerHeightAtom = atom(60);
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
