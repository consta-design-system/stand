import './Td.css';

import { Text } from '@consta/uikit/Text';
import React from 'react';

import { cn } from '##/utils/bem';

const cnTd = cn('Td');

export const Td = (props: React.HTMLAttributes<HTMLTableCellElement>) => {
  const { children, className, ...otherProps } = props;

  return (
    <Text
      as="td"
      size="s"
      lineHeight="s"
      view="primary"
      className={cnTd(null, [className])}
      {...otherProps}
    >
      {children}
    </Text>
  );
};
