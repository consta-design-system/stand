import './DocLayoutRightSide.css';

import { useBreakpoints } from '@consta/uikit/useBreakpoints';
import { useClickOutside } from '@consta/uikit/useClickOutside';
import { useAction, useAtom, useUpdate } from '@reatom/npm-react';
import React from 'react';

import { openRightSideAtom } from '##/modules/layout';
import { cn } from '##/utils/bem';
import { createMods } from '##/utils/createMods';

import { useScroll } from './helpers';

const cnDocLayoutRightSide = cn('DocLayoutRightSide');

export const DocLayoutRightSide: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const breakpoints = useBreakpoints({
    l: 1254,
    xl: 1440,
  });
  const [open] = useAtom(openRightSideAtom);
  const closeRightSide = useAction(openRightSideAtom.setFalse);

  const { ref, position, top } = useScroll(breakpoints.xl && Boolean(children));

  useUpdate(
    (ctx) => {
      if (breakpoints.xl) {
        openRightSideAtom.setTrue(ctx);
      } else {
        openRightSideAtom.setFalse(ctx);
      }
    },
    [breakpoints.xl],
  );

  useClickOutside({
    isActive: breakpoints.l && !breakpoints.xl,
    ignoreClicksInsideRefs: [ref],
    handler: closeRightSide,
  });

  if (!breakpoints.l || !children) {
    return null;
  }

  return (
    <div
      style={{ ['--top' as string]: `${top}px` }}
      className={cnDocLayoutRightSide({
        position: breakpoints.xl ? position : 'fixedScrolable',
        open,
        ...createMods(breakpoints),
      })}
      ref={ref}
    >
      {children}
    </div>
  );
};
