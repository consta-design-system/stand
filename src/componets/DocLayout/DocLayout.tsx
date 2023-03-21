import './DocLayout.css';

import { useBreakpoints } from '@consta/uikit/useBreakpoints';
import React from 'react';

import { cn } from '##/utils/bem';

import { DocLayoutLeftSide } from './DocLayoutLeftSide';
import { DocLayoutRightSide } from './DocLayoutRightSide';

const cnDocLayout = cn('DocLayout');

export const DocLayout: React.FC<{
  children?: React.ReactNode;
  leftSide?: React.ReactNode;
  rightSide?: React.ReactNode;
  header?: React.ReactNode;
}> = (props) => {
  const breakpoints = useBreakpoints({
    l: 1242,
  });

  return (
    <div className={cnDocLayout()}>
      {!breakpoints.l && (
        <div className={cnDocLayout('Header')}>{props.header}</div>
      )}
      <DocLayoutLeftSide>{props.leftSide}</DocLayoutLeftSide>
      <div className={cnDocLayout('Content')}>
        <div className={cnDocLayout('Paper')}>{props.children}</div>
      </div>
      <DocLayoutRightSide>{props.rightSide}</DocLayoutRightSide>
    </div>
  );
};
