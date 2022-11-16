import { createAtom } from '@reatom/core';

import { store } from '##/modules/app';
// @ts-ignore: При сборке стенды осутствуют
import { libs } from '##/stands';
import { LibWithStands } from '##/types';

const libsAtom = createAtom(
  { set: (payload: LibWithStands[]) => payload },
  ({ onAction }, state: LibWithStands[] = []) => {
    onAction('set', (payload) => {
      state = payload;
    });
    return state;
  },
);

store.dispatch(libsAtom.set(libs));

export { libsAtom };
