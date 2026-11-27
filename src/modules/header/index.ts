import { atom, computed } from '@reatom/core';

export type MenuItem = {
  label: string;
  routeName: string;
  params: Record<string, string>;
  active: boolean;
};

export const headerLeftSideElementAtom = atom<HTMLDivElement | null>(null);

export const headerLeftSideHeightAtom = computed(
  () => headerLeftSideElementAtom()?.offsetHeight || 0,
);
