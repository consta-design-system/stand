import { computed } from '@reatom/core';

import { libsAtom } from '##/modules/libs';
import { routerAtom } from '##/modules/router';

export const libIdAtom = computed(() => {
  return routerAtom().route?.params.lib as string | undefined;
});

export const libAtom = computed(() => {
  const libId = libIdAtom();
  const libs = libsAtom();

  return libId ? libs.find((item) => item.id === libId) : undefined;
});
