import { atom } from '@reatom/core';

import { LibsPageConfig } from '##/types';

export const libsPageConfigAtom = atom<LibsPageConfig>({ title: 'Библиотеки' });

export const footerAtom = atom<{ component: () => JSX.Element | null }>({
  component: () => null,
});
