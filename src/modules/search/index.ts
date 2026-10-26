import {
  action,
  atom,
  computed,
  sleep,
  withAbort,
  withLocalStorage,
  wrap,
} from '@reatom/core';

import { leftSideScrollContainerScrollTopAtom } from '##/modules/layout';
// @ts-ignore: При сборке стенды осутствуют
import { stands } from '##/modules/stands';
import { reatomBoolean } from '##/primitives/reatomBoolean';
import { PreparedStand } from '##/types';

export const fieldRefAtom = atom<React.RefObject<HTMLDivElement>>({
  current: null,
});

type NormalizeSearchItem = {
  label: PreparedStand['stand']['title'];
  type: 'docs' | 'component';
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
export const historyAtom = atom<string[]>([]).extend(
  withLocalStorage('searchHistoryAtom'),
);

export const searchValueAtom = atom<string | null>(null);

export const handleChangeAction = action(async (inputValue: string | null) => {
  const value = inputValue || '';
  inputValueAtom.set(value);
  if (!value.trim()) {
    searchValueAtom.set(value);
  }
  await wrap(sleep(300));

  searchValueAtom.set(value);
}).extend(withAbort());

export const updateHistoryAction = action(
  (value: string | null | undefined) => {
    if (value) {
      historyAtom.set(
        [value, ...historyAtom().filter((item) => item !== value)].slice(0, 10),
      );
    }
  },
);

export const historyItemOnClickAction = action((string: string) => {
  updateHistoryAction(string);
  searchValueAtom.set(string);
  inputValueAtom.set(string);
});

export const standOnClickAction = action((item: NormalizeSearchItem) => {
  updateHistoryAction(searchValueAtom());
  inputFocusedAtom.setFalse();
});

export const isOpenDropdownAtom = computed(() => {
  const focused = inputFocusedAtom();
  const value = searchValueAtom();
  const history = historyAtom();

  if (focused && history.length) {
    return true;
  }

  if (focused && value && value.length >= 3) {
    return true;
  }

  return false;
});

const searchListNormalizeAtom = atom(() => {
  const keys = Object.keys(stands);

  const normalizeList: NormalizeSearchItem[] = [];

  for (let index = 0; index < keys.length; index++) {
    const element = stands[keys[index]];

    normalizeList.push({
      label: element.stand.title,
      type: element.stand.type || 'docs',
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

export const searchListIsResultAtom = computed(() => {
  return valueNormalize(searchValueAtom()).length >= 3;
});

const includeInStr = (path: string | null | undefined, src: string) =>
  src.toLocaleLowerCase().includes(valueNormalize(path));

export const searchListDataAtom = computed(() => {
  const searchValue = searchValueAtom();

  const history = historyAtom();

  if (!searchListIsResultAtom()) {
    const historyNormalize: HistoryNormalizeItem[] = history.map((item) => ({
      label: item,
      type: 'history',
    }));

    return historyNormalize;
  }

  const list = searchListNormalizeAtom();

  const labelLevel = list.filter((item) =>
    includeInStr(searchValue, item.label),
  );

  const aliasLevel = list.filter((item) => {
    if (!item.alias?.length) {
      return false;
    }

    if (labelLevel.find((levelItem) => levelItem.id === item.id)) {
      return false;
    }

    if (item.alias) {
      for (let index = 0; index < item.alias.length; index++) {
        if (includeInStr(searchValue, item.alias[index])) {
          return true;
        }
      }
    }

    return false;
  });

  const descriptionLevel = list.filter((item) => {
    if (!item.description) {
      return false;
    }

    if (
      [...labelLevel, ...aliasLevel].find(
        (levelItem) => levelItem.id === item.id,
      )
    ) {
      return false;
    }

    return includeInStr(searchValue, item.description);
  });

  return [...labelLevel, ...aliasLevel, ...descriptionLevel];
});

export const searchListLengthAtom = computed(() => {
  const searchListIsResult = searchListIsResultAtom();
  const searchListData = searchListDataAtom();

  if (searchListIsResult) {
    return searchListData.length;
  }
  return 0;
});

export const dropDownTopPositionAtom = computed(() => {
  const fieldRef = fieldRefAtom();

  leftSideScrollContainerScrollTopAtom();

  if (fieldRef.current) {
    const { height, top } = fieldRef.current.getBoundingClientRect();
    return height + top;
  }

  return 0;
});
