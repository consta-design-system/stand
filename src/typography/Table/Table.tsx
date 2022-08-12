import './Table.css';

import React from 'react';

import { cn } from '##/utils/bem';

const cnTable = cn('Table');

export const Table = (props: React.HTMLAttributes<HTMLTableElement>) => {
  const { children, className, ...otherProps } = props;

  return (
    <table className={cnTable(null, [className])} {...otherProps}>
      {children}
    </table>
  );
};
