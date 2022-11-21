import { onUpdate } from '@reatom/hooks';
import { reatomBoolean } from '@reatom/primitives';

export const createBooleanSyncLocalStorageAtom = (
  localStorageName: string,
  initialValue: boolean = false,
) => {
  const snap = localStorage.getItem(localStorageName);
  const init = snap ? snap === 'Y' : initialValue;

  localStorage.setItem(localStorageName, init ? 'Y' : 'N');

  const booleanAtom = reatomBoolean(init);

  onUpdate(booleanAtom, (ctx, value) =>
    localStorage.setItem(localStorageName, value ? 'Y' : 'N'),
  );

  return booleanAtom;
};
