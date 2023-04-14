import { atom } from '@reatom/core';

import { LibsMenuConfig, LibsPageConfig } from '##/types';

export const libsPageConfigAtom = atom<LibsPageConfig>({ title: 'Библиотеки' });

export const libsMenuConfigAtom = atom<LibsMenuConfig>({});
