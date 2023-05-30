import './Th.css';

import { Text } from '@consta/uikit/Text';
import React from 'react';

import { cn } from '##/utils/bem';

const cnTh = cn('Th');

export const Th = (props: React.HTMLAttributes<HTMLTableCellElement>) => {
  const { children, className, ...otherProps } = props;

  return (
    <Text
      as="th"
      size="xs"
      lineHeight="xs"
      weight="semibold"
      view="secondary"
      className={cnTh(null, [className])}
      {...otherProps}
    >
      {children}
    </Text>
  );
};
