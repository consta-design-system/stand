import { atom } from '@reatom/core';

// @ts-ignore: При сборке стенды осутствуют
import { stands } from '##/stands';
import { PreparedStand } from '##/types';

const standsAtom = atom<Record<string, PreparedStand>>(stands);

export { standsAtom };
