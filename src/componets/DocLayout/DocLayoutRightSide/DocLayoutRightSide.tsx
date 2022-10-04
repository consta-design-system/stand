import './DocLayoutRightSide.css';

import { useBreakpoints } from '@consta/uikit/useBreakpoints';
import React from 'react';

import { cn } from '##/utils/bem';

import { useScroll } from './helpers';

const cnDocLayoutRightSide = cn('DocLayoutRightSide');

export const DocLayoutRightSide: React.FC<{
  children?: React.ReactChild;
}> = ({ children }) => {
  const { xl } = useBreakpoints({
    xl: 1690,
  });

  const { ref, position, top } = useScroll(xl && Boolean(children));

  if (!xl || !children) {
    return null;
  }

  return (
    <div
      style={{ ['--top' as string]: `${top}px` }}
      className={cnDocLayoutRightSide({ position })}
      ref={ref}
    >
      {children}
    </div>
  );
};
