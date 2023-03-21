import { atom } from '@reatom/core';
import { onUpdate } from '@reatom/hooks';
import { BooleanAtom, reatomString } from '@reatom/primitives';

import { libAtom } from '##/modules/lib';
import { standAtom } from '##/modules/stand';
import { createBooleanSyncLocalStorageAtom } from '##/primitives/createBooleanSyncLocalStorageAtom';

export const searchValueAtom = reatomString();

export const deprecatedSwitchAtom = createBooleanSyncLocalStorageAtom(
  'deprecatedSwitch',
  true,
);

export const canarySwitchAtom = createBooleanSyncLocalStorageAtom(
  'canarySwitch',
  true,
);

export const inWorkSwitchAtom = createBooleanSyncLocalStorageAtom(
  'inWorkSwitch',
  true,
);

export type fiterItem = {
  label: string;
  status: 'deprecated' | 'inWork' | 'canary';
  onClick: () => void;
  value: boolean;
};

export const filtersAtom = atom((ctx) => {
  const lib = ctx.spy(libAtom);

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
      value: ctx.spy(deprecatedSwitchAtom),
      onClick: () => deprecatedSwitchAtom.toggle(ctx),
    });
  }

  if (addfilter.canary) {
    filter.push({
      label: 'Canary',
      status: 'canary',
      value: ctx.spy(canarySwitchAtom),
      onClick: () => canarySwitchAtom.toggle(ctx),
    });
  }

  if (addfilter.inWork) {
    filter.push({
      label: 'В работе',
      status: 'inWork',
      value: ctx.spy(inWorkSwitchAtom),
      onClick: () => inWorkSwitchAtom.toggle(ctx),
    });
  }

  return filter;
});

export const visibleListAtom = atom((ctx) => {
  const lib = ctx.spy(libAtom);

  if (!lib?.stands) {
    return [];
  }

  const searchValue = ctx.spy(searchValueAtom);
  const showDeprecated = ctx.spy(deprecatedSwitchAtom);
  const showCanary = ctx.spy(canarySwitchAtom);
  const showInWork = ctx.spy(inWorkSwitchAtom);

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

export const libPageMenuFiltersHeightAtom = atom((ctx) => {
  const libPageMenuFiltersRef = ctx.spy(libPageMenuFiltersRefAtom);
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

onUpdate(standAtom, (ctx, stand) => {
  const status = stand?.stand.status;
  if (!status) {
    return;
  }

  mapAtom[status]?.setTrue(ctx);
});
