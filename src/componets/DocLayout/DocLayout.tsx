import React, { useEffect } from 'react';
import './DocLayout.css';

import { cn } from '##/utils/bem';
import { useBreakpoints } from '@consta/uikit/useBreakpoints';
import { openLeftSide } from '##/exportAtoms/layout';
import { useAtom } from '@reatom/react';

const cnDocLayout = cn('DocLayout');

export const DocLayout: React.FC<{
  children?: React.ReactChild;
  leftSide?: React.ReactChild;
  rightSide?: React.ReactChild;
  header?: React.ReactChild;
}> = (props) => {
  const [open, action] = useAtom(openLeftSide);

  const breakpoints = useBreakpoints({
    l: 1364,
    xl: 1690,
  });

  useEffect(() => {
    if (breakpoints.l) {
      action.setFalse();
    }
  }, [breakpoints.l]);

  return (
    <div className={cnDocLayout()}>
      <div className={cnDocLayout('Header')}>{props.header}</div>
      <div className={cnDocLayout('LeftSide', { open })}>{props.leftSide}</div>
      {!breakpoints.l && (
        <div className={cnDocLayout('Owerlay', { open })} onClick={action.setFalse} />
      )}
      <div className={cnDocLayout('Content')}>
        <div className={cnDocLayout('Paper')}>{props.children}</div>
      </div>
      {breakpoints.xl && <div className={cnDocLayout('RightSide')}>{props.rightSide}</div>}
    </div>
  );
};
