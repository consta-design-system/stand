import { Text } from '@consta/uikit/Text';
import React from 'react';

import { cn } from '##/utils/bem';

const cnP = cn('P');

export const P = (props: React.HTMLAttributes<HTMLParagraphElement>) => {
  const { children, ...otherProps } = props;

  return (
    <Text
      lineHeight="m"
      className={cnP()}
      as="p"
      weight="regular"
      {...otherProps}
    >
      {children}
    </Text>
  );
};
