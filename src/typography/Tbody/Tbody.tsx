import './Tbody.css';

import React from 'react';

import { cn } from '##/utils/bem';

const cnTbody = cn('Tbody');

export const Tbody = (props: React.HTMLAttributes<HTMLTableSectionElement>) => {
  const { children, className, ...otherProps } = props;

  return (
    <tbody className={cnTbody(null, [className])} {...otherProps}>
      {children}
    </tbody>
  );
};
