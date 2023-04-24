import { atom } from '@reatom/core';

export type Dimension = 'desktop' | 'tablet' | 'mobile';

export const dimensionMap: Record<Dimension, number> = {
  mobile: 0,
  tablet: 900,
  desktop: 1242,
};

export const dimensionAtom = atom<Dimension>('desktop');
