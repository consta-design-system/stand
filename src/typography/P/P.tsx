import { Text } from '@consta/uikit/Text';
import { useAtom } from '@reatom/npm-react';
import React from 'react';

import { sizeAtomMapFabric } from '##/modules/adaptiveSize';
import { cn } from '##/utils/bem';

const cnP = cn('P');

export const P = (props: React.HTMLAttributes<HTMLParagraphElement>) => {
  const { children, ...otherProps } = props;

  const [size] = useAtom(sizeAtomMapFabric.m);

  return (
    <Text
      size={size}
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
