import './DocLayoutRightSide.css';

import { useClickOutside } from '@consta/uikit/useClickOutside';
import { useAction, useAtom } from '@reatom/npm-react';
import React from 'react';

import { breakpointsAtom } from '##/modules/breakpoints';
import { openRightSideAtom } from '##/modules/layout';
import { cn } from '##/utils/bem';
import { createMods } from '##/utils/createMods';

import { useScroll } from './helpers';

const cnDocLayoutRightSide = cn('DocLayoutRightSide');

export const DocLayoutRightSide: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [breakpoints] = useAtom(breakpointsAtom);
  const [open] = useAtom(openRightSideAtom);
  const closeRightSide = useAction(openRightSideAtom.setFalse);

  const { ref, position, top } = useScroll(breakpoints.l && Boolean(children));

  useClickOutside({
    isActive: breakpoints.m && !breakpoints.l,
    ignoreClicksInsideRefs: [ref],
    handler: closeRightSide,
  });

  if (!breakpoints.m || !children) {
    return null;
  }

  return (
    <div
      style={{ ['--top' as string]: `${top}px` }}
      className={cnDocLayoutRightSide({
        position: breakpoints.l ? position : 'fixedScrolable',
        open,
        ...createMods(breakpoints),
      })}
      ref={ref}
    >
      {children}
    </div>
  );
};
