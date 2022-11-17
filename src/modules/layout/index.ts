import { action, atom } from '@reatom/core';
import { reatomBoolean } from '@reatom/primitives';

export const openPrimaryMenuAtom = reatomBoolean(false);
export const openSecondaryMenuAtom = reatomBoolean(false);

export const headerHeightAtom = atom(60);
export const headerHeightAtomSet = action((ctx, value: number) =>
  headerHeightAtom(ctx, value),
);
