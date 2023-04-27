import { atom } from '@reatom/core';

import { LibsPageConfig } from '##/types';

export const libsPageConfigAtom = atom<LibsPageConfig>({ title: 'Библиотеки' });
