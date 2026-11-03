import { action, atom, computed } from '@reatom/core';

import { breakpointsAtom } from '##/modules/breakpoints';
import { reatomBoolean } from '##/primitives/reatomBoolean';

export const openLeftSideAtom = reatomBoolean();
export const openRightSideAtom = reatomBoolean();

export const distanseElementAtom = atom<HTMLDivElement | null>(null);
export const fieldElementAtom = atom<HTMLDivElement | null>(null);

export const headerHeightAtom = atom(0);

export const headerHeightAtomSet = action((value: number) =>
  headerHeightAtom.set(value),
);

export const leftSideScrollPositionAtom = atom(0);
export const leftSideDistanceToSearchAtom = computed(
  () => distanseElementAtom()?.offsetTop || 0,
);
export const leftSideFixedSearchFieldAtom = computed(
  () => leftSideScrollPositionAtom() > leftSideDistanceToSearchAtom(),
);
export const leftSideSearchFieldHeightAtom = computed(
  () => fieldElementAtom()?.clientHeight || 0,
);
export const leftSideDistanceHelperHeightAtom = computed(() =>
  leftSideFixedSearchFieldAtom() ? leftSideSearchFieldHeightAtom() : 0,
);

export const leftSideElAtom = atom<HTMLDivElement | null>(null);

export const leftSideScrollContainerAtom = atom<HTMLDivElement | null>(null);

export const leftSideScrollContainerScrollTopAtom = atom(0);

export const leftSideScrollContainerScrollTopSetAction = action(() => {
  const scrollContainer = leftSideScrollContainerAtom();
  if (scrollContainer) {
    const value = scrollContainer.scrollTop;
    leftSideScrollContainerScrollTopAtom.set(value);
  } else {
    leftSideScrollContainerScrollTopAtom.set(0);
  }
});

breakpointsAtom.subscribe((state) => {
  if (state.m) {
    openLeftSideAtom.setFalse();
  }
  if (state.l) {
    openRightSideAtom.setTrue();
  } else {
    openRightSideAtom.setFalse();
  }
});
