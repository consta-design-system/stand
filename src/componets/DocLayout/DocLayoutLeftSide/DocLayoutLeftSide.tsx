import './DocLayoutLeftSide.css';

import { cnMixScrollBar } from '@consta/uikit/MixScrollBar';
import { useAction, useAtom } from '@reatom/npm-react';
import React from 'react';

import { breakpointsAtom } from '##/modules/breakpoints';
import {
  leftSideElAtom,
  leftSideScrollPositionAtom,
  openLeftSideAtom,
} from '##/modules/layout';
import { cn } from '##/utils/bem';
import { createMods } from '##/utils/createMods';

const cnDocLayoutLeftSide = cn('DocLayoutLeftSide');

export const DocLayoutLeftSide: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [breakpoints] = useAtom(breakpointsAtom);
  const [open] = useAtom(openLeftSideAtom);
  const setLeftSideScrollPosition = useAction(leftSideScrollPositionAtom);
  const setOpenFalse = useAction(openLeftSideAtom.setFalse);
  const [, setLeftSideEl] = useAtom(leftSideElAtom, undefined, false);

  return (
    <>
      <div
        className={cnDocLayoutLeftSide({
          open,
          ...createMods(breakpoints),
        })}
        ref={setLeftSideEl}
      >
        <div
          className={cnDocLayoutLeftSide('ScrollContainer', [cnMixScrollBar()])}
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
