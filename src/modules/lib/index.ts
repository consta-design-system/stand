import { atom } from '@reatom/core';

import { libsAtom } from '##/modules/libs';
import { routerAtom } from '##/modules/router';

export const libIdAtom = atom((ctx) => {
  return ctx.spy(routerAtom).route?.params.lib as string | undefined;
});

export const libAtom = atom((ctx) => {
  const libId = ctx.spy(libIdAtom);
  const libs = ctx.spy(libsAtom);

  return libId ? libs.find((item) => item.id === libId) : undefined;
});
