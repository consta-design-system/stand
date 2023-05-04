import { atom } from '@reatom/core';

import { LibsPageConfig } from '##/types';

export const libsPageConfigAtom = atom<LibsPageConfig>({ title: 'Библиотеки' });

export const footerAtom = atom<{ copmonent: () => JSX.Element | null }>({
  copmonent: () => null,
});
