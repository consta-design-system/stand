import { createAtom } from '@reatom/core';
import { createStringAtom } from '@reatom/core/primitives/createStringAtom';

import { libAtom } from '##/modules/lib';
import { createBooleanSyncLocalStorageAtom } from '##/primitives/createBooleanSyncLocalStorageAtom';

const localStorageDeprecatedSwitch = 'deprecatedSwitch';
const localStorageCanarySwitch = 'canarySwitch';
const localStorageInWorkSwitch = 'inWorkSwitch';

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

export type fiterItem = {
  label: string;
  status: 'deprecated' | 'inWork' | 'canary';
  onClick: () => void;
  value: boolean;
};

export const filtersAtom = createAtom(
  { libAtom, deprecatedSwitchAtom, canarySwitchAtom, inWorkSwitchAtom },
  ({ get, schedule }) => {
    const lib = get('libAtom');

    if (!lib?.stands) {
      return [];
    }

    const addfilter: Record<string, boolean> = {};

    for (let index = 0; index < lib.stands.length; index++) {
      const { status } = lib.stands[index].stand;

      if (status !== undefined && status !== 'stable') {
        addfilter[status] = true;
      }
    }

    let deprecatedToggle: () => void;
    let canaryToggle: () => void;
    let inWorkToggle: () => void;

    schedule((dispatch) => {
      deprecatedToggle = () => dispatch(deprecatedSwitchAtom.toggle());
      canaryToggle = () => dispatch(canarySwitchAtom.toggle());
      inWorkToggle = () => dispatch(inWorkSwitchAtom.toggle());
    });

    const filter: fiterItem[] = [];

    if (addfilter.deprecated) {
      filter.push({
        label: 'Deprecated',
        status: 'deprecated',
        value: get('deprecatedSwitchAtom'),
        onClick: () => deprecatedToggle(),
      });
    }

    if (addfilter.canary) {
      filter.push({
        label: 'Canary',
        status: 'canary',
        value: get('canarySwitchAtom'),
        onClick: () => canaryToggle(),
      });
    }

    if (addfilter.inWork) {
      filter.push({
        label: 'В работе',
        status: 'inWork',
        value: get('inWorkSwitchAtom'),
        onClick: () => inWorkToggle(),
      });
    }

    return filter;
  },
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

    if (!lib?.stands) {
      return [];
    }

    const searchValue = get('searchValueAtom');
    const showDeprecated = get('deprecatedSwitchAtom');
    const showCanary = get('canarySwitchAtom');
    const showInWork = get('inWorkSwitchAtom');

    return lib.stands.filter((item) => {
      if (
        (!showDeprecated && item.stand.status === 'deprecated') ||
        (!showCanary && item.stand.status === 'canary') ||
        (!showInWork && item.stand.status === 'inWork')
      ) {
        return false;
      }
      if (searchValue.trim() !== '') {
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
