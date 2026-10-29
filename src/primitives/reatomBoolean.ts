import { Atom, atom } from '@reatom/core';

export type BooleanAtom = Atom<boolean, [newState: boolean]> & {
  setTrue: () => boolean;
  setFalse: () => boolean;
  toggle: () => boolean;
};

export const reatomBoolean = (
  init: boolean = false,
  name?: string,
): BooleanAtom =>
  atom(init, name).extend((target) => ({
    setTrue: () => target.set(true),
    setFalse: () => target.set(false),
    toggle: () => target.set(!target()),
  }));
