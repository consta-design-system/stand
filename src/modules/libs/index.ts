import { atom } from '@reatom/core';

// @ts-ignore: При сборке стенды осутствуют
import { libs } from '##/stands';
import { LibWithStands } from '##/types';

export const libsAtom = atom<LibWithStands[]>(libs);
