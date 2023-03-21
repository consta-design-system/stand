import { action, atom } from '@reatom/core';
import { reatomBoolean } from '@reatom/primitives';

import { standsAtom } from '##/modules/stands';
import { createArraySyncLocalStorageAtom } from '##/primitives/createArraySyncLocalStorageAtom';
import { PreparedStand } from '##/types';

export const fieldRefAtom = atom<React.RefObject<HTMLDivElement>>({
  current: null,
});

type NormalizeSearchItem = {
  label: PreparedStand['stand']['title'];
  type: 'doc' | 'component';
  lib: PreparedStand['lib']['id'];
  id: PreparedStand['id'];
  status: PreparedStand['stand']['status'];
  alias: PreparedStand['stand']['alias'];
  description: PreparedStand['stand']['description'];
};

type HistoryNormalizeItem = {
  label: string;
  type: 'history';
};

export const inputFocusedAtom = reatomBoolean();
export const inputValueAtom = atom<string | null>(null);
export const searchValueAtom = atom<string | null>(null);
export const historyAtom =
  createArraySyncLocalStorageAtom<string>('searchHistory');

export const updateHistoryAction = action(
  (ctx, value: string | null | undefined) => {
    if (value) {
      historyAtom(
        ctx,
        [value, ...ctx.get(historyAtom).filter((item) => item !== value)].slice(
          0,
          10,
        ),
      );
    }
  },
);

export const historyItemOnClickAction = action((ctx, string: string) => {
  updateHistoryAction(ctx, string);
  searchValueAtom(ctx, string);
  inputValueAtom(ctx, string);
});

export const standOnClickAction = action((ctx, item: NormalizeSearchItem) => {
  updateHistoryAction(ctx, ctx.get(searchValueAtom));
  inputFocusedAtom.setFalse(ctx);
});

export const isOpenDropdownAtom = atom((ctx) => {
  const focused = ctx.spy(inputFocusedAtom);
  const value = ctx.spy(searchValueAtom);
  const history = ctx.get(historyAtom);

  if (focused && history.length) {
    return true;
  }

  if (focused && value && value.length >= 3) {
    return true;
  }

  return false;
});

const searchListNormalizeAtom = atom((ctx) => {
  const stands = ctx.spy(standsAtom);

  const keys = Object.keys(stands);

  const normalizeList: NormalizeSearchItem[] = [];

  for (let index = 0; index < keys.length; index++) {
    const element = stands[keys[index]];

    normalizeList.push({
      label: element.stand.title,
      type: 'doc',
      lib: element.lib.id,
      id: element.id,
      status: element.stand.status,
      description: element.stand.description,
      alias: element.stand.alias,
    });
  }

  return normalizeList;
});

const valueNormalize = (value: string | null | undefined) => {
  if (value) {
    return value.trim().toLocaleLowerCase();
  }
  return '';
};

export const searchListIsResultAtom = atom((ctx) => {
  return valueNormalize(ctx.spy(searchValueAtom)).length >= 3;
});

export const searchListDataAtom = atom((ctx) => {
  const searchValue = ctx.spy(searchValueAtom);

  if (!ctx.get(searchListIsResultAtom)) {
    const historyNormalize: HistoryNormalizeItem[] = ctx
      .get(historyAtom)
      .map((item) => ({
        label: item,
        type: 'history',
      }));

    return historyNormalize;
  }

  return ctx.get(searchListNormalizeAtom).filter((item) => {
    if (item.label.toLocaleLowerCase().includes(valueNormalize(searchValue))) {
      return true;
    }

    if (item.alias) {
      item.alias.forEach((alias) => {
        if (alias.toLocaleLowerCase().includes(valueNormalize(searchValue))) {
          return true;
        }
      });
    }

    return false;
  });
});

export const searchListLengthAtom = atom((ctx) => {
  const searchListIsResult = ctx.spy(searchListIsResultAtom);
  const searchListData = ctx.spy(searchListDataAtom);

  if (searchListIsResult) {
    return searchListData.length;
  }
  return 0;
});
