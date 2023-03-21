import './DocLayoutLeftSide.css';

import { useBreakpoints } from '@consta/uikit/useBreakpoints';
import { useAction, useAtom } from '@reatom/npm-react';
import React, { useEffect } from 'react';

import {
  leftSideScrollPositionAtom,
  openLeftSideAtom,
} from '##/modules/layout';
import { cn } from '##/utils/bem';

const cnDocLayoutLeftSide = cn('DocLayoutLeftSide');

export const DocLayoutLeftSide: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const breakpoints = useBreakpoints({
    l: 1254,
  });
  const setLeftSideScrollPosition = useAction(leftSideScrollPositionAtom);

  const [open] = useAtom(openLeftSideAtom);
  const setOpenFalse = useAction(openLeftSideAtom.setFalse);

  useEffect(() => {
    if (breakpoints.l) {
      setOpenFalse();
    }
  }, [breakpoints.l]);

  return (
    <>
      <div
        className={cnDocLayoutLeftSide({
          open,
        })}
      >
        <div
          className={cnDocLayoutLeftSide('ScrollContainer')}
          onScroll={(e) => {
            setLeftSideScrollPosition(e.currentTarget.scrollTop);
          }}
        >
          {children}
        </div>
      </div>
      <div
        className={cnDocLayoutLeftSide('Owerlay', {
          open,
        })}
        aria-hidden="true"
        onClick={setOpenFalse}
      />
    </>
  );
};
