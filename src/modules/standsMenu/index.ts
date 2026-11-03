import { atom, computed, withLocalStorage } from '@reatom/core';

import { libAtom } from '##/modules/lib';
import { standAtom } from '##/modules/stand';
import { BooleanAtom, reatomBoolean } from '##/primitives/reatomBoolean';

export const searchValueAtom = atom<string>('');

export const deprecatedSwitchAtom = reatomBoolean(true).extend(
  withLocalStorage('deprecatedSwitchAtom'),
);

export const canarySwitchAtom = reatomBoolean(true).extend(
  withLocalStorage('canarySwitchAtom'),
);

export const inWorkSwitchAtom = reatomBoolean(true).extend(
  withLocalStorage('inWorkSwitchAtom'),
);

export type fiterItem = {
  label: string;
  status: 'deprecated' | 'inWork' | 'canary';
  onClick: () => void;
  value: boolean;
};

export const filtersAtom = computed(() => {
  const lib = libAtom();

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

  const filter: fiterItem[] = [];

  if (addfilter.deprecated) {
    filter.push({
      label: 'Deprecated',
      status: 'deprecated',
      value: deprecatedSwitchAtom(),
      onClick: () => deprecatedSwitchAtom.toggle(),
    });
  }

  if (addfilter.canary) {
    filter.push({
      label: 'Canary',
      status: 'canary',
      value: canarySwitchAtom(),
      onClick: () => canarySwitchAtom.toggle(),
    });
  }

  if (addfilter.inWork) {
    filter.push({
      label: 'В работе',
      status: 'inWork',
      value: inWorkSwitchAtom(),
      onClick: () => inWorkSwitchAtom.toggle(),
    });
  }

  return filter;
});

export const visibleListAtom = computed(() => {
  const lib = libAtom();

  if (!lib?.stands) {
    return [];
  }

  const searchValue = searchValueAtom();
  const showDeprecated = deprecatedSwitchAtom();
  const showCanary = canarySwitchAtom();
  const showInWork = inWorkSwitchAtom();

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
            alias.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
          ) {
            flag = true;
          }
        });
      }
      return flag;
    }
    return true;
  });
});

export const libPageMenuFiltersRefAtom = atom<React.RefObject<HTMLDivElement>>({
  current: null,
});

export const libPageMenuFiltersHeightAtom = computed(() => {
  const libPageMenuFiltersRef = libPageMenuFiltersRefAtom();
  return libPageMenuFiltersRef.current?.offsetHeight || 0;
});

// при посещении стенда со статусом нужно включиь отоброжение этого статуса в фильтрах

const mapAtom: Record<
  'canary' | 'deprecated' | 'inWork' | 'stable',
  BooleanAtom | undefined
> = {
  canary: canarySwitchAtom,
  deprecated: deprecatedSwitchAtom,
  inWork: inWorkSwitchAtom,
  stable: undefined,
};

standAtom.subscribe((stand) => {
  const status = stand?.stand.status;
  if (!status) {
    return;
  }

  mapAtom[status]?.setTrue();
});
