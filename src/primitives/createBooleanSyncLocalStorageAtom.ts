import { AtomSelfBinded, createAtom } from '@reatom/core';

export const createBooleanSyncLocalStorageAtom = (
  localStorageName: string,
  initialValue: boolean | undefined,
): AtomSelfBinded<
  boolean,
  {
    set: (payload: boolean) => boolean;
    on: () => true;
    off: () => false;
    toggle: () => boolean;
  }
> => {
  initialValue &&
    !localStorage.getItem(localStorageName) &&
    localStorage.setItem(localStorageName, initialValue ? 'Y' : 'N');

  return createAtom(
    {
      set: (payload: boolean) => payload,
      on: () => true,
      off: () => false,
      toggle: () => false,
    },
    ({ onAction }, state = localStorage.getItem(localStorageName) === 'Y') => {
      onAction('set', (payload) => {
        localStorage.setItem(localStorageName, payload ? 'Y' : 'N');
        state = payload;
      });

      onAction('on', () => {
        localStorage.setItem(localStorageName, 'Y');
        state = true;
      });

      onAction('off', () => {
        localStorage.setItem(localStorageName, 'N');
        state = false;
      });

      onAction('toggle', () => {
        localStorage.setItem(localStorageName, !state ? 'Y' : 'N');
        state = !state;
      });

      return state;
    },
  );
};
