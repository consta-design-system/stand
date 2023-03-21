import { atom } from '@reatom/core';
import { onUpdate } from '@reatom/hooks';

const guardParse = <T>(json: string | null) => {
  if (!json) {
    return [] as T[];
  }
  try {
    return JSON.parse(json) as T[];
  } catch (error) {
    return [] as T[];
  }
};

export const createArraySyncLocalStorageAtom = <T>(
  localStorageName: string,
) => {
  const dataAtom = atom<T[]>(
    guardParse<T>(localStorage.getItem(localStorageName)),
  );

  onUpdate(dataAtom, (ctx, value) =>
    localStorage.setItem(localStorageName, JSON.stringify(value)),
  );

  return dataAtom;
};
