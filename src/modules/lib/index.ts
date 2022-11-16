import { createAtom } from '@reatom/core';

import { libsAtom } from '##/modules/libs';
import { routerAtom } from '##/modules/router';

export const libAtom = createAtom({ routerAtom, libsAtom }, ({ get }) => {
  const libArr = get('libsAtom');
  const libId = get('routerAtom').route?.params.lib as string | undefined;

  return libId ? libArr.find((item) => item.id === libId) : undefined;
});
