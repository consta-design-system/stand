import './Table.css';

import { cnMixScrollBar } from '@consta/uikit/MixScrollBar';
import React from 'react';

import { cn } from '##/utils/bem';

const cnTable = cn('Table');

export const Table = (props: React.HTMLAttributes<HTMLTableElement>) => {
  const { children, className, ...otherProps } = props;

  return (
    <div className={cnTable('Wrapper', [cnMixScrollBar()])}>
      <table className={cnTable(null, [className])} {...otherProps}>
        {children}
      </table>
    </div>
  );
};
