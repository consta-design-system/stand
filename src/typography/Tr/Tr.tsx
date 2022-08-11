import './Tr.css';

import React from 'react';

import { cn } from '##/utils/bem';

const cnTr = cn('Tr');

export const Tr = (props: React.HTMLAttributes<HTMLTableRowElement>) => {
  const { children, className, ...otherProps } = props;

  return (
    <tr className={cnTr(null, [className])} {...otherProps}>
      {children}
    </tr>
  );
};
