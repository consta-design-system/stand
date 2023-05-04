import './DocLayout.css';

import { useAtom } from '@reatom/npm-react';
import React from 'react';

import { breakpointsAtom } from '##/modules/breakpoints';
import { footerAtom } from '##/modules/standsConfigs';
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
  const [breakpoints] = useAtom(breakpointsAtom);

  const Footer = useAtom(footerAtom)[0].copmonent;

  return (
    <div className={cnDocLayout(createMods(breakpoints))}>
      {!breakpoints.m && (
        <div className={cnDocLayout('Header')}>{props.header}</div>
      )}
      <DocLayoutLeftSide>{props.leftSide}</DocLayoutLeftSide>
      <div className={cnDocLayout('Center')}>
        <div className={cnDocLayout('Content')}>
          <div className={cnDocLayout('Paper')}>{props.children}</div>
        </div>
        <Footer />
      </div>
      <DocLayoutRightSide>{props.rightSide}</DocLayoutRightSide>
    </div>
  );
};
