import { createAtom } from '@reatom/core';
import { createStringAtom } from '@reatom/core/primitives/createStringAtom';

import { libAtom } from '##/modules/lib';

const localStorageDeprecatedSwich = 'deprecatedSwich';
const localStorageCanarySwich = 'deprecatedSwich';
const localStorageInWorkSwich = 'deprecatedSwich';

export const isShowFiltersAtom = createAtom({ libAtom }, ({ get }) => {
  const lib = get('libAtom');

  if (!lib?.stands) {
    return false;
  }

  return lib.stands.find((item) => item.stand.status === 'deprecated');
});

export const searchValueAtom = createStringAtom();

export const deprecatedSwichAtom = createAtom(
  { set: (payload: boolean) => payload },
  (
    { onAction },
    state = !!localStorage.getItem(localStorageDeprecatedSwich),
  ) => {
    onAction('set', (payload) => {
      localStorage.setItem(localStorageDeprecatedSwich, payload ? 'Y' : '');
      state = payload;
    });

    return state;
  },
);

export const canarySwichAtom = createAtom(
  { set: (payload: boolean) => payload },
  ({ onAction }, state = !!localStorage.getItem(localStorageCanarySwich)) => {
    onAction('set', (payload) => {
      localStorage.setItem(localStorageCanarySwich, payload ? 'Y' : '');
      state = payload;
    });

    return state;
  },
);

export const inWorkSwichAtom = createAtom(
  { set: (payload: boolean) => payload },
  ({ onAction }, state = !!localStorage.getItem(localStorageInWorkSwich)) => {
    onAction('set', (payload) => {
      localStorage.setItem(localStorageInWorkSwich, payload ? 'Y' : '');
      state = payload;
    });

    return state;
  },
);

export const visibleListAtom = createAtom(
  {
    libAtom,
    searchValueAtom,
    deprecatedSwichAtom,
    canarySwichAtom,
    inWorkSwichAtom,
  },
  ({ get }) => {
    const lib = get('libAtom');
    const searchValue = get('searchValueAtom');
    const showDeprecated = get('deprecatedSwichAtom');
    const showCanary = get('canarySwichAtom');
    const showInWork = get('inWorkSwichAtom');

    return [...(lib?.stands ? lib.stands : [])].filter((item) => {
      if (
        (!showDeprecated && item.stand.status === 'deprecated') ||
        (!showCanary && item.stand.status === 'canary') ||
        (!showInWork && item.stand.status === 'inWork')
      ) {
        return false;
      }
      if (searchValue && searchValue.trim() !== '') {
        let flag = item.stand.title
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase());
        if (item.stand.alias) {
          item.stand.alias.forEach((alias) => {
            if (
              alias
                .toLocaleLowerCase()
                .includes(searchValue.toLocaleLowerCase())
            ) {
              flag = true;
            }
          });
        }
        return flag;
      }
      return true;
    });
  },
);
