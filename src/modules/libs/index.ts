import { atom, computed } from '@reatom/core';

import { LibWithStands } from '##/types';

export const libsAtom = atom<LibWithStands[]>([]);

export const libsIsOneLibAtom = computed(() => {
  const libs = libsAtom();

  if (libs.length <= 1) {
    return libs[0];
  }

  return false;
});
