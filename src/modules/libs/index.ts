import { atom } from '@reatom/core';

import { LibWithStands } from '##/types';

export const libsAtom = atom<LibWithStands[]>([]);

export const libsIsOneLibAtom = atom((ctx) => {
  const libs = ctx.spy(libsAtom);

  if (libs.length <= 1) {
    return libs[0];
  }

  return false;
});
