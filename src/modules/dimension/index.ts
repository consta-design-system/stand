import { atom } from '@reatom/core';

export type Dimension = 'desktop' | 'tablet' | 'mobile';

export const dimensionMap: Record<Dimension, number> = {
  desktop: 1242,
  tablet: 900,
  mobile: 0,
};

export const getDimension = (): Dimension => {
  if (window.innerWidth >= dimensionMap.desktop) return 'desktop';
  if (window.innerWidth >= dimensionMap.tablet) return 'tablet';
  return 'mobile';
};

export const dimensionAtom = atom<Dimension>(getDimension());
