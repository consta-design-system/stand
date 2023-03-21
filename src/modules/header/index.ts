import { atom } from '@reatom/core';

export type MenuItem = {
  label: string;
  routeName: string;
  params: Record<string, string>;
  active: boolean;
};

export const headerLeftSideRefAtom = atom<React.RefObject<HTMLDivElement>>({
  current: null,
});

export const headerLeftSideHeightAtom = atom((ctx) => {
  const headerLeftSideRef = ctx.spy(headerLeftSideRefAtom);
  return headerLeftSideRef.current?.offsetHeight || 0;
});
