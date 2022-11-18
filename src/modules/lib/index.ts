import { atom } from '@reatom/core';

import { libsAtom } from '##/modules/libs';
import { routerAtom } from '##/modules/router';

export const libAtom = atom((ctx) => {
  const libArr = ctx.spy(libsAtom);
  const libId = ctx.spy(routerAtom).route?.params.lib as string | undefined;
  return libId ? libArr.find((item) => item.id === libId) : undefined;
});
