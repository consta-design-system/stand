import { createAtom } from '@reatom/core';

import { standsAtom } from '##/exportAtoms/stands';
import { store } from '##/modules/app';
// @ts-ignore: При сборке стенды осутствуют
import { stands } from '##/stands';

store.dispatch(standsAtom.set(stands));

export { standsAtom };

export const deprecatedSwichIsVisibleAtom = createAtom(
  { standsAtom },
  ({ get }) => {
    return !!Object.keys(get('standsAtom')).find(
      (index) => stands[index].stand.status === 'deprecated',
    );
  },
);
