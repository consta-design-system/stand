import { createAtom } from '@reatom/core';
import { createStringAtom } from '@reatom/core/primitives/createStringAtom';

import { libAtom } from '##/modules/lib';
import { createBooleanSyncLocalStorageAtom } from '##/primitives/createBooleanSyncLocalStorageAtom';

const localStorageDeprecatedSwitch = 'deprecatedSwitch';
const localStorageCanarySwitch = 'canarySwitch';
const localStorageInWorkSwitch = 'inWorkSwitch';

export const isShowFiltersAtom = createAtom({ libAtom }, ({ get }) => {
  const lib = get('libAtom');

  if (!lib?.stands) {
    return false;
  }

  return lib.stands.find((item) => item.stand.status !== 'stable');
});

export const searchValueAtom = createStringAtom();

export const deprecatedSwitchAtom = createBooleanSyncLocalStorageAtom(
  localStorageDeprecatedSwitch,
  true,
);

export const canarySwitchAtom = createBooleanSyncLocalStorageAtom(
  localStorageCanarySwitch,
  true,
);

export const inWorkSwitchAtom = createBooleanSyncLocalStorageAtom(
  localStorageInWorkSwitch,
  true as boolean,
);

export const visibleListAtom = createAtom(
  {
    libAtom,
    searchValueAtom,
    deprecatedSwitchAtom,
    canarySwitchAtom,
    inWorkSwitchAtom,
  },
  ({ get }) => {
    const lib = get('libAtom');
    const searchValue = get('searchValueAtom');
    const showDeprecated = get('deprecatedSwitchAtom');
    const showCanary = get('canarySwitchAtom');
    const showInWork = get('inWorkSwitchAtom');

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
