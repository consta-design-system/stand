import { createAtom } from '@reatom/core';
import { createStringAtom } from '@reatom/core/primitives/createStringAtom';

import { PreparedStand } from '##/exportTypes';
import { libAtom } from '##/modules/lib';

const localStorageDeprecatedSwich = 'deprecatedSwich';

export const deprecatedSwichIsVisibleAtom = createAtom(
  { libAtom },
  ({ get }) => {
    const lib = get('libAtom');

    if (!lib?.stands) {
      return false;
    }

    return lib.stands.find((item) => item.stand.status === 'deprecated');
  },
);

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

export const visibleListAtom = createAtom(
  { libAtom, searchValueAtom, deprecatedSwichAtom },
  ({ get }) => {
    const lib = get('libAtom');
    const searchValue = get('searchValueAtom');
    const showDeprecated = get('deprecatedSwichAtom');

    const reviewItem: PreparedStand | undefined = lib
      ? {
          id: lib.id,
          path: '',
          pathAccess: {
            design: false,
            dev: false,
            stand: false,
          },
          lib,
          stand: {
            id: lib.id,
            title: 'Обзор компонентов',
            group: 'review',
            status: 'stable',
            version: '',
          },
        }
      : undefined;

    return [
      ...(reviewItem ? [reviewItem] : []),
      ...(lib?.stands ? lib.stands : []),
    ].filter((item) => {
      if (!showDeprecated && item.stand.status === 'deprecated') {
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
