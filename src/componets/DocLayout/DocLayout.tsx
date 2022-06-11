import React from 'react';
import './DocLayout.css';

import { cn } from '##/utils/bem';

const cnDocLayout = cn('DocLayout');

type Props = {
  children?: React.ReactChild;
  leftSide?: React.ReactChild
  rightSide?: React.ReactChild;
}

export const DocLayout: React.FC<Props> = (
  props,
) => {
  return (
    <div className={cnDocLayout()}>
      <div className={cnDocLayout('LeftSide')}>{props.leftSide}</div>
      <div className={cnDocLayout('Content')}>
        <div className={cnDocLayout('Paper')}>{props.children}</div>
      </div>
      {props.rightSide && <div className={cnDocLayout('RightSide')}>{props.rightSide}</div>}
    </div>
  );
};
