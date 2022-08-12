import React from 'react';

import { cn } from '##/utils/bem';

const cnThead = cn('Thead');

export const Thead = (props: React.HTMLAttributes<HTMLTableSectionElement>) => {
  const { children, className, ...otherProps } = props;

  return (
    <thead className={cnThead(null, [className])} {...otherProps}>
      {children}
    </thead>
  );
};
