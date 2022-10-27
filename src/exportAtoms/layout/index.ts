import { createBooleanAtom, createNumberAtom } from '@reatom/core/primitives';

export const openPrimaryMenuAtom = createBooleanAtom(false);
export const openSecondaryMenuAtom = createBooleanAtom(false);

export const headerHeight = createNumberAtom(60);
