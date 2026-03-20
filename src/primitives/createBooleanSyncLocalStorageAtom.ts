import { reatomBoolean } from '##/primitives/reatomBoolean';

export const createBooleanSyncLocalStorageAtom = (
  localStorageName: string,
  initialValue: boolean = false,
) => {
  const snap = localStorage.getItem(localStorageName);
  const init = snap ? snap === 'Y' : initialValue;

  localStorage.setItem(localStorageName, init ? 'Y' : 'N');

  const booleanAtom = reatomBoolean(init);

  booleanAtom.subscribe((value) => {
    localStorage.setItem(localStorageName, value ? 'Y' : 'N');
  });

  return booleanAtom;
};
