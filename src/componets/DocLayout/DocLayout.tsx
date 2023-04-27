import './DocLayout.css';

import { useBreakpoints } from '@consta/uikit/useBreakpoints';
import React from 'react';

import { cn } from '##/utils/bem';
import { createMods } from '##/utils/createMods';

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
    s: 680,
    m: 1254,
    l: 1440,
  });

  return (
    <div className={cnDocLayout(createMods(breakpoints))}>
      {!breakpoints.m && (
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
