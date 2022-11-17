import { atom } from '@reatom/core';
import { withReducers } from '@reatom/primitives';

export const createBooleanSyncLocalStorageAtom = (
  localStorageName: string,
  initialValue: boolean = false,
) => {
  initialValue &&
    !localStorage.getItem(localStorageName) &&
    localStorage.setItem(localStorageName, initialValue ? 'Y' : 'N');

  return atom(initialValue).pipe(
    withReducers({
      on: () => {
        localStorage.setItem(localStorageName, 'Y');
        return true;
      },
      off: () => {
        localStorage.setItem(localStorageName, 'N');
        return false;
      },
      toggle: (state) => {
        localStorage.setItem(localStorageName, !state ? 'Y' : 'N');
        return !state;
      },
    }),
  );
};
