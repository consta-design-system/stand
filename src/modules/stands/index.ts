import { createAtom } from '@reatom/core';

import { store } from '##/modules/app';
// @ts-ignore: При сборке стенды осутствуют
import { stands } from '##/stands';
import { PreparedStand } from '##/types';

const standsAtom = createAtom(
  { set: (payload: Record<string, PreparedStand>) => payload },
  ({ onAction }, state: Record<string, PreparedStand> = {}) => {
    onAction('set', (payload) => {
      state = payload;
    });
    return state;
  },
);

store.dispatch(standsAtom.set(stands));

export { standsAtom };
