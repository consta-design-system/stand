import { getLastPoint, useBreakpoints } from '@consta/uikit/useBreakpoints';
import { atom } from '@reatom/core';
import { useUpdate } from '@reatom/npm-react';

export type Breakpoint = 'xs' | 's' | 'm' | 'l';

export const breakpoints: Record<Breakpoint, number> = {
  xs: 0,
  s: 768,
  m: 1254,
  l: 1440,
};

export const breakpointsAtom = atom<Record<Breakpoint, boolean>>({
  xs: true,
  s: false,
  m: false,
  l: false,
});

export const lastBreakpointAtom = atom(
  (ctx) => getLastPoint(ctx.spy(breakpointsAtom)) || 'xs',
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
