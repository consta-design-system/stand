import './DocLayoutRightSide.css';

import { useBreakpoints } from '@consta/uikit/useBreakpoints';
import { useClickOutside } from '@consta/uikit/useClickOutside';
import { useAction, useAtom } from '@reatom/npm-react';
import React, { useEffect } from 'react';

import { openRightSideAtom } from '##/modules/layout';
import { cn } from '##/utils/bem';

import { useScroll } from './helpers';

const cnDocLayoutRightSide = cn('DocLayoutRightSide');

export const DocLayoutRightSide: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const { l, xl } = useBreakpoints({
    l: 1242,
    xl: 1440,
  });
  const [open] = useAtom(openRightSideAtom);
  const closeRightSide = useAction(openRightSideAtom.setFalse);
  const openRightSide = useAction(openRightSideAtom.setTrue);

  const { ref, position, top } = useScroll(xl && Boolean(children));

  useClickOutside({
    isActive: l && !xl,
    ignoreClicksInsideRefs: [ref],
    handler: closeRightSide,
  });

  useEffect(() => {
    if (xl) {
      openRightSide();
    } else {
      closeRightSide();
    }
  }, [xl]);

  if (!l || !children) {
    return null;
  }

  return (
    <div
      style={{ ['--top' as string]: `${top}px` }}
      className={cnDocLayoutRightSide({
        position: xl ? position : 'fixedScrolable',
        open,
      })}
      ref={ref}
    >
      {children}
    </div>
  );
};
