import './DocLayout.css';

import { useAtom } from '@reatom/npm-react';
import React from 'react';

import { dimensionAtom } from '##/modules/dimension';
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
  const [dimension] = useAtom(dimensionAtom);

  return (
    <div className={cnDocLayout()}>
      {dimension !== 'desktop' && (
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
