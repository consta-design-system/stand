import { getLastPoint, useBreakpoints } from '@consta/uikit/useBreakpoints';
import { atom } from '@reatom/core';
import { useUpdate } from '@reatom/npm-react';

export type Breakpoint = 's' | 'm' | 'l';

export const breakpoints: Record<Breakpoint, number> = {
  s: 0,
  m: 1254,
  l: 1440,
};

export const breakpointsAtom = atom<Record<Breakpoint, boolean>>({
  s: true,
  m: false,
  l: false,
});

export const lastBreakpointAtom = atom(
  (ctx) => getLastPoint(ctx.spy(breakpointsAtom)) || 's',
);

export const useBreakpointsSubscriber = () => {
  const data = useBreakpoints(breakpoints);
  useUpdate(
    (ctx) => {
      breakpointsAtom(ctx, data);
    },
    [data],
  );
};
