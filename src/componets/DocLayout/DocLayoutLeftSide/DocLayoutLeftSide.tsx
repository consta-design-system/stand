import './DocLayoutLeftSide.css';

// import { useElementAtomEventListener } from '@consta/uikit/__internal__/src/utils/state/useElementAtomEventListener';
import { cnMixScrollBar } from '@consta/uikit/MixScrollBar';
import { useAction, useAtom } from '@reatom/react';
import React from 'react';

import { breakpointsAtom } from '##/modules/breakpoints';
import {
  leftSideElAtom,
  leftSideScrollContainerAtom,
  // leftSideScrollContainerScrollTopSetAction,
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
  const setLeftSideScrollPosition = useAction(leftSideScrollPositionAtom.set);
  const setOpenFalse = useAction(openLeftSideAtom.setFalse);
  const setLeftSideScrollContainer = useAction(leftSideScrollContainerAtom.set);
  const setLeftSideEl = useAction(leftSideElAtom.set);

  // TODO: переписать
  // useElementAtomEventListener(
  //   leftSideScrollContainerAtom,
  //   'scroll',
  //   useAction(leftSideScrollContainerScrollTopSetAction),
  // );

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
          ref={setLeftSideScrollContainer}
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
